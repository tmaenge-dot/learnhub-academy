# Quick Start Guide - Shorthand Simplified

## Running the App Locally

### 1. Install Dependencies (First Time Only)
```bash
npm install
```

### 2. Start Development Server
```bash
npm start
```

This will:
- Start the Metro bundler
- Display a QR code in your terminal
- Open the Expo DevTools in your browser

### 3. Run on Your Device

#### Option A: Physical Device (Recommended)
1. Install **Expo Go** from:
   - [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent) (Android)
   - [Apple App Store](https://apps.apple.com/app/expo-go/id982107779) (iOS)

2. Scan the QR code:
   - **Android**: Use the Expo Go app scanner
   - **iOS**: Use the Camera app, then tap the notification

#### Option B: Android Emulator
```bash
npm run android
```
- Requires Android Studio with AVD installed
- Emulator must be running before executing command

#### Option C: iOS Simulator (Mac only)
```bash
npm run ios
```
- Requires Xcode installed
- Only works on macOS

#### Option D: Web Browser
```bash
npm run web
```
- Opens in your default browser
- Some features may work differently than native

## Making Changes

All files auto-reload when you save changes:
- **Screens**: `app/(tabs)/` directory
- **Data**: `data/` directory
- **Components**: `components/` directory
- **Styles**: Inline styles in each file

## Keyboard Shortcuts in Expo DevTools

- `r` - Reload app
- `m` - Toggle menu
- `d` - Open developer menu
- `i` - Run on iOS simulator
- `a` - Run on Android emulator
- `w` - Run in web browser
- `c` - Clear console

## Troubleshooting

### App Won't Start
```bash
# Clear cache and restart
rm -rf node_modules
npm install
npm start --clear
```

### Port Already in Use
```bash
# Start on different port
npm start -- --port 19001
```

### QR Code Not Working
- Ensure phone and computer are on the same WiFi network
- Try using tunnel mode: `npm start -- --tunnel`

### Simulator/Emulator Issues
```bash
# For iOS simulator
xcrun simctl shutdown all
xcrun simctl erase all

# For Android emulator
adb kill-server
adb start-server
```

## Testing the App Features

### Home Tab
- Scroll to see welcome content
- Read the key principles
- Check the getting started section

### Strokes Tab
- Use search to find specific strokes
- Filter by category (All, Consonants, Vowels, Blends)
- Tap on cards to view details

### Shortforms Tab
- Filter by category (Common, Business, Legal, Medical)
- Search for specific words
- View representations and descriptions

### Phrases Tab
- Search through 20+ phrases
- View usage examples
- Read writing instructions

### Outlines Tab
- Filter by difficulty (Beginner, Intermediate, Advanced)
- Search for words
- Study stroke breakdowns

### Q&A Tab
- Filter by category (Basics, Rules, Practice, Tips)
- Tap questions to expand answers
- Search for specific topics

## Next Steps

1. **Test all features** to ensure everything works
2. **Customize content** in the `data/` folder
3. **Update branding** in `app.json`
4. **Review deployment guide** in `DEPLOYMENT.md`

## Development Tips

- Use TypeScript for type safety
- Follow the existing code patterns
- Test on both iOS and Android if possible
- Keep data files organized and consistent

## Getting Help

- Check [Expo Documentation](https://docs.expo.dev/)
- Visit [Expo Forums](https://forums.expo.dev/)
- Review error messages in terminal/console

---

Happy coding! 🎉
