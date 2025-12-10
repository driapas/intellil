import '@servicenow/sdk/global'
import { ScriptInclude } from '@servicenow/sdk/core'

export const AuthServiceInclude = ScriptInclude({
    $id: Now.ID['auth_service_include'],
    name: 'AuthService',
    script: '../../../server/script-includes/auth-service.js',
    apiName: 'x_1610509_intellil.AuthService',
    accessibleFrom: 'package_private',
    active: true,
    description: 'Authentication service for user registration and login'
})

