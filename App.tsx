import React from "react";
import BottomTabs from "./navigators/BottomTabs";
import ThemedNavContainer from "./navigators/ThemedNavigationContainer";
import ThemeProvider from "./styles/themeProvider";
import dataStore from "./mobx/DataStore";
import { Provider } from "mobx-react";

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
