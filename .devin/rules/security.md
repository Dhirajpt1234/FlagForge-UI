# Security Rules

## Rule: Never Commit Secrets

Never commit API keys, tokens, or sensitive data to version control.

### Examples

```typescript
// ✅ CORRECT - Use environment variables
const API_KEY = process.env.REACT_APP_API_KEY;

// ❌ INCORRECT - Hardcoded secrets
const API_KEY = 'sk-1234567890abcdef';
```

## Rule: Sanitize User Input

Always sanitize and validate user input before using it.

### Examples

```typescript
// ✅ CORRECT - Validate input
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// ❌ INCORRECT - No validation
const handleSubmit = (email: string) => {
  apiService.post('/subscribe', { email }); // No validation
};
```

## Rule: XSS Prevention

Use React's built-in XSS protection and avoid dangerouslySetInnerHTML.

### Examples

```typescript
// ✅ CORRECT - React automatically escapes
const Content: React.FC<{ text: string }> = ({ text }) => {
  return <div>{text}</div>;
};

// ❌ INCORRECT - Bypassing React's protection
const Content: React.FC<{ html: string }> = ({ html }) => {
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
};
```

## Rule: Secure API Calls

Use HTTPS for all API calls in production.

### Examples

```typescript
// ✅ CORRECT - HTTPS in production
const API_BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://api.example.com'
  : 'http://localhost:3001';

// ❌ INCORRECT - Always HTTP
const API_BASE_URL = 'http://api.example.com';
```

## Why This Matters

- **Security**: Prevents data breaches and attacks
- **Compliance**: Meets security standards and regulations
- **Trust**: Protects user data and builds trust
- **Liability**: Reduces legal and financial risks
