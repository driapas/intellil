import React, { useState } from 'react'
import './Auth.css'

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        jobTitle: '',
        employer: '',
        monthlyIncome: '',
        salaryCycle: 'monthly',
        nextSalaryDate: '',
        monthlyExpenses: '',
        address: '',
        city: '',
        state: '',
        zipCode: ''
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [step, setStep] = useState(1)

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const validateStep1 = () => {
        if (!formData.username || !formData.password || !formData.confirmPassword) {
            setError('Please fill in all required fields')
            return false
        }
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match')
            return false
        }
        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters')
            return false
        }
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
            setError('Please fill in all personal information')
            return false
        }
        return true
    }

    const validateStep2 = () => {
        if (!formData.monthlyIncome || !formData.nextSalaryDate) {
            setError('Please fill in all financial information')
            return false
        }
        if (parseFloat(formData.monthlyIncome) <= 0) {
            setError('Monthly income must be greater than 0')
            return false
        }
        return true
    }

    const handleNext = () => {
        setError('')
        if (step === 1 && validateStep1()) {
            setStep(2)
        }
    }

    const handleBack = () => {
        setError('')
        setStep(1)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        if (!validateStep2()) {
            return
        }

        setLoading(true)

        try {
            const response = await fetch('/api/x_1610509_intellil/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ data: formData })
            })

            const data = await response.json()

            if (data.success) {
                alert('✅ Account created successfully! You can now sign in.')
                window.location.href = '/x_1610509_intellil_login.do'
            } else {
                setError(data.message || 'Registration failed. Please try again.')
                setLoading(false)
            }
        } catch (err) {
            console.error('Registration error:', err)
            setError('Registration failed. Please check if REST API is configured.')
            setLoading(false)
        }
    }

    const goToLanding = () => {
        window.location.href = '/x_1610509_intellil_landing.do'
    }

    const goToLogin = () => {
        window.location.href = '/x_1610509_intellil_login.do'
    }

    return (
        <div className="auth-page">
            <div className="auth-container">
                <div className="auth-card register-card">
                    <button className="back-button" onClick={goToLanding}>
                        ← Back to Home
                    </button>

                    <div className="auth-header">
                        <div className="auth-logo">✨</div>
                        <h1>Create Account</h1>
                        <p>Join IntelliLoan and get personalized loan options</p>
                    </div>

                    <div className="progress-indicator">
                        <div className={`progress-step ${step >= 1 ? 'active' : ''}`}>
                            <span>1</span>
                            <p>Account Info</p>
                        </div>
                        <div className="progress-line"></div>
                        <div className={`progress-step ${step >= 2 ? 'active' : ''}`}>
                            <span>2</span>
                            <p>Financial Info</p>
                        </div>
                    </div>

                    {error && (
                        <div className="error-message">
                            <span>⚠️</span> {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="auth-form">
                        {step === 1 && (
                            <div className="form-step">
                                <h3>Account Information</h3>
                                
                                <div className="form-group">
                                    <label htmlFor="username">Username *</label>
                                    <input
                                        type="text"
                                        id="username"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        placeholder="Choose a username"
                                        required
                                    />
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="password">Password *</label>
                                        <input
                                            type="password"
                                            id="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            placeholder="Min. 6 characters"
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="confirmPassword">Confirm Password *</label>
                                        <input
                                            type="password"
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            placeholder="Re-enter password"
                                            required
                                        />
                                    </div>
                                </div>

                                <h3>Personal Information</h3>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="firstName">First Name *</label>
                                        <input
                                            type="text"
                                            id="firstName"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="lastName">Last Name *</label>
                                        <input
                                            type="text"
                                            id="lastName"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="email">Email *</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="phone">Phone *</label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="dateOfBirth">Date of Birth</label>
                                    <input
                                        type="date"
                                        id="dateOfBirth"
                                        name="dateOfBirth"
                                        value={formData.dateOfBirth}
                                        onChange={handleChange}
                                    />
                                </div>

                                <button 
                                    type="button" 
                                    className="auth-submit-btn"
                                    onClick={handleNext}
                                >
                                    Next Step →
                                </button>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="form-step">
                                <h3>Financial Information</h3>
                                
                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="jobTitle">Job Title</label>
                                        <input
                                            type="text"
                                            id="jobTitle"
                                            name="jobTitle"
                                            value={formData.jobTitle}
                                            onChange={handleChange}
                                            placeholder="Your job title"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="employer">Employer</label>
                                        <input
                                            type="text"
                                            id="employer"
                                            name="employer"
                                            value={formData.employer}
                                            onChange={handleChange}
                                            placeholder="Company name"
                                        />
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="monthlyIncome">Monthly Income ($) *</label>
                                        <input
                                            type="number"
                                            id="monthlyIncome"
                                            name="monthlyIncome"
                                            value={formData.monthlyIncome}
                                            onChange={handleChange}
                                            placeholder="0.00"
                                            step="0.01"
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="monthlyExpenses">Monthly Expenses ($)</label>
                                        <input
                                            type="number"
                                            id="monthlyExpenses"
                                            name="monthlyExpenses"
                                            value={formData.monthlyExpenses}
                                            onChange={handleChange}
                                            placeholder="0.00"
                                            step="0.01"
                                        />
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="salaryCycle">Salary Cycle *</label>
                                        <select
                                            id="salaryCycle"
                                            name="salaryCycle"
                                            value={formData.salaryCycle}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="weekly">Weekly</option>
                                            <option value="bi_weekly">Bi-Weekly</option>
                                            <option value="monthly">Monthly</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="nextSalaryDate">Next Salary Date *</label>
                                        <input
                                            type="date"
                                            id="nextSalaryDate"
                                            name="nextSalaryDate"
                                            value={formData.nextSalaryDate}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <h3>Address (Optional)</h3>

                                <div className="form-group">
                                    <label htmlFor="address">Street Address</label>
                                    <input
                                        type="text"
                                        id="address"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="city">City</label>
                                        <input
                                            type="text"
                                            id="city"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="state">State</label>
                                        <input
                                            type="text"
                                            id="state"
                                            name="state"
                                            value={formData.state}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="zipCode">ZIP Code</label>
                                        <input
                                            type="text"
                                            id="zipCode"
                                            name="zipCode"
                                            value={formData.zipCode}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="button-row">
                                    <button 
                                        type="button" 
                                        className="auth-back-btn"
                                        onClick={handleBack}
                                    >
                                        ← Back
                                    </button>

                                    <button 
                                        type="submit" 
                                        className="auth-submit-btn"
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <>
                                                <span className="spinner"></span>
                                                Creating Account...
                                            </>
                                        ) : (
                                            <>
                                                <span>✨</span>
                                                Create Account
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        )}
                    </form>

                    <div className="auth-footer">
                        <p>
                            Already have an account? 
                            <button className="link-button" onClick={goToLogin}>
                                Sign In
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

