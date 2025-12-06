import '@servicenow/sdk/global'
import { BusinessRule } from '@servicenow/sdk/core'
import { onPaymentReceived } from '../../server/business-rules/payment-processor.js'

export const PaymentProcessor = BusinessRule({
    $id: Now.ID['payment_processor'],
    name: 'Payment Processor',
    table: 'x_1610509_intellil_loan_repayment',
    when: 'after',
    action: ['insert', 'update'],
    script: onPaymentReceived,
    condition: "current.payment_status == 'completed'",
    order: 200,
    active: true,
    description: 'Processes completed payments and updates repayment schedules'
})