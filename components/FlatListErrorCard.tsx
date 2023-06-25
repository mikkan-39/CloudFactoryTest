import React from "react";
import { View, ViewStyle } from "react-native";
import { Theme } from "../styles/themesConstants";
import { useMyTheme } from "../styles/themeProvider";
import ThemedText from "./ThemedText";

const FlatListErrorCard = () => {
  const theme = useMyTheme();
  const styles = styleGenerator(theme);

  return (
    <View style={styles.card}>
      <ThemedText variant="T3">{"Произошла ошибка."}</ThemedText>
    </View>
  );
};

export default React.memo(FlatListErrorCard);

// Boilerplate for the sake of optimization
const styleGenerator = (theme: Theme) => ({
  card: {
    padding: 20,
    paddingVertical: 16,
    marginBottom: 12,
    borderRadius: 16,
    elevation: 2,
    shadowOpacity: 0.15,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowColor: "red",
    backgroundColor: theme.isDark ? "#422" : "#fbb",
  } as ViewStyle,
});
