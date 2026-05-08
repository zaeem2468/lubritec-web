# API Documentation

Complete API reference for the Route 64 Lubricants platform.

## Overview

This platform uses Firebase as the backend, providing real-time database operations, authentication, and cloud functions. All API calls are made directly from the client-side JavaScript to Firebase services.

## Base Configuration

### Firebase Initialization

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

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
```

## Authentication API

### User Registration

**Endpoint**: `createUserWithEmailAndPassword(auth, email, password)`

**Description**: Creates a new user account with email and password.

**Parameters**:
- `auth`: Auth instance
- `email` (string): User email address
- `password` (string): User password (min 6 characters)

**Returns**: User credential object

**Example**:
```javascript
try {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;
  console.log('User created:', user.uid);
} catch (error) {
  console.error('Registration error:', error.message);
}
```

**Error Codes**:
- `auth/email-already-in-use`: Email already registered
- `auth/invalid-email`: Invalid email format
- `auth/weak-password`: Password too weak

### User Login

**Endpoint**: `signInWithEmailAndPassword(auth, email, password)`

**Description**: Signs in existing user with email and password.

**Parameters**:
- `auth`: Auth instance
- `email` (string): User email address
- `password` (string): User password

**Returns**: User credential object

**Example**:
```javascript
try {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;
  console.log('User signed in:', user.uid);
} catch (error) {
  console.error('Login error:', error.message);
}
```

**Error Codes**:
- `auth/user-not-found`: User doesn't exist
- `auth/wrong-password`: Incorrect password
- `auth/invalid-email`: Invalid email format

### User Logout

**Endpoint**: `signOut(auth)`

**Description**: Signs out the current user.

**Parameters**:
- `auth`: Auth instance

**Returns**: Promise<void>

**Example**:
```javascript
try {
  await signOut(auth);
  console.log('User signed out');
} catch (error) {
  console.error('Logout error:', error.message);
}
```

### Auth State Observer

**Endpoint**: `onAuthStateChanged(auth, callback)`

**Description**: Listens for authentication state changes.

**Parameters**:
- `auth`: Auth instance
- `callback` (function): Callback function receiving user object or null

**Returns**: Unsubscribe function

**Example**:
```javascript
const unsubscribe = onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log('User is signed in:', user.uid);
    // User is signed in
  } else {
    console.log('User is signed out');
    // User is signed out
  }
});

