import { gs } from '@servicenow/glide'

export class AIRepaymentEngine {
    constructor() {
        this.geminiApiKey = gs.getProperty('x_1610509_intellil.gemini_api_key', '');
        this.geminiEndpoint = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';
    }

    /**
     * Generate AI-powered repayment plans for a loan application
     * @param {string} applicationId - Loan application sys_id
     * @returns {Object} Result object with success flag and generated plans
     */
    generateRepaymentPlan(applicationId) {
        try {
            // Get application and customer data
            const appData = this.getApplicationData(applicationId);
            if (!appData.success) {
                return { success: false, error: appData.error };
            }

            // Call Gemini AI for intelligent analysis
            const aiAnalysis = this.callGeminiAI(appData.data);

            // Generate multiple repayment plans
            const plans = this.createRepaymentPlans(appData.data, aiAnalysis);
            
            // Save plans to database
            const savedPlans = this.savePlansToDatabase(plans, applicationId, appData.data.customer_id);

            // Log transaction
            this.logTransaction(applicationId, 'ai_plan_generated', 
                `Generated ${savedPlans.length} AI repayment plans`);

            return {
                success: true,
                planCount: savedPlans.length,
                plans: savedPlans,
                aiInsights: aiAnalysis.insights || 'AI analysis completed successfully'
            };

        } catch (error) {
            gs.error('AI Repayment Engine Error: ' + error.message);
            return { 
                success: false, 
                error: 'Failed to generate AI plans: ' + error.message 
            };
        }
    }

    /**
     * Get loan application and customer data
     */
    getApplicationData(applicationId) {
        const loanApp = new GlideRecord('x_1610509_intellil_loan_application');
        if (!loanApp.get(applicationId)) {
            return { success: false, error: 'Loan application not found' };
        }

        const customer = new GlideRecord('x_1610509_intellil_customer');
        if (!customer.get(loanApp.customer.toString())) {
            return { success: false, error: 'Customer record not found' };
        }

        return {
            success: true,
            data: {
                application_id: applicationId,
                customer_id: customer.sys_id.toString(),
                loan_amount: parseFloat(loanApp.loan_amount.toString()) || 0,
                loan_purpose: loanApp.loan_purpose.toString(),
                monthly_income: parseFloat(customer.monthly_income.toString()) || 0,
                salary_cycle: customer.salary_cycle.toString(),
                next_salary_date: customer.next_salary_date.toString(),
                job_title: customer.job_title.toString(),
                credit_score: parseFloat(customer.credit_score.toString()) || 600,
                existing_debt: parseFloat(customer.existing_debt.toString()) || 0,
                monthly_expenses: parseFloat(customer.monthly_expenses.toString()) || 0
            }
        };
    }

    /**
     * Call Gemini AI for intelligent loan analysis
     */
    callGeminiAI(customerData) {
        if (!this.geminiApiKey) {
            // Fallback to basic calculation if no API key
            return this.fallbackAnalysis(customerData);
        }

        try {
            const prompt = this.buildGeminiPrompt(customerData);
            
            const requestBody = {
                contents: [{
                    parts: [{
                        text: prompt
                    }]
                }],
                generationConfig: {
                    temperature: 0.3,
                    topK: 20,
                    topP: 0.8,
                    maxOutputTokens: 1000
                }
            };

            const response = new sn_ws.RESTMessageV2();
            response.setEndpoint(this.geminiEndpoint + '?key=' + this.geminiApiKey);
            response.setHttpMethod('POST');
            response.setRequestHeader('Content-Type', 'application/json');
            response.setRequestBody(JSON.stringify(requestBody));

            const httpResponse = response.execute();
            const responseBody = httpResponse.getBody();
            const geminiResponse = JSON.parse(responseBody);

            if (geminiResponse.candidates && geminiResponse.candidates[0]) {
                const aiText = geminiResponse.candidates[0].content.parts[0].text;
                return this.parseGeminiResponse(aiText);
            } else {
                gs.warn('Gemini AI: No valid response received');
                return this.fallbackAnalysis(customerData);
            }

        } catch (error) {
            gs.error('Gemini AI Error: ' + error.message);
            return this.fallbackAnalysis(customerData);
        }
    }

