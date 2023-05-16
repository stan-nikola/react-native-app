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
import { Camera } from "expo-camera";

import { useState, useEffect } from "react";

import { useDispatch } from "react-redux";

import AddAvatarIcon from "../../../assets/svg/addUserAvatar.svg";
import DeleteAvatarIcon from "../../../assets/svg/deleteAvatar.svg";

import registrationScreenStyles from "./registrationScreenStyles";

import { authSignUpUser } from "../../../redux/auth/authOperations";
import MakePhoto from "../../../assets/svg/makePhoto.svg";
import { Image } from "react-native";
import { firestoreDb } from "../../../firebase/config";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "firebase/storage";
import { uid } from "uid";

const initialCredentials = {
  userName: "",
  email: "",
  password: "",
  userAvatar:
    "https://t3.ftcdn.net/jpg/05/16/27/58/240_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg",
};

const RegistrationScreen = ({ navigation }) => {
  const [photoId, setPhotoId] = useState(uid());

  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [credentials, setCredentials] = useState(initialCredentials);
  const [dimensionX, setDimensionX] = useState(Dimensions.get("window").width);
  const [toggleIsShowPassword, setToggleIsShowPassword] = useState(false);
  const [camera, setCamera] = useState(null);
  const [cameraShown, setCameraShown] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [processedPhoto, setProcessedPhoto] = useState(null);

  const storage = getStorage();
  const storageRef = ref(storage, `userAvatars/${photoId}`);

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

  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    setCameraShown(!cameraShown);

    setPhoto(photo.uri);

    const response = await fetch(photo);
    const file = await response.blob();

    await uploadBytes(storageRef, file);
    const result = await getDownloadURL(ref(storage, storageRef));

    setProcessedPhoto(result);
  };

  const handleSubmit = async () => {
    try {
      setCredentials((prevCredentials) => ({
        ...prevCredentials,
        userAvatar: processedPhoto,
      }));
      dispatch(authSignUpUser(credentials));
      setCredentials(initialCredentials);
    } catch (error) {
      console.log(error);
    }
  };

  const changePhoto = async () => {
    setPhoto(null);
    setProcessedPhoto(null);
    setCameraShown(!cameraShown);

    await deleteObject(storageRef);
    setPhotoId(uid());
  };

  return (
    <ImageBackground
      source={require("../../../assets/img/PhotoBG.jpg")}
      style={registrationScreenStyles.imageBg}
    >
      {cameraShown && (
        <View style={registrationScreenStyles.cameraContainer}>
          <Camera style={registrationScreenStyles.camera} ref={setCamera}>
            <TouchableOpacity
              onPress={takePhoto}
              style={registrationScreenStyles.cameraButton}
            >
              <MakePhoto style={{ color: "#BDBDBD" }}></MakePhoto>
            </TouchableOpacity>
          </Camera>
        </View>
      )}
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "maxHeight"}
          style={{
            ...registrationScreenStyles.container,
            maxHeight: keyboardVisible ? "80%" : "65%",
          }}
        >
          {!photo ? (
            <TouchableOpacity
              onPress={() => setCameraShown(!cameraShown)}
              style={registrationScreenStyles.addAvatarButton}
            >
              <AddAvatarIcon style={registrationScreenStyles.addAvatarIcon} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={changePhoto}
              style={registrationScreenStyles.addAvatarButton}
            >
              <DeleteAvatarIcon
                style={registrationScreenStyles.deleteAvatarIcon}
              />
            </TouchableOpacity>
          )}
          <View style={registrationScreenStyles.avatar}>
            <Image
              style={{
                width: "100%",
                height: "100%",
              }}
              source={{ uri: photo }}
            />
          </View>
          <Text style={registrationScreenStyles.title}>Sign Up</Text>

          <View style={{ width: dimensionX - 16 * 2 }}>
            <TextInput
              style={registrationScreenStyles.input}
              onChangeText={(value) =>
                setCredentials((prevCredentials) => ({
                  ...prevCredentials,
                  userName: value,
                }))
              }
              value={credentials.userName}
              placeholder="Name"
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
                style={{
                  ...registrationScreenStyles.input,
                  marginBottom: 43,
                }}
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
            <Text style={registrationScreenStyles.signInText}>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity
            title="Go to SignIn"
            onPress={() => navigation.navigate("LogIn")}
          >
            <Text style={registrationScreenStyles.logInText}>
              Already have an account? Sign In
            </Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
};

export default RegistrationScreen;
