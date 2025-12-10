# IntelliLoan - Quick Start Guide

## 🚀 Immediate Steps After Deployment

### 1. Build and Deploy
```bash
cd 9c804617476532103119b4b4116d43a5
npm run build
npm run deploy
```

### 2. Access Your Application
Replace `[instance]` with your ServiceNow PDI instance name:

**Landing Page (Start Here)**:
```
https://[instance].service-now.com/x_1610509_intellil_landing.do
```

**Direct Links**:
- Login: `https://[instance].service-now.com/x_1610509_intellil_login.do`
- Register: `https://[instance].service-now.com/x_1610509_intellil_register.do`

---

## 📝 Create Your First User

### Option 1: Via Landing Page (Recommended)
1. Go to landing page URL
2. Click "Create Account"
3. Fill in Step 1: Account Info
   - Username: `testuser`
   - Password: `Test123` (min 6 chars)
   - Confirm Password: `Test123`
   - First Name: `John`
   - Last Name: `Doe`
   - Email: `john.doe@example.com`
   - Phone: `555-0100`
4. Click "Next Step →"
5. Fill in Step 2: Financial Info
   - Monthly Income: `3000`
   - Salary Cycle: `Monthly`
   - Next Salary Date: (select a future date)
6. Click "Create Account"
7. Success! User created as Borrower

### Option 2: Via ServiceNow UI (Admin)
1. Navigate to: **User Administration** → **Users**
2. Click **New**
3. Fill in user details
4. Go to **Roles** tab
5. Add role: `x_1610509_intellil.borrower`
6. Save

---

## 🔐 Login Flow

### As Borrower (Default New User)
1. Go to landing page
2. Click "Sign In"
3. Enter username and password
4. **Redirects to**: Customer Portal
5. **Can Do**:
   - Apply for loans
   - View applications
   - View AI plans
   - Make payments

### As Loan Officer (Assign Role First)
1. Admin assigns `x_1610509_intellil.loan_officer` role
2. User logs in
3. **Redirects to**: Officer Dashboard
4. **Can Do**:
   - Review applications
   - Generate AI plans
   - Approve/reject loans
   - Process disbursements

### As Admin (Assign Role First)
1. Admin assigns `x_1610509_intellil.admin` role
2. User logs in
3. **Redirects to**: Admin Dashboard
4. **Can Do**:
   - All officer functions
   - Manage users and roles
   - Configure system
   - Delete records

---

## 🎯 Complete Test Scenario

### Scenario: New Borrower Applies for Loan

#### Step 1: Register New User (5 minutes)
1. Landing page → "Create Account"
2. Complete registration
3. Note credentials

#### Step 2: Login as Borrower (1 minute)
1. Landing page → "Sign In"
2. Enter credentials
3. Redirects to Customer Portal

#### Step 3: Create Loan Application (3 minutes)
1. Customer Portal → "Apply for Loan"
2. Fill in loan details:
   - Amount: `$1000`
   - Purpose: `Emergency`
3. Submit application

#### Step 4: Generate AI Plan (As Officer)
1. Login as admin
2. Go to: **Intelli-Loan** → **Loan Applications**
3. Open the application
4. Click "Generate AI Plan"
5. Wait for AI to create 2-3 plan options

#### Step 5: Accept Plan (As Borrower)
1. Logout admin, login as borrower
2. View application
3. See AI plan options
4. Click "Accept AI Plan" on preferred option

#### Step 6: Approve Loan (As Officer)
1. Logout borrower, login as officer
2. Go to: **Loan Officer Dashboard**
3. See pending application
4. Click "Approve"

#### Step 7: Disburse Loan (As Officer)
1. Open approved application
2. Click "Disburse Loan"
3. Enter disbursement details
4. Complete disbursement

✅ **Complete workflow tested!**

---

## 👥 Quick Role Management

### Change User from Borrower to Officer
1. Login as **Admin**
2. Navigate to: **User Administration** → **Users**
3. Find user (search by username)
4. Click on user name
5. Go to **Roles** tab
6. Click "Edit"
7. Remove: `x_1610509_intellil.borrower`
8. Add: `x_1610509_intellil.loan_officer`
9. Save
10. User's next login → Officer Dashboard

