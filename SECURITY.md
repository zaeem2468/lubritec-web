# Security Guide

Security guidelines and best practices for the Route 64 Lubricants platform.

## Table of Contents
- [Security Overview](#security-overview)
- [Authentication Security](#authentication-security)
- [Data Security](#data-security)
- [API Security](#api-security)
- [Client-Side Security](#client-side-security)
- [Firebase Security](#firebase-security)
- [Network Security](#network-security)
- [Dependency Security](#dependency-security)
- [Security Testing](#security-testing)
- [Incident Response](#incident-response)
- [Compliance](#compliance)

## Security Overview

### Security Principles

1. **Defense in Depth**: Multiple layers of security
2. **Least Privilege**: Minimum required access
3. **Secure by Default**: Security-first approach
4. **Transparency**: Open security practices
5. **Continuous Improvement**: Regular security updates

### Threat Model

**Potential Threats**:
- Unauthorized access to user accounts
- Data breaches and information disclosure
- Man-in-the-middle attacks
- Cross-site scripting (XSS)
- Cross-site request forgery (CSRF)
- Injection attacks
- Denial of service (DoS)

**Security Controls**:
- Authentication and authorization
- Input validation and sanitization
- Secure communication (HTTPS)
- Security headers and CSP
- Regular security audits
- Incident response procedures

## Authentication Security

### Password Security

**Password Requirements**:
```javascript
function validatePassword(password) {
  const requirements = {
    minLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecialChars: false
  };
  
  if (password.length < requirements.minLength) {
    return { valid: false, message: 'Password must be at least 8 characters' };
  }
  
  if (requirements.requireUppercase && !/[A-Z]/.test(password)) {
    return { valid: false, message: 'Password must contain uppercase letters' };
  }
  
  if (requirements.requireLowercase && !/[a-z]/.test(password)) {
    return { valid: false, message: 'Password must contain lowercase letters' };
  }
  
  if (requirements.requireNumbers && !/\d/.test(password)) {
    return { valid: false, message: 'Password must contain numbers' };
  }
  
  return { valid: true };
}
```

### Session Management

**Secure Session Handling**:
```javascript
// Firebase Auth handles sessions securely
// Additional session validation
function validateSession(user) {
  if (!user) {
    redirect to login;
    return false;
  }
  
  // Check session age
  const lastLogin = user.metadata.lastSignInTime;
  const sessionAge = Date.now() - new Date(lastLogin).getTime();
  const maxSessionAge = 24 * 60 * 60 * 1000; // 24 hours
  
  if (sessionAge > maxSessionAge) {
    signOut(auth);
    return false;
  }
  
  return true;
}
```

### Multi-Factor Authentication (Future)

**Planned MFA Implementation**:
```javascript
// Future MFA implementation
async function enableMFA(user) {
  const verifier = new RecaptchaVerifier('mfa-button', {
    'size': 'invisible'
  });
  
  const multiFactorUser = multiFactor(user);
  const session = await multiFactorUser.getSession();
  
  const phoneInfoOptions = {
    phoneNumber: phoneNumber,
    session: session
  };
  
  const phoneAuthProvider = new PhoneAuthProvider(auth);
  const verificationId = await phoneAuthProvider.verifyPhoneNumber(
    phoneInfoOptions,
    verifier
  );
  
  // Store verificationId for confirmation
  return verificationId;
}
```

## Data Security

### Data Encryption

**Sensitive Data Handling**:
```javascript
// Encrypt sensitive data before storage
async function encryptData(data, key) {
  const encoder = new TextEncoder();
  const encodedData = encoder.encode(data);
  
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    key,
    { name: 'AES-GCM' },
    false,
    ['encrypt']
  );
  
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encryptedData = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv: iv },
    cryptoKey,
    encodedData
  );
  
  return {
    iv: Array.from(iv),
    data: Array.from(new Uint8Array(encryptedData))
  };
}
```

### Data Validation

**Input Validation**:
```javascript
function validateInput(input, type) {
  const validators = {
    email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    phone: (value) => /^\+?[\d\s-()]+$/.test(value),
    number: (value) => !isNaN(parseFloat(value)) && isFinite(value),
    text: (value) => typeof value === 'string' && value.length > 0,
    url: (value) => {
      try {
        new URL(value);
        return true;
      } catch {
        return false;
      }
    }
  };
  
  const validator = validators[type];
  if (!validator) {
    throw new Error(`Unknown validator type: ${type}`);
  }
  
  return validator(input);
}
```

### Data Sanitization

**Output Sanitization**:
```javascript
function sanitizeOutput(input) {
  if (typeof input !== 'string') {
    return input;
  }
  
  return input
    .replace(/&/g, '&')
    .replace(/</g, '<')
    .replace(/>/g, '>')
    .replace(/"/g, '"')
    .replace(/'/g, '&#x27;');
}

// Usage in templates
function renderProduct(product) {
  return `
    <div class="product">
      <h3>${sanitizeOutput(product.name)}</h3>
      <p>${sanitizeOutput(product.description)}</p>
    </div>
  `;
}
```

## API Security

### Rate Limiting

**Client-Side Rate Limiting**:
```javascript
class RateLimiter {
  constructor(maxRequests, timeWindow) {
    this.maxRequests = maxRequests;
    this.timeWindow = timeWindow;
    this.requests = [];
  }
  
  canMakeRequest() {
    const now = Date.now();
    this.requests = this.requests.filter(
      timestamp => now - timestamp < this.timeWindow
    );
    
    if (this.requests.length < this.maxRequests) {
      this.requests.push(now);
      return true;
    }
    
    return false;
  }
  
  getRemainingTime() {
    if (this.requests.length === 0) return 0;
    
    const oldestRequest = Math.min(...this.requests);
    const timeUntilReset = this.timeWindow - (Date.now() - oldestRequest);
    return Math.max(0, timeUntilReset);
  }
}

// Usage
const apiLimiter = new RateLimiter(100, 60000); // 100 requests per minute

async function makeApiRequest() {
  if (!apiLimiter.canMakeRequest()) {
    const waitTime = apiLimiter.getRemainingTime();
    throw new Error(`Rate limit exceeded. Wait ${waitTime}ms.`);
  }
  
  // Make API request
}
```

### Request Validation

**API Request Validation**:
```javascript
function validateApiRequest(request) {
  const requiredFields = ['userId', 'action', 'timestamp'];
  
  for (const field of requiredFields) {
    if (!request[field]) {
      throw new Error(`Missing required field: ${field}`);
    }
  }
  
  // Validate timestamp (prevent replay attacks)
  const requestAge = Date.now() - request.timestamp;
  if (requestAge > 5000) { // 5 seconds
    throw new Error('Request timestamp too old');
  }
  
  return true;
}
```

### Error Handling

**Secure Error Handling**:
```javascript
function handleApiError(error) {
  // Log detailed error for debugging
  console.error('API Error:', {
    message: error.message,
    code: error.code,
    stack: error.stack
  });
  
  // Return generic error to client
  const publicErrors = {
    'auth/user-not-found': 'Invalid credentials',
    'auth/wrong-password': 'Invalid credentials',
    'auth/email-already-in-use': 'Email already registered',
    'permission-denied': 'Access denied',
    'not-found': 'Resource not found'
  };
  
  return publicErrors[error.code] || 'An error occurred';
}
```

## Client-Side Security

### Content Security Policy

**CSP Implementation**:
```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self' 'unsafe-inline' 
                         https://cdn.tailwindcss.com 
                         https://www.gstatic.com 
                         https://cdn.jsdelivr.net; 
               style-src 'self' 'unsafe-inline' 
                        https://fonts.googleapis.com 
                        https://cdn.jsdelivr.net; 
               img-src 'self' data: https:; 
               font-src 'self' 
                       https://fonts.gstatic.com 
                       https://cdn.jsdelivr.net; 
               connect-src 'self' 
                          https://*.firebaseio.com 
                          https://*.firebasedatabase.app 
                          https://*.googleapis.com; 
               frame-src 'self'; 
               object-src 'none'; 
               base-uri 'self'; 
               form-action 'self';">
```

### XSS Prevention

**XSS Protection**:
```javascript
// Prevent XSS in user input
function preventXSS(input) {
  if (typeof input !== 'string') {
    return input;
  }
  
  // Remove dangerous HTML
  const dangerousPatterns = [
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    /<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi,
    /javascript:/gi,
    /on\w+\s*=/gi
  ];
  
  let sanitized = input;
  dangerousPatterns.forEach(pattern => {
    sanitized = sanitized.replace(pattern, '');
  });
  
  return sanitized;
}

// Safe HTML rendering
function safeHtml(html) {
  const div = document.createElement('div');
  div.textContent = html;
  return div.innerHTML;
}
```

### CSRF Protection

**CSRF Protection**:
```javascript
// Generate CSRF token
function generateCSRFToken() {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  return array[0].toString(36);
}

// Store token
function setCSRFToken() {
  const token = generateCSRFToken();
  sessionStorage.setItem('csrf_token', token);
  document.querySelector('meta[name="csrf-token"]').content = token;
}

// Validate token
function validateCSRFToken(token) {
  const storedToken = sessionStorage.getItem('csrf_token');
  return storedToken && storedToken === token;
}
```

## Firebase Security

### Security Rules

**Firestore Security Rules**:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Helper functions
    function isSignedIn() {
      return request.auth != null;
    }
    
    function isAdmin() {
      return isSignedIn() && 
             get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    function isOwner(userId) {
      return isSignedIn() && request.auth.uid == userId;
    }
    
    // Users collection
    match /users/{userId} {
      allow read: if isOwner(userId) || isAdmin();
      allow write: if isOwner(userId);
      allow create: if isSignedIn();
    }
    
    // Orders collection
    match /orders/{orderId} {
      allow read: if isOwner(resource.data.userId) || isAdmin();
      allow create: if isSignedIn();
      allow update: if isAdmin();
      allow delete: if isAdmin();
    }
    
    // Products collection
    match /products/{productId} {
      allow read: if true;
      allow write: if isAdmin();
    }
    
    // Reviews collection
    match /reviews/{reviewId} {
      allow read: if true;
      allow create: if isSignedIn();
      allow update, delete: if isAdmin() || isOwner(resource.data.userId);
    }
  }
}
```

### Authentication Rules

**Firebase Auth Rules**:
```javascript
// Email verification required
const auth = getAuth();
auth.settings.appVerificationDisabledForTesting = false;

// Require email verification
onAuthStateChanged(auth, (user) => {
  if (user && !user.emailVerified) {
    // Send verification email
    sendEmailVerification(user);
    // Show verification prompt
    showEmailVerificationPrompt();
  }
});
```

### Data Validation Rules

**Firestore Data Validation**:
```javascript
// Validate order data before creation
match /orders/{orderId} {
  allow create: if request.auth != null &&
                  request.resource.data.userId == request.auth.uid &&
                  request.resource.data.items.size() > 0 &&
                  request.resource.data.total > 0;
}
```

## Network Security

### HTTPS Enforcement

**HTTPS Configuration**:
```javascript
// Force HTTPS in production
if (location.protocol !== 'https:' && location.hostname !== 'localhost') {
  location.replace(`https:${location.href.substring(location.protocol.length)}`);
}

// HSTS Header (configured in Firebase Hosting)
// Strict-Transport-Security: max-age=31536000; includeSubDomains
```

### Secure Headers

**Security Headers**:
```html
<meta http-equiv="X-Content-Type-Options" content="nosniff">
<meta http-equiv="X-Frame-Options" content="DENY">
<meta http-equiv="X-XSS-Protection" content="1; mode=block">
<meta http-equiv="Referrer-Policy" content="strict-origin-when-cross-origin">
```

### API Communication Security

**Secure API Calls**:
```javascript
async function secureApiCall(endpoint, data) {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': getCSRFToken(),
      'Authorization': `Bearer ${getAuthToken()}`
    },
    body: JSON.stringify(data),
    credentials: 'same-origin'
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json();
}
```

## Dependency Security

### Dependency Management

**Regular Updates**:
```bash
# Check for vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix

# Update dependencies
npm update

# Check for outdated packages
npm outdated
```

### Third-Party Libraries

**Security Guidelines**:
1. Use reputable libraries
2. Keep libraries updated
3. Review library code
4. Minimize dependencies
5. Use CDN for popular libraries

**Secure Library Usage**:
```javascript
// Use SRI for CDN resources
<script src="https://cdn.tailwindcss.com" 
        integrity="sha384-..." 
        crossorigin="anonymous"></script>

<script src="https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js"
        integrity="sha384-..."
        crossorigin="anonymous"></script>
```

## Security Testing

### Security Checklist

**Pre-Deployment Security Checks**:
- [ ] All user inputs are validated
- [ ] All outputs are sanitized
- [ ] Authentication is properly implemented
- [ ] Authorization rules are enforced
- [ ] HTTPS is enforced
- [ ] Security headers are configured
- [ ] CSP is properly set
- [ ] Dependencies are up to date
- [ ] No console.log in production
- [ ] Error messages are generic

### Automated Security Testing

**Security Testing Tools**:
```bash
# Run security audit
npm audit --audit-level=moderate

# Check for vulnerabilities
snyk test

# Run linter with security rules
eslint --plugin-security .

# Test with OWASP ZAP
# Manual testing required
```

### Manual Security Testing

**Testing Procedures**:

1. **Authentication Testing**
   - Test login with invalid credentials
   - Test session timeout
   - Test password reset
   - Test account lockout

2. **Authorization Testing**
   - Test access control
   - Test role-based access
   - Test admin functions
   - Test API permissions

3. **Input Validation Testing**
   - Test SQL injection attempts
   - Test XSS attempts
   - Test CSRF attempts
   - Test file upload security

4. **Session Testing**
   - Test session fixation
   - Test session hijacking
   - Test session timeout
   - Test concurrent sessions

## Incident Response

### Security Incident Response Plan

**1. Detection**
- Monitor security logs
- Set up alerts
- Review user reports
- Conduct regular audits

**2. Containment**
- Isolate affected systems
- Disable compromised accounts
- Block malicious IPs
- Suspend suspicious activities

**3. Investigation**
- Analyze logs
- Identify root cause
- Assess impact
- Document findings

**4. Recovery**
- Restore from backups
- Patch vulnerabilities
- Update security measures
- Monitor for recurrence

**5. Post-Incident**
- Conduct review
- Update procedures
- Train team
- Communicate with stakeholders

### Incident Reporting

**Security Incident Report Template**:
```
Incident ID: [AUTO-GENERATED]
Date/Time: [TIMESTAMP]
Reporter: [NAME]
Severity: [LOW/MEDIUM/HIGH/CRITICAL]

Description:
[WHAT HAPPENED]

Impact:
[WHO/WHAT WAS AFFECTED]

Actions Taken:
[STEPS TAKEN]

Status:
[OPEN/IN PROGRESS/RESOLVED]

Follow-up Required:
[YES/NO]
```

## Compliance

### Data Protection

**GDPR Compliance**:
```javascript
// Data retention policy
function implementDataRetention() {
  const retentionPeriod = 365 * 24 * 60 * 60 * 1000; // 1 year
  
  // Delete old data
  async function deleteOldData() {
    const cutoffDate = Date.now() - retentionPeriod;
    
    const oldOrders = await getDocs(
      query(
        collection(db, 'orders'),
        where('createdAt', '<', cutoffDate)
      )
    );
    
    oldOrders.forEach(doc => {
      deleteDoc(doc.ref);
    });
  }
  
  // Run periodically
  setInterval(deleteOldData, 24 * 60 * 60 * 1000); // Daily
}

// Right to be forgotten
async function deleteUserData(userId) {
  // Delete user account
  await deleteUser(auth.currentUser);
  
  // Delete user data
  const userDoc = doc(db, 'users', userId);
  await deleteDoc(userDoc);
  
  // Anonymize orders
  const orders = await getDocs(
    query(collection(db, 'orders'), where('userId', '==', userId))
  );
  
  orders.forEach(orderDoc => {
    updateDoc(orderDoc.ref, {
      userId: 'ANONYMIZED',
      userEmail: 'ANONYMIZED'
    });
  });
}
```

### Privacy Policy

**Required Privacy Policy Elements**:
- Data collection practices
- Data usage purposes
- Data sharing policies
- User rights
- Cookie usage
- Contact information
- Policy updates

### Security Documentation

**Maintain Security Documentation**:
- Security policies
- Procedures
- Incident reports
- Training materials
- Compliance records

## Best Practices

### Development Security

1. **Secure Coding**
   - Follow security guidelines
   - Use secure libraries
   - Validate all inputs
   - Sanitize all outputs

2. **Code Review**
   - Security-focused reviews
   - Automated security checks
   - Peer review process
   - Regular audits

3. **Testing**
   - Security testing
   - Penetration testing
   - Vulnerability scanning
   - Code analysis

### Operational Security

1. **Access Control**
   - Principle of least privilege
   - Regular access reviews
   - Multi-factor authentication
   - Session management

2. **Monitoring**
   - Security logs
   - Anomaly detection
   - Alert systems
   - Regular audits

3. **Backup and Recovery**
   - Regular backups
   - Encryption at rest
   - Secure backup storage
   - Recovery testing

### User Security

1. **User Education**
   - Security awareness training
   - Phishing prevention
   - Password management
   - Safe browsing practices

2. **Communication**
   - Security notifications
   - Incident updates
   - Policy changes
   - Best practices

## Resources

### Security Tools

- **OWASP ZAP**: Web application security scanner
- **Snyk**: Dependency vulnerability scanner
- **ESLint Security Plugin**: Code security linter
- **Firebase Security Rules**: Firestore security testing

### Documentation

- **OWASP Top 10**: Web application security risks
- **Firebase Security Docs**: Firebase security best practices
- **MDN Web Security**: Web security guidelines
- **CSP Evaluator**: Content Security Policy testing

### Support

- **Security Issues**: Report to security@route64.co.za
- **General Issues**: info@route64.co.za
- **Documentation**: Review all security documentation

---

**Security is everyone's responsibility.** Follow these guidelines to ensure the Route 64 Lubricants platform remains secure for all users.