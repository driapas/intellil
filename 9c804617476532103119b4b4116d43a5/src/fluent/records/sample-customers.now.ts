import '@servicenow/sdk/global'
import { Record } from '@servicenow/sdk/core'

// Sample Customer Records
export const sampleCustomer1 = Record({
    $id: Now.ID['sample_customer_1'],
    table: 'x_1610509_intellil_customer',
    data: {
        first_name: 'John',
        last_name: 'Doe',
        email: 'john.doe@email.com',
        phone: '+1-555-0101',
        date_of_birth: '1990-05-15',
        job_title: 'Software Developer',
        employer: 'Tech Solutions Inc',
        monthly_income: 4500,
        salary_cycle: 'monthly',
        next_salary_date: '2024-02-01',
        monthly_expenses: 3200,
        credit_score: 720,
        address: '123 Main Street',
        city: 'San Francisco',
        state: 'CA',
        zip_code: '94105',
        account_status: 'active',
        identity_verified: true
    },
    $meta: {
        installMethod: 'demo'
    }
})

export const sampleCustomer2 = Record({
    $id: Now.ID['sample_customer_2'],
    table: 'x_1610509_intellil_customer',
    data: {
        first_name: 'Jane',
        last_name: 'Smith',
        email: 'jane.smith@email.com',
        phone: '+1-555-0102',
        date_of_birth: '1985-08-22',
        job_title: 'Marketing Manager',
        employer: 'Creative Agency LLC',
        monthly_income: 3800,
        salary_cycle: 'bi_weekly',
        next_salary_date: '2024-01-26',
        monthly_expenses: 2800,
        credit_score: 680,
        address: '456 Oak Avenue',
        city: 'Portland',
        state: 'OR',
        zip_code: '97201',
        account_status: 'active',
        identity_verified: true
    },
    $meta: {
        installMethod: 'demo'
    }
})

export const sampleCustomer3 = Record({
    $id: Now.ID['sample_customer_3'],
    table: 'x_1610509_intellil_customer',
    data: {
        first_name: 'Michael',
        last_name: 'Johnson',
        email: 'michael.johnson@email.com',
        phone: '+1-555-0103',
        date_of_birth: '1992-12-03',
        job_title: 'Retail Associate',
        employer: 'Local Store',
        monthly_income: 2400,
        salary_cycle: 'weekly',
        next_salary_date: '2024-01-19',
        monthly_expenses: 2200,
        credit_score: 580,
        address: '789 Pine Street',
        city: 'Austin',
        state: 'TX',
        zip_code: '73301',
        account_status: 'active',
        identity_verified: false
    },
    $meta: {
        installMethod: 'demo'
    }
})