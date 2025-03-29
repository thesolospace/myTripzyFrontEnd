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
} from "react-native";
import { useEffect, useRef, useState } from "react";
import PhoneInput from "react-native-international-phone-number";
import Checkbox from "expo-checkbox";
import { LogIn } from "lucide-react-native";
import { OtpInput } from "react-native-otp-entry";

const images = [
  "https://images.unsplash.com/photo-1512036849132-48508f294900?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1667668669593-f32efb6f2975?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1515091943-9d5c0ad475af?q=80&w=1535&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1514222134-b57cbb8ce073?q=80&w=1536&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
];

const { width } = Dimensions.get("window");
const IMAGE_HEIGHT = width * 1.2;

export default function Profile() {
  const flatListRef = useRef<FlatList<string>>(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [index, setIndex] = useState(0);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [otp, setOtp] = useState(""); // State to track OTP input

  // Auto-scroll images
  useEffect(() => {
    const interval = setInterval(() => {
      let nextIndex = (index + 1) % images.length;
      setIndex(nextIndex);
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
    }, 6000);

    return () => clearInterval(interval);
  }, [index]);

  // Timer logic
  useEffect(() => {
    if (showOTP && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [showOTP, timeLeft]);

  // Handle phone number input
  const handleInputValue = (phoneNumber: string) => {
    if (phoneNumber?.length === 12) {
      Keyboard.dismiss();
    }
    setInputValue(phoneNumber);
  };

  // Handle country selection
  const handleSelectedCountry = (country: any) => {
    setSelectedCountry(country);
  };

  // Handle resend OTP
  const handleResendOTP = () => {
    setTimeLeft(60); // Reset timer
  };
  const handleEditMobileNumber = () => {
    setShowOTP(false); 
    setIsChecked(false)// Reset timer
  };

  // Validate phone number length
  const isPhoneNumberValid = inputValue.length === 12;

  return (
    <View>
      <FlatList
        ref={flatListRef}
        data={images}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => (
          <Animated.View style={{ width, alignItems: "center", justifyContent: "center" }}>
            <Image source={{ uri: item }} style={{ width, height: IMAGE_HEIGHT }} />
          </Animated.View>
        )}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      />

      <View style={styling.container}>
        <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
          <LogIn color={"#A67C52"} style={{ marginRight: width / 6 }} />
          <Text style={styling.title}>Login</Text>
        </View>

        {!showOTP ? (
          <>
            <Text style={styling.subtitle}>Please enter your phone number</Text>

            <PhoneInput
              value={inputValue}
              defaultCountry="IN"
              onChangePhoneNumber={handleInputValue}
              selectedCountry={selectedCountry}
              onChangeSelectedCountry={handleSelectedCountry}
              placeholder="Enter Phone Number"
            />

            <View style={styling.checkboxContainer}>
              <Checkbox
                value={isChecked}
                onValueChange={() =>isPhoneNumberValid&& setIsChecked(!isChecked)}
         
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
              disabled={!isPhoneNumberValid || !isChecked}
              onPress={() => setShowOTP(true)}
            >
              <Text style={styling.buttonText}>Request OTP</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={styling.subtitle}>Please enter the OTP</Text>
              {timeLeft !== 0 && (
                <Text style={[styling.subtitle, { color: "#A67C52", fontSize: 18 }]}>
                  {timeLeft}s
                </Text>
              )}
            </View>

            <View style={{ width: "80%", marginTop: 8 }}>
              <OtpInput
                numberOfDigits={6}
                focusColor="#050605"
                autoFocus={false}
                hideStick={true}
                type="numeric"
                onTextChange={(text) => setOtp(text)} // Track OTP input
              />
            </View>

            <View style={{ display: "flex", flexDirection: "row", width: "80%" }}>
              <TouchableOpacity style={{ marginVertical: 8, marginRight: "auto" }}  onPress={handleEditMobileNumber}>
                <Text style={styling.checkboxText}>Edit Mobile Number?</Text>
              </TouchableOpacity>

              {timeLeft === 0 && (
                <TouchableOpacity
                  style={{ marginVertical: 8, marginLeft: "auto" }}
                  onPress={handleResendOTP}
                >
                  <Text style={styling.checkboxText}>Resend OTP?</Text>
                </TouchableOpacity>
              )}
            </View>

            <TouchableOpacity
              style={[
                styling.button,
                {
                  backgroundColor: otp.length === 6 ? "#A67C52" : "#A9A9A9",
                  marginTop: 8,
                },
              ]}
              disabled={otp.length !== 6}
              onPress={() => {
                // Handle OTP submission
                console.log("OTP Submitted:", otp);
              }}
            >
              <Text style={styling.buttonText}>SUBMIT</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
}

const styling = StyleSheet.create({
  container: {
    position: "absolute",
    width: "100%",
    backgroundColor: "#F5F5F5",
    height: width,
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
    marginBottom: 16,
    top: 16,
    padding: 8,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    padding: 8,
  },
  checkboxText: {
    marginLeft: 10,
    color: "#0D2927",
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