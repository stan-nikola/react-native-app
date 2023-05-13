import {
  NavigationContainer,
  createNavigationContainerRef,
} from "@react-navigation/native";
import { useEffect, useState } from "react";

import { View, Dimensions, StyleSheet } from "react-native";

import { useSelector, useDispatch } from "react-redux";
import { AuthRoute, MainRoute } from "../router";
import { authStateChangeUser } from "../redux/auth/authOperations";

export const Main = ({ onLayoutRootView }) => {
  const [routeName, setRouteName] = useState();
  const ref = createNavigationContainerRef();
  const dispatch = useDispatch();

  const { stateChange } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(authStateChangeUser());
  }, []);

  return (
    <View onLayout={onLayoutRootView} style={styles.container}>
      <NavigationContainer
        ref={ref}
        onReady={() => {
          setRouteName(ref.getCurrentRoute().name);
        }}
        onStateChange={async () => {
          const currentRouteName = ref.getCurrentRoute().name;
          setRouteName(currentRouteName);
        }}
        onLayout={onLayoutRootView}
        style={styles.container}
      >
        {stateChange ? <MainRoute routeName={routeName} /> : <AuthRoute />}
      </NavigationContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
