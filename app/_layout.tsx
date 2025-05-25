import React, { useCallback } from "react";
import {
 View,
 Text,
 StyleSheet,
 useWindowDimensions,
 ActivityIndicator,
 useColorScheme,
} from "react-native";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { PaperProvider } from "react-native-paper";
import { lightTheme, darkTheme } from "../theme";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "store";
import ToastMessage from "components/coreComponets/ToastMessage";
 // assuming `@` alias works now


// Prevent splash auto-hide until we're ready
SplashScreen.preventAutoHideAsync();

// ✅ Custom Header
const Header = () => (
 <SafeAreaView style={styles.header}>
  <Text style={styles.headerText}>Tripzy</Text>
 </SafeAreaView>
);

export default function RootLayout() {
 const colorScheme = useColorScheme();
 const theme = colorScheme === "dark" ? darkTheme : lightTheme;
 const { width } = useWindowDimensions();
 const isDesktop = width > 800;

 // ✅ Hide splash once layout is ready
 const onLayout = useCallback(async () => {
  await SplashScreen.hideAsync();
 }, []);

 return (
  <Provider store={store}>
   <PersistGate
    loading={<ActivityIndicator size="large" style={{ flex: 1 }} />}
    persistor={persistor}
   >
    <PaperProvider theme={theme}>
     {isDesktop && <Header />}

     <View
      style={[styles.container, isDesktop && styles.desktopContainer]}
      onLayout={onLayout}
     >
      <Stack>
       <Stack.Screen
        name="(tabs)"
        options={{ header: () => !isDesktop && <Header /> }}
       />
       <Stack.Screen
        name="createTrip"
        options={{ title: "Plan a Trip", headerShown: true }}
       />
       <Stack.Screen
        name="tripDetails"
        options={{ title: "Trip Details", headerShown: true }}
       />
       <Stack.Screen
        name="userRegistration"
        options={{ title: "Registration", headerShown: true }}
       />
       <Stack.Screen
        name="userProfile"
        options={{ title: "My Profile", headerShown: true }}
       />
       <Stack.Screen
        name="createPiXGoPost"
        options={{ title: "My Profile", headerShown: true }}
       />
        <Stack.Screen
        name="SeacrchList"
        options={{ title: "Search Results", headerShown: true }}
       />

       <Stack.Screen name="+not-found" options={{ title: "Not Found" }} />
      </Stack>

      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />

      <View style={styles.toastContainer}>
       <ToastMessage />
      </View>
     </View>
    </PaperProvider>
   </PersistGate>
  </Provider>
 );
}

const styles = StyleSheet.create({
 container: {
  flex: 1,
 },
 desktopContainer: {
  width: "45%",
  alignSelf: "center",
 },
 header: {
  backgroundColor: "#0D2927FF",
  padding: 16,
  alignItems: "center",
 },
 headerText: {
  color: "#fff",
  fontSize: 20,
  fontWeight: "bold",
  fontFamily: "roboto",
 },
 toastContainer: {
  position: "absolute",
  bottom: 0,
  alignSelf: "center",
  width: "100%",
  alignItems: "center",
 },
});
