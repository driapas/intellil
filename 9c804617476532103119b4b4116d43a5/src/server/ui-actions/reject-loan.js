// Reject Loan - Server Script
import { gs } from '@servicenow/glide'

// Prompt for rejection reason (this will work in ServiceNow UI)
var reason = prompt('Please enter the rejection reason:')
if (!reason) {
    gs.addErrorMessage('❌ Rejection reason is required.')
    return
}

// Update status and rejection details
current.status = 'rejected'
current.rejected_by = gs.getUserID()
current.rejected_date = new GlideDateTime()
current.rejection_reason = reason
current.update()

// Log transaction
var transaction = new GlideRecord('x_1610509_intellil_loan_transaction')
transaction.initialize()
transaction.type = 'rejection'
transaction.user = gs.getUserID()
transaction.application = current.sys_id
transaction.remarks = 'Loan application rejected: ' + reason
transaction.insert()

// Trigger notification workflow
gs.eventQueue('intelli_loan.rejected', current, current.customer, gs.getUserID())

gs.addInfoMessage('❌ Loan Rejected. Customer has been notified.')
window.location.reload()