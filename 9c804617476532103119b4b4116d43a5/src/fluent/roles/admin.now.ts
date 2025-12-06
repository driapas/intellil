import '@servicenow/sdk/global'
import { Role } from '@servicenow/sdk/core'
import { loanOfficerRole } from './loan-officer.now.js'
import { borrowerRole } from './borrower.now.js'

export const adminRole = Role({
    $id: Now.ID['admin'],
    name: 'x_1610509_intellil.admin',
    description: 'Administrator role for the Intelli-Loan system with full access to configure settings and manage all data',
    grantable: true,
    can_delegate: true,
    elevated_privilege: true,
    contains_roles: [loanOfficerRole, borrowerRole]
})