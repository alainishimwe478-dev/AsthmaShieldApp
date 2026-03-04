# TODO: Watch Demo Button Implementation

## Task
Add functionality to the "Watch Demo" button in LandingPageNew.tsx to open a video modal.

## Steps Completed:
- [x] Read and understand the LandingPageNew.tsx component
- [x] Verify video file exists (assets/videoplayback.mp4)
- [x] Identify the Watch Demo button location
- [x] Add demoOpen state variable
- [x] Update Watch Demo button with onClick handler
- [x] Add video modal component before ProfessionalFooter

## Implementation Details:
1. State: `const [demoOpen, setDemoOpen] = useState(false);`
2. Button update: Add `onClick={() => setDemoOpen(true)}`
3. Modal: Use YouTube iframe with asthma treatment video (ID: p8R7N9qj3ZM)

## Changes Made:
- Replaced local video with YouTube iframe embedding asthma patient treatment video
- Added descriptive text about the video content
- Video autoplays when modal opens

