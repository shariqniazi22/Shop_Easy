// ===============================================
// src/components/Header.js
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";

const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <View
      style={[
        styles.header,
        {
          backgroundColor: theme.colors.background,
          borderBottomColor: theme.colors.border,
          paddingTop:40
        },
      ]}
    >
      <Text style={[styles.title, { color: theme.colors.text }]}>ShopEasy</Text>
      <TouchableOpacity onPress={toggleTheme} style={styles.themeButton}>
        <Ionicons
          name={theme.isDark ? "sunny" : "moon"}
          size={24}
          color={theme.colors.text}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  themeButton: {
    padding: 8,
  },
});

export default Header;
