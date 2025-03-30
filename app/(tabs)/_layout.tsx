import React from "react";
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
