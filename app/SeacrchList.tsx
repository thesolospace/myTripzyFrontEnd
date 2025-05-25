import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import { Image } from 'react-native';
import { setSelectedTrip } from 'store/slices/homeScreenSlice';
import { useNavigation } from 'expo-router';
import { useAppDispatch } from 'hooks/hooks';

const SeacrchList = () => {
   const navigation = useNavigation();
    const dispatch = useAppDispatch();
   const { searchTrips, loading } = useSelector((state: any) => state.homeScreen);

   console.log(searchTrips,"searchTripssearchTrips")
    const onPressTrip = (trip: any) => {
  dispatch(setSelectedTrip(trip));
  navigation.navigate("tripDetails");
 };
  return (
  <FlatList
     data={searchTrips?.trips}
     showsVerticalScrollIndicator={false}
     contentContainerStyle={[styles.tripList, { ...styles.spacing }]}
     keyExtractor={(item: any) => item._id}
     renderItem={({ item }) => {
      // --- calculate formatted date + duration ---
      const start = new Date(item.startDate);
      const end = new Date(item.returnDate);
      const msPerDay = 1000 * 60 * 60 * 24;
      const diffDays = Math.round((end - start) / msPerDay);
      const nights = diffDays > 0 ? diffDays - 1 : 0;

      // ordinal helper
      const ordinal = (n) => {
       const s = ["th", "st", "nd", "rd"];
       const v = n % 100;
       return n + (s[(v - 20) % 10] || s[v] || s[0]);
      };

      const monthNames = [
       "Jan",
       "Feb",
       "Mar",
       "Apr",
       "May",
       "Jun",
       "Jul",
       "Aug",
       "Sep",
       "Oct",
       "Nov",
       "Dec",
      ];
      const formattedDate = `${ordinal(start.getDate())} ${
       monthNames[start.getMonth()]
      } ${start.getFullYear()}`;

      return (
       <View style={styles.cardStyle}>
        {/* Title */}
        <Text style={styles.cardHeaderName}>{item.title}</Text>

        {/* Trip Image */}
        <Image
         source={
          // uri: "https://images.unsplash.com/photo-1457449940276-e8deed18bfff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          require("../assets/images/deafultImage1.jpg")
         }
         style={styles.cardImage}
        />

        {/* Description */}
        <Text style={styles.cardDescription}>{item.description}</Text>

        {/* Date + Duration */}
        <View style={styles.welcomeText}>
         <Text style={[styles.cardTitle, { fontWeight: "400" }]}>Date :</Text>
         <Text style={styles.cardTitle}>{formattedDate}</Text>
         <Text style={[styles.cardTitle, { marginLeft: "auto" }]}>
          {diffDays} Days || {nights} Nights
         </Text>
        </View>

        {/* Know More Button */}
        <TouchableOpacity
         style={[styles.tripsButton, { marginLeft: "auto" }]}
         onPress={() =>
          // navigation.navigate("tripDetails", { item })
          onPressTrip(item)
         }
        >
         <Text style={styles.tripsText}>Know More</Text>
        </TouchableOpacity>
       </View>
      );
     }}
     ListEmptyComponent={
      <Text style={styles.emptyText}>No trips match this category.</Text>
     }
    />
  )
}

export default SeacrchList

const styles = StyleSheet.create({
 spacing: {
  marginHorizontal: 16,
  marginVertical: 20,
  paddingBottom: 20,
  marginBottom: 2,
 },


 categoryContainer: {
  marginTop: 4,
  backgroundColor: "#ffffff",
 },
 listContent: {
  paddingHorizontal: 15,
  alignItems: "center",
 },
 tripList: {
  alignItems: "center",
 },
 categoryItem: {
  alignItems: "center", // Center items vertically
  paddingTop: 12,
  paddingHorizontal: 12,
  marginRight: 10,
  borderRadius: 12,
 },
 categoryItemSelected: {
  // No major changes needed here since we're using icon container for distinction
 },
 iconContainer: {
  width: 50,
  height: 50,
  borderRadius: 25, // Makes it circular
  backgroundColor: "#f5f5f5", // Light gray background
  justifyContent: "center",
  alignItems: "center",
  marginBottom: 6, // Space between icon and text
  borderWidth: 1,
  borderColor: "#e0e0e0",
 },
 iconContainerSelected: {
  borderColor: "#666666",
  backgroundColor: "#0D2927", // Slightly darker when selected
 },
 categoryIcon: {
  width: 24,
  height: 24,
  tintColor: "#666666",
 },
 categoryLabel: {
  fontSize: 12,
  color: "#333333",
  fontWeight: "500",
  textAlign: "center",
 },
 categoryLabelSelected: {
  color: "#0D2927",
  fontWeight: "600",
 },
 emptyText: { textAlign: "center", marginTop: 32, color: "#999" },

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

 header: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  padding: 16,
  backgroundColor: "#f0f0f0",
  borderRadius: 12,
  shadowColor: "#000",
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 3,
 },
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
  // maxWidth: "100%",
 },
 profileImage: {
  width: 80,
  height: 80,
  borderRadius: 40,
  borderWidth: 0.5,
 },
 cardImage: {
  width: "100%",
  height: 180,
  borderRadius: 12,
 },
 textContainer: {
  flex: 1,
  marginLeft: 12,
 },
 welcomeText: {
  flexDirection: "row",
  alignItems: "center",
  marginBottom: 4,
 },
 welcome: {
  fontSize: 18,
  color: "#333",
 },
 userName: {
  fontSize: 18,
  fontWeight: "600",
  marginLeft: 4,
  color: "#000",
 },
 cardHeaderName: {
  fontSize: 18,
  fontWeight: "600",
  marginLeft: 4,
  color: "#0D2927",
  marginBottom: 8,
 },
 cardTitle: {
  fontSize: 16,
  fontWeight: "600",
  marginLeft: 4,
  color: "#000",
  marginVertical: 8,
 },
 cardDescription: {
  marginVertical: 8,
  fontSize: 14,
  fontWeight: "400",
  marginLeft: 4,
  color: "#000",
  // marginVertical:8,
 },
 quote: {
  fontSize: 12,
  color: "#666",
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
 tripsText: {
  fontSize: 12,
  color: "#0D2927",
  fontWeight: 800,
 },
 searchButton: {
  marginTop: 18,
  backgroundColor: "#EF4354",
  paddingVertical: 12,
  borderRadius: 10,
  alignItems: "center",
 },
 searchButtonText: {
  color: "#fff",
  fontSize: 15,
  fontWeight: "600",
 },
})