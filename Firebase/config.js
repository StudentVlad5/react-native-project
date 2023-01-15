import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAe7hXdvSmBR3ipdnUCtMNyN4bF-Dth368",
  authDomain: "react-native-project-64b51.firebaseapp.com",
  projectId: "react-native-project-64b51",
  storageBucket: "react-native-project-64b51.appspot.com",
  messagingSenderId: "870955026645",
  appId: "1:870955026645:web:f0bbdd1343e97fd6803a5c",
  measurementId: "G-3ZFE3JQWG5",
};
Object.freeze(firebaseConfig);
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
