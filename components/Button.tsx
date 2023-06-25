import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useMyTheme } from "../styles/themeProvider";
import ThemedText from "./ThemedText";

type ButtonProps = {
  label: string;
  onPress: () => void;
};

const Button = (props: ButtonProps) => {
  const theme = useMyTheme();

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: theme.accentColor,
        },
      ]}
      onPress={props.onPress}
    >
      <ThemedText variant="T2" color="white">
        {props.label}
      </ThemedText>
    </TouchableOpacity>
  );
};

export default React.memo(Button);

const styles = StyleSheet.create({
  button: {
    borderRadius: 16,
    padding: 12,
    paddingHorizontal: 18,
  },
});
