import React from "react";
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import { useMyTheme } from "../styles/themeProvider";
import routes from "./routes";
import { Theme } from "../styles/themesConstants";
import { ParamListBase, RouteProp } from "@react-navigation/native";
import CoursesPage from "../screens/Courses";
import AboutPage from "../screens/About";

const Tab = createBottomTabNavigator();

function BottomTabs() {
  const theme = useMyTheme();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => getScreenOptions(route, theme)}
    >
      <Tab.Screen name={routes.AboutPage} component={AboutPage} />
      <Tab.Screen name={routes.Courses} component={CoursesPage} />
    </Tab.Navigator>
  );
}

export default BottomTabs;

const iconNames = {
  [routes.Courses]: "repeat",
  [routes.AboutPage]: "reader",
};

const getScreenOptions = (
  route: RouteProp<ParamListBase, string>,
  theme: Theme
): BottomTabNavigationOptions => ({
  // headerShown: false,
  tabBarInactiveTintColor: theme.elevatedMedium,
  tabBarActiveTintColor: theme.accentColor,
  tabBarStyle: {
    backgroundColor: theme.surfaceColor,
  },
  tabBarIcon: ({ color, size, focused }) => {
    return (
      <Icon
        name={
          focused ? iconNames[route.name] : iconNames[route.name] + "-outline"
        }
        size={size}
        color={color}
      />
    );
  },
});
