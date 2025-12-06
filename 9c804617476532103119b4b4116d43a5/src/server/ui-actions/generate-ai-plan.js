// Generate AI Plan - Server Script
import { gs } from '@servicenow/glide'

// Call the AI Repayment Engine Script Include
var aiEngine = new x_1610509_intellil.AIRepaymentEngine()
var result = aiEngine.generateRepaymentPlan(current.sys_id.toString())

if (result.success) {
    gs.addInfoMessage('✅ AI Plan Generated Successfully! ' + result.planCount + ' plan(s) created.')
    
    // Log transaction
    var transaction = new GlideRecord('x_1610509_intellil_loan_transaction')
    transaction.initialize()
    transaction.type = 'ai_plan_generated'
    transaction.user = gs.getUserID()
    transaction.application = current.sys_id
    transaction.remarks = 'AI repayment plan generated: ' + result.planCount + ' options created'
    transaction.insert()
    
    // Refresh the form to show new related lists
    window.location.reload()
} else {
    gs.addErrorMessage('❌ Failed to generate AI plan: ' + result.error)
}