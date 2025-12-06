import '@servicenow/sdk/global'
import { ApplicationMenu, Record } from '@servicenow/sdk/core'
import { borrowerRole } from '../roles/borrower.now.js'
import { loanOfficerRole } from '../roles/loan-officer.now.js' 
import { adminRole } from '../roles/admin.now.js'

// Create application category for Intelli-Loan with financial theme
export const intelliLoanCategory = Record({
    $id: Now.ID['intelli_loan_category'],
    table: 'sys_app_category',
    data: {
        name: 'Intelli-Loan Financial Services',
        style: 'border-color: #2E8B57; background-color: #F0FFF0; color: #2E8B57;',
    },
})

// Create main Intelli-Loan Application Menu
export const intelliLoanMenu = ApplicationMenu({
    $id: Now.ID['intelli_loan_main_menu'],
    title: 'Intelli-Loan',
    hint: 'AI-Assisted Micro-Loan Management System',
    description: 'Complete loan management with AI-powered repayment planning',
    category: intelliLoanCategory,
    roles: [borrowerRole, loanOfficerRole, adminRole],
    active: true,
    order: 100,
})

// Customer Management Section
export const customerSeparator = Record({
    $id: Now.ID['customer_separator'],
    table: 'sys_app_module',
    data: {
        title: '📋 Customer Management',
        application: intelliLoanMenu.$id,
        link_type: 'SEPARATOR',
        active: true,
        order: 100,
    },
})

export const customerModule = Record({
    $id: Now.ID['customer_module'],
    table: 'sys_app_module',
    data: {
        title: 'Customers',
        application: intelliLoanMenu.$id,
        link_type: 'LIST',
        name: 'x_1610509_intellil_customer',
        hint: 'View and manage customer profiles',
        description: 'Customer registration, profile management, and financial information',
        active: true,
        order: 110,
    },
})

export const newCustomerModule = Record({
    $id: Now.ID['new_customer_module'],
    table: 'sys_app_module',
    data: {
        title: 'Register New Customer',
        application: intelliLoanMenu.$id,
        link_type: 'NEW',
        name: 'x_1610509_intellil_customer',
        hint: 'Register a new customer',
        description: 'Create new customer profile for loan applications',
        active: true,
        order: 120,
    },
})

// Loan Application Section
export const loanApplicationSeparator = Record({
    $id: Now.ID['loan_application_separator'],
    table: 'sys_app_module',
    data: {
        title: '💰 Loan Applications',
        application: intelliLoanMenu.$id,
        link_type: 'SEPARATOR',
        active: true,
        order: 200,
    },
})

export const loanApplicationModule = Record({
    $id: Now.ID['loan_application_module'],
    table: 'sys_app_module',
    data: {
        title: 'All Loan Applications',
        application: intelliLoanMenu.$id,
        link_type: 'LIST',
        name: 'x_1610509_intellil_loan_application',
        hint: 'View all loan applications',
        description: 'Complete loan application management and status tracking',
        active: true,
        order: 210,
    },
})

export const myApplicationsModule = Record({
    $id: Now.ID['my_applications_module'],
    table: 'sys_app_module',
    data: {
        title: 'My Applications',
        application: intelliLoanMenu.$id,
        link_type: 'LIST',
        name: 'x_1610509_intellil_loan_application',
        filter: 'customer=javascript:gs.getUserID()',
        hint: 'View your loan applications',
        description: 'Personal loan applications and status',
        active: true,
        order: 220,
    },
})

export const pendingApplicationsModule = Record({
    $id: Now.ID['pending_applications_module'],
    table: 'sys_app_module',
    data: {
        title: 'Pending Applications',
        application: intelliLoanMenu.$id,
        link_type: 'LIST',
        name: 'x_1610509_intellil_loan_application',
        filter: 'status=submitted',
        hint: 'Applications awaiting review',
        description: 'Loan applications requiring officer review',
        active: true,
        order: 230,
    },
})

export const newLoanApplicationModule = Record({
    $id: Now.ID['new_loan_application_module'],
    table: 'sys_app_module',
    data: {
        title: 'Apply for Loan',
        application: intelliLoanMenu.$id,
        link_type: 'NEW',
        name: 'x_1610509_intellil_loan_application',
        hint: 'Submit a new loan application',
        description: 'Create new loan application with AI planning',
        active: true,
        order: 240,
    },
})

// AI Plans Section
export const aiPlansSeparator = Record({
    $id: Now.ID['ai_plans_separator'],
    table: 'sys_app_module',
    data: {
        title: '🤖 AI Repayment Plans',
        application: intelliLoanMenu.$id,
        link_type: 'SEPARATOR',
        active: true,
        order: 300,
    },
})

