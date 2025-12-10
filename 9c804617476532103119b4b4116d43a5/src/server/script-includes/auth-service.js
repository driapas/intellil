import { gs, GlideRecord } from '@servicenow/glide'

/**
 * Authentication Service for IntelliLoan
 * Handles user registration and login
 */
export class AuthService {
    
    /**
     * Register a new user as a borrower
     * @param {Object} userData - User registration data
     * @returns {Object} Result with success flag and message
     */
    registerUser(userData) {
        try {
            // Check if username already exists
            const existingUser = new GlideRecord('sys_user')
            existingUser.addQuery('user_name', userData.username)
            existingUser.query()
            
            if (existingUser.hasNext()) {
                return {
                    success: false,
                    message: 'Username already exists. Please choose a different username.'
                }
            }

            // Check if email already exists
            const existingEmail = new GlideRecord('sys_user')
            existingEmail.addQuery('email', userData.email)
            existingEmail.query()
            
            if (existingEmail.hasNext()) {
                return {
                    success: false,
                    message: 'Email already registered. Please use a different email.'
                }
            }

            // Create sys_user record
            const userGr = new GlideRecord('sys_user')
            userGr.initialize()
            userGr.setValue('user_name', userData.username)
            userGr.setValue('first_name', userData.firstName)
            userGr.setValue('last_name', userData.lastName)
            userGr.setValue('email', userData.email)
            userGr.setValue('phone', userData.phone)
            userGr.setValue('active', true)
            
            // Set password (in production, this should be hashed)
            userGr.setDisplayValue('user_password', userData.password)
            
            const userId = userGr.insert()

            if (!userId) {
                return {
                    success: false,
                    message: 'Failed to create user account. Please try again.'
                }
            }

            // Assign borrower role
            const roleGr = new GlideRecord('sys_user_has_role')
            roleGr.initialize()
            roleGr.setValue('user', userId)
            roleGr.setValue('role', this.getBorrowerRoleId())
            roleGr.insert()

            // Create customer record
            const customerGr = new GlideRecord('x_1610509_intellil_customer')
            customerGr.initialize()
            customerGr.setValue('first_name', userData.firstName)
            customerGr.setValue('last_name', userData.lastName)
            customerGr.setValue('email', userData.email)
            customerGr.setValue('phone', userData.phone)
            customerGr.setValue('date_of_birth', userData.dateOfBirth || '')
            customerGr.setValue('job_title', userData.jobTitle || '')
            customerGr.setValue('employer', userData.employer || '')
            customerGr.setValue('monthly_income', userData.monthlyIncome || 0)
            customerGr.setValue('salary_cycle', userData.salaryCycle || 'monthly')
            customerGr.setValue('next_salary_date', userData.nextSalaryDate || '')
            customerGr.setValue('monthly_expenses', userData.monthlyExpenses || 0)
            customerGr.setValue('address', userData.address || '')
            customerGr.setValue('city', userData.city || '')
            customerGr.setValue('state', userData.state || '')
            customerGr.setValue('zip_code', userData.zipCode || '')
            customerGr.setValue('account_status', 'active')
            customerGr.setValue('identity_verified', false)
            
            const customerId = customerGr.insert()

            if (!customerId) {
                gs.warn('Customer record creation failed for user: ' + userId)
            }

            // Log transaction
            this.logTransaction('user_registered', null, customerId, 
                'New user registered: ' + userData.username)

            return {
                success: true,
                message: 'Account created successfully! You can now sign in.',
                userId: userId,
                customerId: customerId
            }

        } catch (error) {
            gs.error('AuthService.registerUser error: ' + error.toString())
            return {
                success: false,
                message: 'Registration failed due to system error. Please try again.'
            }
        }
    }

    /**
     * Authenticate user and return role information
     * @param {string} username - Username
     * @param {string} password - Password
     * @returns {Object} Result with success flag and user role
     */
    loginUser(username, password) {
        try {
            // In ServiceNow, actual authentication is handled by the platform
            // This method validates user exists and returns their role
            
            const userGr = new GlideRecord('sys_user')
            userGr.addQuery('user_name', username)
            userGr.addQuery('active', true)
            userGr.query()

            if (!userGr.hasNext()) {
                return {
                    success: false,
                    message: 'Invalid username or password'
                }
            }

            userGr.next()
            const userId = userGr.getUniqueValue()

            // Get user's primary IntelliLoan role
            const role = this.getUserPrimaryRole(userId)

            // Log transaction
            const customerGr = new GlideRecord('x_1610509_intellil_customer')
            customerGr.addQuery('email', userGr.getValue('email'))
            customerGr.query()
            
            let customerId = null
            if (customerGr.hasNext()) {
                customerGr.next()
                customerId = customerGr.getUniqueValue()
            }

            this.logTransaction('user_login', null, customerId, 
                'User logged in: ' + username)

            return {
                success: true,
                userId: userId,
                username: username,
                role: role,
                customerId: customerId,
                message: 'Login successful'
            }

        } catch (error) {
            gs.error('AuthService.loginUser error: ' + error.toString())
            return {
                success: false,
                message: 'Login failed due to system error. Please try again.'
            }
        }
    }

