import '@servicenow/sdk/global'
import { Record } from '@servicenow/sdk/core'

// Overdue Payment Notification System
export const OverduePaymentNotification = Record({
    $id: Now.ID['overdue_notification'],
    table: 'sysevent_email_action',
    data: {
        name: 'Intelli-Loan: Overdue Payment Alert',
        event_name: 'intelli_loan.payment_overdue',
        subject: '⚠️ OVERDUE: Payment Required - Loan #${ai_repayment_schedule.plan.application.number}',
        message_html: `
            <h2 style="color: #d32f2f;">⚠️ URGENT: Payment Overdue Notice</h2>
            <p>Dear \${ai_repayment_schedule.plan.customer.first_name},</p>
            
            <p><strong>Your loan payment is now overdue.</strong></p>
            
            <h3>Overdue Payment Details:</h3>
            <table border="1" style="border-collapse: collapse; width: 100%;">
                <tr>
                    <td><strong>Amount Due:</strong></td>
                    <td>$\${ai_repayment_schedule.amount_due}</td>
                </tr>
                <tr>
                    <td><strong>Original Due Date:</strong></td>
                    <td>\${ai_repayment_schedule.due_date}</td>
                </tr>
                <tr>
                    <td><strong>Days Overdue:</strong></td>
                    <td>\${ai_repayment_schedule.days_overdue}</td>
                </tr>
                <tr>
                    <td><strong>Late Fee Applied:</strong></td>
                    <td>$\${ai_repayment_schedule.late_fee}</td>
                </tr>
                <tr style="background-color: #ffebee;">
                    <td><strong>TOTAL AMOUNT NOW DUE:</strong></td>
                    <td><strong>$\${ai_repayment_schedule.amount_due + ai_repayment_schedule.late_fee}</strong></td>
                </tr>
            </table>
            
            <h3 style="color: #d32f2f;">IMMEDIATE ACTION REQUIRED:</h3>
            <p>Please make your payment immediately to avoid further penalties.</p>
            
            <h3>Payment Options:</h3>
            <ul>
                <li>Online: Log in to your Intelli-Loan account</li>
                <li>Phone: Call (555) 123-LOAN</li>
                <li>Mobile App: Intelli-Loan mobile app</li>
            </ul>
            
            <p><em>If you're experiencing financial difficulties, please contact us immediately at support@intelliloan.com to discuss payment arrangements.</em></p>
            
            <h4>Failure to resolve this overdue payment may result in:</h4>
            <ul>
                <li>Additional late fees</li>
                <li>Negative credit reporting</li>
                <li>Account collection activities</li>
            </ul>
            
            <p><strong>Please contact us immediately.</strong></p>
            
            <p>Intelli-Loan Collections Team</p>
        `,
        recipient_fields: 'plan.customer.email',
        active: true
    },
    $meta: {
        installMethod: 'first install'
    }
})

// Payment Reminder Notification (sent before due date)
export const PaymentReminderNotification = Record({
    $id: Now.ID['payment_reminder'],
    table: 'sysevent_email_action',
    data: {
        name: 'Intelli-Loan: Payment Reminder',
        event_name: 'intelli_loan.payment_reminder',
        subject: '💰 Payment Due Soon - Loan #${ai_repayment_schedule.plan.application.number}',
        message_html: `
            <h2>Payment Reminder</h2>
            <p>Dear \${ai_repayment_schedule.plan.customer.first_name},</p>
            
            <p>This is a friendly reminder that your loan payment is due soon.</p>
            
            <h3>Payment Details:</h3>
            <table border="1" style="border-collapse: collapse; width: 100%;">
                <tr>
                    <td><strong>Amount Due:</strong></td>
                    <td>$\${ai_repayment_schedule.amount_due}</td>
                </tr>
                <tr>
                    <td><strong>Due Date:</strong></td>
                    <td>\${ai_repayment_schedule.due_date}</td>
                </tr>
                <tr>
                    <td><strong>Installment #:</strong></td>
                    <td>\${ai_repayment_schedule.installment_number}</td>
                </tr>
            </table>
            
            <h3>Easy Payment Options:</h3>
            <ul>
                <li><strong>Online:</strong> Log in to your Intelli-Loan account</li>
                <li><strong>Mobile App:</strong> Use the Intelli-Loan mobile app</li>
                <li><strong>Phone:</strong> Call (555) 123-LOAN</li>
                <li><strong>Auto-Pay:</strong> Set up automatic payments to never miss a due date</li>
            </ul>
            
            <p>Making your payment on time helps:</p>
            <ul>
                <li>✅ Maintain your good credit standing</li>
                <li>✅ Avoid late fees</li>
                <li>✅ Build positive payment history</li>
                <li>✅ Qualify for better rates on future loans</li>
            </ul>
            
            <p>Thank you for being a responsible borrower!</p>
            
            <p>Best regards,<br>
            The Intelli-Loan Team</p>
        `,
        recipient_fields: 'plan.customer.email',
        active: true
    },
    $meta: {
        installMethod: 'first install'
    }
})

// AI Plan Generation Notification
export const AIPlanGeneratedNotification = Record({
    $id: Now.ID['ai_plan_notification'],
    table: 'sysevent_email_action',
    data: {
        name: 'Intelli-Loan: AI Plans Generated',
        event_name: 'intelli_loan.ai_plans_generated',
        subject: '🤖 AI Repayment Plans Ready - Application #${loan_application.number}',
        message_html: `
            <h2>🤖 Your Personalized AI Repayment Plans are Ready!</h2>
            <p>Dear \${loan_application.customer.first_name},</p>
            
            <p>Great news! Our advanced AI system has analyzed your financial profile and generated personalized repayment plan options specifically for you.</p>
            
            <h3>Your Plans Were Customized Based On:</h3>
            <ul>
                <li><strong>Your Salary Cycle:</strong> \${loan_application.customer.salary_cycle}</li>
                <li><strong>Your Monthly Income:</strong> $\${loan_application.customer.monthly_income}</li>
                <li><strong>Your Next Salary Date:</strong> \${loan_application.customer.next_salary_date}</li>
                <li><strong>Your Risk Profile:</strong> \${loan_application.risk_score}/100</li>
            </ul>
            
            <h3>What Makes Our AI Special:</h3>
            <ul>
                <li>🎯 <strong>Salary-Aligned Payments:</strong> Due dates match your income schedule</li>
                <li>📊 <strong>Risk-Optimized Terms:</strong> Plans designed for your financial capacity</li>
                <li>🧠 <strong>Smart Recommendations:</strong> AI suggests the best options for your situation</li>
                <li>⏰ <strong>Flexible Timing:</strong> Payment windows that work with your lifestyle</li>
            </ul>
            
            <h3>Next Steps:</h3>
            <ol>
                <li><strong>Log in</strong> to your Intelli-Loan account</li>
                <li><strong>Review</strong> your personalized plan options</li>
                <li><strong>Select</strong> your preferred repayment plan</li>
                <li><strong>Submit</strong> for final loan officer review</li>
            </ol>
            
            <p>Our loan officer will review your application along with your selected AI plan for final approval.</p>
            
            <p><em>The AI has specifically recommended the plan with the highest success probability for your profile.</em></p>
            
            <p>Best regards,<br>
            Intelli-Loan AI Team 🤖</p>
        `,
        recipient_fields: 'customer.email',
        active: true
    },
    $meta: {
        installMethod: 'first install'
    }
})