# FlagForge UI

A scalable and industry-ready React application with TypeScript, SCSS, Redux, Material UI, React Router, and Axios.

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Redux Toolkit** - State management
- **Material UI (MUI)** - Component library
- **React Router** - Client-side routing
- **Axios** - HTTP client with interceptors
- **SCSS** - Styling with Sass

## Project Structure

```
src/
├── assets/              # Static assets (images, fonts, icons)
├── components/           # Reusable UI components
│   ├── common/          # Generic components (Button, Input, Modal)
│   ├── layout/          # Layout components (Header, Sidebar, Footer)
│   └── ui/              # Material UI wrappers
├── config/              # Configuration files
│   ├── axios.ts         # Axios instance with interceptors
│   ├── constants.ts     # App constants
│   └── theme.ts         # Material UI theme
├── hooks/               # Custom React hooks
├── pages/               # Page-level components
├── redux/               # Redux store setup
│   ├── store.ts         # Root store
│   ├── slices/          # Redux slices
│   └── hooks.ts         # Typed Redux hooks
├── routes/              # Route configuration
├── services/            # API service layer
├── styles/              # Global SCSS files
│   ├── _variables.scss  # SCSS variables
│   ├── _mixins.scss     # SCSS mixins
│   ├── _global.scss     # Global styles
│   └── main.scss        # Main SCSS entry
├── types/               # TypeScript type definitions
├── utils/               # Utility functions
├── App.tsx              # Root component
└── index.tsx            # Entry point
```

## Getting Started

### Prerequisites

- Node.js v25+
- npm or yarn

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```env
REACT_APP_API_BASE_URL=http://localhost:3001/api
```

### Available Scripts

#### `npm start`

Runs the app in development mode at [http://localhost:3000](http://localhost:3000)

#### `npm run build`

Builds the app for production to the `build` folder

#### `npm test`

Launches the test runner in interactive watch mode

## Key Features

### Redux State Management

- Redux Toolkit for modern Redux patterns
- Typed hooks (`useAppDispatch`, `useAppSelector`)
- Pre-configured slices for auth and UI state

### Axios Configuration

- Centralized axios instance with interceptors
- Automatic token injection from localStorage
- Global error handling
- Response transformation

### SCSS Setup

- Design tokens in `_variables.scss`
- Reusable mixins in `_mixins.scss`
- Global styles in `_global.scss`
- Modular and maintainable styling

### React Router

- Lazy loading for all routes
- Code splitting for better performance
- Loading fallback with Suspense

### Material UI Theme

- Custom theme configuration
- Consistent design system
- Responsive breakpoints
- Component style overrides

## Path Aliases

The project uses TypeScript path aliases for cleaner imports:

```typescript
import Button from '@components/common/Button';
import axios from '@config/axios';
import { useAppDispatch } from '@redux/hooks';
```

## Component Usage

### Reusable Components

```typescript
import Button from '@components/common/Button';
import Input from '@components/common/Input';
import Card from '@components/common/Card';
import Modal from '@components/common/Modal';
```

### Layout Components

```typescript
import Header from '@components/layout/Header';
import Sidebar from '@components/layout/Sidebar';
import Footer from '@components/layout/Footer';
```

## API Service Layer

```typescript
import { apiService } from '@services/api';

// GET request
const response = await apiService.get<User>('/users/1');

// POST request
const response = await apiService.post<User>('/users', userData);

// PUT request
const response = await apiService.put<User>('/users/1', userData);

// DELETE request
const response = await apiService.delete<User>('/users/1');
```

## Custom Hooks

```typescript
import { useAxios } from '@hooks/useAxios';

const { data, loading, error, execute } = useAxios(() =>
  apiService.get<User>('/users/1')
);
```

## Redux Usage

```typescript
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { loginStart, loginSuccess } from '@redux/slices/authSlice';

const dispatch = useAppDispatch();
const { isAuthenticated } = useAppSelector((state) => state.auth);
```

## Styling

Use SCSS variables and mixins for consistent styling:

```scss
@import '@styles/variables.scss';
@import '@styles/mixins.scss';

.my-component {
  @include card-style;
  color: $primary-color;
  padding: $spacing-md;
}
```

## License

MIT
