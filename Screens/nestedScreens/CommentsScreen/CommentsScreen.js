import { useEffect, useState } from "react";
import { TextInput } from "react-native";
import { useSelector } from "react-redux";
import { Image } from "react-native";
import { Text, View, TouchableOpacity } from "react-native";
import { addDoc, collection, doc, onSnapshot, query } from "firebase/firestore";
import { firestoreDb } from "../../../firebase/config";

import GoBackIcon from "../../../assets/svg/arrow-left.svg";
import CommentSend from "../../../assets/svg/commentSend.svg";

import commentsScreenStyles from "./CommentsScreenStyles";
import { dateConverter } from "../../../helpers/dateConverter";
import { FlatList } from "react-native";
import { Keyboard } from "react-native";

export const CommentsScreen = ({ navigation, route }) => {
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [dbComments, setDbComments] = useState([]);

  const [userComment, setUserComment] = useState(null);

  const { id, image } = route.params;

  const { userId, userAvatar } = useSelector((state) => state.auth);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const getComments = async () => {
    const q = query(collection(firestoreDb, "posts", id, "comments"));
    const c = [];

    onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        c.push(doc.data());
      });
    });
    setDbComments(c);
  };

  useEffect(() => {
    getComments();
  }, []);

  const createComment = async () => {
    const data = {
      userComment,
      userId,
      date: dateConverter(),
      userAvatar,
    };

    const postRef = doc(firestoreDb, "posts", id);

    await addDoc(collection(postRef, "comments"), data);
    getComments();
    setUserComment("");
  };

  return (
    <View style={commentsScreenStyles.container}>
      <View style={commentsScreenStyles.header}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Posts")}
          style={commentsScreenStyles.goBackBtn}
        >
          <GoBackIcon></GoBackIcon>
        </TouchableOpacity>
        <Text style={commentsScreenStyles.headerText}>Comments</Text>
      </View>
      <View style={commentsScreenStyles.commentsContainer}>
        <Image style={commentsScreenStyles.postImage} source={{ uri: image }} />

        <FlatList
          data={dbComments}
          keyExtractor={(item, idx) => idx.toString()}
          renderItem={({ item }) => (
            <View style={commentsScreenStyles.commentContainer}>
              <View
                style={{
                  ...commentsScreenStyles.userComment,
                  flexDirection: item.userId === userId ? "row-reverse" : "row",
                }}
              >
                <Image
                  style={commentsScreenStyles.commentAvatar}
                  source={{ uri: item.userAvatar }}
                />

                <View
                  style={{
                    ...commentsScreenStyles.commentUserContainer,
                  }}
                >
                  <Text style={commentsScreenStyles.commentText}>
                    {item?.userComment}
                  </Text>
                  <Text
                    style={{
                      ...commentsScreenStyles.commentDateText,
                      textAlign: item.userId === userId ? "left" : "right",
                    }}
                  >
                    {item?.date}
                  </Text>
                </View>
              </View>
            </View>
          )}
        />

        <View style={commentsScreenStyles.commentInputContainer}>
          <TextInput
            placeholder="Comment..."
            onChangeText={(e) => setUserComment(e)}
            value={userComment}
            style={commentsScreenStyles.commentInput}
          ></TextInput>

          <TouchableOpacity
            onPress={createComment}
            style={commentsScreenStyles.commentSendButton}
          >
            <CommentSend></CommentSend>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CommentsScreen;
