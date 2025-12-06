import '@servicenow/sdk/global'
import { Table, StringColumn, DecimalColumn, DateTimeColumn, ReferenceColumn } from '@servicenow/sdk/core'

export const x_1610509_intellil_loan_repayment = Table({
    name: 'x_1610509_intellil_loan_repayment',
    label: 'Loan Repayment',
    schema: {
        application: ReferenceColumn({
            label: 'Loan Application',
            referenceTable: 'x_1610509_intellil_loan_application',
            mandatory: true
        }),
        schedule_item: ReferenceColumn({
            label: 'Schedule Item',
            referenceTable: 'x_1610509_intellil_ai_repayment_schedule'
        }),
        payment_date: DateTimeColumn({
            label: 'Payment Date',
            mandatory: true,
            default: 'javascript:new GlideDateTime().getDisplayValue()'
        }),
        amount_paid: DecimalColumn({
            label: 'Amount Paid',
            mandatory: true
        }),
        payment_method: StringColumn({
            label: 'Payment Method',
            choices: {
                cash: { label: 'Cash', sequence: 0 },
                bank_transfer: { label: 'Bank Transfer', sequence: 1 },
                mobile_money: { label: 'Mobile Money', sequence: 2 },
                credit_card: { label: 'Credit Card', sequence: 3 },
                debit_card: { label: 'Debit Card', sequence: 4 },
                check: { label: 'Check', sequence: 5 }
            },
            dropdown: 'dropdown_with_none'
        }),
        transaction_reference: StringColumn({
            label: 'Transaction Reference',
            maxLength: 100
        }),
        payment_status: StringColumn({
            label: 'Payment Status',
            mandatory: true,
            choices: {
                pending: { label: 'Pending', sequence: 0 },
                completed: { label: 'Completed', sequence: 1 },
                failed: { label: 'Failed', sequence: 2 },
                cancelled: { label: 'Cancelled', sequence: 3 },
                refunded: { label: 'Refunded', sequence: 4 }
            },
            dropdown: 'dropdown_with_none',
            default: 'completed'
        }),
        processed_by: ReferenceColumn({
            label: 'Processed By',
            referenceTable: 'sys_user'
        }),
        notes: StringColumn({
            label: 'Notes',
            maxLength: 500
        }),
        late_fee_paid: DecimalColumn({
            label: 'Late Fee Paid'
        })
    },
    display: 'amount_paid',
    actions: ['create', 'read', 'update', 'delete'],
    accessible_from: 'package_private',
    audit: true
})