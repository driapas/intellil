import React, { useState, useEffect, useMemo } from 'react'
import { LoanService } from '../services/LoanService.js'
import { CustomerService } from '../services/CustomerService.js'
import StatsCard from '../components/StatsCard.jsx'
import RecentActivity from '../components/RecentActivity.jsx'
import AIInsights from '../components/AIInsights.jsx'
import QuickActions from '../components/QuickActions.jsx'
import './Dashboard.css'

export default function Dashboard() {
    const loanService = useMemo(() => new LoanService(), [])
    const customerService = useMemo(() => new CustomerService(), [])
    const [stats, setStats] = useState({
        totalApplications: 0,
        approvedLoans: 0,
        totalDisbursed: 0,
        activeCustomers: 0,
        pendingReview: 0,
        overduePayments: 0
    })
    const [recentActivity, setRecentActivity] = useState([])
    const [aiInsights, setAIInsights] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadDashboardData()
    }, [loanService, customerService])

    const loadDashboardData = async () => {
        try {
            setLoading(true)
            
            // Load statistics
            const [applications, customers, transactions] = await Promise.all([
                loanService.list(),
                customerService.list(),
                loanService.getRecentTransactions()
            ])

            const approvedApps = applications.filter(app => {
                const status = typeof app.status === 'object' ? app.status.display_value : app.status
                return status === 'approved' || status === 'disbursed'
            })

            const disbursedApps = applications.filter(app => {
                const status = typeof app.status === 'object' ? app.status.display_value : app.status
                return status === 'disbursed'
            })

            const pendingApps = applications.filter(app => {
                const status = typeof app.status === 'object' ? app.status.display_value : app.status
                return status === 'submitted' || status === 'under_review'
            })

            const totalDisbursed = disbursedApps.reduce((sum, app) => {
                const amount = parseFloat(typeof app.loan_amount === 'object' ? app.loan_amount.display_value : app.loan_amount) || 0
                return sum + amount
            }, 0)

            setStats({
                totalApplications: applications.length,
                approvedLoans: approvedApps.length,
                totalDisbursed: totalDisbursed,
                activeCustomers: customers.length,
                pendingReview: pendingApps.length,
                overduePayments: Math.floor(Math.random() * 5) // Simulated for demo
            })

            setRecentActivity(transactions.slice(0, 10))

            // Generate AI insights based on current data
            const insights = generateAIInsights(applications, customers)
            setAIInsights(insights)

        } catch (error) {
            console.error('Error loading dashboard data:', error)
        } finally {
            setLoading(false)
        }
    }

    const generateAIInsights = (applications, customers) => {
        const insights = []
        
        if (applications.length > 0) {
            const avgLoanAmount = applications.reduce((sum, app) => {
                const amount = parseFloat(typeof app.loan_amount === 'object' ? app.loan_amount.display_value : app.loan_amount) || 0
                return sum + amount
            }, 0) / applications.length

            insights.push({
                type: 'insight',
                title: 'Average Loan Amount',
                message: `Current average loan amount is $${avgLoanAmount.toFixed(2)}`,
                icon: '💰',
                priority: 'medium'
            })
        }

        if (customers.length > 0) {
            insights.push({
                type: 'opportunity',
                title: 'Customer Growth',
                message: `${customers.length} active customers with growth potential`,
                icon: '📈',
                priority: 'high'
            })
        }

        insights.push({
            type: 'ai-recommendation',
            title: 'AI Optimization',
            message: 'Consider implementing salary cycle alignment for better repayment rates',
            icon: '🤖',
            priority: 'high'
        })

        return insights
    }

    const refreshData = () => {
        loadDashboardData()
    }

    if (loading) {
        return (
            <div className="dashboard">
                <div className="dashboard-header">
                    <h1>🤖 Intelli-Loan Dashboard</h1>
                </div>
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Loading your intelligent dashboard...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="dashboard">
            <div className="dashboard-header">
                <h1>🤖 Intelli-Loan Dashboard</h1>
                <p>AI-Powered Micro-Loan Management System</p>
                <button className="refresh-btn" onClick={refreshData}>
                    🔄 Refresh Data
                </button>
            </div>

            <div className="dashboard-grid">
                <div className="stats-section">
                    <h2>📊 Key Metrics</h2>
                    <div className="stats-grid">
                        <StatsCard
                            title="Total Applications"
                            value={stats.totalApplications}
                            icon="📋"
                            color="purple"
                        />
                        <StatsCard
                            title="Approved Loans"
                            value={stats.approvedLoans}
                            icon="✅"
                            color="green"
                        />
                        <StatsCard
                            title="Total Disbursed"
                            value={`$${stats.totalDisbursed.toLocaleString()}`}
                            icon="💰"
                            color="blue"
                        />
                        <StatsCard
                            title="Active Customers"
                            value={stats.activeCustomers}
                            icon="👥"
                            color="purple"
                        />
                        <StatsCard
                            title="Pending Review"
                            value={stats.pendingReview}
                            icon="⏳"
                            color="orange"
                        />
                        <StatsCard
                            title="Overdue Payments"
                            value={stats.overduePayments}
                            icon="⚠️"
                            color="red"
                        />
                    </div>
                </div>

                <div className="insights-section">
                    <AIInsights insights={aiInsights} />
                </div>

                <div className="activity-section">
                    <RecentActivity activities={recentActivity} />
                </div>

                <div className="actions-section">
                    <QuickActions />
                </div>
            </div>
        </div>
    )
}