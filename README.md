# Project Manager

A modern React application built with TypeScript, Vite, and React Router for managing projects and tasks. This workspace provides a comprehensive project management interface with a responsive design and real-time data visualization.

## Technologies

- React 19.0.0
- TypeScript 5.7.2
- Vite 6.2.0
- React Router 7.3.0
- Testing Library 16.2.0
- Vitest 3.0.8
- ESLint 9.21.0 + Prettier 3.5.3
- Styled Components 6.1.15
- Recharts 2.15.1
- HeroIcons 2.2.0
- Lucide React 0.479.0

## Project Structure

```
src/
├── components/    # Reusable UI components
│   ├── dashboard/ # Dashboard and visualization components
│   ├── layout/    # Layout components (MainLayout)
│   ├── project/   # Project-related components
│   └── sidebar/   # Sidebar navigation components
├── data/         # Data management and type definitions
├── hooks/        # Custom React hooks
├── pages/        # Page components (routed views)
├── services/     # API and other services
│   └── api/      # API client implementation
└── test/         # Test utilities and setup
```

### Components

- **Dashboard**: Data visualization and statistics
  - `BudgetChart.tsx`: Budget allocation and tracking charts
  - `ProjectStatusChart.tsx`: Project status distribution charts
  - `StatsCard.tsx`: Key metrics and statistics display
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

### Data Management

The `/src/data` directory contains type definitions and data management:

- `types.ts`: TypeScript interfaces and types
- `users.ts`: User data and management
- `teams.ts`: Team structure and relationships
- `projects.ts`: Project data and status management
- `index.ts`: Centralized data export

## Routes

This project uses React Router v7 for navigation. Routes are defined in `src/routes.tsx` and include:

- Home (/) - Dashboard view with charts and statistics
- Projects (/projects) - List of all projects
- Project Detail (/projects/:id) - Individual project details
- About (/about) - About page
- NotFound (404 page) - Fallback for invalid routes

All routes are rendered within the `MainLayout` component, which provides consistent structure across the application.

## Data Visualization

The application uses Recharts for data visualization, providing:
- Project status distribution charts
- Budget allocation and tracking
- Team performance metrics
- Interactive and responsive charts

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
npm run build       # Build for production (includes type checking)
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

This project uses Vitest and Testing Library for testing. Tests are co-located with their implementation files. Testing setup includes:

- @testing-library/react 16.2.0
- @testing-library/jest-dom 6.6.3
- @testing-library/user-event 14.6.1
- JSDOM 26.0.0 for browser environment simulation

### Running Tests

```bash
npm test          # Run all tests
npm run coverage  # Generate test coverage report
```

## Git Hooks

The project uses Husky and lint-staged to run formatting before each commit:

```json
{
  "*.{ts,tsx}": ["prettier --write"],
  "*.{css,json,js}": ["prettier --write"]
}
```

## ESLint Configuration

The project uses the new ESLint flat config system. To modify the configuration:

```js
// eslint.config.js
import tseslint from 'typescript-eslint';
import js from '@eslint/js';

export default [
  js.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
      },
    },
  },
  // Add your custom rules here
];
