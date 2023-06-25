import React from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { DARK_THEME, LIGHT_THEME } from "../styles/themesConstants";
import { useMyTheme } from "../styles/themeProvider";
import AnimatedFlasher from "./AnimatedFlasher";

// Since my ThemedText sends style object through the bridge every time,
// it's too slow. According to the profiler, it renders 2x slower.

// We are going to make stylesheets for light and dark theme,
// which is going to perform much better.

// If we change an item, only it's flatlist cell will re-render, since
// the props are spread and memoized.

const CoursesFlatListCard = (item: PoloniexCell) => {
  // console.log(`Cell ${item.id} rendered.`);

  const theme = useMyTheme();
  const styles = theme.isDark ? darkStyles : lightStyles;

  // Test render error
  // item.direction == "BTC_BTS" && console.log(undef.undef);

  return (
    <View style={styles.card}>
      {/* AnimatedFlasher looks very ✨cool✨ and render  
      time of the component drops only around 30%, worth it */}
      <AnimatedFlasher {...item} />
      <Text style={styles.label}>{item.direction}</Text>
      <Text style={styles.descriptionRow}>{`Last: ${item.last}`}</Text>
      <Text style={styles.descriptionRow}>
        {`Highest bid: ${item.highestBid}`}
      </Text>
      <Text style={styles.descriptionRow}>
        {`Percent change: ${item.percentChange}`}
      </Text>
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
    borderRadius: 16,
    elevation: 2,
    shadowOpacity: 0.15,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  } as ViewStyle,
  label: {
    fontWeight: "800",
    fontSize: 22,
    lineHeight: 24,
    marginBottom: 8,
  } as TextStyle,
  descriptionRow: {
    fontWeight: "600",
    fontSize: 18,
    lineHeight: 20,
  } as TextStyle,
};

// add colors
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
