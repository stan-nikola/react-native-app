import { TextInput } from "react-native";
import { Text, View, TouchableOpacity } from "react-native";

import GoBackIcon from "../../../assets/svg/arrow-left.svg";
import CommentSend from "../../../assets/svg/commentSend.svg";

import { Image } from "react-native";
import commentsScreenStyles from "./CommentsScreenStyles";

export const CommentsScreen = ({ navigation, route }) => {
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
      <View style={commentsScreenStyles.commentContainer}>
        <Image
          style={commentsScreenStyles.postImage}
          source={{ uri: route.params }}
        />

        <View style={commentsScreenStyles.userComment}>
          <Image
            style={commentsScreenStyles.commentAvatar}
            source={require("../../../assets/temp/Ellipse.png")}
          />

          <View style={commentsScreenStyles.commentUserContainer}>
            <Text style={commentsScreenStyles.commentText}>
              Really love your most recent photo. I’ve been trying to capture
              the same thing for a few months and would love some tips!
            </Text>
            <Text style={commentsScreenStyles.commentDateText}>
              09 june, 2020 | 08:40
            </Text>
          </View>
        </View>
        <View
          style={{
            ...commentsScreenStyles.userComment,
            flexDirection: "row-reverse",
          }}
        >
          <Image
            style={commentsScreenStyles.commentAvatar}
            source={require("../../../assets/temp/Avatar_cat.png")}
          />

          <View
            style={{
              ...commentsScreenStyles.commentUserContainer,
              borderTopRightRadius: 0,
            }}
          >
            <Text style={commentsScreenStyles.commentText}>
              Really love your most recent photo. I’ve been trying to capture
              the same thing for a few months and would love some tips!
            </Text>
            <Text
              style={{
                ...commentsScreenStyles.commentDateText,
                textAlign: "left",
              }}
            >
              09 june, 2020 | 08:40
            </Text>
          </View>
        </View>
      </View>
      <View style={commentsScreenStyles.commentInputContainer}>
        <TextInput
          placeholder="Comment..."
          style={commentsScreenStyles.commentInput}
        ></TextInput>

        <TouchableOpacity style={commentsScreenStyles.commentSendButton}>
          <CommentSend></CommentSend>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CommentsScreen;
