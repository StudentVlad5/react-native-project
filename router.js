import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RegistrationScreen } from "./Screens/RegistrationScreen";
import { LoginScreen } from "./Screens/LoginScreen";
import { CreateScreen } from "./Screens/MainScreen/CreateScreen";
import { ProfileScreen } from "./Screens/MainScreen/ProfileScreen";
import { PostsScreen } from "./Screens/MainScreen/PostsScreen";

export const useRoute = (isAuth) => {
    const Stack = createNativeStackNavigator();
    const MainTab = createBottomTabNavigator();
    if (!isAuth) {
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
        <MainTab.Navigator tabBarOptions={{showLabel:true}}>
          <MainTab.Screen
            options={{ headerShown: false }}
            name="Create"
            component={CreateScreen}
          ></MainTab.Screen>
          <MainTab.Screen
            options={{ headerShown: false, tabBarIcon:({focused, size,color})=>{}}}
            name="Posts"
            component={PostsScreen}
          ></MainTab.Screen>
          <MainTab.Screen
            options={{ headerShown: false }}
            name="Profile"
            component={ProfileScreen}
          ></MainTab.Screen>
        </MainTab.Navigator>
      );
    }
  };