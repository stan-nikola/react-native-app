import { StyleSheet, View, Dimensions } from "react-native";

import { useCallback, useState } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import {
  NavigationContainer,
  createNavigationContainerRef,
} from "@react-navigation/native";

import { AuthRoute, MainRoute, useRoute } from "./router";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [routeName, setRouteName] = useState();

  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  const ref = createNavigationContainerRef();
  // const routing = useRoute(true);

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
        {/* <AuthRoute /> */}
        <MainRoute routeName={routeName} />
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
