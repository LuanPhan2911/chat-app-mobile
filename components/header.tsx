import { StyleSheet, View } from "react-native";
import React from "react";
import { HeaderProps } from "@/types/types";
import Typo from "./typo";

const Header = ({ leftIcon, rightIcon, style, title }: HeaderProps) => {
  return (
    <View style={styles.header}>
      {leftIcon && leftIcon}
      <Typo size={36} fontWeight={800} style={styles.title}>
        {title}
      </Typo>
      {rightIcon && rightIcon}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    height: 80,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    position: "absolute",
    width: "100%",
    textAlign: "center",
    zIndex: -1,
  },
});
