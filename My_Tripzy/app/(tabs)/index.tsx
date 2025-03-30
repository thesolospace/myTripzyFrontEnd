import { useNavigation } from "expo-router";
import { useState } from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity, ScrollView, FlatList, Button } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import CoreModel from "@/components/coreComponets/CoreModel";
import CoreModal from "@/components/coreComponets/CoreModel";
import ToastMessage, { showToast } from "@/components/coreComponets/ToastMessage";
import CoreModalWithTwoActions from "@/components/coreComponets/CoreModalWithTwoActions";
export type Trip = {
  title: string;
  description: string;
  date: string;
  duration: string;
  image: string;
};

export default function HomeScreen() {
  const navigation = useNavigation()

  const tripData: Trip = {
    title: "Aruku",
    description: "Araku Valley is a breathtaking hill station nestled in the Eastern Ghats of Andhra Pradesh, India.",
    date: "12th Dec 2025",
    duration: "3 Days || 2 Nights",
    image: "https://images.unsplash.com/photo-1457449940276-e8deed18bfff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  };

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

  const [selectedCategory, setSelectedCategory] = useState(categories[0].id);

  const getIconName = (categoryName: any) => {
    const category = categories.find(cat => cat.name === categoryName);
    return category ? category.icon : "help-circle"; // Fallback icon
  };
  const [modalVisible, setModalVisible] = useState(true);
  const [modalVisible1, setModalVisible1] = useState(true);

  return (
    <>
      <ScrollView style={styles.container}>
        {/* <View>
          <Button title="Show Success Toast" onPress={() => showToast('success', 'Success!', 'Operation completed!')} />
          <Button title="Show Error Toast" onPress={() => showToast('error', 'Error!', 'Something went wrong!')} />
          <Button title="Show Info Toast" onPress={() => showToast('info', 'Info!', 'This is an information message!')} />
        </View>
        <Button title="Show Modal with 2 actions " onPress={() => setModalVisible1(true)} /> */}
        {/* <View>
          <CoreModalWithTwoActions
            isVisible={modalVisible1}
            title="Delete Confirmation"
            content="Are you sure you want to delete this item?"
            onClose={() => setModalVisible(false)}
            onConfirm={() => {
              console.log("Confirmed!");
              setModalVisible1(false);
            }}
          />
        </View> */}
        {/* <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

          <Button title="Show Modal" onPress={() => setModalVisible(true)} />

          <CoreModal isVisible={modalVisible} onClose={() => setModalVisible(false)} title="Popup Title">
            <Text style={{ textAlign: 'center', fontSize: 16, marginBottom: 20 }}>
              Popup Content Goes Here
            </Text>


          </CoreModal>
        </View> */}
        <View style={styles.header}>

          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1457449940276-e8deed18bfff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            }}
            style={styles.profileImage}
          />
          <View style={styles.textContainer}>
            <View style={styles.welcomeText}>
              <Text style={styles.welcome}>Welcome</Text>
              <Text style={styles.userName}>Finney</Text>
            </View>
            <Text style={styles.quote}>Travel far enough to meet yourself.</Text>
          </View>
          <TouchableOpacity style={styles.tripsButton}  >
            <Text style={styles.tripsText}>My Trips</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.categoryContainer}>
          <FlatList
            data={categories}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.categoryItem,
                  selectedCategory === item.id && styles.categoryItemSelected,
                ]}
                onPress={() => {
                  setSelectedCategory(item.id);
                  // Optional navigation - uncomment if needed
                  // navigation.navigate("tripDetails", { category: item.name });
                }}
                activeOpacity={0.7}
              >
                <View style={[
                  styles.iconContainer,
                  selectedCategory === item.id && styles.iconContainerSelected
                ]}>
                  <Ionicons
                    name={getIconName(item.name)}
                    size={24}
                    color={selectedCategory === item.id ? '#FF9F1C' : '#666666'}
                  />
                </View>
                <Text
                  style={[
                    styles.categoryLabel,
                    selectedCategory === item.id && styles.categoryLabelSelected,
                  ]}
                  numberOfLines={1}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
        <View style={styles.cardStyle}>
          <Text style={styles.cardHeaderName}>Kerala Backwaters</Text>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1457449940276-e8deed18bfff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            }}
            style={styles.cardImage}
          />
          {/* <Text style={styles.cardTitle}></Text> */}
          <Text style={styles.cardDescription}>
            Araku Valley is a breathtaking hill station nestled in the Eastern Ghats of
            Andhra Pradesh, India. Known for its lush green landscapes, coffee
            plantations, and tribal culture, Araku is a perfect getaway for nature
            lovers, adventure seekers, and those looking to escape the hustle and
            bustle of city life.
          </Text>
          <View style={styles.welcomeText}>
            <Text style={[styles.cardTitle, { fontWeight: "400" }]}>Date :</Text>
            <Text style={styles.cardTitle}>12th Dec 2025 </Text>
            <Text style={[styles.cardTitle, { marginLeft: "auto" }]}>
              3 Days || 2 Nights
            </Text>

          </View>
          <TouchableOpacity style={[styles.tripsButton, { marginLeft: "auto" }]}

            onPress={() => navigation.navigate('tripDetails')}>
            <Text style={styles.tripsText}>Know More</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.cardStyle}>
          <Text style={styles.cardHeaderName}>Vizag</Text>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1457449940276-e8deed18bfff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            }}
            style={styles.cardImage}
          />
          {/* <Text style={styles.cardTitle}>Aruku</Text> */}
          <Text style={styles.cardDescription}>
            Araku Valley is a breathtaking hill station nestled in the Eastern Ghats of
            Andhra Pradesh, India. Known for its lush green landscapes, coffee
            plantations, and tribal culture, Araku is a perfect getaway for nature
            lovers, adventure seekers, and those looking to escape the hustle and
            bustle of city life.
          </Text>
          <View style={styles.welcomeText}>
            <Text style={[styles.cardTitle, { fontWeight: "400" }]}>Date :</Text>
            <Text style={styles.cardTitle}>12th Dec 2025 </Text>
            <Text style={[styles.cardTitle, { marginLeft: "auto" }]}>
              3 Days || 2 Nights
            </Text>

          </View>
          <TouchableOpacity style={[styles.tripsButton, { marginLeft: "auto" }]}

            onPress={() => navigation.navigate('createTrip')}>
            <Text style={styles.tripsText}>Know More</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.cardStyle}>
          <Text style={styles.cardHeaderName}>Aruku</Text>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1457449940276-e8deed18bfff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            }}
            style={styles.cardImage}
          />
          {/* <Text style={styles.cardTitle}>Aruku</Text> */}
          <Text style={styles.cardDescription}>
            Araku Valley is a breathtaking hill station nestled in the Eastern Ghats of
            Andhra Pradesh, India. Known for its lush green landscapes, coffee
            plantations, and tribal culture, Araku is a perfect getaway for nature
            lovers, adventure seekers, and those looking to escape the hustle and
            bustle of city life.
          </Text>
          <View style={styles.welcomeText}>
            <Text style={[styles.cardTitle, { fontWeight: "400" }]}>Date :</Text>
            <Text style={styles.cardTitle}>12th Dec 2025 </Text>
            <Text style={[styles.cardTitle, { marginLeft: "auto" }]}>
              3 Days || 2 Nights
            </Text>

          </View>
          <TouchableOpacity style={[styles.tripsButton, { marginLeft: "auto" }]}
            onPress={() => navigation.navigate('userRegistration')}>

            <Text style={styles.tripsText}>Know More</Text>
          </TouchableOpacity>
        </View>


        <View style={styles.cardStyle}>
          <Text style={styles.cardHeaderName}>Aruku</Text>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1457449940276-e8deed18bfff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            }}
            style={styles.cardImage}
          />
          {/* <Text style={styles.cardTitle}>Aruku</Text> */}
          <Text style={styles.cardDescription}>
            Araku Valley is a breathtaking hill station nestled in the Eastern Ghats of
            Andhra Pradesh, India. Known for its lush green landscapes, coffee
            plantations, and tribal culture, Araku is a perfect getaway for nature
            lovers, adventure seekers, and those looking to escape the hustle and
            bustle of city life.
          </Text>
          <View style={styles.welcomeText}>
            <Text style={[styles.cardTitle, { fontWeight: "400" }]}>Date :</Text>
            <Text style={styles.cardTitle}>12th Dec 2025 </Text>
            <Text style={[styles.cardTitle, { marginLeft: "auto" }]}>
              3 Days || 2 Nights
            </Text>

          </View>
          <TouchableOpacity style={[styles.tripsButton, { marginLeft: "auto" }]}
            onPress={() => navigation.navigate('userProfile')}>

            <Text style={styles.tripsText}>Know More</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
      <View style={styles.toastContainer}>
        <ToastMessage />
      </View>
    </>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 20,
    paddingBottom: 20,
    marginBottom: 2
  },
  toastContainer: {
    position: 'absolute',
    bottom: 0, // Adjust this value to move it up from the bottom
    alignSelf: 'center',
    width: '100%', // Slightly reduced width for a clean look
    alignItems: 'center',
    // zIndex: 999, // Ensures it stays on top of everything
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
    marginBottom: 8
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
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
    maxWidth: 100
  },
  tripsText: {
    fontSize: 12,
    color: "#0D2927",
    fontWeight: 800,
  },


  categoryContainer: {
    marginTop: 4,
    backgroundColor: '#ffffff',
  },
  listContent: {
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  categoryItem: {
    alignItems: 'center', // Center items vertically
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
    backgroundColor: '#f5f5f5', // Light gray background
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6, // Space between icon and text
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  iconContainerSelected: {
    borderColor: '#666666',
    backgroundColor: '#0D2927', // Slightly darker when selected
  },
  categoryIcon: {
    width: 24,
    height: 24,
    tintColor: '#666666',
  },
  categoryLabel: {
    fontSize: 12,
    color: '#333333',
    fontWeight: '500',
    textAlign: 'center',
  },
  categoryLabelSelected: {
    color: '#0D2927',
    fontWeight: '600',
  },
});
