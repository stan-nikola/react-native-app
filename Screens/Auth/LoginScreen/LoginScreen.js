import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Platform,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Dimensions,
  ImageBackground,
} from "react-native";

import loginScreenStyles from "./loginScreenStyles";

import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { authSignInUser } from "../../../redux/auth/authOperations";

const initialCredentials = {
  email: "",
  password: "",
};

const LoginScreen = ({ navigation }) => {
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  const [credentials, setCredentials] = useState(initialCredentials);

  const [dimensionX, setDimensionX] = useState(Dimensions.get("window").width);

  const [toggleIsShowPassword, setToggleIsShowPassword] = useState(false);

  const dispatch = useDispatch();

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

  const handleSubmit = () => {
    dispatch(authSignInUser(credentials));
    // setCredentials(initialCredentials);
  };

  return (
    <ImageBackground
      source={require("../../../assets/img/PhotoBG.jpg")}
      style={loginScreenStyles.imageBg}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "maxHeight"}
          style={{
            ...loginScreenStyles.container,
            maxHeight: keyboardVisible ? "67%" : "55%",
          }}
        >
          <Text style={loginScreenStyles.title}>Sign In</Text>

          <View style={{ width: dimensionX - 16 * 2 }}>
            <TextInput
              style={loginScreenStyles.input}
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
                style={{ ...loginScreenStyles.input, marginBottom: 43 }}
                secureTextEntry={!toggleIsShowPassword}
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
                onPress={() => setToggleIsShowPassword(!toggleIsShowPassword)}
                style={loginScreenStyles.showPasswordBtn}
              >
                <Text style={loginScreenStyles.showPasswordBtnText}>
                  {toggleIsShowPassword ? "Hide" : "Show"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            onPress={handleSubmit}
            style={{
              ...loginScreenStyles.signInButton,
              width: dimensionX - 16 * 2,
            }}
          >
            <Text style={loginScreenStyles.signInText}>Sign In</Text>
          </TouchableOpacity>
          <TouchableOpacity
            title="Go to SignIn"
            onPress={() => navigation.navigate("SignIn")}
          >
            <Text style={loginScreenStyles.logInText}>No account? Sign Up</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
};
export default LoginScreen;
