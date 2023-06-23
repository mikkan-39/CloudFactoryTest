import React from "react";
import {
  ListRenderItem,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { DARK_THEME, LIGHT_THEME } from "../styles/themesConstants";
import { useMyTheme } from "../styles/themeProvider";

// Since my ThemedText is not a pure component, even though it's memoized,
// it still generates and sends style object through the bridge every time.
// According to the profiler, it renders at 3800ms per 500 cells
// compared to native text at 1800ms.

// We are going to make stylesheets for light and dark theme,
// which is going to perform much better.

// If we change an item, only it's flatlist cell will render.

const CoursesFlatListCard = (item: PoloniexCell) => {
  // console.log(`Cell ${item.id} rendered.`);

  const theme = useMyTheme(); // this context consumer doesn't really impact performance
  const styles = theme.isDark ? darkStyles : lightStyles;

  return (
    <View style={styles.card}>
      <Text style={styles.label}>{item.direction}</Text>
      <Text style={styles.descriptionRow}>{JSON.stringify(item, null, 2)}</Text>
    </View>
  );
};

export default React.memo(CoursesFlatListCard);

// Boilerplate for the sake of optimization
const baseStyles = {
  card: {
    padding: 20,
    paddingVertical: 16,
    marginBottom: 12,
    marginHorizontal: 16,
    borderRadius: 16,
    elevation: 1,
    shadowOpacity: 0.15,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  } as ViewStyle,
  label: {
    fontWeight: "600",
    fontSize: 20,
    lineHeight: 22,
  } as TextStyle,
  descriptionRow: {
    fontWeight: "600",
    fontSize: 15,
    lineHeight: 20,
  } as TextStyle,
};

const lightStyles = StyleSheet.create({
  card: {
    ...baseStyles.card,
    backgroundColor: LIGHT_THEME.surfaceColor,
    shadowColor: LIGHT_THEME.shadowColor,
  },
  label: {
    ...baseStyles.label,
    color: LIGHT_THEME.textColor,
  },
  descriptionRow: {
    ...baseStyles.descriptionRow,
    color: LIGHT_THEME.textColor,
  },
});

const darkStyles = StyleSheet.create({
  card: {
    ...baseStyles.card,
    backgroundColor: DARK_THEME.surfaceColor,
    shadowColor: DARK_THEME.shadowColor,
  },
  label: {
    ...baseStyles.label,
    color: DARK_THEME.textColor,
  },
  descriptionRow: {
    ...baseStyles.descriptionRow,
    color: DARK_THEME.textColor,
  },
});
