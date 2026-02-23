// Data Management using localStorage
const AppData = {
    // Initialize or get data from localStorage
    get(key) {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    },

    set(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    },

    // Users (photographers and regular users)
    getUsers() {
        return this.get('photographers') || [];
    },

    saveUser(user) {
        const users = this.getUsers();
        const existingIndex = users.findIndex(u => u.id === user.id);
        
        if (existingIndex >= 0) {
            users[existingIndex] = user;
        } else {
            user.id = Date.now().toString();
            user.createdAt = new Date().toISOString();
            users.push(user);
        }
        
        this.set('photographers', users);
        return user;
    },

    // Regular users
    getClients() {
        return this.get('clients') || [];
    },

    saveClient(client) {
        const clients = this.getClients();
        const existingIndex = clients.findIndex(c => c.id === client.id);
        
        if (existingIndex >= 0) {
            clients[existingIndex] = client;
        } else {
            client.id = Date.now().toString();
            client.createdAt = new Date().toISOString();
            clients.push(client);
        }
        
        this.set('clients', clients);
        return client;
    },

    // Bookings
    getBookings() {
        return this.get('bookings') || [];
    },

    saveBooking(booking) {
        const bookings = this.getBookings();
        booking.id = Date.now().toString();
        booking.createdAt = new Date().toISOString();
        booking.status = 'pending';
        bookings.push(booking);
        this.set('bookings', bookings);
        return booking;
    },

    updateBookingStatus(bookingId, status) {
        const bookings = this.getBookings();
        const index = bookings.findIndex(b => b.id === bookingId);
        if (index >= 0) {
            bookings[index].status = status;
            this.set('bookings', bookings);
        }
    },

    // Payments
    getPayments() {
        return this.get('payments') || [];
    },

    savePayment(payment) {
        const payments = this.getPayments();
        payment.id = Date.now().toString();
        payment.createdAt = new Date().toISOString();
        payments.push(payment);
        this.set('payments', payments);
        return payment;
    },

    // Current session
    setCurrentUser(user, role) {
        sessionStorage.setItem('currentUser', JSON.stringify(user));
        sessionStorage.setItem('userRole', role);
    },

    getCurrentUser() {
        const user = sessionStorage.getItem('currentUser');
        return user ? JSON.parse(user) : null;
    },

    getUserRole() {
        return sessionStorage.getItem('userRole');
    },

    logout() {
        sessionStorage.removeItem('currentUser');
        sessionStorage.removeItem('userRole');
    },

    // Search photographers
    searchPhotographers(filters) {
        const photographers = this.getUsers();
        
        return photographers.filter(p => {
            // Check if approved
            if (!p.isApproved) return false;

            // Category filter
            if (filters.category && filters.category !== 'all') {
                if (!p.categories || !p.categories.includes(filters.category)) {
                    return false;
                }
            }

            // Gender filter
            if (filters.gender && filters.gender !== 'all') {
                if (p.gender !== filters.gender) return false;
            }

            // Location filter
            if (filters.location && filters.location !== 'all') {
                if (p.location !== filters.location) return false;
            }

            // Age filter
            if (filters.ageRange) {
                const age = parseInt(p.age);
                const [min, max] = filters.ageRange.split('-').map(Number);
                if (age < min || age > max) return false;
            }

            // Search by name
            if (filters.search) {
                const searchLower = filters.search.toLowerCase();
                const nameMatch = p.fullName?.toLowerCase().includes(searchLower);
                const bioMatch = p.bio?.toLowerCase().includes(searchLower);
                const skillMatch = p.skills?.some(s => s.toLowerCase().includes(searchLower));
                if (!nameMatch && !bioMatch && !skillMatch) return false;
            }

            return true;
        });
    },

    // Get statistics for admin
    getStatistics() {
        const photographers = this.getUsers();
        const clients = this.getClients();
        const bookings = this.getBookings();
        
        return {
            totalPhotographers: photographers.length,
            approvedPhotographers: photographers.filter(p => p.isApproved).length,
            pendingPhotographers: photographers.filter(p => !p.isApproved).length,
            totalClients: clients.length,
            totalBookings: bookings.length,
            pendingBookings: bookings.filter(b => b.status === 'pending').length,
            completedBookings: bookings.filter(b => b.status === 'completed').length,
            totalRevenue: this.getPayments().reduce((sum, p) => sum + (p.amount || 0), 0)
        };
    },

    // Initialize with sample data if empty
    initializeSampleData() {
        if (this.getUsers().length === 0) {
            const samplePhotographers = [
                {
                    id: '1',
                    fullName: 'John Kamau',
                    phone: '+254712345678',
                    email: 'john@example.com',
                    age: '28',
                    gender: 'male',
                    location: 'Nairobi',
                    bio: 'Professional photographer with 5 years experience in weddings and events.',
                    skills: ['Wedding', 'Events', 'Portrait'],
                    categories: ['Wedding', 'Family Portrait', 'Event Coverage'],
                    isApproved: true,
                    registrationPaid: true,
                    createdAt: new Date().toISOString()
                },
                {
                    id: '2',
                    fullName: 'Sarah Wanjiku',
                    phone: '+254723456789',
                    email: 'sarah@example.com',
                    age: '25',
                    gender: 'female',
                    location: 'Mombasa',
                    bio: 'Specializing in fashion and music videos. Creative and passionate.',
                    skills: ['Fashion', 'Music Video', 'Portrait'],
                    categories: ['Music Video', 'Fashion/Portrait', 'Product Photography'],
                    isApproved: true,
                    registrationPaid: true,
                    createdAt: new Date().toISOString()
                },
                {
                    id: '3',
                    fullName: 'David Ochieng',
                    phone: '+254734567890',
                    email: 'david@example.com',
                    age: '32',
                    gender: 'male',
                    location: 'Kisumu',
                    bio: 'Expert in real estate and home tours. High-quality equipment.',
                    skills: ['Real Estate', 'Home Tour', 'Product'],
                    categories: ['Home Tour', 'Product Photography', 'Event Coverage'],
                    isApproved: true,
                    registrationPaid: true,
                    createdAt: new Date().toISOString()
                }
            ];
            
            this.set('photographers', samplePhotographers);
        }
    }
};

