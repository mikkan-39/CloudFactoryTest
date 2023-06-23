import React from "react";
import { useMyTheme } from "../styles/themeProvider";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";

const ThemedNavContainer = React.memo((props: any) => {
  const theme = useMyTheme();
  return (
    <NavigationContainer
      theme={{
        ...DefaultTheme,
        dark: theme.isDark,
        colors: {
          primary: theme.accentColor,
          background: theme.backgroundColor,
          card: theme.surfaceColor,
          text: theme.textColor,
          border: theme.elevatedHigh,
          notification: theme.secondaryAccent,
        },
      }}
    >
      {props.children}
    </NavigationContainer>
  );
});

export default ThemedNavContainer;
