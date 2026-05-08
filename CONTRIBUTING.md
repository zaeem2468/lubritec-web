# Contributing Guide

Guidelines for contributing to the Route 64 Lubricants platform.

## Table of Contents
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Code Standards](#code-standards)
- [Testing Guidelines](#testing-guidelines)
- [Documentation](#documentation)
- [Pull Request Process](#pull-request-process)
- [Issue Reporting](#issue-reporting)
- [Community Guidelines](#community-guidelines)

## Getting Started

### Prerequisites

Before contributing, ensure you have:

- **Git**: For version control
- **Node.js** (v14+): For development tools
- **Code Editor**: VS Code recommended
- **Firebase Account**: For testing
- **Modern Browser**: Chrome, Firefox, Safari, or Edge

### Initial Setup

1. **Fork the Repository**
   ```bash
   # Fork the repository on GitHub
   # Clone your fork
   git clone https://github.com/yourusername/lubritec-web.git
   cd lubritec-web
   ```

2. **Set Up Remote**
   ```bash
   # Add upstream remote
   git remote add upstream https://github.com/original-owner/lubritec-web.git
   ```

3. **Install Dependencies**
   ```bash
   # Install development tools
   npm install -g firebase-tools
   npm install -g http-server
   ```

4. **Start Development Server**
   ```bash
   # Start local server
   http-server -p 8000
   ```

## Development Workflow

### Branch Strategy

We use a simplified Git workflow:

- **main**: Production-ready code
- **develop**: Development branch
- **feature/***: New features
- **bugfix/***: Bug fixes
- **hotfix/***: Urgent production fixes

### Creating a Feature Branch

```bash
# Ensure you're on main
git checkout main

# Pull latest changes
git pull upstream main

# Create feature branch
git checkout -b feature/your-feature-name

# Or for bug fixes
git checkout -b bugfix/your-bug-fix
```

### Making Changes

1. **Make your changes**
   - Edit files as needed
   - Test thoroughly
   - Follow code standards

2. **Commit your changes**
   ```bash
   # Stage changes
   git add .
   
   # Commit with descriptive message
   git commit -m "feat: add user authentication"
   ```

### Commit Message Format

We follow conventional commits:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types**:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

**Examples**:
```bash
git commit -m "feat(auth): add user registration"
git commit -m "fix(cart): resolve cart persistence issue"
git commit -m "docs(readme): update installation instructions"
```

### Syncing with Upstream

```bash
# Fetch upstream changes
git fetch upstream

# Rebase your branch
git rebase upstream/main

# Resolve conflicts if any
# git add <resolved-files>
# git rebase --continue
```

## Code Standards

### HTML Standards

1. **Structure**
   ```html
   <!DOCTYPE html>
   <html lang="en">
   <head>
       <meta charset="UTF-8">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <title>Page Title</title>
   </head>
   <body>
       <!-- Content -->
   </body>
   </html>
   ```

2. **Indentation**: Use 4 spaces
3. **Quotes**: Use double quotes for attributes
4. **Closing Tags**: Always close tags
5. **Comments**: Use HTML comments for sections

### JavaScript Standards

1. **Naming Conventions**
   ```javascript
   // Variables: camelCase
   const userName = 'John';
   let cartItems = [];

   // Functions: camelCase
   function addToCart(item) {
       // implementation
   }

   // Constants: UPPER_SNAKE_CASE
   const MAX_ITEMS = 100;
   const API_URL = 'https://api.example.com';

   // Classes: PascalCase
   class ShoppingCart {
       constructor() {
           // implementation
       }
   }
   ```

2. **Code Style**
   ```javascript
   // Use const by default, let when reassignment needed
   const products = [];
   let currentIndex = 0;

   // Use arrow functions for callbacks
   array.forEach(item => {
       console.log(item);
   });

   // Use template literals
   const message = `Hello ${userName}`;

   // Destructuring
   const { id, name, price } = product;
   ```

3. **Error Handling**
   ```javascript
   try {
       const result = await someOperation();
       return result;
   } catch (error) {
       console.error('Operation failed:', error);
       throw error;
   }
   ```

### CSS Standards

1. **Organization**
   ```css
   /* Base styles */
   body {
       font-family: 'Inter', sans-serif;
   }

   /* Components */
   .button {
       padding: 10px 20px;
   }

   /* Utilities */
   .text-center {
       text-align: center;
   }
   ```

2. **Naming**: Use BEM methodology
   ```css
   .block {}
   .block__element {}
   .block--modifier {}
   ```

3. **Responsive**: Mobile-first approach
   ```css
   /* Mobile first */
   .container {
       width: 100%;
   }

   /* Tablet */
   @media (min-width: 768px) {
       .container {
           width: 750px;
       }
   }

   /* Desktop */
   @media (min-width: 1024px) {
       .container {
           width: 970px;
       }
   }
   ```

### File Organization

```
lubritec-web/
├── index.html              # Main page
├── dashboard.html          # Dashboard
├── analytics.html          # Analytics
├── catalog.html            # Product catalog
├── orders.html             # Order management
├── product.html            # Product details
├── data.js                 # Data and logic
├── styles.css              # Styles
├── README.md               # Documentation
├── SETUP.md                # Setup guide
├── API.md                  # API documentation
├── DEPLOYMENT.md           # Deployment guide
└── CONTRIBUTING.md         # This file
```

## Testing Guidelines

### Manual Testing Checklist

Before submitting a PR, test:

#### Functionality
- [ ] Feature works as expected
- [ ] No console errors
- [ ] Forms submit correctly
- [ ] Navigation works
- [ ] Authentication works

#### Responsiveness
- [ ] Mobile view (320px+)
- [ ] Tablet view (768px+)
- [ ] Desktop view (1024px+)
- [ ] Large screens (1440px+)

#### Cross-Browser
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge

#### Performance
- [ ] Page loads quickly
- [ ] Images optimized
- [ ] No memory leaks
- [ ] Smooth animations

### Testing Tools

1. **Browser DevTools**
   - Chrome DevTools
   - Firefox Developer Tools
   - Safari Web Inspector

2. **Lighthouse**
   ```bash
   # Run Lighthouse
   lighthouse http://localhost:8000 --view
   ```

3. **Responsive Testing**
   - Chrome DevTools device mode
   - BrowserStack
   - Real devices

## Documentation

### Code Comments

1. **When to Comment**
   - Complex logic
   - Non-obvious decisions
   - Workarounds
   - API integrations

2. **Comment Style**
   ```javascript
   /**
    * Calculate total price including tax
    * @param {number} subtotal - Order subtotal
    * @param {number} taxRate - Tax rate (0-1)
    * @returns {number} Total price
    */
   function calculateTotal(subtotal, taxRate) {
       return subtotal * (1 + taxRate);
   }
   ```

### README Updates

Update README.md when:
- Adding new features
- Changing setup process
- Updating dependencies
- Modifying API

### API Documentation

Update API.md when:
- Adding new endpoints
- Changing data models
- Modifying authentication
- Updating error handling

## Pull Request Process

### Before Submitting

1. **Complete your changes**
   - All features implemented
   - Code tested thoroughly
   - Documentation updated

2. **Clean up commits**
   ```bash
   # Squash related commits
   git rebase -i HEAD~3
   
   # Or use reset
   git reset --soft HEAD~3
   git commit -m "feat: complete feature"
   ```

3. **Update branch**
   ```bash
   # Sync with upstream
   git fetch upstream
   git rebase upstream/main
   ```

### Creating Pull Request

1. **Push to GitHub**
   ```bash
   git push origin feature/your-feature
   ```

2. **Create PR on GitHub**
   - Go to repository
   - Click "New Pull Request"
   - Select your branch
   - Fill in PR template

3. **PR Description Template**
   ```markdown
   ## Description
   Brief description of changes

   ## Type of Change
   - [ ] Bug fix
   - [ ] New feature
   - [ ] Breaking change
   - [ ] Documentation update

   ## Testing
   - [ ] Tested manually
   - [ ] Tested on mobile
   - [ ] Tested on multiple browsers

   ## Screenshots (if applicable)
   Add screenshots here

   ## Checklist
   - [ ] Code follows standards
   - [ ] Self-reviewed code
   - [ ] Commented complex code
   - [ ] Updated documentation
   - [ ] No new warnings
   - [ ] Added tests (if applicable)
   ```

### PR Review Process

1. **Automated Checks**
   - CI/CD pipeline
   - Code linting
   - Build verification

2. **Peer Review**
   - At least one approval required
   - Address all review comments
   - Make requested changes

3. **Testing**
   - Reviewer tests changes
   - Verify no regressions
   - Check documentation

4. **Merge**
   - Squash and merge
   - Delete feature branch
   - Update main branch

## Issue Reporting

### Bug Reports

Use the bug report template:

```markdown
## Description
Clear description of the bug

## Steps to Reproduce
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Screenshots
Add screenshots if applicable

## Environment
- OS: [e.g. Windows 10]
- Browser: [e.g. Chrome 90]
- Device: [e.g. Desktop]

## Additional Context
Any other context about the problem
```

### Feature Requests

Use the feature request template:

```markdown
## Problem Statement
What problem does this solve?

## Proposed Solution
How should this be implemented?

## Alternatives
What alternatives have you considered?

## Additional Context
Any other context or screenshots
```

### Enhancement Suggestions

For improvements to existing features:

```markdown
## Current Behavior
How it works now

## Desired Behavior
How it should work

## Use Case
Why this change is needed

## Implementation Ideas
Any thoughts on implementation
```

## Community Guidelines

### Code of Conduct

1. **Be Respectful**
   - Treat everyone with respect
   - Use inclusive language
   - Welcome newcomers

2. **Be Collaborative**
   - Work together
   - Share knowledge
   - Help others learn

3. **Be Professional**
   - Focus on what's best for the community
   - Show empathy
   - Be constructive

4. **Be Inclusive**
   - Respect different perspectives
   - Welcome diverse contributions
   - Create safe environment

### Communication

1. **Discussions**
   - Use GitHub Discussions for questions
   - Be clear and concise
   - Provide context

2. **Issues**
   - Search existing issues first
   - Use appropriate templates
   - Provide enough information

3. **PR Reviews**
   - Be constructive
   - Explain reasoning
   - Suggest improvements

### Recognition

- Credit contributors in changelog
- Mention significant contributions
- Celebrate milestones

## Getting Help

### Resources

- **Documentation**: Check README.md and other docs
- **Issues**: Search existing issues
- **Discussions**: Ask questions in GitHub Discussions
- **Email**: info@route64.co.za

### Support Channels

1. **GitHub Issues**
   - Bug reports
   - Feature requests
   - Enhancement suggestions

2. **GitHub Discussions**
   - Questions
   - Ideas
   - General discussion

3. **Email**
   - Private matters
   - Security issues
   - Business inquiries

## Recognition

### Contributors

All contributors are recognized in:
- CONTRIBUTORS.md file
- Release notes
- Project documentation

### Attribution

- Maintain original authorship
- Credit external sources
- License compliance

## License

By contributing, you agree that your contributions will be licensed under the same license as the project.

## Questions?

If you have questions about contributing:
- Check existing documentation
- Search GitHub issues
- Start a discussion
- Contact maintainers

---

**Thank you for contributing to Route 64 Lubricants!** 🚀

Your contributions help make this platform better for everyone.