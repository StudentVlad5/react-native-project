import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { useRoute } from "../router";

import { authStateCahngeUser } from "../Redux/Auth/AuthOperations";

export const Main = () => {

  const state = useSelector((state) => state);
 
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(authStateCahngeUser());
  // }, [stateChange]);
  authStateCahngeUser;
  const routing = useRoute(state.auth.stateChange);

  return <NavigationContainer>{routing}</NavigationContainer>;
};
