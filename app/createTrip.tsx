import React, { useState } from "react";
import {
 StyleSheet,
 Text,
 View,
 TextInput,
 TouchableOpacity,
 ScrollView,
 Dimensions,
 Image,
} from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

import { useNavigation } from "expo-router";
import { useAppDispatch } from "hooks/hooks";
import apiClient from "api";
import { showToast } from "components/coreComponets/ToastMessage";
import { setSelectedTrip } from "store/slices/homeScreenSlice";

const { width } = Dimensions.get("window");

// Sample location data (replace with your actual data source)
const locations = [
 { state: "Kerala", cities: ["Kochi", "Alleppey", "Munnar"] },
 { state: "Himachal Pradesh", cities: ["Manali", "Shimla", "Dharamshala"] },
 { state: "Ladakh", cities: ["Leh", "Nubra Valley", "Pangong"] },
];

export default function CreateTripScreen() {
 const [tripData, setTripData] = useState({
  title: "",
  description: "",
  startDate: new Date(),
  startTime: "10:00 AM",
  returnDate: new Date(),
  returnTime: "6:00 PM",
  travelType: "bike",
  travelFrom: "",
  destinations: [{ name: "" }],
  itinerary: [
   {
    date: new Date(),
    activities: [{ title: "", description: "", location: "" }],
   },
  ],
  numberOfPeople: "",
  images: [],
  primaryImageIndex: 0,
  price: "",
  additionalInstructions: "",
 });

 const [showStartDate, setShowStartDate] = useState(false);
 const [showReturnDate, setShowReturnDate] = useState(false);
 const [showTravelFromDropdown, setShowTravelFromDropdown] = useState(false);
 const [showActivityDropdown, setShowActivityDropdown] = useState({});
 const [loading, setLoading] = useState(false);
 const transportOptions = [
  { name: "bike", icon: "bicycle" },
  { name: "train", icon: "train" },
  { name: "car", icon: "car" },
  { name: "bus", icon: "bus" },
 ];
 const navigation = useNavigation();
 const dispatch = useAppDispatch();
 const handleInputChange = (field, value) => {
  setTripData({ ...tripData, [field]: value });
 };

 const addDestination = () => {
  setTripData({
   ...tripData,
   destinations: [...tripData.destinations, { name: "" }],
  });
 };

 const updateDestination = (index, value) => {
  const newDestinations = [...tripData.destinations];
  newDestinations[index].name = value;
  setTripData({ ...tripData, destinations: newDestinations });
 };

 const addItineraryDay = () => {
  setTripData({
   ...tripData,
   itinerary: [
    ...tripData.itinerary,
    {
     date: new Date(),
     activities: [{ title: "", description: "", location: "" }],
    },
   ],
  });
 };

 const addActivity = (dayIndex) => {
  const newItinerary = [...tripData.itinerary];
  newItinerary[dayIndex].activities.push({
   title: "",
   description: "",
   location: "",
  });
  setTripData({ ...tripData, itinerary: newItinerary });
 };

 const updateActivity = (dayIndex, actIndex, field, value) => {
  const newItinerary = [...tripData.itinerary];
  newItinerary[dayIndex].activities[actIndex][field] = value;
  setTripData({ ...tripData, itinerary: newItinerary });
 };

 const pickImage = async () => {
  if (tripData.images.length >= 4) {
   alert("You can only upload a maximum of 4 images.");
   return;
  }
  let result = await ImagePicker.launchImageLibraryAsync({
   mediaTypes: ImagePicker.MediaTypeOptions.Images,
   allowsEditing: true,
   aspect: [4, 3],
   quality: 1,
  });
  if (!result.canceled) {
   setTripData({
    ...tripData,
    images: [...tripData.images, result.assets[0].uri],
   });
  }
 };

 const setPrimaryImage = (index) => {
  setTripData({ ...tripData, primaryImageIndex: index });
 };

 const removeImage = (index) => {
  const newImages = tripData.images.filter((_, i) => i !== index);
  const newPrimaryIndex =
   tripData.primaryImageIndex > index
    ? tripData.primaryImageIndex - 1
    : tripData.primaryImageIndex === index
    ? 0
    : tripData.primaryImageIndex;
  setTripData({
   ...tripData,
   images: newImages,
   primaryImageIndex: newPrimaryIndex,
  });
 };

 const formatDate = (date) => {
  return date.toLocaleDateString("en-US", {
   day: "numeric",
   month: "short",
   year: "numeric",
  });
 };

 const toggleActivityDropdown = (dayIndex, actIndex) => {
  setShowActivityDropdown((prev) => ({
   ...prev,
   [`${dayIndex}-${actIndex}`]: !prev[`${dayIndex}-${actIndex}`],
  }));
 };

 const handleSubmit = async () => {
  setLoading(true);
  try {
   // Prepare payload, converting numeric fields
   const payload = {
    title: tripData.title,
    description: tripData.description,
    startDate: tripData.startDate.toISOString().split("T")[0],
    startTime: tripData.startTime,
    returnDate: tripData.returnDate.toISOString().split("T")[0],
    returnTime: tripData.returnTime,
    travelType: tripData.travelType,
    travelFrom: tripData.travelFrom,
    destinations: tripData.destinations,
    itinerary: tripData.itinerary.map((day) => ({
     date: day.date.toISOString().split("T")[0],
     activities: day.activities,
    })),
    numberOfPeople: Number(tripData.numberOfPeople),
    price: Number(tripData.price),
    images: tripData.images,
   };

   const response = await apiClient.post("/trips/create", payload);
   console.log("Trip created successfully:", response);
   showToast("success", "Trip created successfully!");
   // Navigate to details or list screen
   if (response?.success === true) {
    dispatch(setSelectedTrip(response?.data));
    navigation.push("tripDetails");
   }
  } catch (error: any) {
   console.error("Error creating trip:", error);
   showToast(
    "error",
    typeof error === "string" ? error : "Failed to create trip"
   );
  } finally {
   setLoading(false);
  }
 };

 return (
  <View style={styles.container}>
   <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
    <View style={styles.contentArea}>
     {/* Basic Info */}
     <Animated.View entering={FadeInUp.delay(100)} style={styles.formSection}>
      <Text style={styles.sectionTitle}>Basic Information</Text>
      <TextInput
       style={styles.input}
       placeholder="Trip Title"
       value={tripData.title}
       onChangeText={(text) => handleInputChange("title", text)}
      />
      <TextInput
       style={[styles.input, styles.multilineInput]}
       placeholder="Description"
       multiline
       value={tripData.description}
       onChangeText={(text) => handleInputChange("description", text)}
      />
     </Animated.View>

     {/* Travel Details */}
     <Animated.View entering={FadeInUp.delay(200)} style={styles.formSection}>
      <Text style={styles.sectionTitle}>Travel Details</Text>
      <View style={styles.transportRow}>
       {transportOptions.map((option) => (
        <TouchableOpacity
         key={option.name}
         style={[
          styles.travelTypeButton,
          tripData.travelType === option.name && styles.activeTravelType,
         ]}
         onPress={() => handleInputChange("travelType", option.name)}
        >
         <Ionicons
          name={option.icon}
          size={20}
          color={tripData.travelType === option.name ? "#fff" : "#607D8B"}
         />
         <Text
          style={[
           styles.travelTypeText,
           tripData.travelType === option.name && styles.activeText,
          ]}
         >
          {option.name.charAt(0).toUpperCase() + option.name.slice(1)}
         </Text>
        </TouchableOpacity>
       ))}
      </View>
      <View style={styles.dropdownContainer}>
       <Text style={styles.label}>Starting Location</Text>
       <TouchableOpacity
        style={styles.dropdownButton}
        onPress={() => setShowTravelFromDropdown(!showTravelFromDropdown)}
       >
        <Text style={styles.dropdownText}>
         {tripData.travelFrom || "Select Location"}
        </Text>
        <Ionicons name="chevron-down" size={20} color="#607D8B" />
       </TouchableOpacity>
       {showTravelFromDropdown && (
        <View style={styles.dropdown}>
         {locations.map((loc, index) => (
          <View key={index}>
           <TouchableOpacity
            style={styles.dropdownItem}
            onPress={() => {
             handleInputChange("travelFrom", loc.state);
             setShowTravelFromDropdown(false);
            }}
           >
            <Text style={styles.dropdownItemText}>{loc.state}</Text>
           </TouchableOpacity>
           {loc.cities.map((city, cityIndex) => (
            <TouchableOpacity
             key={cityIndex}
             style={[styles.dropdownItem, styles.dropdownSubItem]}
             onPress={() => {
              handleInputChange("travelFrom", `${loc.state}, ${city}`);
              setShowTravelFromDropdown(false);
             }}
            >
             <Text style={styles.dropdownItemText}>{city}</Text>
            </TouchableOpacity>
           ))}
          </View>
         ))}
        </View>
       )}
      </View>
      <View style={styles.dateRow}>
       <View style={styles.datePicker}>
        <Text style={styles.label}>Start Date</Text>
        <TouchableOpacity onPress={() => setShowStartDate(true)}>
         <Text style={styles.dateText}>{formatDate(tripData.startDate)}</Text>
        </TouchableOpacity>
        {showStartDate && <></>}
       </View>
       <View style={styles.datePicker}>
        <Text style={styles.label}>Return Date</Text>
        <TouchableOpacity onPress={() => setShowReturnDate(true)}>
         <Text style={styles.dateText}>{formatDate(tripData.returnDate)}</Text>
        </TouchableOpacity>
        {showReturnDate && <></>}
       </View>
      </View>
      <View style={styles.row}>
       <TextInput
        style={styles.timeInput}
        placeholder="Start Time (e.g., 10:00 AM)"
        value={tripData.startTime}
        onChangeText={(text) => handleInputChange("startTime", text)}
       />
       <TextInput
        style={styles.timeInput}
        placeholder="Return Time (e.g., 6:00 PM)"
        value={tripData.returnTime}
        onChangeText={(text) => handleInputChange("returnTime", text)}
       />
      </View>
     </Animated.View>

     {/* Images */}
     <Animated.View entering={FadeInUp.delay(250)} style={styles.formSection}>
      <Text style={styles.sectionTitle}>Images (Max 4)</Text>
      <View style={styles.imageContainer}>
       {tripData.images.map((uri, index) => (
        <View key={index} style={styles.imageWrapper}>
         <Image source={{ uri }} style={styles.uploadedImage} />
         <TouchableOpacity
          style={[
           styles.imageActionButton,
           index === tripData.primaryImageIndex && styles.primaryImageButton,
          ]}
          onPress={() => setPrimaryImage(index)}
         >
          <Text style={styles.imageActionText}>
           {index === tripData.primaryImageIndex ? "Primary" : "Set Primary"}
          </Text>
         </TouchableOpacity>
         <TouchableOpacity
          style={styles.removeImageButton}
          onPress={() => removeImage(index)}
         >
          <Ionicons name="trash" size={20} color="#fff" />
         </TouchableOpacity>
        </View>
       ))}
       {tripData.images.length < 4 && (
        <TouchableOpacity style={styles.addImageButton} onPress={pickImage}>
         <Ionicons name="camera" size={30} color="#F57C00" />
         <Text style={styles.addImageText}>Add Image</Text>
        </TouchableOpacity>
       )}
      </View>
      {tripData.images.length > 0 && (
       <Text style={styles.imageNote}>
        The primary image will be shown on the home screen.
       </Text>
      )}
     </Animated.View>

     {/* Destinations */}
     <Animated.View entering={FadeInUp.delay(300)} style={styles.formSection}>
      <Text style={styles.sectionTitle}>Destinations</Text>
      {tripData.destinations.map((dest, index) => (
       <TextInput
        key={index}
        style={styles.input}
        placeholder={`Destination ${index + 1}`}
        value={dest.name}
        onChangeText={(text) => updateDestination(index, text)}
       />
      ))}
      <TouchableOpacity style={styles.addButton} onPress={addDestination}>
       <Ionicons name="add" size={20} color="#F57C00" />
       <Text style={styles.addButtonText}>Add Destination</Text>
      </TouchableOpacity>
     </Animated.View>

     {/* Itinerary */}
     <Animated.View entering={FadeInUp.delay(400)} style={styles.formSection}>
      <Text style={styles.sectionTitle}>Plan the Days</Text>

      {tripData.itinerary.map((day, dayIndex) => (
       <View key={dayIndex} style={styles.itineraryDay}>
        <Text style={styles.activityIndex}>
         Enter your plan details for day {dayIndex + 1} of your trip
        </Text>
        <Text style={styles.dayTitle}>Day {dayIndex + 1}</Text>
        {day.activities.map((activity, actIndex) => (
         <View key={actIndex} style={styles.activitySection}>
          <Text style={styles.activityIndex}>Activity {actIndex + 1}</Text>
          <TextInput
           style={styles.input}
           placeholder="Activity Title"
           value={activity.title}
           onChangeText={(text) =>
            updateActivity(dayIndex, actIndex, "title", text)
           }
          />
          <TextInput
           style={[styles.input, styles.multilineInput]}
           placeholder="Description"
           multiline
           value={activity.description}
           onChangeText={(text) =>
            updateActivity(dayIndex, actIndex, "description", text)
           }
          />
          <View style={styles.dropdownContainer}>
           <TouchableOpacity
            style={styles.dropdownButton}
            onPress={() => toggleActivityDropdown(dayIndex, actIndex)}
           >
            <Text style={styles.dropdownText}>
             {activity.location || "Select Location"}
            </Text>
            <Ionicons name="chevron-down" size={20} color="#607D8B" />
           </TouchableOpacity>
           {showActivityDropdown[`${dayIndex}-${actIndex}`] && (
            <View style={styles.dropdown}>
             {locations.map((loc, index) => (
              <View key={index}>
               <TouchableOpacity
                style={styles.dropdownItem}
                onPress={() => {
                 updateActivity(dayIndex, actIndex, "location", loc.state);
                 toggleActivityDropdown(dayIndex, actIndex);
                }}
               >
                <Text style={styles.dropdownItemText}>{loc.state}</Text>
               </TouchableOpacity>
               {loc.cities.map((city, cityIndex) => (
                <TouchableOpacity
                 key={cityIndex}
                 style={[styles.dropdownItem, styles.dropdownSubItem]}
                 onPress={() => {
                  updateActivity(
                   dayIndex,
                   actIndex,
                   "location",
                   `${loc.state}, ${city}`
                  );
                  toggleActivityDropdown(dayIndex, actIndex);
                 }}
                >
                 <Text style={styles.dropdownItemText}>{city}</Text>
                </TouchableOpacity>
               ))}
              </View>
             ))}
            </View>
           )}
          </View>
         </View>
        ))}
        <TouchableOpacity
         style={styles.addButton}
         onPress={() => addActivity(dayIndex)}
        >
         <Ionicons name="add" size={20} color="#F57C00" />
         <Text style={styles.addButtonText}>Add Activity</Text>
        </TouchableOpacity>
       </View>
      ))}
      <TouchableOpacity style={styles.addButton} onPress={addItineraryDay}>
       <Ionicons name="add" size={20} color="#F57C00" />
       <Text style={styles.addButtonText}>Next Day</Text>
      </TouchableOpacity>
     </Animated.View>

     {/* Additional Details */}
     <Animated.View entering={FadeInUp.delay(500)} style={styles.formSection}>
      <Text style={styles.sectionTitle}>Additional Details</Text>
      <TextInput
       style={styles.input}
       placeholder="Max Number of People"
       keyboardType="numeric"
       value={tripData.numberOfPeople}
       onChangeText={(text) => handleInputChange("numberOfPeople", text)}
      />
      <TextInput
       style={styles.input}
       placeholder="Price per Person (INR)"
       keyboardType="numeric"
       value={tripData.price}
       onChangeText={(text) => handleInputChange("price", text)}
      />
      <TextInput
       style={[styles.input, styles.multilineInput]}
       placeholder="Additional Instructions (e.g., packing tips, requirements)"
       multiline
       value={tripData.additionalInstructions}
       onChangeText={(text) =>
        handleInputChange("additionalInstructions", text)
       }
      />
     </Animated.View>

     <View style={styles.contentEnd} />
    </View>
   </ScrollView>

   {/* Submit Button */}
   <Animated.View style={styles.footerBar} entering={FadeInUp.delay(600)}>
    <TouchableOpacity
     style={[styles.submitButton, loading && { opacity: 0.7 }]}
     onPress={handleSubmit}
     disabled={loading}
    >
     {loading ? (
      <ActivityIndicator size="small" color="#fff" />
     ) : (
      <Text style={styles.submitButtonText}>Create Trip</Text>
     )}
    </TouchableOpacity>
   </Animated.View>
  </View>
 );
}

