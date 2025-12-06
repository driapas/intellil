// Disburse Loan - Server Script
import { gs } from '@servicenow/glide'

// Create disbursement record
var disbursement = new GlideRecord('x_1610509_intellil_loan_disbursement')
disbursement.initialize()
disbursement.application = current.sys_id
disbursement.disbursed_date = new GlideDateTime()
disbursement.amount = current.loan_amount
disbursement.disbursed_by = gs.getUserID()
disbursement.disbursement_method = 'bank_transfer'
disbursement.insert()

// Update loan application status
current.status = 'disbursed'
current.disbursed_date = new GlideDateTime()
current.update()

// Log transaction
var transaction = new GlideRecord('x_1610509_intellil_loan_transaction')
transaction.initialize()
transaction.type = 'disbursement'
transaction.user = gs.getUserID()
transaction.application = current.sys_id
transaction.amount = current.loan_amount
transaction.remarks = 'Loan funds disbursed: $' + current.loan_amount
transaction.insert()

// Trigger notification workflow
gs.eventQueue('intelli_loan.disbursed', current, current.customer, gs.getUserID())

gs.addInfoMessage('✅ Funds Disbursed Successfully! Amount: $' + current.loan_amount)
window.location.reload()