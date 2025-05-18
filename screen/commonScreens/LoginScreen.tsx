import React, { useEffect, useRef } from "react";
import {
 StyleSheet,
 Image,
 Text,
 Animated,
 FlatList,
 View,
 Dimensions,
 Keyboard,
 TouchableOpacity,
 KeyboardAvoidingView,
 Platform,
 ScrollView,
} from "react-native";
import PhoneInput from "react-native-international-phone-number";
import Checkbox from "expo-checkbox";
import { LogIn } from "lucide-react-native";
import { OtpInput } from "react-native-otp-entry";
import { useNavigation } from "expo-router";
import {
 requestOtp,
 verifyUserOtp,
 setPhoneNumber,
 setOtp,
 setShowOTP,
 setTimeLeft,
 setIsChecked,
 resetAuth,
} from "../../store/slices/authSlice";
import { useAppDispatch, useAppSelector } from "hooks/hooks";
import { getTripList } from "store/slices/homeScreenSlice";


const images = [
 "https://images.unsplash.com/photo-1512036849132-48508f294900?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
 "https://plus.unsplash.com/premium_photo-1667668669593-f32efb6f2975?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
 "https://images.unsplash.com/photo-1515091943-9d5c0ad475af?q=80&w=1535&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
 "https://images.unsplash.com/photo-1514222134-b57cbb8ce073?q=80&w=1536&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

const { width } = Dimensions.get("window");
const IMAGE_HEIGHT = width * 1.2;

export default function LoginScreen() {
 const navigation = useNavigation();
 const dispatch = useAppDispatch();
 const flatListRef = useRef<FlatList<string> | null>(null);
 const scrollX = useRef(new Animated.Value(0)).current;
 const [index, setIndex] = React.useState(0);
 const [selectedCountry, setSelectedCountry] = React.useState(+91);

 const {
  phoneNumber,
  otp,
  showOTP,
  timeLeft,
  loading,
  isChecked,
  user,
  token,
  verifyOtp,
  isNewUser,
 } = useAppSelector((state) => state.auth);
 console.log(
  phoneNumber,
  otp,
  showOTP,
  timeLeft,
  loading,
  isChecked,
  user,
  token,
  verifyOtp,otp,
  "check Redux response"
 );
 const deviceId = "device-1www23";
 const fcmToken = "fcm-token-12w3";

 // Auto-scroll images
 useEffect(() => {
  const interval = setInterval(() => {
   try {
    let nextIndex = (index + 1) % images.length;
    setIndex(nextIndex);
    flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
   } catch (error) {
    console.warn("FlatList Scroll Error:", error);
   }
  }, 6000);
  return () => clearInterval(interval);
 }, [index]);

 useEffect(() => {
  if (token) {
   setTimeout(() => {
    if (isNewUser) {
     navigation.navigate("userRegistration");

     console.log("userRegistration response");
    } else {
     navigation.navigate("index");
    }
   }, 500);
  }
  if (isNewUser) {
   navigation.navigate("userRegistration");

   console.log("userRegistration response");
  }
 }, [token, user, navigation, isNewUser]);

 const handleInputValue = (value:any) => {
  if (value.length === 12) Keyboard.dismiss();
  dispatch(setPhoneNumber(value));
 };

 const handleResendOTP = () => {
  dispatch(setTimeLeft(60));
  dispatch(requestOtp(phoneNumber.replace(/\s+/g, "")));
 };

 const handleEditMobileNumber = () => {
  dispatch(resetAuth());
 };

 const isPhoneNumberValid = phoneNumber.length === 12;

 return (
  <KeyboardAvoidingView
   behavior={Platform.OS === "ios" ? "padding" : "height"}
   style={{ flex: 1 }}
  >
   <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
    <View>
     <FlatList
      ref={flatListRef}
      data={images}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      keyExtractor={(_, i) => i.toString()}
      renderItem={({ item }) => (
       <Animated.View
        style={{ width, alignItems: "center", justifyContent: "center" }}
       >
        <Image source={{ uri: item }} style={{ width, height: IMAGE_HEIGHT }} />
       </Animated.View>
      )}
      onScroll={Animated.event(
       [{ nativeEvent: { contentOffset: { x: scrollX } } }],
       { useNativeDriver: false }
      )}
      scrollEventThrottle={16}
     />

     <View style={[styling.container, { height: width }]}>
      <View
       style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
       <LogIn color={"#A67C52"} style={{ marginRight: width / 6 }} />
       <Text style={styling.title}>Login</Text>
      </View>

      {!showOTP ? (
       <>
        <Text style={styling.subtitle}>Please enter your phone number</Text>
        <PhoneInput
         defaultCountry="IN"
         onChangePhoneNumber={handleInputValue}
         selectedCountry={selectedCountry}
         onChangeSelectedCountry={setSelectedCountry}
         placeholder="Enter Phone Number"
         containerStyle={{ marginTop: 16 }}
        />
        <View style={styling.checkboxContainer}>
         <Checkbox
          value={isChecked}
          onValueChange={() =>
           isPhoneNumberValid && dispatch(setIsChecked(!isChecked))
          }
         />
         <Text style={styling.checkboxText}>
          I agree to the terms and conditions
         </Text>
        </View>
        <TouchableOpacity
         style={[
          styling.button,
          {
           backgroundColor:
            isPhoneNumberValid && isChecked ? "#A67C52" : "#A9A9A9",
          },
         ]}
         disabled={!isPhoneNumberValid || !isChecked || loading}
         onPress={() =>{ dispatch(requestOtp(phoneNumber.replace(/\s+/g, "")))
          dispatch(getTripList())
         }}
        >
         <Text style={styling.buttonText}>
          {loading ? "Processing..." : "Request OTP"}
         </Text>
        </TouchableOpacity>
       </>
      ) : (
       <>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
         <Text style={styling.subtitle}>Please enter the OTP</Text>
         {timeLeft !== 0 && (
          <Text
           style={[
            styling.subtitle,
            { color: "#A67C52", fontSize: 18, marginLeft: 10 },
           ]}
          >
           {timeLeft}s
          </Text>
         )}
        </View>
        <View style={{ width: "80%", marginTop: 16 }}>
         <OtpInput
          numberOfDigits={6}
          focusColor="#A67C52"
          autoFocus={false}
          hideStick={true}
          type="numeric"
          onTextChange={(text) => dispatch(setOtp(text))}
         />
        </View>
        <View
         style={{
          display: "flex",
          flexDirection: "row",
          width: "80%",
          marginTop: 16,
         }}
        >
         <TouchableOpacity onPress={handleEditMobileNumber}>
          <Text style={styling.linkText}>Edit Mobile Number?</Text>
         </TouchableOpacity>
         {timeLeft === 0 && (
          <TouchableOpacity onPress={handleResendOTP}>
           <Text style={styling.linkText}>Resend OTP?</Text>
          </TouchableOpacity>
         )}
        </View>
        <TouchableOpacity
         style={[
          styling.button,
          {
           backgroundColor: otp.length === 6 ? "#A67C52" : "#A9A9A9",
           marginTop: 16,
          },
         ]}
         disabled={otp.length !== 6 || loading}
         onPress={() => {
          dispatch(
           verifyUserOtp({
            phoneNumber: phoneNumber.startsWith("+")
             ? phoneNumber
             : `+91${phoneNumber.replace(/\s+/g, "")}`,
            otp,
            verifyOtp,
            deviceId,
            fcmToken,
            navigation,
           })
          );
         }}
        >
         <Text style={styling.buttonText}>
          {loading ? "Verifying..." : "SUBMIT"}
         </Text>
        </TouchableOpacity>
       </>
      )}
     </View>
    </View>
   </ScrollView>
  </KeyboardAvoidingView>
 );
}

const styling = StyleSheet.create({
 container: {
  position: "absolute",
  width: "100%",
  backgroundColor: "#F5F5F5",
  borderTopLeftRadius: 36,
  borderTopRightRadius: 36,
  marginTop: width * 1.1,
  alignItems: "center",
  padding: 20,
 },
 title: {
  position: "absolute",
  color: "#A67C52",
  fontSize: 24,
  fontWeight: "500",
  padding: 8,
  marginLeft: 24,
 },
 subtitle: {
  color: "#0D2927",
  fontWeight: "500",
  marginBottom: 8,
  top: 16,
  padding: 8,
 },
 checkboxContainer: {
  flexDirection: "row",
  alignItems: "center",
  marginVertical: 16,
  padding: 8,
 },
 checkboxText: {
  marginLeft: 10,
  color: "#0D2927",
 },
 linkText: {
  color: "#A67C52",
  fontWeight: "500",
 },
 button: {
  width: "50%",
  padding: 12,
  borderRadius: 24,
  alignItems: "center",
 },
 buttonText: {
  color: "#FFF",
  fontSize: 16,
  fontWeight: "600",
 },
});
