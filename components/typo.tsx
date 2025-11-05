import { Text, TextStyle } from "react-native";
import React from "react";
import { TypoProps } from "@/types/types";
import { colors } from "@/constants/theme";
import { verticalScale } from "@/utils/styling";

export default function Typo({
  children,
  color = colors.text,
  fontWeight = "400",
  size = 20,
  style,
  textProps,
}: TypoProps) {
  const textStyle: TextStyle = {
    fontSize: verticalScale(size),
    color,
    fontWeight,
  };
  return (
    <Text style={[textStyle, style]} {...textProps}>
      {children}
    </Text>
  );
}
