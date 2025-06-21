// ===============================================
// src/screens/ProductDetailScreen.js

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";
import { useWishlist } from "../context/WishlistContext";
import ApiService from "../services/ApiService";
import ReviewService from "../services/ReviewsService"; // ✅ Corrected import
import StarRating from "../Components/StarRating";

const { width } = Dimensions.get("window");

const ProductDetailScreen = ({ route, navigation }) => {
  const { productId } = route.params;
  const { theme } = useTheme();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();

  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProductDetails();
    fetchReviews();
  }, [productId]);

  const fetchProductDetails = async () => {
    try {
      const data = await ApiService.fetchProductById(productId);
      setProduct(data);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch product details");
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      const reviewsData = await ReviewService.getReviews(productId);
      setReviews(reviewsData);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const handleWishlistToggle = () => {
    if (!product) return;

    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleWriteReview = () => {
    navigation.navigate("ReviewForm", {
      productId: product.id,
      productTitle: product.title,
      onReviewSubmitted: fetchReviews,
    });
  };

  if (loading) {
    return (
      <View
        style={[
          styles.loadingContainer,
          { backgroundColor: theme.colors.background },
        ]}
      >
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  if (!product) {
    return (
      <View
        style={[
          styles.errorContainer,
          { backgroundColor: theme.colors.background },
        ]}
      >
        <Text style={[styles.errorText, { color: theme.colors.text }]}>
          Product not found
        </Text>
      </View>
    );
  }

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
      : product.rating?.rate || 0;

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: product.image }} style={styles.image} />
      </View>

      <View
        style={[styles.content, { backgroundColor: theme.colors.background }]}
      >
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={[styles.title, { color: theme.colors.text }]}>
              {product.title}
            </Text>
            <Text
              style={[styles.category, { color: theme.colors.textSecondary }]}
            >
              {product.category}
            </Text>
          </View>
          <TouchableOpacity
            style={[
              styles.wishlistButton,
              { backgroundColor: theme.colors.surface },
            ]}
            onPress={handleWishlistToggle}
          >
            <Ionicons
              name={isInWishlist(product.id) ? "heart" : "heart-outline"}
              size={24}
              color={
                isInWishlist(product.id)
                  ? "#FF3B30"
                  : theme.colors.textSecondary
              }
            />
          </TouchableOpacity>
        </View>

        <View style={styles.priceRatingContainer}>
          <Text style={[styles.price, { color: theme.colors.primary }]}>
            ${product.price.toFixed(2)}
          </Text>
          <View style={styles.ratingContainer}>
            <StarRating rating={averageRating} size={16} />
            <Text
              style={[styles.ratingText, { color: theme.colors.textSecondary }]}
            >
              {averageRating.toFixed(1)} ({reviews.length} reviews)
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Description
          </Text>
          <Text
            style={[styles.description, { color: theme.colors.textSecondary }]}
          >
            {product.description}
          </Text>
        </View>

        <View style={styles.section}>
          <View style={styles.reviewsHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Reviews ({reviews.length})
            </Text>
            <TouchableOpacity
              style={[
                styles.writeReviewButton,
                { backgroundColor: theme.colors.primary },
              ]}
              onPress={handleWriteReview}
            >
              <Text style={styles.writeReviewText}>Write Review</Text>
            </TouchableOpacity>
          </View>

          {reviews.length > 0 ? (
            reviews.map((review) => (
              <View
                key={review.id}
                style={[
                  styles.reviewItem,
                  { backgroundColor: theme.colors.surface },
                ]}
              >
                <View style={styles.reviewHeader}>
                  <Text
                    style={[styles.reviewAuthor, { color: theme.colors.text }]}
                  >
                    {review.author}
                  </Text>
                  <StarRating rating={review.rating} size={14} />
                </View>
                <Text
                  style={[
                    styles.reviewText,
                    { color: theme.colors.textSecondary },
                  ]}
                >
                  {review.comment}
                </Text>
                <Text
                  style={[
                    styles.reviewDate,
                    { color: theme.colors.textSecondary },
                  ]}
                >
                  {new Date(review.timestamp).toLocaleDateString()}
                </Text>
              </View>
            ))
          ) : (
            <Text
              style={[styles.noReviews, { color: theme.colors.textSecondary }]}
            >
              No reviews yet. Be the first to review this product!
            </Text>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 16,
  },
  imageContainer: {
    height: 300,
    backgroundColor: "#F8F8F8",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  titleContainer: {
    flex: 1,
    marginRight: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  category: {
    fontSize: 16,
    textTransform: "capitalize",
  },
  wishlistButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  priceRatingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  price: {
    fontSize: 28,
    fontWeight: "bold",
  },
  ratingContainer: {
    alignItems: "flex-end",
  },
  ratingText: {
    fontSize: 14,
    marginTop: 4,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
  reviewsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  writeReviewButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  writeReviewText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
  reviewItem: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  reviewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  reviewAuthor: {
    fontSize: 16,
    fontWeight: "600",
  },
  reviewText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  reviewDate: {
    fontSize: 12,
  },
  noReviews: {
    fontSize: 16,
    textAlign: "center",
    fontStyle: "italic",
  },
});

export default ProductDetailScreen;
