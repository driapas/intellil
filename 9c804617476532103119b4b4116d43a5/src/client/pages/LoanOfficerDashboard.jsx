import React, { useState, useEffect, useMemo } from 'react'
import { LoanService } from '../services/LoanService.js'
import { CustomerService } from '../services/CustomerService.js'
import './Dashboard.css'

export default function LoanOfficerDashboard() {
    const loanService = useMemo(() => new LoanService(), [])
    const customerService = useMemo(() => new CustomerService(), [])
    
    const [pendingApplications, setPendingApplications] = useState([])
    const [recentApprovals, setRecentApprovals] = useState([])
    const [aiPlansToReview, setAIPlansToReview] = useState([])
    const [loading, setLoading] = useState(true)
    const [message, setMessage] = useState('')
    const [messageType, setMessageType] = useState('')

    useEffect(() => {
        loadOfficerData()
    }, [loanService, customerService])

    const loadOfficerData = async () => {
        try {
            setLoading(true)
            
            const [applications, aiPlans] = await Promise.all([
                loanService.list(),
                loanService.getAIPlans()
            ])

            const pending = applications.filter(app => {
                const status = typeof app.status === 'object' ? app.status.display_value : app.status
                return status === 'submitted' || status === 'under_review'
            })

            const approved = applications.filter(app => {
                const status = typeof app.status === 'object' ? app.status.display_value : app.status
                return status === 'approved'
            })

            setPendingApplications(pending)
            setRecentApprovals(approved.slice(0, 5))
            setAIPlansToReview(aiPlans.slice(0, 3))

        } catch (error) {
            console.error('Error loading officer data:', error)
        } finally {
            setLoading(false)
        }
    }

    const showMessage = (msg, type) => {
        setMessage(msg)
        setMessageType(type)
        setTimeout(() => {
            setMessage('')
            setMessageType('')
        }, 5000)
    }

    const approveApplication = async (applicationId) => {
        try {
            await loanService.update(applicationId, { status: 'approved' })
            showMessage('✅ Application approved successfully!', 'success')
            loadOfficerData()
        } catch (error) {
            showMessage('❌ Failed to approve application', 'error')
        }
    }

    const rejectApplication = async (applicationId) => {
        const reason = prompt('Enter rejection reason:')
        if (!reason) return

        try {
            await loanService.update(applicationId, { 
                status: 'rejected',
                rejection_reason: reason 
            })
            showMessage('❌ Application rejected', 'info')
            loadOfficerData()
        } catch (error) {
            showMessage('❌ Failed to reject application', 'error')
        }
    }

    const navigateToMainDashboard = () => {
        window.open('/intelliloan_dashboard.do', '_blank')
    }

    const navigateToApplications = () => {
        window.open('/x_1610509_intellil_loan_application_list.do', '_blank')
    }

    if (loading) {
        return (
            <div className="dashboard">
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Loading loan officer dashboard...</p>
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
                    <button onClick={navigateToApplications} className="nav-btn">
                        📋 All Applications
                    </button>
                </div>
                <h1>👨‍💼 Loan Officer Dashboard</h1>
                <p>Application Review & Approval Management</p>
            </div>

            {message && (
                <div className={`message ${messageType}`}>
                    {message}
                </div>
            )}

            <div className="dashboard-grid">
                <div className="stats-section">
                    <h2>⏳ Pending Applications</h2>
                    <div className="applications-list">
                        {pendingApplications.length === 0 ? (
                            <div className="card">
                                <p>🎉 No pending applications! All caught up.</p>
                            </div>
                        ) : (
                            pendingApplications.map((app) => {
                                const sysId = typeof app.sys_id === 'object' ? app.sys_id.value : app.sys_id
                                const amount = typeof app.loan_amount === 'object' ? app.loan_amount.display_value : app.loan_amount
                                const purpose = typeof app.loan_purpose === 'object' ? app.loan_purpose.display_value : app.loan_purpose
                                const status = typeof app.status === 'object' ? app.status.display_value : app.status
                                
                                return (
                                    <div key={sysId} className="card application-card">
                                        <div className="application-header">
                                            <h3>💰 ${parseFloat(amount).toLocaleString()}</h3>
                                            <span className="status-badge warning">
                                                {status}
                                            </span>
                                        </div>
                                        <p><strong>Purpose:</strong> {purpose}</p>
                                        <p><strong>Application ID:</strong> {sysId.slice(-8)}</p>
                                        <div className="application-actions">
                                            <button 
                                                onClick={() => approveApplication(sysId)}
                                                className="action-btn success"
                                                style={{background: 'linear-gradient(135deg, #10B981, #059669)', marginRight: '0.5rem'}}
                                            >
                                                ✅ Approve
                                            </button>
                                            <button 
                                                onClick={() => rejectApplication(sysId)}
                                                className="action-btn error"
                                                style={{background: 'linear-gradient(135deg, #EF4444, #DC2626)'}}
                                            >
                                                ❌ Reject
                                            </button>
                                        </div>
                                    </div>
                                )
                            })
                        )}
                    </div>
                </div>

                <div className="insights-section">
                    <h2>🤖 AI Plans Review</h2>
                    <div className="insights-panel">
                        {aiPlansToReview.length === 0 ? (
                            <div className="insight-item">
                                <div className="insight-icon">🤖</div>
                                <div className="insight-content">
                                    <h4>No AI Plans to Review</h4>
                                    <p>All AI-generated plans have been processed</p>
                                </div>
                            </div>
                        ) : (
                            aiPlansToReview.map((plan, index) => {
                                const sysId = typeof plan.sys_id === 'object' ? plan.sys_id.value : plan.sys_id
                                const installments = typeof plan.installment_count === 'object' ? plan.installment_count.display_value : plan.installment_count
                                const totalAmount = typeof plan.total_amount === 'object' ? plan.total_amount.display_value : plan.total_amount
                                const riskScore = typeof plan.ai_risk_score === 'object' ? plan.ai_risk_score.display_value : plan.ai_risk_score
                                
                                return (
                                    <div key={sysId} className="insight-item">
                                        <div className="insight-icon">💎</div>
                                        <div className="insight-content">
                                            <h4>{installments} Payment Plan</h4>
                                            <p>Total: ${parseFloat(totalAmount).toFixed(2)} | Risk: {riskScore || 'N/A'}</p>
                                        </div>
                                        <div className="insight-priority medium">Review</div>
                                    </div>
                                )
                            })
                        )}
                    </div>
                </div>

                <div className="activity-section">
                    <h2>✅ Recent Approvals</h2>
                    <div className="activity-feed">
                        {recentApprovals.length === 0 ? (
                            <div className="activity-item">
                                <div className="activity-avatar">📋</div>
                                <div className="activity-content">
                                    <h4>No Recent Approvals</h4>
                                    <p>Recent approvals will appear here</p>
                                </div>
                            </div>
                        ) : (
                            recentApprovals.map((app, index) => {
                                const sysId = typeof app.sys_id === 'object' ? app.sys_id.value : app.sys_id
                                const amount = typeof app.loan_amount === 'object' ? app.loan_amount.display_value : app.loan_amount
                                
                                return (
                                    <div key={sysId} className="activity-item">
                                        <div className="activity-avatar">✅</div>
                                        <div className="activity-content">
                                            <h4>Approved Loan</h4>
                                            <p>Amount: ${parseFloat(amount).toLocaleString()}</p>
                                        </div>
                                        <div className="activity-time">Recent</div>
                                    </div>
                                )
                            })
                        )}
                    </div>
                </div>

                <div className="actions-section">
                    <h2>⚡ Officer Actions</h2>
                    <div className="quick-actions">
                        <div className="actions-grid">
                            <button onClick={navigateToApplications} className="action-btn">
                                <span className="icon">📋</span>
                                <span>Review Applications</span>
                            </button>
                            <button 
                                onClick={() => window.open('/x_1610509_intellil_ai_repayment_plan_list.do', '_blank')}
                                className="action-btn"
                            >
                                <span className="icon">🤖</span>
                                <span>AI Plan Analytics</span>
                            </button>
                            <button 
                                onClick={() => window.open('/x_1610509_intellil_loan_disbursement_list.do', '_blank')}
                                className="action-btn"
                            >
                                <span className="icon">💰</span>
                                <span>Manage Disbursements</span>
                            </button>
                            <button 
                                onClick={() => window.open('/x_1610509_intellil_customer_list.do', '_blank')}
                                className="action-btn"
                            >
                                <span className="icon">👥</span>
                                <span>Customer Profiles</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}