// Unsubscribe when needed
// unsubscribe();
```

## Firestore Database API

### Create Document

**Endpoint**: `addDoc(collection(db, collectionName), data)`

**Description**: Creates a new document with auto-generated ID.

**Parameters**:
- `db`: Firestore instance
- `collectionName` (string): Name of the collection
- `data` (object): Document data

**Returns**: DocumentReference with new document ID

**Example**:
```javascript
try {
  const docRef = await addDoc(collection(db, 'orders'), {
    userId: 'user123',
    items: [{ productId: 'prod1', quantity: 2 }],
    total: 100,
    status: 'pending',
    createdAt: new Date()
  });
  console.log('Order created with ID:', docRef.id);
} catch (error) {
  console.error('Error creating document:', error.message);
}
```

### Set Document (Custom ID)

**Endpoint**: `setDoc(doc(db, collectionName, documentId), data)`

**Description**: Creates or overwrites a document with specific ID.

**Parameters**:
- `db`: Firestore instance
- `collectionName` (string): Name of the collection
- `documentId` (string): Custom document ID
- `data` (object): Document data

**Returns**: Promise<void>

**Example**:
```javascript
try {
  await setDoc(doc(db, 'users', 'user123'), {
    email: 'user@example.com',
    name: 'John Doe',
    role: 'customer',
    createdAt: new Date()
  });
  console.log('User document created');
} catch (error) {
  console.error('Error setting document:', error.message);
}
```

### Get Document

**Endpoint**: `getDoc(doc(db, collectionName, documentId))`

**Description**: Retrieves a single document by ID.

**Parameters**:
- `db`: Firestore instance
- `collectionName` (string): Name of the collection
- `documentId` (string): Document ID

**Returns**: DocumentSnapshot

**Example**:
```javascript
try {
  const docSnap = await getDoc(doc(db, 'users', 'user123'));
  if (docSnap.exists()) {
    console.log('User data:', docSnap.data());
  } else {
    console.log('User not found');
  }
} catch (error) {
  console.error('Error getting document:', error.message);
}
```

### Get Collection

**Endpoint**: `getDocs(collection(db, collectionName))`

**Description**: Retrieves all documents in a collection.

**Parameters**:
- `db`: Firestore instance
- `collectionName` (string): Name of the collection

**Returns**: QuerySnapshot with array of documents

**Example**:
```javascript
try {
  const querySnapshot = await getDocs(collection(db, 'products'));
  const products = [];
  querySnapshot.forEach((doc) => {
    products.push({ id: doc.id, ...doc.data() });
  });
  console.log('Products:', products);
} catch (error) {
  console.error('Error getting collection:', error.message);
}
```

### Update Document

**Endpoint**: `updateDoc(doc(db, collectionName, documentId), data)`

**Description**: Updates fields in an existing document.

**Parameters**:
- `db`: Firestore instance
- `collectionName` (string): Name of the collection
- `documentId` (string): Document ID
- `data` (object): Fields to update

**Returns**: Promise<void>

**Example**:
```javascript
try {
  await updateDoc(doc(db, 'orders', 'order123'), {
    status: 'shipped',
    updatedAt: new Date()
  });
  console.log('Order updated');
} catch (error) {
  console.error('Error updating document:', error.message);
}
```

### Delete Document

**Endpoint**: `deleteDoc(doc(db, collectionName, documentId))`

**Description**: Deletes a document.

**Parameters**:
- `db`: Firestore instance
- `collectionName` (string): Name of the collection
- `documentId` (string): Document ID

**Returns**: Promise<void>

**Example**:
```javascript
try {
  await deleteDoc(doc(db, 'orders', 'order123'));
  console.log('Order deleted');
} catch (error) {
  console.error('Error deleting document:', error.message);
}
```

### Real-time Updates

**Endpoint**: `onSnapshot(doc(db, collectionName, documentId), callback)`

**Description**: Listens for real-time document updates.

**Parameters**:
- `db`: Firestore instance
- `collectionName` (string): Name of the collection
- `documentId` (string): Document ID
- `callback` (function): Callback function receiving DocumentSnapshot

**Returns**: Unsubscribe function

**Example**:
```javascript
const unsubscribe = onSnapshot(doc(db, 'orders', 'order123'), (doc) => {
  if (doc.exists()) {
    console.log('Order data:', doc.data());
    console.log('Order status:', doc.data().status);
  }
});

