# Component Structure Rules

## Rule: Component File Organization

All React components must follow a consistent file structure for maintainability and readability.

### Structure Order

1. **Imports** - React, third-party libraries, local imports
2. **TypeScript Interfaces/Types** - Props and component-specific types
3. **Component Definition** - The component itself
4. **Export** - Default export

### Example

```typescript
// ✅ CORRECT
import React from 'react';
import { Box, Typography } from '@mui/material';
import { useAppSelector } from '@redux/hooks';

interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, disabled = false }) => {
  const { loading } = useAppSelector((state) => state.ui);

  return (
    <Box onClick={onClick} disabled={disabled || loading}>
      <Typography>{label}</Typography>
    </Box>
  );
};

export default Button;
```

```typescript
// ❌ INCORRECT - Mixed order, missing types
import React from 'react';
import { useAppSelector } from '@redux/hooks';
import { Box, Typography } from '@mui/material';

const Button = ({ label, onClick, disabled }) => {
  // Missing TypeScript types
  return (
    <Box onClick={onClick}>
      <Typography>{label}</Typography>
    </Box>
  );
};

export default Button;
```

### Why This Matters

- **Consistency**: Easier to read and navigate code
- **Type Safety**: Explicit types prevent runtime errors
- **Maintainability**: Clear structure makes updates easier
- **Performance**: Proper imports enable tree-shaking

### Additional Guidelines

- Use `React.FC` for functional components
- Define prop interfaces before the component
- Use default values for optional props in the interface
- Export components as default export
- One component per file
- File name must match component name (PascalCase)
