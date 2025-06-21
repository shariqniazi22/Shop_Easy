//review component
import { View, Text, StyleSheet } from "react-native";

import { useTheme } from "../context/ThemeContext";

const ReviewItem = ({ review }) => {
  const { theme } = useTheme();

  return (
    <View
      style={[styles.reviewItem, { backgroundColor: theme.colors.surface }]}
    >
      <Text style={[styles.reviewText, { color: theme.colors.text }]}>
        {review.text}
      </Text>
      <Text style={[styles.reviewRating, { color: theme.colors.primary }]}>
        Rating: {review.rating}
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  reviewItem: {
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  reviewText: {
    fontSize: 16,
    marginBottom: 4,
  },
  reviewRating: {
    fontSize: 14,
    fontWeight: "bold",
  },
});
export default ReviewItem;
// This component displays a single review with its text and rating.
// It uses the theme context to style the review item according to the current theme.
