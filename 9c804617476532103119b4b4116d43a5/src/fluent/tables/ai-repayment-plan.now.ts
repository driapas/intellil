import '@servicenow/sdk/global'
import { Table, StringColumn, DecimalColumn, DateTimeColumn, ReferenceColumn, IntegerColumn } from '@servicenow/sdk/core'

export const x_1610509_intellil_ai_repayment_plan = Table({
    name: 'x_1610509_intellil_ai_repayment_plan',
    label: 'AI Repayment Plan',
    schema: {
        application: ReferenceColumn({
            label: 'Loan Application',
            referenceTable: 'x_1610509_intellil_loan_application',
            mandatory: true
        }),
        customer: ReferenceColumn({
            label: 'Customer',
            referenceTable: 'x_1610509_intellil_customer',
            mandatory: true
        }),
        total_amount: DecimalColumn({
            label: 'Total Amount',
            mandatory: true
        }),
        installment_count: IntegerColumn({
            label: 'Number of Installments',
            mandatory: true,
            min: 1,
            max: 12
        }),
        generated_date: DateTimeColumn({
            label: 'Generated Date',
            default: 'javascript:new GlideDateTime().getDisplayValue()'
        }),
        ai_risk_score: DecimalColumn({
            label: 'AI Risk Score'
        }),
        status: StringColumn({
            label: 'Status',
            mandatory: true,
            choices: {
                generated: { label: 'Generated', sequence: 0 },
                accepted: { label: 'Accepted', sequence: 1 },
                rejected: { label: 'Rejected', sequence: 2 },
                active: { label: 'Active', sequence: 3 },
                completed: { label: 'Completed', sequence: 4 }
            },
            dropdown: 'dropdown_with_none',
            default: 'generated'
        }),
        plan_description: StringColumn({
            label: 'Plan Description',
            maxLength: 1000
        }),
        ai_reasoning: StringColumn({
            label: 'AI Reasoning',
            maxLength: 2000
        }),
        recommended_by_ai: StringColumn({
            label: 'AI Recommendation Level',
            choices: {
                high: { label: 'Highly Recommended', sequence: 0 },
                medium: { label: 'Recommended', sequence: 1 },
                low: { label: 'Low Recommendation', sequence: 2 },
                not_recommended: { label: 'Not Recommended', sequence: 3 }
            },
            dropdown: 'dropdown_with_none'
        })
    },
    display: 'installment_count',
    actions: ['create', 'read', 'update', 'delete'],
    accessible_from: 'package_private',
    audit: true
})