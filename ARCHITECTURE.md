# Architecture Documentation

System architecture and design patterns for the Route 64 Lubricants platform.

## Table of Contents
- [System Overview](#system-overview)
- [Architecture Diagram](#architecture-diagram)
- [Frontend Architecture](#frontend-architecture)
- [Backend Architecture](#backend-architecture)
- [Data Flow](#data-flow)
- [Component Structure](#component-structure)
- [Design Patterns](#design-patterns)
- [Security Architecture](#security-architecture)
- [Performance Architecture](#performance-architecture)
- [Scalability Considerations](#scalability-considerations)

## System Overview

The Route 64 Lubricants platform is a modern e-commerce application built with a client-side architecture using Firebase as the backend-as-a-service provider.

### Key Characteristics

- **Client-Side Rendering**: All rendering happens in the browser
- **Serverless Backend**: Firebase provides authentication, database, and hosting
- **Real-Time Updates**: Firestore provides real-time data synchronization
- **Progressive Web App**: Mobile-first responsive design
- **State Management**: Local storage for cart, Firebase for persistent data

### Technology Stack

```
┌─────────────────────────────────────────────────────────┐
│                    Presentation Layer                     │
├─────────────────────────────────────────────────────────┤
│  HTML5  │  Tailwind CSS  │  Vanilla JavaScript  │  jsPDF │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│                    Application Layer                     │
├─────────────────────────────────────────────────────────┤
│  Authentication  │  Data Management  │  Business Logic   │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│                      Data Layer                          │
├─────────────────────────────────────────────────────────┤
│  Firebase Auth  │  Firestore  │  Local Storage  │  CDN   │
└─────────────────────────────────────────────────────────┘
```

## Architecture Diagram

### High-Level Architecture

```
┌──────────────┐
│   User       │
└──────┬───────┘
       │
       ▼
┌─────────────────────────────────────────────────────────┐
│                    Browser Client                         │
├─────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │   Views      │  │  Controllers │  │   Models     │  │
│  │              │  │              │  │              │  │
│  │ - Home       │  │ - Auth       │  │ - User       │  │
│  │ - Catalog    │  │ - Cart       │  │ - Product    │  │
│  │ - Dashboard  │  │ - Order      │  │ - Order      │  │
│  │ - Analytics  │  │ - Admin      │  │ - Review     │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────┘
       │                    │                    │
       ▼                    ▼                    ▼
┌─────────────────────────────────────────────────────────┐
│                    Firebase Services                     │
├─────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │  Auth        │  │  Firestore   │  │  Hosting     │  │
│  │              │  │              │  │              │  │
│  │ - Login      │  │ - Users      │  │ - Static     │  │
│  │ - Register   │  │ - Orders     │  │   Files      │  │
│  │ - Session    │  │ - Products   │  │ - CDN        │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────┘
```

### Data Flow Architecture

```
User Action → View → Controller → Model → Firebase → Response → View Update
```

## Frontend Architecture

### File Structure

```
lubritec-web/
├── index.html              # Main entry point
├── dashboard.html          # Customer dashboard
├── analytics.html          # Admin analytics
├── catalog.html            # Product catalog
├── orders.html             # Order management
├── product.html            # Product details
├── bulk-order.html         # Bulk ordering
├── data.js                 # Data models and business logic
├── styles.css              # Global styles
└── public/                 # Static assets
    ├── images/            # Product images
    └── fonts/             # Custom fonts
```

### View Layer

**Responsibilities**:
- Render HTML templates
- Handle user interactions
- Display data from models
- Manage UI state

**Key Views**:
- **Home**: Landing page and navigation
- **Catalog**: Product browsing and search
- **Product**: Individual product details
- **Dashboard**: Customer profile and orders
- **Analytics**: Admin metrics and reports
- **Orders**: Order management and tracking

### Controller Layer

**Responsibilities**:
- Handle user input
- Coordinate between views and models
- Manage application state
- Implement business logic

**Key Controllers**:
```javascript
// Authentication Controller
function handleLogin(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

function handleRegister(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

// Cart Controller
function addToCart(product, variant, quantity) {
  const cartItem = {
    productId: product.id,
    name: product.name,
    variant: variant.size,
    quantity: quantity,
    price: variant.price
  };
  activeCart.push(cartItem);
  saveCart();
}

// Order Controller
async function placeOrder(orderData) {
  const docRef = await addDoc(collection(db, 'orders'), orderData);
  return docRef.id;
}
```

### Model Layer

**Responsibilities**:
- Define data structures
- Implement data validation
- Handle data transformation
- Manage data persistence

**Key Models**:
```javascript
// User Model
const UserModel = {
  create: (userData) => setDoc(doc(db, 'users', userData.id), userData),
  get: (userId) => getDoc(doc(db, 'users', userId)),
  update: (userId, data) => updateDoc(doc(db, 'users', userId), data)
};

// Product Model
const ProductModel = {
  getAll: () => products, // From data.js
  getById: (id) => products.find(p => p.id === id),
  getByCategory: (category) => 
    products.filter(p => p.category === category)
};

// Order Model
const OrderModel = {
  create: (orderData) => addDoc(collection(db, 'orders'), orderData),
  get: (orderId) => getDoc(doc(db, 'orders', orderId)),
  getByUser: (userId) => 
    getDocs(query(collection(db, 'orders'), where('userId', '==', userId)))
};
```

## Backend Architecture

### Firebase Services

#### Authentication Service

**Features**:
- Email/password authentication
- Session management
- User profile management
- Role-based access control

**Implementation**:
```javascript
// Auth initialization
const auth = getAuth(app);

// Auth state management
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in
    window.currentUser = user;
    window.isAdmin = ADMIN_EMAILS.includes(user.email);
  } else {
    // User is signed out
    window.currentUser = null;
    window.isAdmin = false;
  }
});
```

#### Firestore Database

**Collections**:
- `users`: User profiles and preferences
- `orders`: Order records and status
- `reviews`: Customer reviews and ratings
- `analytics`: Performance metrics
- `pricing`: Custom pricing tiers

**Data Structure**:
```javascript
// User Document
{
  id: string,
  email: string,
  name: string,
  role: 'admin' | 'customer',
  createdAt: Date,
  updatedAt: Date
}

// Order Document
{
  id: string,
  userId: string,
  items: Array,
  total: number,
  status: string,
  createdAt: Date
}
```

#### Hosting Service

**Features**:
- Static file serving
- Global CDN
- SSL certificates
- Custom domains

**Configuration**:
```json
{
  "hosting": {
    "public": ".",
    "ignore": ["firebase.json", "**/.*"],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

## Data Flow

### Authentication Flow

```
1. User enters credentials
   ↓
2. Controller validates input
   ↓
3. Firebase Auth authenticates
   ↓
4. Auth state changes
   ↓
5. UI updates based on user role
   ↓
6. User redirected to appropriate view
```

### Shopping Cart Flow

```
1. User adds product to cart
   ↓
2. Controller creates cart item
   ↓
3. Cart saved to local storage
   ↓
4. UI updates cart display
   ↓
5. Cart persists across sessions
   ↓
6. On checkout, cart sent to server
```

### Order Placement Flow

```
1. User reviews cart
   ↓
2. User confirms order
   ↓
3. Controller validates order data
   ↓
4. Order saved to Firestore
   ↓
5. Cart cleared
   ↓
6. User redirected to order confirmation
   ↓
7. Real-time updates via Firestore
```

### Admin Analytics Flow

```
1. Admin accesses analytics
   ↓
2. Controller checks admin permissions
   ↓
3. Data fetched from Firestore
   ↓
4. Metrics calculated and aggregated
   ↓
5. Charts and graphs rendered
   ↓
6. Real-time updates via listeners
```

## Component Structure

### Page Components

```
index.html (Main Page)
├── Navigation
│   ├── Logo
│   ├── Menu Items
│   ├── Search Bar
│   └── User Actions
├── Hero Section
│   ├── Headline
│   ├── CTA Buttons
│   └── Background Image
├── Features Section
│   ├── Feature Cards
│   └── Icons
├── Products Section
│   ├── Product Grid
│   └── Product Cards
└── Footer
    ├── Links
    ├── Contact Info
    └── Social Media
```

### Reusable Components

```javascript
// Product Card Component
function createProductCard(product) {
  return `
    <div class="product-card">
      <img src="${product.img}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>${product.desc}</p>
      <button onclick="addToCart('${product.id}')">
        Add to Cart
      </button>
    </div>
  `;
}

// Cart Item Component
function createCartItem(item) {
  return `
    <div class="cart-item">
      <h4>${item.name}</h4>
      <p>${item.variant} - $${item.price}</p>
      <input type="number" value="${item.quantity}" 
             onchange="updateQuantity('${item.id}', this.value)">
      <button onclick="removeFromCart('${item.id}')">
        Remove
      </button>
    </div>
  `;
}
```

## Design Patterns

### Module Pattern

```javascript
// Cart Module
const CartModule = (function() {
  let cart = [];
  
  function addItem(item) {
    cart.push(item);
    saveCart();
  }
  
  function removeItem(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    saveCart();
  }
  
  function getItems() {
    return cart;
  }
  
  function saveCart() {
    localStorage.setItem('lubritec_cart', JSON.stringify(cart));
  }
  
  return {
    add: addItem,
    remove: removeItem,
    get: getItems
  };
})();
```

### Observer Pattern

```javascript
// Auth State Observer
onAuthStateChanged(auth, (user) => {
  // Notify all listeners
  notifyAuthListeners(user);
});

function notifyAuthListeners(user) {
  // Update UI
  updateNavigation(user);
  updateDashboard(user);
  updateCart(user);
}
```

### Singleton Pattern

```javascript
// Firebase Instance Singleton
const FirebaseService = (function() {
  let instance;
  
  function createInstance() {
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const db = getFirestore(app);
    
    return { app, auth, db };
  }
  
  return {
    getInstance: function() {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    }
  };
})();
```

### Factory Pattern

```javascript
// Order Factory
const OrderFactory = {
  createOrder: function(userData, cartItems) {
    return {
      id: generateOrderId(),
      userId: userData.id,
      userEmail: userData.email,
      items: cartItems,
      subtotal: calculateSubtotal(cartItems),
      tax: calculateTax(cartItems),
      total: calculateTotal(cartItems),
      status: 'pending',
      createdAt: new Date()
    };
  }
};
```

## Security Architecture

### Authentication Security

```javascript
// Secure Authentication Flow
1. User enters credentials
   ↓
2. Client-side validation
   ↓
3. Firebase Auth authentication
   ↓
4. Session token generation
   ↓
5. Secure token storage
   ↓
6. Token validation on requests
```

### Data Security

**Firestore Security Rules**:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && 
                          request.auth.uid == userId;
    }
    
    // Admins can read all orders
    match /orders/{orderId} {
      allow read: if request.auth != null && 
                   (resource.data.userId == request.auth.uid ||
                    isAdmin(request.auth.token.email));
      allow write: if isAdmin(request.auth.token.email);
    }
    
    // Public products
    match /products/{productId} {
      allow read: if true;
      allow write: if isAdmin(request.auth.token.email);
    }
  }
}

function isAdmin(email) {
  const adminEmails = ['admin@route64.co.za'];
  return adminEmails.includes(email);
}
```

### Input Validation

```javascript
// Input Sanitization
function sanitizeInput(input) {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove HTML tags
    .substring(0, 1000);  // Limit length
}

// Data Validation
function validateOrderData(order) {
  if (!order.userId || !order.items || order.items.length === 0) {
    throw new Error('Invalid order data');
  }
  
  if (order.total <= 0) {
    throw new Error('Invalid order total');
  }
  
  return true;
}
```

## Performance Architecture

### Caching Strategy

```javascript
// Local Storage Caching
const CacheService = {
  set: function(key, data, ttl = 3600000) {
    const item = {
      data: data,
      timestamp: Date.now(),
      ttl: ttl
    };
    localStorage.setItem(key, JSON.stringify(item));
  },
  
  get: function(key) {
    const item = JSON.parse(localStorage.getItem(key));
    if (!item) return null;
    
    if (Date.now() - item.timestamp > item.ttl) {
      localStorage.removeItem(key);
      return null;
    }
    
    return item.data;
  }
};
```

### Lazy Loading

```javascript
// Image Lazy Loading
function setupLazyLoading() {
  const images = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        observer.unobserve(img);
      }
    });
  });
  
  images.forEach(img => imageObserver.observe(img));
}
```

### Code Splitting

```javascript
// Dynamic Import for Code Splitting
async function loadAnalytics() {
  if (window.isAdmin) {
    const analytics = await import('./analytics.js');
    analytics.init();
  }
}
```

## Scalability Considerations

### Database Scaling

**Firestore Scaling Features**:
- Automatic sharding
- Global distribution
- Real-time synchronization
- Offline support

**Best Practices**:
```javascript
// Use composite indexes for complex queries
// Create indexes in Firebase Console

// Pagination for large datasets
async function getPaginatedOrders(lastDoc, pageSize = 20) {
  let query = collection(db, 'orders')
    .orderBy('createdAt', 'desc')
    .limit(pageSize);
  
  if (lastDoc) {
    query = query.startAfter(lastDoc);
  }
  
  return getDocs(query);
}
```

### CDN Scaling

**Firebase Hosting CDN**:
- Global edge locations
- Automatic caching
- SSL termination
- DDoS protection

**Asset Optimization**:
```javascript
// Use CDN for libraries
<script src="https://cdn.tailwindcss.com"></script>
<script src="https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js"></script>

// Optimize images
<img src="https://cdn.example.com/images/product.webp" 
     alt="Product" loading="lazy">
```

### Performance Monitoring

```javascript
// Performance Tracking
function trackPerformance() {
  // Page load time
  window.addEventListener('load', () => {
    const loadTime = performance.now();
    console.log('Page load time:', loadTime);
  });
  
  // API response time
  function trackApiCall(apiName) {
    const start = performance.now();
    return function() {
      const duration = performance.now() - start;
      console.log(`${apiName} took ${duration}ms`);
    };
  }
}
```

## Future Architecture Improvements

### Planned Enhancements

1. **Service Workers**
   - Offline support
   - Background sync
   - Push notifications

2. **Web Workers**
   - Background processing
   - Heavy computations
   - Data processing

3. **IndexedDB**
   - Larger storage capacity
   - Better performance
   - Rich query capabilities

4. **Micro-Frontends**
   - Modular architecture
   - Independent deployments
   - Team scalability

### Migration Path

```
Current Architecture
    ↓
Add Service Workers
    ↓
Implement Web Workers
    ↓
Migrate to IndexedDB
    ↓
Consider Micro-Frontends
```

---

This architecture provides a solid foundation for the Route 64 Lubricants platform with room for growth and improvement as the application scales.