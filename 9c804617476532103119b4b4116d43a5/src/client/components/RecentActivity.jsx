import React from 'react'

export default function RecentActivity({ activities = [] }) {
    const getActivityIcon = (type) => {
        const typeStr = typeof type === 'object' ? type.display_value : type
        switch (typeStr) {
            case 'application_submitted': return 'AS'
            case 'ai_plan_generated': return 'AI'
            case 'application_approved': return 'AP'
            case 'loan_disbursed': return 'LD'
            case 'payment_received': return 'PR'
            default: return 'TX'
        }
    }

    const getActivityDescription = (activity) => {
        const type = typeof activity.transaction_type === 'object' ? 
            activity.transaction_type.display_value : activity.transaction_type
        const remarks = typeof activity.remarks === 'object' ? 
            activity.remarks.display_value : activity.remarks

        switch (type) {
            case 'application_submitted':
                return 'New loan application submitted'
            case 'ai_plan_generated':
                return 'AI repayment plan generated'
            case 'application_approved':
                return 'Loan application approved'
            case 'loan_disbursed':
                return 'Loan funds disbursed'
            case 'payment_received':
                return 'Payment received'
            default:
                return remarks || 'System transaction'
        }
    }

    const getTimeAgo = (timestamp) => {
        if (!timestamp) return 'Recently'
        
        const timeStr = typeof timestamp === 'object' ? timestamp.display_value : timestamp
        const date = new Date(timeStr)
        const now = new Date()
        const diff = now - date
        const minutes = Math.floor(diff / 60000)
        
        if (minutes < 1) return 'Just now'
        if (minutes < 60) return `${minutes}m ago`
        const hours = Math.floor(minutes / 60)
        if (hours < 24) return `${hours}h ago`
        const days = Math.floor(hours / 24)
        return `${days}d ago`
    }

    return (
        <div>
            <h2>📈 Recent Activity</h2>
            <div className="activity-feed">
                {activities.length === 0 ? (
                    <div className="activity-item">
                        <div className="activity-avatar">NA</div>
                        <div className="activity-content">
                            <h4>No recent activity</h4>
                            <p>Activity will appear here as users interact with the system</p>
                        </div>
                        <div className="activity-time">Now</div>
                    </div>
                ) : (
                    activities.map((activity, index) => {
                        const sysId = typeof activity.sys_id === 'object' ? 
                            activity.sys_id.value : activity.sys_id
                        
                        return (
                            <div key={sysId || index} className="activity-item">
                                <div className="activity-avatar">
                                    {getActivityIcon(activity.transaction_type)}
                                </div>
                                <div className="activity-content">
                                    <h4>{getActivityDescription(activity)}</h4>
                                    <p>Transaction ID: {(sysId || '').slice(-8)}</p>
                                </div>
                                <div className="activity-time">
                                    {getTimeAgo(activity.timestamp)}
                                </div>
                            </div>
                        )
                    })
                )}
            </div>
        </div>
    )
}