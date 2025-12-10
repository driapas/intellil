# 🚀 QUICK FIX: Authentication Not Working

## ✅ What I Fixed

1. **Frontend API calls** - Now properly wraps data in `{ data: ... }` format
2. **Error logging** - Better console messages to debug issues
3. **Created setup guide** - Step-by-step manual REST API setup

---

## 📋 Why Registration Failed

The REST API endpoints **do not auto-deploy** from the SDK. You need to create them manually in ServiceNow.

---

## ⚡ QUICK SETUP (5 Minutes)

### Step 1: Deploy Your Changes

```bash
npm run build
npm run deploy
```

### Step 2: Create REST API in ServiceNow

#### 2A: Create the API

1. Go to ServiceNow: **System Web Services** → **Scripted REST APIs**
2. Click **New**
3. Fill in:
   ```
   Name: IntelliLoan Authentication API
   API ID: x_1610509_intellil_auth
   Base API path: /api/x_1610509_intellil/auth
   Active: ✓
   ```
4. Click **Submit**

#### 2B: Create Register Resource

1. Open the API you created
2. Under **Resources**, click **New**
3. Fill in:
   ```
   Resource name: Register
   HTTP method: POST
   Relative path: /register
   Active: ✓
   ```
4. **Script** field - paste this:

```javascript
(function process(request, response) {
    try {
        var requestBody = request.body.data;
        var authService = new x_1610509_intellil.AuthService();
        var result = authService.registerUser(requestBody);
        return result;
    } catch (error) {
        gs.error('Register error: ' + error);
        return {
            success: false,
            message: 'Registration error: ' + error.toString()
        };
    }
})(request, response);
```

5. Click **Submit**

#### 2C: Create Login Resource

1. Back to the API, under **Resources**, click **New**
2. Fill in:
   ```
   Resource name: Login
   HTTP method: POST
   Relative path: /login
   Active: ✓
   ```
3. **Script** field - paste this:

```javascript
(function process(request, response) {
    try {
        var requestBody = request.body.data;
        var authService = new x_1610509_intellil.AuthService();
        var result = authService.loginUser(requestBody.username, requestBody.password);
        return result;
    } catch (error) {
        gs.error('Login error: ' + error);
        return {
            success: false,
            message: 'Login error: ' + error.toString()
        };
    }
})(request, response);
```

4. Click **Submit**

---

## 🧪 Test It!

### Option 1: Via Frontend (Recommended)

1. Go to: `https://dev323088.service-now.com/x_1610509_intellil_landing.do`
2. Click **"Create Account"**
3. Fill in registration form:
   ```
   Username: demo1
   Password: Demo123
   Email: demo1@test.com
   Phone: 555-0001
   Monthly Income: 3000
   Salary Cycle: Monthly
   Next Salary Date: (pick future date)
   ```
4. Click **"Create Account"**
5. Should see: ✅ "Account created successfully!"

### Option 2: Test Backend Directly

1. Go to: **System Definition** → **Scripts - Background**
2. Paste this:

```javascript
var authService = new x_1610509_intellil.AuthService();

var result = authService.registerUser({
    username: 'backendtest',
    password: 'Test123',
    firstName: 'Backend',
    lastName: 'Test',
    email: 'backend@test.com',
    phone: '555-1234',
    monthlyIncome: 2500,
    salaryCycle: 'monthly',
    nextSalaryDate: '2024-02-15'
});

gs.info('Result: ' + JSON.stringify(result));
```

3. Click **Run script**
4. Check output - should be `success: true`

### Option 3: REST API Explorer

1. **System Web Services** → **REST API Explorer**
2. Select: `x_1610509_intellil_auth`
3. Choose: **POST /register**
4. Request Body:
```json
{
  "data": {
    "username": "apitest",
    "password": "Test123",
    "firstName": "API",
    "lastName": "Test",
    "email": "api@test.com",
    "phone": "555-5555",
    "monthlyIncome": "3000",
    "salaryCycle": "monthly",
    "nextSalaryDate": "2024-03-01"
  }
}
```
5. Click **Send**
6. Should get: `{ "success": true, ... }`

---

## 🔍 Verify User Created

### Check User Table
1. **User Administration** → **Users**
2. Search: `demo1` (or whatever username you used)
3. Should exist with:
   - First Name: (what you entered)
   - Email: (what you entered)
   - Active: true

### Check Roles
1. Open the user record
2. Go to **Roles** tab
3. Should have: `x_1610509_intellil.borrower`

### Check Customer Table
1. **Intelli-Loan** → **Customers**
2. Search by email
3. Should see customer record with:
   - Monthly Income: 3000
   - Salary Cycle: Monthly
   - Account Status: Active

---

## 📊 Data Storage Locations

When registration succeeds, data is stored in these tables:

### 1. sys_user
```
Navigate: User Administration → Users
Stores: username, password, name, email, phone
```

### 2. x_1610509_intellil_customer
```
Navigate: Intelli-Loan → Customers
Stores: financial info, address, salary cycle
```

### 3. sys_user_has_role
```
Navigate: User Administration → Users → (user) → Roles tab
Stores: borrower role assignment
```

### 4. x_1610509_intellil_loan_transaction
```
Navigate: Intelli-Loan → Loan Transactions
Stores: audit log of registration
```

---

## ❌ Troubleshooting

### Error: "AuthService is not defined"

**Solution**: Script Include not deployed
```bash
# Re-deploy
npm run deploy

# Or check manually:
# System Definition → Script Includes
# Filter: x_1610509_intellil
# Should see: AuthService
```

### Error: "Table not found"

**Solution**: Tables not created
```bash
# Check: System Definition → Tables
# Filter: x_1610509_intellil
# Should see 7 tables including 'customer'
```

### Error: "404 Not Found" on API call

**Solution**: REST API not created
- Follow **Step 2** above to create the REST API manually
- Make sure API ID is: `x_1610509_intellil_auth`
- Make sure Base path is: `/api/x_1610509_intellil/auth`

### Registration button does nothing

**Solution**: Check browser console (F12)
- Look for error messages
- Should show API endpoint being called
- Check Network tab for failed requests

### Success but user not found

**Solution**: Check server logs
```
System Logs → System Log → Application Logs
Filter: x_1610509_intellil
Look for errors during registration
```

---

## 🎯 Complete Test Checklist

After setup:

- [ ] REST API created in ServiceNow
- [ ] Register resource created and active
- [ ] Login resource created and active
- [ ] Frontend deployed (`npm run deploy`)
- [ ] Landing page loads
- [ ] Registration form submits
- [ ] User created in sys_user table
- [ ] Customer created in customer table
- [ ] Borrower role assigned
- [ ] Login works and redirects to Customer Portal

---

## 🚀 Next Steps

Once registration works:

1. **Create 3 demo accounts**:
   - demo_borrower (keep as borrower)
   - demo_officer (change to loan officer)
   - demo_admin (change to admin)

2. **Test role-based redirection**:
   - Borrower → Customer Portal
   - Officer → Officer Dashboard
   - Admin → Admin Dashboard

3. **Take screenshots** for your capstone presentation

4. **Test complete loan workflow**:
   - Register → Login → Apply for Loan → Generate AI Plan → Approve → Disburse

---

## 💡 Pro Tip

Save this REST API creation as a **Personal Developer Instance** configuration so you don't have to recreate it if the instance resets.

---

**Once the REST API is set up, everything will work perfectly!** 🎉

Need help? Check the error messages in:
- Browser Console (F12)
- ServiceNow System Logs
- REST API Explorer test results



