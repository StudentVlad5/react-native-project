import React, { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RegistrationScreen } from "./Screens/RegistrationScreen";
import { LoginScreen } from "./Screens/LoginScreen";
import { CreateScreen } from "./Screens/MainScreen/CreateScreen";
import { ProfileScreen } from "./Screens/MainScreen/ProfileScreen";
import { PostsScreen } from "./Screens/MainScreen/PostsScreen";
import { AntDesign, Feather, Entypo, MaterialCommunityIcons } from "@expo/vector-icons";


export const useRoute = () => {
  const Stack = createNativeStackNavigator();
  const MainTab = createBottomTabNavigator();
  const [isAuth, setIsAuth] = useState(true);

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
      <MainTab.Navigator screenOptions={{ tabBarShowLabel: false }}>
        <MainTab.Screen
          options={{
            title: "Публікації",
            headerStyle: {
              backgroundColor: "#f4511e"
            },
            headerTitleAlign: 'center',
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 20,
            },
            headerRight: () => (
              <Entypo name="log-out" size={24} color="black" onPress={()=>setIsAuth(false)}/>
            ),
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
            title: "Створити публікацію",
            headerStyle: {
              backgroundColor: "#f4511e"
            },
            headerTitleAlign: 'center',
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 20,
            },
            headerRight: () => (
              <Entypo name="log-out" size={24} color="black" onPress={()=>setIsAuth(false)}/>
            ),
            tabBarIcon: ({ focused, size, color }) => (
              <AntDesign name="pluscircleo" size={size} color={color} />
            ),
          }}
          name="Create"
          component={CreateScreen}
        />
        <MainTab.Screen
          options={{
            title: "Профайл",
            headerStyle: {
              backgroundColor: "#f4511e"
            },
            headerTitleAlign: 'center',
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 20,
            },
            headerRight: () => (
              <Entypo name="log-out" size={24} color="black" onPress={()=>setIsAuth(false)}/>
            ),
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
