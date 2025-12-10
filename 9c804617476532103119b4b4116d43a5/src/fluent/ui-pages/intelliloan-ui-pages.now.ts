import '@servicenow/sdk/global'
import { UiPage } from '@servicenow/sdk/core'

// Landing Page
import landingPage from '../../client/landing.html'

export const intelliloan_landing = UiPage({
    $id: Now.ID['intelliloan_landing'],
    endpoint: 'x_1610509_intellil_landing.do',
    description: 'IntelliLoan Landing Page with Sign In and Register options',
    category: 'general',
    html: landingPage,
    direct: true
})

// Login Page
import loginPage from '../../client/login.html'

export const intelliloan_login = UiPage({
    $id: Now.ID['intelliloan_login'],
    endpoint: 'x_1610509_intellil_login.do',
    description: 'IntelliLoan Login Page for user authentication',
    category: 'general',
    html: loginPage,
    direct: true
})

// Register Page
import registerPage from '../../client/register.html'

export const intelliloan_register = UiPage({
    $id: Now.ID['intelliloan_register'],
    endpoint: 'x_1610509_intellil_register.do',
    description: 'IntelliLoan Registration Page for new customers',
    category: 'general',
    html: registerPage,
    direct: true
})

// Dashboard Page
import dashboardPage from '../../client/dashboard.html'

export const intelliloan_dashboard = UiPage({
    $id: Now.ID['intelliloan_dashboard'],
    endpoint: 'x_1610509_intellil_dashboard.do',
    description: 'Intelli-Loan Dashboard - Modern AI-powered loan management interface',
    category: 'general',
    html: dashboardPage,
    direct: true
})

import loanApplicationPage from '../../client/loan-application.html'

export const intelliloan_application = UiPage({
    $id: Now.ID['intelliloan_application'],
    endpoint: 'x_1610509_intellil_application.do',
    description: 'Loan Application Interface with AI Plan Generation',
    category: 'general',
    html: loanApplicationPage,
    direct: true
})

import customerPortalPage from '../../client/customer-portal.html'

export const intelliloan_customer_portal = UiPage({
    $id: Now.ID['intelliloan_customer_portal'],
    endpoint: 'x_1610509_intellil_customer_portal.do',
    description: 'Customer Portal for Loan Management and AI Plans',
    category: 'general',
    html: customerPortalPage,
    direct: true
})

import loanOfficerPage from '../../client/loan-officer.html'

export const intelliloan_officer_dashboard = UiPage({
    $id: Now.ID['intelliloan_officer_dashboard'],
    endpoint: 'x_1610509_intellil_officer_dashboard.do',
    description: 'Loan Officer Dashboard for Application Review and Approval',
    category: 'general',
    html: loanOfficerPage,
    direct: true
})

import adminDashboardPage from '../../client/admin-dashboard.html'

export const intelliloan_admin_dashboard = UiPage({
    $id: Now.ID['intelliloan_admin_dashboard'],
    endpoint: 'x_1610509_intellil_admin_dashboard.do',
    description: 'Admin Dashboard for System Configuration and Analytics',
    category: 'general',
    html: adminDashboardPage,
    direct: true
})