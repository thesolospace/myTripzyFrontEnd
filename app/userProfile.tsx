import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Alert } from 'react-native';
import { useNavigation } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Animated, { Easing, useSharedValue, useAnimatedStyle, withTiming, withSpring } from 'react-native-reanimated';
import call from 'react-native-phone-call';

const { width } = Dimensions.get('window');

const badgesData = [
  { id: 1, name: 'Explorer', icon: 'compass', earned: true },
  { id: 2, name: 'Adventurer', icon: 'trail-sign', earned: true },
  { id: 3, name: 'Globetrotter', icon: 'globe', earned: false },
];

const tripsData = [
  { id: 1, name: 'Araku Valley', image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470', date: 'Dec 2025' },
  { id: 2, name: 'Kerala', image: 'https://images.unsplash.com/photo-1528127269322-539801943592', date: 'Jan 2026' },
];

const settingsData = [
  { id: 1, name: 'Edit Profile', icon: 'person', action: 'editProfile' },
  { id: 2, name: 'Notifications', icon: 'notifications', action: 'notificationSettings' },
  { id: 3, name: 'Support (1-800-TRAVEL)', icon: 'call', action: 'callSupport' },
  { id: 4, name: 'Privacy', icon: 'document-text', action: 'privacyPolicy' },
  { id: 5, name: 'Refer a Friend', icon: 'people', action: 'referFriend' },
  { id: 6, name: 'Logout', icon: 'log-out', action: 'logout' },
];

export default function ProfileScreen() {
  const navigation = useNavigation();
  const fadeAnim = useSharedValue(0);
  const badgeAnim = badgesData.map(() => useSharedValue(0));
  const tripAnim = tripsData.map(() => useSharedValue(0));

  useEffect(() => {
    fadeAnim.value = withTiming(1, { duration: 1200, easing: Easing.out(Easing.quad) });
    badgeAnim.forEach((anim, index) => {
      anim.value = withTiming(1, { duration: 800,  easing: Easing.out(Easing.cubic) });
    });
    tripAnim.forEach((anim, index) => {
      anim.value = withTiming(1, { duration: 800, easing: Easing.out(Easing.cubic) });
    });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: fadeAnim.value,
    transform: [{ translateY: withTiming(0, { duration: 1200 }) }],
  }));
  const animatedBadgeStyle = (index:any) =>
    useAnimatedStyle(() => ({
      opacity: badgeAnim[index].value,
      transform: [{ scale: withSpring(badgeAnim[index].value, { stiffness: 120, damping: 12 }) }],
    }));
  const animatedTripStyle = (index:any) =>
    useAnimatedStyle(() => ({
      opacity: tripAnim[index].value,
      transform: [{ translateX: withTiming(0, { duration: 800}) }],
    }));

  const handleSettingAction = (action:any) => {
    switch (action) {
      case 'callSupport':
        call({ number: '1800872835', prompt: false }).catch((error:any) => Alert.alert('Error', error.message));
        break;
      case 'logout':
        Alert.alert('Logout', 'Are you sure?', [
          { text: 'Cancel', style: 'cancel' },
          // { text: 'Yes', onPress: () => navigation.navigate('login') },
        ]);
        break;
      case 'referFriend':
        Alert.alert('Refer a Friend', 'Invite a friend and earn bonus travel points!', [
          { text: 'Cancel', style: 'cancel' },
          // { text: 'Invite', onPress: () => navigation.navigate('referFriend') },
        ]);
        break;
      default:
        navigation.navigate(action);
    }
  };

  const handleImageUpload = () => {
    Alert.alert('Upload Image', 'Would you like to upload a new profile or background image?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Yes', onPress: () => console.log('Image upload logic here') },
    ]);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Profile Header */}
      <Animated.View style={[styles.headerContainer, animatedStyle]}>
        <TouchableOpacity onPress={handleImageUpload}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0' }}
            style={styles.backgroundImage}
          />
        </TouchableOpacity>
        <View style={styles.profileOverlay}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1457449940276-e8deed18bfff' }}
            style={styles.profileImage}
          />
          <Text style={styles.userName}>Finney</Text>
          <Text style={styles.userStats}>2 Trips | 2/5 Badges</Text>
          <Text style={styles.userQuote}>
            "The world is full of magic things, patiently waiting for our senses to grow sharper." – W.B. Yeats
          </Text>
        </View>
      </Animated.View>

      {/* Motivation Card */}
      <TouchableOpacity style={styles.motivationCard} onPress={() => navigation.navigate('explore')}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1' }}
          style={styles.motivationImage}
        />
        <View style={styles.motivationOverlay}>
          <Text style={styles.motivationText}>Next Adventure Awaits!</Text>
          <Text style={styles.motivationSubText}>Earn more badges</Text>
        </View>
      </TouchableOpacity>

      {/* Badges Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Your Badges</Text>
        <View style={styles.badgeRow}>
          {badgesData.map((badge, index) => (
            <Animated.View key={badge.id} style={[styles.badgeItem, animatedBadgeStyle(index)]}>
              <Ionicons name={badge.icon} size={40} color={badge.earned ? '#FF9F1C' : '#ccc'} />
              <Text style={styles.badgeName}>{badge.name}</Text>
            </Animated.View>
          ))}
        </View>
      </View>

      {/* Trips Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Recent Trips</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tripRow}>
          {tripsData.map((trip, index) => (
             <TouchableOpacity onPress={() => navigation.navigate('tripDetails', { tripId: trip.id })}>
            <Animated.View key={trip.id} style={[styles.tripItem, animatedTripStyle(index)]}>
             
                <Image source={{ uri: trip.image }} style={styles.tripImage} />
                
        
              <View style={styles.tripInfo}>
                  <Text style={styles.tripName}>{trip.name}</Text>
                  <Text style={styles.tripDate}>{trip.date}</Text>
                </View>
            </Animated.View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Settings Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Settings</Text>
        {settingsData.map((setting) => (
          <TouchableOpacity
            key={setting.id}
            style={styles.settingItem}
            onPress={() => handleSettingAction(setting.action)}
          >
            <Ionicons name={setting.icon} size={20} color="#FF9F1C" />
            <Text style={styles.settingName}>{setting.name}</Text>
            <Ionicons name="chevron-forward" size={20} color="#666" />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  contentContainer: {
    paddingBottom: 30,
  },
  headerContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  backgroundImage: {
    width: width,
    height: 280, // Increased height to fit all content
    resizeMode: 'cover',
  },
  profileOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40, // Padding to prevent profile image cutoff
    paddingBottom: 20,
  },
  profileImage: {
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 3,
    borderColor: '#FF9F1C',
    marginBottom: 12,
  },
  userName: {
    fontSize: 28,
    fontFamily: 'Georgia',
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  userStats: {
    fontSize: 14,
    fontFamily: 'Helvetica',
    color: '#fff',
    marginTop: 6,
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  userQuote: {
    fontSize: 13,
    fontFamily: 'Times New Roman',
    fontStyle: 'italic',
    color: '#fff',
    textAlign: 'center',
    marginTop: 8,
    paddingHorizontal: 25,
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  motivationCard: {
    borderRadius: 20,
    overflow: 'hidden',
    marginHorizontal: 15,
    marginBottom: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  motivationImage: {
    width: '100%',
    height: 160,
  },
  motivationOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 12,
  },
  motivationText: {
    fontSize: 20,
    fontFamily: 'Georgia',
    fontWeight: 'bold',
    color: '#fff',
  },
  motivationSubText: {
    fontSize: 14,
    fontFamily: 'Helvetica',
    color: '#ddd',
    marginTop: 4,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 15,
    marginBottom: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  cardTitle: {
    fontSize: 20,
    fontFamily: 'Georgia',
    fontWeight: '700',
    color: '#007F7F',
    marginBottom: 12,
  },
  badgeRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
  },
  badgeItem: {
    alignItems: 'center',
  },
  badgeName: {
    fontSize: 13,
    fontFamily: 'Helvetica',
    color: '#333',
    marginTop: 8,
  },
  tripRow: {
    paddingVertical: 5,
    paddingLeft: 5,
  },
  tripItem: {
    minWidth: 200,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    // padding: 12,
    elevation: 2,

  },
  tripImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginRight: 12,
  },
  tripInfo: {
    flex: 1,
  },
  tripName: {
    fontSize: 16,
    fontFamily: 'Georgia',
    color: '#19320a',
    fontWeight: '500',
  },
  tripDate: {
    fontSize: 12,
    fontFamily: 'Helvetica',
    color: '#666',
    marginTop: 4,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  settingName: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Helvetica',
    color: '#333',
    marginLeft: 12,
  },
});