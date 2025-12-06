import '@servicenow/sdk/global'
import { Acl } from '@servicenow/sdk/core'
import { borrowerRole } from '../roles/borrower.now.js'
import { loanOfficerRole } from '../roles/loan-officer.now.js'  
import { adminRole } from '../roles/admin.now.js'

// Loan Repayment ACLs
export const LoanRepaymentReadACL = Acl({
    $id: Now.ID['loan_repayment_read'],
    type: 'record',
    table: 'x_1610509_intellil_loan_repayment',
    operation: 'read',
    roles: [borrowerRole, loanOfficerRole, adminRole],
    condition: "gs.hasRole('x_1610509_intellil.admin') || gs.hasRole('x_1610509_intellil.loan_officer') || current.application.customer.sys_created_by == gs.getUserName()",
    active: true,
    description: 'Allow customers to read their own repayment records, loan officers and admins to read all'
})

export const LoanRepaymentCreateACL = Acl({
    $id: Now.ID['loan_repayment_create'],
    type: 'record',
    table: 'x_1610509_intellil_loan_repayment',
    operation: 'create',
    roles: [borrowerRole, loanOfficerRole, adminRole],
    active: true,
    description: 'Allow borrowers to create payment records, loan officers and admins to create all'
})

export const LoanRepaymentWriteACL = Acl({
    $id: Now.ID['loan_repayment_write'],
    type: 'record',
    table: 'x_1610509_intellil_loan_repayment',
    operation: 'write',
    roles: [loanOfficerRole, adminRole],
    active: true,
    description: 'Only loan officers and admins can modify repayment records'
})

// Loan Disbursement ACLs
export const LoanDisbursementReadACL = Acl({
    $id: Now.ID['loan_disbursement_read'],
    type: 'record',
    table: 'x_1610509_intellil_loan_disbursement',
    operation: 'read',
    roles: [borrowerRole, loanOfficerRole, adminRole],
    condition: "gs.hasRole('x_1610509_intellil.admin') || gs.hasRole('x_1610509_intellil.loan_officer') || current.application.customer.sys_created_by == gs.getUserName()",
    active: true,
    description: 'Allow customers to read their own disbursement records, loan officers and admins to read all'
})

export const LoanDisbursementCreateACL = Acl({
    $id: Now.ID['loan_disbursement_create'],
    type: 'record',
    table: 'x_1610509_intellil_loan_disbursement',
    operation: 'create',
    roles: [loanOfficerRole, adminRole],
    active: true,
    description: 'Only loan officers and admins can create disbursement records'
})

export const LoanDisbursementWriteACL = Acl({
    $id: Now.ID['loan_disbursement_write'],
    type: 'record',
    table: 'x_1610509_intellil_loan_disbursement',
    operation: 'write',
    roles: [loanOfficerRole, adminRole],
    active: true,
    description: 'Only loan officers and admins can modify disbursement records'
})

// Loan Transaction ACLs
export const LoanTransactionReadACL = Acl({
    $id: Now.ID['loan_transaction_read'],
    type: 'record',
    table: 'x_1610509_intellil_loan_transaction',
    operation: 'read',
    roles: [borrowerRole, loanOfficerRole, adminRole],
    condition: "gs.hasRole('x_1610509_intellil.admin') || gs.hasRole('x_1610509_intellil.loan_officer') || (gs.hasRole('x_1610509_intellil.borrower') && current.customer.sys_created_by == gs.getUserName())",
    active: true,
    description: 'Allow customers to read their own transaction history, loan officers and admins to read all'
})

export const LoanTransactionCreateACL = Acl({
    $id: Now.ID['transaction_create'],
    type: 'record',
    table: 'x_1610509_intellil_loan_transaction',
    operation: 'create',
    roles: [borrowerRole, loanOfficerRole, adminRole],
    active: true,
    description: 'Allow system and users to create transaction records'
})

export const LoanTransactionWriteACL = Acl({
    $id: Now.ID['transaction_write'],
    type: 'record',
    table: 'x_1610509_intellil_loan_transaction',
    operation: 'write',
    roles: [adminRole],
    active: true,
    description: 'Only admins can modify transaction records'
})