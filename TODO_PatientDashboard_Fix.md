# PatientDashboardHome Fix Plan

## Issues to Fix:
1. Remove all numeric classNames (0m0cgthw, 0r290mry, etc.)
2. Make useOutletContext nullable-safe
3. Wrap hospital filtering with useMemo
4. Replace `any` with proper User interface

## Implementation Steps:
- [x] 1. Read and analyze PatientDashboardHome.tsx
- [ ] 2. Fix imports (add useMemo)
- [ ] 3. Add proper User interface
- [ ] 4. Update OutletContext with proper User type
- [ ] 5. Make useOutletContext nullable-safe
- [ ] 6. Wrap nearbyHospitals with useMemo
- [ ] 7. Wrap hospitalsForAI with useMemo
- [ ] 8. Remove all numeric classNames from all elements

## Changes Summary:
- Import useMemo from React
- Add User interface with province and name
- Update OutletContext to use User instead of any
- Change useOutletContext<OutletContext>() to useOutletContext<OutletContext | null>()
- Use context?.user?.province ?? "Kigali" for safety
- Wrap hospital filtering logic with useMemo
- Remove all classNames starting with numbers
