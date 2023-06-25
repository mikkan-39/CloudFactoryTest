import React from "react";
import { ActivityIndicator, View } from "react-native";

const FlatListLoader = () => (
  <View
    style={{
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <ActivityIndicator size={"large"} />
  </View>
);

export default React.memo(FlatListLoader);
