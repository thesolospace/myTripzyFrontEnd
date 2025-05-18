// RegistrationScreen.jsx
import React, { useEffect, useRef, useState } from "react";
import {
 View,
 Text,
 TextInput,
 TouchableOpacity,
 FlatList,
 StyleSheet,
 Dimensions,
 Image,
 Animated,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useDispatch, useSelector } from "react-redux";

import { router} from "expo-router";

// New register thunk

const { width, height } = Dimensions.get("window");
const images = [
 "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1350&q=80",
 "https://images.unsplash.com/photo-1514222134-b57cbb8ce073?auto=format&fit=crop&w=1350&q=80",
 "https://images.unsplash.com/photo-1515091943-9d5c0ad475af?auto=format&fit=crop&w=1350&q=80",
 "https://images.unsplash.com/photo-1512036849132-48508f294900?auto=format&fit=crop&w=1350&q=80",
];

const RegistrationScreen = () => {
 const [step, setStep] = useState(1);
 const flatListRef = useRef(null);
 const scrollX = useRef(new Animated.Value(0)).current;
 const dispatch = useDispatch();
 const { loading, error } = useSelector((state) => state.auth);
 const { phoneNumber } = useAppSelector((state) => state.auth);

 const [formData, setFormData] = useState({
  firstName: "",
  lastName: "",
  userType: "",
  email: "",
  phoneNumber: phoneNumber,
  password: "",
  gender: "",
 });

 const handleNext = () => {
  if (step < 3) setStep(step + 1);
 };

 const handleBack = () => {
  if (step > 1) setStep(step - 1);
 };

 // Auto-scroll the background carousel
 let currentIndex = useRef(0);
 useEffect(() => {
  const interval = setInterval(() => {
   if (!flatListRef.current) return;
   currentIndex.current += 1;
   if (currentIndex.current >= images.length) {
    currentIndex.current = 0;
    flatListRef.current.scrollToOffset({
     offset: 0,
     animated: false,
    });
   } else {
    flatListRef.current.scrollToOffset({
     offset: currentIndex.current * width,
     animated: true,
    });
   }
  }, 3000);
  return () => clearInterval(interval);
 }, []);

 // When the user completes step 3, dispatch the registration action
 const handleRegister = () => {
  dispatch(
   registerUser({
    ...formData,
    deviceId: "device_abc123",
    fcmToken: "fcm_token_xyz789",
   })
  )
   .unwrap()
   .then((res) => {
    // Registration successful.
    // You can navigate to the next screen (e.g., home or a welcome screen)
    console.log("handleRegister user Registed");
    // navigation.navigate('home');
    router.push("/");
   })
   .catch((err) => {
    console.log("Registration error:", err);
   });
 };

 return (
  <View style={styles.container}>
   <FlatList
    ref={flatListRef}
    data={images}
    horizontal
    pagingEnabled
    showsHorizontalScrollIndicator={false}
    keyExtractor={(_, i) => i.toString()}
    renderItem={({ item }) => (
     <Animated.View style={styles.imageContainer}>
      <Image source={{ uri: item }} style={styles.carouselImage} />
     </Animated.View>
    )}
   />
   <View style={styles.formContainer}>
    <Text style={styles.title}>Register</Text>
    <View style={styles.stepContainer}>
     {[1, 2, 3].map((num, index) => (
      <React.Fragment key={num}>
       <View
        style={[
         styles.stepCircle,
         step >= num ? styles.completedStep : styles.inactiveStep,
         step === num && styles.activeStep,
        ]}
       >
        <Text
         style={[
          styles.stepText,
          step >= num ? styles.completedStepText : styles.inactiveStepText,
         ]}
        >
         {num}
        </Text>
       </View>
       {index < 2 && (
        <View
         style={[styles.stepLine, step > index + 1 && styles.activeStepLine]}
        />
       )}
      </React.Fragment>
     ))}
    </View>

    {step === 1 && (
     <>
      <TextInput
       style={styles.input}
       placeholder="First Name"
       value={formData.firstName}
       onChangeText={(text) => setFormData({ ...formData, firstName: text })}
      />
      <TextInput
       style={styles.input}
       placeholder="Last Name"
       value={formData.lastName}
       onChangeText={(text) => setFormData({ ...formData, lastName: text })}
      />
      <View style={styles.pickerWrapper}>
       <View style={styles.pickerContainer}>
        <Picker
         selectedValue={formData.userType}
         onValueChange={(value) =>
          setFormData({ ...formData, userType: value })
         }
         style={styles.picker}
         dropdownIconColor="#A67C52"
        >
         <Picker.Item label="Select User Type" value="" />
         <Picker.Item label="Traveler" value="regular" />
         <Picker.Item label="Guide" value="group_planner" />
         <Picker.Item label="Local Guide" value="local_guide" />
        </Picker>
       </View>
      </View>
     </>
    )}

    {step === 2 && (
     <>
      <TextInput
       style={styles.input}
       placeholder="Email"
       keyboardType="email-address"
       value={formData.email}
       onChangeText={(text) => setFormData({ ...formData, email: text })}
      />
      {/* <TextInput
       style={styles.input}
       placeholder="Phone Number"
       keyboardType="phone-pad"
       value={formData.phoneNumber}
       onChangeText={(text) => setFormData({ ...formData, phoneNumber: text })}
      /> */}
     </>
    )}

    {step === 3 && (
     <>
      <TextInput
       style={styles.input}
       placeholder="Password"
       secureTextEntry
       value={formData.password}
       onChangeText={(text) => setFormData({ ...formData, password: text })}
      />
      <View style={styles.pickerWrapper}>
       <View style={styles.pickerContainer}>
        <Picker
         selectedValue={formData.gender}
         onValueChange={(value) => setFormData({ ...formData, gender: value })}
         style={styles.picker}
         dropdownIconColor="#A67C52"
        >
         <Picker.Item label="Select Gender" value="" />
         <Picker.Item label="Male" value="male" />
         <Picker.Item label="Female" value="female" />
         <Picker.Item label="Other" value="other" />
        </Picker>
       </View>
      </View>
     </>
    )}

    <View style={styles.buttonContainer}>
     {step > 1 && (
      <TouchableOpacity
       style={[styles.button, styles.smallButton]}
       onPress={handleBack}
      >
       <Text style={styles.buttonText}>Previous</Text>
      </TouchableOpacity>
     )}
     {step < 3 ? (
      <TouchableOpacity style={[styles.button]} onPress={handleNext}>
       <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
     ) : (
      <TouchableOpacity
       style={[styles.button, styles.registerButton]}
       onPress={handleRegister}
       disabled={loading}
      >
       <Text style={styles.buttonText}>
        {loading ? "Registering..." : "Register"}
       </Text>
      </TouchableOpacity>
     )}
    </View>
    {error && <Text style={styles.errorText}>{error}</Text>}
   </View>
  </View>
 );
};

