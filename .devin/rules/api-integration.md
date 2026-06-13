# API Integration Rules

## Rule: Use Centralized Axios Instance

Always use the configured axios instance from `@config/axios` for all API calls.

### Examples

```typescript
// ✅ CORRECT - Use configured axios instance
import axiosInstance from '@config/axios';

const getUser = async (id: string) => {
  const response = await axiosInstance.get(`/users/${id}`);
  return response.data;
};

// ✅ CORRECT - Use apiService wrapper
import { apiService } from '@services/api';

const getUser = async (id: string) => {
  const response = await apiService.get<User>(`/users/${id}`);
  return response.data;
};

// ❌ INCORRECT - Creating new axios instance
import axios from 'axios';

const getUser = async (id: string) => {
  const response = await axios.get(`http://localhost:3001/api/users/${id}`);
  return response.data;
};
```

## Rule: Proper Error Handling

Handle API errors gracefully with user-friendly messages.

### Examples

```typescript
// ✅ CORRECT - Use useAxios hook with error handling
const { data, loading, error, execute } = useAxios(() =>
  apiService.get<User>('/users/1')
);

if (error) {
  return <Alert severity="error">Failed to load user data</Alert>;
}

// ✅ CORRECT - Try-catch in async functions
const handleSubmit = async () => {
  try {
    await apiService.post('/users', userData);
    showNotification({ message: 'User created successfully', severity: 'success' });
  } catch (err) {
    showNotification({ message: 'Failed to create user', severity: 'error' });
  }
};

// ❌ INCORRECT - No error handling
const handleSubmit = async () => {
  await apiService.post('/users', userData);
  // No error handling
};
```

## Rule: Loading States

Always show loading states during API calls.

### Examples

```typescript
// ✅ CORRECT - Show loading state
const UserList: React.FC = () => {
  const { data, loading, execute } = useAxios(() =>
    apiService.get<User[]>('/users')
  );

  useEffect(() => {
    execute();
  }, [execute]);

  if (loading) {
    return <CircularProgress />;
  }

  return <div>{data?.map(user => <UserCard key={user.id} user={user} />)}</div>;
};

// ❌ INCORRECT - No loading state
const UserList: React.FC = () => {
  const { data, execute } = useAxios(() =>
    apiService.get<User[]>('/users')
  );

  useEffect(() => {
    execute();
  }, [execute]);

  return <div>{data?.map(user => <UserCard key={user.id} user={user} />)}</div>;
};
```

## Rule: Type-Safe API Calls

Use TypeScript generics for type-safe API responses.

### Examples

```typescript
// ✅ CORRECT - Typed API calls
const getUser = async (id: string): Promise<User> => {
  const response = await apiService.get<User>(`/users/${id}`);
  return response.data;
};

// ❌ INCORRECT - Untyped API calls
const getUser = async (id: string) => {
  const response = await apiService.get(`/users/${id}`);
  return response.data; // Type is unknown
};
```

## Rule: Environment Variables

Use environment variables for API configuration.

### Examples

```typescript
// ✅ CORRECT - Use environment variable
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001/api';

// ❌ INCORRECT - Hardcoded URL
const API_BASE_URL = 'http://localhost:3001/api';
```

## Why This Matters

- **Consistency**: Centralized configuration ensures consistent behavior
- **Security**: Environment variables protect sensitive data
- **Type Safety**: Typed API calls prevent runtime errors
- **User Experience**: Loading and error states improve UX
- **Maintainability**: Easier to update API configuration