// Unsubscribe when needed
// unsubscribe();
```

### Query with Filters

**Endpoint**: `query(collection(db, collectionName), where(field, operator, value))`

**Description**: Queries collection with filters.

**Parameters**:
- `db`: Firestore instance
- `collectionName` (string): Name of the collection
- `where` (function): Filter conditions

**Returns**: Query

**Example**:
```javascript
try {
  const q = query(
    collection(db, 'orders'),
    where('userId', '==', 'user123'),
    where('status', '==', 'pending')
  );
  const querySnapshot = await getDocs(q);
  const pendingOrders = [];
  querySnapshot.forEach((doc) => {
    pendingOrders.push({ id: doc.id, ...doc.data() });
  });
  console.log('Pending orders:', pendingOrders);
} catch (error) {
  console.error('Error querying:', error.message);
}
```

## Data Models

### User Document

```javascript
{
  id: string,              // Document ID (user UID)
  email: string,           // User email
  name: string,            // User display name
  role: 'admin' | 'customer',
  phone?: string,          // Optional phone number
  company?: string,        // Optional company name
  address?: {              // Optional address object
    street: string,
    city: string,
    state: string,
    zip: string,
    country: string
  },
  pricingTier?: string,    // Custom pricing tier
  createdAt: Date,         // Account creation date
  updatedAt: Date          // Last update date
}
```

### Order Document

```javascript
{
  id: string,              // Document ID
  userId: string,          // User UID
  userEmail: string,       // User email
  items: Array<{           // Order items
    productId: string,
    name: string,
    variant: string,
    quantity: number,
    price: number
  }>,
  subtotal: number,        // Subtotal before tax/shipping
  tax: number,             // Tax amount
  shipping: number,        // Shipping cost
  total: number,           // Final total
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled',
  paymentMethod: string,
  paymentStatus: 'pending' | 'paid' | 'failed',
  shippingAddress: {
    name: string,
    street: string,
    city: string,
    state: string,
    zip: string,
    country: string
  },
  notes?: string,          // Optional order notes
  createdAt: Date,         // Order creation date
  updatedAt: Date,        // Last update date
  shippedAt?: Date,        // Shipping date
  deliveredAt?: Date       // Delivery date
}
```

### Product Document

```javascript
{
  id: string,              // Product ID
  name: string,            // Product name
  category: string,       // Product category
  description: string,     // Product description
  image: string,          // Image URL
  variants: Array<{       // Product variants
    size: string,
    price: number,
    stock?: number
  }>,
  featured: boolean,      // Featured product flag
  active: boolean,        // Active product flag
  createdAt: Date,
  updatedAt: Date
}
```

### Review Document

```javascript
{
  id: string,              // Document ID
  userId: string,          // User UID
  userName: string,        // User display name
  productId: string,       // Product ID
  productName: string,     // Product name
  rating: number,          // Rating (1-5)
  title: string,          // Review title
  comment: string,         // Review content
  approved: boolean,       // Admin approval status
  createdAt: Date,         // Review creation date
  updatedAt: Date          // Last update date
}
```

## Error Handling

### Common Error Codes

**Authentication Errors**:
- `auth/user-not-found`: User account not found
- `auth/wrong-password`: Incorrect password
- `auth/email-already-in-use`: Email already registered
- `auth/invalid-email`: Invalid email format
- `auth/weak-password`: Password too weak
- `auth/too-many-requests`: Too many attempts

**Firestore Errors**:
- `permission-denied`: Insufficient permissions
- `not-found`: Document not found
- `already-exists`: Document already exists
- `invalid-argument`: Invalid argument provided
- `deadline-exceeded`: Request timeout

### Error Handling Pattern

```javascript
try {
  const result = await someFirebaseOperation();
  // Handle success
} catch (error) {
  console.error('Operation failed:', error.code, error.message);
  
  // Handle specific errors
  switch (error.code) {
    case 'auth/user-not-found':
      // Show user not found message
      break;
    case 'permission-denied':
      // Show permission error
      break;
    default:
      // Show generic error
      break;
  }
}
```

## Security Rules

### Development Rules

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

### Production Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read their own data
    match /users/{userId} {
      allow read: if request.auth != null && request.auth.uid == userId;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Users can read their own orders
    match /orders/{orderId} {
      allow read: if request.auth != null && 
                   resource.data.userId == request.auth.uid ||
                   request.auth.token.email == 'admin@route64.co.za';
      allow write: if request.auth != null && 
                    request.auth.token.email == 'admin@route64.co.za';
    }
    
    // Public products
    match /products/{productId} {
      allow read: if true;
      allow write: if request.auth.token.email == 'admin@route64.co.za';
    }
    
    // Admin-only reviews
    match /reviews/{reviewId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if request.auth.token.email == 'admin@route64.co.za';
    }
  }
}
```

## Rate Limiting

Firebase has built-in rate limiting:
- **Authentication**: 100 requests/minute
- **Firestore**: 50,000 reads/day (free tier)
- **Writes**: 20,000 writes/day (free tier)

For higher limits, upgrade to Firebase Blaze plan.

## Best Practices

1. **Error Handling**: Always wrap Firebase operations in try-catch
2. **Loading States**: Show loading indicators during async operations
3. **Data Validation**: Validate data before sending to Firebase
4. **Security**: Implement proper security rules for production
5. **Performance**: Use pagination for large collections
6. **Real-time**: Use onSnapshot for real-time updates when needed
7. **Cleanup**: Unsubscribe from listeners when components unmount

## Testing

### Testing Authentication

```javascript
// Test registration
const testRegistration = async () => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth, 
      'test@example.com', 
      'test123456'
    );
    console.log('Registration test passed');
    await signOut(auth); // Cleanup
  } catch (error) {
    console.error('Registration test failed:', error);
  }
};
```

### Testing Database Operations

```javascript
// Test document creation
const testDocumentCreation = async () => {
  try {
    const docRef = await addDoc(collection(db, 'test'), {
      testField: 'testValue',
      timestamp: new Date()
    });
    console.log('Document creation test passed, ID:', docRef.id);
    await deleteDoc(doc(db, 'test', docRef.id)); // Cleanup
  } catch (error) {
    console.error('Document creation test failed:', error);
  }
};
```

## Support

For API-related issues:
- Check Firebase Console for error logs
- Review Firebase documentation
- Verify security rules
- Check network connectivity
- Contact support at info@route64.co.za