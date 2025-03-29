import React, { useEffect } from "react";
import { View, Text, StyleSheet, useWindowDimensions } from "react-native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "@/hooks/useColorScheme";
import "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { PaperProvider } from "react-native-paper";
import { lightTheme, darkTheme } from "../theme";

SplashScreen.preventAutoHideAsync();

// ✅ Custom Header for Tabs
const Header = () => (
 <SafeAreaView style={styles.header}>
  <Text style={styles.headerText}>Tripzy</Text>
 </SafeAreaView>
);

export default function RootLayout() {
 const colorScheme = useColorScheme();
 const theme = colorScheme === "dark" ? darkTheme : lightTheme;

 const [loaded] = useFonts({
  SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
 });

 const { width } = useWindowDimensions();
 const isDesktop = width > 800;

 useEffect(() => {
  if (loaded) {
   SplashScreen.hideAsync();
  }
 }, [loaded]);

 if (!loaded) {
  return null;
 }

 return (
  <PaperProvider theme={theme}>
   {isDesktop && <Header />}
   <View style={[styles.container, isDesktop && styles.desktopContainer]}>
    <Stack>
     {/* ✅ Tabs should have the custom `Header` */}
     <Stack.Screen
      name="(tabs)"
      options={{ header: () => !isDesktop && <Header /> }}
     />

     {/* ✅ Other screens should have default header with back button */}

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
      options={{ title: "Trip Details", headerShown: true }}
     />

     <Stack.Screen
      name="userProfile"
      options={{ title: "My Profile", headerShown: true }}
     />
       <Stack.Screen
      name="createPiXGoPost"
      options={{ title: "My Profile", headerShown: true }}
     />
     

     <Stack.Screen name="+not-found" options={{ title: "Not Found" }} />
    </Stack>
    <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
   </View>
  </PaperProvider>
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
});
