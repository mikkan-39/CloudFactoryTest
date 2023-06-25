import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import ThemedText from "../components/ThemedText";
import { useMyTheme } from "../styles/themeProvider";
import { useNavigation } from "@react-navigation/native";
import routes from "../navigators/routes";
import Button from "../components/Button";

const AboutPage: React.FC = () => {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <ThemedText variant="T3">
        Open up App.tsx to start working on your app!
      </ThemedText>
      <ThemedText variant="T2" style={styles.textBlock} secondary multiline>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ut
        pharetra quam. Vivamus elementum odio ac nulla suscipit fermentum ut sed
        metus. Curabitur vestibulum iaculis blandit. Curabitur massa odio,
        cursus at erat a, viverra sollicitudin nunc. Cras vehicula dolor tempor,
        dapibus sapien vitae, luctus ligula. Duis congue placerat maximus.
        Suspendisse vel dolor eget dui vestibulum dictum. Sed efficitur neque
        vel lectus porttitor elementum. Ut semper vehicula hendrerit. Fusce nec
        nunc sed massa blandit dictum.
      </ThemedText>
      <Button
        label="Перейти на страницу котировок"
        onPress={() => {
          navigation.navigate(routes.Courses);
        }}
      />
    </View>
  );
};

export default AboutPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  textBlock: {
    margin: 24,
    textAlign: "center",
  },
});
