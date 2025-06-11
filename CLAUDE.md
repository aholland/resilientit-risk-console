# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `pnpm dev` - Start development server (runs on host 0.0.0.0:5173 for all network interfaces)
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build

### Code Quality
- `pnpm check` - Run TypeScript and Svelte checks
- `pnpm check:watch` - Run checks in watch mode

### Bundle Analysis
- `pnpm analyze` - Generate bundle analysis report as bundle-analysis.html using source-map-explorer
- Build also generates stats.html with rollup visualizer

## Architecture

This is a SvelteKit application for risk management with the following key architecture:

### Core Data Model
The application centers around a **Risk Management System** with these primary entities:
- **Risk**: Core entity with likelihood/impact scoring, owner assignment, treatment options, and associated controls
- **Control**: Security controls with policies, grouped by risk categories
- **Owner**: Risk owners for assignment and accountability
- **Policy**: Governance policies linked to controls

### Data Flow
- JSON data files in `src/lib/data/` provide the data source
- TypeScript classes in `src/lib/types/` handle data transformation and business logic
- Risk constructor takes likelihood/impact and creates RiskScore instances with 5-point scale
- Controls and Owners are mapped via constructor dependencies

### Key Components
- **RiskMatrixPanel**: Interactive 5x5 risk matrix with likelihood/impact visualization
- **RiskMatrixSquare**: Individual matrix cells with color-coded risk levels
- **RiskPanel/RiskList**: Risk management interface with filtering and selection
- **ControlPanel**: Control management interface

### Risk Scoring System
- Uses 5-point scale for likelihood and impact
- RiskScore class calculates risk levels: Low, Moderate, High, Severe
- Color mapping via RiskColoursMap utility (low=green, moderate=yellow, high=red, severe=dark)
- Status-based coloring for implementation progress

### UI Architecture
- Tailwind CSS for styling with custom theme system
- Responsive layout with collapsible sidebar navigation
- Role-based navigation (admin vs client access)
- Uses svelte-themes for theme management

### Build Configuration
- Vite with manual chunk splitting for optimal loading
- Separate vendor chunks for major dependencies (SvelteKit, Svelte, TailwindCSS)
- Source maps enabled, minification disabled for debugging
- Configured for Vercel deployment with Node.js 24.x