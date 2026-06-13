# TypeScript Best Practices

## Rule: Strict Type Safety

All code must use TypeScript with strict type checking enabled. No implicit `any` types allowed.

### Examples

```typescript
// ✅ CORRECT - Explicit types
interface User {
  id: string;
  name: string;
  email: string;
}

const getUser = (id: string): Promise<User> => {
  return apiService.get<User>(`/users/${id}`);
};

// ✅ CORRECT - Type inference where appropriate
const numbers = [1, 2, 3]; // inferred as number[]
const doubled = numbers.map((n) => n * 2);

// ❌ INCORRECT - Implicit any
const getUser = (id) => {
  return apiService.get(`/users/${id}`);
};

// ❌ INCORRECT - Using any
const processData = (data: any) => {
  return data.value;
};
```

### Interface vs Type

```typescript
// ✅ Use interfaces for object shapes
interface User {
  id: string;
  name: string;
}

// ✅ Use types for unions, tuples, primitives
type Status = 'active' | 'inactive' | 'pending';
type Coordinates = [number, number];
type ID = string | number;
```

### Props Typing

```typescript
// ✅ CORRECT - Explicit prop interface
interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({ label, onClick, disabled = false, variant = 'primary' }) => {
  // ...
};

// ❌ INCORRECT - Missing types
const Button = ({ label, onClick, disabled }) => {
  // ...
};
```

### Type Guards

```typescript
// ✅ CORRECT - Use type guards for narrowing
function isUser(value: unknown): value is User {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    'name' in value
  );
}

if (isUser(data)) {
  // TypeScript knows data is User here
  console.log(data.name);
}
```

### Utility Types

```typescript
// ✅ Use utility types for common patterns
type PartialUser = Partial<User>;
type ReadonlyUser = Readonly<User>;
type UserKeys = keyof User;
type UserValues = User[keyof User];
```

### Why This Matters

- **Type Safety**: Catches errors at compile time
- **IDE Support**: Better autocomplete and refactoring
- **Documentation**: Types serve as inline documentation
- **Refactoring**: Safer code changes with type checking
