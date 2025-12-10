# ⚠️ MANUAL SETUP REQUIRED FOR AUTHENTICATION

## Problem
The REST API endpoints for authentication need to be created manually in ServiceNow.

---

## 🔧 SOLUTION: Manual REST API Setup

### Step 1: Create Scripted REST API

1. In ServiceNow, navigate to: **System Web Services** → **Scripted REST APIs**
2. Click **New**
3. Fill in:
   - **Name**: `IntelliLoan Authentication API`
   - **API ID**: `x_1610509_intellil_auth`
   - **Base API path**: `/api/x_1610509_intellil/auth`
   - **Active**: ✓ (checked)
4. Click **Submit**

---

### Step 2: Create Register Resource

1. Open the API you just created
2. Under **Resources** tab, click **New**
3. Fill in:
   - **Resource name**: `Register`
   - **HTTP method**: `POST`
   - **Relative path**: `/register`
   - **Active**: ✓ (checked)

4. In the **Script** field, paste this:

```javascript
(function process(request, response) {
    try {
        var requestBody = request.body.data;
        
        // Create instance of AuthService
        var authService = new x_1610509_intellil.AuthService();
        var result = authService.registerUser(requestBody);
        
        return result;
        
    } catch (error) {
        gs.error('Register API error: ' + error.toString());
        return {
            success: false,
            message: 'Registration error: ' + error.toString()
        };
    }
})(request, response);
```

5. Click **Submit**

---

### Step 3: Create Login Resource

1. Go back to the API record
2. Under **Resources** tab, click **New**
3. Fill in:
   - **Resource name**: `Login`
   - **HTTP method**: `POST`
   - **Relative path**: `/login`
   - **Active**: ✓ (checked)

4. In the **Script** field, paste this:

```javascript
(function process(request, response) {
    try {
        var requestBody = request.body.data;
        var username = requestBody.username;
        var password = requestBody.password;
        
        // Create instance of AuthService
        var authService = new x_1610509_intellil.AuthService();
        var result = authService.loginUser(username, password);
        
        return result;
        
    } catch (error) {
        gs.error('Login API error: ' + error.toString());
        return {
            success: false,
            message: 'Login error: ' + error.toString()
        };
    }
})(request, response);
```

5. Click **Submit**

---

### Step 4: Test the API

1. Navigate to: **System Web Services** → **REST API Explorer**
2. Select your API: `x_1610509_intellil_auth`
3. Test the `/register` endpoint with sample data:

```json
{
  "username": "testuser",
  "password": "Test123",
  "confirmPassword": "Test123",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@test.com",
  "phone": "555-0100",
  "monthlyIncome": "3000",
  "salaryCycle": "monthly",
  "nextSalaryDate": "2024-02-01"
}
```

---

## ✅ Verification

After setting up:

1. **Check Tables**:
   - Go to **User Administration** → **Users** → Should see test user
   - Go to **Intelli-Loan** → **Customers** → Should see customer record

2. **Check Role**:
   - Open user record → **Roles** tab
   - Should have: `x_1610509_intellil.borrower`

3. **Test Frontend**:
   - Go to: `https://dev323088.service-now.com/x_1610509_intellil_landing.do`
   - Click "Create Account"
   - Complete registration
   - Should work now!

---

## 📊 Data Storage

When a user registers, data is stored in:

### 1. **sys_user** table (ServiceNow core)
- `user_name`: testuser
- `first_name`: John
- `last_name`: Doe
- `email`: john@test.com
- `phone`: 555-0100
- `active`: true
- `user_password`: (hashed)

### 2. **x_1610509_intellil_customer** table (Your custom table)
- `first_name`: John
- `last_name`: Doe
- `email`: john@test.com
- `phone`: 555-0100
- `date_of_birth`: (optional)
- `job_title`: (optional)
- `employer`: (optional)
- `monthly_income`: 3000
- `salary_cycle`: monthly
- `next_salary_date`: 2024-02-01
- `monthly_expenses`: (optional)
- `address`: (optional)
- `city`: (optional)
- `state`: (optional)
- `zip_code`: (optional)
- `account_status`: active
- `identity_verified`: false
- `credit_score`: (null initially)

### 3. **sys_user_has_role** table (Role assignment)
- `user`: (reference to sys_user)
- `role`: (reference to borrower role)

### 4. **x_1610509_intellil_loan_transaction** table (Audit log)
- `transaction_type`: user_registered
- `user`: (reference to sys_user)
- `customer`: (reference to customer)
- `remarks`: "New user registered: testuser"
- `ip_address`: (client IP)

---

## 🔍 Troubleshooting

### Error: "AuthService is not defined"

**Fix**: Make sure the Script Include is created:
1. Go to: **System Definition** → **Script Includes**
2. Filter by: `x_1610509_intellil`
3. Should see: `AuthService`
4. If missing, check deployment logs

### Error: "Table not found"

**Fix**: Verify tables exist:
1. Go to: **System Definition** → **Tables**
2. Filter by: `x_1610509_intellil`
3. Should see all 7 tables including `customer`

### Registration fails silently

**Fix**: Check server logs:
1. Go to: **System Logs** → **System Log** → **Application Logs**
2. Filter by: `x_1610509_intellil`
3. Look for error messages

---

## 🚀 Alternative: Quick Test Script

If you want to test the backend directly without the API:

1. Go to: **System Definition** → **Scripts - Background**
2. Paste this test script:

```javascript
var authService = new x_1610509_intellil.AuthService();

var userData = {
    username: 'quicktest',
    password: 'Test123',
    firstName: 'Quick',
    lastName: 'Test',
    email: 'quick@test.com',
    phone: '555-9999',
    monthlyIncome: 2500,
    salaryCycle: 'monthly',
    nextSalaryDate: '2024-02-15'
};

var result = authService.registerUser(userData);
gs.info('Registration result: ' + JSON.stringify(result));
```

3. Click **Run script**
4. Check output - should show success!
5. Verify user created in User Administration

---

Once the REST API is set up, your landing page registration will work perfectly! 🎉



