import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import { Ionicons } from '@expo/vector-icons'; // Assuming Expo vector icons is available

const { width } = Dimensions.get("window");

export default function JourneyDetailsScreen({ route }) {
  const trip = {
    _id: "123456789",
    title: "Ladakh Bike Adventure",
    description:
      "Embark on an epic bike journey through the rugged terrains of Ladakh, exploring monasteries and high-altitude passes.",
    startDate: new Date("2025-03-19"),
    startTime: "10:00 AM",
    returnDate: new Date("2025-03-22"),
    returnTime: "6:00 PM",
    travelType: "bike",
    travelFrom: "Delhi",
    destinations: [
      { name: "Manali", lat: 32.2396, lng: 77.1887 },
      { name: "Leh", lat: 34.1526, lng: 77.5771 },
    ],
    itinerary: [
      {
        date: new Date("2025-03-19"),
        activities: [
          { title: "Ride to Manali", description: "Start journey from Delhi", location: "Manali" },
        ],
      },
      {
        date: new Date("2025-03-20"),
        activities: [
          { title: "Visit Hidimba Temple", description: "Explore local culture", location: "Manipur" },
        ],
      },
    ],
    numberOfPeople: 15,
    currentParticipants: [{ userId: "user123", joinedAt: new Date() }],
    images: [
      "https://images.unsplash.com/photo-1623571430216-5653698d02c8",
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da",
      "https://images.unsplash.com/photo-1661919589683-f11880119fb7",
    ],
    price: 25000,
    status: "planned",
  };

  const handleReserveSpot = () => {
    console.log("Reserved spot for:", trip.title);
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const formatDateMonth = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };
  
  const getTripDuration = () => {
    const diffTime = Math.abs(trip.returnDate - trip.startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} Days`;
  };

  return (
    <View style={styles.container}>
      {/* Enhanced Header */}
      <Animated.View style={styles.headerArea}>
        <View style={styles.headerContent}>
          <Text style={styles.journeyTitle}>{trip.title}</Text>
          <View style={styles.headerInfo}>
            <View style={styles.headerTag}>
              <Ionicons name={trip.travelType === "bike" ? "bicycle" : "train"} size={16} color="#F57C00" />
              <Text style={styles.tripSpan}>{trip.travelType.toUpperCase()}</Text>
            </View>
            <Text style={styles.duration}>{getTripDuration()}</Text>
          </View>
        </View>
      </Animated.View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Image Slider with Overlay */}
        <View style={styles.imageContainer}>
          <ScrollView horizontal pagingEnabled style={styles.imageSlider}>
            {trip.images.map((uri, index) => (
              <Animated.Image
                key={index}
                source={{ uri }}
                style={styles.tripImage}
                entering={FadeInUp.delay(index * 150)}
              />
            ))}
          </ScrollView>
          <View style={styles.imageOverlay}>
            <Text style={styles.dateRange}>
              {formatDate(trip.startDate)} - {formatDate(trip.returnDate)}
            </Text>
          </View>
        </View>

        {/* Content Sections */}
        <View style={styles.contentArea}>
          <Animated.View entering={FadeInUp.delay(200)} style={styles.detailBox}>
            <Text style={styles.boxTitle}>Overview</Text>
            <Text style={styles.boxText}>{trip.description}</Text>
          </Animated.View>

          <Animated.View entering={FadeInUp.delay(300)} style={styles.detailBox}>
            <Text style={styles.boxTitle}>Trip Details</Text>
            <View style={styles.infoGrid}>
              <View style={styles.infoItem}>
                <Ionicons name="location-outline" size={20} color="#607D8B" />
                <Text style={styles.infoText}>From: {trip.travelFrom}</Text>
              </View>
              <View style={styles.infoItem}>
                <Ionicons name="time-outline" size={20} color="#607D8B" />
                <Text style={styles.infoText}>
                  {trip.startTime} @ {formatDateMonth(trip.startDate)}  -  {trip.returnTime} @ {formatDateMonth(trip.returnDate)}
                </Text>
              </View>
            </View>
          </Animated.View>

          <Animated.View entering={FadeInUp.delay(400)} style={styles.detailBox}>
            <Text style={styles.boxTitle}>Destinations</Text>
            {trip.destinations.map((dest, index) => (
              <View key={index} style={styles.destinationItem}>
                <Ionicons name="pin" size={16} color="#F57C00" />
                <Text style={styles.boxText}>{dest.name}</Text>
              </View>
            ))}
          </Animated.View>

          <Animated.View entering={FadeInUp.delay(500)} style={styles.detailBox}>
            <Text style={styles.boxTitle}>Itinerary</Text>
            {trip.itinerary.map((day, index) => (
              <View key={index} style={styles.itineraryDay}>
                <Text style={styles.dayTag}>
                  Day {index + 1} • {formatDate(day.date)}
                </Text>
                {day.activities.map((activity, actIndex) => (
                  <View key={actIndex} style={styles.activityItem}>
                    <Text style={styles.activityTitle}>{activity.title}</Text>
                    <Text style={styles.activityDesc}>{activity.description}</Text>
                    <Text style={styles.activityLocation}>{activity.location}</Text>
                  </View>
                ))}
              </View>
            ))}
          </Animated.View>

          <Animated.View entering={FadeInUp.delay(600)} style={styles.detailBox}>
            <Text style={styles.boxTitle}>Availability</Text>
            <View style={styles.participantsRow}>
              <Ionicons name="people-outline" size={20} color="#607D8B" />
              <Text style={styles.boxText}>
                {trip.currentParticipants.length}/{trip.numberOfPeople} spots booked
              </Text>
            </View>
          </Animated.View>

          <View style={styles.contentEnd} />
        </View>
      </ScrollView>

      {/* Enhanced Footer */}
      <Animated.View style={styles.footerBar} entering={FadeInUp.delay(700)}>
        <View>
          <Text style={styles.rateDisplay}>₹{trip.price.toLocaleString()}</Text>
          <Text style={styles.rateSubtext}>per person</Text>
        </View>
        <TouchableOpacity
          style={[
            styles.reserveButton,
            trip.currentParticipants.length >= trip.numberOfPeople && styles.disabledButton
          ]}
          onPress={handleReserveSpot}
          activeOpacity={0.7}
          disabled={trip.currentParticipants.length >= trip.numberOfPeople}
        >
          <Text style={styles.reserveButtonText}>
            {trip.currentParticipants.length >= trip.numberOfPeople ? "Fully Booked" : "Join Now"}
          </Text>
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
  headerArea: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    paddingTop: 8,
    padding: 20,
    backgroundColor: "#fff",
    elevation: 5,
  },
  headerContent: {
    marginBottom: 10,
  },
  journeyTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1A3C4A",
  },
  headerInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  headerTag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF3E0",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 10,
  },
  tripSpan: {
    fontSize: 14,
    color: "#F57C00",
    fontWeight: "600",
    marginLeft: 4,
  },
  duration: {
    fontSize: 14,
    color: "#607D8B",
    fontWeight: "500",
  },
  imageContainer: {
    position: "relative",
    marginBottom:16
  },
  imageSlider: {
    height: 280,
    marginTop: 110,
  },
  tripImage: {
    width: width,
    height: 280,
    resizeMode: "cover",
  },
  imageOverlay: {
    position: "absolute",
    bottom: 15,
    left: 15,
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: 8,
    borderRadius: 8,
  },
  dateRange: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },
  contentArea: {
    padding: 20,
    paddingTop: 0,
  },
  detailBox: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 15,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  boxTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1A3C4A",
    marginBottom: 12,
  },
  boxText: {
    fontSize: 15,
    color: "#455A64",
    lineHeight: 22,
  },
  infoGrid: {
    gap: 10,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  infoText: {
    fontSize: 15,
    color: "#455A64",
  },
  destinationItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 8,
  },
  itineraryDay: {
    marginBottom: 15,
  },
  dayTag: {
    fontSize: 16,
    fontWeight: "600",
    color: "#F57C00",
    marginBottom: 8,
  },
  activityItem: {
    marginLeft: 10,
    marginBottom: 10,
  },
  activityTitle: {
    fontSize: 15,
    fontWeight: "500",
    color: "#1A3C4A",
  },
  activityDesc: {
    fontSize: 14,
    color: "#607D8B",
  },
  activityLocation: {
    fontSize: 13,
    color: "#F57C00",
  },
  participantsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  contentEnd: {
    height: 80,
  },
  footerBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#1A3C4A",
    paddingVertical: 15,
    paddingHorizontal: 20,
    elevation: 10,
  },
  rateDisplay: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#F57C00",
  },
  rateSubtext: {
    fontSize: 12,
    color: "#fff",
    opacity: 0.8,
  },
  reserveButton: {
    backgroundColor: "#F57C00",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  disabledButton: {
    backgroundColor: "#B0BEC5",
  },
  reserveButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
});