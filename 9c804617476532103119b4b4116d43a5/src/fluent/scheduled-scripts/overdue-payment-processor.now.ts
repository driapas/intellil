import '@servicenow/sdk/global'
import { Record } from '@servicenow/sdk/core'

// Create scheduled script as a sys_trigger record for daily overdue payment processing
export const OverduePaymentProcessor = Record({
    $id: Now.ID['overdue_payment_processor'],
    table: 'sys_trigger',
    data: {
        name: 'Intelli-Loan: Process Overdue Payments',
        script: `
var gr = new GlideRecord('x_1610509_intellil_ai_repayment_schedule');
var today = new GlideDate();
var gracePeriodDays = parseInt(gs.getProperty('x_1610509_intellil.grace_period_days', '3'));

// Calculate cutoff date (due_date + grace period)
var cutoffDate = new GlideDate();
cutoffDate.addDays(-gracePeriodDays);

gr.addQuery('status', 'pending');
gr.addQuery('due_date', '<=', cutoffDate.getDisplayValue());
gr.query();

var overdueCount = 0;
var lateFeePercentage = parseFloat(gs.getProperty('x_1610509_intellil.late_fee_percentage', '5.0')) / 100;

while (gr.next()) {
    // Mark as overdue
    gr.setValue('status', 'overdue');
    
    // Calculate days overdue
    var dueDate = new GlideDate(gr.getValue('due_date'));
    var daysDiff = today.getDaysAwayFrom(dueDate);
    gr.setValue('days_overdue', daysDiff.toString());
    
    // Calculate and apply late fee
    var amountDue = parseFloat(gr.getValue('amount_due'));
    var lateFee = amountDue * lateFeePercentage;
    gr.setValue('late_fee', lateFee.toString());
    
    gr.update();
    overdueCount++;
    
    // Log transaction
    var transGr = new GlideRecord('x_1610509_intellil_loan_transaction');
    transGr.initialize();
    transGr.setValue('transaction_type', 'payment_overdue');
    transGr.setValue('application', gr.plan.application);
    transGr.setValue('customer', gr.plan.customer);
    transGr.setValue('user', 'system');
    transGr.setValue('remarks', 'Payment overdue. Days: ' + daysDiff + ', Late fee: $' + lateFee.toFixed(2));
    transGr.insert();
}

gs.info('Processed ' + overdueCount + ' overdue payments');`,
        trigger_type: '0',
        next_action: '2024-02-01 08:00:00',
        state: '0',
        sys_domain: 'global',
        condition: '',
        conditional: 'false'
    },
    $meta: {
        installMethod: 'first install'
    }
})