import '@servicenow/sdk/global'
import { BusinessRule } from '@servicenow/sdk/core'
import { onApplicationStatusChange } from '../../server/business-rules/application-status-handler.js'

export const ApplicationStatusHandler = BusinessRule({
    $id: Now.ID['application_status_handler'],
    name: 'Application Status Change Handler',
    table: 'x_1610509_intellil_loan_application',
    when: 'after',
    action: ['update'],
    script: onApplicationStatusChange,
    condition: "current.status.changes()",
    order: 100,
    active: true,
    description: 'Handles loan application status changes and triggers appropriate workflows'
})