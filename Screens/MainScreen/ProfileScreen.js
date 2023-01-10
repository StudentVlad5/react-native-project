import React from "react";
import { Text, View, StyleSheet, TouchableWithoutFeedback, Alert } from "react-native";
import { Entypo } from "@expo/vector-icons";

export const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Профайл</Text>
      <TouchableWithoutFeedback
        onPress={() => Alert.alert("Повернення на логін")}
      >
        <View>
          <Entypo name="log-out" size={24} color="black" />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "flex-start", alignItems: "center" },
});
