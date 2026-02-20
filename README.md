# 🛡️ AsthmaShield - React Native App

Complete React Native conversion of AsthmaShield for Android APK generation.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd AsthmaShieldApp
npm install
```

### 2. Run on Android Emulator
```bash
npm start
# Press 'a' for Android
```

### 3. Generate APK

#### Install EAS CLI
```bash
npm install -g eas-cli
```

#### Login to Expo
```bash
eas login
```

#### Build APK
```bash
eas build -p android --profile preview
```

This generates `app-release.apk` ready for installation.

## 📱 Features

✅ Symptom logging with severity levels
✅ Peak flow tracking
✅ Notes for each entry
✅ Local storage (AsyncStorage)
✅ Clean Material Design UI
✅ Timestamp tracking
✅ Color-coded severity indicators

## 🎨 UI Components

- **Dashboard**: Scrollable list of symptom logs
- **Add Log Modal**: Bottom sheet for new entries
- **Severity Selector**: 1-5 scale with visual feedback
- **Peak Flow Input**: Numeric keyboard
- **Notes Field**: Multi-line text input

## 📦 Tech Stack

- React Native 0.74
- Expo SDK 51
- TypeScript
- AsyncStorage for local data
- Native components (no web dependencies)

## 🔧 Project Structure

```
AsthmaShieldApp/
├── App.tsx              # Main app component
├── app.json             # Expo configuration
├── eas.json             # Build configuration
├── package.json         # Dependencies
└── README.md            # This file
```

## 🌐 Next Steps

1. **Add Backend API**: Connect to FastAPI
2. **USSD Integration**: Africa's Talking API
3. **Push Notifications**: Expo Notifications
4. **Charts**: Victory Native for data visualization
5. **Authentication**: Expo Auth Session

## 📲 Install APK

After build completes:
1. Download APK from Expo dashboard
2. Transfer to Android device
3. Enable "Install from Unknown Sources"
4. Install and run

## 🎯 Academic Project Notes

This is a complete mobile conversion maintaining:
- Original React logic (useState, useEffect)
- Component structure
- Data models (SymptomLog interface)
- User experience flow

Perfect for academic demonstration of cross-platform development.
