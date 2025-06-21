// services/ReviewService.js
import AsyncStorage from "@react-native-async-storage/async-storage";

class ReviewService {
  static async getReviews(productId) {
    try {
      const reviews = await AsyncStorage.getItem(`reviews_${productId}`);
      return reviews ? JSON.parse(reviews) : [];
    } catch (error) {
      console.error("Error getting reviews:", error);
      return [];
    }
  }

  static async addReview(productId, review) {
    try {
      const reviews = await this.getReviews(productId);
      const newReview = {
        id: Date.now().toString(),
        ...review,
        timestamp: new Date().toISOString(),
      };
      reviews.push(newReview);
      await AsyncStorage.setItem(
        `reviews_${productId}`,
        JSON.stringify(reviews)
      );
      return newReview;
    } catch (error) {
      console.error("Error adding review:", error);
      throw error;
    }
  }
}

export default ReviewService;