export const aiPlansModule = Record({
    $id: Now.ID['ai_plans_module'],
    table: 'sys_app_module',
    data: {
        title: 'All AI Plans',
        application: intelliLoanMenu.$id,
        link_type: 'LIST',
        name: 'x_1610509_intellil_ai_repayment_plan',
        hint: 'View all AI-generated repayment plans',
        description: 'AI-generated personalized repayment schedules',
        active: true,
        order: 310,
    },
})

export const myAiPlansModule = Record({
    $id: Now.ID['my_ai_plans_module'],
    table: 'sys_app_module',
    data: {
        title: 'My AI Plans',
        application: intelliLoanMenu.$id,
        link_type: 'LIST',
        name: 'x_1610509_intellil_ai_repayment_plan',
        filter: 'user=javascript:gs.getUserID()',
        hint: 'Your personalized AI repayment plans',
        description: 'Your AI-generated repayment options',
        active: true,
        order: 320,
    },
})

export const aiSchedulesModule = Record({
    $id: Now.ID['ai_schedules_module'],
    table: 'sys_app_module',
    data: {
        title: 'Payment Schedules',
        application: intelliLoanMenu.$id,
        link_type: 'LIST',
        name: 'x_1610509_intellil_ai_repayment_schedule',
        hint: 'Detailed payment schedules from AI plans',
        description: 'Individual payment schedule entries',
        active: true,
        order: 330,
    },
})

// Payment Management Section  
export const paymentSeparator = Record({
    $id: Now.ID['payment_separator'],
    table: 'sys_app_module',
    data: {
        title: '💳 Payment Management',
        application: intelliLoanMenu.$id,
        link_type: 'SEPARATOR',
        active: true,
        order: 400,
    },
})

export const repaymentsModule = Record({
    $id: Now.ID['repayments_module'],
    table: 'sys_app_module',
    data: {
        title: 'Loan Repayments',
        application: intelliLoanMenu.$id,
        link_type: 'LIST',
        name: 'x_1610509_intellil_loan_repayment',
        hint: 'View all loan repayments',
        description: 'Complete repayment history and tracking',
        active: true,
        order: 410,
    },
})

export const disbursementsModule = Record({
    $id: Now.ID['disbursements_module'],
    table: 'sys_app_module',
    data: {
        title: 'Loan Disbursements',
        application: intelliLoanMenu.$id,
        link_type: 'LIST',
        name: 'x_1610509_intellil_loan_disbursement',
        hint: 'View loan disbursement records',
        description: 'Track when loans are disbursed to customers',
        active: true,
        order: 420,
    },
})

export const overduePaymentsModule = Record({
    $id: Now.ID['overdue_payments_module'],
    table: 'sys_app_module',
    data: {
        title: 'Overdue Payments',
        application: intelliLoanMenu.$id,
        link_type: 'LIST',
        name: 'x_1610509_intellil_ai_repayment_schedule',
        filter: 'status=overdue',
        hint: 'View overdue payment schedules',
        description: 'Track and manage overdue payments',
        active: true,
        order: 430,
    },
})

// Administration Section
export const adminSeparator = Record({
    $id: Now.ID['admin_separator'],
    table: 'sys_app_module',
    data: {
        title: '⚙️ Administration',
        application: intelliLoanMenu.$id,
        link_type: 'SEPARATOR',
        active: true,
        order: 500,
    },
})

export const adminConfigModule = Record({
    $id: Now.ID['admin_config_module'],
    table: 'sys_app_module',
    data: {
        title: 'System Configuration',
        application: intelliLoanMenu.$id,
        link_type: 'LIST',
        name: 'sys_properties',
        filter: 'name STARTSWITHx_1610509_intellil',
        hint: 'Configure system properties',
        description: 'Manage interest rates, limits, and system settings',
        active: true,
        order: 510,
    },
})

export const transactionHistoryModule = Record({
    $id: Now.ID['transaction_history_module'],
    table: 'sys_app_module',
    data: {
        title: 'Transaction History',
        application: intelliLoanMenu.$id,
        link_type: 'LIST',
        name: 'x_1610509_intellil_loan_transaction',
        hint: 'Complete system audit trail',
        description: 'Track all system activities and changes',
        active: true,
        order: 520,
    },
})

export const systemReportsModule = Record({
    $id: Now.ID['system_reports_module'],
    table: 'sys_app_module',
    data: {
        title: 'System Reports',
        application: intelliLoanMenu.$id,
        link_type: 'DIRECT',
        query: '/sys_report_template_list.do?sysparm_query=sys_scope.scope=x_1610509_intellil',
        hint: 'Access system reports and analytics',
        description: 'Business intelligence and reporting dashboard',
        active: true,
        order: 530,
    },
})