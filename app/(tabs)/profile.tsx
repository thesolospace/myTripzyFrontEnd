import { StyleSheet, Text, View } from "react-native";
import React from "react";


import ProfileScreen from "../userProfile";
import { useAppSelector } from "hooks/hooks";
import LoginScreen from "screen/commonScreens/LoginScreen";

const profile = () => {
 const token = useAppSelector((state) => state.auth.token);

 console.log(token, "token");
 return (
  <>
   {token ? (
    <>
     <ProfileScreen />
    </>
   ) : (
    <>
     <LoginScreen />
    </>
   )}
  </>
 );
};

export default profile;

const styles = StyleSheet.create({});
