# Quick Start Guide

Get up and running with Route 64 Lubricants in 5 minutes.

## Prerequisites

- Modern web browser
- Firebase account (free)
- Basic computer skills

## Step 1: Get the Code

```bash
# Clone or download the project
# If you have git:
git clone <repository-url>
cd lubritec-web

# Or download and extract the ZIP file
```

## Step 2: Set Up Firebase

1. **Create Firebase Project**
   - Go to [console.firebase.google.com](https://console.firebase.google.com)
   - Click "Add project"
   - Name your project
   - Click "Create project"

2. **Enable Authentication**
   - Go to "Build" > "Authentication"
   - Click "Get Started"
   - Enable "Email/Password"
   - Click "Save"

3. **Create Database**
   - Go to "Build" > "Firestore Database"
   - Click "Create Database"
   - Select "Start in Test Mode"
   - Click "Enable"

4. **Get Configuration**
   - Go to "Project Settings" (gear icon)
   - Scroll to "Your apps"
   - Click "Web app" (</>)
   - Copy the configuration

## Step 3: Configure the App

Open `index.html` and replace the Firebase config:

```javascript
// Find this section (around line 18)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.firebasestorage.app",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
};

// Replace with your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDOYTDHe-Iq8lSjqRwpUUxzYLuXp3UEazQ",
  authDomain: "route64-web.firebaseapp.com",
  projectId: "route64-web",
  // ... rest of your config
};
```

## Step 4: Set Up Admin Access

Update the admin emails in `index.html`:

```javascript
// Find this line (around line 20)
const ADMIN_EMAILS = ['info@route64.co.za', 'riaaz@route64.co.za', 'ziemie786@gmail.com'];

// Replace with your admin emails
const ADMIN_EMAILS = ['your-email@example.com', 'another-admin@example.com'];
```

## Step 5: Run the App

### Option A: Python (Recommended)

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

### Option B: Node.js

```bash
# Install http-server
npm install -g http-server

# Run server
http-server -p 8000
```

### Option C: PHP

```bash
php -S localhost:8000
```

### Option D: VS Code

1. Install "Live Server" extension
2. Right-click on `index.html`
3. Select "Open with Live Server"

## Step 6: Access the App

Open your browser and go to:
```
http://localhost:8000
```

## Step 7: Test the App

### Test Authentication

1. Click "Client Login"
2. Click "Create Account"
3. Enter email and password
4. Click "Sign Up"
5. Verify you can login

### Test Shopping Cart

1. Browse products
2. Add items to cart
3. Check cart persists after refresh
4. Try updating quantities

### Test Admin Features

1. Logout
2. Login with admin email
3. Verify admin dashboard appears
4. Check analytics and order management

## Common Issues

### Firebase Connection Error

**Problem**: "Firebase: Error (auth/configuration-not-found)"

**Solution**:
- Verify Firebase config is correct
- Check Firebase project is active
- Ensure Authentication is enabled

### Cart Not Working

**Problem**: Cart items disappear on refresh

**Solution**:
- Check browser allows local storage
- Enable cookies in browser settings
- Try incognito mode to test

### Images Not Loading

**Problem**: Product images show broken links

**Solution**:
- Verify image files exist
- Check image paths in `data.js`
- Ensure images are in correct folder

### Admin Access Not Working

**Problem**: Admin doesn't see admin interface

**Solution**:
- Verify email is in `ADMIN_EMAILS` array
- Check email case sensitivity
- Refresh page after login

## Next Steps

After getting started:

1. **Add Your Products**
   - Edit `data.js`
   - Add your product catalog
   - Update images

2. **Customize Branding**
   - Update company name
   - Replace logo images
   - Modify colors

3. **Deploy to Production**
   - Follow [Deployment Guide](DEPLOYMENT.md)
   - Set up custom domain
   - Configure SSL

4. **Explore Features**
   - Read [API Documentation](API.md)
   - Check [Contributing Guide](CONTRIBUTING.md)
   - Review [Changelog](CHANGELOG.md)

## Need Help?

### Quick Resources

- **Full Documentation**: [README.md](README.md)
- **Setup Guide**: [SETUP.md](SETUP.md)
- **API Reference**: [API.md](API.md)
- **Deployment**: [DEPLOYMENT.md](DEPLOYMENT.md)

### Get Support

- **Email**: info@route64.co.za
- **GitHub Issues**: Check existing issues
- **Documentation**: Review all docs

## Tips for Success

1. **Start Small**
   - Test basic features first
   - Add products gradually
   - Test thoroughly

2. **Use Test Data**
   - Start with sample products
   - Test with test accounts
   - Verify all features work

3. **Backup Regularly**
   - Keep copies of config files
   - Document your changes
   - Use version control

4. **Monitor Performance**
   - Check loading times
   - Test on mobile devices
   - Optimize images

## Keyboard Shortcuts

### Browser DevTools

- **Windows/Linux**: `F12` or `Ctrl+Shift+I`
- **Mac**: `Cmd+Option+I`

### Common DevTools Tasks

- **Console**: View errors and logs
- **Network**: Monitor API calls
- **Elements**: Inspect HTML/CSS
- **Sources**: Debug JavaScript
- **Application**: View local storage

## Browser Compatibility

### Recommended Browsers

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)

