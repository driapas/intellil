import '@servicenow/sdk/global'
import { Table, StringColumn, DecimalColumn, DateTimeColumn, ReferenceColumn } from '@servicenow/sdk/core'

export const x_1610509_intellil_loan_disbursement = Table({
    name: 'x_1610509_intellil_loan_disbursement',
    label: 'Loan Disbursement',
    schema: {
        application: ReferenceColumn({
            label: 'Loan Application',
            referenceTable: 'x_1610509_intellil_loan_application',
            mandatory: true
        }),
        disbursed_date: DateTimeColumn({
            label: 'Disbursed Date',
            mandatory: true,
            default: 'javascript:new GlideDateTime().getDisplayValue()'
        }),
        disbursed_amount: DecimalColumn({
            label: 'Disbursed Amount',
            mandatory: true
        }),
        disbursement_method: StringColumn({
            label: 'Disbursement Method',
            choices: {
                bank_transfer: { label: 'Bank Transfer', sequence: 0 },
                mobile_money: { label: 'Mobile Money', sequence: 1 },
                cash: { label: 'Cash', sequence: 2 },
                check: { label: 'Check', sequence: 3 }
            },
            dropdown: 'dropdown_with_none'
        }),
        account_details: StringColumn({
            label: 'Account Details',
            maxLength: 255
        }),
        transaction_reference: StringColumn({
            label: 'Transaction Reference',
            maxLength: 100
        }),
        disbursed_by: ReferenceColumn({
            label: 'Disbursed By',
            referenceTable: 'sys_user',
            mandatory: true
        }),
        status: StringColumn({
            label: 'Status',
            mandatory: true,
            choices: {
                pending: { label: 'Pending', sequence: 0 },
                completed: { label: 'Completed', sequence: 1 },
                failed: { label: 'Failed', sequence: 2 },
                cancelled: { label: 'Cancelled', sequence: 3 }
            },
            dropdown: 'dropdown_with_none',
            default: 'completed'
        }),
        notes: StringColumn({
            label: 'Notes',
            maxLength: 500
        })
    },
    display: 'disbursed_amount',
    actions: ['create', 'read', 'update', 'delete'],
    accessible_from: 'package_private',
    audit: true
})