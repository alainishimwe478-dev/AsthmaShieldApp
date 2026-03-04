# APK Build Fix Plan for AsthmaShield

## Problem
The APK is not running. This is typically because:
1. No native Android project exists (missing `android/` folder)
2. The JS bundle is not embedded in the APK
3. Build configuration issues

## Analysis Summary
✅ **Code Status**: All screen files are syntactically correct
- `App.tsx` - Properly configured with navigation
- `screens/LandingScreen.js` - ✅ OK
- `screens/SplashScreen.js` - ✅ OK  
- `screens/LoginScreen.js` - ✅ OK
- `screens/DashboardScreen.js` - ✅ OK

✅ **Configuration**: 
- Expo SDK 51 with React Native 0.74.5
- Android package: `com.asthmashield.app`
- Entry point: `index.js` → `App.tsx`

## Required Steps to Fix

### Step 1: Generate Native Android Project
The `android/` folder must be generated:
```bash
npx expo prebuild --platform android
```

### Step 2: Build APK with Embedded JS Bundle
After prebuild, create the APK:
```bash
# For debug APK (easier to test)
npx expo run:android --variant debug

# OR build release APK manually
cd android && gradlew assembleRelease
```

### Step 3: Alternative - Use EAS Build (Recommended)
```bash
# Install EAS CLI if needed
npm install -g eas-cli

# Login to Expo
eas login

# Build for Android
eas build -p android --profile preview
```

## Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| "android folder not found" | Run `npx expo prebuild --platform android` |
| "JS bundle not included" | Use `--variant release` or EAS build |
| "App crashes on launch" | Check Metro bundler is not required |
| "Permission denied" | Run terminal as Administrator |

## Verification Checklist
- [ ] Run `npx expo prebuild --platform android`
- [ ] Verify `android/` folder is created
- [ ] Build APK with `npx expo run:android`
- [ ] Test APK on device (not emulator for best results)

## Status: IN PROGRESS

