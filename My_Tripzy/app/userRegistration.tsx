import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ImageBackground,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import Animated, { Easing, useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as ImagePicker from 'expo-image-picker';

// Types remain the same (omitted for brevity)

const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
  const [formData, setFormData] = useState<RegisterFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    userType: '',
    gender: '',
    profileImage: null,
  });

  const [errors, setErrors] = useState<Partial<RegisterFormData>>({});
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const fadeAnim = useSharedValue(0);

  useEffect(() => {
    fadeAnim.value = withTiming(1, { duration: 1000, easing: Easing.ease });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: fadeAnim.value,
    transform: [{ translateY: withTiming(0, { duration: 800 }) }],
  }));

  const handleInputChange = (field: keyof RegisterFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = () => {
    const newErrors: Partial<RegisterFormData> = {};
    
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.phoneNumber) newErrors.phoneNumber = 'Phone number is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (!formData.userType) newErrors.userType = 'Please select a user type';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = () => {
    if (validateForm()) {
      console.log('Registering with:', formData);
      // navigation.navigate('Home');
    }
  };

  const handleImagePick = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setFormData((prev) => ({
        ...prev,
        profileImage: result.assets[0].uri,
      }));
    }
  };

  const handleRemoveImage = () => {
    setFormData((prev) => ({
      ...prev,
      profileImage: null,
    }));
  };

  return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1350&q=80' }}
      style={styles.background}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Animated.View style={[styles.container, animatedStyle]}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Start Your Adventure!</Text>
            <Text style={styles.subHeaderText}>Sign up and explore the world.</Text>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.imageContainer}>
              <TouchableOpacity onPress={handleImagePick}>
                {formData.profileImage ? (
                  <Image source={{ uri: formData.profileImage }} style={styles.profileImage} />
                ) : (
                  <View style={styles.imagePlaceholder}>
                    <Ionicons name="camera" size={40} color="#fff" />
                  </View>
                )}
              </TouchableOpacity>
              <Text style={styles.imageText}>
                {formData.profileImage ? 'Change Travel Pic' : 'Add a Travel Pic'}
              </Text>
              {formData.profileImage && (
                <TouchableOpacity style={styles.removeButton} onPress={handleRemoveImage}>
                  <Ionicons name="trash" size={20} color="#fff" />
                </TouchableOpacity>
              )}
            </View>

            <TextInput
              style={[styles.input, errors.firstName && styles.inputError]}
              placeholder="First Name"
              value={formData.firstName}
              onChangeText={(text) => handleInputChange('firstName', text)}
              placeholderTextColor="#646464"
            />
            {errors.firstName && <Text style={styles.errorText}>{errors.firstName}</Text>}

            <TextInput
              style={[styles.input, errors.lastName && styles.inputError]}
              placeholder="Last Name"
              value={formData.lastName}
              onChangeText={(text) => handleInputChange('lastName', text)}
              placeholderTextColor="#646464"
            />
            {errors.lastName && <Text style={styles.errorText}>{errors.lastName}</Text>}

            <TextInput
              style={[styles.input, errors.email && styles.inputError]}
              placeholder="Email"
              value={formData.email}
              onChangeText={(text) => handleInputChange('email', text)}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor="#646464"
            />
            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

            <TextInput
              style={[styles.input, errors.phoneNumber && styles.inputError]}
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChangeText={(text) => handleInputChange('phoneNumber', text)}
              keyboardType="phone-pad"
              placeholderTextColor="#646464"
            />
            {errors.phoneNumber && <Text style={styles.errorText}>{errors.phoneNumber}</Text>}

            <View style={styles.passwordContainer}>
              <TextInput
                style={[styles.passwordInput, errors.password && styles.inputError]}
                placeholder="Password"
                value={formData.password}
                onChangeText={(text) => handleInputChange('password', text)}
                secureTextEntry={!showPassword}
                placeholderTextColor="#646464"
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={24} color="#fff" />
              </TouchableOpacity>
            </View>
            {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

            <View style={[styles.pickerContainer, errors.userType && styles.inputError]}>
              <Picker
                selectedValue={formData.userType}
                onValueChange={(value) => handleInputChange('userType', value)}
                style={styles.picker}
                itemStyle={styles.pickerItem}
                dropdownIconColor="#333"
              >
                <Picker.Item label="Select User Type" value="" color="#646464" />
                <Picker.Item label="Traveler" value="regular" />
                <Picker.Item label="Guide" value="guide" />
                <Picker.Item label="Trip Planner" value="group_planner" />
              </Picker>
            </View>
            {errors.userType && <Text style={styles.errorText}>{errors.userType}</Text>}

            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={formData.gender}
                onValueChange={(value) => handleInputChange('gender', value)}
                style={styles.picker}
                itemStyle={styles.pickerItem}
                dropdownIconColor="#333"
              >
                <Picker.Item label="Select Gender" value="" color="#646464" />
                <Picker.Item label="Male" value="male" />
                <Picker.Item label="Female" value="female" />
                <Picker.Item label="Other" value="other" />
              </Picker>
            </View>

            <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
              <Ionicons name="rocket" size={20} color="#fff" style={styles.buttonIcon} />
              <Text style={styles.registerButtonText}>Launch Your Journey</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginText}>Already a traveler? Login</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    backgroundColor: '#25252541',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
  },
  subHeaderText: {
    fontSize: 16,
    color: '#ddd',
    textAlign: 'center',
  },
  formContainer: {
    alignItems: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  imagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
    borderStyle: 'dashed',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#fff',
  },
  imageText: {
    color: '#fff',
    marginTop: 10,
    fontSize: 14,
  },
  removeButton: {
    position: 'absolute',
    right: 0,
    top: 0,
    backgroundColor: 'rgba(255, 0, 0, 0.7)',
    borderRadius: 15,
    padding: 5,
  },
  input: {
    width: '100%',
    height: 48,
    padding: 12,
    marginBottom: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 10,
    color: '#333',
  },
  inputError: {
    borderColor: '#ff3333',
    borderWidth: 1,
  },
  passwordContainer: {
    flexDirection: 'row',
    width: '100%',
    height: 48,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 10,
    marginBottom: 10,
    paddingRight: 10,
  },
  passwordInput: {
    flex: 1,
    padding: 12,
    color: '#333',
  },
  pickerContainer: {
    width: '100%',
    height: 54,
    marginBottom: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 10,
  },
  picker: {
    width: '100%',
    height: '100%',
    color: '#333',
  },
  pickerItem: {
    fontSize: 16,
    height: 150, // Increased height for better visibility and selection
  },
  errorText: {
    color: '#ff3333',
    fontSize: 12,
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  registerButton: {
    flexDirection: 'row',
    width: '100%',
    padding: 15,
    backgroundColor: '#FF5733',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  buttonIcon: {
    marginRight: 10,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginText: {
    color: '#fff',
    marginTop: 15,
    textAlign: 'center',
    fontSize: 14,
  },
});

export default RegisterScreen;