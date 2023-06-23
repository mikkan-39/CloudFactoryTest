import React, { useCallback, useEffect } from "react";
import { Appearance, Platform, useColorScheme } from "react-native";
import * as NavigationBar from "expo-navigation-bar";
import { StatusBar } from "expo-status-bar";

import { LIGHT_THEME, DARK_THEME } from "./themesConstants";

const initialScheme = Appearance.getColorScheme();
export const initialTheme = initialScheme == "light" ? LIGHT_THEME : DARK_THEME;

const Context = React.createContext({
  ...initialTheme,
});

const isAndroid = Platform.OS === "android";

isAndroid && NavigationBar.setBackgroundColorAsync(initialTheme.surfaceColor);
isAndroid &&
  NavigationBar.setButtonStyleAsync(initialTheme.isDark ? "dark" : "light");

type Props = {
  children: React.ReactNode;
};

const ThemeProvider: React.FC<Props> = (props) => {
  const [themeVariant, setThemeVariant] = React.useState(initialScheme);
  const [theme, setTheme] = React.useState(initialTheme);
  // StatusBar.setBarStyle(initialTheme.statusbar, true);
  const colorScheme = useColorScheme();

  useEffect(() => {
    colorScheme != themeVariant && setThemeVariant(colorScheme);
  }, [colorScheme]);

  useEffect(() => {
    setTheme((currentTheme) => {
      const nextTheme = (() => {
        switch (themeVariant) {
          case "light":
            return LIGHT_THEME;
          case "dark":
            return DARK_THEME;
          default:
            return currentTheme;
        }
      })();

      isAndroid &&
        NavigationBar.setBackgroundColorAsync(nextTheme.surfaceColor);
      isAndroid && NavigationBar.setButtonStyleAsync(nextTheme._navigationBar);

      return nextTheme;
    });
  }, [themeVariant]);

  return (
    <>
      <StatusBar style={theme._statusbar} />
      <Context.Provider value={{ ...theme }}>{props.children}</Context.Provider>
    </>
  );
};

export default React.memo(ThemeProvider);
export const useMyTheme = () => React.useContext(Context);
