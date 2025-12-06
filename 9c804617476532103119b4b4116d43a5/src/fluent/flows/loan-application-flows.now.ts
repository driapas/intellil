import '@servicenow/sdk/global'
import { Record } from '@servicenow/sdk/core'

// Create workflow records for Intelli-Loan flows using sys_workflow table
// Flow 1: Loan Application Submission Workflow
export const LoanApplicationWorkflow = Record({
    $id: Now.ID['loan_app_workflow'],
    table: 'wf_workflow',
    data: {
        name: 'Intelli-Loan Application Submission',
        description: 'Handles loan application submission and validation workflow',
        table: 'x_1610509_intellil_loan_application',
        condition: 'current.status.changes() && current.status == "submitted"',
        active: true,
        workflow_version: '1'
    },
    $meta: {
        installMethod: 'first install'
    }
})

// Flow 2: Loan Approval Workflow
export const LoanApprovalWorkflow = Record({
    $id: Now.ID['loan_approval_workflow'],
    table: 'wf_workflow',
    data: {
        name: 'Intelli-Loan Approval Process',
        description: 'Handles loan approval and disbursement preparation',
        table: 'x_1610509_intellil_loan_application',
        condition: 'current.status.changes() && current.status == "approved"',
        active: true,
        workflow_version: '1'
    },
    $meta: {
        installMethod: 'first install'
    }
})

// Flow 3: Payment Processing Workflow
export const PaymentWorkflow = Record({
    $id: Now.ID['payment_workflow'],
    table: 'wf_workflow',
    data: {
        name: 'Intelli-Loan Payment Processing',
        description: 'Handles payment processing and loan completion detection',
        table: 'x_1610509_intellil_loan_repayment',
        condition: 'current.payment_status.changes() && current.payment_status == "completed"',
        active: true,
        workflow_version: '1'
    },
    $meta: {
        installMethod: 'first install'
    }
})

// Alternative: Create Email Notification records for immediate notifications
export const LoanApprovalNotification = Record({
    $id: Now.ID['loan_approval_notification'],
    table: 'sysevent_email_action',
    data: {
        name: 'Intelli-Loan: Loan Approved Notification',
        event_name: 'intelli_loan.approved',
        subject: '🎉 Loan Approved! - Application #${loan_application.number}',
        message_html: `
            <h2>Congratulations! Your loan has been approved!</h2>
            <p>Dear \${loan_application.customer.first_name},</p>
            
            <p>We're excited to inform you that your loan application has been <strong>APPROVED</strong>!</p>
            
            <h3>Loan Details:</h3>
            <ul>
                <li><strong>Loan Amount:</strong> $\${loan_application.loan_amount}</li>
                <li><strong>Purpose:</strong> \${loan_application.loan_purpose}</li>
                <li><strong>Interest Rate:</strong> \${loan_application.interest_rate}%</li>
                <li><strong>Total Amount:</strong> $\${loan_application.total_amount}</li>
            </ul>
            
            <h3>Next Steps:</h3>
            <ol>
                <li>Our team will process the disbursement within 1-2 business days</li>
                <li>Funds will be transferred to your specified account</li>
                <li>Your repayment schedule will become active upon disbursement</li>
            </ol>
            
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

export const PaymentReceivedNotification = Record({
    $id: Now.ID['payment_received_notification'],
    table: 'sysevent_email_action',
    data: {
        name: 'Intelli-Loan: Payment Received Notification',
        event_name: 'intelli_loan.payment_received',
        subject: '✅ Payment Received - Loan #${loan_application.number}',
        message_html: `
            <h2>Payment Received Successfully</h2>
            <p>Dear \${loan_application.customer.first_name},</p>
            
            <p>We have successfully received your payment!</p>
            
            <h3>Payment Details:</h3>
            <ul>
                <li><strong>Amount Paid:</strong> $\${loan_repayment.amount_paid}</li>
                <li><strong>Payment Date:</strong> \${loan_repayment.payment_date}</li>
                <li><strong>Payment Method:</strong> \${loan_repayment.payment_method}</li>
                <li><strong>Transaction Reference:</strong> \${loan_repayment.transaction_reference}</li>
            </ul>
            
            <p>Thank you for your timely payment!</p>
            
            <p>You can view your complete payment history and schedule in your Intelli-Loan account.</p>
            
            <p>Best regards,<br>
            The Intelli-Loan Team</p>
        `,
        recipient_fields: 'application.customer.email',
        active: true
    },
    $meta: {
        installMethod: 'first install'
    }
})

export const LoanCompletedNotification = Record({
    $id: Now.ID['loan_completed_notification'],
    table: 'sysevent_email_action',
    data: {
        name: 'Intelli-Loan: Loan Completion Celebration',
        event_name: 'intelli_loan.loan_completed',
        subject: '🎉 Congratulations! Loan Fully Repaid - #${loan_application.number}',
        message_html: `
            <h1>🎉 Congratulations!</h1>
            <p>Dear \${loan_application.customer.first_name},</p>
            
            <p>You have successfully completed your loan repayment! 🎉</p>
            
            <h3>Loan Summary:</h3>
            <ul>
                <li><strong>Original Amount:</strong> $\${loan_application.loan_amount}</li>
                <li><strong>Total Paid:</strong> $\${loan_application.total_amount}</li>
                <li><strong>Final Payment Date:</strong> Today</li>
            </ul>
            
            <h3>What this means:</h3>
            <ul>
                <li>✅ Your loan account is now closed</li>
                <li>✅ You have successfully built positive payment history</li>
                <li>✅ You are eligible for future loans with better terms</li>
            </ul>
            
            <h3>Future Opportunities:</h3>
            <ul>
                <li>Pre-approved for higher loan amounts</li>
                <li>Reduced interest rates for future applications</li>
                <li>Priority processing for new applications</li>
            </ul>
            
            <p>Thank you for being a valued Intelli-Loan customer!</p>
            
            <p>We're here when you need us again!</p>
            
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