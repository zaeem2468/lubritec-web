# Deployment Guide

Complete deployment instructions for the Route 64 Lubricants platform.

## Table of Contents
- [Deployment Options](#deployment-options)
- [Firebase Hosting](#firebase-hosting)
- [Netlify](#netlify)
- [Vercel](#vercel)
- [GitHub Pages](#github-pages)
- [AWS S3](#aws-s3)
- [Domain Configuration](#domain-configuration)
- [SSL/HTTPS](#sslhttps)
- [Performance Optimization](#performance-optimization)
- [Monitoring](#monitoring)

## Deployment Options

### Comparison

| Platform | Ease of Use | Cost | Features | Recommended |
|----------|-------------|------|----------|-------------|
| Firebase Hosting | ⭐⭐⭐⭐⭐ | Free tier | CDN, SSL, CI/CD | ✅ Yes |
| Netlify | ⭐⭐⭐⭐⭐ | Free tier | CDN, SSL, Forms | ✅ Yes |
| Vercel | ⭐⭐⭐⭐⭐ | Free tier | CDN, SSL, Edge | ✅ Yes |
| GitHub Pages | ⭐⭐⭐⭐ | Free | CDN, SSL | ⚠️ Basic |
| AWS S3 | ⭐⭐⭐ | Pay-as-you-go | CDN, SSL | ⚠️ Complex |

## Firebase Hosting

### Prerequisites

- Firebase project created
- Firebase CLI installed
- Git repository initialized

### Step 1: Install Firebase CLI

```bash
npm install -g firebase-tools
```

### Step 2: Login to Firebase

```bash
firebase login
```

This will open a browser window for authentication.

### Step 3: Initialize Firebase

```bash
cd "C:\Users\USER-PC\Downloads\lubritec web"
firebase init
```

Follow the prompts:
1. Select **Hosting**
2. Select existing project or create new
3. Use `.` as public directory
4. Configure as single-page app: **No**
5. Set up automatic builds: **No**

### Step 4: Configure firebase.json

Update `firebase.json`:

```json
{
  "hosting": {
    "public": ".",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ],
    "headers": [
      {
        "source": "**",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "max-age=1800"
          }
        ]
      }
    ]
  }
}
```

### Step 5: Deploy

```bash
firebase deploy
```

### Step 6: Access Your Site

After deployment, Firebase will provide a URL:
```
https://your-project.web.app
```

### Step 7: Configure Custom Domain (Optional)

1. Go to Firebase Console > Hosting
2. Click "Add custom domain"
3. Follow the DNS configuration steps
4. Wait for SSL certificate provisioning

### Firebase Hosting Features

- **Global CDN**: Automatic content delivery
- **SSL**: Free SSL certificates
- **Rollbacks**: Easy deployment rollbacks
- **Preview URLs**: Test before deploying
- **CI/CD**: GitHub integration available

## Netlify

### Prerequisites

- Netlify account
- Git repository (GitHub, GitLab, or Bitbucket)

### Step 1: Prepare Repository

Ensure your repository is pushed to GitHub:
```bash
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/lubritec-web.git
git push -u origin main
```

### Step 2: Deploy to Netlify

#### Option A: Drag and Drop

1. Go to [netlify.com](https://netlify.com)
2. Sign up/login
3. Drag and drop your project folder to the "Sites" area

#### Option B: Git Integration

1. Go to Netlify dashboard
2. Click "Add new site" > "Import from Git"
3. Select your repository
4. Configure build settings:
   - **Build command**: (leave empty)
   - **Publish directory**: `.`
5. Click "Deploy site"

### Step 3: Configure Site Settings

1. Go to Site settings
2. Set up custom domain
3. Configure HTTPS (automatic)
4. Set up environment variables if needed

### Step 4: Continuous Deployment

Netlify automatically deploys when you push to Git:
```bash
git add .
git commit -m "Update site"
git push
```

### Netlify Features

- **Continuous Deployment**: Auto-deploy on git push
- **Forms**: Built-in form handling
- **Functions**: Serverless functions
- **Split Testing**: A/B testing
- **Analytics**: Built-in analytics

## Vercel

### Prerequisites

- Vercel account
- Git repository

### Step 1: Install Vercel CLI (Optional)

```bash
npm install -g vercel
```

### Step 2: Deploy

#### Option A: Vercel CLI

```bash
cd "C:\Users\USER-PC\Downloads\lubritec web"
vercel
```

Follow the prompts to deploy.

#### Option B: Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Sign up/login
3. Click "New Project"
4. Import your Git repository
5. Configure settings:
   - **Framework Preset**: Other
   - **Root Directory**: `.`
   - **Build Command**: (leave empty)
   - **Output Directory**: `.`
6. Click "Deploy"

### Step 3: Configure Domain

1. Go to project settings
2. Add custom domain
3. Configure DNS records
4. SSL is automatic

### Vercel Features

- **Edge Network**: Global edge deployment
- **Preview Deployments**: Automatic previews for PRs
- **Analytics**: Detailed analytics
- **DDoS Protection**: Built-in security
- **Automatic HTTPS**: Free SSL

## GitHub Pages

### Prerequisites

- GitHub account
- Repository with project files

### Step 1: Create Repository

1. Go to GitHub
2. Create new repository
3. Name it (e.g., `lubritec-web`)
4. Initialize with README (optional)

### Step 2: Push Code

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/lubritec-web.git
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to repository Settings
2. Navigate to "Pages" section
3. Select source: **Deploy from a branch**
4. Select branch: **main**
5. Select folder: **/(root)**
6. Click "Save"

### Step 4: Access Your Site

Your site will be available at:
```
https://yourusername.github.io/lubritec-web
```

### Step 5: Custom Domain (Optional)

1. Go to Pages settings
2. Add custom domain
3. Configure DNS records
4. Wait for SSL provisioning

### GitHub Pages Limitations

- No server-side processing
- Limited to static sites
- No built-in forms
- Basic analytics only

## AWS S3

### Prerequisites

- AWS account
- AWS CLI installed
- S3 bucket

### Step 1: Create S3 Bucket

```bash
aws s3 mb s3://lubritec-web --region us-east-1
```

### Step 2: Configure Bucket

1. Go to AWS Console > S3
2. Select your bucket
3. Enable static website hosting
4. Set up bucket policy for public access

### Step 3: Upload Files

```bash
aws s3 sync . s3://lubritec-web --exclude ".git/*" --exclude "node_modules/*"
```

### Step 4: Configure CloudFront (Optional)

For better performance and SSL:
1. Create CloudFront distribution
2. Point to S3 bucket
3. Configure SSL certificate
4. Set up caching

### Step 5: Configure Route 53 (Optional)

For custom domain:
1. Create hosted zone
2. Add DNS records
3. Point to CloudFront

### AWS S3 Features

- **Scalability**: Unlimited storage
- **Durability**: 99.999999999% durability
- **Security**: Access controls
- **Cost**: Pay-as-you-go

## Domain Configuration

### Choosing a Domain

1. **Purchase Domain**
   - Namecheap
   - GoDaddy
   - Google Domains
   - Cloudflare Registrar

2. **Configure DNS**
   - Point to hosting provider
   - Set up CNAME or A records
   - Configure email (optional)

### DNS Records

#### A Record
```
Type: A
Name: @
Value: 192.0.2.1 (your server IP)
TTL: 3600
```

#### CNAME Record
```
Type: CNAME
Name: www
Value: your-site.netlify.app
TTL: 3600
```

#### MX Records (for email)
```
Type: MX
Name: @
Value: mx.zoho.com
Priority: 10
```

## SSL/HTTPS

### Free SSL Options

1. **Let's Encrypt**
   - Free certificates
   - Auto-renewal
   - Widely supported

2. **Cloudflare SSL**
   - Free SSL
   - CDN included
   - DDoS protection

3. **Hosting Provider SSL**
   - Firebase: Automatic
   - Netlify: Automatic
   - Vercel: Automatic

### Manual SSL Configuration

If using custom hosting:

```bash
# Generate SSL certificate
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout private.key -out certificate.crt

# Configure web server
# (Nginx/Apache configuration)
```

## Performance Optimization

### Image Optimization

1. **Compress Images**
   ```bash
   # Using ImageMagick
   mogrify -quality 80 -resize 80% *.jpg
   ```

2. **Use WebP Format**
   ```bash
   # Convert to WebP
   cwebp -q 80 input.jpg -o output.webp
   ```

3. **Lazy Loading**
   ```html
   <img src="image.jpg" loading="lazy" alt="Product">
   ```

### Code Optimization

1. **Minify CSS/JS**
   ```bash
   # Using cssnano
   cssnano styles.css styles.min.css
   
   # Using terser
   terser script.js -o script.min.js
   ```

2. **Remove Unused Code**
   - Remove unused CSS classes
   - Eliminate unused JavaScript functions
   - Clean up dependencies

3. **Enable Compression**
   ```nginx
   # Nginx configuration
   gzip on;
   gzip_types text/css application/javascript;
   ```

### Caching Strategy

1. **Browser Caching**
   ```html
   <meta http-equiv="Cache-Control" content="max-age=31536000">
   ```

2. **CDN Caching**
   - Configure CDN cache rules
   - Set appropriate cache headers
   - Use cache invalidation

3. **Service Worker**
   ```javascript
   // Register service worker
   if ('serviceWorker' in navigator) {
     navigator.serviceWorker.register('/sw.js');
   }
   ```

## Monitoring

### Firebase Analytics

1. Enable Google Analytics
2. Add tracking code
3. Monitor user behavior
4. Track conversions

### Performance Monitoring

1. **Lighthouse**
   ```bash
   # Run Lighthouse
   lighthouse https://your-site.com --view
   ```

2. **Web Vitals**
   - Largest Contentful Paint (LCP)
   - First Input Delay (FID)
   - Cumulative Layout Shift (CLS)

3. **Uptime Monitoring**
   - UptimeRobot
   - Pingdom
   - StatusCake

### Error Tracking

1. **Sentry**
   - Capture JavaScript errors
   - Track performance issues
   - Monitor user sessions

2. **Firebase Crashlytics**
   - Crash reporting
   - Error analytics
   - Real-time alerts

## Security Best Practices

### Content Security Policy

```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self' 'unsafe-inline' https://cdn.tailwindcss.com https://www.gstatic.com; 
               style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; 
               img-src 'self' data: https:; 
               connect-src 'self' https://*.firebaseio.com https://*.firebasedatabase.app;">
```

### Firebase Security Rules

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

### Environment Variables

Store sensitive data in environment variables:
```javascript
// Don't hardcode API keys
const apiKey = process.env.FIREBASE_API_KEY;
```

## Backup and Recovery

### Firebase Backup

```bash
# Export Firestore data
firebase firestore:export backup-folder

# Import Firestore data
firebase firestore:import backup-folder
```

### Git Backup

```bash
# Regular commits
git add .
git commit -m "Backup"
git push
```

### Database Backup

1. **Automated Backups**
   - Firebase: Automatic
   - Custom: Scheduled scripts

2. **Recovery Process**
   - Restore from backup
   - Verify data integrity
   - Test functionality

## Troubleshooting

### Deployment Issues

**Problem**: Site not loading
- **Solution**: Check DNS propagation, verify hosting status

**Problem**: 404 errors
- **Solution**: Check file paths, verify routing configuration

**Problem**: CORS errors
- **Solution**: Configure CORS headers, check Firebase rules

### Performance Issues

**Problem**: Slow loading
- **Solution**: Optimize images, enable compression, use CDN

**Problem**: High bounce rate
- **Solution**: Improve loading speed, optimize UX

### Security Issues

**Problem**: Mixed content warnings
- **Solution**: Use HTTPS for all resources

**Problem**: Vulnerability alerts
- **Solution**: Update dependencies, fix security issues

## Post-Deployment Checklist

- [ ] Site loads correctly
- [ ] All pages accessible
- [ ] Forms working
- [ ] Authentication functional
- [ ] Database connected
- [ ] Images loading
- [ ] Mobile responsive
- [ ] SSL certificate valid
- [ ] Analytics configured
- [ ] Error tracking enabled
- [ ] Backups configured
- [ ] Monitoring active
- [ ] Performance optimized
- [ ] Security rules set
- [ ] Custom domain configured

## Maintenance

### Regular Tasks

1. **Weekly**
   - Check uptime
   - Review analytics
   - Monitor errors

2. **Monthly**
   - Update dependencies
   - Review security
   - Optimize performance

3. **Quarterly**
   - Full security audit
   - Performance review
   - Backup verification

### Updates and Upgrades

1. **Firebase SDK Updates**
   ```bash
   # Update Firebase SDK versions
   npm update firebase
   ```

2. **Dependency Updates**
   ```bash
   # Check for updates
   npm outdated
   
   # Update packages
   npm update
   ```

3. **Feature Updates**
   - Test in staging
   - Backup production
   - Deploy during low traffic

## Support

For deployment issues:
- Check platform documentation
- Review error logs
- Verify configuration
- Contact platform support
- Email: info@route64.co.za

## Additional Resources

- [Firebase Hosting Docs](https://firebase.google.com/docs/hosting)
- [Netlify Docs](https://docs.netlify.com)
- [Vercel Docs](https://vercel.com/docs)
- [GitHub Pages Docs](https://docs.github.com/pages)
- [AWS S3 Docs](https://docs.aws.amazon.com/s3)