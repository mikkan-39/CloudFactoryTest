import React from "react";
import BottomTabs from "./navigators/BottomTabs";
import ThemedNavContainer from "./navigators/ThemedNavigationContainer";
import ThemeProvider from "./styles/themeProvider";
import dataStore from "./mobx/DataStore";
import { Provider } from "mobx-react";
import { Platform, UIManager } from "react-native";
import { enableScreens } from "react-native-screens";

enableScreens();

if (Platform.OS === "android") {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    // LayoutAnimation on android can break with FlatLists
    UIManager.setLayoutAnimationEnabledExperimental(false);
  }
}

if (__DEV__) {
  require("./ReactotronConfig");
}

export default function App() {
  return (
    <Provider dataStore={dataStore}>
      <ThemeProvider>
        <ThemedNavContainer>
          <BottomTabs />
        </ThemedNavContainer>
      </ThemeProvider>
    </Provider>
  );
}
