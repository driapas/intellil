import '@servicenow/sdk/global'
import { Property } from '@servicenow/sdk/core'

// System Properties for Intelli-Loan Configuration

// Default Interest Rate (15%)
Property({
    $id: Now.ID['default_interest_rate_prop'],
    name: 'x_1610509_intellil.default_interest_rate',
    type: 'decimal',
    value: '0.15',
    description: 'Default interest rate for loan applications (15%)',
    category: 'Intelli-Loan Configuration'
})

// Maximum Loan Amount
Property({
    $id: Now.ID['max_loan_amount_prop'],
    name: 'x_1610509_intellil.max_loan_amount',
    type: 'decimal',
    value: '5000',
    description: 'Maximum loan amount allowed per application',
    category: 'Intelli-Loan Configuration'
})

// Minimum Loan Amount
Property({
    $id: Now.ID['min_loan_amount_prop'],
    name: 'x_1610509_intellil.min_loan_amount',
    type: 'decimal',
    value: '100',
    description: 'Minimum loan amount allowed per application',
    category: 'Intelli-Loan Configuration'
})

// Maximum Installments
Property({
    $id: Now.ID['max_installments_prop'],
    name: 'x_1610509_intellil.max_installments',
    type: 'integer',
    value: '12',
    description: 'Maximum number of installment periods allowed',
    category: 'Intelli-Loan Configuration'
})

// Late Fee Percentage
Property({
    $id: Now.ID['late_fee_percentage_prop'],
    name: 'x_1610509_intellil.late_fee_percentage',
    type: 'decimal',
    value: '0.05',
    description: 'Late fee percentage applied to overdue payments (5%)',
    category: 'Intelli-Loan Configuration'
})

// Gemini AI API Key (will be set manually)
Property({
    $id: Now.ID['gemini_api_key_prop'],
    name: 'x_1610509_intellil.gemini_api_key',
    type: 'string',
    value: '',
    description: 'Gemini AI API Key for intelligent loan analysis (set manually for security)',
    category: 'Intelli-Loan AI Configuration'
})