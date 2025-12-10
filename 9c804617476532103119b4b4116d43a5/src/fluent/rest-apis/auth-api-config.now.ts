import '@servicenow/sdk/global'
import { Record } from '@servicenow/sdk/core'

/**
 * Scripted REST API Configuration for Authentication
 * 
 * Note: REST API resources should be created manually in ServiceNow
 * Go to: System Web Services > Scripted REST APIs
 * Create API: x_1610509_intellil_auth
 * Base URI: /api/x_1610509_intellil/auth
 * 
 * Then create three resources with the scripts below
 */

export const AuthAPIDefinition = Record({
    $id: Now.ID['auth_rest_api'],
    table: 'sys_ws_definition',
    data: {
        name: 'IntelliLoan Authentication API',
        api_id: 'x_1610509_intellil_auth',
        base_uri: '/api/x_1610509_intellil/auth',
        doc_link: '',
        active: true,
        short_description: 'Authentication endpoints for user registration and login'
    },
    $meta: {
        installMethod: 'first install'
    }
})

// Register Resource
export const RegisterResource = Record({
    $id: Now.ID['auth_register_resource'],
    table: 'sys_ws_operation',
    data: {
        web_service_definition: AuthAPIDefinition,
        name: 'Register',
        operation_uri: '/register',
        http_method: 'POST',
        active: true,
        short_description: 'Register new user as borrower',
        operation_script: `
(function process(request, response) {
    try {
        var requestBody = request.body.data;
        var authService = new x_1610509_intellil.AuthService();
        var result = authService.registerUser(requestBody);
        return result;
    } catch (error) {
        return {
            success: false,
            message: 'Registration error: ' + error.toString()
        };
    }
})(request, response);
        `
    },
    $meta: {
        installMethod: 'first install'
    }
})

// Login Resource
export const LoginResource = Record({
    $id: Now.ID['auth_login_resource'],
    table: 'sys_ws_operation',
    data: {
        web_service_definition: AuthAPIDefinition,
        name: 'Login',
        operation_uri: '/login',
        http_method: 'POST',
        active: true,
        short_description: 'Authenticate user and return role',
        operation_script: `
(function process(request, response) {
    try {
        var requestBody = request.body.data;
        var username = requestBody.username;
        var password = requestBody.password;
        var authService = new x_1610509_intellil.AuthService();
        var result = authService.loginUser(username, password);
        return result;
    } catch (error) {
        return {
            success: false,
            message: 'Login error: ' + error.toString()
        };
    }
})(request, response);
        `
    },
    $meta: {
        installMethod: 'first install'
    }
})

// Update Role Resource (Admin only)
export const UpdateRoleResource = Record({
    $id: Now.ID['auth_update_role_resource'],
    table: 'sys_ws_operation',
    data: {
        web_service_definition: AuthAPIDefinition,
        name: 'Update Role',
        operation_uri: '/update-role',
        http_method: 'PUT',
        active: true,
        short_description: 'Update user role (admin only)',
        operation_script: `
(function process(request, response) {
    try {
        var requestBody = request.body.data;
        var userId = requestBody.userId;
        var newRole = requestBody.newRole;
        var authService = new x_1610509_intellil.AuthService();
        var result = authService.updateUserRole(userId, newRole);
        return result;
    } catch (error) {
        return {
            success: false,
            message: 'Role update error: ' + error.toString()
        };
    }
})(request, response);
        `
    },
    $meta: {
        installMethod: 'first install'
    }
})

