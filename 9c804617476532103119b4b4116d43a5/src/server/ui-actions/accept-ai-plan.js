// Accept AI Plan - Server Script
import { gs } from '@servicenow/glide'

// Update the plan status and link to application
current.status = 'accepted'
current.accepted_date = new GlideDateTime()
current.update()

// Update the loan application to reference this plan
var loanApp = new GlideRecord('x_1610509_intellil_loan_application')
if (loanApp.get(current.application)) {
    loanApp.ai_plan_reference = current.sys_id
    loanApp.update()
}

// Log transaction
var transaction = new GlideRecord('x_1610509_intellil_loan_transaction')
transaction.initialize()
transaction.type = 'ai_plan_accepted'
transaction.user = gs.getUserID()
transaction.application = current.application
transaction.remarks = 'AI repayment plan accepted by user'
transaction.insert()

// Trigger notification workflow
gs.eventQueue('intelli_loan.ai_plan_accepted', current, current.application, gs.getUserID())

gs.addInfoMessage('✅ AI Plan Accepted! Your loan application has been updated.')
window.location.reload()