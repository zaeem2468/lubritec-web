# Route 64 Lubricants - Professional ERP Platform

A comprehensive e-commerce and ERP platform for lubricant sales, order management, and customer relationship management.

## 🌟 Features

### Customer Portal
- **Product Catalog**: Browse and search through lubricants, oils, and industrial products
- **Smart Shopping Cart**: Persistent cart with local storage integration
- **Bulk Ordering**: Specialized interface for large quantity orders
- **Order Tracking**: Real-time order status updates and history
- **Client Profile**: Personalized pricing and account management

### Admin Dashboard
- **Analytics Dashboard**: Comprehensive sales and performance metrics
- **Order Management**: Process and track customer orders
- **User Management**: Admin and customer account controls
- **Client Reviews**: Manage and moderate customer feedback
- **Pricing Control**: Custom pricing tiers for different clients

### Technical Features
- **Firebase Integration**: Real-time authentication and database
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **PDF Generation**: Quote and invoice generation with jsPDF
- **Local Storage**: Cart persistence across sessions
- **Role-Based Access**: Admin and customer user roles

## 🛠 Technology Stack

- **Frontend**: HTML5, JavaScript (ES6+)
- **Styling**: Tailwind CSS (via CDN)
- **Backend**: Firebase (Authentication & Firestore)
- **PDF Generation**: jsPDF
- **Fonts**: Inter (Google Fonts)
- **Icons**: Custom SVG icons

## 📁 Project Structure

```
lubritec-web/
├── index.html              # Main landing page and navigation hub
├── dashboard.html          # Customer dashboard and profile management
├── analytics.html          # Admin analytics dashboard
├── bulk-order.html         # Bulk ordering interface
├── catalog.html            # Product catalog with search/filter
├── orders.html             # Order history and tracking
├── product.html            # Individual product details
├── data.js                 # Product database and cart logic
├── styles.css              # Custom CSS styles
├── CSS_INTEGRATION_GUIDE.md # CSS integration documentation
├── firebase.json           # Firebase configuration
├── .firebaserc             # Firebase project settings
├── .gitignore              # Git ignore rules
└── public/                 # Public assets directory
```

## 🚀 Getting Started

### Prerequisites
- Node.js (optional, for local development)
- Firebase account
- Modern web browser

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd lubritec-web
   ```

2. **Firebase Setup**
   - Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
   - Enable Authentication (Email/Password)
   - Create Firestore Database
   - Copy your Firebase config

3. **Configure Firebase**
   - Replace the Firebase configuration in `index.html` with your credentials:
   ```javascript
   const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_PROJECT.firebaseapp.com",
     projectId: "YOUR_PROJECT_ID",
     storageBucket: "YOUR_PROJECT.firebasestorage.app",
     messagingSenderId: "YOUR_SENDER_ID",
     appId: "YOUR_APP_ID"
   };
   ```

4. **Update Admin Emails**
   - Modify the `ADMIN_EMAILS` array in `index.html`:
   ```javascript
   const ADMIN_EMAILS = ['admin@yourdomain.com', 'another-admin@domain.com'];
   ```

### Local Development

1. **Start a local server**
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js (http-server)
   npx http-server -p 8000
   
   # Using PHP
   php -S localhost:8000
   ```

2. **Open in browser**
   ```
   http://localhost:8000
   ```

## 📖 Usage Guide

### For Customers

1. **Registration/Login**
   - Click "Client Login" to create an account or sign in
   - Use email and password for authentication

2. **Browsing Products**
   - Navigate to the catalog section
   - Use search and filter options to find products
   - View detailed product information

3. **Placing Orders**
   - Add products to cart
   - Select quantities and variants
   - Proceed to checkout
   - Track order status in the orders section

4. **Bulk Orders**
   - Access the bulk ordering interface
   - Upload or enter large quantity orders
   - Request custom quotes

### For Administrators

1. **Access Admin Dashboard**
   - Login with admin credentials
   - Access admin-only sections automatically

2. **Manage Orders**
   - View all customer orders
   - Update order statuses
   - Process refunds and changes

3. **Analytics**
   - Monitor sales performance
   - Track customer metrics
   - Generate reports

4. **User Management**
   - View customer accounts
   - Manage pricing tiers
   - Handle user issues

## 🔧 Configuration

### Product Database

Products are defined in `data.js`. To add new products:

```javascript
{
  id: 'unique-id',
  name: 'Product Name',
  category: 'Category Name',
  img: 'path/to/image.jpg',
  desc: 'Product description',
  variants: [
    { size: '500ML', price: 20 },
    { size: '5L', price: 150 }
  ]
}
```

### Firebase Collections

The app uses these Firestore collections:
- `users` - User profiles and preferences
- `orders` - Order records and status
- `reviews` - Customer reviews and ratings
- `pricing` - Custom pricing tiers
- `analytics` - Performance metrics

## 🌐 Deployment

### Firebase Hosting

1. **Install Firebase CLI**
   ```bash
   npm install -g firebase-tools
   ```

2. **Login to Firebase**
   ```bash
   firebase login
   ```

3. **Initialize Firebase**
   ```bash
   firebase init
   ```

4. **Deploy**
   ```bash
   firebase deploy
   ```

### Other Hosting Options

The app can be deployed to any static hosting service:
- Netlify
- Vercel
- GitHub Pages
- AWS S3

## 🎨 Customization

### Styling

- Modify `styles.css` for custom styles
- Use Tailwind CSS classes in HTML files
- Refer to `CSS_INTEGRATION_GUIDE.md` for detailed styling instructions

### Branding

- Update company name in HTML titles
- Replace logo images in the `public/` directory
- Modify color schemes in Tailwind config

## 🔒 Security Considerations

- Firebase security rules should be properly configured
- Admin email validation is client-side only (add server-side validation for production)
- Sensitive operations require authentication
- API keys are exposed in client-side code (acceptable for Firebase)

## 📱 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🐛 Troubleshooting

### Common Issues

1. **Firebase Connection Issues**
   - Check Firebase configuration
   - Verify Firebase project is active
   - Ensure Authentication and Firestore are enabled

2. **Cart Not Persisting**
   - Check browser local storage settings
   - Verify cookies are enabled
   - Clear browser cache if needed

3. **Admin Access Not Working**
   - Verify email is in `ADMIN_EMAILS` array
   - Check email case sensitivity
   - Ensure user is properly authenticated

## 📞 Support

For support and issues:
- Email: info@route64.co.za
- Check documentation for common solutions
- Review Firebase console for errors

## 📄 License

Proprietary - All rights reserved

## 🤝 Contributing

Contributions are welcome. Please follow these guidelines:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 Version History

- **v1.0** - Initial release with core e-commerce functionality
- **v1.1** - Added analytics dashboard
- **v1.2** - Enhanced bulk ordering system
- **v1.3** - Improved mobile responsiveness
- **v1.4** - Added client reviews and order tracking

---

**Route 64 Lubricants** - Professional ERP Platform  
*Built for efficiency, designed for growth*