### Programmatic Role Update (Future Feature)
```javascript
// Will be available via REST API
PUT /api/x_1610509_intellil/auth/update-role
{
  "userId": "user_sys_id",
  "newRole": "x_1610509_intellil.loan_officer"
}
```

---

## 🎨 UI Pages Overview

| Page | URL | Purpose | Access |
|------|-----|---------|--------|
| Landing | `/x_1610509_intellil_landing.do` | Entry point | Public |
| Login | `/x_1610509_intellil_login.do` | Authentication | Public |
| Register | `/x_1610509_intellil_register.do` | New user signup | Public |
| Dashboard | `/x_1610509_intellil_dashboard.do` | Main overview | All roles |
| Customer Portal | `/x_1610509_intellil_customer_portal.do` | Borrower view | Borrower |
| Officer Dashboard | `/x_1610509_intellil_officer_dashboard.do` | Officer view | Officer |
| Admin Dashboard | `/x_1610509_intellil_admin_dashboard.do` | Admin view | Admin |
| Application Form | `/x_1610509_intellil_application.do` | Loan application | All roles |

---

## 🔧 Troubleshooting

### Issue: Landing page doesn't load
**Solution**: 
1. Verify deployment: `npm run deploy`
2. Check UI Pages exist in ServiceNow
3. Clear browser cache

### Issue: Registration fails
**Solution**:
1. Check username is unique
2. Check email is unique
3. Verify customer table exists
4. Check server logs

### Issue: Login doesn't redirect
**Solution**:
1. Verify user has role assigned
2. Check REST API is active
3. Clear browser cache
4. Check browser console for errors

### Issue: Can't see applications
**Solution**:
1. Verify user has correct role
2. Check ACLs are active
3. Verify data exists
4. Check impersonate settings

---

## 📞 Demo Accounts (Create These)

### Borrower Demo Account
```
Username: demo_borrower
Password: Demo123!
Role: x_1610509_intellil.borrower
Use Case: Show customer experience
```

### Officer Demo Account
```
Username: demo_officer
Password: Demo123!
Role: x_1610509_intellil.loan_officer
Use Case: Show approval workflow
```

### Admin Demo Account
```
Username: demo_admin
Password: Demo123!
Role: x_1610509_intellil.admin
Use Case: Show full system access
```

---

## 🎓 Presentation Tips

### Opening Demo (5 minutes)
1. Show landing page - explain features
2. Create new account live (or show prepared)
3. Login and show Customer Portal
4. Show one loan application creation

### Technical Deep Dive (10 minutes)
1. Show code structure
2. Explain authentication flow
3. Demonstrate role-based access
4. Show AI plan generation
5. Explain backend integration

### Q&A Preparation
**Common Questions**:
- Q: "How is AI used?"
  - A: Gemini AI analyzes financial profile and generates personalized repayment plans
  
- Q: "How secure is the authentication?"
  - A: Uses ServiceNow's enterprise authentication, role-based ACLs, password validation, audit logging
  
- Q: "Can users reset passwords?"
  - A: Currently admin-managed, future enhancement for self-service reset
  
- Q: "How does role management work?"
  - A: Admins can assign/change roles via User Administration or future REST API

---

## ✅ Pre-Presentation Checklist

- [ ] Application built and deployed
- [ ] Landing page accessible
- [ ] Created 3 demo accounts (borrower, officer, admin)
- [ ] Tested complete loan workflow
- [ ] Sample data created (2-3 loan applications)
- [ ] Screenshots captured
- [ ] Documentation reviewed
- [ ] Server logs cleared
- [ ] Browser cache cleared
- [ ] Backup of working instance

---

## 🎯 Success Criteria

Your implementation is successful if:
1. ✅ Users can create accounts via landing page
2. ✅ Login redirects based on role
3. ✅ Borrowers can apply for loans
4. ✅ AI generates repayment plans
5. ✅ Officers can approve loans
6. ✅ Admins can manage roles
7. ✅ All pages load without errors
8. ✅ Data persists across sessions

---

**You're Ready to Go! 🚀**

If any issues arise, refer to:
- **AUTHENTICATION_SETUP.md** for detailed setup
- **IMPLEMENTATION_SUMMARY.md** for technical details
- ServiceNow system logs for debugging

Good luck with your capstone presentation! 🎓



