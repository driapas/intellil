import React, { useState, useEffect, useMemo } from 'react'
import { LoanService } from '../services/LoanService.js'
import { CustomerService } from '../services/CustomerService.js'
import './Dashboard.css'

export default function AdminDashboard() {
    const loanService = useMemo(() => new LoanService(), [])
    const customerService = useMemo(() => new CustomerService(), [])
    
    const [systemStats, setSystemStats] = useState({
        totalApplications: 0,
        totalCustomers: 0,
        totalDisbursed: 0,
        systemHealth: 'Excellent'
    })
    const [recentActivity, setRecentActivity] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadAdminData()
    }, [loanService, customerService])

    const loadAdminData = async () => {
        try {
            setLoading(true)
            
            const [applications, customers, transactions] = await Promise.all([
                loanService.list(),
                customerService.list(),
                loanService.getRecentTransactions()
            ])

            const disbursedApps = applications.filter(app => {
                const status = typeof app.status === 'object' ? app.status.display_value : app.status
                return status === 'disbursed'
            })

            const totalDisbursed = disbursedApps.reduce((sum, app) => {
                const amount = parseFloat(typeof app.loan_amount === 'object' ? app.loan_amount.display_value : app.loan_amount) || 0
                return sum + amount
            }, 0)

            setSystemStats({
                totalApplications: applications.length,
                totalCustomers: customers.length,
                totalDisbursed: totalDisbursed,
                systemHealth: 'Excellent'
            })

            setRecentActivity(transactions.slice(0, 10))

        } catch (error) {
            console.error('Error loading admin data:', error)
        } finally {
            setLoading(false)
        }
    }

    const navigateToSystemConfig = () => {
        window.open('/sys_properties_list.do?sysparm_query=nameLIKEx_1610509_intellil', '_blank')
    }

    const navigateToMainDashboard = () => {
        window.open('/intelliloan_dashboard.do', '_blank')
    }

    if (loading) {
        return (
            <div className="dashboard">
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Loading admin dashboard...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="dashboard">
            <div className="dashboard-header">
                <div className="nav-buttons" style={{position: 'absolute', top: 0, left: 0}}>
                    <button onClick={navigateToMainDashboard} className="nav-btn">
                        🏠 Main Dashboard
                    </button>
                    <button onClick={navigateToSystemConfig} className="nav-btn">
                        ⚙️ System Config
                    </button>
                </div>
                <h1>👑 Admin Dashboard</h1>
                <p>System Administration & Analytics</p>
            </div>

            <div className="dashboard-grid">
                <div className="stats-section">
                    <h2>📊 System Overview</h2>
                    <div className="stats-grid">
                        <div className="card stats-card purple">
                            <div className="icon">📋</div>
                            <div className="value">{systemStats.totalApplications}</div>
                            <div className="title">Total Applications</div>
                        </div>
                        <div className="card stats-card blue">
                            <div className="icon">👥</div>
                            <div className="value">{systemStats.totalCustomers}</div>
                            <div className="title">Total Customers</div>
                        </div>
                        <div className="card stats-card green">
                            <div className="icon">💰</div>
                            <div className="value">${systemStats.totalDisbursed.toLocaleString()}</div>
                            <div className="title">Total Disbursed</div>
                        </div>
                        <div className="card stats-card orange">
                            <div className="icon">🏥</div>
                            <div className="value">{systemStats.systemHealth}</div>
                            <div className="title">System Health</div>
                        </div>
                    </div>
                </div>

                <div className="insights-section">
                    <h2>🔧 System Configuration</h2>
                    <div className="insights-panel">
                        <div className="insight-item">
                            <div className="insight-icon">🤖</div>
                            <div className="insight-content">
                                <h4>Gemini AI Integration</h4>
                                <p>AI engine is active and processing loan analysis requests</p>
                            </div>
                            <div className="insight-priority high">Active</div>
                        </div>
                        <div className="insight-item">
                            <div className="insight-icon">📊</div>
                            <div className="insight-content">
                                <h4>Database Performance</h4>
                                <p>All tables optimized and performing within normal parameters</p>
                            </div>
                            <div className="insight-priority high">Optimal</div>
                        </div>
                        <div className="insight-item">
                            <div className="insight-icon">🔒</div>
                            <div className="insight-content">
                                <h4>Security Status</h4>
                                <p>All ACLs configured and role-based access controls active</p>
                            </div>
                            <div className="insight-priority high">Secure</div>
                        </div>
                    </div>
                </div>

                <div className="activity-section">
                    <h2>📈 Recent System Activity</h2>
                    <div className="activity-feed">
                        {recentActivity.length === 0 ? (
                            <div className="activity-item">
                                <div className="activity-avatar">📊</div>
                                <div className="activity-content">
                                    <h4>System Monitoring</h4>
                                    <p>All systems operational - monitoring for activity</p>
                                </div>
                                <div className="activity-time">Now</div>
                            </div>
                        ) : (
                            recentActivity.map((activity, index) => {
                                const sysId = typeof activity.sys_id === 'object' ? activity.sys_id.value : activity.sys_id
                                const type = typeof activity.transaction_type === 'object' ? activity.transaction_type.display_value : activity.transaction_type
                                
                                return (
                                    <div key={sysId || index} className="activity-item">
                                        <div className="activity-avatar">
                                            {type?.includes('ai') ? 'AI' : 'TX'}
                                        </div>
                                        <div className="activity-content">
                                            <h4>System Transaction</h4>
                                            <p>Type: {type || 'Unknown'}</p>
                                        </div>
                                        <div className="activity-time">Recent</div>
                                    </div>
                                )
                            })
                        )}
                    </div>
                </div>

                <div className="actions-section">
                    <h2>⚡ Admin Actions</h2>
                    <div className="quick-actions">
                        <div className="actions-grid">
                            <button onClick={navigateToSystemConfig} className="action-btn">
                                <span className="icon">⚙️</span>
                                <span>System Properties</span>
                            </button>
                            <button 
                                onClick={() => window.open('/x_1610509_intellil_customer_list.do', '_blank')}
                                className="action-btn"
                            >
                                <span className="icon">👥</span>
                                <span>Manage Users</span>
                            </button>
                            <button 
                                onClick={() => window.open('/x_1610509_intellil_loan_transaction_list.do', '_blank')}
                                className="action-btn"
                            >
                                <span className="icon">📊</span>
                                <span>View Audit Logs</span>
                            </button>
                            <button 
                                onClick={() => alert('Advanced reporting features coming soon!')}
                                className="action-btn"
                            >
                                <span className="icon">📈</span>
                                <span>Generate Reports</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}