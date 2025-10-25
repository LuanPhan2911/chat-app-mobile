import { colors } from "@/constants/theme";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
const logo = require("../assets/images/splashImage.png");
const SplashScreen = () => {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      router.replace("/(auth)/welcome");
    }, 1500);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={"light-content"}
        backgroundColor={colors.neutral900}
      />
      <Animated.Image
        source={logo}
        entering={FadeInDown.duration(700).springify()}
        style={styles.logo}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.neutral900,
  },
  logo: {
    height: "23%",
    aspectRatio: 1,
  },
});
