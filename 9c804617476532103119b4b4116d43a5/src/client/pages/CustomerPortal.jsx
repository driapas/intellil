import React, { useState, useEffect, useMemo } from 'react'
import { LoanService } from '../services/LoanService.js'
import { CustomerService } from '../services/CustomerService.js'
import './Dashboard.css'

export default function CustomerPortal() {
    const loanService = useMemo(() => new LoanService(), [])
    const customerService = useMemo(() => new CustomerService(), [])
    
    const [myApplications, setMyApplications] = useState([])
    const [myAIPlans, setMyAIPlans] = useState([])
    const [customerProfile, setCustomerProfile] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadCustomerData()
    }, [loanService, customerService])

    const loadCustomerData = async () => {
        try {
            setLoading(true)
            
            // In real implementation, this would get current user's customer record
            const [applications, aiPlans] = await Promise.all([
                loanService.list(),
                loanService.getAIPlans()
            ])
            
            // Filter to current user's applications (simplified for demo)
            setMyApplications(applications.slice(0, 3))
            setMyAIPlans(aiPlans.slice(0, 2))
            
        } catch (error) {
            console.error('Error loading customer data:', error)
        } finally {
            setLoading(false)
        }
    }

    const navigateToNewApplication = () => {
        window.open('/intelliloan_application.do', '_blank')
    }

    const navigateToDashboard = () => {
        window.open('/intelliloan_dashboard.do', '_blank')
    }

    const getStatusColor = (status) => {
        const statusStr = typeof status === 'object' ? status.display_value : status
        switch (statusStr) {
            case 'approved': return 'success'
            case 'disbursed': return 'success'
            case 'submitted': return 'info'
            case 'rejected': return 'error'
            default: return 'warning'
        }
    }

    if (loading) {
        return (
            <div className="dashboard">
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Loading your customer portal...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="dashboard">
            <div className="dashboard-header">
                <div className="nav-buttons" style={{position: 'absolute', top: 0, left: 0}}>
                    <button onClick={navigateToDashboard} className="nav-btn">
                        🏠 Main Dashboard
                    </button>
                    <button onClick={navigateToNewApplication} className="nav-btn">
                        ➕ New Application
                    </button>
                </div>
                <h1>👤 Customer Portal</h1>
                <p>Manage your loans and AI-powered repayment plans</p>
            </div>

            <div className="dashboard-grid">
                <div className="stats-section">
                    <h2>📋 My Loan Applications</h2>
                    <div className="applications-list">
                        {myApplications.length === 0 ? (
                            <div className="card">
                                <p>No loan applications found. Ready to apply?</p>
                                <button onClick={navigateToNewApplication} className="submit-btn">
                                    🚀 Apply for Your First Loan
                                </button>
                            </div>
                        ) : (
                            myApplications.map((app, index) => {
                                const sysId = typeof app.sys_id === 'object' ? app.sys_id.value : app.sys_id
                                const amount = typeof app.loan_amount === 'object' ? app.loan_amount.display_value : app.loan_amount
                                const purpose = typeof app.loan_purpose === 'object' ? app.loan_purpose.display_value : app.loan_purpose
                                const status = typeof app.status === 'object' ? app.status.display_value : app.status
                                
                                return (
                                    <div key={sysId} className="card application-card">
                                        <div className="application-header">
                                            <h3>💰 ${parseFloat(amount).toLocaleString()}</h3>
                                            <span className={`status-badge ${getStatusColor(app.status)}`}>
                                                {status}
                                            </span>
                                        </div>
                                        <p><strong>Purpose:</strong> {purpose}</p>
                                        <p><strong>Application ID:</strong> {sysId.slice(-8)}</p>
                                        <div className="application-actions">
                                            <button 
                                                onClick={() => window.open(`/x_1610509_intellil_loan_application.do?sys_id=${sysId}`, '_blank')}
                                                className="action-btn"
                                            >
                                                👁️ View Details
                                            </button>
                                        </div>
                                    </div>
                                )
                            })
                        )}
                    </div>
                </div>

                <div className="insights-section">
                    <h2>🤖 My AI Repayment Plans</h2>
                    <div className="insights-panel">
                        {myAIPlans.length === 0 ? (
                            <div className="insight-item">
                                <div className="insight-icon">🎯</div>
                                <div className="insight-content">
                                    <h4>No AI Plans Yet</h4>
                                    <p>Create a loan application and generate AI-powered repayment plans</p>
                                </div>
                            </div>
                        ) : (
                            myAIPlans.map((plan, index) => {
                                const sysId = typeof plan.sys_id === 'object' ? plan.sys_id.value : plan.sys_id
                                const installments = typeof plan.installment_count === 'object' ? plan.installment_count.display_value : plan.installment_count
                                const totalAmount = typeof plan.total_amount === 'object' ? plan.total_amount.display_value : plan.total_amount
                                const status = typeof plan.status === 'object' ? plan.status.display_value : plan.status
                                
                                return (
                                    <div key={sysId} className="insight-item">
                                        <div className="insight-icon">💎</div>
                                        <div className="insight-content">
                                            <h4>{installments} Monthly Payments</h4>
                                            <p>Total: ${parseFloat(totalAmount).toFixed(2)} | Status: {status}</p>
                                        </div>
                                        <div className={`insight-priority ${status === 'accepted' ? 'high' : 'medium'}`}>
                                            {status === 'accepted' ? 'Active' : 'Available'}
                                        </div>
                                    </div>
                                )
                            })
                        )}
                    </div>
                </div>

                <div className="activity-section">
                    <h2>💡 Financial Tips</h2>
                    <div className="activity-feed">
                        <div className="activity-item">
                            <div className="activity-avatar">💰</div>
                            <div className="activity-content">
                                <h4>Smart Budgeting</h4>
                                <p>Align your loan payments with your salary cycle for better cash flow management</p>
                            </div>
                        </div>
                        <div className="activity-item">
                            <div className="activity-avatar">📊</div>
                            <div className="activity-content">
                                <h4>Credit Building</h4>
                                <p>Consistent on-time payments help improve your credit score over time</p>
                            </div>
                        </div>
                        <div className="activity-item">
                            <div className="activity-avatar">🎯</div>
                            <div className="activity-content">
                                <h4>AI Optimization</h4>
                                <p>Our AI analyzes your income pattern to suggest the best repayment schedule</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="actions-section">
                    <h2>⚡ Quick Actions</h2>
                    <div className="quick-actions">
                        <div className="actions-grid">
                            <button onClick={navigateToNewApplication} className="action-btn">
                                <span className="icon">📝</span>
                                <span>New Loan Application</span>
                            </button>
                            <button 
                                onClick={() => window.open('/x_1610509_intellil_ai_repayment_plan_list.do', '_blank')}
                                className="action-btn"
                            >
                                <span className="icon">🤖</span>
                                <span>View AI Plans</span>
                            </button>
                            <button 
                                onClick={() => window.open('/x_1610509_intellil_loan_repayment_list.do', '_blank')}
                                className="action-btn"
                            >
                                <span className="icon">💳</span>
                                <span>Payment History</span>
                            </button>
                            <button 
                                onClick={() => alert('Customer support: support@intelliloan.com')}
                                className="action-btn"
                            >
                                <span className="icon">📞</span>
                                <span>Get Support</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}