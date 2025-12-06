import '@servicenow/sdk/global'
import { Acl } from '@servicenow/sdk/core'
import { borrowerRole } from '../roles/borrower.now.js'
import { loanOfficerRole } from '../roles/loan-officer.now.js'
import { adminRole } from '../roles/admin.now.js'

// Customer table ACLs
export const CustomerReadACL = Acl({
    $id: Now.ID['customer_read'],
    type: 'record',
    table: 'x_1610509_intellil_customer',
    operation: 'read',
    roles: [borrowerRole, loanOfficerRole, adminRole],
    condition: "gs.hasRole('x_1610509_intellil.admin') || gs.hasRole('x_1610509_intellil.loan_officer') || current.sys_created_by == gs.getUserName()",
    active: true,
    description: 'Allow customers to read their own records, loan officers and admins to read all'
})

export const CustomerWriteACL = Acl({
    $id: Now.ID['customer_write'],
    type: 'record',
    table: 'x_1610509_intellil_customer',
    operation: 'write',
    roles: [borrowerRole, loanOfficerRole, adminRole],
    condition: "gs.hasRole('x_1610509_intellil.admin') || gs.hasRole('x_1610509_intellil.loan_officer') || current.sys_created_by == gs.getUserName()",
    active: true,
    description: 'Allow customers to update their own records, loan officers and admins to update all'
})

export const CustomerCreateACL = Acl({
    $id: Now.ID['customer_create'],
    type: 'record',
    table: 'x_1610509_intellil_customer',
    operation: 'create',
    roles: [borrowerRole, loanOfficerRole, adminRole],
    active: true,
    description: 'Allow borrowers, loan officers and admins to create customer records'
})

export const CustomerDeleteACL = Acl({
    $id: Now.ID['customer_delete'],
    type: 'record',
    table: 'x_1610509_intellil_customer',
    operation: 'delete',
    roles: [adminRole],
    active: true,
    description: 'Only admins can delete customer records'
})