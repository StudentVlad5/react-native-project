import {
  Button,
  PermissionsAndroid,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { Provider } from "react-redux";
import { store } from "./Redux/store";
import { Main } from "./Components/Main";

export default function App() {

  const [statusPermissionCamera, setStatusPermissionCamera] = useState(null);

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "Cool Photo App Camera Permission",
          message:
            "Cool Photo App needs access to your camera " +
            "so you can take awesome pictures.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the camera");
      } else {
        console.log("Camera permission denied");
      }
    } catch (err) {
      console.warn(err);
    } finally {
      setStatusPermissionCamera("granted"), console.log(statusPermissionCamera);
    }
  };

  if (!statusPermissionCamera) {
    return (
      <View style={styles.container}>
        <Text style={styles.item}>Потрібно підтвердження</Text>
        <Button
          title="Надати дозвіл до користування камерою"
          onPress={requestCameraPermission}
        />
      </View>
    );
  } else {
    return (
      <Provider store={store}>
        <Main/>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: StatusBar.currentHeight,
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
  item: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
