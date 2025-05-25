// import React, { useState } from "react";
// import {
//  Platform,
//  View,
//  Text,
//  TouchableOpacity,
//  Modal,
//  StyleSheet,
// } from "react-native";
// import DateTimePicker from "@react-native-community/datetimepicker";

// const CustomeDatePicker = ({ label, value, onChange }) => {
//  const [showPicker, setShowPicker] = useState(false);

//  const showDatePicker = () => {
//   setShowPicker(true);
//  };

//  const handleChange = (event, selectedDate) => {
//   setShowPicker(false);
//   if (selectedDate) {
//    onChange(selectedDate);
//   }
//  };

//  return (
//   <View>
//    <Text style={styles.label}>{label}</Text>
//    <TouchableOpacity onPress={showDatePicker} style={styles.input}>
//     <Text>{value ? value.toDateString() : "Select Date"}</Text>
//    </TouchableOpacity>

//    {Platform.OS === "android" && showPicker && (
//     <DateTimePicker
//      value={value || new Date()}
//      mode="date"
//      display="default"
//      onChange={handleChange}
//     />
//    )}

//    {Platform.OS === "ios" && (
//     <Modal visible={showPicker} transparent animationType="slide">
//      <View style={styles.modalContainer}>
//       <View style={styles.pickerContainer}>
//        <DateTimePicker
//         value={value || new Date()}
//         mode="date"
//         display="spinner"
//         onChange={handleChange}
//         style={{ backgroundColor: "white" }}
//        />
//        <TouchableOpacity
//         onPress={() => setShowPicker(false)}
//         style={styles.doneButton}
//        >
//         <Text style={styles.doneText}>Done</Text>
//        </TouchableOpacity>
//       </View>
//      </View>
//     </Modal>
//    )}
//   </View>
//  );
// };

// const styles = StyleSheet.create({
//  label: {
//   fontSize: 13,
//   color: "#666",
//   marginBottom: 4,
//   fontWeight: "500",
//  },
//  input: {
//   paddingVertical: 10,
//   paddingHorizontal: 12,
//   // borderWidth: 1,
//   borderColor: "#ccc",
//   borderRadius: 10,
//   backgroundColor: "#F3F4F6",
//  },
//  modalContainer: {
//   flex: 1,
//   justifyContent: "flex-end",
//   backgroundColor: "rgba(0,0,0,0.3)",
//  },
//  pickerContainer: {
//   backgroundColor: "white",
//   paddingTop: 16,
//   borderTopLeftRadius: 20,
//   borderTopRightRadius: 20,
//   paddingBottom: 24,
//  },
//  doneButton: {
//   alignItems: "center",
//   padding: 12,
//  },
//  doneText: {
//   fontSize: 18,
//   color: "#007AFF",
//   fontWeight: "600",
//  },
// });

// export default CustomeDatePicker;
