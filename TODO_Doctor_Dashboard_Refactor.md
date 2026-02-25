# Doctor Dashboard React Router Refactor Plan

## Objective
Refactor the Doctor Dashboard to use React Router nested layout pattern (DoctorLayout with Outlet)

## Implementation Steps

### Step 1: Create Directory Structure
- Create `src/components/doctor/` directory

### Step 2: Create Layout Component
- [ ] `src/components/doctor/DoctorLayout.tsx` - Main layout with sidebar navigation

### Step 3: Create Page Components
- [ ] `src/components/doctor/OverviewPage.tsx` - Dashboard overview with stats and charts
- [ ] `src/components/doctor/PatientsPage.tsx` - Patients list table
- [ ] `src/components/doctor/AlertsPage.tsx` - Risk alerts list
- [ ] `src/components/doctor/ReportsPage.tsx` - Reports and analytics

### Step 4: Update Existing Components
- [ ] Move/update `ConsultationPage.tsx` to work as nested route
- [ ] Update `PatientDetailModal.tsx` imports if needed

### Step 5: Update App.tsx
- [ ] Add React Router setup
- [ ] Configure nested routes for doctor dashboard

## Files to Create:
1. src/components/doctor/DoctorLayout.tsx
2. src/components/doctor/OverviewPage.tsx
3. src/components/doctor/PatientsPage.tsx
4. src/components/doctor/AlertsPage.tsx
5. src/components/doctor/ReportsPage.tsx

## Files to Modify:
1. src/App.tsx
2. src/components/ConsultationPage.tsx (may need updates)

## Follow-up Steps:
- Test the implementation
- Verify navigation works correctly
- Ensure dark mode toggle works across all pages
