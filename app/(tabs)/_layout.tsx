import React, { useEffect } from "react";
import { Tabs } from "expo-router";
import { useTheme } from "react-native-paper";
import {
 Chrome as Home,
 Search,
 CirclePlus as PlusCircle,
 MessageCircle,
 User,
 House,
} from "lucide-react-native";

export default function TabLayout() {
 const theme = useTheme();

 return (
  <Tabs
   screenOptions={{
    tabBarActiveTintColor: theme.colors.primary,
    tabBarInactiveTintColor: theme.colors.outline,
    tabBarStyle: {
     backgroundColor: theme.colors.background,
     borderTopColor: theme.colors.outline,
     paddingTop: 4,
     height: 60,
    },
    tabBarLabelStyle: {
     fontSize: 12,
     fontWeight: "500",
    },
    headerShown: false,
   }}
  >
   <Tabs.Screen
    name="index"
    options={{
     title: "Home",
     tabBarIcon: ({ color, size }) => <House size={size} color={color} />,
    }}
   />
   <Tabs.Screen
    name="discover"
    options={{
     title: "Discover",
     tabBarIcon: ({ color, size }) => <Search size={size} color={color} />,
    }}
   />
   <Tabs.Screen
    name="create"
    options={{
     title: "Create",
     tabBarIcon: ({ color, size }) => <PlusCircle size={size} color={color} />,
    }}
   />
   <Tabs.Screen
    name="chats"
    options={{
     title: "PiX Go",
     tabBarIcon: ({ color, size }) => (
      <MessageCircle size={size} color={color} />
     ),
    }}
   />
   <Tabs.Screen
    name="profile"
    options={{
     title: "Profile",
     tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
    }}
   />
  </Tabs>
 );
}


// import React from "react";
// import { Tabs } from "expo-router";
// import { View, Text, StyleSheet, SafeAreaView } from "react-native";
// import { useTheme } from "react-native-paper";
// import {
//  Chrome as Home,
//  Search,
//  CirclePlus as PlusCircle,
//  MessageCircle,
//  User,
//  House,
// } from "lucide-react-native";

// // ✅ Custom Header Component
// const CustomHeader = () => (
//  <SafeAreaView style={styles.header}>
//   <Text style={styles.headerText}>Tripzy</Text>
//  </SafeAreaView>
// );

// // ✅ Custom Footer Component (optional)
// const CustomFooter = () => (
//  <View style={styles.footer}>
//   <Text style={styles.footerText}>© 2025 Tripzy</Text>
//  </View>
// );

// export default function TabLayout() {
//  const theme = useTheme();

//  return (
//   <View style={{ flex: 1 }}>
//    <CustomHeader />

//    <Tabs
//     screenOptions={{
//      tabBarActiveTintColor: theme.colors.primary,
//      tabBarInactiveTintColor: theme.colors.outline,
//      tabBarStyle: {
//       backgroundColor: theme.colors.background,
//       borderTopColor: theme.colors.outline,
//       paddingTop: 4,
//       height: 60,
//      },
//      tabBarLabelStyle: {
//       fontSize: 12,
//       fontWeight: "500",
//      },
//      headerShown: false,
//     }}
//    >
//     <Tabs.Screen
//      name="index"
//      options={{
//       title: "Home",
//       tabBarIcon: ({ color, size }) => <House size={size} color={color} />,
//      }}
//     />
//     <Tabs.Screen
//      name="discover"
//      options={{
//       title: "Discover",
//       tabBarIcon: ({ color, size }) => <Search size={size} color={color} />,
//      }}
//     />
//     <Tabs.Screen
//      name="create"
//      options={{
//       title: "Create",
//       tabBarIcon: ({ color, size }) => (
//        <PlusCircle size={size} color={color} />
//       ),
//      }}
//     />
//     <Tabs.Screen
//      name="chats"
//      options={{
//       title: "PiX Go",
//       tabBarIcon: ({ color, size }) => (
//        <MessageCircle size={size} color={color} />
//       ),
//      }}
//     />
//     <Tabs.Screen
//      name="profile"
//      options={{
//       title: "Profile",
//       tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
//      }}
//     />
//    </Tabs>

//    <CustomFooter />
//   </View>
//  );
// }

// const styles = StyleSheet.create({
//  header: {
//   backgroundColor: "#0D2927",
//   paddingVertical: 12,
//   alignItems: "center",
//  },
//  headerText: {
//   color: "#fff",
//   fontSize: 20,
//   fontWeight: "bold",
//  },
//  footer: {
//   backgroundColor: "#f5f5f5",
//   paddingVertical: 8,
//   alignItems: "center",
//  },
//  footerText: {
//   fontSize: 12,
//   color: "#888",
//  },
// });
