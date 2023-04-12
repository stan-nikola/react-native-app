import { createStackNavigator } from "@react-navigation/stack";
import CommentsScreen from "../../nestedScreens/CommentsScreen/CommentsScreen";
import { MapScreen } from "./../../nestedScreens/MapScreen/MapScreen";
import { PostScreen } from "./../../nestedScreens/DefaultScreen/PostScreen";

const NestedScreen = createStackNavigator();

export const HomeScreen = () => {
  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen
        options={{ headerShown: false }}
        name="Posts"
        component={PostScreen}
      />
      <NestedScreen.Screen
        options={{ headerShown: false }}
        name="Comments"
        component={CommentsScreen}
      />
      <NestedScreen.Screen
        options={{ headerShown: false }}
        name="Map"
        component={MapScreen}
      />
    </NestedScreen.Navigator>
  );
};

export default HomeScreen;
