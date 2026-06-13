# Styling Rules

## Rule: Use Material UI Components

Prefer Material UI components over custom HTML elements for consistency.

### Examples

```typescript
// ✅ CORRECT - Use Material UI components
import { Box, Typography, Button } from '@mui/material';

const Component: React.FC = () => {
  return (
    <Box>
      <Typography variant="h1">Title</Typography>
      <Button variant="contained">Click</Button>
    </Box>
  );
};

// ❌ INCORRECT - Using HTML elements
const Component: React.FC = () => {
  return (
    <div>
      <h1>Title</h1>
      <button>Click</button>
    </div>
  );
};
```

## Rule: Use SCSS Variables

Always use SCSS variables from `@styles/variables.scss` for consistent styling.

### Examples

```scss
// ✅ CORRECT - Use SCSS variables
.my-component {
  color: $primary-color;
  padding: $spacing-md;
  border-radius: $border-radius-md;
}

// ❌ INCORRECT - Hardcoded values
.my-component {
  color: #1976d2;
  padding: 16px;
  border-radius: 8px;
}
```

## Rule: Use SCSS Mixins

Use mixins from `@styles/mixins.scss` for common patterns.

### Examples

```scss
// ✅ CORRECT - Use mixins
.card {
  @include card-style;
}

.centered {
  @include flex-center;
}

// ❌ INCORRECT - Repeating code
.card {
  background: $background-paper;
  border-radius: $border-radius-md;
  box-shadow: $shadow-sm;
  padding: $spacing-lg;
}

.centered {
  display: flex;
  align-items: center;
  justify-content: center;
}
```

## Rule: Responsive Design

Use Material UI breakpoints for responsive layouts.

### Examples

```typescript
// ✅ CORRECT - Use responsive breakpoints
const Component: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        gap: { xs: 2, md: 4 },
      }}
    >
      {/* content */}
    </Box>
  );
};

// ❌ INCORRECT - Not responsive
const Component: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 4 }}>
      {/* content */}
    </Box>
  );
};
```

## Rule: Use sx Prop for Inline Styles

Use the sx prop for inline styles instead of style prop.

### Examples

```typescript
// ✅ CORRECT - Use sx prop
<Box sx={{ mt: 2, p: 3, backgroundColor: 'primary.main' }}>

// ❌ INCORRECT - Use style prop
<Box style={{ marginTop: 16, padding: 24, backgroundColor: '#1976d2' }}>
```

## Rule: Theme Tokens

Use Material UI theme tokens for colors and spacing.

### Examples

```typescript
// ✅ CORRECT - Use theme tokens
<Box sx={{ color: 'primary.main', p: 2, m: 1 }}>

// ❌ INCORRECT - Hardcoded values
<Box sx={{ color: '#1976d2', padding: 16, margin: 8 }}>
```

## Why This Matters

- **Consistency**: Unified design system across the app
- **Maintainability**: Easy to update design tokens globally
- **Responsive**: Built-in responsive breakpoints
- **Accessibility**: Material UI components are accessible by default
- **Performance**: Optimized CSS generation
