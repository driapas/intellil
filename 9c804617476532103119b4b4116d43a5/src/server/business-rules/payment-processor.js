import { gs, GlideRecord } from '@servicenow/glide'

export function onPaymentReceived(current, previous) {
    try {
        var applicationId = current.getValue('application')
        var scheduleItemId = current.getValue('schedule_item')
        var amountPaid = parseFloat(current.getValue('amount_paid'))
        
        // Update schedule item status
        if (scheduleItemId) {
            var scheduleGr = new GlideRecord('x_1610509_intellil_ai_repayment_schedule')
            if (scheduleGr.get(scheduleItemId)) {
                var amountDue = parseFloat(scheduleGr.getValue('amount_due'))
                var lateFee = parseFloat(scheduleGr.getValue('late_fee') || '0')
                var totalDue = amountDue + lateFee
                
                if (amountPaid >= totalDue) {
                    scheduleGr.setValue('status', 'paid')
                } else if (amountPaid > 0) {
                    scheduleGr.setValue('status', 'partial')
                }
                
                scheduleGr.update()
            }
        }
        
        // Check if all payments are complete for the loan
        checkLoanCompletion(applicationId)
        
        // Log transaction
        logTransaction('payment_received', applicationId, 
                      current.getValue('application.customer'), 
                      'Payment received: $' + amountPaid.toFixed(2))
        
        gs.addInfoMessage('Payment of $' + amountPaid.toFixed(2) + ' processed successfully')
        
    } catch (error) {
        gs.error('Error processing payment: ' + error.toString())
    }
}

function checkLoanCompletion(applicationId) {
    try {
        // Get the AI plan for this application
        var appGr = new GlideRecord('x_1610509_intellil_loan_application')
        if (!appGr.get(applicationId)) return
        
        var planId = appGr.getValue('ai_plan_reference')
        if (!planId) return
        
        // Check if all schedule items are paid
        var scheduleGr = new GlideRecord('x_1610509_intellil_ai_repayment_schedule')
        scheduleGr.addQuery('plan', planId)
        scheduleGr.addQuery('status', 'NOT IN', 'paid,waived')
        scheduleGr.query()
        
        if (!scheduleGr.hasNext()) {
            // All payments completed - close the loan
            appGr.setValue('status', 'closed')
            appGr.update()
            
            // Update plan status
            var planGr = new GlideRecord('x_1610509_intellil_ai_repayment_plan')
            if (planGr.get(planId)) {
                planGr.setValue('status', 'completed')
                planGr.update()
            }
            
            logTransaction('loan_closed', applicationId, 
                          appGr.getValue('customer'), 
                          'Loan fully repaid and closed')
            
            gs.addInfoMessage('Congratulations! Loan has been fully repaid and closed.')
        }
    } catch (error) {
        gs.error('Error checking loan completion: ' + error.toString())
    }
}

function logTransaction(type, applicationSysId, customerSysId, remarks) {
    try {
        var transGr = new GlideRecord('x_1610509_intellil_loan_transaction')
        transGr.initialize()
        transGr.setValue('transaction_type', type)
        transGr.setValue('application', applicationSysId)
        transGr.setValue('customer', customerSysId)
        transGr.setValue('user', gs.getUserID())
        transGr.setValue('remarks', remarks)
        transGr.setValue('ip_address', gs.getSession().getClientIP())
        transGr.insert()
    } catch (error) {
        gs.error('Error logging transaction: ' + error.toString())
    }
}