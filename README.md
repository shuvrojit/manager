# Project Manager

A modern React application built with TypeScript, Vite, and React Router for managing projects and tasks. This workspace provides a comprehensive project management interface with a responsive design.

## Technologies

- React 19
- TypeScript
- Vite 6
- React Router 7
- Testing Library
- Vitest
- ESLint + Prettier
- Styled Components

## Project Structure

```
src/
├── components/    # Reusable UI components
│   ├── layout/    # Layout components (MainLayout)
│   ├── project/   # Project-related components
│   └── sidebar/   # Sidebar navigation components
├── hooks/         # Custom React hooks
├── pages/         # Page components (routed views)
├── services/      # API and other services
│   └── api/       # API client implementation
└── test/          # Test utilities and setup
```

### Components

- **Layout**: Contains `MainLayout.tsx` which provides the base layout structure with sidebar and content area
- **Project**: Contains components related to project display and management
  - `ProjectCard.tsx`: Card component for displaying project summaries
  - `ProjectDropdown.tsx`: Dropdown menu for project actions
- **Sidebar**: Navigation sidebar with multiple subcomponents
  - `Sidebar.tsx`: Main sidebar container with collapsible functionality
  - `NavLinks.tsx`: Navigation menu items
  - `LogoSection.tsx`: App logo and branding
  - `UserProfile.tsx`: User information display
  - `SearchBar.tsx`: Search functionality
  - `NavItem.tsx`: Individual navigation item component
  - `BottomLinks.tsx`: Footer links in sidebar

## Routes

This project uses React Router v7 for navigation. Routes are defined in `src/routes.tsx` and include:

- Home (/) - Dashboard view
- Projects (/projects) - List of all projects
- Project Detail (/projects/:id) - Individual project details
- About (/about) - About page
- NotFound (404 page) - Fallback for invalid routes

All routes are rendered within the `MainLayout` component, which provides consistent structure across the application.

## Services

### API Integration

The application includes a flexible API client implementation located in `src/services/api/client.ts`, which provides a foundation for connecting to backend services. The API layer features:

- Type-safe request and response handling
- Built-in error management
- Support for all standard HTTP methods (GET, POST, PUT, PATCH, DELETE)

### Custom Hooks

The `useApi` hook in `src/hooks/useApi.ts` provides a clean interface for making HTTP requests and managing API state. It abstracts away the complexity of handling loading states, errors, and data persistence.

## Using the API Hook

```tsx
import { useApi } from './hooks/useApi';
import { useEffect } from 'react';

function ProjectsList() {
  const { get, data, isLoading, error } = useApi();
  
  useEffect(() => {
    // Fetch projects on component mount
    get('/api/projects');
  }, []);
  
  if (isLoading) return <div>Loading projects...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <div className="projects-grid">
      {data && data.map(project => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
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
// eslint.config.js
export default tseslint.config({
  extends: [
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
  ],
  languageOptions: {
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
    },
  },
})
```
