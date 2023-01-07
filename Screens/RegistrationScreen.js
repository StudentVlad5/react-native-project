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
  Image,
} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';
import validator from 'validator';


export const RegistrationScreen = ({handleChangePage}) => {
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
    Keyboard.dismiss();
      if(validator.isEmail(email)){Alert.alert("Дані реєстрації", `${name} + ${email} + ${password}`)} else {Alert.alert("Невірно вказано email")}
  };
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      
    <View style={{width: windowWidth,
    height: windowHeight, }}>
      <ImageBackground source={require('../assets/background.png')} style={styles.image}>
          <View style={styles.containerTop}>
              <View style={styles.addAvatar}>
                <Image source={require('../assets/add.png')} style={styles.addImg}/>
              </View>
          </View>
          <View style={styles.container}>
              <KeyboardAvoidingView
              behavior={Platform.OS == "ios" ? "padding" : "height"}
              >
                <View style={styles.form}>
                  <Text style={styles.formTitle}>Реєстрація</Text>
                  <View>
                    <TextInput
                        value={name}
                        onChangeText={nameHandler}
                        placeholder="Логін"
                        style={{...styles.input, backgroundColor: nameHoverInput ?'white' : '#F6F6F6', borderColor: nameHoverInput? 'orange':'#E8E8E8'}}
                        onFocus={() => setNameHoverInput(true)}
                        onBlur={() => setNameHoverInput(false)}
                    />
                  </View>
                  <View>
                    <TextInput
                        value={email}
                        onChangeText={emailHandler}
                        placeholder="Адреса електроної пошти"
                        style={{...styles.input, backgroundColor: emailHoverInput ?'white' : '#F6F6F6', borderColor: emailHoverInput? 'orange':'#E8E8E8'}}
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
                      style={{...styles.input, backgroundColor: passwordHoverInput ?'white' : '#F6F6F6', borderColor: passwordHoverInput? 'orange':'#E8E8E8'}}
                      onFocus={() => setPasswordHoverInput(true)}
                      onBlur={() => setPasswordHoverInput(false)}
                    />
                    <Icon style={styles.iconView}
                      name={hidePass ? 'eye-slash' : 'eye'}
                      onPress={() => setHidePass(!hidePass)} />
                  </View>
                  <TouchableOpacity activeOpacity={0.7} style={styles.btn} onPress={onLogin}>
                    <Text style={styles.btnText}>Зареєструватися
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=>handleChangePage("loginScreen")}>
                    <Text style={styles.logInTitle}>Вже зареєстрований? Увійти </Text>
                  </TouchableOpacity>
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
    flex: 0.32,
  },
  container: {
    flex: 0.68,
    height: 549,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  addAvatar: {
    position: 'absolute',
    width: 120,
    height: 120,
    backgroundColor: '#F6F6F6',
    alignSelf: 'center',
    top: '70%',
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset:{width: 4,height: 4},
    shadowRadius: 5,
    borderRadius: 16,
    zIndex: 10,
  },
  form:{
    paddingHorizontal: 16,
    height: '100%',
    minWidth: '100%',
    alignItems: 'center',
  },
  formTitle: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 30,
    lineHeight: 35,
    textAlign: 'center',
    letterSpacing: .16,
    marginTop: 92,
    marginBottom: 32,
    color: '#212121',
  },
  input: {
    minWidth: '100%',
    height: 50,
    padding: 16,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 19,
    color: '#BDBDBD',
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  btn:{
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF6C00',
    width: "100%",
    height: 51,
    borderRadius: 100,
    marginTop: 27,
    marginBottom: 16,
  },
  btnText: {
    color: '#FFFFFF',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 19,
    textAlign: 'center',
  },
  iconView: {
    position: "absolute",
    right: 10,
    top: 16,
  },
  addImg:{
    width: 25,
    height: 25,
    position: 'absolute',
    right: -12,
    bottom: 14,
  },
  logInTitle:{
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 19,
    textAlign: 'center',
    color: '#1B4371',
  },
});