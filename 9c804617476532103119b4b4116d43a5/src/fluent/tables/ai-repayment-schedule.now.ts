import '@servicenow/sdk/global'
import { Table, StringColumn, DecimalColumn, DateColumn, ReferenceColumn, IntegerColumn } from '@servicenow/sdk/core'

export const x_1610509_intellil_ai_repayment_schedule = Table({
    name: 'x_1610509_intellil_ai_repayment_schedule',
    label: 'AI Repayment Schedule',
    schema: {
        plan: ReferenceColumn({
            label: 'AI Repayment Plan',
            referenceTable: 'x_1610509_intellil_ai_repayment_plan',
            mandatory: true
        }),
        installment_number: IntegerColumn({
            label: 'Installment Number',
            mandatory: true
        }),
        due_date: DateColumn({
            label: 'Due Date',
            mandatory: true
        }),
        amount_due: DecimalColumn({
            label: 'Amount Due',
            mandatory: true
        }),
        principal_amount: DecimalColumn({
            label: 'Principal Amount'
        }),
        interest_amount: DecimalColumn({
            label: 'Interest Amount'
        }),
        status: StringColumn({
            label: 'Status',
            mandatory: true,
            choices: {
                pending: { label: 'Pending', sequence: 0 },
                paid: { label: 'Paid', sequence: 1 },
                partial: { label: 'Partially Paid', sequence: 2 },
                overdue: { label: 'Overdue', sequence: 3 },
                waived: { label: 'Waived', sequence: 4 }
            },
            dropdown: 'dropdown_with_none',
            default: 'pending'
        }),
        ai_reasoning: StringColumn({
            label: 'AI Schedule Reasoning',
            maxLength: 1000
        }),
        late_fee: DecimalColumn({
            label: 'Late Fee'
        }),
        days_overdue: IntegerColumn({
            label: 'Days Overdue'
        }),
        payment_window_start: DateColumn({
            label: 'Payment Window Start'
        }),
        payment_window_end: DateColumn({
            label: 'Payment Window End'
        })
    },
    display: 'installment_number',
    actions: ['create', 'read', 'update', 'delete'],
    accessible_from: 'package_private',
    audit: true
})