    /**
     * Build intelligent prompt for Gemini AI
     */
    buildGeminiPrompt(data) {
        return `
You are a senior financial analyst for a micro-loan company. Analyze this loan application and provide personalized repayment recommendations.

CUSTOMER PROFILE:
- Monthly Income: $${data.monthly_income}
- Salary Cycle: ${data.salary_cycle}
- Next Salary Date: ${data.next_salary_date}
- Job: ${data.job_title}
- Credit Score: ${data.credit_score}
- Existing Debt: $${data.existing_debt}
- Monthly Expenses: $${data.monthly_expenses}

LOAN REQUEST:
- Amount: $${data.loan_amount}
- Purpose: ${data.loan_purpose}

ANALYZE AND PROVIDE:
1. Risk Score (1-100, where 100 is highest risk)
2. Recommended number of installments (2-12 months)
3. Suggested interest rate (5%-25%)
4. Optimal payment schedule aligned with salary cycle
5. Key risk factors and mitigation strategies

FORMAT YOUR RESPONSE AS JSON:
{
  "riskScore": 45,
  "recommendedInstallments": 6,
  "interestRate": 15.5,
  "paymentFrequency": "monthly",
  "riskFactors": ["income to debt ratio", "loan purpose"],
  "insights": "Customer shows stable income...",
  "plans": [
    {
      "installments": 4,
      "monthlyPayment": 280,
      "recommendation": "aggressive",
      "pros": ["Quick payoff", "Lower total interest"],
      "cons": ["Higher monthly payment"]
    },
    {
      "installments": 6,
      "monthlyPayment": 195,
      "recommendation": "optimal",
      "pros": ["Balanced approach", "Manageable payments"],
      "cons": ["Moderate interest"]
    }
  ]
}`;
    }

