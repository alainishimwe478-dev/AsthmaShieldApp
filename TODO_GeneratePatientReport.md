# TODO: Add Generate Patient Report Feature to ManagePatientsPage

## Task Overview
Add a "Generate New Patient Report" form to the Manage Patients Page so admins can quickly create reports for selected patients.

## Steps to Complete

- [x] 1. Add state variables for form modal (showReportForm, selectedPatients, reportType)
- [x] 2. Add "Generate Report" button near Export/Add Patient buttons
- [x] 3. Add Report Form Modal with patient selection and report type
- [x] 4. Implement PDF generation functionality using jsPDF
- [x] 5. Test the implementation

## Files Modified
- src/components/admin/ManagePatientsPage.tsx

## Dependencies
- jsPDF (for PDF generation) - Already imported

## Features Added
- Orange "Generate Report" button in the header
- Modal with multi-select patient dropdown
- Report type selection (Daily/Weekly/Monthly)
- Full PDF generation with:
  - Header with AsthmaShield branding
  - Patient details (name, ID, age, status, district, AQI, email, phone, assigned doctor, last visit)
  - Summary statistics page with status counts and average AQI
  - Automatic file download

