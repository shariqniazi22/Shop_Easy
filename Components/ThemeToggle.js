//theme toggle component
import React, { useContext } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ThemeContext } from "../context/ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleTheme} style={styles.button}>
        <Ionicons
          name={theme.isDark ? "sunny" : "moon"}
          size={24}
          color={theme.colors.text}
        />
        <Text style={[styles.buttonText, { color: theme.colors.text }]}>
          {theme.isDark ? "Light Mode" : "Dark Mode"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: "center",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
});
export default ThemeToggle;
// This component provides a button to toggle between light and dark themes.
