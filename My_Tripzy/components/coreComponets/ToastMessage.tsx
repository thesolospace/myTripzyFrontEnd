import React from 'react';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={[styles.toastContainer, styles.successToast]}
      contentContainerStyle={styles.contentContainer}
      text1Style={styles.text1}
      text2Style={styles.text2}
      renderLeadingIcon={() => <Ionicons name="checkmark-circle" size={28} color="#2ECC71" style={styles.icon} />}
    />
  ),
  error: (props: any) => (
    <ErrorToast
      {...props}
      style={[styles.toastContainer, styles.errorToast]}
      text1Style={styles.text1}
      text2Style={styles.text2}
      renderLeadingIcon={() => <Ionicons name="close-circle" size={28} color="#E74C3C" style={styles.icon} />}
    />
  ),
  info: (props: any) => (
    <BaseToast
      {...props}
      style={[styles.toastContainer, styles.infoToast]}
      contentContainerStyle={styles.contentContainer}
      text1Style={styles.text1}
      text2Style={styles.text2}
      renderLeadingIcon={() => <Ionicons name="information-circle" size={28} color="#3498DB" style={styles.icon} />}
    />
  ),
};

const ToastMessage = () => (
  <View style={styles.toastWrapper}>
    <Toast config={toastConfig} />
  </View>
);

export const showToast = (type: 'success' | 'error' | 'info', text1: string, text2?: string) => {
  Toast.show({
    type,
    text1,
    text2,
    position: 'bottom', 
    visibilityTime: 3000,
    autoHide: true,
    bottomOffset: 60, // Keeps it above bottom nav bar
  });
};

// const styles = StyleSheet.create({
  
//   toastContainer: {
//     width: '92%',
//     borderLeftWidth: 6,
//     borderRadius: 12,
//     padding: 12,
//     flexDirection: 'row',
//     alignItems: 'center',
    
//   },
//   successToast: {
//     borderLeftColor: '#2ECC71',
//     backgroundColor: '#E9F7EF',
//   },
//   errorToast: {
//     borderLeftColor: '#E74C3C',
//     backgroundColor: '#FDEDEC',
//   },
//   infoToast: {
//     borderLeftColor: '#3498DB',
//     backgroundColor: '#EBF5FB',
//   },

//   text1: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   text2: {
//     fontSize: 14,
//     color: '#555',
//   },
//   icon: {
//     marginRight: 10,
//   },
// });

const styles = StyleSheet.create({
    toastWrapper: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
      },
    toastContainer: {
      flexDirection: 'row',
      width: '90%',
      backgroundColor: '#fff',
      padding: 12,
      borderRadius: 15,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 8,
    },
    contentContainer: {
        paddingHorizontal: 10,
        flex: 1,
      },
    successToast: {
      borderLeftWidth: 5,
      borderLeftColor: '#27AE60',  // Deep green
      backgroundColor: '#D4EFDF', // Soft pastel green
    },
    errorToast: {
      borderLeftWidth: 5,
      borderLeftColor: '#C0392B',  // Dark red
      backgroundColor: '#FADBD8', // Soft pastel red
    },
    infoToast: {
      borderLeftWidth: 5,
      borderLeftColor: '#2980B9',  // Deep blue
      backgroundColor: '#D6EAF8', // Soft pastel blue
    },
    textContainer: {
      flex: 1,
      paddingLeft: 10,
    },
    text1: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    text2: {
      fontSize: 14,
      color: '#555',
    },
    icon: {
      marginRight: 10,
    },
  });
  

export default ToastMessage;






// const handleApiCall = async () => {
//     try {
//       const response = await fetch('https://api.example.com/data');
//       const data = await response.json();
  
//       if (response.ok) {
//         showToast('success', 'Success!', 'Data fetched successfully');
//       } else {
//         showToast('error', 'Error!', data.message || 'Something went wrong');
//       }
//     } catch (error) {
//       showToast('error', 'Error!', 'Network request failed');
//     }
//   };