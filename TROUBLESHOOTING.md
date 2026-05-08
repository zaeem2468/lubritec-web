# Troubleshooting Guide

Common issues and solutions for the Route 64 Lubricants platform.

## Table of Contents
- [Authentication Issues](#authentication-issues)
- [Database Issues](#database-issues)
- [Cart and Order Issues](#cart-and-order-issues)
- [Display and UI Issues](#display-and-ui-issues)
- [Performance Issues](#performance-issues)
- [Mobile Issues](#mobile-issues)
- [Firebase Issues](#firebase-issues)
- [Deployment Issues](#deployment-issues)
- [Development Issues](#development-issues)

## Authentication Issues

### User Cannot Login

**Symptoms**: Login fails with error message

**Possible Causes**:
- Incorrect email or password
- Account not verified
- Firebase Auth not enabled
- Network connectivity issues

**Solutions**:

1. **Check Credentials**
   ```javascript
   // Verify email format
   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   if (!emailRegex.test(email)) {
     console.error('Invalid email format');
   }
   ```

2. **Enable Firebase Auth**
   - Go to Firebase Console
   - Navigate to Authentication
   - Enable Email/Password provider
   - Save settings

3. **Check Network**
   - Verify internet connection
   - Check firewall settings
   - Try different network

4. **Clear Browser Data**
   - Clear cookies and cache
   - Try incognito mode
   - Disable browser extensions

### User Cannot Register

**Symptoms**: Registration fails with error

**Possible Causes**:
- Email already exists
- Weak password
- Invalid email format
- Firebase Auth disabled

**Solutions**:

1. **Check Email Format**
   ```javascript
   function validateEmail(email) {
     const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
     return re.test(email);
   }
   ```

2. **Validate Password Strength**
   ```javascript
   function validatePassword(password) {
     return password.length >= 6;
   }
   ```

3. **Handle Existing Email**
   ```javascript
   try {
     await createUserWithEmailAndPassword(auth, email, password);
   } catch (error) {
     if (error.code === 'auth/email-already-in-use') {
       alert('Email already registered. Please login.');
     }
   }
   ```

### Admin Access Not Working

**Symptoms**: Admin user doesn't see admin features

**Possible Causes**:
- Email not in ADMIN_EMAILS array
- Case sensitivity issue
- Not properly authenticated
- Cache issues

**Solutions**:

1. **Check Admin Emails**
   ```javascript
   // In index.html, verify this array
   const ADMIN_EMAILS = [
     'admin@route64.co.za',
     'your-admin@example.com'
   ];
   ```

2. **Verify Email Case**
   ```javascript
   // Emails are case-sensitive
   const userEmail = user.email?.toLowerCase();
   const isAdmin = ADMIN_EMAILS.includes(userEmail);
   ```

3. **Force Refresh**
   - Clear browser cache
   - Logout and login again
   - Hard refresh (Ctrl+F5)

## Database Issues

### Data Not Loading

**Symptoms**: Products, orders, or users not displaying

**Possible Causes**:
- Firestore not enabled
- Security rules blocking access
- Network issues
- Data structure changes

**Solutions**:

1. **Enable Firestore**
   - Go to Firebase Console
   - Navigate to Firestore Database
   - Create database if not exists
   - Check database is active

2. **Check Security Rules**
   ```javascript
   // In Firebase Console > Firestore > Rules
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /{document=**} {
         allow read, write: if request.auth != null;
       }
     }
   }
   ```

3. **Verify Data Structure**
   ```javascript
   // Check data.js for correct product structure
   const products = [
     {
       id: 'product-id',
       name: 'Product Name',
       category: 'Category',
       img: 'image.jpg',
       desc: 'Description',
       variants: [
         { size: '500ML', price: 20 }
       ]
     }
   ];
   ```

### Write Operations Failing

**Symptoms**: Cannot save orders, update users, etc.

**Possible Causes**:
- Insufficient permissions
- Invalid data format
- Network timeout
- Quota exceeded

**Solutions**:

1. **Check Permissions**
   ```javascript
   // Verify user is authenticated
   if (!auth.currentUser) {
     console.error('User not authenticated');
     return;
   }
   ```

2. **Validate Data**
   ```javascript
   function validateOrderData(order) {
     return order.userId && 
            order.items && 
            order.items.length > 0 &&
            order.total > 0;
   }
   ```

3. **Handle Errors**
   ```javascript
   try {
     await addDoc(collection(db, 'orders'), orderData);
   } catch (error) {
     console.error('Error saving order:', error);
     if (error.code === 'permission-denied') {
       alert('Permission denied. Please login.');
     }
   }
   ```

## Cart and Order Issues

### Cart Not Persisting

**Symptoms**: Cart items disappear on page refresh

**Possible Causes**:
- Local storage disabled
- Browser privacy settings
- Storage quota exceeded
- JavaScript errors

**Solutions**:

1. **Check Local Storage**
   ```javascript
   // Test local storage
   function testLocalStorage() {
     try {
       localStorage.setItem('test', 'test');
       localStorage.removeItem('test');
       return true;
     } catch (e) {
       console.error('Local storage not available:', e);
       return false;
     }
   }
   ```

2. **Enable Local Storage**
   - Check browser settings
   - Enable cookies and local storage
   - Disable private browsing mode
   - Clear storage if quota exceeded

3. **Implement Fallback**
   ```javascript
   function saveCart(cart) {
     try {
       localStorage.setItem('lubritec_cart', JSON.stringify(cart));
     } catch (e) {
       console.error('Failed to save cart:', e);
       // Implement session storage fallback
       sessionStorage.setItem('lubritec_cart', JSON.stringify(cart));
     }
   }
   ```

### Order Not Placing

**Symptoms**: Cannot complete order placement

**Possible Causes**:
- Cart is empty
- Invalid product data
- Authentication required
- Network issues

**Solutions**:

1. **Validate Cart**
   ```javascript
   function validateCart(cart) {
     if (!cart || cart.length === 0) {
       alert('Your cart is empty');
       return false;
     }
     return true;
   }
   ```

2. **Check Authentication**
   ```javascript
   function placeOrder() {
     if (!auth.currentUser) {
       alert('Please login to place an order');
       // Redirect to login
       return;
     }
     // Proceed with order
   }
   ```

3. **Handle Network Errors**
   ```javascript
   async function placeOrder(orderData) {
     try {
       const docRef = await addDoc(collection(db, 'orders'), orderData);
       console.log('Order placed:', docRef.id);
       return docRef.id;
     } catch (error) {
       if (error.code === 'unavailable') {
         alert('Network error. Please try again.');
       }
       throw error;
     }
   }
   ```

## Display and UI Issues

### Images Not Loading

**Symptoms**: Product images show broken links

**Possible Causes**:
- Incorrect image paths
- Missing image files
- File permission issues
- Network issues

**Solutions**:

1. **Check Image Paths**
   ```javascript
   // Verify paths in data.js
   const products = [
     {
       img: 'images/product.jpg'  // Correct path
     }
   ];
   ```

2. **Verify Files Exist**
   ```bash
   # Check if images directory exists
   ls images/

   # Check specific file
   ls images/product.jpg
   ```

3. **Handle Missing Images**
   ```javascript
   function handleImageError(img) {
   img.onerror = function() {
     this.src = 'images/placeholder.jpg';
     console.error('Image failed to load:', this.src);
   };
   }
   ```

### Styling Issues

**Symptoms**: CSS not applying correctly

**Possible Causes**:
- Tailwind CSS not loading
- Custom CSS conflicts
- Browser compatibility
- Cache issues

**Solutions**:

1. **Check Tailwind Loading**
   ```html
   <!-- Verify Tailwind CDN is included -->
   <script src="https://cdn.tailwindcss.com"></script>
   ```

2. **Clear Browser Cache**
   - Hard refresh (Ctrl+F5)
   - Clear browser cache
   - Disable cache in DevTools

3. **Check CSS Conflicts**
   ```css
   /* Use specific selectors */
   .product-card {
     /* styles */
   }

   /* Avoid overly general selectors */
   /* Don't use: */
   /* div { ... } */
   ```

## Performance Issues

### Slow Loading

**Symptoms**: Pages take long to load

**Possible Causes**:
- Large image files
- Too many HTTP requests
- Unoptimized code
- Slow network

**Solutions**:

1. **Optimize Images**
   ```bash
   # Compress images
   mogrify -quality 80 -resize 80% *.jpg

   # Convert to WebP
   cwebp -q 80 input.jpg -o output.webp
   ```

2. **Implement Lazy Loading**
   ```html
   <img src="image.jpg" loading="lazy" alt="Product">
   ```

3. **Minimize Requests**
   ```javascript
   // Combine multiple requests
   // Instead of multiple small requests
   // Use one larger request
   ```

### Memory Issues

**Symptoms**: Browser becomes slow or crashes

**Possible Causes**:
- Memory leaks
- Large data sets
- Event listeners not removed
- Circular references

**Solutions**:

1. **Clean Up Event Listeners**
   ```javascript
   // Remove event listeners when not needed
   element.removeEventListener('click', handler);

   // Use event delegation
   document.addEventListener('click', function(e) {
     if (e.target.matches('.button')) {
       // Handle button click
     }
   });
   ```

2. **Manage Large Data Sets**
   ```javascript
   // Use pagination
   function loadProducts(page, pageSize) {
     const start = (page - 1) * pageSize;
     const end = start + pageSize;
     return products.slice(start, end);
   }
   ```

## Mobile Issues

### Responsive Design Problems

**Symptoms**: Layout breaks on mobile devices

**Possible Causes**:
- Missing viewport meta tag
- Fixed widths
- Touch targets too small
- Mobile-specific bugs

**Solutions**:

1. **Check Viewport Meta Tag**
   ```html
   <meta name="viewport" 
         content="width=device-width, initial-scale=1.0, 
                  maximum-scale=1.0, user-scalable=no">
   ```

2. **Use Responsive Units**
   ```css
   /* Use relative units */
   .container {
     width: 100%;
     max-width: 1200px;
     padding: 1rem;
   }

   /* Avoid fixed widths */
   /* Don't use: */
   /* .container { width: 1200px; } */
   ```

3. **Test Touch Targets**
   ```css
   /* Minimum touch target: 44x44px */
   .button {
     min-height: 44px;
     min-width: 44px;
     padding: 12px 24px;
   }
   ```

### Mobile Performance

**Symptoms**: App is slow on mobile devices

**Possible Causes**:
- Heavy JavaScript
- Large images
- No optimization
- Poor network

**Solutions**:

1. **Optimize JavaScript**
   ```javascript
   // Use code splitting
   // Load only what's needed

   // Debounce events
   function debounce(func, wait) {
     let timeout;
     return function(...args) {
       clearTimeout(timeout);
       timeout = setTimeout(() => func.apply(this, args), wait);
     };
   }
   ```

2. **Use Mobile-Optimized Images**
   ```html
   <picture>
     <source media="(max-width: 768px)" srcset="image-mobile.jpg">
     <source media="(min-width: 769px)" srcset="image-desktop.jpg">
     <img src="image-desktop.jpg" alt="Product">
   </picture>
   ```

## Firebase Issues

### Configuration Errors

**Symptoms**: Firebase initialization fails

**Possible Causes**:
- Invalid config
- Missing credentials
- Project not found
- API key issues

**Solutions**:

1. **Verify Firebase Config**
   ```javascript
   const firebaseConfig = {
     apiKey: "YOUR_API_KEY",           // Required
     authDomain: "YOUR_PROJECT.firebaseapp.com",
     projectId: "YOUR_PROJECT_ID",     // Required
     storageBucket: "YOUR_PROJECT.firebasestorage.app",
     messagingSenderId: "YOUR_SENDER_ID",
     appId: "YOUR_APP_ID"              // Required
   };
   ```

2. **Get Fresh Config**
   - Go to Firebase Console
   - Project Settings
   - Your apps
   - Copy config again

### Quota Exceeded

**Symptoms**: Operations fail due to limits

**Possible Causes**:
- Free tier limits
- High usage
- Concurrent requests
- Storage limits

**Solutions**:

1. **Check Usage**
   - Go to Firebase Console
   - Usage section
   - Monitor quotas

2. **Optimize Operations**
   ```javascript
   // Batch operations
   const batch = writeBatch(db);
   batch.set(doc1, data1);
   batch.set(doc2, data2);
   await batch.commit();
   ```

3. **Upgrade Plan**
   - Consider Blaze plan for higher limits
   - Monitor usage regularly

## Deployment Issues

### Build Failures

**Symptoms**: Deployment fails

**Possible Causes**:
- Invalid configuration
- Missing files
- Syntax errors
- Dependency issues

**Solutions**:

1. **Check Configuration**
   ```json
   {
     "hosting": {
       "public": ".",
       "ignore": [
         "firebase.json",
         "**/.*",
         "**/node_modules/**"
       ]
     }
   }
   ```

2. **Test Locally**
   ```bash
   # Test deployment locally
   firebase serve

   # Check for errors
   firebase deploy --debug
   ```

### Domain Issues

**Symptoms**: Custom domain not working

**Possible Causes**:
- DNS not configured
- SSL not provisioned
- Domain not verified
- Propagation delay

**Solutions**:

1. **Check DNS**
   ```bash
   # Verify DNS records
   nslookup yourdomain.com

   # Check propagation
   dig yourdomain.com
   ```

2. **Configure SSL**
   - Wait for SSL provisioning
   - Check certificate status
   - Verify domain ownership

## Development Issues

### Local Server Not Starting

**Symptoms**: Cannot start development server

**Possible Causes**:
- Port already in use
- Permission issues
- Missing dependencies
- Firewall blocking

**Solutions**:

1. **Check Port Usage**
   ```bash
   # Windows
   netstat -ano | findstr :8000

   # Kill process if needed
   taskkill /PID <PID> /F
   ```

2. **Use Different Port**
   ```bash
   # Try different port
   python -m http.server 3000
   ```

3. **Check Permissions**
   - Run as administrator
   - Check firewall settings
   - Verify folder permissions

### Git Issues

**Symptoms**: Git commands failing

**Possible Causes**:
- Not initialized
- Permission issues
- Merge conflicts
- Remote issues

**Solutions**:

1. **Initialize Git**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **Resolve Conflicts**
   ```bash
   # Check status
   git status

   # Resolve conflicts
   # Edit conflicting files
   git add <resolved-files>
   git commit
   ```

## Getting Help

### Before Asking for Help

1. **Check Console**
   - Open browser DevTools
   - Check for errors
   - Note error messages

2. **Review Logs**
   - Firebase Console logs
   - Browser console logs
   - Network tab errors

3. **Search Documentation**
   - README.md
   - API.md
   - SETUP.md

4. **Check GitHub Issues**
   - Search existing issues
   - Review solutions

### How to Ask for Help

When asking for help, include:

1. **Description**
   - What you're trying to do
   - What's happening
   - What you expect to happen

2. **Environment**
   - OS and version
   - Browser and version
   - Node.js version (if applicable)

3. **Steps to Reproduce**
   - Clear steps
   - Minimal example
   - Expected vs actual

4. **Error Messages**
   - Full error text
   - Stack traces
   - Console output

5. **What You've Tried**
   - Solutions attempted
   - Documentation reviewed
   - Debugging steps

### Contact Information

- **Email**: info@route64.co.za
- **GitHub Issues**: Create an issue with details
- **Documentation**: Review all documentation files

## Diagnostic Tools

### Browser DevTools

1. **Console**
   - View errors and warnings
   - Execute JavaScript
   - Debug code

2. **Network**
   - Monitor requests
   - Check response times
   - View headers

3. **Elements**
   - Inspect HTML/CSS
   - Test responsive design
   - Debug layout

4. **Application**
   - View local storage
   - Check cookies
   - Monitor cache

### Firebase Console

1. **Authentication**
   - View users
   - Check auth logs
   - Monitor sign-ins

2. **Firestore**
   - View data
   - Check rules
   - Monitor usage

3. **Usage**
   - View quotas
   - Monitor performance
   - Check costs

### Command Line Tools

```bash
# Check Node.js version
node --version

# Check npm version
npm --version

# Test Firebase connection
firebase login

# Check Git status
git status

# View network connections
netstat -ano
```

## Prevention

### Best Practices

1. **Regular Testing**
   - Test features regularly
   - Check cross-browser compatibility
   - Test on mobile devices

2. **Monitoring**
   - Monitor performance
   - Track errors
   - Review analytics

3. **Backups**
   - Backup configuration
   - Export data regularly
   - Use version control

4. **Documentation**
   - Document changes
   - Update README
   - Keep changelog

### Maintenance Schedule

- **Daily**: Monitor errors and performance
- **Weekly**: Review analytics and usage
- **Monthly**: Update dependencies and security
- **Quarterly**: Full security audit and optimization

---

**Still having issues?** Contact us at info@route64.co.za with details about your problem.