// Service Categories
const SERVICE_CATEGORIES = [
    { id: 'music-video', name: 'Music Video', icon: '🎵' },
    { id: 'home-tour', name: 'Home Tour', icon: '🏠' },
    { id: 'family-portrait', name: 'Family Portrait', icon: '👨‍👩‍👧' },
    { id: 'private', name: 'Private Videos/Photos', icon: '🔒' },
    { id: 'wedding', name: 'Wedding', icon: '💒' },
    { id: 'product', name: 'Product Photography', icon: '📦' },
    { id: 'event', name: 'Event Coverage', icon: '🎉' },
    { id: 'fashion', name: 'Fashion/Portrait', icon: '👗' }
];

// Service Bundles
const SERVICE_BUNDLES = [
    {
        id: 'basic',
        name: 'Basic Package',
        price: 1500,
        description: '1 hour session',
        features: ['1 Hour Session', '10 Edited Photos', 'Online Gallery']
    },
    {
        id: 'standard',
        name: 'Standard Package',
        price: 3500,
        description: '2 hours session',
        features: ['2 Hour Session', '25 Edited Photos', '1 Short Video', 'Online Gallery']
    },
    {
        id: 'premium',
        name: 'Premium Package',
        price: 7000,
        description: '4 hours session',
        features: ['4 Hour Session', '50 Edited Photos', '3 Videos', 'Professional Editing', 'Online Gallery']
    }
];

// Locations
const LOCATIONS = ['Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret', 'Thika', 'Other'];

// Export for use in other files
window.AppData = AppData;
window.SERVICE_CATEGORIES = SERVICE_CATEGORIES;
window.SERVICE_BUNDLES = SERVICE_BUNDLES;
window.LOCATIONS = LOCATIONS;
