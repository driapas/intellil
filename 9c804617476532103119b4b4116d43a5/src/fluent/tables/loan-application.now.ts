import '@servicenow/sdk/global'
import { Table, StringColumn, DecimalColumn, DateTimeColumn, ReferenceColumn, IntegerColumn } from '@servicenow/sdk/core'

export const x_1610509_intellil_loan_application = Table({
    name: 'x_1610509_intellil_loan_application',
    label: 'Loan Application',
    schema: {
        customer: ReferenceColumn({
            label: 'Customer',
            referenceTable: 'x_1610509_intellil_customer',
            mandatory: true
        }),
        loan_amount: DecimalColumn({
            label: 'Loan Amount Requested',
            mandatory: true
        }),
        loan_purpose: StringColumn({
            label: 'Loan Purpose',
            maxLength: 255,
            mandatory: true,
            choices: {
                business: { label: 'Business', sequence: 0 },
                education: { label: 'Education', sequence: 1 },
                emergency: { label: 'Emergency', sequence: 2 },
                medical: { label: 'Medical', sequence: 3 },
                personal: { label: 'Personal', sequence: 4 },
                home_improvement: { label: 'Home Improvement', sequence: 5 },
                debt_consolidation: { label: 'Debt Consolidation', sequence: 6 },
                other: { label: 'Other', sequence: 7 }
            },
            dropdown: 'dropdown_with_none'
        }),
        application_date: DateTimeColumn({
            label: 'Application Date',
            default: 'javascript:new GlideDateTime().getDisplayValue()'
        }),
        status: StringColumn({
            label: 'Status',
            mandatory: true,
            choices: {
                draft: { label: 'Draft', sequence: 0 },
                submitted: { label: 'Submitted', sequence: 1 },
                under_review: { label: 'Under Review', sequence: 2 },
                approved: { label: 'Approved', sequence: 3 },
                rejected: { label: 'Rejected', sequence: 4 },
                disbursed: { label: 'Disbursed', sequence: 5 },
                closed: { label: 'Closed', sequence: 6 }
            },
            dropdown: 'dropdown_with_none',
            default: 'draft'
        }),
        approved_by: ReferenceColumn({
            label: 'Approved By',
            referenceTable: 'sys_user'
        }),
        approved_date: DateTimeColumn({
            label: 'Approved Date'
        }),
        rejected_reason: StringColumn({
            label: 'Rejection Reason',
            maxLength: 500
        }),
        risk_score: DecimalColumn({
            label: 'Risk Score'
        }),
        ai_plan_reference: ReferenceColumn({
            label: 'AI Repayment Plan',
            referenceTable: 'x_1610509_intellil_ai_repayment_plan'
        }),
        interest_rate: DecimalColumn({
            label: 'Interest Rate (%)'
        }),
        term_length: IntegerColumn({
            label: 'Term Length (months)'
        }),
        total_amount: DecimalColumn({
            label: 'Total Amount (with interest)'
        }),
        notes: StringColumn({
            label: 'Notes',
            maxLength: 1000
        })
    },
    display: 'loan_amount',
    actions: ['create', 'read', 'update', 'delete'],
    accessible_from: 'package_private',
    audit: true
})