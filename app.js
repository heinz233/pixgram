// Main Application Logic
const App = {
    // Initialize application
    init() {
        // Initialize sample data
        AppData.initializeSampleData();
        
        // Check authentication
        this.checkAuth();
        
        // Setup navigation
        this.setupNavigation();
        
        // Setup role-based UI
        this.setupRoleUI();
    },

    // Check authentication status
    checkAuth() {
        const currentUser = AppData.getCurrentUser();
        const userRole = AppData.getUserRole();
        
        if (currentUser) {
            this.updateAuthUI(true, userRole);
        } else {
            this.updateAuthUI(false);
        }
    },

    // Update authentication UI
    updateAuthUI(isLoggedIn, role = null) {
        const loginLink = document.getElementById('loginLink');
        const signupLink = document.getElementById('signupLink');
        const dashboardLink = document.getElementById('dashboardLink');
        const logoutLink = document.getElementById('logoutLink');
        
        if (isLoggedIn) {
            if (loginLink) loginLink.style.display = 'none';
            if (signupLink) signupLink.style.display = 'none';
            if (dashboardLink) {
                dashboardLink.style.display = 'block';
                dashboardLink.href = this.getDashboardUrl(role);
            }
            if (logoutLink) logoutLink.style.display = 'block';
        } else {
            if (loginLink) loginLink.style.display = 'block';
            if (signupLink) signupLink.style.display = 'block';
            if (dashboardLink) dashboardLink.style.display = 'none';
            if (logoutLink) logoutLink.style.display = 'none';
        }
    },

    // Get dashboard URL based on role
    getDashboardUrl(role) {
        switch(role) {
            case 'admin': return 'admin-dashboard.html';
            case 'photographer': return 'photographer-dashboard.html';
            case 'user': return 'user-dashboard.html';
            default: return 'index.html';
        }
    },

    // Setup navigation
    setupNavigation() {
        // Handle navigation links
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('nav-link')) {
                e.preventDefault();
                const href = e.target.getAttribute('href');
                if (href && href.endsWith('.html')) {
                    window.location.href = href;
                }
            }
        });
    },

    // Setup role-based UI
    setupRoleUI() {
        const userRole = AppData.getUserRole();
        const roleElements = document.querySelectorAll('[data-role]');
        
        roleElements.forEach(el => {
            const roles = el.dataset.role.split(',');
            if (userRole && roles.includes(userRole)) {
                el.style.display = '';
            } else if (!userRole) {
                el.style.display = '';
            } else {
                el.style.display = 'none';
            }
        });
    },

    // Login
    login(email, password, role) {
        let user = null;
        
        if (role === 'photographer') {
            const photographers = AppData.getUsers();
            user = photographers.find(p => p.email === email);
        } else if (role === 'user') {
            const clients = AppData.getClients();
            user = clients.find(c => c.email === email);
        } else if (role === 'admin') {
            // Admin login (simplified)
            if (email === 'admin@system.com' && password === 'admin123') {
                user = {
                    id: 'admin',
                    fullName: 'System Admin',
                    email: 'admin@system.com',
                    role: 'admin'
                };
            }
        }
        
        if (user) {
            AppData.setCurrentUser(user, role);
            this.checkAuth();
            window.location.href = this.getDashboardUrl(role);
            return { success: true };
        }
        
        return { success: false, message: 'Invalid credentials' };
    },

    // Register Photographer
    registerPhotographer(data, paymentSuccess) {
        const photographer = {
            ...data,
            isApproved: paymentSuccess, // Approve after payment
            registrationPaid: paymentSuccess
        };
        
        const saved = AppData.saveUser(photographer);
        
        if (paymentSuccess) {
            AppData.setCurrentUser(saved, 'photographer');
        }
        
        return saved;
    },

    // Register Client
    registerClient(data) {
        const client = {
            ...data,
            role: 'user'
        };
        
        const saved = AppData.saveClient(client);
        AppData.setCurrentUser(saved, 'user');
        
        return saved;
    },

    // Logout
    logout() {
        AppData.logout();
        window.location.href = 'index.html';
    },

    // Format currency
    formatCurrency(amount) {
        return 'KES ' + amount.toLocaleString();
    },

    // Show notification
    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <span>${message}</span>
            <button onclick="this.parentElement.remove()">&times;</button>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            background: ${type === 'success' ? '#4CAF50' : '#f44336'};
            color: white;
            border-radius: 10px;
            display: flex;
            align-items: center;
            gap: 10px;
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.remove();
        }, 5000);
    },

    // Validate phone number
    validatePhone(phone) {
        const phoneRegex = /^254\d{9}$/;
        return phoneRegex.test(phone.replace(/\s/g, ''));
    }
};

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});

// Make App globally available
window.App = App;