### Mobile Browsers

- ✅ Chrome Mobile
- ✅ Safari Mobile
- ✅ Firefox Mobile
- ✅ Samsung Internet

### Unsupported Browsers

- ❌ Internet Explorer
- ⚠️ Older browser versions (may have issues)

## Performance Tips

1. **Optimize Images**
   - Compress images before adding
   - Use appropriate formats (WebP, JPEG)
   - Implement lazy loading

2. **Minimize Requests**
   - Combine CSS/JS files
   - Use CDN for libraries
   - Enable caching

3. **Monitor Performance**
   - Use Lighthouse for audits
   - Check loading times
   - Test on slow connections

## Security Best Practices

1. **Firebase Security**
   - Set up proper security rules
   - Enable authentication
   - Validate user input

2. **Data Protection**
   - Don't expose sensitive data
   - Use HTTPS in production
   - Implement proper error handling

3. **User Privacy**
   - Comply with privacy laws
   - Provide privacy policy
   - Handle user data responsibly

## Troubleshooting Checklist

Before asking for help, check:

- [ ] Browser console for errors
- [ ] Network tab for failed requests
- [ ] Firebase console for issues
- [ ] Local storage is enabled
- [ ] Cookies are allowed
- [ ] JavaScript is enabled
- [ ] Using supported browser
- [ ] Internet connection is stable
- [ ] Firebase config is correct
- [ ] Admin emails are set correctly

## Quick Reference

### File Structure

```
lubritec-web/
├── index.html          # Main page
├── dashboard.html      # Customer dashboard
├── analytics.html      # Admin analytics
├── catalog.html        # Product catalog
├── orders.html         # Order management
├── product.html        # Product details
├── data.js            # Products and cart logic
├── styles.css         # Custom styles
└── docs/              # Documentation files
```

### Key Functions

```javascript
// Cart operations
addToQuote(product, variant, quantity)
updateCartUI()
saveCart()

// Navigation
navigate(page)
showPage(pageId)

// Firebase operations
signInWithEmailAndPassword(auth, email, password)
createUserWithEmailAndPassword(auth, email, password)
addDoc(collection(db, 'orders'), data)
```

### Common Tasks

```javascript
// Add new product
const newProduct = {
  id: 'unique-id',
  name: 'Product Name',
  category: 'Category',
  img: 'image.jpg',
  desc: 'Description',
  variants: [
    { size: '500ML', price: 20 }
  ]
};
products.push(newProduct);

// Update admin emails
const ADMIN_EMAILS = ['admin@example.com'];

// Check if user is admin
if (window.isAdmin) {
  // Show admin features
}
```

## Success Criteria

You're successfully set up when:

- ✅ App loads in browser
- ✅ Can register and login
- ✅ Products display correctly
- ✅ Cart functionality works
- ✅ Can place orders
- ✅ Admin can access dashboard
- ✅ Analytics show data
- ✅ No console errors
- ✅ Mobile responsive

## What's Next?

Now that you're up and running:

1. **Customize the App**
   - Add your branding
   - Configure products
   - Set up pricing

2. **Deploy to Production**
   - Choose hosting platform
   - Set up custom domain
   - Configure SSL

3. **Monitor and Improve**
   - Track user behavior
   - Gather feedback
   - Make improvements

4. **Scale as Needed**
   - Add more features
   - Optimize performance
   - Expand functionality

---

**Congratulations!** 🎉

You're now ready to use Route 64 Lubricants. For more detailed information, check out the full documentation.

**Need more help?** Contact us at info@route64.co.za