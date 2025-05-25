import { StyleSheet, Image, Platform, Text } from "react-native";
import CreateTripScreen from "../createTrip";
import { useAppSelector } from "hooks/hooks";
import LoginScreen from "screen/commonScreens/LoginScreen";

export default function TabTwoScreen3() {
 const token = useAppSelector((state) => state.auth.token);
 return (
  <>
   {token ? (
    <>
     <CreateTripScreen />
    </>
   ) : (
    <>
     <LoginScreen />
    </>
   )}
  </>
 );
}

const styles = StyleSheet.create({});
