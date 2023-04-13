import { StyleSheet } from "react-native";

const mapScreenStyles = StyleSheet.create({
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

  mapContainer: {
    marginTop: 32,
    width: "95%",
    borderRadius: 8,
    overflow: "hidden",
  },
  map: {
    height: 600,
  },
});

export default mapScreenStyles;
