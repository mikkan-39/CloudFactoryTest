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
  secondary?: boolean;
  thin?: boolean;
  color?: ColorValue;
}

// about 2x slower than native text, but very handy
const ThemedText = (props: CustomTextProps) => {
  const theme = useMyTheme();
  return (
    <NativeText
      maxFontSizeMultiplier={1.25}
      adjustsFontSizeToFit={true}
      numberOfLines={0}
      {...props}
      // messy
      style={[
        props.variant && styles[props.variant],
        {
          color:
            props.color || !props.secondary
              ? theme.textColor
              : theme.textSecondaryColor,
        },
        props.thin && styles.thin,
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
  thin: {
    fontWeight: "400",
  },
});
