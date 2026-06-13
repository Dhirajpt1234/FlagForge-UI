# State Management Rules

## Rule: Choose the Right State Solution

Select the appropriate state management solution based on the scope and requirements.

### Decision Tree

```
Component-specific UI state → useState / useReducer
Cross-component state → Redux Toolkit
Server data with caching → React Query (when added)
Form state → React Hook Form (when added)
URL state → React Router hooks
```

### Examples

```typescript
// ✅ CORRECT - Local state for component-specific data
const Counter: React.FC = () => {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
};

// ✅ CORRECT - Redux for global state
const Header: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  return <div>Welcome, {user?.name}</div>;
};

// ✅ CORRECT - useReducer for complex local state
const Form: React.FC = () => {
  const [state, dispatch] = useReducer(formReducer, initialState);
  // ...
};

// ❌ INCORRECT - Using Redux for simple local state
const Counter: React.FC = () => {
  const dispatch = useAppDispatch();
  const count = useAppSelector((state) => state.counter.value);
  // Overkill for simple counter
};
```

## Rule: Keep State Close to Usage

Store state as close to where it's used as possible to avoid prop drilling.

### Examples

```typescript
// ✅ CORRECT - State in component that uses it
const UserProfile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  return <div>{isEditing ? <EditForm /> : <Display />}</div>;
};

// ❌ INCORRECT - Lifting state unnecessarily
const App: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  return <UserProfile isEditing={isEditing} setIsEditing={setIsEditing} />;
};
```

## Rule: Redux Best Practices

Follow Redux Toolkit patterns for modern Redux development.

### Examples

```typescript
// ✅ CORRECT - Redux Toolkit slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
  },
});

// ✅ CORRECT - Use typed hooks
const user = useAppSelector((state) => state.auth.user);
const dispatch = useAppDispatch();

// ❌ INCORRECT - Manual dispatch
const dispatch = useDispatch();
dispatch({ type: 'LOGIN_SUCCESS', payload: user });
```

## Rule: Avoid Derived State in Redux

Compute derived values in selectors rather than storing them.

### Examples

```typescript
// ✅ CORRECT - Computed in selector
const selectUserFullName = createSelector(
  [(state: RootState) => state.auth.user],
  (user) => `${user?.firstName} ${user?.lastName}`.trim()
);

// ❌ INCORRECT - Storing derived state
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.fullName = `${action.payload.firstName} ${action.payload.lastName}`; // Don't do this
    },
  },
});
```

## Why This Matters

- **Performance**: Avoids unnecessary re-renders
- **Maintainability**: Clear data flow makes debugging easier
- **Scalability**: Proper state management scales with app complexity
- **Predictability**: Clear state ownership prevents bugs
