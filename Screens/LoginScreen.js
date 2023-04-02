import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  Platform,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Dimensions,
  Button,
} from "react-native";

import { useState, useEffect } from "react";

import AddAvatarIcon from "../assets/svg/addUserAvatar.svg";

const initialState = {
  email: "",
  password: "",
};

const LoginScreen = () => {
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  const [credentials, setCredentials] = useState(initialState);

  const [dimensionX, setDimensionX] = useState(Dimensions.get("window").width);

  const [toggleShowPassword, setToggleShowPassword] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  //   useEffect(() => {
  //     const onChange = () => {
  //       const width = Dimensions.get("window").width;
  //       setDimensionX(width);
  //     };
  //     Dimensions.addEventListener("change", onChange);
  //     return () => {
  //       Dimensions.removeEventListener("change", onChange);
  //     };
  //   }, []);

  const handleSubmit = () => {
    console.log(credentials);
    setCredentials(initialState);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "maxHeight"}
        style={{
          ...styles.container,
          maxHeight: keyboardVisible ? "67%" : "60%",
        }}
      >
        <Text style={styles.title}>Log In</Text>

        <View style={{ width: dimensionX - 16 * 2 }}>
          <TextInput
            style={styles.input}
            onChangeText={(value) =>
              setCredentials((prevCredentials) => ({
                ...prevCredentials,
                email: value,
              }))
            }
            value={credentials.email}
            placeholder="Email"
          />
          <View style={{ position: "relative" }}>
            <TextInput
              style={{ ...styles.input, marginBottom: 43 }}
              secureTextEntry={!toggleShowPassword}
              onChangeText={(value) =>
                setCredentials((prevCredentials) => ({
                  ...prevCredentials,
                  password: value,
                }))
              }
              value={credentials.password}
              placeholder="Password"
            ></TextInput>
            <TouchableOpacity
              onPress={() => setToggleShowPassword(!toggleShowPassword)}
              style={styles.showPasswordBtn}
            >
              <Text style={styles.showPasswordBtnText}>
                {toggleShowPassword ? "Hide" : "Show"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          onPress={handleSubmit}
          style={{ ...styles.signInButton, width: dimensionX - 16 * 2 }}
        >
          <Text style={styles.signInText}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.logInText}>No account? Sign In</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    maxHeight: "67%",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },

  title: {
    marginVertical: "9%",
    fontWeight: 500,
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    letterSpacing: 0.01,
    fontFamily: "Roboto-Medium",
  },
  input: {
    height: 50,
    marginBottom: 33,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 16,
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    fontFamily: "Roboto-Regular",
  },
  showPasswordBtn: { position: "absolute", top: 16, right: 15 },

  showPasswordBtnText: { color: "#1B4371", fontSize: 16, lineHeight: 19 },
  signInButton: {
    minHeight: 50,
    paddingHorizontal: "auto",
    paddingVertical: 16,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    alignItems: "center",
    marginBottom: 16,
  },
  signInText: {
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    color: "#FFFFFF",
    fontFamily: "Roboto-Regular",
  },
  logInText: {
    flex: 1,
    alignItems: "baseline",
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    color: "#1B4371",
    marginTop: "3%",
  },
});

export default LoginScreen;
