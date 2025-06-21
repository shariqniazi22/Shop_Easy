// ===============================================
// src/components/SearchFilter.js
import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Modal,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";
import ApiService from "../services/ApiService";

const SearchFilter = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  sortOrder,
  onSortChange,
}) => {
  const { theme } = useTheme();
  const [categories, setCategories] = useState([]);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showSortModal, setShowSortModal] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await ApiService.fetchCategories();
      setCategories(["all", ...data]);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const sortOptions = [
    { key: "none", label: "Default" },
    { key: "low-high", label: "Price: Low to High" },
    { key: "high-low", label: "Price: High to Low" },
  ];

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.modalItem,
        { backgroundColor: theme.colors.surface },
        selectedCategory === item && {
          backgroundColor: theme.colors.primary + "20",
        },
      ]}
      onPress={() => {
        onCategoryChange(item);
        setShowCategoryModal(false);
      }}
    >
      <Text style={[styles.modalItemText, { color: theme.colors.text }]}>
        {item.charAt(0).toUpperCase() + item.slice(1)}
      </Text>
    </TouchableOpacity>
  );

  const renderSortItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.modalItem,
        { backgroundColor: theme.colors.surface },
        sortOrder === item.key && {
          backgroundColor: theme.colors.primary + "20",
        },
      ]}
      onPress={() => {
        onSortChange(item.key);
        setShowSortModal(false);
      }}
    >
      <Text style={[styles.modalItemText, { color: theme.colors.text }]}>
        {item.label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View
        style={[
          styles.searchContainer,
          { backgroundColor: theme.colors.surface },
        ]}
      >
        <Ionicons name="search" size={20} color={theme.colors.textSecondary} />
        <TextInput
          style={[styles.searchInput, { color: theme.colors.text }]}
          placeholder="Search products..."
          placeholderTextColor={theme.colors.textSecondary}
          value={searchQuery}
          onChangeText={onSearchChange}
        />
      </View>

      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[
            styles.filterButton,
            { backgroundColor: theme.colors.surface },
          ]}
          onPress={() => setShowCategoryModal(true)}
        >
          <Text style={[styles.filterText, { color: theme.colors.text }]}>
            {selectedCategory === "all" ? "Category" : selectedCategory}
          </Text>
          <Ionicons
            name="chevron-down"
            size={16}
            color={theme.colors.textSecondary}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterButton,
            { backgroundColor: theme.colors.surface },
          ]}
          onPress={() => setShowSortModal(true)}
        >
          <Text style={[styles.filterText, { color: theme.colors.text }]}>
            {sortOptions.find((option) => option.key === sortOrder)?.label ||
              "Sort"}
          </Text>
          <Ionicons
            name="chevron-down"
            size={16}
            color={theme.colors.textSecondary}
          />
        </TouchableOpacity>
      </View>

      {/* Category Modal */}
      <Modal
        visible={showCategoryModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowCategoryModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.modalContent,
              { backgroundColor: theme.colors.background },
            ]}
          >
            <Text style={[styles.modalTitle, { color: theme.colors.text }]}>
              Sort By
            </Text>
            <FlatList
              data={sortOptions}
              renderItem={renderSortItem}
              keyExtractor={(item) => item.key}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowSortModal(false)}
            >
              <Text
                style={[
                  styles.closeButtonText,
                  { color: theme.colors.primary },
                ]}
              >
                Close
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    flex: 0.48,
  },
  filterText: {
    flex: 1,
    fontSize: 14,
    textTransform: "capitalize",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    maxHeight: "60%",
    borderRadius: 12,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  modalItem: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  modalItemText: {
    fontSize: 16,
    textTransform: "capitalize",
  },
  closeButton: {
    marginTop: 16,
    padding: 12,
    alignItems: "center",
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default SearchFilter;
