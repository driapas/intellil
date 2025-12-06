import '@servicenow/sdk/global'
import { Record } from '@servicenow/sdk/core'

// Application Status Change Notifications
export const ApplicationSubmittedNotification = Record({
    $id: Now.ID['app_submitted_notification'],
    table: 'sysevent_email_action',
    data: {
        name: 'Intelli-Loan: Application Submitted',
        event_name: 'intelli_loan.application_submitted',
        subject: '📄 Application Received - #${loan_application.number}',
        message_html: `
            <h2>Application Successfully Submitted!</h2>
            <p>Dear \${loan_application.customer.first_name},</p>
            
            <p>Thank you for choosing Intelli-Loan! We have successfully received your loan application.</p>
            
            <h3>Application Details:</h3>
            <table border="1" style="border-collapse: collapse; width: 100%;">
                <tr>
                    <td><strong>Application #:</strong></td>
                    <td>\${loan_application.number}</td>
                </tr>
                <tr>
                    <td><strong>Loan Amount:</strong></td>
                    <td>$\${loan_application.loan_amount}</td>
                </tr>
                <tr>
                    <td><strong>Purpose:</strong></td>
                    <td>\${loan_application.loan_purpose}</td>
                </tr>
                <tr>
                    <td><strong>Status:</strong></td>
                    <td>Under Review</td>
                </tr>
                <tr>
                    <td><strong>Submission Date:</strong></td>
                    <td>\${loan_application.application_date}</td>
                </tr>
            </table>
            
            <h3>What Happens Next:</h3>
            <ol>
                <li><strong>AI Analysis:</strong> Our AI will generate personalized repayment plans (usually within minutes)</li>
                <li><strong>Plan Selection:</strong> You'll be notified to review and select your preferred plan</li>
                <li><strong>Officer Review:</strong> A loan officer will review your application and selected plan</li>
                <li><strong>Decision:</strong> You'll receive approval/rejection notification within 24-48 hours</li>
                <li><strong>Disbursement:</strong> If approved, funds will be disbursed within 1-2 business days</li>
            </ol>
            
            <p><strong>Expected Timeline:</strong> Most applications are processed within 2-3 business days.</p>
            
            <p>You can track your application status by logging into your Intelli-Loan account at any time.</p>
            
            <p>Thank you for choosing Intelli-Loan!</p>
            
            <p>Best regards,<br>
            The Intelli-Loan Team</p>
        `,
        recipient_fields: 'customer.email',
        active: true
    },
    $meta: {
        installMethod: 'first install'
    }
})

export const ApplicationRejectedNotification = Record({
    $id: Now.ID['app_rejected_notification'],
    table: 'sysevent_email_action',
    data: {
        name: 'Intelli-Loan: Application Rejected',
        event_name: 'intelli_loan.application_rejected',
        subject: 'Application Update - #${loan_application.number}',
        message_html: `
            <h2>Application Status Update</h2>
            <p>Dear \${loan_application.customer.first_name},</p>
            
            <p>Thank you for your interest in Intelli-Loan. After careful review, we regret to inform you that your loan application has not been approved at this time.</p>
            
            <h3>Application Details:</h3>
            <table border="1" style="border-collapse: collapse; width: 100%;">
                <tr>
                    <td><strong>Application #:</strong></td>
                    <td>\${loan_application.number}</td>
                </tr>
                <tr>
                    <td><strong>Requested Amount:</strong></td>
                    <td>$\${loan_application.loan_amount}</td>
                </tr>
                <tr>
                    <td><strong>Purpose:</strong></td>
                    <td>\${loan_application.loan_purpose}</td>
                </tr>
            </table>
            
            <h3>Reason for Decision:</h3>
            <p>\${loan_application.rejected_reason}</p>
            
            <h3>We Encourage You To:</h3>
            <ul>
                <li><strong>Review and improve your financial profile</strong> - Update your income, reduce expenses, or improve credit score</li>
                <li><strong>Consider applying for a smaller amount</strong> - Lower amounts have higher approval rates</li>
                <li><strong>Wait 30 days before reapplying</strong> - This allows time for profile improvements</li>
                <li><strong>Contact our support team</strong> - Get personalized advice on improving your application</li>
            </ul>
            
            <h3>Tips for Future Applications:</h3>
            <ul>
                <li>✅ Ensure all profile information is complete and accurate</li>
                <li>✅ Verify your identity with required documents</li>
                <li>✅ Apply for amounts within your income capacity</li>
                <li>✅ Maintain consistent employment and income</li>
            </ul>
            
            <p>For questions about this decision or how to improve your application, please contact our support team at support@intelliloan.com</p>
            
            <p>We appreciate your interest in Intelli-Loan and hope to serve you in the future.</p>
            
            <p>Thank you for your understanding.</p>
            
            <p>Best regards,<br>
            The Intelli-Loan Team</p>
        `,
        recipient_fields: 'customer.email',
        active: true
    },
    $meta: {
        installMethod: 'first install'
    }
})

export const DisbursementNotification = Record({
    $id: Now.ID['disbursement_notification'],
    table: 'sysevent_email_action',
    data: {
        name: 'Intelli-Loan: Funds Disbursed',
        event_name: 'intelli_loan.funds_disbursed',
        subject: '💰 Funds Disbursed - Loan #${loan_application.number}',
        message_html: `
            <h2>💰 Great News! Your Funds Have Been Disbursed</h2>
            <p>Dear \${loan_application.customer.first_name},</p>
            
            <p>Congratulations! Your loan funds have been successfully disbursed to your account.</p>
            
            <h3>Disbursement Details:</h3>
            <table border="1" style="border-collapse: collapse; width: 100%;">
                <tr>
                    <td><strong>Amount Disbursed:</strong></td>
                    <td>$\${loan_application.loan_amount}</td>
                </tr>
                <tr>
                    <td><strong>Disbursement Date:</strong></td>
                    <td>Today</td>
                </tr>
                <tr>
                    <td><strong>Total Amount Due:</strong></td>
                    <td>$\${loan_application.total_amount}</td>
                </tr>
                <tr>
                    <td><strong>Interest Rate:</strong></td>
                    <td>\${loan_application.interest_rate}%</td>
                </tr>
            </table>
            
            <h3>🚨 Important: Your Repayment Schedule is Now ACTIVE</h3>
            
            <h3>What You Need to Do:</h3>
            <ol>
                <li><strong>Check your account</strong> - Funds should appear within a few hours</li>
                <li><strong>Review your repayment schedule</strong> - Log in to see your complete payment plan</li>
                <li><strong>Set up reminders</strong> - Mark your payment due dates in your calendar</li>
                <li><strong>Consider auto-pay</strong> - Never miss a payment with automatic deductions</li>
            </ol>
            
            <h3>Payment Information:</h3>
            <ul>
                <li><strong>Online:</strong> Pay anytime through your Intelli-Loan account</li>
                <li><strong>Mobile App:</strong> Download our app for easy payments</li>
                <li><strong>Phone:</strong> Call (555) 123-LOAN to pay by phone</li>
                <li><strong>Auto-Pay:</strong> Set up automatic payments to avoid late fees</li>
            </ul>
            
            <p><strong>Remember:</strong> Making payments on time builds your credit and qualifies you for better rates on future loans!</p>
            
            <p>Thank you for choosing Intelli-Loan. We're here to support your financial journey!</p>
            
            <p>Best regards,<br>
            The Intelli-Loan Team</p>
        `,
        recipient_fields: 'customer.email',
        active: true
    },
    $meta: {
        installMethod: 'first install'
    }
})