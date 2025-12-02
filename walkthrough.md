# Masonry Dashboard Walkthrough

I have successfully converted the masonry layout image into a Next.js application.

## Changes Implemented

### 1. Project Initialization
- Initialized a new Next.js 14 application with TypeScript and App Router.
- Configured global styles in `src/app/globals.css` to match the design's color palette (Light Grey/Blue theme).
- Set up `Inter` font in `src/app/layout.tsx`.

### 2. Component Architecture
I created a modular component system:
- **`Header`**: Contains the logo, search bar, and action icons.
- **`MasonryGrid`**: A responsive layout wrapper using CSS columns to achieve the masonry effect.
- **`Card`**: A reusable base component for consistent styling (shadows, rounded corners).
- **Specific Cards**: Implemented individual cards for:
    - Weather (Custom gradient background)
    - Prayer Times
    - News Headlines (with icons)
    - Gold Prices & Charts
    - Earthquake Info
    - Cinema Schedules
    - Transport (MRT) Schedules

### 3. Styling
- Used **CSS Modules** for component-level styling to ensure modularity and avoid conflicts.
- Implemented a responsive design that adapts the column count from 4 (desktop) to 1 (mobile).

## Verification Results

### Automated Tests
- **Build**: `npm run build` passed successfully.
- **Lint**: `npm run lint` passed with no errors.

### Manual Verification
- The layout matches the provided image structure.
- The masonry grid correctly places items of varying heights.
- Icons are implemented using `react-icons`.

## How to Run
1. Install dependencies: `npm install`
2. Run the development server: `npm run dev`
3. Open [http://localhost:3000](http://localhost:3000)
