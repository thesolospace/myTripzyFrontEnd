import React, { useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Share,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
} from 'react-native-reanimated';
import { useNavigation } from 'expo-router';

const { width } = Dimensions.get('window');

const postsData = [
  {
    id: '1',
    user: 'AlexTheExplorer',
    profilePic: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    images: ['https://images.unsplash.com/photo-1501785888041-af3ef285b470'],
    title: 'Alpine Adventure',
    description: 'Snowy peaks and cozy cabins—best trip yet!',
    location: 'Swiss Alps',
    time: '2h ago',
    likes: 45,
    bookmarked: false,
  },
  {
    id: '2',
    user: 'MayaWanderlust',
    profilePic: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    images: [
      'https://images.unsplash.com/photo-1528127269322-539801943592',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
    ],
    title: 'Kerala Chronicles',
    description: 'Backwaters, spices, and sunsets with the squad.',
    location: 'Kerala, India',
    time: '1d ago',
    likes: 78,
    bookmarked: false,
  },
  {
    id: '3',
    user: 'Travels',
    profilePic: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    images: [
      'https://images.unsplash.com/photo-1528127269322-539801943592',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
    ],
    title: 'Kerala Chronicles',
    description: 'Backwaters, spices, and sunsets with the squad.',
    location: 'Kerala, India',
    time: '1d ago',
    likes: 78,
    bookmarked: false,
  },
];

// PostCard Component
function PostCard({ item, index, onShare, onBookmark }) {
  const cardAnim = useSharedValue(0);

  useEffect(() => {
    cardAnim.value = withSpring(1, { delay: index * 100, stiffness: 120, damping: 15 });
  }, [index]);

  const animatedCardStyle = useAnimatedStyle(() => ({
    opacity: cardAnim.value,
    transform: [{ scale: cardAnim.value }],
  }));

  const renderImage = ({ item: image }) => (
    <TouchableOpacity onPress={() => onShare(item)}>
      <Image source={{ uri: image }} style={styles.postImage} />
    </TouchableOpacity>
  );

  return (
    <Animated.View style={[styles.postCard, animatedCardStyle]}>
         <View style={styles.headerRow}>
          <Image source={{ uri: item.profilePic }} style={styles.profilePic} />
          <View style={styles.headerText}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.subText}>
              {item.user} • {item.location} • {item.time}
            </Text>
          </View>
          <TouchableOpacity onPress={() => onBookmark(item.id)}>
            <Ionicons
              name={item.bookmarked ? 'bookmark' : 'bookmark-outline'}
              size={20}
              color={item.bookmarked ? '#FF6F61' : '#888'}
            />
          </TouchableOpacity>
        </View>
      <FlatList
        data={item.images}
        renderItem={renderImage}
        keyExtractor={(image, idx) => `${item.id}-image-${idx}`}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        style={styles.imageList}
      />
      {item.images.length > 1 && (
        <View style={styles.imageOverlay}>
          <Text style={styles.imageCount}>{item.images.length} Photos</Text>
        </View>
      )}

      <View style={styles.contentContainer}>
       

        <Text style={styles.description} numberOfLines={2}>
          {item.description}
        </Text>

        <View style={styles.actionsRow}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="heart-outline" size={18} color="#FF6F61" />
            <Text style={styles.actionText}>{item.likes}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={() => onShare(item)}>
            <Ionicons name="share-outline" size={18} color="#1A3C34" />
            <Text style={styles.actionText}>Share</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
}

// Main Component
export default function PiXGoScreen({ route }) {
    const navigation = useNavigation();
    const [posts, setPosts] = React.useState(postsData);
    const fadeAnim = useSharedValue(0);
  
    useEffect(() => {
      fadeAnim.value = withTiming(1, { duration: 800, easing: Easing.out(Easing.ease) });
      // Check for new post from CreatePostScreen
      if (route.params?.newPost) {
        setPosts((prevPosts) => [route.params.newPost, ...prevPosts]);
        // Clear params to avoid re-adding on re-render
        navigation.setParams({ newPost: null });
      }
    }, [route.params?.newPost]);

  const animatedContainerStyle = useAnimatedStyle(() => ({
    opacity: fadeAnim.value,
  }));

  const handleShare = async (post:any) => {
    try {
      await Share.share({
        message: `Check out "${post.title}" by ${post.user}: "${post.description}" - ${post.location}. Discover more on Travel Odyssey! Download here: [App Store/Play Store Link]`,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const toggleBookmark = (id:any) => {
    setPosts(posts.map((post) =>
      post.id === id ? { ...post, bookmarked: !post.bookmarked } : post
    ));
  };

  const renderPost = ({ item, index }) => (
    <PostCard
      item={item}
      index={index}
      onShare={handleShare}
      onBookmark={toggleBookmark}
    />
  );

  return (
    <Animated.View style={[styles.container, animatedContainerStyle]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Pictures on the Go!</Text>
        <TouchableOpacity onPress={() => navigation.navigate('createPiXGoPost')}>
          <Ionicons name="add-circle-outline" size={28} color="#FF6F61" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.feedContainer}
        showsVerticalScrollIndicator={false}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#1A3C34',
    elevation: 4,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F4E1D2',
  },
  feedContainer: {
    padding: 20,
  },
  postCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    marginBottom: 15,
    overflow: 'hidden',
    elevation: 3,
  },
  imageList: {
    height: 180,
  },
  postImage: {
    width: width - 20, // Full card width minus padding
    height: 180,
    resizeMode: 'cover',
  },
  imageOverlay: {
    position: 'absolute',
    top: 70,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 8,
    padding: 4,
  },
  imageCount: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  contentContainer: {
    padding: 12,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    padding:8
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A3C34',
  },
  subText: {
    fontSize: 12,
    color: '#666',
  },
  description: {
    fontSize: 14,
    color: '#333',
    marginBottom: 10,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
  },
  actionText: {
    fontSize: 12,
    color: '#1A3C34',
    marginLeft: 4,
  },
});