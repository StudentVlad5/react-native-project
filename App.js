import { NavigationContainer } from "@react-navigation/native";
import { useRoute } from "./router";
import { Button, PermissionsAndroid, StatusBar, StyleSheet, Text, View } from "react-native";
import { useState } from "react";

export default function App() {
  const userouter = useRoute();

  const [statusPermissionCamera, setStatusPermissionCamera] = useState(null)
  const [statusPermissionLocation, setStatusPermissionLocation] = useState(null)
  
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
        buttonPositive: "OK"
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can use the camera");
    } else {
      console.log("Camera permission denied");
    }
  } catch (err) {
    console.warn(err);
  }
  finally { setStatusPermissionCamera("setStatus")}
};

const requestLocationPermission = async () => {
  try {
  const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
    {
      title: "Cool Location Permission",
      message:
        "You can use location for your pictures.",
      buttonNeutral: "Ask Me Later",
      buttonNegative: "Cancel",
      buttonPositive: "OK"
    }
  );
  if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    console.log("You can use the location");
  } else {
    console.log("Location  permission denied");
  }
} catch (err) {
  console.warn(err);
}
finally { setStatusPermissionLocation("setStatus")}
};

   if(!statusPermissionCamera && !statusPermissionLocation) 
   {return <View style={styles.container}>
              <Text style={styles.item}>Потрібно підтвердження</Text>
              <Button title="Надати дозвіл до користування камерою" onPress={requestCameraPermission} />
            </View>} 
else if(statusPermissionCamera && !statusPermissionLocation){
  return <View style={styles.container}>
            <Text style={styles.item}>Потрібно підтвердження</Text>
            <Button title="Надати дозвіл до користування геолокацією" onPress={requestLocationPermission} />
          </View>} 
 else {return <NavigationContainer>{userouter}</NavigationContainer>}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: StatusBar.currentHeight,
    backgroundColor: "#ecf0f1",
    padding: 8
  },
  item: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center"
  }
});