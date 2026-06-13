# Error Handling Rules

## Rule: Error Boundaries

Use error boundaries to catch and handle errors in component trees.

### Examples

```typescript
// ✅ CORRECT - Error boundary component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" color="error">
            Something went wrong
          </Typography>
          <Typography variant="body2">
            {this.state.error?.message}
          </Typography>
        </Box>
      );
    }

    return this.props.children;
  }
}

// Usage
<ErrorBoundary>
  <App />
</ErrorBoundary>
```

## Rule: API Error Handling

Handle API errors with user-friendly messages and proper logging.

### Examples

```typescript
// ✅ CORRECT - Comprehensive error handling
const handleSubmit = async () => {
  try {
    setLoading(true);
    await apiService.post('/users', userData);
    showNotification({ message: 'Success', severity: 'success' });
  } catch (error) {
    const apiError = error as ApiError;
    console.error('API Error:', apiError);
    showNotification({
      message: apiError.message || 'An error occurred',
      severity: 'error',
    });
  } finally {
    setLoading(false);
  }
};

// ❌ INCORRECT - No error handling
const handleSubmit = async () => {
  await apiService.post('/users', userData);
};
```

## Rule: Validation Errors

Display validation errors clearly to users.

### Examples

```typescript
// ✅ CORRECT - Show validation errors
const Form: React.FC = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!email) newErrors.email = 'Email is required';
    if (!password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <form>
      <Input
        label="Email"
        error={!!errors.email}
        helperText={errors.email}
      />
      <Input
        label="Password"
        error={!!errors.password}
        helperText={errors.password}
      />
    </form>
  );
};
```

## Rule: Console Logging

Remove console.log statements before committing to production.

### Examples

```typescript
// ✅ CORRECT - Use proper logging
const debugLog = (message: string, data: unknown) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(message, data);
  }
};

// ❌ INCORRECT - Console.log in production code
const handleClick = () => {
  console.log('Button clicked'); // Remove before commit
};
```

## Why This Matters

- **User Experience**: Graceful error handling prevents app crashes
- **Debugging**: Proper error logging helps identify issues
- **Trust**: Clear error messages build user trust
- **Stability**: Error boundaries prevent cascading failures
