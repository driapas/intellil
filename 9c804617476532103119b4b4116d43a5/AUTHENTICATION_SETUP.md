# IntelliLoan Authentication Setup Guide

## Overview
This guide explains the authentication flow and setup requirements for the IntelliLoan application.

## Authentication Flow

### 1. Landing Page
- **URL**: `/x_1610509_intellil_landing.do`
- **Purpose**: Main entry point with Sign In and Create Account buttons
- **Access**: Public (no authentication required)

### 2. Registration Flow
- **URL**: `/x_1610509_intellil_register.do`
- **Features**:
  - Two-step registration process
  - Step 1: Account & Personal Information
  - Step 2: Financial Information
  - Auto-assigns borrower role
  - Creates sys_user and customer records
  - Validates unique username and email

### 3. Login Flow
- **URL**: `/x_1610509_intellil_login.do`
- **Role-based Redirection**:
  - **Borrower** → Customer Portal (`/x_1610509_intellil_customer_portal.do`)
  - **Loan Officer** → Officer Dashboard (`/x_1610509_intellil_officer_dashboard.do`)
  - **Admin** → Admin Dashboard (`/x_1610509_intellil_admin_dashboard.do`)

## Backend Components

### Script Include: AuthService
**Location**: `src/server/script-includes/auth-service.js`

**Methods**:
- `registerUser(userData)` - Creates new user account with borrower role
- `loginUser(username, password)` - Authenticates and returns user role
- `getUserPrimaryRole(userId)` - Gets user's primary IntelliLoan role
- `updateUserRole(userId, newRole)` - Admin function to change roles
- `logTransaction(type, applicationId, customerId, remarks)` - Audit logging

### REST API Endpoints
**Base Path**: `/api/x_1610509_intellil/auth`

**Endpoints**:
1. **POST /register**
   - Creates new user account
   - Assigns borrower role
   - Creates customer record
   
2. **POST /login**
   - Validates user credentials
   - Returns user role for redirection
   
3. **PUT /update-role** (Admin only)
   - Changes user role
   - Requires admin privileges

## Frontend Components

### Pages Created
1. **LandingPage.jsx** - Landing page with CTA buttons
2. **LoginPage.jsx** - Authentication form
3. **RegisterPage.jsx** - Two-step registration form

### Styles
- **Landing.css** - Landing page styles with gradient background
- **Auth.css** - Login and register page styles

### HTML Entry Points
- `landing.html` + `landing-main.jsx`
- `login.html` + `login-main.jsx`
- `register.html` + `register-main.jsx`

## Setup Instructions

### After Deployment:

1. **Verify UI Pages are created**:
   - Navigate to: System UI → UI Pages
   - Filter by: `x_1610509_intellil`
   - Should see: landing, login, register pages

2. **Test Registration**:
   - Go to: `https://[instance].service-now.com/x_1610509_intellil_landing.do`
   - Click "Create Account"
   - Complete registration form
   - Verify user created with borrower role

3. **Test Login**:
   - Go to login page
   - Sign in with registered credentials
   - Should redirect to Customer Portal

4. **Admin Role Management**:
   - Login as admin
   - Navigate to: User Administration → Users
   - Find user, click on their name
   - Go to Roles tab
   - Can add/remove roles:
     - `x_1610509_intellil.borrower`
     - `x_1610509_intellil.loan_officer`
     - `x_1610509_intellil.admin`

## Security Features

1. **Password Validation**:
   - Minimum 6 characters
   - Confirmation required
   
2. **Email Uniqueness**:
   - No duplicate emails allowed
   - Validation on registration
   
3. **Role-based Access Control**:
   - Borrowers can only see their own data
   - Officers can review all applications
   - Admins have full system access
   
4. **Audit Trail**:
   - All registrations logged
   - Login events tracked
   - Role changes recorded

## Default User Roles

### Borrower (x_1610509_intellil.borrower)
- **Auto-assigned** on registration
- **Can**:
  - Apply for loans
  - View own applications
  - View AI repayment plans
  - Make payments
  - View repayment schedules
- **Cannot**:
  - View other customers' data
  - Approve/reject applications
  - Access admin functions

### Loan Officer (x_1610509_intellil.loan_officer)
- **Manually assigned** by admin
- **Can**:
  - View all applications
  - Generate AI plans
  - Approve/reject applications
  - Process disbursements
  - View all customer data
- **Cannot**:
  - Delete records
  - Change system configuration
  - Assign roles

### Admin (x_1610509_intellil.admin)
- **Manually assigned** by system admin
- **Can**:
  - All loan officer functions
  - Delete records
  - Configure system properties
  - Assign/change user roles
  - Access full audit trail
  - Manage all system components

## Testing Checklist

- [ ] Landing page loads correctly
- [ ] Create Account button navigates to register page
- [ ] Sign In button navigates to login page
- [ ] Registration form validates inputs
- [ ] User created with borrower role
- [ ] Customer record created on registration
- [ ] Login redirects based on role
- [ ] Borrower sees customer portal
- [ ] Officer sees officer dashboard
- [ ] Admin sees admin dashboard
- [ ] Role changes work (admin function)

## Troubleshooting

### Registration fails
- Check if username/email already exists
- Verify customer table exists
- Check server logs for errors

### Login doesn't redirect
- Verify REST API endpoints are active
- Check user has assigned role
- Clear browser cache

### Pages not loading
- Verify UI pages are deployed
- Check endpoint URLs match
- Ensure React components compiled

## API Testing with Postman/cURL

### Register User
```bash
curl -X POST https://[instance].service-now.com/api/x_1610509_intellil/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "password123",
    "confirmPassword": "password123",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "555-0100",
    "monthlyIncome": "3000",
    "salaryCycle": "monthly",
    "nextSalaryDate": "2024-02-01"
  }'
```

### Login User
```bash
curl -X POST https://[instance].service-now.com/api/x_1610509_intellil/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "password123"
  }'
```

## Future Enhancements

1. **Password Reset**: Email-based password recovery
2. **Email Verification**: Confirm email before activation
3. **2FA**: Two-factor authentication option
4. **Social Login**: Google/Facebook authentication
5. **Session Management**: Token-based sessions
6. **Password Strength**: Advanced password requirements
7. **Account Lockout**: After failed login attempts
8. **CAPTCHA**: Prevent automated registrations



