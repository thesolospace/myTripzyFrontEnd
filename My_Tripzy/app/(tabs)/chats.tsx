import { StyleSheet, Image, Platform, Text } from 'react-native';
import { useRoute } from '@react-navigation/native'; // Import useRoute if using React Navigation
import PiXGoScreen from '../PiXGo'; // Ensure the path is correct

export default function PixelsOnTheGo() {
  const route = useRoute(); // Get route from navigation context

  return <PiXGoScreen route={route} />;
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});