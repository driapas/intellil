import '@servicenow/sdk/global'
import { UiAction } from '@servicenow/sdk/core'

// UI Action: Generate AI Repayment Plan
export const generateAIPlanAction = UiAction({
    $id: Now.ID['generate_ai_plan_action'],
    table: 'x_1610509_intellil_loan_application',
    name: '🤖 Generate AI Plan',
    actionName: 'generate_ai_plan',
    active: true,
    showUpdate: true,
    showInsert: false,
    hint: 'Generate personalized AI repayment plan based on customer profile',
    condition: `current.status == 'draft' || current.status == 'submitted'`,
    roles: ['x_1610509_intellil.borrower', 'x_1610509_intellil.loan_officer', 'x_1610509_intellil.admin'],
    form: {
        showButton: true,
        style: 'primary',
    },
    script: Now.include('../../server/ui-actions/generate-ai-plan.js')
})

// UI Action: Accept AI Plan
export const acceptAIPlanAction = UiAction({
    $id: Now.ID['accept_ai_plan_action'],
    table: 'x_1610509_intellil_ai_repayment_plan',
    name: '✅ Accept This Plan',
    actionName: 'accept_ai_plan',
    active: true,
    showUpdate: true,
    showInsert: false,
    hint: 'Accept this AI repayment plan and link it to your loan application',
    condition: `current.status == 'generated'`,
    roles: ['x_1610509_intellil.borrower', 'x_1610509_intellil.loan_officer'],
    form: {
        showButton: true,
        style: 'primary',
    },
    script: Now.include('../../server/ui-actions/accept-ai-plan.js')
})

// UI Action: Submit Loan Application
export const submitApplicationAction = UiAction({
    $id: Now.ID['submit_application_action'],
    table: 'x_1610509_intellil_loan_application',
    name: '📤 Submit Application',
    actionName: 'submit_application',
    active: true,
    showUpdate: true,
    showInsert: false,
    hint: 'Submit your loan application for review',
    condition: `current.status == 'draft'`,
    roles: ['x_1610509_intellil.borrower', 'x_1610509_intellil.loan_officer'],
    form: {
        showButton: true,
        style: 'primary',
    },
    script: Now.include('../../server/ui-actions/submit-application.js')
})

// UI Action: Approve Loan (Loan Officer)
export const approveLoanAction = UiAction({
    $id: Now.ID['approve_loan_action'],
    table: 'x_1610509_intellil_loan_application',
    name: '✅ Approve Loan',
    actionName: 'approve_loan',
    active: true,
    showUpdate: true,
    showInsert: false,
    hint: 'Approve this loan application',
    condition: `current.status == 'submitted'`,
    roles: ['x_1610509_intellil.loan_officer', 'x_1610509_intellil.admin'],
    form: {
        showButton: true,
        style: 'primary',
    },
    script: Now.include('../../server/ui-actions/approve-loan.js')
})

// UI Action: Reject Loan (Loan Officer)
export const rejectLoanAction = UiAction({
    $id: Now.ID['reject_loan_action'],
    table: 'x_1610509_intellil_loan_application',
    name: '❌ Reject Loan',
    actionName: 'reject_loan',
    active: true,
    showUpdate: true,
    showInsert: false,
    hint: 'Reject this loan application',
    condition: `current.status == 'submitted'`,
    roles: ['x_1610509_intellil.loan_officer', 'x_1610509_intellil.admin'],
    form: {
        showButton: true,
        style: 'destructive',
    },
    script: Now.include('../../server/ui-actions/reject-loan.js')
})

// UI Action: Disburse Loan
export const disburseLoanAction = UiAction({
    $id: Now.ID['disburse_loan_action'],
    table: 'x_1610509_intellil_loan_application',
    name: '💰 Disburse Funds',
    actionName: 'disburse_loan',
    active: true,
    showUpdate: true,
    showInsert: false,
    hint: 'Disburse approved loan funds to customer',
    condition: `current.status == 'approved'`,
    roles: ['x_1610509_intellil.loan_officer', 'x_1610509_intellil.admin'],
    form: {
        showButton: true,
        style: 'primary',
    },
    script: Now.include('../../server/ui-actions/disburse-loan.js')
})

// UI Action: Record Payment
export const recordPaymentAction = UiAction({
    $id: Now.ID['record_payment_action'],
    table: 'x_1610509_intellil_loan_application',
    name: '💳 Record Payment',
    actionName: 'record_payment',
    active: true,
    showUpdate: true,
    showInsert: false,
    hint: 'Record a loan repayment',
    condition: `current.status == 'disbursed'`,
    roles: ['x_1610509_intellil.borrower', 'x_1610509_intellil.loan_officer', 'x_1610509_intellil.admin'],
    form: {
        showButton: true,
        style: 'primary',
    },
    script: Now.include('../../server/ui-actions/record-payment.js')
})