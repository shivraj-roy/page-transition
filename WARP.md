# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a Next.js 15.5.4 project focused on page transition animations, built with React 19.1.0. The project uses the new App Router architecture and is structured as a modern Next.js application with custom styling and font optimization.

## Development Commands

### Core Development
```bash
# Start development server (opens at http://localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server (must run build first)
npm run start
```

### Package Management
```bash
# Install dependencies
npm install

# Install new package
npm install <package-name>

# Install dev dependency
npm install <package-name> --save-dev
```

## Architecture & Structure

### App Router Structure
- Uses Next.js App Router (not Pages Router)
- Entry point: `src/app/page.js`
- Root layout: `src/app/layout.js` (includes font configuration and global metadata)
- Global styles: `src/app/globals.css`
- Component-specific styles: `src/app/page.module.css`

### Font Configuration
- Uses Geist Sans and Geist Mono fonts via `next/font/google`
- Font variables are configured in layout.js and available throughout the app
- CSS custom properties: `--font-geist-sans` and `--font-geist-mono`

### Styling Approach
- CSS Modules for component-specific styles
- Global CSS for base styles and design tokens
- CSS custom properties for theming (light/dark mode support)
- Responsive design with mobile-first approach

### Path Configuration
- Uses `@/*` alias pointing to `./src/*` (configured in jsconfig.json)
- Import components and utilities with `@/` prefix for cleaner imports

## Key Technical Details

### Dark Mode Support
- Automatic dark mode detection via `prefers-color-scheme`
- CSS custom properties for theme-aware colors
- Color variables: `--background`, `--foreground`, `--gray-rgb`

### Image Optimization
- Uses Next.js `Image` component for optimized image loading
- Static assets in `/public/` directory
- SVG icons: next.svg, vercel.svg, file.svg, globe.svg, window.svg

### Development Considerations
- Hot reload enabled in development mode
- CSS changes reflect immediately
- Component changes trigger fast refresh

## Animation Context
Given the project name "page-transition", this codebase is likely intended for implementing page transition animations. When adding animation features:

- Consider using CSS transitions/animations or libraries like Framer Motion
- Leverage Next.js App Router's layout system for persistent animations
- Use CSS custom properties for consistent timing and easing functions
- Implement animations that respect `prefers-reduced-motion` for accessibility