import '@servicenow/sdk/global'
import { UiPage } from '@servicenow/sdk/core'
import dashboardPage from '../../client/dashboard.html'

export const intelliloan_dashboard = UiPage({
    $id: Now.ID['intelliloan_dashboard'],
    endpoint: 'intelliloan_dashboard.do',
    description: 'Intelli-Loan Dashboard - Modern AI-powered loan management interface',
    category: 'general',
    html: dashboardPage,
    direct: true
})

import loanApplicationPage from '../../client/loan-application.html'

export const intelliloan_application = UiPage({
    $id: Now.ID['intelliloan_application'],
    endpoint: 'intelliloan_application.do',
    description: 'Loan Application Interface with AI Plan Generation',
    category: 'general',
    html: loanApplicationPage,
    direct: true
})

import customerPortalPage from '../../client/customer-portal.html'

export const intelliloan_customer_portal = UiPage({
    $id: Now.ID['intelliloan_customer_portal'],
    endpoint: 'intelliloan_customer_portal.do',
    description: 'Customer Portal for Loan Management and AI Plans',
    category: 'general',
    html: customerPortalPage,
    direct: true
})

import loanOfficerPage from '../../client/loan-officer.html'

export const intelliloan_officer_dashboard = UiPage({
    $id: Now.ID['intelliloan_officer_dashboard'],
    endpoint: 'intelliloan_officer_dashboard.do',
    description: 'Loan Officer Dashboard for Application Review and Approval',
    category: 'general',
    html: loanOfficerPage,
    direct: true
})

import adminDashboardPage from '../../client/admin-dashboard.html'

export const intelliloan_admin_dashboard = UiPage({
    $id: Now.ID['intelliloan_admin_dashboard'],
    endpoint: 'intelliloan_admin_dashboard.do',
    description: 'Admin Dashboard for System Configuration and Analytics',
    category: 'general',
    html: adminDashboardPage,
    direct: true
})