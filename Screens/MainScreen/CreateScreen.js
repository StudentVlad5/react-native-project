import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Camera } from "expo-camera";
import * as Location from 'expo-location';

export const CreateScreen = ({navigation}) => {
const [camera, setCamera] = useState(null);
const [photo, setPhoto] = useState(null);
const [location, setLocation] = useState(null);

 const takePhoto = async() => { 
  const makePhoto = await camera.takePictureAsync();
  setPhoto(makePhoto.uri);
  console.log("photo", photo);
  console.log("location",location);
  let locations = await Location.getCurrentPositionAsync({});
  setLocation(locations);
 }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} ref={setCamera}>
        {photo && (
        <View style={styles.takePhotoContent}>
         <Image source={{ uri: photo }} style={{ height: 200, width: 200, borderRadius: 10,}}/>
        </View>)}
        <TouchableOpacity
          onPress={takePhoto}
          style={styles.btn_container}
        >
          <Text style={styles.btn_text}>фото</Text>
        </TouchableOpacity>
      </Camera>
      <View style={styles.send_btn_wrap}>
          <TouchableOpacity
          onPress={()=>{
            navigation.navigate('DefaultScreen', {photo})
          }}
          style={styles.send_btn_container}
        >
          <Text style={styles.send_btn_text}>ДОДАТИ</Text>
          </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, },
  camera: { height:"70%",
  marginHorizontal: 2,
  marginTop: 2,
  borderRadius: 10,
  alignItems: "center",
  justifyContent: "flex-end"
},
  btn_text: { color: "#fff" },
  btn_container: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 10,
    width: 60,
    height: 35,
  },
  takePhotoContent: {
    position: 'absolute',
    top: 20,
    left: 10,
    borderRadius: 10,
    borderColor: "#fff",
    borderWidth: 1,
  },
  send_btn_wrap:{
    justifyContent: "center",
    alignItems: "center",
  },
  send_btn_container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF6C00",
    width: "90%",
    height: 51,
    borderRadius: 100,
    marginTop: 27,
    marginBottom: 16,
  },
  send_btn_text: {
    color: "#FFFFFF",
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
  },
});
