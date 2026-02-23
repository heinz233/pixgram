 # Pixgram - Photography Service Platform

<p align="center">
  <img src="https://img.shields.io/badge/Version-1.0.0-blue" alt="Version">
  <img src="https://img.shields.io/badge/Creator-HEINZ%20ATENG'-orange" alt="Creator">
  <img src="https://img.shields.io/badge/License-MIT-green" alt="License">
</p>

## About Pixgram

Pixgram is a comprehensive photography service platform that connects professional photographers and videographers with clients looking for quality photography services. The platform simplifies the process of finding, booking, and paying for photographers while providing photographers with an easy way to register and manage their services.

## Creator

**HEINZ ATENG'** - Founder and Developer

## Features

### For Photographers/Videographers
- ✅ Register and create professional profiles
- ✅ Pay registration fee of KES 300 via M-Pesa
- ✅ Set their categories and specializations
- ✅ Manage profile information (bio, skills, location, age, gender)
- ✅ Receive and manage booking requests from clients
- ✅ View booking statistics and earnings

### For Users/Clients
- ✅ Search photographers by multiple criteria
- ✅ Filter by category (Music Video, Home Tour, Family Portrait, etc.)
- ✅ Filter by location (Nairobi, Mombasa, Kisumu, etc.)
- ✅ Filter by gender preference
- ✅ Filter by age range
- ✅ View photographer profiles with bio and skills
- ✅ Book services with different pricing packages
- ✅ Pay via M-Pesa simulation
- ✅ Track booking status

### Service Categories
1. 🎵 Music Video
2. 🏠 Home Tour
3. 👨‍👩‍👧 Family Portrait
4. 🔒 Private Videos/Photos
5. 💒 Wedding
6. 📦 Product Photography
7. 🎉 Event Coverage
8. 👗 Fashion/Portrait

### Service Bundles & Pricing

| Package | Price | Features |
|---------|-------|----------|
| **Basic** | KES 1,500 | 1 Hour Session, 10 Edited Photos, Online Gallery |
| **Standard** | KES 3,500 | 2 Hour Session, 25 Edited Photos, 1 Short Video, Online Gallery |
| **Premium** | KES 7,000 | 4 Hour Session, 50 Edited Photos, 3 Videos, Professional Editing, Online Gallery |

### For Admin
- ✅ View all registered photographers
- ✅ Approve/reject photographer registrations
- ✅ View all bookings across the platform
- ✅ Dashboard with statistics (total photographers, bookings, revenue)

## User Roles

### 1. Admin
- Login: `admin@system.com` / `admin123`
- Access to all platform data and management features

### 2. Photographer
- Registration with M-Pesa payment (KES 300)
- Profile management and booking handling

### 3. User/Client
- Search and filter photographers
- Book services and make payments
- Track booking history

## Technology Stack

- **Frontend:** HTML5, CSS3, JavaScript
- **Storage:** localStorage (browser-based data persistence)
- **Payment:** M-Pesa Simulation
- **No backend required** - Fully functional frontend application

## How to Use

### Installation
1. Simply download all files to a folder
2. Open `index.html` in any modern web browser
3. No server or installation required

### Getting Started as a Photographer
1. Click "Become a Photographer"
2. Fill in your profile details (name, phone, email, age, gender, location)
3. Select your categories and add your skills/bio
4. Pay KES 300 registration fee via M-Pesa
5. Start receiving booking requests!

### Getting Started as a User
1. Click "Get Started" or "Find Photographer"
2. Search and filter photographers based on your needs
3. View photographer profiles
4. Select a service package
5. Book and pay via M-Pesa
6. Track your booking status

## File Structure

```
Pixgram/
├── index.html                 # Main landing page
├── user-dashboard.html        # User search and booking
├── photographer-register.html # Photographer registration
├── photographer-dashboard.html # Photographer management
├── admin-dashboard.html       # Admin panel
├── styles.css                # Global styles
├── app.js                    # Main application logic
├── data.js                   # Data management
├── payment.js                # M-Pesa payment simulation
├── PLAN.md                   # Project plan
└── README.md                 # This file
```

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Notes

- This is a frontend demonstration using localStorage for data persistence
- All data is stored in the browser's localStorage
- M-Pesa payments are simulated for demonstration purposes
- In a production environment, you would need:
  - A backend server (Node.js, Python, PHP, etc.)
  - Real M-Pesa integration with Safaricom API
  - User authentication system
  - Database (MySQL, PostgreSQL, MongoDB, etc.)

## License

MIT License

---

**© 2024 Pixgram. Created by HEINZ ATENG'. All rights reserved.**
