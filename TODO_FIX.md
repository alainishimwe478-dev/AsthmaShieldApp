# 🔧 Fix Plan: Remove Random Class Names

## Information Gathered

**Root Cause Identified:** Multiple component files contain random hashed class names (e.g., `0js5f12s`, `0owt7add`, `02rqfl5p`) instead of proper Tailwind utility classes. These are NOT Tailwind classes - they appear to be from copied browser-inspected code or a corrupted UI template.

**Files with Random Class Names (CORRUPTED):**
1. `src/components/LandingScreen.jsx` - ~80+ random class names
2. `src/components/Auth.jsx` - ~40+ random class names  
3. `src/App.tsx` - ~30+ random class names
4. `src/components/EnvironmentalDashboard.jsx` - ~50+ random class names

**Files with Proper Classes (CLEAN):**
- `src/components/DashboardScreen.jsx` - ✅ Uses proper Tailwind

## Fix Plan

### Step 1: Replace LandingScreen.jsx with proper Tailwind classes
- Replace all random class names like `0js5f12s` with proper Tailwind utilities
- Keep the existing layout and functionality intact

### Step 2: Replace Auth.jsx with proper Tailwind classes
- Replace all random class names like `02rqfl5p` with proper Tailwind utilities
- Maintain the same visual design

### Step 3: Replace App.tsx with proper Tailwind classes  
- Fix the loading spinner and navigation classes

### Step 4: Replace EnvironmentalDashboard.jsx with proper Tailwind classes
- Fix all the card and grid layouts

## Followup Steps
- Clear the build cache after fixes
- Test the application to ensure everything works
