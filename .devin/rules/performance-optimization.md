# Performance Optimization Rules

## Rule: Lazy Loading and Code Splitting

Use React.lazy for route-level code splitting to reduce initial bundle size.

### Examples

```typescript
// ✅ CORRECT - Lazy load routes
import React, { Suspense, lazy } from 'react';

const Home = lazy(() => import('@pages/Home'));
const Dashboard = lazy(() => import('@pages/Dashboard'));

const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<CircularProgress />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Suspense>
  );
};

// ❌ INCORRECT - Direct imports
import Home from '@pages/Home';
import Dashboard from '@pages/Dashboard';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
};
```

## Rule: Memoization

Use React.memo, useMemo, and useCallback to prevent unnecessary re-renders.

### Examples

```typescript
// ✅ CORRECT - Memoize expensive calculations
const ExpensiveComponent: React.FC<{ data: number[] }> = React.memo(({ data }) => {
  const sortedData = useMemo(() => {
    return data.sort((a, b) => a - b);
  }, [data]);

  return <div>{sortedData.join(', ')}</div>;
});

// ✅ CORRECT - Memoize callbacks
const Parent: React.FC = () => {
  const handleClick = useCallback(() => {
    console.log('clicked');
  }, []);

  return <Child onClick={handleClick} />;
};

// ❌ INCORRECT - Unnecessary re-renders
const ExpensiveComponent: React.FC<{ data: number[] }> = ({ data }) => {
  const sortedData = data.sort((a, b) => a - b); // Runs on every render
  return <div>{sortedData.join(', ')}</div>;
};
```

## Rule: Avoid Inline Functions

Avoid creating functions inside render to prevent child re-renders.

### Examples

```typescript
// ✅ CORRECT - Use useCallback
const Parent: React.FC = () => {
  const handleClick = useCallback((id: string) => {
    console.log(id);
  }, []);

  return <Child onClick={handleClick} />;
};

// ❌ INCORRECT - Inline function creates new reference on each render
const Parent: React.FC = () => {
  return <Child onClick={(id) => console.log(id)} />;
};
```

## Rule: Key Props

Always use stable, unique keys for list items.

### Examples

```typescript
// ✅ CORRECT - Use unique IDs
{items.map((item) => (
  <Item key={item.id} data={item} />
))}

// ❌ INCORRECT - Using index as key
{items.map((item, index) => (
  <Item key={index} data={item} />
))}

// ❌ INCORRECT - No key
{items.map((item) => (
  <Item data={item} />
))}
```

## Why This Matters

- **Bundle Size**: Code splitting reduces initial load time
- **Runtime Performance**: Memoization prevents unnecessary computations
- **User Experience**: Faster page loads and smoother interactions
- **Battery Life**: Efficient rendering reduces CPU usage
