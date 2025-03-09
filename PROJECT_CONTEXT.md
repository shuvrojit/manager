# Project Context

## Project Overview
**Name**: Project Manager

**Objective**: A web-based project management application for tracking projects, tasks, teams, and resources with data visualization capabilities.

**Scope**:
- In-scope:
  - Project dashboard with status tracking
  - Task management with kanban board
  - Team/user management
  - Project budget visualization
  - User profiles and authentication
- Out-of-scope:
  - Real-time collaboration
  - File storage/sharing
  - External integrations

## Technical Requirements

### Programming Languages
- TypeScript 
- CSS

### Platform/OS
- Web-based (platform-agnostic)
- Development tested on Linux

### Frameworks & Core Dependencies
- React
- Vite (build tool)
- ESLint (linting)
- Prettier (formatting)
- Vitest (testing)

### Testing Tools
- Vitest
- React Testing Library
- Coverage reporting configured

## Detailed Project Breakdown

### Core Functionalities

#### Project Management
- Project listing with card-based view
- Detailed project views with status tracking
- Budget management and visualization
- Project filtering and search capabilities

#### Task Management
- Kanban board implementation
- Task creation/editing modal
- Task status tracking
- Task assignments

#### User/Team Management
- User profiles
- Team assignments
- Role-based visibility
- User activity tracking

### Technical Architecture

#### Application Structure
```
src/
├── components/       # Reusable UI components
│   ├── dashboard/   # Dashboard-specific components
│   ├── layout/      # Layout components
│   ├── project/     # Project-related components
│   └── sidebar/     # Navigation components
├── data/           # Data models and types
├── hooks/          # Custom React hooks
├── pages/          # Route components
├── services/       # API and service layers
└── test/           # Test utilities and setup
```

#### Key Components
- MainLayout: Root layout wrapper
- TaskBoard: Kanban-style task management
- ProjectDetail: Individual project views
- Dashboard charts: Status and budget visualization

### State Management
- Custom hooks for API interactions (useApi)
- TypeScript interfaces for type safety
- Centralized data models in `data/` directory

## Setup Instructions

1. Install dependencies:
```bash
yarn install
```

2. Start development server:
```bash
yarn dev
```

3. Run tests:
```bash
yarn test
```

## Testing Strategy

### Testing Stack
- Vitest for test runner
- React Testing Library for component testing
- Test utilities in src/test/
- API mocking capabilities

### Test Coverage
- Unit tests for hooks and services
- Component tests for UI elements
- API client testing with mocks

## File Structure Details

### Critical Files
- `src/routes.tsx`: Application routing
- `src/data/types.ts`: Core type definitions
- `src/services/api/client.ts`: API client implementation
- `src/components/project/TaskBoard.tsx`: Main task management UI

### Data Models
- Projects (`data/projects.ts`)
- Teams (`data/teams.ts`)
- Users (`data/users.ts`)

## Constraints & Assumptions

### Technical Limitations
- Browser-based only (no native features)
- Single-user focus (no real-time updates)

### Assumptions
- Modern browser support required
- Client-side state management sufficient
- Basic authentication implementation

## Future Considerations
- Real-time updates
- Advanced permission system
- Resource allocation tracking
- Integration with external tools
- Mobile responsiveness improvements

## Changelog

### v0.1.0
- Initial project setup
- Basic project management features
- Dashboard implementation
- Task board functionality

## Development Guidelines

### Code Style
- Prettier configuration enforces consistent formatting
- ESLint rules for TypeScript/React best practices
- Component-based architecture
- Typed props and state

### Best Practices
- Use TypeScript interfaces for data models
- Implement unit tests for new features
- Follow React functional component patterns
- Maintain clear component hierarchy

### Performance Considerations
- Lazy loading for routes
- Optimized re-renders with proper hook usage
- Efficient state management practices

---

*Note: This is a living document. Update as the project evolves.*
