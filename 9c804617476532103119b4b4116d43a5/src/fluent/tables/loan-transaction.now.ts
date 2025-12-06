import '@servicenow/sdk/global'
import { Table, StringColumn, DateTimeColumn, ReferenceColumn } from '@servicenow/sdk/core'

export const x_1610509_intellil_loan_transaction = Table({
    name: 'x_1610509_intellil_loan_transaction',
    label: 'Loan Transaction',
    schema: {
        transaction_type: StringColumn({
            label: 'Transaction Type',
            mandatory: true,
            choices: {
                application_submitted: { label: 'Application Submitted', sequence: 0 },
                application_reviewed: { label: 'Application Reviewed', sequence: 1 },
                ai_plan_generated: { label: 'AI Plan Generated', sequence: 2 },
                ai_plan_accepted: { label: 'AI Plan Accepted', sequence: 3 },
                ai_plan_rejected: { label: 'AI Plan Rejected', sequence: 4 },
                application_approved: { label: 'Application Approved', sequence: 5 },
                application_rejected: { label: 'Application Rejected', sequence: 6 },
                loan_disbursed: { label: 'Loan Disbursed', sequence: 7 },
                payment_received: { label: 'Payment Received', sequence: 8 },
                payment_overdue: { label: 'Payment Overdue', sequence: 9 },
                late_fee_applied: { label: 'Late Fee Applied', sequence: 10 },
                loan_closed: { label: 'Loan Closed', sequence: 11 }
            },
            dropdown: 'dropdown_with_none'
        }),
        application: ReferenceColumn({
            label: 'Loan Application',
            referenceTable: 'x_1610509_intellil_loan_application'
        }),
        customer: ReferenceColumn({
            label: 'Customer',
            referenceTable: 'x_1610509_intellil_customer'
        }),
        user: ReferenceColumn({
            label: 'User',
            referenceTable: 'sys_user'
        }),
        timestamp: DateTimeColumn({
            label: 'Timestamp',
            mandatory: true,
            default: 'javascript:new GlideDateTime().getDisplayValue()'
        }),
        remarks: StringColumn({
            label: 'Remarks',
            maxLength: 1000
        }),
        old_value: StringColumn({
            label: 'Old Value',
            maxLength: 255
        }),
        new_value: StringColumn({
            label: 'New Value',
            maxLength: 255
        }),
        ip_address: StringColumn({
            label: 'IP Address',
            maxLength: 45
        }),
        user_agent: StringColumn({
            label: 'User Agent',
            maxLength: 500
        })
    },
    display: 'transaction_type',
    actions: ['create', 'read', 'update', 'delete'],
    accessible_from: 'package_private',
    audit: true
})