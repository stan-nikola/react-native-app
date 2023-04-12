import { StyleSheet, Dimensions } from "react-native";

const profileScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    maxHeight: "80%",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 16,
  },
  imageBg: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    justifyContent: "flex-end",
  },

  avatar: {
    position: "absolute",
    width: 120,
    height: 120,
    top: -55,
  },
  avatarImage: {
    position: "absolute",
    width: 120,
    height: 120,
    borderRadius: 16,
  },
  deleteAvatarButton: { position: "relative" },
  deleteAvatarIcon: {
    width: 25,
    height: 25,
    position: "absolute",
    top: 76,
    right: -20,
  },
  title: {
    marginTop: "23%",
    marginBottom: 33,
    fontWeight: 500,
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    letterSpacing: 0.01,
    fontFamily: "Roboto-Medium",
  },
  image: {
    height: 250,
    borderRadius: 8,
    borderColor: "#E8E8E8",
    borderWidth: 1,
    marginBottom: 8,
    width: "100%",
  },
  imageName: {
    fontFamily: "Roboto-Medium",
    fontWeight: 500,
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    marginBottom: 11,
  },
  imageLocation: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
  },
});

export default profileScreenStyles;
