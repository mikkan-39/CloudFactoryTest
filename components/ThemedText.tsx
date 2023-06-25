import React, { memo } from "react";
import {
  TextProps,
  Text as NativeText,
  StyleSheet,
  ColorValue,
} from "react-native";
import { useMyTheme } from "../styles/themeProvider";

interface CustomTextProps extends TextProps {
  variant?: "T0" | "T1" | "T2" | "T3";
  color?: ColorValue;
  secondary?: boolean;
  multiline?: boolean;
}

// about 2x slower than native text on re-render, but very handy
const ThemedText = (props: CustomTextProps) => {
  const theme = useMyTheme();
  return (
    <NativeText
      maxFontSizeMultiplier={1.25}
      adjustsFontSizeToFit={!props.multiline}
      numberOfLines={props.multiline ? 0 : 1}
      {...props}
      // messy
      style={[
        props.variant && styles[props.variant],
        {
          color: props.color || theme.textColor,
        },
        props.secondary && { color: theme.textSecondaryColor },
        props.style,
      ]}
    />
  );
};

export default memo(ThemedText);

const styles = StyleSheet.create({
  T0: {
    fontWeight: "400",
    fontSize: 15,
    lineHeight: 20,
  },
  T1: {
    fontWeight: "600",
    fontSize: 15,
    lineHeight: 20,
  },
  T2: {
    fontWeight: "600",
    fontSize: 17,
    lineHeight: 22,
  },
  T3: {
    fontWeight: "600",
    fontSize: 20,
    lineHeight: 24,
  },
});
