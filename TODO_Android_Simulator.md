# Android Simulator Build Plan for AsthmaShield

## Steps to Complete

### Step 1: Run Expo Prebuild
- [ ] Ensure native Android project is properly configured
- Command: `npx expo prebuild --platform android --clean`

### Step 2: Build Debug APK with Embedded JS
- [ ] Build debug APK with bundled JS (no Metro required)
- Command: `npx expo run:android --variant debug`
- Or: `cd android && gradlew assembleDebug`

### Step 3: Install and Run on Android Simulator
- [ ] Start Android emulator
- [ ] Install APK to emulator
- [ ] Verify app launches correctly

## Status: PENDING

