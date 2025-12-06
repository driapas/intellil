import React, { useState, useEffect, useMemo } from 'react'
import { LoanService } from '../services/LoanService.js'
import { CustomerService } from '../services/CustomerService.js'
import './LoanApplication.css'

export default function LoanApplication() {
    const loanService = useMemo(() => new LoanService(), [])
    const customerService = useMemo(() => new CustomerService(), [])
    
    const [customers, setCustomers] = useState([])
    const [selectedCustomer, setSelectedCustomer] = useState('')
    const [formData, setFormData] = useState({
        loan_amount: '',
        loan_purpose: '',
        notes: ''
    })
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')
    const [messageType, setMessageType] = useState('') // success, error, info
    const [aiPlans, setAIPlans] = useState([])
    const [generatingAI, setGeneratingAI] = useState(false)
    const [currentApplicationId, setCurrentApplicationId] = useState('')

    useEffect(() => {
        loadCustomers()
    }, [customerService])

    const loadCustomers = async () => {
        try {
            const customerList = await customerService.list()
            setCustomers(customerList)
        } catch (error) {
            showMessage('Failed to load customers', 'error')
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

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        if (!selectedCustomer || !formData.loan_amount || !formData.loan_purpose) {
            showMessage('Please fill in all required fields', 'error')
            return
        }

        setLoading(true)
        try {
            const applicationData = {
                customer: selectedCustomer,
                loan_amount: parseFloat(formData.loan_amount),
                loan_purpose: formData.loan_purpose,
                notes: formData.notes,
                status: 'draft'
            }

            const result = await loanService.create(applicationData)
            const newApplicationId = typeof result.result.sys_id === 'object' ? 
                result.result.sys_id.value : result.result.sys_id
            
            setCurrentApplicationId(newApplicationId)
            showMessage('✅ Loan application created successfully!', 'success')
            
            // Reset form but keep customer selected for AI generation
            setFormData({
                loan_amount: '',
                loan_purpose: '',
                notes: ''
            })
            
        } catch (error) {
            showMessage('❌ Failed to create loan application: ' + error.message, 'error')
        } finally {
            setLoading(false)
        }
    }

    const generateAIPlan = async () => {
        if (!currentApplicationId) {
            showMessage('Please create a loan application first', 'error')
            return
        }

        setGeneratingAI(true)
        try {
            // Call the AI generation via a background script execution
            const response = await fetch('/api/now/table/x_1610509_intellil_loan_application/' + currentApplicationId + '?sysparm_display_value=all', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'X-UserToken': window.g_ck
                }
            })

            if (response.ok) {
                // Simulate AI plan generation (in real implementation, this would call the AI engine)
                await new Promise(resolve => setTimeout(resolve, 3000))
                
                // Load AI plans for this application
                const plans = await loanService.getAIPlans(currentApplicationId)
                setAIPlans(plans)
                showMessage('🤖 AI repayment plans generated successfully!', 'success')
            }
            
        } catch (error) {
            showMessage('❌ Failed to generate AI plans: ' + error.message, 'error')
        } finally {
            setGeneratingAI(false)
        }
    }

    const acceptAIPlan = async (planId) => {
        try {
            await loanService.acceptAIPlan(planId)
            showMessage('✅ AI plan accepted successfully!', 'success')
            
            // Refresh plans
            const plans = await loanService.getAIPlans(currentApplicationId)
            setAIPlans(plans)
        } catch (error) {
            showMessage('❌ Failed to accept AI plan: ' + error.message, 'error')
        }
    }

    const navigateToApplications = () => {
        window.open('/x_1610509_intellil_loan_application_list.do', '_blank')
    }

    const navigateToDashboard = () => {
        window.open('/intelliloan_dashboard.do', '_blank')
    }

    return (
        <div className="loan-application">
            <div className="app-header">
                <div className="nav-buttons">
                    <button onClick={navigateToDashboard} className="nav-btn">
                        🏠 Dashboard
                    </button>
                    <button onClick={navigateToApplications} className="nav-btn">
                        📋 My Applications
                    </button>
                </div>
                <h1>🤖 Loan Application with AI Planning</h1>
                <p>Apply for a micro-loan with AI-powered repayment recommendations</p>
            </div>

            {message && (
                <div className={`message ${messageType}`}>
                    {message}
                </div>
            )}

            <div className="application-container">
                <div className="application-form-section">
                    <h2>📝 New Loan Application</h2>
                    <form onSubmit={handleSubmit} className="loan-form">
                        <div className="form-group">
                            <label htmlFor="customer">Customer *</label>
                            <select 
                                id="customer"
                                value={selectedCustomer}
                                onChange={(e) => setSelectedCustomer(e.target.value)}
                                required
                            >
                                <option value="">Select a customer...</option>
                                {customers.map(customer => {
                                    const sysId = typeof customer.sys_id === 'object' ? 
                                        customer.sys_id.value : customer.sys_id
                                    const fullName = typeof customer.full_name === 'object' ? 
                                        customer.full_name.display_value : customer.full_name
                                    const email = typeof customer.email === 'object' ? 
                                        customer.email.display_value : customer.email
                                    
                                    return (
                                        <option key={sysId} value={sysId}>
                                            {fullName} ({email})
                                        </option>
                                    )
                                })}
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="loan_amount">Loan Amount ($) *</label>
                            <input
                                type="number"
                                id="loan_amount"
                                name="loan_amount"
                                value={formData.loan_amount}
                                onChange={handleInputChange}
                                min="100"
                                max="5000"
                                step="50"
                                placeholder="Enter amount between $100 - $5000"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="loan_purpose">Loan Purpose *</label>
                            <select
                                id="loan_purpose"
                                name="loan_purpose"
                                value={formData.loan_purpose}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Select purpose...</option>
                                <option value="business">Business</option>
                                <option value="education">Education</option>
                                <option value="emergency">Emergency</option>
                                <option value="medical">Medical</option>
                                <option value="personal">Personal</option>
                                <option value="home_improvement">Home Improvement</option>
                                <option value="debt_consolidation">Debt Consolidation</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="notes">Additional Notes</label>
                            <textarea
                                id="notes"
                                name="notes"
                                value={formData.notes}
                                onChange={handleInputChange}
                                rows="3"
                                placeholder="Any additional information about your loan request..."
                            />
                        </div>

                        <div className="form-actions">
                            <button type="submit" disabled={loading} className="submit-btn">
                                {loading ? '⏳ Creating Application...' : '📤 Create Application'}
                            </button>
                        </div>
                    </form>
                </div>

                <div className="ai-section">
                    <h2>🤖 AI-Powered Repayment Planning</h2>
                    
                    {currentApplicationId ? (
                        <div className="ai-controls">
                            <p>Application created! Generate personalized repayment plans using AI.</p>
                            <button 
                                onClick={generateAIPlan} 
                                disabled={generatingAI}
                                className="ai-generate-btn"
                            >
                                {generatingAI ? '🧠 Generating AI Plans...' : '🚀 Generate AI Plans'}
                            </button>
                        </div>
                    ) : (
                        <div className="ai-placeholder">
                            <p>🎯 Create a loan application to unlock AI-powered repayment planning</p>
                            <ul>
                                <li>✨ Salary cycle-aligned payment schedules</li>
                                <li>🧮 Multiple repayment options</li>
                                <li>📊 Risk assessment and recommendations</li>
                                <li>💡 Personalized financial insights</li>
                            </ul>
                        </div>
                    )}

                    {aiPlans.length > 0 && (
                        <div className="ai-plans">
                            <h3>💎 AI-Generated Repayment Plans</h3>
                            {aiPlans.map((plan, index) => {
                                const sysId = typeof plan.sys_id === 'object' ? 
                                    plan.sys_id.value : plan.sys_id
                                const status = typeof plan.status === 'object' ? 
                                    plan.status.display_value : plan.status
                                const installments = typeof plan.installment_count === 'object' ? 
                                    plan.installment_count.display_value : plan.installment_count
                                const totalAmount = typeof plan.total_amount === 'object' ? 
                                    plan.total_amount.display_value : plan.total_amount
                                const description = typeof plan.plan_description === 'object' ? 
                                    plan.plan_description.display_value : plan.plan_description
                                const reasoning = typeof plan.ai_reasoning === 'object' ? 
                                    plan.ai_reasoning.display_value : plan.ai_reasoning
                                const recommendation = typeof plan.recommended_by_ai === 'object' ? 
                                    plan.recommended_by_ai.display_value : plan.recommended_by_ai

                                return (
                                    <div key={sysId} className={`ai-plan-card ${recommendation}`}>
                                        <div className="plan-header">
                                            <h4>{description || `Plan ${index + 1}`}</h4>
                                            <span className={`plan-badge ${recommendation}`}>
                                                {recommendation === 'high' ? '⭐ Recommended' : 
                                                 recommendation === 'medium' ? '👍 Good Option' : '⚡ Quick Pay'}
                                            </span>
                                        </div>
                                        <div className="plan-details">
                                            <div className="plan-stat">
                                                <span>Installments:</span>
                                                <strong>{installments}</strong>
                                            </div>
                                            <div className="plan-stat">
                                                <span>Total Amount:</span>
                                                <strong>${parseFloat(totalAmount).toFixed(2)}</strong>
                                            </div>
                                            <div className="plan-stat">
                                                <span>Monthly Payment:</span>
                                                <strong>${(parseFloat(totalAmount) / parseInt(installments)).toFixed(2)}</strong>
                                            </div>
                                        </div>
                                        {reasoning && (
                                            <div className="ai-reasoning">
                                                <strong>🤖 AI Reasoning:</strong>
                                                <p>{reasoning}</p>
                                            </div>
                                        )}
                                        <div className="plan-actions">
                                            {status === 'generated' ? (
                                                <button 
                                                    onClick={() => acceptAIPlan(sysId)}
                                                    className="accept-btn"
                                                >
                                                    ✅ Accept This Plan
                                                </button>
                                            ) : (
                                                <span className="accepted-badge">✅ Plan Accepted</span>
                                            )}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}