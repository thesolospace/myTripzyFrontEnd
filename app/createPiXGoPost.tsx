import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from 'expo-router';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const CreatePiXGoScreen = ({ route, navigation }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [images, setImages] = useState([]);
  const [aspectRatio, setAspectRatio] = useState('square'); // Default to square
  const currentUser = 'CurrentUser'; // Replace with actual user logic

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert('Permission Denied', 'Please allow access to your photos to upload images.');
      return;
    }

    let aspect;
    switch (aspectRatio) {
      case 'square':
        aspect = [1, 1]; // 1080x1080
        break;
      case 'landscape':
        aspect = [1.91, 1]; // 1080x566
        break;
      case 'vertical':
        aspect = [4, 5]; // 1080x1350
        break;
      default:
        aspect = [1, 1];
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
      aspect, // Enforce aspect ratio
      allowsEditing: true, // Enable cropping
    });

    if (!result.canceled) {
      setImages((prevImages) => [...prevImages, ...result.assets.map((asset) => asset.uri)]);
    }
  };

  const removeImage = (uri) => {
    setImages(images.filter((image) => image !== uri));
  };

  const handleSubmit = () => {
    if (!title || !description || !location || images.length === 0) {
      Alert.alert('Error', 'Please fill in all fields and select at least one image.');
      return;
    }

    const newPost = {
      id: Date.now().toString(),
      user: currentUser,
      profilePic: 'https://images.unsplash.com/photo-1535713875002-d1d0cfed188c', // Replace with actual user profile pic
      images,
      title,
      description,
      location,
      time: 'Just now',
      likes: 0,
      bookmarked: false,
    };

    navigation.navigate('PiXGo', { newPost });
    Alert.alert('Success', 'Post shared successfully!');
  };

  const renderImage = ({ item }) => {
    let height;
    switch (aspectRatio) {
      case 'square':
        height = SCREEN_WIDTH - 30; // 1:1
        break;
      case 'landscape':
        height = (SCREEN_WIDTH - 30) * (566 / 1080); // 1.91:1
        break;
      case 'vertical':
        height = (SCREEN_WIDTH - 30) * (1350 / 1080); // 4:5
        break;
      default:
        height = SCREEN_WIDTH - 30;
    }

    return (
      <View style={styles.imageContainer}>
        <Image source={{ uri: item }} style={[styles.previewImage, { height }]} />
        <TouchableOpacity style={styles.removeButton} onPress={() => removeImage(item)}>
          <Ionicons name="close-circle" size={20} color="#FFF" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>New Post</Text>
        <View style={styles.imageCount}>
          <Text style={styles.imageCountText}>{images.length} {images.length === 1 ? 'Photo' : 'Photos'}</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Image Preview */}
        {images.length === 0 ? (
          <TouchableOpacity style={styles.imagePickerPlaceholder} onPress={pickImage}>
            <Ionicons name="camera-outline" size={40} color="#888" />
            <Text style={styles.imagePickerText}>Add Photos</Text>
          </TouchableOpacity>
        ) : (
          <FlatList
            data={images}
            renderItem={renderImage}
            keyExtractor={(item) => item}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.imageList}
          />
        )}

        {/* Aspect Ratio Selector */}
        <View style={styles.aspectRatioContainer}>
          <TouchableOpacity
            style={[styles.aspectButton, aspectRatio === 'square' && styles.activeAspectButton]}
            onPress={() => setAspectRatio('square')}
          >
            <Text style={styles.aspectText}>Square (1:1)</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.aspectButton, aspectRatio === 'landscape' && styles.activeAspectButton]}
            onPress={() => setAspectRatio('landscape')}
          >
            <Text style={styles.aspectText}>Landscape (1.91:1)</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.aspectButton, aspectRatio === 'vertical' && styles.activeAspectButton]}
            onPress={() => setAspectRatio('vertical')}
          >
            <Text style={styles.aspectText}>Vertical (4:5)</Text>
          </TouchableOpacity>
        </View>

        {/* Form Inputs */}
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Write a title..."
            value={title}
            onChangeText={setTitle}
            placeholderTextColor="#888"
          />
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Write a caption..."
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={3}
            placeholderTextColor="#888"
          />
          <View style={styles.locationContainer}>
            <Ionicons name="location-outline" size={20} color="#888" />
            <TextInput
              style={styles.locationInput}
              placeholder="Add location"
              value={location}
              onChangeText={setLocation}
              placeholderTextColor="#888"
            />
          </View>
        </View>

        {/* Add More Images Button */}
        {images.length > 0 && (
          <TouchableOpacity style={styles.addMoreButton} onPress={pickImage}>
            <Ionicons name="add-circle-outline" size={24} color="#3897F0" />
            <Text style={styles.addMoreText}>Add More Photos</Text>
          </TouchableOpacity>
        )}

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Post</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  imageCount: {
    backgroundColor: '#EFEFEF',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  imageCountText: {
    fontSize: 14,
    color: '#333',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  imagePickerPlaceholder: {
    height: SCREEN_WIDTH - 30, // Default to square size
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
  },
  imagePickerText: {
    fontSize: 16,
    color: '#888',
    marginTop: 10,
  },
  imageList: {
    marginBottom: 10,
  },
  imageContainer: {
    position: 'relative',
    marginRight: 5,
  },
  previewImage: {
    width: SCREEN_WIDTH - 30, // Full width minus padding
    borderRadius: 8,
  },
  removeButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 12,
    padding: 2,
  },
  aspectRatioContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  aspectButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: '#EFEFEF',
  },
  activeAspectButton: {
    backgroundColor: '#3897F0',
  },
  aspectText: {
    fontSize: 14,
    color: '#333',
  },
  formContainer: {
    paddingHorizontal: 15,
  },
  input: {
    fontSize: 16,
    color: '#000',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
    marginBottom: 15,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
    paddingVertical: 10,
  },
  locationInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    marginLeft: 10,
  },
  addMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  addMoreText: {
    fontSize: 16,
    color: '#3897F0',
    marginLeft: 10,
  },
  submitButton: {
    backgroundColor: '#3897F0',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 15,
    marginTop: 10,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
});

export default CreatePiXGoScreen;