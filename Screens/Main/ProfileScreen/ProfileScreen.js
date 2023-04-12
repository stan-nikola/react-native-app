import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";

import DeleteAvatarIcon from "../../../assets/svg/removeUserAvatar";

import profileScreenStyles from "./profileScreenStyles";

import MessageIcon from "../../../assets/svg/message";
import MapLocationIcon from "../../../assets/svg/map-pin.svg";
import ThumbsUpIcon from "../../../assets/svg/thumbsUp";

const ProfileScreen = ({ navigation }) => {
  return (
    <ImageBackground
      source={require("../../../assets/img/PhotoBG.jpg")}
      style={profileScreenStyles.imageBg}
    >
      <View style={profileScreenStyles.container}>
        <View style={profileScreenStyles.avatar}>
          <Image
            style={profileScreenStyles.avatarImage}
            source={require("../../../assets/temp/Avatar_cat.png")}
          />
          <TouchableOpacity>
            <DeleteAvatarIcon style={profileScreenStyles.deleteAvatarIcon} />
          </TouchableOpacity>
        </View>
        <Text style={profileScreenStyles.title}>User Name</Text>
        <TouchableOpacity
          title="Go to SignIn"
          onPress={() => navigation.navigate("LogIn")}
        ></TouchableOpacity>
        <View style={{ width: "100%" }}>
          <Image
            source={require("../../../assets/temp/view1.jpg")}
            style={profileScreenStyles.image}
          />
          <Text style={profileScreenStyles.imageName}>Forest</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <TouchableOpacity
                onPress={() => navigation.navigate("Comments")}
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: 27,
                }}
              >
                <MessageIcon style={{ marginRight: 8 }}></MessageIcon>
                <Text style={profileScreenStyles.imageLocation}>0</Text>
              </TouchableOpacity>
              <TouchableOpacity
                // onPress={() => navigation.navigate("Likes")}
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ThumbsUpIcon style={{ marginRight: 8 }}></ThumbsUpIcon>
                <Text style={profileScreenStyles.imageLocation}>0</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate("Map")}
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "flex-end",
              }}
            >
              <MapLocationIcon style={{ marginRight: 8 }}></MapLocationIcon>
              <Text
                style={{
                  ...profileScreenStyles.imageLocation,
                  textDecorationLine: "underline",
                  color: "#212121",
                }}
              >
                Ukraine
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default ProfileScreen;
