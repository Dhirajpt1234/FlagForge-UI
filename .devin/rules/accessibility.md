# Accessibility Rules

## Rule: Semantic HTML

Use semantic HTML elements for better accessibility.

### Examples

```typescript
// ✅ CORRECT - Semantic elements
const Component: React.FC = () => {
  return (
    <nav>
      <ul>
        <li><a href="/home">Home</a></li>
        <li><a href="/about">About</a></li>
      </ul>
    </nav>
  );
};

// ❌ INCORRECT - Non-semantic divs
const Component: React.FC = () => {
  return (
    <div>
      <div>
        <a href="/home">Home</a>
      </div>
      <div>
        <a href="/about">About</a>
      </div>
    </div>
  );
};
```

## Rule: ARIA Labels

Add ARIA labels for interactive elements without visible text.

### Examples

```typescript
// ✅ CORRECT - ARIA labels
<Button
  aria-label="Close dialog"
  onClick={onClose}
>
  <CloseIcon />
</Button>

// ❌ INCORRECT - Missing ARIA label
<Button onClick={onClose}>
  <CloseIcon />
</Button>
```

## Rule: Keyboard Navigation

Ensure all interactive elements are keyboard accessible.

### Examples

```typescript
// ✅ CORRECT - Keyboard accessible
const CustomButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      onClick();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={handleKeyDown}
    >
      Click me
    </div>
  );
};

// ❌ INCORRECT - Not keyboard accessible
const CustomButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return <div onClick={onClick}>Click me</div>;
};
```

## Rule: Alt Text

Provide descriptive alt text for all images.

### Examples

```typescript
// ✅ CORRECT - Descriptive alt text
<img src="logo.png" alt="Company logo" />

// ❌ INCORRECT - Missing or generic alt text
<img src="logo.png" alt="image" />
<img src="logo.png" />
```

## Rule: Color Contrast

Ensure sufficient color contrast for readability.

### Examples

```scss
// ✅ CORRECT - Sufficient contrast
.text-primary {
  color: $text-primary; // #212121 on white background
}

.text-secondary {
  color: $text-secondary; // #757575 on white background
}

// ❌ INCORRECT - Low contrast
.text-low-contrast {
  color: #e0e0e0; // Too light on white background
}
```

## Why This Matters

- **Inclusivity**: Makes app usable for all users
- **Legal Compliance**: WCAG compliance may be required
- **SEO**: Semantic HTML improves search rankings
- **User Experience**: Better experience for all users
