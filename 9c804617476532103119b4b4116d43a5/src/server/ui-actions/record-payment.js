// Record Payment - Server Script
import { gs } from '@servicenow/glide'

// Prompt for payment amount (this will work in ServiceNow UI)
var amount = prompt('Enter payment amount:')
if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
    gs.addErrorMessage('❌ Please enter a valid payment amount.')
    return
}

// Create payment record
var payment = new GlideRecord('x_1610509_intellil_loan_repayment')
payment.initialize()
payment.application = current.sys_id
payment.payment_date = new GlideDateTime()
payment.amount_paid = parseFloat(amount)
payment.payment_method = 'manual'
payment.paid_by = gs.getUserID()
payment.insert()

// Update AI schedule if applicable
var schedule = new GlideRecord('x_1610509_intellil_ai_repayment_schedule')
schedule.addQuery('plan.application', current.sys_id)
schedule.addQuery('status', 'pending')
schedule.orderBy('due_date')
schedule.query()

var remainingAmount = parseFloat(amount)
while (schedule.next() && remainingAmount > 0) {
    var scheduleAmount = parseFloat(schedule.amount_due)
    if (remainingAmount >= scheduleAmount) {
        schedule.status = 'paid'
        schedule.paid_date = new GlideDateTime()
        remainingAmount -= scheduleAmount
    } else {
        schedule.amount_due = scheduleAmount - remainingAmount
        remainingAmount = 0
    }
    schedule.update()
}

// Log transaction
var transaction = new GlideRecord('x_1610509_intellil_loan_transaction')
transaction.initialize()
transaction.type = 'payment'
transaction.user = gs.getUserID()
transaction.application = current.sys_id
transaction.amount = parseFloat(amount)
transaction.remarks = 'Payment recorded: $' + amount
transaction.insert()

// Check if loan is fully paid
var totalPaid = 0
var payments = new GlideRecord('x_1610509_intellil_loan_repayment')
payments.addQuery('application', current.sys_id)
payments.query()
while (payments.next()) {
    totalPaid += parseFloat(payments.amount_paid)
}

if (totalPaid >= parseFloat(current.loan_amount)) {
    current.status = 'completed'
    current.update()
    
    // Trigger completion notification
    gs.eventQueue('intelli_loan.completed', current, current.customer, gs.getUserID())
    gs.addInfoMessage('🎉 Loan Fully Paid! Congratulations on completing your loan.')
} else {
    // Trigger payment received notification
    gs.eventQueue('intelli_loan.payment_received', current, current.customer, amount)
    gs.addInfoMessage('✅ Payment Recorded Successfully! Amount: $' + amount)
}

window.location.reload()