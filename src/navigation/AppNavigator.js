// File: src/navigation/AppNavigator.js

import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
import CatalogScreen from "../screens/CatalogScreen";
import CamperDetailsScreen from "../screens/CamperDetailsScreen";
import FavoritesScreen from "../screens/FavoritesScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Окремий стек для каталогу, щоб можна було переходити на деталі
function CatalogStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CatalogList"
        component={CatalogScreen}
        options={{ title: "Catalog" }}
      />
      <Stack.Screen
        name="CamperDetails"
        component={CamperDetailsScreen}
        options={{ title: "Camper Info" }}
      />
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName =
            route.name === "Home"
              ? "home"
              : route.name === "Catalog"
                ? "bus"
                : "heart";
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#E44848",
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Catalog" component={CatalogStack} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
    </Tab.Navigator>
  );
}
