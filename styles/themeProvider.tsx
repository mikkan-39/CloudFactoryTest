import React from "react";
import { Appearance, Platform, useColorScheme } from "react-native";
import * as NavigationBar from "expo-navigation-bar";
import { StatusBar } from "expo-status-bar";

import { LIGHT_THEME, DARK_THEME } from "./themesConstants";

export const initialTheme =
  Appearance.getColorScheme() == "light" ? LIGHT_THEME : DARK_THEME;

const Context = React.createContext({
  ...initialTheme,
});

const isAndroid = Platform.OS === "android";

const ThemeProvider = (props: { children: React.ReactNode }) => {
  const colorScheme = useColorScheme();

  const theme = React.useMemo(() => {
    const nextTheme = (() => {
      switch (colorScheme) {
        case "light":
          return LIGHT_THEME;
        case "dark":
          return DARK_THEME;
        default:
          return initialTheme;
      }
    })();

    isAndroid && NavigationBar.setBackgroundColorAsync(nextTheme.surfaceColor);
    isAndroid && NavigationBar.setButtonStyleAsync(nextTheme._navigationBar);
    return nextTheme;
  }, [colorScheme]);

  return (
    <>
      <StatusBar style={theme._statusbar} />
      <Context.Provider value={{ ...theme }}>{props.children}</Context.Provider>
    </>
  );
};

export default React.memo(ThemeProvider);
export const useMyTheme = () => React.useContext(Context);
