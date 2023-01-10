import React, { useState, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RegistrationScreen } from "./Screens/RegistrationScreen";
import { LoginScreen } from "./Screens/LoginScreen";
import { CreateScreen } from "./Screens/MainScreen/CreateScreen";
import { ProfileScreen } from "./Screens/MainScreen/ProfileScreen";
import { PostsScreen } from "./Screens/MainScreen/PostsScreen";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";


export const useRoute = () => {
  const Stack = createNativeStackNavigator();
  const MainTab = createBottomTabNavigator();
  const [isAuth, setIsAuth] = useState(null);

  if (isAuth) {
    return (
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Registration"
          component={RegistrationScreen}
        />
      </Stack.Navigator>
    );
  } else {
    return (
      <MainTab.Navigator tabBarOptions={{ showLabel: false }}>
        <MainTab.Screen
          options={{
            headerShown: false,
            tabBarIcon: ({ focused, size, color }) => (
              <MaterialCommunityIcons
                name="file-table-outline"
                size={size}
                color={color}
              />
            ),
          }}
          name="Posts"
          component={PostsScreen}
        />
        <MainTab.Screen
          options={{
            headerShown: false,
            tabBarIcon: ({ focused, size, color }) => (
              <AntDesign name="pluscircleo" size={size} color={color} />
            ),
          }}
          name="Create"
          component={CreateScreen}
        />
        <MainTab.Screen
          options={{
            headerShown: false,
            tabBarIcon: ({ focused, size, color }) => (
              <Feather name="user" size={size} color={color} />
            ),
          }}
          name="Profile"
          component={ProfileScreen}
        />
      </MainTab.Navigator>
    );
  }
};
