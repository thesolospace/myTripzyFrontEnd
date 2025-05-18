import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import { useNavigation } from 'expo-router';
import { useAppSelector } from 'hooks/hooks';


const API_BASE_URL = "http://localhost:7777/api/auth";

export default function RegistrationScreen({ route }) {
  // Extract params passed from OTP verification  
  const { phoneNumber, deviceId, fcmToken } = route?.params || {};
  // Form state
  const {

    otp,
    showOTP,
    timeLeft,

    isChecked,
    user,
    token,
    verifyOtp,
   } = useAppSelector((state) => state.auth);
   console.log(token,"token")
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [gender, setGender] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation()
  // Form validation
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isFormValid = () => {
    return (
      firstName.trim() !== '' &&
      lastName.trim() !== '' &&
      isValidEmail(email) &&
      password.length >= 6 &&
      password === confirmPassword &&
      ['male', 'female', 'other'].includes(gender.toLowerCase())
    );
  };

  const handleRegister = async () => {
    if (!isFormValid()) {
      Toast.show({
        type: 'error',
        text1: 'Invalid Form',
        text2: 'Please check all fields are correctly filled',
      });
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/register`, {
        firstName,
        lastName,
        email,
        password,
        phoneNumber,
        gender: gender.toLowerCase(),
        deviceId,
        fcmToken,
        userType: 'regular'
      });

      if (response.data.success) {
        // Store token in secure storage (implement with AsyncStorage or SecureStore)
        // await SecureStore.setItemAsync('userToken', response.data.data.token);
        
        // Store user info in context or state management
        // userContext.setUser(response.data.data.user);
        
        Toast.show({
          type: 'success',
          text1: 'Registration Successful',
          text2: 'Welcome to our platform!',
        });
        
        navigation.navigate('Home');
      } else {
        Toast.show({
          type: 'error',
          text1: 'Registration Failed',
          text2: response.data.message,
        });
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
      console.log('Registration error:', error.message);
      Toast.show({
        type: 'error',
        text1: 'Registration Error',
        text2: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#A67C52" />
          </TouchableOpacity>
          <Text style={styles.title}>Complete Registration</Text>
        </View>

        <Text style={styles.subheading}>
          Please fill in your details to complete your account setup
        </Text>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>First Name*</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your first name"
              value={firstName}
              onChangeText={setFirstName}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Last Name*</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your last name"
              value={lastName}
              onChangeText={setLastName}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email*</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email address"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              style={[styles.input, { backgroundColor: '#f0f0f0' }]}
              value={phoneNumber}
              editable={false}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password*</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Create a password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons
                  name={showPassword ? 'eye-off' : 'eye'}
                  size={24}
                  color="#A67C52"
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Confirm Password*</Text>
            <TextInput
              style={styles.input}
              placeholder="Confirm your password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Gender*</Text>
            <View style={styles.genderContainer}>
              <TouchableOpacity
                style={[
                  styles.genderButton,
                  gender.toLowerCase() === 'male' && styles.selectedGender,
                ]}
                onPress={() => setGender('male')}
              >
                <Text
                  style={[
                    styles.genderText,
                    gender.toLowerCase() === 'male' && styles.selectedGenderText,
                  ]}
                >
                  Male
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[
                  styles.genderButton,
                  gender.toLowerCase() === 'female' && styles.selectedGender,
                ]}
                onPress={() => setGender('female')}
              >
                <Text
                  style={[
                    styles.genderText,
                    gender.toLowerCase() === 'female' && styles.selectedGenderText,
                  ]}
                >
                  Female
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[
                  styles.genderButton,
                  gender.toLowerCase() === 'other' && styles.selectedGender,
                ]}
                onPress={() => setGender('other')}
              >
                <Text
                  style={[
                    styles.genderText,
                    gender.toLowerCase() === 'other' && styles.selectedGenderText,
                  ]}
                >
                  Other
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            style={[
              styles.registerButton,
              {
                backgroundColor: isFormValid() ? '#A67C52' : '#A9A9A9',
              },
            ]}
            disabled={!isFormValid() || loading}
            onPress={handleRegister}
          >
            <Text style={styles.registerButtonText}>
              {loading ? 'Creating Account...' : 'Create Account'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContainer: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingTop: Platform.OS === 'ios' ? 40 : 20,
  },
  backButton: {
    padding: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#A67C52',
    marginLeft: 15,
  },
  subheading: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  form: {
    width: '100%',
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  passwordInput: {
    flex: 1,
    padding: 12,
    fontSize: 16,
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  genderButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  selectedGender: {
    backgroundColor: '#A67C52',
    borderColor: '#A67C52',
  },
  genderText: {
    color: '#333',
  },
  selectedGenderText: {
    color: '#fff',
  },
  registerButton: {
    width: '100%',
    padding: 16,
    borderRadius: 24,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  registerButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});