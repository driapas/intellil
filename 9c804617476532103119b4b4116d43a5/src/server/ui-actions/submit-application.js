// Submit Application - Server Script
import { gs } from '@servicenow/glide'

// Validate required fields
if (!current.customer || !current.loan_amount || !current.loan_purpose) {
    gs.addErrorMessage('❌ Please fill in all required fields before submitting.')
    return
}

// Validate loan amount is within limits
var maxAmount = gs.getProperty('x_1610509_intellil.max_loan_amount', '5000')
var minAmount = gs.getProperty('x_1610509_intellil.min_loan_amount', '100')

if (current.loan_amount > parseFloat(maxAmount)) {
    gs.addErrorMessage('❌ Loan amount exceeds maximum limit of $' + maxAmount)
    return
}

if (current.loan_amount < parseFloat(minAmount)) {
    gs.addErrorMessage('❌ Loan amount below minimum limit of $' + minAmount)
    return
}

// Update status
current.status = 'submitted'
current.submitted_date = new GlideDateTime()
current.update()

// Log transaction
var transaction = new GlideRecord('x_1610509_intellil_loan_transaction')
transaction.initialize()
transaction.type = 'application_submitted'
transaction.user = gs.getUserID()
transaction.application = current.sys_id
transaction.remarks = 'Loan application submitted for review'
transaction.insert()

// Trigger notification workflow
gs.eventQueue('intelli_loan.application_submitted', current, current.customer, gs.getUserID())

gs.addInfoMessage('✅ Application Submitted Successfully! You will be notified of the review status.')
window.location.reload()