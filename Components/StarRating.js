import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const StarRating = ({
  rating,
  onRatingChange,
  size = 20,
  interactive = false,
}) => {
  const stars = [1, 2, 3, 4, 5];

  const renderStar = (index) => {
    const isFilled = index <= rating;
    const StarComponent = interactive ? TouchableOpacity : View;

    return (
      <StarComponent
        key={index}
        onPress={interactive ? () => onRatingChange(index) : undefined}
        style={interactive ? styles.interactiveStar : null}
      >
        <Ionicons
          name={isFilled ? "star" : "star-outline"}
          size={size}
          color={isFilled ? "#FFD700" : "#C7C7CC"}
        />
      </StarComponent>
    );
  };

  return <View style={styles.container}>{stars.map(renderStar)}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  interactiveStar: {
    padding: 2,
  },
});

export default StarRating;
