import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { DefaultScreenPosts } from "../NestedScreens/DefaultScreenPosts";
import { CommentsScreen } from "../NestedScreens/CommentsScreen";
import { MapScreen } from "../NestedScreens/MapScreen";

const NestedScreen = createStackNavigator();

export const PostsScreen = () => {
  return (
    <NestedScreen.Navigator screenOptions={{ showLabel: false }}>
      <NestedScreen.Screen 
          options={{
            title: false,
            headerShown: false,
          }}
        name="DefaultScreen"
        component={DefaultScreenPosts}
      />
      <NestedScreen.Screen name="Comments" component={CommentsScreen} />
      <NestedScreen.Screen name="Map" component={MapScreen} />
    </NestedScreen.Navigator>
  );
};
