// Approve Loan - Server Script
import { gs } from '@servicenow/glide'

// Validate that an AI plan has been accepted
if (!current.ai_plan_reference) {
    gs.addErrorMessage('❌ Please ensure an AI repayment plan has been accepted before approving.')
    return
}

// Update status and approval details
current.status = 'approved'
current.approved_by = gs.getUserID()
current.approved_date = new GlideDateTime()
current.update()

// Log transaction
var transaction = new GlideRecord('x_1610509_intellil_loan_transaction')
transaction.initialize()
transaction.type = 'approval'
transaction.user = gs.getUserID()
transaction.application = current.sys_id
transaction.remarks = 'Loan application approved by ' + gs.getUserDisplayName()
transaction.insert()

// Trigger notification workflow
gs.eventQueue('intelli_loan.approved', current, current.customer, gs.getUserID())

gs.addInfoMessage('✅ Loan Approved Successfully! Customer has been notified.')
window.location.reload()