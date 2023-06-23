import { ImageStyle, TextStyle, ViewStyle } from "react-native";

export interface StyleStorage {
  [styleName: string]: StyleStorage | ViewStyle | ImageStyle | TextStyle;
}

type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;
type Color = RGB | RGBA | HEX;

export interface Theme {
  id: "default-light" | "default-dark";
  isDark: boolean;
  accentColor: Color; // bright, saturated
  secondaryAccent: Color; // dark, deep
  surfaceColor: Color; // elements above page's background
  deepSurfaceColor: Color; // accent surface to catch attention
  inputColor: Color; // slightly different from surface
  backgroundColor: Color; // page backgound
  elevatedLow: Color; // variants for text or separators
  elevatedMedium: Color;
  elevatedHigh: Color;
  textColor: Color; // focused text
  textSecondaryColor: Color; // dimmed text
  shadowColor: Color;
  _statusbar: "light" | "dark"; // statusbar mode
  _navigationBar: "light" | "dark"; // navbar mode
}

const DEFAULT_ROUNDING = 15;

export const LIGHT_THEME: Theme = {
  id: "default-light",
  isDark: false,
  _statusbar: "dark",
  _navigationBar: "light",
  accentColor: "#3971FF",
  secondaryAccent: "#3F51B5",
  surfaceColor: "#fff",
  deepSurfaceColor: "#17192d",
  inputColor: "#eee",
  backgroundColor: "#f2f2f2",
  textColor: "#000",
  textSecondaryColor: "#888",
  shadowColor: "#000",
  elevatedLow: "#bbb",
  elevatedMedium: "#888",
  elevatedHigh: "#333",
};

export const DARK_THEME: Theme = {
  id: "default-dark",
  isDark: true,
  _statusbar: "light",
  _navigationBar: "dark",
  accentColor: "#3971FF",
  secondaryAccent: "#3F51B5",
  surfaceColor: "#22262c",
  deepSurfaceColor: "#283148",
  inputColor: "#33393f",
  backgroundColor: "#121217",
  textColor: "#eee",
  textSecondaryColor: "#999",
  shadowColor: "#3F51B5",
  elevatedLow: "#555",
  elevatedMedium: "#888",
  elevatedHigh: "#eee",
};
