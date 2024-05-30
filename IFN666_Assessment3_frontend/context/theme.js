import { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Create a ThemeContext
const ThemeContext = createContext();

// Custom hook to use the ThemeContext
export const useTheme = () => useContext(ThemeContext);

// ThemeProvider component to provide theme state to the application
export function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Function to retrieve the stored theme from AsyncStorage
    const getTheme = async () => {
      try {
        const storedTheme = await AsyncStorage.getItem("isDarkMode");
        const parsedTheme = storedTheme ? JSON.parse(storedTheme) : false;
        setIsDarkMode(parsedTheme);
      } catch (error) {
        console.error("Error loading theme:", error);
      }
    };
    getTheme();
  }, []);

  return (
    <ThemeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}
