# AI Frontend

A modern React application built with TypeScript, Vite, React Router, and comprehensive testing. This project provides a robust starting point for AI-focused frontend applications.

## Technologies

- React 19
- TypeScript
- Vite 6
- React Router 7
- Testing Library
- Vitest
- ESLint + Prettier

## Project Structure

```
src/
├── components/    # Reusable UI components
├── hooks/         # Custom React hooks
├── pages/         # Page components (routed views)
├── services/      # API and other services
│   └── api/       # API client implementation
└── test/          # Test utilities and setup
```

## Available Scripts

```bash
# Development
npm run dev         # Start development server
npm run build       # Build for production
npm run preview     # Preview production build

# Testing
npm test           # Run all tests
npm run test:watch # Run tests in watch mode
npm run coverage   # Generate test coverage report

# Linting & Formatting
npm run lint       # Run ESLint
npm run lint:fix   # Fix ESLint issues
npm run format     # Format code with Prettier
```

## Routing

This project uses React Router v7 for navigation. Routes are defined in `src/routes.tsx` and include:

- Home (/)
- About (/about)
- NotFound (404 page)

## API Integration

The project includes a comprehensive API client implementation and a custom `useApi` hook that provides a clean interface for making HTTP requests.

### Using the API Hook

The `useApi` hook manages loading states, error handling, and data persistence. It supports all standard HTTP methods:

```tsx
import { useApi } from './hooks/useApi';
import { useEffect } from 'react';

function DataComponent() {
  const { get, post, put, patch, delete: deleteRequest, data, isLoading, error } = useApi();
  
  useEffect(() => {
    // Fetch data on component mount
    get('/api/items');
  }, []);
  
  const handleSubmit = async (formData) => {
    try {
      await post('/api/items', { 
        body: formData 
      });
      // Handle successful submission
    } catch (err) {
      // Error already tracked in the hook's state
    }
  };
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <div>
      {data && (
        <ul>
          {data.map(item => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
```

## Testing

This project uses Vitest and Testing Library for testing. Tests are co-located with their implementation files or placed in the `__snapshots__` directory.

### Running Tests

```bash
npm test          # Run all tests
npm run coverage  # Generate test coverage report
```

## Git Hooks

The project uses Husky and lint-staged to run tests and linting before each commit, ensuring code quality.

## Expanding the ESLint Configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
