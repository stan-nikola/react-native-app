import { StyleSheet } from "react-native";

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
  innerContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
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
    overflow: "hidden",
  },
  cameraContainer: {
    width: "100%",
    height: 550,
    paddingHorizontal: 8,
    borderRadius: 16,
    marginTop: 30,
    overflow: "hidden",
  },
  camera: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  openCameraButton: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    borderRadius: 50,
    top: 90,
    left: 150,
  },

  cameraButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: "#ffffff4d",
    marginBottom: 20,
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
    marginBottom: 30,
  },
});

export default createPostScreenStyles;
