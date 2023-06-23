import { Animated, StyleSheet } from "react-native";
import { useMyTheme } from "../styles/themeProvider";
import React from "react";

// Fills the parent view and flashes when props change.
// very ✨cool✨

const ANIMATION_OPACITY = 0.2;
const AnimatedFlasher = (props: any) => {
  const theme = useMyTheme();
  const flashValue = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    Animated.timing(flashValue, {
      toValue: ANIMATION_OPACITY,
      duration: 100,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(flashValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    });
  }, [props]);

  return (
    <Animated.View
      style={{
        opacity: flashValue,
        backgroundColor: theme.accentColor,
        ...StyleSheet.absoluteFillObject,
      }}
    />
  );
};

export default React.memo(AnimatedFlasher);
