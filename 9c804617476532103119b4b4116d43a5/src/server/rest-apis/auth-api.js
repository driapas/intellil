/**
 * REST API Endpoints for Authentication
 * This would typically be created in ServiceNow as a Scripted REST API
 */

// For ServiceNow Scripted REST API Resource: POST /register
(function processRegister(request, response) {
    try {
        var requestBody = request.body.data
        
        // Create instance of AuthService
        var authService = new x_1610509_intellil.AuthService()
        var result = authService.registerUser(requestBody)
        
        return result
        
    } catch (error) {
        return {
            success: false,
            message: 'Registration error: ' + error.toString()
        }
    }
})(request, response)


// For ServiceNow Scripted REST API Resource: POST /login
(function processLogin(request, response) {
    try {
        var requestBody = request.body.data
        var username = requestBody.username
        var password = requestBody.password
        
        // Create instance of AuthService
        var authService = new x_1610509_intellil.AuthService()
        var result = authService.loginUser(username, password)
        
        return result
        
    } catch (error) {
        return {
            success: false,
            message: 'Login error: ' + error.toString()
        }
    }
})(request, response)


// For ServiceNow Scripted REST API Resource: PUT /update-role
(function processUpdateRole(request, response) {
    try {
        var requestBody = request.body.data
        var userId = requestBody.userId
        var newRole = requestBody.newRole
        
        // Create instance of AuthService
        var authService = new x_1610509_intellil.AuthService()
        var result = authService.updateUserRole(userId, newRole)
        
        return result
        
    } catch (error) {
        return {
            success: false,
            message: 'Role update error: ' + error.toString()
        }
    }
})(request, response)



