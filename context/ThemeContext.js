// ===============================================
// src/context/ThemeContext.js
import { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem("theme");
      if (savedTheme !== null) {
        setIsDark(JSON.parse(savedTheme));
      }
    } catch (error) {
      console.error("Error loading theme:", error);
    }
  };

  const toggleTheme = async () => {
    try {
      const newTheme = !isDark;
      setIsDark(newTheme);
      await AsyncStorage.setItem("theme", JSON.stringify(newTheme));
    } catch (error) {
      console.error("Error saving theme:", error);
    }
  };

  const theme = {
    isDark,
    colors: {
      primary: "#007AFF",
      background: isDark ? "#1C1C1E" : "#FFFFFF",
      surface: isDark ? "#2C2C2E" : "#F2F2F7",
      text: isDark ? "#FFFFFF" : "#000000",
      textSecondary: isDark ? "#AEAEB2" : "#8E8E93",
      border: isDark ? "#38383A" : "#C6C6C8",
      card: isDark ? "#2C2C2E" : "#FFFFFF",
    },
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
