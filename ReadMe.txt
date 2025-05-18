npx expo run:android

npx expo run:ios


npx expo prebuild
npx expo run:android


EAS Build Workflow (Recommended for SDK 47+ and custom native code)
------------------------------------------------------------------
1. Install EAS CLI globally  

   npm install -g eas-cli

2. Log in to Expo  

   eas login

3. Configure your project  

   eas build:configure  

   • Generates or updates eas.json with your build profiles.

4. Trigger an Android APK build  

   eas build --platform android --profile preview  

   • “preview” comes from your eas.json.  
   • Copy the URL from the terminal or Expo dashboard to download the .apk.

——

Local Prebuild + Gradle Workflow (for debugging native build errors locally)
-------------------------------------------------------------------------------
1. Generate native Android project 

   npx expo prebuild --platform android

2. Enter the android folder  

   cd android

3. Assemble a release APK  

   ./gradlew assembleRelease  

   • Outputs apk at android/app/build/outputs/apk/release/app-release.apk

——

Classic Expo CLI Workflow (Deprecated on Node 17+ and SDK 47+)
----------------------------------------------------------------
1. Install (legacy) Expo CLI globally  

   npm install -g expo-cli

2. Log in to Expo  

   expo login

3. Build an APK  

   expo build:android -t apk  
   • Returns a download link for a standalone .apk

