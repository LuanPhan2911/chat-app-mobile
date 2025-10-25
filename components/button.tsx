import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { ButtonProps } from "@/types/types";
import { colors, radius } from "@/constants/theme";
import { verticalScale } from "@/utils/styling";
import Loading from "./loading";

export default function Button({
  style,
  onPress,
  loading = false,
  children,
}: ButtonProps) {
  if (loading) {
    return (
      <View style={[styles.button, style, { backgroundColor: "transparent" }]}>
        <Loading />
      </View>
    );
  }
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
      {children}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    height: verticalScale(56),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: radius.full,
  },
});
