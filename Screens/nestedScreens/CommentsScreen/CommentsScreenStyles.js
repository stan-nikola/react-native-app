import { StyleSheet } from "react-native";

const commentsScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
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
  postImage: {
    height: 250,
    borderRadius: 8,
    borderColor: "#E8E8E8",
    borderWidth: 1,
    marginBottom: 8,
    width: "100%",
  },
  userComment: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 32,
  },
  commentAvatar: {
    height: 28,
    borderRadius: 50,
    width: 28,
    borderRadius: 50,
  },

  commentUserContainer: {
    width: 300,
    backgroundColor: "#00000008",
    borderRadius: 6,
    borderTopLeftRadius: 0,
    padding: 16,
    marginBottom: 8,
  },

  commentText: {
    fontFamily: "Roboto-Regular",
    fontSize: 13,
    lineHeight: 18,
    color: "#212121",
    marginBottom: 8,
  },
  commentDateText: {
    fontFamily: "Roboto-Regular",
    fontSize: 10,
    lineHeight: 12,
    color: "#BDBDBD",
    textAlign: "right",
  },
  commentInputContainer: { alignItems: "center", width: "100%" },
  commentInput: {
    width: "90%",
    height: 50,
    borderRadius: 100,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    paddingLeft: 16,
    paddingVertical: 16,
  },
  commentSendButton: {
    position: "absolute",
    right: 26,
    top: 8,
  },
});

export default commentsScreenStyles;