    /**
     * Parse Gemini AI response
     */
    parseGeminiResponse(aiText) {
        try {
            // Extract JSON from AI response
            const jsonMatch = aiText.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                return JSON.parse(jsonMatch[0]);
            } else {
                throw new Error('No JSON found in AI response');
            }
        } catch (error) {
            gs.warn('Failed to parse AI response: ' + error.message);
            return this.fallbackAnalysis();
        }
    }

    /**
     * Fallback analysis when AI is unavailable
     */
    fallbackAnalysis(data) {
        const debtToIncomeRatio = (data.existing_debt + data.monthly_expenses) / data.monthly_income;
        const loanToIncomeRatio = data.loan_amount / data.monthly_income;
        
        let riskScore = 50;
        if (debtToIncomeRatio > 0.4) riskScore += 20;
        if (loanToIncomeRatio > 2) riskScore += 15;
        if (data.credit_score < 650) riskScore += 10;

        return {
            riskScore: Math.min(riskScore, 95),
            recommendedInstallments: Math.ceil(data.loan_amount / (data.monthly_income * 0.2)),
            interestRate: 15.0,
            paymentFrequency: data.salary_cycle,
            insights: 'Basic risk analysis completed using traditional financial metrics',
            plans: [
                {
                    installments: 4,
                    recommendation: 'aggressive',
                    pros: ['Quick payoff'],
                    cons: ['Higher payments']
                },
                {
                    installments: 6,
                    recommendation: 'balanced',
                    pros: ['Moderate payments'],
                    cons: ['More interest']
                }
            ]
        };
    }

    /**
     * Create repayment plans based on AI analysis
     */
    createRepaymentPlans(appData, aiAnalysis) {
        const baseAmount = appData.loan_amount;
        const interestRate = (aiAnalysis.interestRate || 15) / 100;
        
        const plans = [];
        
        // Plan 1: AI Recommended (Optimal)
        const optimalInstallments = aiAnalysis.recommendedInstallments || 6;
        const totalWithInterest = baseAmount * (1 + interestRate);
        const monthlyPayment = totalWithInterest / optimalInstallments;
        
        plans.push({
            installments: optimalInstallments,
            totalAmount: totalWithInterest,
            monthlyPayment: monthlyPayment,
            interestRate: aiAnalysis.interestRate || 15,
            riskScore: aiAnalysis.riskScore || 50,
            recommendationLevel: 'high',
            description: `AI Optimal Plan - ${optimalInstallments} monthly payments of $${monthlyPayment.toFixed(2)}`,
            reasoning: aiAnalysis.insights || 'Optimized based on your salary cycle and financial profile'
        });

        // Plan 2: Conservative (Longer term)
        const conservativeInstallments = Math.min(optimalInstallments + 2, 12);
        const conservativeTotal = baseAmount * (1 + (interestRate * 0.8));
        const conservativeMonthly = conservativeTotal / conservativeInstallments;
        
        plans.push({
            installments: conservativeInstallments,
            totalAmount: conservativeTotal,
            monthlyPayment: conservativeMonthly,
            interestRate: (aiAnalysis.interestRate || 15) * 0.8,
            riskScore: (aiAnalysis.riskScore || 50) - 10,
            recommendationLevel: 'medium',
            description: `Conservative Plan - ${conservativeInstallments} payments of $${conservativeMonthly.toFixed(2)}`,
            reasoning: 'Lower monthly payments for better cash flow management'
        });

        // Plan 3: Aggressive (Shorter term)
        if (optimalInstallments > 3) {
            const aggressiveInstallments = Math.max(optimalInstallments - 2, 2);
            const aggressiveTotal = baseAmount * (1 + (interestRate * 1.2));
            const aggressiveMonthly = aggressiveTotal / aggressiveInstallments;
            
            plans.push({
                installments: aggressiveInstallments,
                totalAmount: aggressiveTotal,
                monthlyPayment: aggressiveMonthly,
                interestRate: (aiAnalysis.interestRate || 15) * 1.2,
                riskScore: (aiAnalysis.riskScore || 50) + 15,
                recommendationLevel: 'low',
                description: `Fast Track Plan - ${aggressiveInstallments} payments of $${aggressiveMonthly.toFixed(2)}`,
                reasoning: 'Quick payoff but higher monthly commitment required'
            });
        }

        return plans;
    }

    /**
     * Save plans to database
     */
    savePlansToDatabase(plans, applicationId, customerId) {
        const savedPlans = [];

        plans.forEach((plan, index) => {
            // Create AI repayment plan record
            const planRecord = new GlideRecord('x_1610509_intellil_ai_repayment_plan');
            planRecord.initialize();
            planRecord.application = applicationId;
            planRecord.customer = customerId;
            planRecord.total_amount = plan.totalAmount;
            planRecord.installment_count = plan.installments;
            planRecord.ai_risk_score = plan.riskScore;
            planRecord.plan_description = plan.description;
            planRecord.ai_reasoning = plan.reasoning;
            planRecord.recommended_by_ai = plan.recommendationLevel;
            planRecord.status = 'generated';
            
            const planId = planRecord.insert();
            
            if (planId) {
                // Create schedule items
                this.createScheduleItems(planId, plan, customerId);
                savedPlans.push({
                    planId: planId,
                    installments: plan.installments,
                    monthlyPayment: plan.monthlyPayment,
                    totalAmount: plan.totalAmount
                });
            }
        });

        return savedPlans;
    }

    /**
     * Create detailed schedule items for a plan
     */
    createScheduleItems(planId, plan, customerId) {
        const startDate = new GlideDateTime();
        startDate.addMonthsLocalTime(1); // Start next month

        for (let i = 1; i <= plan.installments; i++) {
            const scheduleRecord = new GlideRecord('x_1610509_intellil_ai_repayment_schedule');
            scheduleRecord.initialize();
            scheduleRecord.plan = planId;
            scheduleRecord.customer = customerId;
            scheduleRecord.installment_number = i;
            scheduleRecord.due_date = new GlideDateTime(startDate);
            scheduleRecord.amount_due = plan.monthlyPayment;
            scheduleRecord.status = 'pending';
            scheduleRecord.ai_reasoning = `Payment ${i} of ${plan.installments} - Optimized for your ${plan.paymentFrequency || 'monthly'} salary cycle`;
            scheduleRecord.insert();

            // Move to next month
            startDate.addMonthsLocalTime(1);
        }
    }

    /**
     * Log transaction for audit trail
     */
    logTransaction(applicationId, type, remarks) {
        const transaction = new GlideRecord('x_1610509_intellil_loan_transaction');
        transaction.initialize();
        transaction.transaction_type = type;
        transaction.application = applicationId;
        transaction.user = gs.getUserID();
        transaction.remarks = remarks;
        transaction.ip_address = gs.getSession().getClientIP();
        transaction.insert();
    }

    /**
     * Calculate risk score using traditional metrics
     */
    calculateRiskScore(customerData) {
        let score = 50; // Base score

        // Income stability factor
        const monthlyIncome = customerData.monthly_income || 0;
        if (monthlyIncome < 1000) score += 20;
        else if (monthlyIncome < 2000) score += 10;
        else if (monthlyIncome > 5000) score -= 10;

        // Debt to income ratio
        const totalDebt = (customerData.existing_debt || 0) + (customerData.monthly_expenses || 0);
        const debtRatio = totalDebt / monthlyIncome;
        if (debtRatio > 0.5) score += 25;
        else if (debtRatio > 0.3) score += 15;
        else if (debtRatio < 0.2) score -= 10;

        // Loan amount vs income
        const loanRatio = customerData.loan_amount / monthlyIncome;
        if (loanRatio > 3) score += 20;
        else if (loanRatio > 2) score += 10;
        else if (loanRatio < 1) score -= 5;

        // Credit score impact
        const creditScore = customerData.credit_score || 600;
        if (creditScore < 600) score += 15;
        else if (creditScore < 700) score += 5;
        else if (creditScore > 750) score -= 10;

        return Math.max(10, Math.min(95, score));
    }

    /**
     * Get system configuration values
     */
    getSystemConfig() {
        return {
            defaultInterestRate: parseFloat(gs.getProperty('x_1610509_intellil.default_interest_rate', '0.15')),
            maxLoanAmount: parseFloat(gs.getProperty('x_1610509_intellil.max_loan_amount', '5000')),
            minLoanAmount: parseFloat(gs.getProperty('x_1610509_intellil.min_loan_amount', '100')),
            maxInstallments: parseInt(gs.getProperty('x_1610509_intellil.max_installments', '12')),
            lateFeePercentage: parseFloat(gs.getProperty('x_1610509_intellil.late_fee_percentage', '0.05'))
        };
    }
}