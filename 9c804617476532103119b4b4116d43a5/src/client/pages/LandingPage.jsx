import React from 'react'
import './Landing.css'

export default function LandingPage() {
    const handleSignIn = () => {
        window.location.href = '/x_1610509_intellil_login.do'
    }

    const handleCreateAccount = () => {
        window.location.href = '/x_1610509_intellil_register.do'
    }

    return (
        <div className="landing-page">
            <div className="landing-hero">
                <div className="landing-content">
                    <div className="logo-section">
                        <div className="logo-icon">🤖</div>
                        <h1 className="app-title">IntelliLoan</h1>
                    </div>
                    
                    <p className="tagline">AI-Powered Micro-Loan Management System</p>
                    
                    <p className="description">
                        Experience intelligent lending with AI-driven repayment plans 
                        tailored to your salary cycle and financial profile.
                    </p>

                    <div className="features-grid">
                        <div className="feature-item">
                            <span className="feature-icon">🎯</span>
                            <h3>Smart Loan Approval</h3>
                            <p>AI-powered risk assessment and instant decisions</p>
                        </div>
                        <div className="feature-item">
                            <span className="feature-icon">💡</span>
                            <h3>Personalized Plans</h3>
                            <p>Repayment schedules aligned with your salary cycle</p>
                        </div>
                        <div className="feature-item">
                            <span className="feature-icon">⚡</span>
                            <h3>Fast Processing</h3>
                            <p>Quick disbursement and seamless management</p>
                        </div>
                        <div className="feature-item">
                            <span className="feature-icon">🔒</span>
                            <h3>Secure Platform</h3>
                            <p>Enterprise-grade security for your data</p>
                        </div>
                    </div>

                    <div className="cta-buttons">
                        <button className="btn-primary" onClick={handleSignIn}>
                            <span className="btn-icon">🔐</span>
                            Sign In
                        </button>
                        <button className="btn-secondary" onClick={handleCreateAccount}>
                            <span className="btn-icon">✨</span>
                            Create Account
                        </button>
                    </div>

                    <div className="info-footer">
                        <p>
                            <strong>New to IntelliLoan?</strong> Create an account to apply for your first loan.
                        </p>
                        <p>
                            <strong>Already have an account?</strong> Sign in to manage your loans and payments.
                        </p>
                    </div>
                </div>
            </div>

            <div className="landing-footer">
                <p>© 2024 IntelliLoan - AI-Assisted Micro-Loan Management</p>
            </div>
        </div>
    )
}



