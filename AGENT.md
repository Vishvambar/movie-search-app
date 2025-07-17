# Agent Documentation

## Project Overview

This is a React + Vite project with the following structure:
- `client/` - Main React application built with Vite

## Technology Stack

- **Frontend**: React 19.1.0 with Vite 7.0.4
- **Build Tool**: Vite
- **Linting**: ESLint with React plugins
- **Package Manager**: npm (based on package-lock.json)

## Common Commands

### Development
```bash
cd client
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint
```

### Package Management
```bash
cd client
npm install        # Install dependencies
npm ci            # Clean install from lock file
```

## File Structure

```
client/
├── src/           # Source code
├── public/        # Static assets
├── index.html     # HTML template
├── package.json   # Dependencies and scripts
├── vite.config.js # Vite configuration
├── eslint.config.js # ESLint configuration
└── README.md      # Project documentation
```

## Development Workflow

1. **Starting Development**: Always run `npm run dev` from the `client/` directory
2. **Code Quality**: Run `npm run lint` to check for linting issues
3. **Building**: Use `npm run build` to create production build
4. **Testing**: No test framework currently configured

## Code Conventions

- Uses React functional components
- ES6 modules (type: "module" in package.json)
- ESLint rules for React hooks and React refresh
- Vite for fast development and building

## Dependencies

### Main Dependencies
- React 19.1.0
- React DOM 19.1.0

### Dev Dependencies
- Vite with React plugin
- ESLint with React-specific plugins
- TypeScript types for React

## Notes for Agents

- This is a client-side only application
- No backend or API layer currently exists
- No testing framework is configured
- TypeScript types are available but project uses JavaScript
- Hot module replacement (HMR) is enabled via Vite
