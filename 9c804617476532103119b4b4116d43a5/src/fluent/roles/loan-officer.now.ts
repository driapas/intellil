import '@servicenow/sdk/global'
import { Role } from '@servicenow/sdk/core'

export const loanOfficerRole = Role({
    $id: Now.ID['loan_officer'],
    name: 'x_1610509_intellil.loan_officer',
    description: 'Role for loan officers who can review and approve/reject loan applications',
    grantable: true,
    can_delegate: false,
    elevated_privilege: false
})