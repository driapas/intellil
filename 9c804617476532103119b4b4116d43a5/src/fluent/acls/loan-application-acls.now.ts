import '@servicenow/sdk/global'
import { Acl } from '@servicenow/sdk/core'
import { borrowerRole } from '../roles/borrower.now.js'
import { loanOfficerRole } from '../roles/loan-officer.now.js'
import { adminRole } from '../roles/admin.now.js'

// Loan Application table ACLs
export const LoanApplicationReadACL = Acl({
    $id: Now.ID['loan_app_read'],
    type: 'record',
    table: 'x_1610509_intellil_loan_application',
    operation: 'read',
    roles: [borrowerRole, loanOfficerRole, adminRole],
    condition: "gs.hasRole('x_1610509_intellil.admin') || gs.hasRole('x_1610509_intellil.loan_officer') || current.customer.sys_created_by == gs.getUserName()",
    active: true,
    description: 'Allow customers to read their own applications, loan officers and admins to read all'
})

export const LoanApplicationCreateACL = Acl({
    $id: Now.ID['loan_app_create'],
    type: 'record',
    table: 'x_1610509_intellil_loan_application',
    operation: 'create',
    roles: [borrowerRole, loanOfficerRole, adminRole],
    active: true,
    description: 'Allow borrowers to create loan applications'
})

export const LoanApplicationWriteACL = Acl({
    $id: Now.ID['loan_app_write'],
    type: 'record',
    table: 'x_1610509_intellil_loan_application',
    operation: 'write',
    roles: [borrowerRole, loanOfficerRole, adminRole],
    condition: "gs.hasRole('x_1610509_intellil.admin') || gs.hasRole('x_1610509_intellil.loan_officer') || (gs.hasRole('x_1610509_intellil.borrower') && (current.status == 'draft' || current.status == 'submitted') && current.customer.sys_created_by == gs.getUserName())",
    active: true,
    description: 'Allow borrowers to edit their own draft/submitted applications, loan officers and admins to edit all'
})

export const LoanApplicationDeleteACL = Acl({
    $id: Now.ID['loan_app_delete'],
    type: 'record',
    table: 'x_1610509_intellil_loan_application',
    operation: 'delete',
    roles: [adminRole],
    active: true,
    description: 'Only admins can delete loan applications'
})

// AI Repayment Plan ACLs
export const AIRepaymentPlanReadACL = Acl({
    $id: Now.ID['ai_plan_read'],
    type: 'record',
    table: 'x_1610509_intellil_ai_repayment_plan',
    operation: 'read',
    roles: [borrowerRole, loanOfficerRole, adminRole],
    condition: "gs.hasRole('x_1610509_intellil.admin') || gs.hasRole('x_1610509_intellil.loan_officer') || current.customer.sys_created_by == gs.getUserName()",
    active: true,
    description: 'Allow customers to read their own AI plans, loan officers and admins to read all'
})

export const AIRepaymentPlanWriteACL = Acl({
    $id: Now.ID['ai_plan_write'],
    type: 'record',
    table: 'x_1610509_intellil_ai_repayment_plan',
    operation: 'write',
    roles: [loanOfficerRole, adminRole],
    active: true,
    description: 'Allow loan officers and admins to update AI repayment plans'
})

// AI Repayment Schedule ACLs
export const AIRepaymentScheduleReadACL = Acl({
    $id: Now.ID['ai_schedule_read'],
    type: 'record',
    table: 'x_1610509_intellil_ai_repayment_schedule',
    operation: 'read',
    roles: [borrowerRole, loanOfficerRole, adminRole],
    condition: "gs.hasRole('x_1610509_intellil.admin') || gs.hasRole('x_1610509_intellil.loan_officer') || current.plan.customer.sys_created_by == gs.getUserName()",
    active: true,
    description: 'Allow customers to read their own repayment schedules, loan officers and admins to read all'
})

export const AIRepaymentScheduleWriteACL = Acl({
    $id: Now.ID['ai_schedule_write'],
    type: 'record',
    table: 'x_1610509_intellil_ai_repayment_schedule',
    operation: 'write',
    roles: [loanOfficerRole, adminRole],
    active: true,
    description: 'Allow loan officers and admins to update repayment schedules'
})