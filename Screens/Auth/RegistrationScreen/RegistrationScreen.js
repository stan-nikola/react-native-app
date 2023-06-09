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
  Image,
} from "react-native";
import { Camera } from "expo-camera";

import { useState, useEffect } from "react";

import { useDispatch } from "react-redux";

import AddAvatarIcon from "../../../assets/svg/addUserAvatar.svg";
import DeleteAvatarIcon from "../../../assets/svg/deleteAvatar.svg";

import registrationScreenStyles from "./registrationScreenStyles";

import { authSignUpUser } from "../../../redux/auth/authOperations";
import MakePhoto from "../../../assets/svg/makePhoto.svg";

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
  userAvatar: "",
};

const RegistrationScreen = ({ navigation }) => {
  const [photoId, setPhotoId] = useState(uid());

  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [credentials, setCredentials] = useState(initialCredentials);
  const [dimensionX, setDimensionX] = useState(Dimensions.get("window").width);
  const [toggleIsShowPassword, setToggleIsShowPassword] = useState(false);
  const [camera, setCamera] = useState(null);
  const [cameraShown, setCameraShown] = useState(false);

  const [processedPhoto, setProcessedPhoto] = useState(null);

  const storage = getStorage();
  const storageRef = ref(storage, `postAvatars/${photoId}`);

  const dispatch = useDispatch();
  useEffect(() => {
    if (cameraShown) {
      (async () => {
        let { status } = await Camera.requestCameraPermissionsAsync();
        if (status !== "granted") {
          console.log("Permission to access camera was denied");
          return;
        }
      })();
    }
  }, [cameraShown]);

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
    const response = await fetch(photo.uri);
    const file = await response.blob();
    setCameraShown(!cameraShown);
    await uploadBytes(storageRef, file);
    const result = await getDownloadURL(ref(storage, storageRef));

    setProcessedPhoto(result);
  };

  useEffect(() => {
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      userAvatar:
        processedPhoto ||
        "https://st.depositphotos.com/1537427/3571/v/600/depositphotos_35717211-stock-illustration-vector-user-icon.jpg",
    }));
  }, [processedPhoto]);

  const handleSubmit = async () => {
    dispatch(authSignUpUser(credentials));
    setCredentials(initialCredentials);
  };

  const changePhoto = async () => {
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
          <Camera
            style={registrationScreenStyles.camera}
            type={"front"}
            mirrorImage={false}
            ref={setCamera}
          >
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
          {!processedPhoto ? (
            <TouchableOpacity
              onPress={() => setCameraShown(!cameraShown)}
              style={registrationScreenStyles.addAvatarButton}
            >
              <View>
                <AddAvatarIcon style={registrationScreenStyles.addAvatarIcon} />
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={changePhoto}
              style={registrationScreenStyles.addAvatarButton}
            >
              <View>
                <DeleteAvatarIcon
                  style={registrationScreenStyles.deleteAvatarIcon}
                />
              </View>
            </TouchableOpacity>
          )}
          <View style={registrationScreenStyles.avatar}>
            <Image
              style={{
                width: "100%",
                height: "100%",
              }}
              source={{ uri: processedPhoto }}
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
