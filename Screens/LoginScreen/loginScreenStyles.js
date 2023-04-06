import { StyleSheet } from "react-native";

const loginScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    maxHeight: "67%",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },

  title: {
    marginVertical: "9%",
    fontWeight: 500,
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    letterSpacing: 0.01,
    fontFamily: "Roboto-Medium",
  },
  input: {
    height: 50,
    marginBottom: 33,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 16,
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    fontFamily: "Roboto-Regular",
  },
  showPasswordBtn: { position: "absolute", top: 16, right: 15 },

  showPasswordBtnText: { color: "#1B4371", fontSize: 16, lineHeight: 19 },
  signInButton: {
    minHeight: 50,
    paddingHorizontal: "auto",
    paddingVertical: 16,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    alignItems: "center",
    marginBottom: 16,
  },
  signInText: {
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    color: "#FFFFFF",
    fontFamily: "Roboto-Regular",
  },
  logInText: {
    flex: 1,
    alignItems: "baseline",
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    color: "#1B4371",
    marginTop: "3%",
  },
});

export default loginScreenStyles;
