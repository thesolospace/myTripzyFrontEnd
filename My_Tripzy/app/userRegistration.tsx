import React, { useEffect, useRef, useState } from 'react';
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
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
const { width, height } = Dimensions.get('window');
const images = [
  'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1350&q=80',
  'https://images.unsplash.com/photo-1514222134-b57cbb8ce073?auto=format&fit=crop&w=1350&q=80',
  'https://images.unsplash.com/photo-1515091943-9d5c0ad475af?auto=format&fit=crop&w=1350&q=80',
  'https://images.unsplash.com/photo-1512036849132-48508f294900?auto=format&fit=crop&w=1350&q=80'
];

const RegisterScreen = () => {
  const [step, setStep] = useState(1);
  const flatListRef = useRef<FlatList<string> | null>(null); // ✅ Explicitly define type
  const scrollX = useRef(new Animated.Value(0)).current;
  const [formData, setFormData] = useState({
    fullName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    userType: '',
  });

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  let currentIndex = useRef(0);
  useEffect(() => {
    const interval = setInterval(() => {
      if (!flatListRef.current) return;

      currentIndex.current += 1;

      // Reset when reaching the end of original images
      if (currentIndex.current >= images.length) {
        currentIndex.current = 0; // Reset index
        flatListRef.current.scrollToOffset({
          offset: 0,
          animated: false, // Instantly jump back to the first image
        });
      } else {
        flatListRef.current.scrollToOffset({
          offset: (currentIndex.current + 1) * width,
          animated: true, // Smooth transition
        });
      }
    }, 3000); // Auto-scroll every 3 seconds

    return () => clearInterval(interval);
  }, []);

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
        <View style={styles.stepContainer}>
          {[1, 2, 3].map((num, index) => (
            <React.Fragment key={num}>
              <View
                style={[
                  styles.stepCircle,
                  step >= num ? styles.completedStep : styles.inactiveStep, // Fill step if completed
                  step === num && styles.activeStep, // Highlight current step
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
                  style={[
                    styles.stepLine,
                    step > index + 1 && styles.activeStepLine, // Fill line for completed steps
                  ]}
                />
              )}
            </React.Fragment>
          ))}
        </View>


        <Text style={styles.title}>Register (Step {step} / 3)</Text>
        {step === 1 && (
          <>
            <TextInput style={styles.input} placeholder="Full Name" value={formData.fullName} onChangeText={(text) => setFormData({ ...formData, fullName: text })} />
            <TextInput style={styles.input} placeholder="Last Name" value={formData.lastName} onChangeText={(text) => setFormData({ ...formData, lastName: text })} />
          </>
        )}
        {step === 2 && (
          <>
            <TextInput style={styles.input} placeholder="Email" value={formData.email} onChangeText={(text) => setFormData({ ...formData, email: text })} />
            <TextInput style={styles.input} placeholder="Phone Number" value={formData.phoneNumber} onChangeText={(text) => setFormData({ ...formData, phoneNumber: text })} />
          </>
        )}
        {step === 3 && (
          <>
            <TextInput style={styles.input} placeholder="Password" secureTextEntry value={formData.password} onChangeText={(text) => setFormData({ ...formData, password: text })} />
            <View style={styles.pickerWrapper}>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={formData.userType}
                  onValueChange={(value) => setFormData({ ...formData, userType: value })}
                  style={styles.picker}
                  dropdownIconColor="#A67C52" // Change dropdown icon color
                >
                  <Picker.Item label="Select User Type" value="" />
                  <Picker.Item label="Traveler" value="traveler" />
                  <Picker.Item label="Guide" value="guide" />
                </Picker>
              </View>
            </View>

          </>
        )}
        <View style={styles.buttonContainer}>
          {step > 1 && (
            <TouchableOpacity style={[styles.button, styles.smallButton]} onPress={handleBack}>
              <Text style={styles.buttonText}>Previous</Text>
            </TouchableOpacity>
          )}
          {step < 3 ? (
            <>
              <TouchableOpacity >
                {/* <Text style={styles.buttonText}>Next</Text> */}
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, styles.button]} onPress={handleNext}>
                <Text style={styles.buttonText}>Next</Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity style={[styles.button, styles.registerButton]}>
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
          )}
        </View>


      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  imageContainer: { width, height: height * 0.6, alignItems: 'center', justifyContent: 'center' },
  carouselImage: { width, height: height * 0.6, resizeMode: 'cover' },
  formContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: height * 0.4,
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignItems: 'center',
  },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    width: '90%',
    borderWidth: 1.5,
    borderColor: '#ccc'
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginBottom: 20,
    width: "90%"
  },
  activeStepText: {
    color: '#fff',
    fontSize: 18,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: 20,
    paddingHorizontal: 20
  },
  smallButton: {
    backgroundColor: '#A67C52',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#A67C52',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  registerButton: {
    backgroundColor: 'green',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },

  pickerWrapper: {
    width: '100%',
    marginBottom: 15,
  },
  pickerLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 5,
  },
  pickerContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#ccc',
    width: '90%', // Ensure same width as input field
    alignSelf: 'center', // Center align to match inputs
  },
  picker: {
    width: '100%',
    fontSize:3,
    height: 50,
    color: '#333',
  },

  stepCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  inactiveStep: {
    backgroundColor: '#ccc',
  },

  activeStep: {
    backgroundColor: '#A67C52',
    transform: [{ scale: 1.2 }], // Slightly enlarge the current step
  },

  completedStep: {
    backgroundColor: '#A67C52',
  },

  stepText: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  inactiveStepText: {
    color: '#fff',
  },

  completedStepText: {
    color: '#fff',
    fontSize: 18,
  },

  stepLine: {
    width: 40,
    height: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
    borderRadius: 2,
  },

  activeStepLine: {
    backgroundColor: '#A67C52',
    width: 45, // Slightly longer for better visual effect
  },


});

export default RegisterScreen;