    /**
     * Get user's primary IntelliLoan role
     * @param {string} userId - User sys_id
     * @returns {string} Role name
     */
    getUserPrimaryRole(userId) {
        // Check for admin role first
        if (this.userHasRole(userId, 'x_1610509_intellil.admin')) {
            return 'x_1610509_intellil.admin'
        }

        // Check for loan officer role
        if (this.userHasRole(userId, 'x_1610509_intellil.loan_officer')) {
            return 'x_1610509_intellil.loan_officer'
        }

        // Check for borrower role
        if (this.userHasRole(userId, 'x_1610509_intellil.borrower')) {
            return 'x_1610509_intellil.borrower'
        }

        return 'none'
    }

    /**
     * Check if user has a specific role
     * @param {string} userId - User sys_id
     * @param {string} roleName - Role name
     * @returns {boolean}
     */
    userHasRole(userId, roleName) {
        const roleGr = new GlideRecord('sys_user_role')
        roleGr.addQuery('name', roleName)
        roleGr.query()
        
        if (!roleGr.hasNext()) {
            return false
        }
        
        roleGr.next()
        const roleId = roleGr.getUniqueValue()

        const userRoleGr = new GlideRecord('sys_user_has_role')
        userRoleGr.addQuery('user', userId)
        userRoleGr.addQuery('role', roleId)
        userRoleGr.query()

        return userRoleGr.hasNext()
    }

    /**
     * Get borrower role sys_id
     * @returns {string} Role sys_id
     */
    getBorrowerRoleId() {
        const roleGr = new GlideRecord('sys_user_role')
        roleGr.addQuery('name', 'x_1610509_intellil.borrower')
        roleGr.query()
        
        if (roleGr.hasNext()) {
            roleGr.next()
            return roleGr.getUniqueValue()
        }
        
        return null
    }

    /**
     * Log authentication transaction
     * @param {string} type - Transaction type
     * @param {string} applicationId - Application sys_id (optional)
     * @param {string} customerId - Customer sys_id (optional)
     * @param {string} remarks - Remarks
     */
    logTransaction(type, applicationId, customerId, remarks) {
        try {
            const transGr = new GlideRecord('x_1610509_intellil_loan_transaction')
            transGr.initialize()
            transGr.setValue('transaction_type', type)
            
            if (applicationId) {
                transGr.setValue('application', applicationId)
            }
            
            if (customerId) {
                transGr.setValue('customer', customerId)
            }
            
            transGr.setValue('user', gs.getUserID())
            transGr.setValue('remarks', remarks)
            transGr.setValue('ip_address', gs.getSession().getClientIP())
            transGr.insert()
        } catch (error) {
            gs.error('Error logging transaction: ' + error.toString())
        }
    }

    /**
     * Update user role (admin function)
     * @param {string} userId - User sys_id
     * @param {string} newRole - New role name
     * @returns {Object} Result
     */
    updateUserRole(userId, newRole) {
        try {
            // Verify admin is making this change
            if (!gs.hasRole('x_1610509_intellil.admin')) {
                return {
                    success: false,
                    message: 'Unauthorized: Only admins can change user roles'
                }
            }

            // Get new role sys_id
            const roleGr = new GlideRecord('sys_user_role')
            roleGr.addQuery('name', newRole)
            roleGr.query()
            
            if (!roleGr.hasNext()) {
                return {
                    success: false,
                    message: 'Invalid role specified'
                }
            }
            
            roleGr.next()
            const roleId = roleGr.getUniqueValue()

            // Remove existing IntelliLoan roles
            const removeRoles = new GlideRecord('sys_user_has_role')
            removeRoles.addQuery('user', userId)
            removeRoles.query()
            
            while (removeRoles.hasNext()) {
                removeRoles.next()
                const roleName = removeRoles.role.getDisplayValue()
                if (roleName.startsWith('x_1610509_intellil.')) {
                    removeRoles.deleteRecord()
                }
            }

            // Add new role
            const userRoleGr = new GlideRecord('sys_user_has_role')
            userRoleGr.initialize()
            userRoleGr.setValue('user', userId)
            userRoleGr.setValue('role', roleId)
            userRoleGr.insert()

            return {
                success: true,
                message: 'User role updated successfully'
            }

        } catch (error) {
            gs.error('AuthService.updateUserRole error: ' + error.toString())
            return {
                success: false,
                message: 'Role update failed due to system error'
            }
        }
    }
}



