import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { inject, observer } from "mobx-react";
import dataStore from "../mobx/DataStore";

const CoursesPage: React.FC = () => {
  const isFocused = useIsFocused();

  React.useEffect(() => {
    dataStore.setIsFocused(isFocused);
  }, [isFocused]);

  return (
    <View style={styles.container}>
      {dataStore.isLoading && <ActivityIndicator size={"large"} />}
      <Text>{dataStore.data}</Text>
    </View>
  );
};

export default observer(CoursesPage);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
