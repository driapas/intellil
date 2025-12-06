import { gs, GlideRecord } from '@servicenow/glide'

export function onApplicationStatusChange(current, previous) {
    var oldStatus = previous.getValue('status')
    var newStatus = current.getValue('status')
    
    gs.info('Application status changed from ' + oldStatus + ' to ' + newStatus)
    
    // Log the status change
    logTransaction('application_reviewed', current.getUniqueValue(), 
                  current.getValue('customer'), 
                  'Status changed from ' + oldStatus + ' to ' + newStatus)
    
    // Handle approval
    if (newStatus === 'approved') {
        handleLoanApproval(current)
    }
    
    // Handle rejection
    if (newStatus === 'rejected') {
        handleLoanRejection(current)
    }
    
    // Handle disbursement
    if (newStatus === 'disbursed') {
        handleLoanDisbursement(current)
    }
}

function handleLoanApproval(current) {
    // Set approval details
    current.setValue('approved_by', gs.getUserID())
    current.setValue('approved_date', gs.nowDateTime())
    
    // Activate the AI plan if one is selected
    var planId = current.getValue('ai_plan_reference')
    if (planId) {
        var planGr = new GlideRecord('x_1610509_intellil_ai_repayment_plan')
        if (planGr.get(planId)) {
            planGr.setValue('status', 'active')
            planGr.update()
        }
    }
    
    // Send notification (in real implementation, this would send email/SMS)
    gs.addInfoMessage('Loan application approved. Disbursement can now be processed.')
    
    logTransaction('application_approved', current.getUniqueValue(), 
                  current.getValue('customer'), 
                  'Loan approved by ' + gs.getUser().getName())
}

function handleLoanRejection(current) {
    // Reject associated AI plans
    var planId = current.getValue('ai_plan_reference')
    if (planId) {
        var planGr = new GlideRecord('x_1610509_intellil_ai_repayment_plan')
        if (planGr.get(planId)) {
            planGr.setValue('status', 'rejected')
            planGr.update()
        }
    }
    
    // Send notification
    gs.addInfoMessage('Loan application rejected. Reason: ' + current.getValue('rejected_reason'))
    
    logTransaction('application_rejected', current.getUniqueValue(), 
                  current.getValue('customer'), 
                  'Loan rejected. Reason: ' + current.getValue('rejected_reason'))
}

function handleLoanDisbursement(current) {
    logTransaction('loan_disbursed', current.getUniqueValue(), 
                  current.getValue('customer'), 
                  'Loan amount disbursed: $' + current.getValue('loan_amount'))
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