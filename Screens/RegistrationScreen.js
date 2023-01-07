import React, { useState } from "react";
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
import Icon from 'react-native-vector-icons/FontAwesome5';
import validator from 'validator';


export const RegistrationScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hidePass, setHidePass] = useState(true);
  const [nameHoverInput,setNameHoverInput] = useState(false);
  const [emailHoverInput,setEmailHoverInput] = useState(false);
  const [passwordHoverInput,setPasswordHoverInput] = useState(false);
   
  const nameHandler = (text) => setName(text);
  const emailHandler = (text) => setEmail(text);
  const passwordHandler = (text) => setPassword(text);
    
  const onLogin = () => {
    if(validator.isEmail(email)){Alert.alert("Дані реєстрації", `${name} + ${password}`)} else {Alert.alert("Невірно вказано email")}
  };
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={{width: windowWidth,
    height: windowHeight, }}>
      <ImageBackground source={require('../assets/background.png')} style={styles.image}>
          <View style={styles.containerTop}></View>
          <View style={styles.container}>
              <KeyboardAvoidingView
              behavior={Platform.OS == "ios" ? "padding" : "height"}
              >
                <View style={styles.form}>
                  <View>
                    <TextInput
                        value={name}
                        onChangeText={nameHandler}
                        placeholder="Логін"
                        style={{...styles.input, backgroundColor: nameHoverInput ?'white' : 'grey', borderColor: nameHoverInput? 'orange':'black'}}
                        onFocus={() => setNameHoverInput(true)}
                        onBlur={() => setNameHoverInput(false)}
                    />
                  </View>
                  <View>
                    <TextInput
                        value={email}
                        onChangeText={emailHandler}
                        placeholder="Адреса електроної пошти"
                        style={{...styles.input, backgroundColor: emailHoverInput ?'white' : 'grey', borderColor: emailHoverInput? 'orange':'black'}}
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
                      style={{...styles.input, backgroundColor: passwordHoverInput ?'white' : 'grey', borderColor: passwordHoverInput? 'orange':'black'}}
                      onFocus={() => setPasswordHoverInput(true)}
                      onBlur={() => setPasswordHoverInput(false)}
                    />
                    <Icon style={styles.iconView}
                      name={hidePass ? 'eye-slash' : 'eye'}
                      onPress={() => setHidePass(!hidePass)} />
                  </View>
                  <TouchableOpacity activeOpacity={0.7} style={styles.btn} onPress={onLogin}><Text style={styles.btnText}>Зареєструватися</Text></TouchableOpacity>
                  <Text>Вже зареєстрований? </Text><Text>Увійти </Text>
                </View>
              </KeyboardAvoidingView>
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  containerTop: {
    flex: 0.3,
  },
  container: {
    flex: 0.7,
    height: 549,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
  },
  form:{
    marginHorizontal: 15,
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderRadius: 6,
    marginBottom: 10,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  btn:{
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2196F3',
    width: 200,
    height: 44,
    borderRadius: 6,
  },
  btnText: {
    color: '#fff',
    fontSize: 18,
  },
  iconView: {
    position: "absolute",
    right: 10,
    top: 16,
  },
});