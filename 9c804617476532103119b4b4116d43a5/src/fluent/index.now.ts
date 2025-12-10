// Intelli-Loan Application - Main Index
// AI-Assisted Micro-Loan Management System

import '@servicenow/sdk/global'

// Import all roles
import './roles/borrower.now.js'
import './roles/loan-officer.now.js'
import './roles/admin.now.js'

// Import authentication script includes
import './script-includes/auth-service-fluent.now.js'

// Import REST API configuration
import './rest-apis/auth-api-config.now.js'

// Import all tables
import './tables/customer.now.js'
import './tables/loan-application.now.js'