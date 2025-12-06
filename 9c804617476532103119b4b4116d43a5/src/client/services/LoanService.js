export class LoanService {
    constructor() {
        this.tableName = "x_1610509_intellil_loan_application";
    }

    async list(filters = {}) {
        try {
            const searchParams = new URLSearchParams(filters);
            searchParams.set('sysparm_display_value', 'all');
            const response = await fetch(`/api/now/table/${this.tableName}?${searchParams.toString()}`, {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "X-UserToken": window.g_ck
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`HTTP ${response.status}: ${errorData.error?.message || 'Failed to fetch loan applications'}`);
            }

            const { result } = await response.json();
            return result || [];
        } catch (error) {
            console.error('Error fetching loan applications:', error);
            throw error;
        }
    }

    async create(data) {
        try {
            const response = await fetch(`/api/now/table/${this.tableName}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "X-UserToken": window.g_ck
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`HTTP ${response.status}: ${errorData.error?.message || 'Failed to create loan application'}`);
            }

            return response.json();
        } catch (error) {
            console.error('Error creating loan application:', error);
            throw error;
        }
    }

    async update(sysId, data) {
        try {
            const response = await fetch(`/api/now/table/${this.tableName}/${sysId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "X-UserToken": window.g_ck
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`HTTP ${response.status}: ${errorData.error?.message || 'Failed to update loan application'}`);
            }

            return response.json();
        } catch (error) {
            console.error('Error updating loan application:', error);
            throw error;
        }
    }

    async delete(sysId) {
        try {
            const response = await fetch(`/api/now/table/${this.tableName}/${sysId}`, {
                method: "DELETE",
                headers: {
                    "Accept": "application/json",
                    "X-UserToken": window.g_ck
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`HTTP ${response.status}: ${errorData.error?.message || 'Failed to delete loan application'}`);
            }

            return response.ok;
        } catch (error) {
            console.error('Error deleting loan application:', error);
            throw error;
        }
    }

    async generateAIPlan(applicationId) {
        try {
            // Call the AI generation endpoint
            const response = await fetch(`/api/x_1610509_intellil/ai_plan_generator`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "X-UserToken": window.g_ck
                },
                body: JSON.stringify({ application_id: applicationId }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`HTTP ${response.status}: ${errorData.error?.message || 'Failed to generate AI plan'}`);
            }

            return response.json();
        } catch (error) {
            console.error('Error generating AI plan:', error);
            throw error;
        }
    }

    async getRecentTransactions() {
        try {
            const searchParams = new URLSearchParams({
                'sysparm_display_value': 'all',
                'sysparm_limit': '20',
                'sysparm_order': 'DESC'
            });

            const response = await fetch(`/api/now/table/x_1610509_intellil_loan_transaction?${searchParams.toString()}`, {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "X-UserToken": window.g_ck
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`HTTP ${response.status}: ${errorData.error?.message || 'Failed to fetch transactions'}`);
            }

            const { result } = await response.json();
            return result || [];
        } catch (error) {
            console.error('Error fetching transactions:', error);
            return []; // Return empty array on error for dashboard
        }
    }

    async getAIPlans(applicationId = null) {
        try {
            const searchParams = new URLSearchParams({
                'sysparm_display_value': 'all'
            });

            if (applicationId) {
                searchParams.set('sysparm_query', `application=${applicationId}`);
            }

            const response = await fetch(`/api/now/table/x_1610509_intellil_ai_repayment_plan?${searchParams.toString()}`, {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "X-UserToken": window.g_ck
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`HTTP ${response.status}: ${errorData.error?.message || 'Failed to fetch AI plans'}`);
            }

            const { result } = await response.json();
            return result || [];
        } catch (error) {
            console.error('Error fetching AI plans:', error);
            throw error;
        }
    }

    async acceptAIPlan(planId) {
        try {
            const response = await fetch(`/api/now/table/x_1610509_intellil_ai_repayment_plan/${planId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "X-UserToken": window.g_ck
                },
                body: JSON.stringify({ status: 'accepted' }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`HTTP ${response.status}: ${errorData.error?.message || 'Failed to accept AI plan'}`);
            }

            return response.json();
        } catch (error) {
            console.error('Error accepting AI plan:', error);
            throw error;
        }
    }
}