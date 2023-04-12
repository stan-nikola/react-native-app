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

import { useState, useEffect } from "react";

import AddAvatarIcon from "../../../assets/svg/addUserAvatar.svg";

import registrationScreenStyles from "./registrationScreenStyles";

const initialState = {
  login: "",
  email: "",
  password: "",
};

const RegistrationScreen = ({ navigation }) => {
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  const [credentials, setCredentials] = useState(initialState);

  const [dimensionX, setDimensionX] = useState(Dimensions.get("window").width);

  const [toggleIsShowPassword, setToggleIsShowPassword] = useState(false);

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

  // useEffect(() => {
  //   const onChange = () => {
  //     const width = Dimensions.get("window").width;
  //     setDimensionX(width);
  //   };
  //   Dimensions.addEventListener("change", onChange);
  //   return () => {
  //     Dimensions.removeEventListener("change", onChange);
  //   };
  // }, []);

  const handleSubmit = () => {
    console.log(credentials);
    setCredentials(initialState);
  };

  return (
    <ImageBackground
      source={require("../../../assets/img/PhotoBG.jpg")}
      style={registrationScreenStyles.imageBg}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "maxHeight"}
          style={{
            ...registrationScreenStyles.container,
            maxHeight: keyboardVisible ? "80%" : "65%",
          }}
        >
          <View style={registrationScreenStyles.avatar}>
            <TouchableOpacity style={registrationScreenStyles.addAvatarButton}>
              <AddAvatarIcon style={registrationScreenStyles.addAvatarIcon} />
            </TouchableOpacity>
          </View>
          <Text style={registrationScreenStyles.title}>Sign In</Text>

          <View style={{ width: dimensionX - 16 * 2 }}>
            <TextInput
              style={registrationScreenStyles.input}
              onChangeText={(value) =>
                setCredentials((prevCredentials) => ({
                  ...prevCredentials,
                  login: value,
                }))
              }
              value={credentials.login}
              placeholder="Login"
            />
            <TextInput
              style={registrationScreenStyles.input}
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
                style={{ ...registrationScreenStyles.input, marginBottom: 43 }}
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
                style={registrationScreenStyles.showPasswordBtn}
              >
                <Text style={registrationScreenStyles.showPasswordBtnText}>
                  {toggleIsShowPassword ? "Hide" : "Show"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            onPress={handleSubmit}
            style={{
              ...registrationScreenStyles.signInButton,
              width: dimensionX - 16 * 2,
            }}
          >
            <Text style={registrationScreenStyles.signInText}>Sign In</Text>
          </TouchableOpacity>
          <TouchableOpacity
            title="Go to SignIn"
            onPress={() => navigation.navigate("LogIn")}
          >
            <Text style={registrationScreenStyles.logInText}>
              Already have an account? log In
            </Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
};

export default RegistrationScreen;