const styles = StyleSheet.create({
 container: {
  flex: 1,
  backgroundColor: "#F5F6F5",
 },
 scrollView: {
  flex: 1,
 },
 contentArea: {
  padding: 20,
  paddingTop: 20,
 },
 formSection: {
  backgroundColor: "#fff",
  borderRadius: 16,
  padding: 20,
  marginBottom: 15,
  elevation: 3,
  shadowColor: "#000",
  shadowOpacity: 0.1,
  shadowRadius: 8,
 },
 sectionTitle: {
  fontSize: 20,
  fontWeight: "700",
  color: "#1A3C4A",
  marginBottom: 15,
 },
 input: {
  backgroundColor: "#F7F9FA",
  borderRadius: 10,
  padding: 12,
  fontSize: 15,
  color: "#455A64",
  marginBottom: 10,
 },
 multilineInput: {
  minHeight: 80,
  textAlignVertical: "top",
 },
 row: {
  flexDirection: "row",
  justifyContent: "space-between",
  gap: 10,
 },
 transportRow: {
  flexDirection: "row",
  flexWrap: "wrap",
  gap: 10,
  marginBottom: 10,
 },
 travelTypeButton: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#F7F9FA",
  padding: 12,
  borderRadius: 10,
  gap: 8,
  flex: 1,
  minWidth: (width - 60) / 4,
 },
 activeTravelType: {
  backgroundColor: "#F57C00",
 },
 travelTypeText: {
  fontSize: 15,
  color: "#607D8B",
 },
 activeText: {
  color: "#fff",
  fontWeight: "600",
 },
 dropdownContainer: {
  marginBottom: 10,
 },
 dropdownButton: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: "#F7F9FA",
  borderRadius: 10,
  padding: 12,
 },
 dropdownText: {
  fontSize: 15,
  color: "#455A64",
 },
 dropdown: {
  position: "absolute",
  top: 60,
  left: 0,
  right: 0,
  backgroundColor: "#fff",
  borderRadius: 10,
  elevation: 5,
  maxHeight: 200,
  overflow: "scroll",
  zIndex: 10,
 },
 dropdownItem: {
  padding: 10,
 },
 dropdownSubItem: {
  paddingLeft: 20,
 },
 dropdownItemText: {
  fontSize: 14,
  color: "#455A64",
 },
 dateRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  marginBottom: 10,
 },
 datePicker: {
  flex: 1,
 },
 label: {
  fontSize: 14,
  color: "#607D8B",
  marginBottom: 5,
 },
 dateText: {
  backgroundColor: "#F7F9FA",
  borderRadius: 10,
  padding: 12,
  fontSize: 15,
  color: "#455A64",
 },
 timeInput: {
  flex: 1,
  backgroundColor: "#F7F9FA",
  borderRadius: 10,
  padding: 12,
  fontSize: 15,
  color: "#455A64",
 },
 imageContainer: {
  flexDirection: "row",
  flexWrap: "wrap",
  gap: 10,
  marginBottom: 10,
 },
 imageWrapper: {
  position: "relative",
  width: (width - 60) / 2 - 5,
  height: 100,
 },
 uploadedImage: {
  width: "100%",
  height: "100%",
  borderRadius: 10,
 },
 imageActionButton: {
  position: "absolute",
  bottom: 5,
  left: 5,
  backgroundColor: "rgba(0,0,0,0.6)",
  padding: 5,
  borderRadius: 5,
 },
 primaryImageButton: {
  backgroundColor: "#F57C00",
 },
 imageActionText: {
  color: "#fff",
  fontSize: 12,
 },
 removeImageButton: {
  position: "absolute",
  top: 5,
  right: 5,
  backgroundColor: "rgba(255,0,0,0.8)",
  borderRadius: 15,
  width: 30,
  height: 30,
  alignItems: "center",
  justifyContent: "center",
 },
 addImageButton: {
  width: (width - 60) / 2 - 5,
  height: 100,
  borderWidth: 2,
  borderColor: "#F57C00",
  borderStyle: "dashed",
  borderRadius: 10,
  alignItems: "center",
  justifyContent: "center",
 },
 addImageText: {
  color: "#F57C00",
  fontSize: 14,
  marginTop: 5,
 },
 imageNote: {
  fontSize: 12,
  color: "#607D8B",
  marginTop: 5,
 },
 itineraryDay: {
  marginBottom: 20,
 },
 dayTitle: {
  fontSize: 16,
  fontWeight: "600",
  color: "#F57C00",
  marginBottom: 10,
 },
 activitySection: {
  marginBottom: 15,
  paddingLeft: 10,
 },
 activityIndex: {
  fontSize: 14,
  fontWeight: "600",
  color: "#1A3C4A",
  marginBottom: 5,
 },
 addButton: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  padding: 10,
  borderRadius: 10,
  backgroundColor: "#FFF3E0",
 },
 addButtonText: {
  fontSize: 15,
  color: "#F57C00",
  marginLeft: 5,
  fontWeight: "600",
 },
 contentEnd: {
  height: 100,
 },
 footerBar: {
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  padding: 16,
  backgroundColor: "#1A3C4A",
  elevation: 10,
 },
 submitButton: {
  backgroundColor: "#F57C00",
  paddingVertical: 12,
  borderRadius: 25,
  alignItems: "center",
 },
 submitButtonText: {
  fontSize: 16,
  fontWeight: "600",
  color: "#fff",
 },
});
