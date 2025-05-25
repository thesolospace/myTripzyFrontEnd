import React, { useState } from "react";
import {
 View,
 Text,
 TextInput,
 FlatList,
 TouchableOpacity,
 Image,
 StyleSheet,
 ActivityIndicator,
 ScrollView,
 Platform,
 Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import {
 getFilteredTripList,
 setSelectedTrip,
} from "store/slices/homeScreenSlice";
import { SearchIcon } from "lucide-react-native";
import { useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const DiscoverSearch = () => {
 const dispatch = useDispatch();
 const navigation = useNavigation();
 const { searchTrips, loading } = useSelector((state: any) => state.homeScreen);
 const [query, setQuery] = useState("");
 const [selectedCategory, setSelectedCategory] = useState(null);

 const popularSearches = ["Manali", "Beach", "Couple", "Trekking", "Solo Trip"];

  const handleSearch = async () => {
    const resultAction = await dispatch(
      getFilteredTripList({
        title: query || undefined,
        travelFrom: departure || undefined,
        startDate: selectedDate?.toISOString() || undefined,
        travelerCount: travelerCount || undefined,
        tripType: selectedCategory || undefined,
      })
    );

    if (getFilteredTripList.fulfilled.match(resultAction)) {
      const data = resultAction.payload;

      if (!data.trips?.length) {
        Alert.alert("No Trips Found", "Please try a different search.");
      } else {
        navigation.navigate("SeacrchList", { trips: data.trips });
      }
    } else {
      Alert.alert("Error", resultAction?.payload || "Something went wrong.");
    }
  };




 const [departure, setDeparture] = useState("");
 const [destination, setDestination] = useState("");
 const [travelDate, setTravelDate] = useState("");
 const [travelerCount, setTravelerCount] = useState("");
 const [showDatePicker, setShowDatePicker] = useState(false);
 const [selectedDate, setSelectedDate] = useState<Date | null>(null);

 const categories = [
  { id: 1, name: "Upcoming", icon: "calendar" },
  { id: 2, name: "Trending", icon: "trending-up" },
  { id: 3, name: "Most Visited", icon: "star" },
  { id: 4, name: "Trekking", icon: "walk" },
  { id: 5, name: "Bike Riding", icon: "bicycle" },
  { id: 6, name: "Beaches", icon: "water" },
  { id: 7, name: "Adventures", icon: "trail-sign" },
  { id: 8, name: "Road Trips", icon: "car" },
  { id: 9, name: "Wildlife Safaris", icon: "paw" },
  { id: 10, name: "City Tours", icon: "business" },
 ];

 const getIconName = (categoryName: any) => {
  const category = categories?.find((cat) => cat?.name === categoryName);
  return category ? category.icon : "help-circle";
 };

 return (
  <SafeAreaView style={styles.container}>
   <ScrollView showsVerticalScrollIndicator={false}>
    <View
     style={{ marginHorizontal: 16, marginBottom: 20, marginVertical: 16 }}
    >
     <Text
      style={{
       fontSize: 22,
       fontWeight: "700",
       color: "#0D2927",
       backgroundColor: "#FFFFF",
       marginBottom: 8,
       letterSpacing: 1,
      }}
     >
      Discover Trips
     </Text>
     <Text style={{ fontSize: 14, color: "#777" }}>
      Find your next adventure. Search or explore categories.
     </Text>
    </View>

    <View style={styles.searchBox}>
     <TextInput
      value={query}
      onChangeText={setQuery}
      onSubmitEditing={handleSearch}
      placeholder="Search for trips, places..."
      style={styles.input}
      placeholderTextColor="#999"
     />
     <TouchableOpacity
      style={{
       backgroundColor: "#FF9F1C",
       borderColor: "#ccc",
       borderRadius: 12,
       paddingHorizontal: 20,
       paddingVertical: 16,

       height: "100%",
       alignSelf: "center",
      }}
      onPress={handleSearch}
     >
      <SearchIcon size={20} color="#202020" />
     </TouchableOpacity>
    </View>

    <View style={{ marginTop: 8, marginHorizontal: 16 }}>
     <Text style={{ fontWeight: "700", fontSize: 18, marginBottom: 12 }}>
      Popular Searches
     </Text>
     <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
      {popularSearches.map((item, index) => (
       <TouchableOpacity
        key={index}
        onPress={() => {
         setQuery(item);
         dispatch(getFilteredTripList({ title: item }));
        }}
        style={styles.popularTag}
       >
        <Text style={{ color: "#333" }}>{item}</Text>
       </TouchableOpacity>
      ))}
     </View>
    </View>
    {/* 
    {selectedCategory !== 0 && (
     <Text style={styles.activeFilterText}>
      Showing results for:{" "}
      <Text style={{ fontWeight: "600" }}>{selectedName}</Text>
     </Text>
    )} */}

    <View style={styles.tripCard}>
     <Text style={styles.tripCardTitle}>Start Your Journey</Text>

     <View style={styles.inputGroup}>
      <Text style={styles.inputLabel}>Leaving from</Text>
      <TextInput
       style={styles.tripInput}
       placeholder="Enter departure city"
       placeholderTextColor="#aaa"
       value={departure}
       onChangeText={setDeparture}
      />
     </View>

     <View style={styles.inputGroup}>
      <Text style={styles.inputLabel}>Going to</Text>
      <TextInput
       style={styles.tripInput}
       placeholder="Enter destination city"
       placeholderTextColor="#aaa"
       value={destination}
       onChangeText={setDestination}
      />
     </View>

     {/* <View style={styles.rowGroup}>
      <View style={styles.rowInput}>   
        <CustomeDatePicker
         label="Select Travel Date"
         value={selectedDate}
         onChange={setSelectedDate}
        />
      </View>

      <View style={styles.rowInput}>
       <Text style={styles.inputLabel}>Travelers</Text>
       <TextInput
        style={styles.tripInput}
        placeholder="e.g. 2"
        keyboardType="number-pad"
        placeholderTextColor="#aaa"
        value={travelerCount}
        onChangeText={setTravelerCount}
       />
      </View>
     </View> */}

     <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
      <Text style={styles.searchButtonText}>Search Trips</Text>
     </TouchableOpacity>
    </View>

    <View style={{ marginTop: 8, marginHorizontal: 16 }}>
     <Text style={{ fontWeight: "700", fontSize: 18, marginBottom: 4 }}>
      Trip Categories
     </Text>
     <Text style={{ fontWeight: "500", fontSize: 12, marginBottom: 6 }}>
      Tap to filter by type
     </Text>
    </View>

    <View style={[styles.categoryContainer]}>
     <FlatList
      data={categories}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.listContent}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
       <TouchableOpacity
        style={[styles.categoryItem]}
        onPress={() => {
         setSelectedCategory(item.name);
         dispatch(
          getFilteredTripList({
           tripType: item.name, // match backend enum
          })
         );
        }}
        activeOpacity={0.7}
       >
        <View style={[styles.iconContainer]}>
         <Ionicons name={getIconName(item.name)} size={24} color={"#666666"} />
        </View>
        <Text style={[styles.categoryLabel]} numberOfLines={1}>
         {item.name}
        </Text>
       </TouchableOpacity>
      )}
     />
    </View>
   </ScrollView>
  </SafeAreaView>
 );
};

