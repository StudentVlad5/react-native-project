import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../../Firebase/config";
import { authSlice } from "./AuthReducer";
import { Alert } from "react-native";



export const authSignUpUser = (email, password, name) => async (
  dispatch,
  getState
) => {
  try {
    const user = await createUserWithEmailAndPassword(auth, email, password);
    const currentUser = auth.currentUser;
    currentUser.displayName = name;
    dispatch(
      authSlice.actions.updateUserProfile({
        userId: currentUser.uid,
        nickName: currentUser.displayName,
        stateChange: true,
      })
    );
  } catch (error) {
    console.log("error", error);
    Alert.alert("Помилка", error.message);
  }
};

export const authSignInUser = (email, password) => async (
  dispatch,
  getState
) => {
  try {
    const user = await signInWithEmailAndPassword(auth, email, password);
    const currentUser = auth.currentUser;
    dispatch(
      authSlice.actions.updateUserProfile({
        userId: currentUser.uid,
        nickName: currentUser.displayName,
        stateChange: true,
      })
    );
  } catch (error) {
    console.log("error", error);
    Alert.alert("Помилка", error.message);
  }
};

export const authSignOutUser = () => async (dispatch, getState) => {
    await signOut(auth);
    dispatch(authSlice.actions.authSignOut())
};

export const authStateCahngeUser = () => async (dispatch, getState) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const userUpdateProfile = {
        nickName: user.displayName,
        userId: user.uid,
      };
    }
  });
};