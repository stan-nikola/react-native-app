import { Text, View, TextInput, TouchableOpacity } from "react-native";
import { Camera } from "expo-camera";
import * as Location from "expo-location";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { useSelector } from "react-redux";

import GoBackIcon from "../../../assets/svg/arrow-left.svg";
import MakePhoto from "../../../assets/svg/makePhoto.svg";
import LocationIcon from "../../../assets/svg/map-pin.svg";
import DeleteIcon from "../../../assets/svg/trash.svg";
import createPostScreenStyles from "./CreatePostsScreenStyles";
import { useEffect, useState } from "react";
import { Image } from "react-native";

import { uid } from "uid";
import { firestoreDb } from "../../../firebase/config";

export const CreatePostScreen = ({ navigation }) => {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [location, setLocation] = useState(null);
  const [cameraShown, setCameraShown] = useState(false);
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [photoName, setPhotoName] = useState(null);
  const [locationName, setLocationName] = useState("");
  const [processedPhoto, setProcessedPhoto] = useState(null);
  const [photoId, setPhotoId] = useState(uid());

  const { userId, userName, userAvatar } = useSelector((state) => state.auth);

  const storage = getStorage();
  const storageRef = ref(storage, `postImages/${photoId}`);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }
    })();
    // (async () => {
    //   if (permission.status !== "granted") {
    //     console.log("Permission to access camera was denied");
    //     return;
    //   }
    // })();
  }, []);

  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    setCameraShown(!cameraShown);
    setPhoto(photo.uri);
  };

  const handlePublish = async () => {
    try {
      const docRef = await addDoc(collection(firestoreDb, "posts"), {
        userId,
        userName,
        image: processedPhoto,
        location: location.coords,
        photoName,
        locationName,
        userAvatar,
      });

      navigation.navigate("Home");

      setPhoto(null);
      setLocation(null);
      setLocationName("");
      setPhotoName("");
      setProcessedPhoto(null);
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const handleDeletePost = () => {
    photo === " " && setCameraShown(!cameraShown);
    setPhoto(null);
    setLocation(null);
    setLocationName("");
    setPhotoName("");
    setProcessedPhoto(null);
  };

  const uploadPhotoToServer = async () => {
    let location = await Location.getCurrentPositionAsync({});

    setLocation(location);
    const response = await fetch(photo);
    const file = await response.blob();

    await uploadBytes(storageRef, file);
    const result = await getDownloadURL(ref(storage, storageRef));

    setProcessedPhoto(result);
  };

  const changePhoto = async () => {
    setProcessedPhoto(null);
    setCameraShown(!cameraShown);

    await deleteObject(storageRef);
    setPhotoId(uid());
  };

  return (
    <View style={createPostScreenStyles.container}>
      <View style={createPostScreenStyles.header}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          style={createPostScreenStyles.goBackBtn}
        >
          <GoBackIcon></GoBackIcon>
        </TouchableOpacity>
        <Text style={createPostScreenStyles.headerText}>
          Create Publication
        </Text>
      </View>
      <View style={createPostScreenStyles.innerContainer}>
        {cameraShown && (
          <View style={createPostScreenStyles.cameraContainer}>
            <Camera style={createPostScreenStyles.camera} ref={setCamera}>
              <TouchableOpacity
                onPress={takePhoto}
                style={createPostScreenStyles.cameraButton}
              >
                <MakePhoto style={{ color: "#BDBDBD" }}></MakePhoto>
              </TouchableOpacity>
            </Camera>
          </View>
        )}
        {!cameraShown && (
          <View style={createPostScreenStyles.createContainer}>
            <View style={createPostScreenStyles.addPhoto}>
              {!processedPhoto ? (
                <Image
                  style={{
                    width: "100%",
                    height: "100%",
                    opacity: 0.6,
                  }}
                  source={{ uri: photo }}
                />
              ) : (
                <Image
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                  source={{ uri: processedPhoto }}
                />
              )}

              {!processedPhoto && (
                <TouchableOpacity
                  style={{
                    ...createPostScreenStyles.openCameraButton,
                    backgroundColor: photo === null ? "#ffffff" : "#ffffff4d",
                  }}
                  onPress={() => setCameraShown(!cameraShown)}
                >
                  <MakePhoto
                    style={{ color: photo === null ? "#BDBDBD" : "#fff" }}
                  ></MakePhoto>
                </TouchableOpacity>
              )}
            </View>

            {!processedPhoto ? (
              photo && (
                <TouchableOpacity onPress={uploadPhotoToServer}>
                  <Text
                    style={{
                      fontFamily: "Roboto-Regular",
                      fontSize: 16,
                      lineHeight: 19,
                      color: "#BDBDBD",
                      marginTop: 8,
                    }}
                  >
                    Upload photo
                  </Text>
                </TouchableOpacity>
              )
            ) : (
              <TouchableOpacity onPress={changePhoto}>
                <Text
                  style={{
                    fontFamily: "Roboto-Regular",
                    fontSize: 16,
                    lineHeight: 19,
                    color: "#BDBDBD",
                    marginTop: 8,
                  }}
                >
                  Change photo
                </Text>
              </TouchableOpacity>
            )}
            <View>
              <TextInput
                placeholder="Photo name..."
                style={{
                  ...createPostScreenStyles.photoAddInput,
                  marginTop: 40,
                }}
                onChangeText={(e) => setPhotoName(e)}
                value={photoName}
              />
              <View>
                <TextInput
                  placeholder="Location"
                  style={{
                    ...createPostScreenStyles.photoAddInput,
                    paddingLeft: 25,
                    marginTop: 32,
                  }}
                  onChangeText={(e) => setLocationName(e)}
                  value={locationName}
                ></TextInput>

                <LocationIcon
                  style={{ position: "absolute", top: 25 }}
                ></LocationIcon>
              </View>

              <TouchableOpacity
                onPress={photoName && processedPhoto && handlePublish}
                style={{
                  ...createPostScreenStyles.publishBtn,
                  backgroundColor:
                    photoName && processedPhoto ? "#FF6C00" : "#F6F6F6",
                }}
              >
                <Text
                  style={{
                    fontFamily: "Roboto-Regular",
                    fontSize: 16,
                    lineHeight: 19,
                    color: !processedPhoto ? "#BDBDBD" : "white",
                  }}
                >
                  Publish
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        <TouchableOpacity
          onPress={handleDeletePost}
          style={createPostScreenStyles.deleteBtn}
        >
          <DeleteIcon></DeleteIcon>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CreatePostScreen;
