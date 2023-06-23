import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ThemedText from "../components/ThemedText";

const AboutPage: React.FC = () => {
  return (
    <View style={styles.container}>
      <ThemedText variant="T2">
        Open up App.tsx to start working on your app!
      </ThemedText>
    </View>
  );
};

export default AboutPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
