# FlagForge UI React Best Practices

Comprehensive React best practices and coding standards for the FlagForge UI project, following industry standards and Vercel React guidelines.

## When to Use

Reference these guidelines when:
- Writing new React components or pages
- Implementing data fetching and state management
- Reviewing code for performance issues
- Refactoring existing React code
- Optimizing bundle size and load times
- Setting up new features or pages

## Project-Specific Standards

### Component Structure

All components must follow this structure:
1. Imports (React, third-party, local)
2. TypeScript interfaces/types
3. Component definition
4. Export

```typescript
import React from 'react';
import { Box, Typography } from '@mui/material';

interface ComponentProps {
  title: string;
  onClick: () => void;
}

const Component: React.FC<ComponentProps> = ({ title, onClick }) => {
  return (
    <Box onClick={onClick}>
      <Typography>{title}</Typography>
    </Box>
  );
};

export default Component;
```

### TypeScript Rules

- Always use explicit types for props
- Use `React.FC` for functional components
- Avoid `any` type - use `unknown` if truly unknown
- Use interfaces for object shapes, types for unions
- Leverage type inference where possible

### State Management

- Use Redux Toolkit for global state (auth, UI state)
- Use local state with useState for component-specific state
- Use useReducer for complex local state logic
- Use custom hooks for reusable state logic

### Performance Rules

- Use React.memo for expensive components
- Use useMemo for expensive calculations
- Use useCallback for stable function references
- Lazy load routes with React.lazy
- Use Suspense for loading states

### Styling

- Use Material UI components as base
- Use SCSS for custom styling
- Leverage SCSS variables from `@styles/variables.scss`
- Use mixins from `@styles/mixins.scss`
- Avoid inline styles except for dynamic values

### API Integration

- Use the centralized axios instance from `@config/axios`
- Use the apiService from `@services/api`
- Implement proper error handling
- Use the useAxios hook for data fetching
- Handle loading and error states

### File Organization

- One component per file
- File name matches component name (PascalCase)
- Group related files in appropriate directories
- Use index files for clean exports

## Rule Categories

### 1. Component Design (CRITICAL)

- Keep components small and focused
- Single responsibility principle
- Prefer composition over inheritance
- Use prop interfaces for type safety

### 2. Performance (HIGH)

- Lazy load heavy components
- Optimize re-renders with memo/memo/useCallback
- Use code splitting for routes
- Avoid unnecessary prop drilling

### 3. State Management (HIGH)

- Choose right state solution for the use case
- Keep state as close to where it's used as possible
- Use Redux for cross-component state
- Use React Query for server state (when added)

### 4. TypeScript (MEDIUM)

- Strict mode enabled
- No implicit any
- Proper type definitions for all props
- Type-safe Redux with typed hooks

### 5. Styling (MEDIUM)

- Use Material UI theme for consistency
- SCSS for custom styles
- Responsive design with breakpoints
- Accessible color contrasts

### 6. Error Handling (MEDIUM)

- Error boundaries for component trees
- Proper error messages
- API error handling in interceptors
- User-friendly error displays

## Quick Reference

### Component Template

```typescript
import React from 'react';

interface Props {
  // prop definitions
}

const ComponentName: React.FC<Props> = ({ prop }) => {
  // component logic
  return <div>{prop}</div>;
};

export default ComponentName;
```

### Redux Slice Template

```typescript
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface State {
  // state definition
}

const initialState: State = {
  // initial values
};

const slice = createSlice({
  name: 'feature',
  initialState,
  reducers: {
    // action creators
  },
});

export const { action1, action2 } = slice.actions;
export default slice.reducer;
```

### Custom Hook Template

```typescript
import { useState, useCallback } from 'react';

interface UseHookResult {
  // return types
}

export const useHook = (): UseHookResult => {
  // hook logic
  return {};
};
```

## Project-Specific Patterns

### Path Aliases

Use configured path aliases for clean imports:
- `@components/*` - Reusable components
- `@config/*` - Configuration files
- `@hooks/*` - Custom hooks
- `@pages/*` - Page components
- `@redux/*` - Redux store and slices
- `@routes/*` - Route configuration
- `@services/*` - API services
- `@styles/*` - SCSS files
- `@types/*` - TypeScript types
- `@utils/*` - Utility functions

### Material UI Usage

- Use theme tokens for colors and spacing
- Use sx prop for inline styles
- Prefer Box over div for styling
- Use Container for layout
- Use Grid or flexbox for responsive layouts

### API Integration

```typescript
import { apiService } from '@services/api';

// GET
const data = await apiService.get<Type>('/endpoint');

// POST
const result = await apiService.post<Type>('/endpoint', payload);
```

## Verification Checklist

Before committing code, verify:
- [ ] TypeScript compiles without errors
- [ ] No console warnings or errors
- [ ] Components are properly typed
- [ ] No unused imports
- [ ] No console.log in production code
- [ ] Proper error handling
- [ ] Responsive design tested
- [ ] Accessibility considered
