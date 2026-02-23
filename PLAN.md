# Pixgram - Photography Service Platform

## Project Overview
A platform connecting photographers/videographers with clients. Features:
- **3 User Roles**: Admin, Photographers, Users
- **Photographer Registration**: Pay 300 KES via M-Pesa simulation
- **Search & Filter**: By category, gender, age, location
- **Service Bundles**: Different pricing for different services

## User Roles

### 1. Photographers
- Register with profile (name, phone, location, age, gender, bio, skills)
- Pay 300 KES registration fee (M-Pesa simulation)
- List their services and categories
- Receive booking requests from users

### 2. Users (Clients)
- Search photographers by category, gender, age, location
- View photographer profiles
- Book services with different bundles
- Pay for services (M-Pesa simulation)

### 3. Admin
- Manage all photographers
- View all bookings
- Dashboard with statistics

## Service Categories
1. Music Video
2. Home Tour
3. Family Portrait
4. Private Videos/Photos
5. Wedding
6. Product Photography
7. Event Coverage
8. Fashion/Portrait

## Service Bundles (Pricing)
- Basic: 1,500 KES (1 hour, 10 photos)
- Standard: 3,500 KES (2 hours, 25 photos, 1 video)
- Premium: 7,000 KES (4 hours, 50 photos, 3 videos, editing)

## Files to Create

### HTML Files
1. `index.html` - Login/Registration hub
2. `admin-dashboard.html` - Admin panel
3. `photographer-register.html` - Photographer registration with payment
4. `photographer-dashboard.html` - Photographer profile management
5. `user-dashboard.html` - User search and booking
6. `search-results.html` - Search results page
7. `booking.html` - Booking and payment page

### CSS Files
1. `styles.css` - Global styles
2. `admin.css` - Admin dashboard styles
3. `dashboard.css` - Dashboard styles

### JavaScript Files
1. `app.js` - Main application logic
2. `data.js` - Mock data and localStorage management
3. `payment.js` - M-Pesa payment simulation

## Implementation Order
1. Create data.js with localStorage management
2. Update index.html with role-based login
3. Create photographer registration with payment
4. Create user dashboard with search/filter
5. Create admin dashboard
6. Add payment simulation
7. Connect all pages with navigation
