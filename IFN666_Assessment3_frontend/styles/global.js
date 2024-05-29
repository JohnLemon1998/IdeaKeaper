import { StyleSheet } from "react-native";
import { useTheme } from "../context/theme";

export function GlobalStyles() {
  const { isDarkMode } = useTheme();

  const styles = StyleSheet.create({
    background: {
      backgroundColor: isDarkMode ? "black":"white",
      flex:1,
    },
    text: {
      color: isDarkMode ? "white" : "black",
    },
    sticker: {
      backgroundColor: isDarkMode ? "dimgrey" : "khaki"
    },
    addButton: {
      backgroundColor: isDarkMode ? "darkslategrey" : "dodgerblue"
    },
  });

  return styles;
}