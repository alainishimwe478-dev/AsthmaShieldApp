# DONE: Implement NavLink with dynamic className for Sidebar

## Task Overview
Use NavLink with dynamic className and "end" prop on Overview route to make sidebar links properly active.

## Files Edited:
1. `src/components/DoctorDashboard.tsx`

## Implementation Completed:
- [x] 1. Import NavLink from react-router-dom
- [x] 2. Replace NavItem components with NavLink
- [x] 3. Add dynamic className using isActive callback
- [x] 4. Add "end" prop to the Overview route (/doctor/overview)
- [x] 5. Define baseClass, activeClass, inactiveClass styles
- [x] 6. Added 5 NavLinks: Overview, Patients List, Risk Alerts, Consultations, Reports
