import '@servicenow/sdk/global'
import { Role } from '@servicenow/sdk/core'

export const borrowerRole = Role({
    $id: Now.ID['borrower'],
    name: 'x_1610509_intellil.borrower',
    description: 'Role for loan borrowers/customers who can apply for loans and manage their own applications',
    grantable: true,
    can_delegate: false,
    elevated_privilege: false
})