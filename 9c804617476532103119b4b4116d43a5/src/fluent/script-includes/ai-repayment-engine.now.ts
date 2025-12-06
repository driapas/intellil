import '@servicenow/sdk/global'
import { ScriptInclude } from '@servicenow/sdk/core'

export const AIRepaymentEngine = ScriptInclude({
    $id: Now.ID['ai_repayment_engine'],
    name: 'AIRepaymentEngine',
    script: Now.include('../../server/script-includes/ai-repayment-engine.js'),
    description: 'AI-powered repayment plan generation engine for micro-loans',
    apiName: 'x_1610509_intellil.AIRepaymentEngine',
    clientCallable: true,
    accessibleFrom: 'package_private',
    active: true
})