import { StyleSheet } from "react-native";
import { Text, View, TextInput, TouchableOpacity } from "react-native";

import GoBackIcon from "../../../assets/svg/arrow-left.svg";
import MakePhoto from "../../../assets/svg/makePhoto.svg";
import LocationIcon from "../../../assets/svg/map-pin.svg";
import DeleteIcon from "../../../assets/svg/trash.svg";

export const CreatePostScreen = ({ navigation }) => {
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
      <View style={createPostScreenStyles.createContainer}>
        <View style={createPostScreenStyles.addPhoto}>
          <TouchableOpacity
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <MakePhoto></MakePhoto>
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
            style={{ ...createPostScreenStyles.photoAddInput, marginTop: 40 }}
            // onChangeText={onChangeText}
            // value={text}
          />
          <View>
            <TextInput
              placeholder="Location"
              style={{
                ...createPostScreenStyles.photoAddInput,
                paddingLeft: 25,
                marginTop: 32,
              }}
              // onChangeText={onChangeText}
              // value={text}
            />
            <LocationIcon
              style={{ position: "absolute", top: 25 }}
            ></LocationIcon>
          </View>
          <TouchableOpacity style={createPostScreenStyles.publishBtn}>
            <Text
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
      <TouchableOpacity style={createPostScreenStyles.deleteBtn}>
        <DeleteIcon></DeleteIcon>
      </TouchableOpacity>
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

  createContainer: {
    paddingHorizontal: 16,
    marginTop: 32,
    width: "100%",
  },
  addPhoto: {
    width: "100%",
    height: 250,
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    borderColor: "#E8E8E8",
    borderWidth: 1,
  },
  photoAddInput: {
    width: "100%",
    height: 24,
    borderBottomColor: "#E8E8E8",
    borderBottomWidth: 1,
    paddingBottom: 10,
  },

  publishBtn: {
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
    marginTop: 32,
  },
  deleteBtn: {
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    width: 100,
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
    marginTop: 120,
  },
});

export default CreatePostScreen;
