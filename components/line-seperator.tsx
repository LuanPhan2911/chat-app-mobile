import { spacingY } from "@/constants/theme";
import React from "react";
import { View, StyleSheet } from "react-native";

const LineSeparator = () => {
  return <View style={styles.line} />;
};

const styles = StyleSheet.create({
  line: {
    height: 1, // For a horizontal line
    width: "100%", // Spans the full width
    backgroundColor: "gray", // Color of the line
    marginVertical: spacingY._15, // Adds some vertical spacing
  },
});

export default LineSeparator;
