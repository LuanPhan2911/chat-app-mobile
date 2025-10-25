import { colors } from "@/constants/theme";
import { ScreenWrapperProps } from "@/types/types";
import React from "react";
import { ImageBackground, StatusBar, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ScreenWrapper({
  children,
  bgOpacity = 1,
  isModal = false,
  showPattern = false,
  style,
}: ScreenWrapperProps) {
  return (
    <ImageBackground
      source={require("@/assets/images/bgPattern.png")}
      style={{
        flex: 1,
        backgroundColor: isModal ? colors.white : colors.neutral900,
      }}
      imageStyle={{ opacity: showPattern ? bgOpacity : 0 }}
    >
      <SafeAreaView
        style={[
          {
            flex: 1,
          },
          style,
        ]}
      >
        <StatusBar barStyle={"light-content"} backgroundColor={"transparent"} />
        {children}
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({});
