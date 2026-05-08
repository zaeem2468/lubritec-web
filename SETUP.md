# Setup Guide

Complete setup instructions for the Route 64 Lubricants platform.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Initial Setup](#initial-setup)
- [Firebase Configuration](#firebase-configuration)
- [Local Development](#local-development)
- [Environment Variables](#environment-variables)
- [Testing](#testing)
- [Troubleshooting](#troubleshooting)

## Prerequisites

### Required Software
- **Git**: For version control
- **Node.js** (v14+): For package management and local server
- **Modern Web Browser**: Chrome, Firefox, Safari, or Edge
- **Code Editor**: VS Code, Sublime Text, or similar

### Required Accounts
- **Firebase Account**: Free tier is sufficient
- **GitHub Account** (optional): For version control

## Initial Setup

### 1. Clone the Repository

```bash
# Clone the repository
git clone <repository-url>
cd lubritec-web
```

### 2. Install Dependencies

```bash
# Install Firebase CLI (optional, for deployment)
npm install -g firebase-tools

# Install local server (optional)
npm install -g http-server
```

### 3. Verify Installation

```bash
# Check Node.js version
node --version

# Check npm version
npm --version

# Check Firebase CLI
firebase --version
```

## Firebase Configuration

### Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click "Add project"
3. Enter project name (e.g., "route64-lubricants")
4. Follow the setup wizard
5. Wait for project creation to complete

### Step 2: Enable Authentication

1. Navigate to **Build > Authentication**
2. Click **Get Started**
3. Select **Email/Password** sign-in method
4. Enable it and click **Save**

### Step 3: Create Firestore Database

1. Navigate to **Build > Firestore Database**
2. Click **Create Database**
3. Choose a location (closest to your users)
4. Select **Start in Test Mode** (for development)
5. Click **Enable**

### Step 4: Get Firebase Configuration

1. Navigate to **Project Settings** (gear icon)
2. Scroll to **Your apps** section
3. Click **Web app** (</> icon)
4. Register the app
5. Copy the configuration object

### Step 5: Update Project Configuration

Replace the Firebase config in `index.html`:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.firebasestorage.app",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
};
```

### Step 6: Configure Admin Emails

Update the `ADMIN_EMAILS` array in `index.html`:

```javascript
const ADMIN_EMAILS = [
  'admin@route64.co.za',
  'another-admin@route64.co.za'
];
```

### Step 7: Set Up Firestore Security Rules

For development, use test mode. For production, create proper rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## Local Development

### Option 1: Python Simple HTTP Server

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

### Option 2: Node.js HTTP Server

```bash
# Install http-server globally
npm install -g http-server

# Start server
http-server -p 8000

# With CORS enabled
http-server -p 8000 --cors
```

### Option 3: PHP Built-in Server

```bash
php -S localhost:8000
```

### Option 4: VS Code Live Server

1. Install "Live Server" extension
2. Right-click on `index.html`
3. Select "Open with Live Server"

### Access the Application

Open your browser and navigate to:
```
http://localhost:8000
```

## Environment Variables

While this project doesn't use traditional environment variables, you may want to create a configuration file for different environments:

### Development Config

Create `config.dev.js`:
```javascript
const firebaseConfig = {
  apiKey: "DEV_API_KEY",
  authDomain: "dev-project.firebaseapp.com",
  projectId: "dev-project",
  // ... other config
};
```

### Production Config

Create `config.prod.js`:
```javascript
const firebaseConfig = {
  apiKey: "PROD_API_KEY",
  authDomain: "prod-project.firebaseapp.com",
  projectId: "prod-project",
  // ... other config
};
```

## Testing

### Manual Testing Checklist

#### Authentication
- [ ] User can register with email/password
- [ ] User can login with valid credentials
- [ ] User can logout successfully
- [ ] Invalid credentials show error message
- [ ] Admin users see admin interface

#### Product Catalog
- [ ] Products load correctly
- [ ] Search functionality works
- [ ] Filter by category works
- [ ] Product details display correctly
- [ ] Images load properly

#### Shopping Cart
- [ ] Items can be added to cart
- [ ] Cart persists across page refreshes
- [ ] Quantities can be updated
- [ ] Items can be removed
- [ ] Total calculates correctly

#### Order Management
- [ ] Orders can be placed
- [ ] Order history displays
- [ ] Order status updates
- [ ] Admin can view all orders
- [ ] Admin can update order status

#### Analytics
- [ ] Dashboard loads for admin
- [ ] Metrics display correctly
- [ ] Charts render properly
- [ ] Data updates in real-time

### Browser Testing

Test in multiple browsers:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile browsers

## Troubleshooting

### Firebase Authentication Issues

**Problem**: Users cannot login
- **Solution**: 
  - Check Firebase Auth is enabled
  - Verify email/password provider is active
  - Check browser console for errors
  - Ensure Firebase config is correct

### Firestore Connection Issues

**Problem**: Data not loading from database
- **Solution**:
  - Verify Firestore is enabled
  - Check security rules
  - Ensure database is not empty
  - Check network connectivity

### Cart Not Persisting

**Problem**: Cart items disappear on refresh
- **Solution**:
  - Check browser local storage is enabled
  - Verify cookies are allowed
  - Clear browser cache
  - Check for JavaScript errors

### Images Not Loading

**Problem**: Product images show broken links
- **Solution**:
  - Verify image paths in `data.js`
  - Check image files exist in correct locations
  - Ensure image formats are supported
  - Check file permissions

### Mobile Responsiveness Issues

**Problem**: Layout breaks on mobile devices
- **Solution**:
  - Test on actual mobile devices
  - Check viewport meta tag
  - Verify Tailwind CSS is loading
  - Test with browser dev tools mobile view

### Admin Access Not Working

**Problem**: Admin users don't see admin interface
- **Solution**:
  - Verify email is in `ADMIN_EMAILS` array
  - Check email case sensitivity
  - Ensure user is authenticated
  - Refresh page after login

## Next Steps

After completing setup:

1. **Add Products**: Populate `data.js` with your product catalog
2. **Configure Branding**: Update logos, colors, and company information
3. **Test Thoroughly**: Complete the testing checklist
4. **Set Up Analytics**: Configure Firebase Analytics
5. **Deploy**: Follow the deployment guide

## Additional Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [jsPDF Documentation](https://github.com/parallax/jsPDF)
- [MDN Web Docs](https://developer.mozilla.org/)

## Support

If you encounter issues not covered here:
- Check the main README.md
- Review Firebase console logs
- Search existing GitHub issues
- Contact support at info@route64.co.za