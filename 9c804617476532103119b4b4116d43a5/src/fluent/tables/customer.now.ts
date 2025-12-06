import '@servicenow/sdk/global'
import { Table, StringColumn, DecimalColumn, DateColumn, IntegerColumn, BooleanColumn } from '@servicenow/sdk/core'

export const x_1610509_intellil_customer = Table({
    name: 'x_1610509_intellil_customer',
    label: 'Customer',
    schema: {
        first_name: StringColumn({ 
            label: 'First Name', 
            maxLength: 50, 
            mandatory: true 
        }),
        last_name: StringColumn({ 
            label: 'Last Name', 
            maxLength: 50, 
            mandatory: true 
        }),
        email: StringColumn({ 
            label: 'Email', 
            maxLength: 100, 
            mandatory: true 
        }),
        phone: StringColumn({ 
            label: 'Phone Number', 
            maxLength: 20, 
            mandatory: true 
        }),
        date_of_birth: DateColumn({ 
            label: 'Date of Birth' 
        }),
        job_title: StringColumn({ 
            label: 'Job Title', 
            maxLength: 100 
        }),
        employer: StringColumn({ 
            label: 'Employer', 
            maxLength: 100 
        }),
        monthly_income: DecimalColumn({ 
            label: 'Monthly Income', 
            mandatory: true 
        }),
        salary_cycle: StringColumn({
            label: 'Salary Cycle',
            mandatory: true,
            choices: {
                weekly: { label: 'Weekly', sequence: 0 },
                bi_weekly: { label: 'Bi-Weekly', sequence: 1 },
                monthly: { label: 'Monthly', sequence: 2 }
            },
            dropdown: 'dropdown_with_none'
        }),
        next_salary_date: DateColumn({ 
            label: 'Next Salary Date', 
            mandatory: true 
        }),
        monthly_expenses: DecimalColumn({ 
            label: 'Monthly Expenses' 
        }),
        credit_score: IntegerColumn({ 
            label: 'Credit Score',
            min: 300,
            max: 850
        }),
        address: StringColumn({ 
            label: 'Address', 
            maxLength: 255 
        }),
        city: StringColumn({ 
            label: 'City', 
            maxLength: 50 
        }),
        state: StringColumn({ 
            label: 'State', 
            maxLength: 50 
        }),
        zip_code: StringColumn({ 
            label: 'ZIP Code', 
            maxLength: 10 
        }),
        account_status: StringColumn({
            label: 'Account Status',
            choices: {
                active: { label: 'Active', sequence: 0 },
                inactive: { label: 'Inactive', sequence: 1 },
                suspended: { label: 'Suspended', sequence: 2 }
            },
            dropdown: 'dropdown_with_none',
            default: 'active'
        }),
        identity_verified: BooleanColumn({ 
            label: 'Identity Verified', 
            default: false 
        })
    },
    display: 'first_name',
    actions: ['create', 'read', 'update', 'delete'],
    accessible_from: 'package_private',
    audit: true
})