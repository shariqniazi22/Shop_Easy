// ===============================================
// src/components/ProductCard.js
import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";
import { useWishlist } from "../context/WishlistContext";

const { width } = Dimensions.get("window");
const cardWidth = (width - 48) / 2;

const ProductCard = ({ product, onPress }) => {
  const { theme } = useTheme();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();

  const handleWishlistToggle = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.card,
        {
          backgroundColor: theme.colors.card,
          borderColor: theme.colors.border,
        },
      ]}
      onPress={onPress}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: product.image }} style={styles.image} />
        <TouchableOpacity
          style={[
            styles.wishlistButton,
            { backgroundColor: theme.colors.background },
          ]}
          onPress={handleWishlistToggle}
        >
          <Ionicons
            name={isInWishlist(product.id) ? "heart" : "heart-outline"}
            size={20}
            color={
              isInWishlist(product.id) ? "#FF3B30" : theme.colors.textSecondary
            }
          />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text
          style={[styles.title, { color: theme.colors.text }]}
          numberOfLines={2}
        >
          {product.title}
        </Text>
        <Text style={[styles.category, { color: theme.colors.textSecondary }]}>
          {product.category}
        </Text>
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={14} color="#FFD700" />
          <Text style={[styles.rating, { color: theme.colors.textSecondary }]}>
            {product.rating?.rate || 0} ({product.rating?.count || 0})
          </Text>
        </View>
        <Text style={[styles.price, { color: theme.colors.primary }]}>
          ${product.price.toFixed(2)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: cardWidth,
    margin: 8,
    borderRadius: 12,
    borderWidth: 1,
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  imageContainer: {
    position: "relative",
  },
  image: {
    width: "100%",
    height: 150,
    resizeMode: "contain",
    backgroundColor: "#F8F8F8",
  },
  wishlistButton: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  content: {
    padding: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
  },
  category: {
    fontSize: 12,
    textTransform: "capitalize",
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  rating: {
    fontSize: 12,
    marginLeft: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ProductCard;
