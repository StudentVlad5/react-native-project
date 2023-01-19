import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from "react-native";
import { Camera } from "expo-camera";
import * as Location from "expo-location";
import { storage, db } from "../../Firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, setDoc, doc } from "firebase/firestore";

export const CreateScreen = ({ navigation }) => {
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [comment, setComment] = useState("");
  const { userId, nickName } = useSelector((state) => state.auth);
 
  const requestCameraPermission = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    }
  requestCameraPermission()
  
  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  const takePhoto = async () => {
    const { uri } = await camera.takePictureAsync();
    let locations = await Location.getCurrentPositionAsync({});
    setPhoto(uri);
    setLocation(locations);
  };

  const sendPhoto = () => {
    uploadPostToServer();
    navigation.navigate("DefaultScreen", {photo});
  };

  const uploadPostToServer = async () => {
    const photo = await uploadPhotoToServer();
    const createPost = doc(collection(db, "posts"));
    await setDoc(createPost, {
      photo,
      comment,
      location: location.coords,
      userId,
      nickName,
    });
  };
  const uploadPhotoToServer = async () => {
    const response = await fetch(photo);
    const file = await response.blob();
    const uniquePostId = Date.now().toString();

    const storageRef = ref(storage, `postImage/${uniquePostId}`);
    await uploadBytes(storageRef, file);

    const processedPhoto = await getDownloadURL(storageRef);
    return processedPhoto;
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Camera style={styles.camera} ref={setCamera}>
          {photo && (
            <View style={styles.takePhotoContent}>
              <Image
                source={{ uri: photo }}
                style={{ height: 200, width: 200, borderRadius: 10 }}
              />
            </View>
          )}
          <TouchableOpacity onPress={takePhoto} style={styles.btn_container}>
            <Text style={styles.btn_text}>фото</Text>
          </TouchableOpacity>
        </Camera>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setComment(text)}
          />
        </View>

        <View style={styles.send_btn_wrap}>
          <TouchableOpacity
            onPress={sendPhoto}
            style={styles.send_btn_container}
          >
            <Text style={styles.send_btn_text}>ДОДАТИ</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  camera: {
    height: "70%",
    marginHorizontal: 2,
    marginTop: 2,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "flex-end",
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
    position: "absolute",
    top: 20,
    left: 10,
    borderRadius: 10,
    borderColor: "#fff",
    borderWidth: 1,
  },
  send_btn_wrap: {
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
  inputContainer: {
    marginHorizontal: 10,
    marginTop: 20,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#fff",
    borderBottomColor: "#20b2aa",
    borderRadius: 10,
    paddingLeft: 10,
  },
});