const styles = StyleSheet.create({
 container: { flex: 1 },
 imageContainer: {
  width,
  height: height * 0.6,
  alignItems: "center",
  justifyContent: "center",
 },
 carouselImage: { width, height: height * 0.6, resizeMode: "cover" },
 formContainer: {
  position: "absolute",
  bottom: 0,
  width: "100%",
  height: height * 0.6,
  backgroundColor: "#fff",
  padding: 20,
  borderTopLeftRadius: 30,
  borderTopRightRadius: 30,
  alignItems: "center",
 },
 title: {
  fontSize: 26,
  fontWeight: "bold",
  marginBottom: 20,
  textAlign: "center",
 },
 input: {
  backgroundColor: "#fff",
  borderRadius: 12,
  padding: 14,
  marginBottom: 12,
  width: "90%",
  borderWidth: 1.5,
  borderColor: "#ccc",
 },
 stepContainer: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-evenly",
  marginBottom: 20,
  width: "90%",
 },
 stepCircle: {
  width: 30,
  height: 30,
  borderRadius: 20,
  alignItems: "center",
  justifyContent: "center",
  elevation: 5,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
 },
 inactiveStep: {
  backgroundColor: "#ccc",
 },
 activeStep: {
  backgroundColor: "#A67C52",
  transform: [{ scale: 1.2 }],
 },
 completedStep: {
  backgroundColor: "#A67C52",
 },
 stepText: {
  fontSize: 16,
  fontWeight: "bold",
 },
 inactiveStepText: {
  color: "#fff",
 },
 completedStepText: {
  color: "#fff",
  fontSize: 18,
 },
 stepLine: {
  width: 40,
  height: 4,
  backgroundColor: "#ccc",
  marginHorizontal: 5,
  borderRadius: 2,
 },
 activeStepLine: {
  backgroundColor: "#A67C52",
  width: 45,
 },
 buttonContainer: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  marginTop: 20,
  paddingHorizontal: 20,
 },
 smallButton: {
  backgroundColor: "#A67C52",
  paddingVertical: 10,
  paddingHorizontal: 15,
  borderRadius: 10,
  marginHorizontal: 10,
  alignItems: "center",
  justifyContent: "center",
 },
 button: {
  backgroundColor: "#A67C52",
  paddingVertical: 12,
  paddingHorizontal: 30,
  borderRadius: 16,
  alignItems: "center",
  justifyContent: "center",
 },
 registerButton: {
  backgroundColor: "green",
 },
 buttonText: {
  color: "#FFF",
  fontSize: 16,
  fontWeight: "600",
 },
 pickerWrapper: {
  width: "100%",
  marginBottom: 15,
 },
 pickerContainer: {
  backgroundColor: "#fff",
  borderRadius: 10,
  borderWidth: 1.5,
  borderColor: "#ccc",
  width: "90%",
  alignSelf: "center",
 },
 picker: {
  width: "100%",
  height: 50,
  color: "#333",
  borderRadius: 24,
 },
 errorText: {
  color: "red",
  marginTop: 10,
 },
});

export default RegistrationScreen;
