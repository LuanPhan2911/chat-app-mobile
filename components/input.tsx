import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { InputProps } from "@/types/types";
import { colors, radius, spacingX, spacingY } from "@/constants/theme";
import { verticalScale } from "@/utils/styling";

export default function Input(props: InputProps) {
  const [isFocus, setFocus] = useState(false);
  return (
    <View
      style={[
        styles.input,
        isFocus && { borderColor: colors.primaryDark, borderWidth: 2 },
        props.containerStyle,
      ]}
    >
      {props.icon && props.icon}
      <TextInput
        {...props}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        ref={props.inputRef}
        style={props.inputStyle}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: verticalScale(56),
    backgroundColor: colors.neutral200,
    marginVertical: spacingY._10,
    borderRadius: radius._20,
    paddingHorizontal: spacingX._10,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});
