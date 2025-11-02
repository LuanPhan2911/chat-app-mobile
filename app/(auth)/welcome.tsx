import Button from "@/components/button";
import ScreenWrapper from "@/components/screen-wrapper";
import Typo from "@/components/typo";
import { colors, spacingX, spacingY } from "@/constants/theme";
import { verticalScale } from "@/utils/styling";
import { useRouter } from "expo-router";

import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

export default function Welcome() {
  const router = useRouter();
  return (
    <ScreenWrapper showPattern>
      <View style={styles.container}>
        <Typo
          size={48}
          color={colors.white}
          fontWeight={"bold"}
          style={{ textAlign: "center" }}
        >
          Bubby
        </Typo>

        <Animated.Image
          source={require("@/assets/images/welcome.png")}
          style={styles.welcomeImage}
          entering={FadeIn.duration(700).springify()}
          resizeMode={"contain"}
        />
        <Typo
          size={36}
          color={colors.white}
          fontWeight={800}
          style={{ textAlign: "center" }}
        >
          Stay connected{"\n"}
          with your friends{"\n"}
          and family
        </Typo>

        <Button
          style={{ backgroundColor: colors.white }}
          onPress={() => router.push("/(auth)/login")}
        >
          <Typo size={24} fontWeight="600">
            Get started
          </Typo>
        </Button>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    padding: 20,
  },
  welcomeImage: {
    height: verticalScale(300),
    alignSelf: "center",
  },
});
