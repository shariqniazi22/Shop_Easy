// screens/ReviewFormScreen.js
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TouchableOpacity,
} from "react-native";
import { useTheme } from "../context/ThemeContext";
import ReviewService from "../services/ReviewsService";

const ReviewFormScreen = ({ route, navigation }) => {
  const { theme } = useTheme();
  const { productId } = route.params;
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!reviewText || rating < 1 || rating > 5) {
      alert("Please fill in all fields correctly.");
      return;
    }

    setIsSubmitting(true);
    try {
      await ReviewService.addReview(productId, { text: reviewText, rating });
      navigation.goBack();
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Failed to submit review. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={[
          styles.container,
          { backgroundColor: theme.colors.background },
        ]}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={[styles.label, { color: theme.colors.text }]}>
          Write a Review
        </Text>
        <TextInput
          style={[
            styles.input,
            { borderColor: theme.colors.border, color: theme.colors.text },
          ]}
          placeholder="Your review"
          placeholderTextColor={theme.colors.placeholder}
          value={reviewText}
          onChangeText={setReviewText}
          multiline
        />
        <Text style={[styles.label, { color: theme.colors.text }]}>
          Rating:
        </Text>
        <View style={styles.starsRow}>
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity
              key={star}
              style={[
                styles.starButton,
                {
                  backgroundColor:
                    rating >= star
                      ? theme.colors.primary
                      : theme.colors.surface,
                },
              ]}
              onPress={() => setRating(star)}
            >
              <Text
                style={{
                  color:
                    rating >= star ? "#fff" : theme.colors.textSecondary,
                  fontWeight: "bold",
                }}
              >
                {star}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity
          onPress={handleSubmit}
          disabled={isSubmitting}
          style={[
            styles.submitButton,
            {
              backgroundColor: isSubmitting
                ? theme.colors.disabled
                : theme.colors.primary,
            },
          ]}
        >
          <Text style={{ color: "#fff", fontWeight: "bold" }}>
            {isSubmitting ? "Submitting..." : "Submit Review"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    height: 100,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  starsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  starButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 4,
  },
  submitButton: {
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
});

export default ReviewFormScreen;
