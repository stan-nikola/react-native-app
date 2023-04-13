import { Text, View, TextInput, TouchableOpacity } from "react-native";
import { Camera } from "expo-camera";
import * as Location from "expo-location";

import GoBackIcon from "../../../assets/svg/arrow-left.svg";
import MakePhoto from "../../../assets/svg/makePhoto.svg";
import LocationIcon from "../../../assets/svg/map-pin.svg";
import DeleteIcon from "../../../assets/svg/trash.svg";
import createPostScreenStyles from "./CreatePostsScreenStyles";
import { useEffect, useState } from "react";
import { Image } from "react-native";

export const CreatePostScreen = ({ navigation }) => {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [location, setLocation] = useState(null);
  const [cameraShown, setCameraShown] = useState(false);
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [photoName, setPhotoName] = useState("");
  const [locationName, setLocationName] = useState("");

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }
    })();
    (async () => {
      if (permission.status !== "granted") {
        console.log("Permission to access camera was denied");
        return;
      }
    })();
  }, []);

  const takePhoto = async () => {
    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
    const photo = await camera.takePictureAsync();
    setCameraShown(!cameraShown);
    setPhoto(photo.uri);
  };

  const handlePublish = () => {
    navigation.navigate("Posts", { photo, photoName, locationName, location });
    setPhoto(null);
    setLocation(null);
    setLocationName("");
    setPhotoName("");
  };

  const handleDeletePost = () => {
    photo === " " && setCameraShown(!cameraShown);
    setPhoto(null);
    setLocation(null);
    setLocationName("");
    setPhotoName("");
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
              <Image
                style={{
                  width: "100%",
                  height: "100%",
                }}
                source={{ uri: photo }}
              />
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
            </View>

            <TouchableOpacity>
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
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Map", {
                      location,
                      photoName,
                      locationName,
                    })
                  }
                  style={{ position: "absolute", top: 25 }}
                >
                  <LocationIcon></LocationIcon>
                </TouchableOpacity>
              </View>

              <TouchableOpacity style={createPostScreenStyles.publishBtn}>
                <Text
                  onPress={handlePublish}
                  style={{
                    fontFamily: "Roboto-Regular",
                    fontSize: 16,
                    lineHeight: 19,
                    color: "#BDBDBD",
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
