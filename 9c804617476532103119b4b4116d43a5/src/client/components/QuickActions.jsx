import React from 'react'

export default function QuickActions() {
    const handleAction = (action) => {
        switch (action) {
            case 'new-application':
                window.open('/intelliloan_application.do', '_blank')
                break
            case 'view-customers':
                window.open('/x_1610509_intellil_customer_list.do', '_blank')
                break
            case 'ai-analytics':
                window.open('/x_1610509_intellil_ai_repayment_plan_list.do', '_blank')
                break
            case 'system-config':
                window.open('/sys_properties_list.do?sysparm_query=nameLIKEx_1610509_intellil', '_blank')
                break
            case 'reports':
                alert('Advanced reporting dashboard coming soon!')
                break
            default:
                console.log('Action not implemented:', action)
        }
    }

    const actions = [
        {
            id: 'new-application',
            label: 'New Loan Application',
            icon: '📋',
            description: 'Start a new loan application'
        },
        {
            id: 'view-customers',
            label: 'Manage Customers',
            icon: '👥',
            description: 'View and manage customer profiles'
        },
        {
            id: 'ai-analytics',
            label: 'AI Plan Analytics',
            icon: '🤖',
            description: 'View AI-generated repayment plans'
        },
        {
            id: 'system-config',
            label: 'System Settings',
            icon: '⚙️',
            description: 'Configure system properties'
        },
        {
            id: 'reports',
            label: 'Advanced Reports',
            icon: '📊',
            description: 'Generate business intelligence reports'
        }
    ]

    return (
        <div>
            <h2>⚡ Quick Actions</h2>
            <div className="quick-actions">
                <div className="actions-grid">
                    {actions.map(action => (
                        <button
                            key={action.id}
                            className="action-btn"
                            onClick={() => handleAction(action.id)}
                            title={action.description}
                        >
                            <span className="icon">{action.icon}</span>
                            <span>{action.label}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}