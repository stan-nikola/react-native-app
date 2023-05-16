import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { View, StyleSheet } from "react-native";

import RegistrationScreen from "./Screens/Auth/RegistrationScreen/RegistrationScreen";
import LoginScreen from "./Screens/Auth/LoginScreen/LoginScreen";

import HomeScreen from "./Screens/Main/HomeScreen/HomeScreen";
import CreatePostScreen from "./Screens/nestedScreens/CreatePostsScreen/CreatePostsScreen";
import ProfileScreen from "./Screens/Main/ProfileScreen/ProfileScreen";

import Grid from "./assets/svg/grid.svg";
import New from "./assets/svg/new.svg";
import User from "./assets/svg/user.svg";

const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

export const AuthRoute = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        options={{ headerShown: false }}
        name="SignIn"
        component={RegistrationScreen}
      />
      <AuthStack.Screen
        options={{ headerShown: false }}
        name="LogIn"
        component={LoginScreen}
      />
    </AuthStack.Navigator>
  );
};

export const MainRoute = ({ routeName }) => {
  return (
    <>
      <MainTab.Navigator
        initialRouteName="Home"
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: routerScreenStyles.tabBarStyles,
          tabBarStyle: {
            display:
              routeName !== "Posts" && routeName !== "Profile"
                ? "none"
                : "flex",
          },
        }}
      >
        <MainTab.Screen
          name="Home"
          options={{
            headerShown: false,
            unmountOnBlur: true,
            tabBarIcon: ({ focused, size, color }) => (
              <View
                style={{
                  ...routerScreenStyles.tabs,
                  backgroundColor: focused ? "#FF6C00" : "#fff",
                }}
              >
                <Grid name="Home" size={40} />
              </View>
            ),
          }}
          component={HomeScreen}
        />
        <MainTab.Screen
          name="CreatePost"
          options={{
            headerShown: false,

            tabBarIcon: ({ focused, size, color }) => (
              <View
                style={{
                  ...routerScreenStyles.tabs,
                  backgroundColor: focused ? "#FF6C00" : "#fff",
                }}
              >
                <New style={{ stroke: "#212121B3" }} />
              </View>
            ),
          }}
          component={CreatePostScreen}
        />
        <MainTab.Screen
          name="Profile"
          options={{
            headerShown: false,
            unmountOnBlur: true,
            tabBarIcon: ({ focused, size, color }) => (
              <View
                style={{
                  ...routerScreenStyles.tabs,
                  backgroundColor: focused ? "#FF6C00" : "#fff",
                }}
              >
                <User name="user" size={40} />
              </View>
            ),
          }}
          component={ProfileScreen}
        />
      </MainTab.Navigator>
    </>
  );
};

const routerScreenStyles = StyleSheet.create({
  tabBarStyles: {
    position: "relative",
    left: 0,
    bottom: 0,
    backgroundColor: "#FFFFFF",
    minHeight: 83,
  },
  tabs: {
    width: 70,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
  },
});
