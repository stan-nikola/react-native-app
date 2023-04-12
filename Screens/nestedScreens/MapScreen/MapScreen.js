import { StyleSheet } from "react-native";
import { Text, View, TextInput, TouchableOpacity } from "react-native";

import GoBackIcon from "../../../assets/svg/arrow-left.svg";

export const MapScreen = ({ navigation }) => {
  return (
    <View style={createPostScreenStyles.container}>
      <View style={createPostScreenStyles.header}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Posts")}
          style={createPostScreenStyles.goBackBtn}
        >
          <GoBackIcon></GoBackIcon>
        </TouchableOpacity>
        <Text style={createPostScreenStyles.headerText}>Map</Text>
      </View>
      <View style={createPostScreenStyles.commentContainer}>
        <View style={createPostScreenStyles.commentPhoto}></View>
      </View>
    </View>
  );
};

const createPostScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  header: {
    flex: 1,
    width: "100%",
    marginTop: 40,
    maxHeight: 50,
    borderBottomWidth: 1,
    borderBottomColor: "#BDBDBD",
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    fontWeight: 500,
    fontSize: 17,
    fontFamily: "Roboto-Regular",
    lineHeight: 22,
  },
  goBackBtn: {
    position: "absolute",
    left: 16,
    height: 24,
    width: 24,
  },

  commentContainer: {
    paddingHorizontal: 16,
    marginTop: 32,
    width: "100%",
  },
  commentPhoto: {
    width: "100%",
    height: 250,
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    borderColor: "#E8E8E8",
    borderWidth: 1,
  },
});

export default MapScreen;