export default DiscoverSearch;

const styles = StyleSheet.create({
 categoryItem: {
  alignItems: "center",
  paddingTop: 12,
  paddingHorizontal: 12,
  marginRight: 10,
  borderRadius: 12,
 },
 categoryItemSelected: {},
 iconContainer: {
  width: 50,
  height: 50,
  borderRadius: 25,
  backgroundColor: "#f5f5f5",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: 6,
  borderWidth: 1,
  borderColor: "#e0e0e0",
 },
 iconContainerSelected: { borderColor: "#666666", backgroundColor: "#0D2927" },
 categoryLabel: {
  fontSize: 12,
  color: "#333333",
  fontWeight: "500",
  textAlign: "center",
 },
 categoryLabelSelected: { color: "#0D2927", fontWeight: "600" },
 cardStyle: {
  justifyContent: "space-between",
  padding: 12,
  backgroundColor: "#f0f0f0",
  borderRadius: 12,
  shadowColor: "#000",
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 3,
  marginTop: 8,
  marginBottom: 8,
  minWidth: "100%",
 },
 cardHeaderName: {
  fontSize: 18,
  fontWeight: "600",
  color: "#0D2927",
  marginBottom: 8,
 },
 cardImage: { width: "100%", height: 180, borderRadius: 12 },
 cardDescription: {
  marginVertical: 8,
  fontSize: 14,
  fontWeight: "400",
  color: "#000",
 },
 welcomeText: { flexDirection: "row", alignItems: "center", marginBottom: 4 },
 cardTitle: {
  fontSize: 16,
  fontWeight: "600",
  color: "#000",
  marginVertical: 8,
  marginLeft: 4,
 },
 tripsButton: {
  height: 32,
  borderRadius: 16,
  borderWidth: 0.5,
  borderColor: "#0D2927",
  paddingHorizontal: 16,
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#FF9F1C",
  maxWidth: 100,
 },
 tripsText: { fontSize: 12, color: "#0D2927", fontWeight: "800" },
 container: { flex: 1, backgroundColor: "#fff" },
 searchBox: {
  flexDirection: "row",
  alignItems: "center",
  marginBottom: 12,
  borderWidth: 1,
  borderColor: "#ccc",
  borderRadius: 12,
  // paddingHorizontal: 12,
  // paddingVertical: 8,
  marginHorizontal: 16,
 },
 input: {
  marginLeft: 8,
  flex: 1,
  fontSize: 16,
  color: "#333",
  paddingHorizontal: 20,
  paddingVertical: 8,
 },
 listContent: { paddingHorizontal: 15, alignItems: "center" },
 popularTag: {
  backgroundColor: "#f0f0f0",
  paddingHorizontal: 12,
  paddingVertical: 6,
  borderRadius: 16,
  marginRight: 8,
  marginBottom: 8,
 },
 activeFilterText: {
  marginLeft: 16,
  marginTop: 10,
  marginBottom: 4,
  color: "#666",
  fontSize: 13,
 },
 tripCard: {
  backgroundColor: "#fff",
  borderRadius: 16,
  padding: 20,
  marginHorizontal: 16,
  marginTop: 16,
  shadowColor: "#000",
  shadowOpacity: 0.1,
  shadowOffset: { width: 0, height: 2 },
  shadowRadius: 6,
  elevation: 4,
  marginBottom: 10,
 },
 tripCardTitle: {
  fontSize: 18,
  fontWeight: "700",
  color: "#0D2927",
  marginBottom: 16,
 },
 inputGroup: {
  marginBottom: 14,
 },
 inputLabel: {
  fontSize: 13,
  color: "#666",
  marginBottom: 4,
  fontWeight: "500",
 },
 tripInput: {
  backgroundColor: "#F3F4F6",
  borderRadius: 10,
  paddingVertical: 10,
  paddingHorizontal: 12,
  fontSize: 14,
  color: "#333",
 },
 rowGroup: {
  flexDirection: "row",
  justifyContent: "space-between",
  gap: 12,
 },
 rowInput: {
  flex: 1,
 },
 searchButton: {
  marginTop: 18,
  backgroundColor: "#FF9F1C",
  paddingVertical: 12,
  borderRadius: 10,
  alignItems: "center",
 },
 searchButtonText: {
  color: "#fff",
  fontSize: 15,
  fontWeight: "600",
 },
 categoryContainer: {
  marginTop: 4,
  backgroundColor: "#ffffff",
 },
});
