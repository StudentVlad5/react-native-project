
import {useState} from 'react'; 
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { RegistrationScreen } from "./Screens/RegistrationScreen";
import { LoginScreen } from "./Screens/LoginScreen";


export default function App() {
  const [statusEnter,setStatusEnter] = useState('loginScreen');
  const handleChangePage = (newstatusEnter) => {setStatusEnter(newstatusEnter)}

  return (
    <View style={styles.container}>
      {statusEnter === 'loginScreen' && <LoginScreen handleChangePage={handleChangePage}/>}
      {statusEnter === 'registrationScreen' && <RegistrationScreen handleChangePage={handleChangePage}/>}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
