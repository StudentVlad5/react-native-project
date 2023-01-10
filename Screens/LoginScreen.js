import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Dimensions,
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Alert,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import validator from "validator";
import { useNavigation } from "@react-navigation/native";

export const LoginScreen = (isAuth) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hidePass, setHidePass] = useState(true);
  const [emailHoverInput, setEmailHoverInput] = useState(false);
  const [passwordHoverInput, setPasswordHoverInput] = useState(false);
  const navigation = useNavigation();

  const emailHandler = (text) => setEmail(text);
  const passwordHandler = (text) => setPassword(text);

  const onLogin = () => {
    Keyboard.dismiss();
    if (validator.isEmail(email)) {
      Alert.alert("Дані для входу", `${email} + ${password}`);
    } else {
      Alert.alert("Невірно вказано email");
    }
  };
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  return (
    <View style={styles.wrap}>
      <StatusBar style="auto" />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ width: windowWidth, height: windowHeight }}>
          <ImageBackground
            source={require("../assets/background.png")}
            style={styles.image}
          >
            <View style={styles.containerTop}></View>
            <View style={styles.container}>
              <KeyboardAvoidingView
                behavior={Platform.OS == "ios" ? "padding" : "height"}
              >
                <View style={styles.form}>
                  <Text style={styles.formTitle}>Увійти</Text>
                  <View>
                    <TextInput
                      value={email}
                      onChangeText={emailHandler}
                      placeholder="Адреса електроної пошти"
                      style={{
                        ...styles.input,
                        backgroundColor: emailHoverInput ? "white" : "#F6F6F6",
                        borderColor: emailHoverInput ? "orange" : "#E8E8E8",
                      }}
                      onFocus={() => setEmailHoverInput(true)}
                      onBlur={() => setEmailHoverInput(false)}
                    />
                  </View>
                  <View>
                    <TextInput
                      value={password}
                      onChangeText={passwordHandler}
                      placeholder="Пароль"
                      secureTextEntry={hidePass ? true : false}
                      style={{
                        ...styles.input,
                        backgroundColor: passwordHoverInput
                          ? "white"
                          : "#F6F6F6",
                        borderColor: passwordHoverInput ? "orange" : "#E8E8E8",
                      }}
                      onFocus={() => setPasswordHoverInput(true)}
                      onBlur={() => setPasswordHoverInput(false)}
                    />
                    <Icon
                      style={styles.iconView}
                      name={hidePass ? "eye-slash" : "eye"}
                      onPress={() => setHidePass(!hidePass)}
                    />
                  </View>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.btn}
                    onPress={onLogin}
                  >
                    <Text style={styles.btnText}>Увійти</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Registration")}
                  >
                    <Text style={styles.logInTitle}>
                      Відсутній акаунт? Зареєструватися
                    </Text>
                  </TouchableOpacity>
                </View>
              </KeyboardAvoidingView>
            </View>
          </ImageBackground>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  containerTop: {
    flex: 0.4,
  },
  container: {
    flex: 0.6,
    height: 549,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  form: {
    paddingHorizontal: 16,
    height: "100%",
    minWidth: "100%",
    alignItems: "center",
  },
  formTitle: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    letterSpacing: 0.16,
    marginTop: 32,
    marginBottom: 32,
    color: "#212121",
  },
  input: {
    minWidth: "100%",
    height: 50,
    padding: 16,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  btn: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF6C00",
    width: "100%",
    height: 51,
    borderRadius: 100,
    marginTop: 27,
    marginBottom: 16,
  },
  btnText: {
    color: "#FFFFFF",
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
  },
  iconView: {
    position: "absolute",
    right: 10,
    top: 16,
  },
  addImg: {
    width: 25,
    height: 25,
    position: "absolute",
    right: -12,
    bottom: 14,
  },
  logInTitle: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    color: "#1B4371",
  },
});
