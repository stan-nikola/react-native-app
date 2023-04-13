import { Text, View, TextInput, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";

import GoBackIcon from "../../../assets/svg/arrow-left.svg";
import mapScreenStyles from "./MapScreenStyles";
import { useEffect, useState } from "react";

export const MapScreen = ({ navigation, route }) => {
  const [coordinate, setCoordinate] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.006,
    longitudeDelta: 0.006,
  });

  const [locationTitle, setLocationTitle] = useState("");
  const [mapIsShown, setMapIsShown] = useState(false);

  const params = route.params;
  useEffect(() => {
    if (params.location) {
      setCoordinate({
        ...coordinate,
        latitude: params.location.coords.latitude,
        longitude: params.location.coords.longitude,
      });
      setLocationTitle(params.photoName);
      setMapIsShown(true);
    }
  }, [params]);

  return (
    <View style={mapScreenStyles.container}>
      <View style={mapScreenStyles.header}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Posts")}
          style={mapScreenStyles.goBackBtn}
        >
          <GoBackIcon></GoBackIcon>
        </TouchableOpacity>
        <Text style={mapScreenStyles.headerText}>Map</Text>
      </View>
      <View style={mapScreenStyles.mapContainer}>
        {mapIsShown && (
          <MapView initialRegion={coordinate} style={mapScreenStyles.map}>
            <Marker
              title={locationTitle}
              coordinate={{
                latitude: coordinate.latitude,
                longitude: coordinate.longitude,
              }}
            />
          </MapView>
        )}
      </View>
    </View>
  );
};

export default MapScreen;
