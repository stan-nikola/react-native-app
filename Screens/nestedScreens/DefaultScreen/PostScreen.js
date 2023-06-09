import { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  collection,
  getCountFromServer,
  onSnapshot,
  query,
} from "firebase/firestore";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";

import LogOutIcon from "../../../assets/svg/log-out.svg";
import MessageIcon from "../../../assets/svg/message";
import MapLocation from "../../../assets/svg/map-pin.svg";
import { authSignOutUser } from "../../../redux/auth/authOperations";
import { firestoreDb } from "../../../firebase/config";
import { connectStorageEmulator } from "firebase/storage";

export const PostScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const dispatch = useDispatch();
  const { userName, userEmail, userAvatar } = useSelector(
    (state) => state.auth
  );

  const getPosts = () => {
    const q = query(collection(firestoreDb, "posts"));

    onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach(async (doc) => {
        const commentCount = await getCommentCount(doc.id);

        setPosts((prevPosts) => [
          ...prevPosts,
          { ...doc.data(), id: doc.id, commentCount },
        ]);
      });
    });
  };

  const getCommentCount = async (id) => {
    const q = query(collection(firestoreDb, "posts", id, "comments"));
    const snapshot = await getCountFromServer(q);

    return snapshot.data().count.toString();
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <View style={postScreenStyles.container}>
      <View style={postScreenStyles.header}>
        <Text style={postScreenStyles.headerText}>Publications</Text>
        <TouchableOpacity
          onPress={() => dispatch(authSignOutUser())}
          style={postScreenStyles.logOutBtn}
        >
          <LogOutIcon></LogOutIcon>
        </TouchableOpacity>
      </View>
      <View style={postScreenStyles.userInfo}>
        <Image style={postScreenStyles.avatar} source={{ uri: userAvatar }} />

        <View style={{ marginLeft: 8 }}>
          <Text
            style={{
              fontFamily: "Roboto-Regular",
              fontWeight: 700,
              fontSize: 13,
              lineHeight: 15,
            }}
          >
            {userName}
          </Text>
          <Text style={{ fontSize: 11, lineHeight: 13 }}>{userEmail}</Text>
        </View>
      </View>

      <FlatList
        data={posts}
        keyExtractor={(item, idx) => idx.toString()}
        renderItem={({ item }) => (
          <View style={{ paddingHorizontal: 16, marginBottom: 34 }}>
            <Image
              source={{ uri: item.image }}
              style={postScreenStyles.image}
            ></Image>
            <Text style={postScreenStyles.imageName}>{item.photoName}</Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <TouchableOpacity
                onPress={() => navigation.navigate("Comments", item)}
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <MessageIcon style={{ marginRight: 8 }}></MessageIcon>
                <Text style={postScreenStyles.imageLocation}>
                  {item.commentCount}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("Map", item)}
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "flex-end",
                }}
              >
                <MapLocation style={{ marginRight: 8 }}></MapLocation>
                <Text
                  style={{
                    ...postScreenStyles.imageLocation,
                    textDecorationLine: "underline",
                    color: "#212121",
                  }}
                >
                  {item.locationName}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const postScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    marginTop: 40,
    height: 50,
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
  logOutBtn: {
    position: "absolute",
    right: 16,
    height: 24,
    width: 24,
  },
  userInfo: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 32,
    paddingHorizontal: 16,
    width: "100%",
    height: 60,
  },
  avatar: {
    width: 60,
    height: 60,
    backgroundColor: "tomato",
    borderRadius: 16,
  },
  image: {
    width: "100%",
    height: 250,
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    borderColor: "#E8E8E8",
    borderWidth: 1,
    marginBottom: 8,
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

export default PostScreen;

//  "uid": "xop82rHW13gTWxIrYGischM7qVz1"
// "userId": "xop82rHW13gTWxIrYGischM7qVz1"
