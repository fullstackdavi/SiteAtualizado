# Digital Soluctions Agency Website

## Overview

This is a modern digital agency website built with React, TypeScript, and Express. The application showcases services like website development, e-commerce, landing pages, branding, and digital marketing. It features a glassmorphism design system with dark futuristic aesthetics, neon blue accents, and smooth animations.

The project uses a full-stack architecture with a React frontend powered by Vite, an Express backend for API endpoints, and includes comprehensive UI components from shadcn/ui. The application is designed to be deployed on platforms like Replit with support for both development and production environments.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build Tool**
- React 18+ with TypeScript for type-safe component development
- Vite as the build tool and dev server for fast HMR and optimized production builds
- Wouter for lightweight client-side routing (alternatives: React Router was avoided for simplicity)
- TanStack Query (React Query) for server state management and data fetching

**Design System**
- Tailwind CSS for utility-first styling with custom design tokens
- shadcn/ui components (Radix UI primitives) for accessible, unstyled UI components
- Custom glassmorphism theme with dark backgrounds, neon blue accents (#00D9FF), and opacity-based glass effects
- Poppins font family from Google Fonts for typography hierarchy
- Responsive design with mobile-first breakpoints (768px for mobile/desktop)

**Component Structure**
- Page components in `client/src/pages/`: home.tsx, service.tsx, not-found.tsx
- Reusable section components: hero-section, about-section, services-section, etc.
- Shared UI components from shadcn/ui in `client/src/components/ui/`
- Path aliases configured: `@/` for client source, `@shared/` for shared code

**State Management**
- React Query for async server state with query invalidation
- Local component state with React hooks (useState, useEffect)
- Form state managed through react-hook-form with Zod validation

### Backend Architecture

**Server Framework**
- Express.js with TypeScript for RESTful API endpoints
- HTTP server creation using Node's native `http` module for potential WebSocket support
- Custom middleware for JSON parsing, URL encoding, and request logging

**API Structure**
- `/api/contact` - POST endpoint for contact form submissions
- `/api/services` - GET endpoint returning static service list
- `/api/health` - GET endpoint for health checks
- All API routes return JSON responses with consistent error handling

**Data Layer**
- In-memory storage implementation (`MemStorage` class) for development
- Interface-based storage design (`IStorage`) allowing future database implementations
- Schema definitions in `shared/schema.ts` using Drizzle ORM types and Zod validation

**Build System**
- Separate build processes for client (Vite) and server (esbuild)
- Server bundling with selective dependency bundling (allowlist for cold start optimization)
- Production build outputs to `dist/` directory with static file serving

### Data Storage Solutions

**Current Implementation**
- In-memory Map-based storage for users and contact messages
- UUID-based primary keys generated with crypto.randomUUID()
- No persistence layer in current implementation

**Prepared for Database Migration**
- Drizzle ORM schema definitions for PostgreSQL tables
- Schema includes: users table (id, username, password) and contact_messages table (id, name, email, phone, service, message)
- Drizzle configuration ready for Neon Database (@neondatabase/serverless)
- Migration folder structure prepared with drizzle-kit

**Schema Design**
- Type-safe schema definitions using drizzle-zod for runtime validation
- Separate Insert and Select types for create vs. read operations
- Validation schemas omit auto-generated fields (like id) for inserts

### External Dependencies

**Core Framework Dependencies**
- React 18+ ecosystem: react, react-dom, @tanstack/react-query
- Express.js for backend server
- TypeScript for type safety across the stack

**UI Component Libraries**
- Radix UI primitives (@radix-ui/*) for accessible headless components
- shadcn/ui configuration for styled component system
- lucide-react for icon components
- class-variance-authority for component variant management

**Form & Validation**
- react-hook-form for performant form state management
- Zod for runtime type validation and schema definition
- @hookform/resolvers for Zod integration with react-hook-form

**Styling & CSS**
- Tailwind CSS with PostCSS for utility-first styling
- autoprefixer for CSS vendor prefixing
- Custom CSS variables in index.css for theme tokens

**Development Tools**
- Vite plugins: @vitejs/plugin-react, Replit-specific plugins for dev experience
- tsx for TypeScript execution in development
- drizzle-kit for database schema management
- Font Awesome for icon library (loaded via CDN)

**Potential Database Integration** (configured but not active)
- @neondatabase/serverless for PostgreSQL database access
- drizzle-orm as the query builder and ORM
- connect-pg-simple for PostgreSQL session storage (session middleware prepared but not implemented)

**Build & Deployment**
- esbuild for server-side bundling
- Vite for client-side bundling
- Static file serving from Express in production
- Vercel deployment configuration available (see DEPLOY_VERCEL.md)

### Vercel Deployment (December 2025)

The project is configured for Vercel deployment with:
- `/api` folder with serverless functions (contact.ts, services.ts, health.ts)
- `vercel.json` configuration for build and rewrites
- `script/build-vercel.ts` for Vercel-specific build process
- Detailed instructions in `DEPLOY_VERCEL.md`

**Note:** The current serverless functions use in-memory storage. For production, consider using Vercel Postgres, Vercel KV, or Supabase for data persistence.

## Performance Optimizations (December 2025)

### React Optimizations
- **Code Splitting**: Pages (Home, ServicePage, NotFound) are lazy-loaded with React.lazy and Suspense
- **Component Memoization**: All section components wrapped with React.memo (MemoizedNavbar, MemoizedHeroSection, etc.)
- **useCallback/useMemo**: Event handlers and computed values optimized to prevent unnecessary re-renders
- **Throttled Scroll Handlers**: Scroll events throttled to 16ms intervals for 60fps performance

### Background Effects Optimization
- **Lazy-loaded Effects**: Bokeh particles, lens flares, glow orbs, and stars parallax load only when needed
- **Reduced Particle Counts**: Background particle systems optimized for performance
- **GPU Acceleration**: transform3d and will-change properties applied to animated elements
- **Viewport-based Rendering**: Effects only render when visible in viewport

### CSS Performance
- **CSS Containment**: `contain: paint` applied to sections for paint isolation
- **GPU-accelerated Animations**: All animations use transform/opacity for compositor-only rendering
- **Passive Event Listeners**: Scroll and touch events use passive listeners
- **Reduced Motion Support**: Animations respect prefers-reduced-motion media query

### HTML Optimizations
- **Critical Resource Preloading**: Google Fonts and Font Awesome preloaded
- **DNS Prefetch**: External domains pre-resolved for faster connections
- **Font Display Optimization**: fonts.googleapis.com preconnected for faster font loading