import { StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { BackButtonProps } from "@/types/types";
import { colors } from "@/constants/theme";
import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";

export default function BackButton({
  style,
  color = colors.white,
  iconSize = 32,
}: BackButtonProps) {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => router.back()}
      style={[styles.button, style]}
    >
      <ArrowLeft size={iconSize} color={color} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {},
});
