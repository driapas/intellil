import React, { useState } from 'react'
import './Auth.css'

export default function LoginPage() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            const response = await fetch('/api/x_1610509_intellil/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ data: { username, password } })
            })

            const data = await response.json()

            if (data.success) {
                // Redirect based on role
                if (data.role === 'x_1610509_intellil.borrower') {
                    window.location.href = '/x_1610509_intellil_customer_portal.do'
                } else if (data.role === 'x_1610509_intellil.loan_officer') {
                    window.location.href = '/x_1610509_intellil_officer_dashboard.do'
                } else if (data.role === 'x_1610509_intellil.admin') {
                    window.location.href = '/x_1610509_intellil_admin_dashboard.do'
                } else {
                    window.location.href = '/x_1610509_intellil_dashboard.do'
                }
            } else {
                setError(data.message || 'Invalid username or password')
                setLoading(false)
            }
        } catch (err) {
            setError('Login failed. Please try again.')
            setLoading(false)
        }
    }

    const goToLanding = () => {
        window.location.href = '/x_1610509_intellil_landing.do'
    }

    const goToRegister = () => {
        window.location.href = '/x_1610509_intellil_register.do'
    }

    return (
        <div className="auth-page">
            <div className="auth-container">
                <div className="auth-card">
                    <button className="back-button" onClick={goToLanding}>
                        ← Back to Home
                    </button>

                    <div className="auth-header">
                        <div className="auth-logo">🔐</div>
                        <h1>Welcome Back</h1>
                        <p>Sign in to your IntelliLoan account</p>
                    </div>

                    {error && (
                        <div className="error-message">
                            <span>⚠️</span> {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="auth-form">
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter your username"
                                required
                                disabled={loading}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                required
                                disabled={loading}
                            />
                        </div>

                        <button 
                            type="submit" 
                            className="auth-submit-btn"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <span className="spinner"></span>
                                    Signing In...
                                </>
                            ) : (
                                <>
                                    <span>🔓</span>
                                    Sign In
                                </>
                            )}
                        </button>
                    </form>

                    <div className="auth-footer">
                        <p>
                            Don't have an account? 
                            <button className="link-button" onClick={goToRegister}>
                                Create Account
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

