export class CustomerService {
    constructor() {
        this.tableName = "x_1610509_intellil_customer";
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
                throw new Error(`HTTP ${response.status}: ${errorData.error?.message || 'Failed to fetch customers'}`);
            }

            const { result } = await response.json();
            return result || [];
        } catch (error) {
            console.error('Error fetching customers:', error);
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
                throw new Error(`HTTP ${response.status}: ${errorData.error?.message || 'Failed to create customer'}`);
            }

            return response.json();
        } catch (error) {
            console.error('Error creating customer:', error);
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
                throw new Error(`HTTP ${response.status}: ${errorData.error?.message || 'Failed to update customer'}`);
            }

            return response.json();
        } catch (error) {
            console.error('Error updating customer:', error);
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
                throw new Error(`HTTP ${response.status}: ${errorData.error?.message || 'Failed to delete customer'}`);
            }

            return response.ok;
        } catch (error) {
            console.error('Error deleting customer:', error);
            throw error;
        }
    }

    async getById(sysId) {
        try {
            const response = await fetch(`/api/now/table/${this.tableName}/${sysId}?sysparm_display_value=all`, {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "X-UserToken": window.g_ck
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`HTTP ${response.status}: ${errorData.error?.message || 'Failed to fetch customer'}`);
            }

            const { result } = await response.json();
            return result;
        } catch (error) {
            console.error('Error fetching customer by ID:', error);
            throw error;
        }
    }
}