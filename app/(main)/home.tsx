import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import ScreenWrapper from "@/components/screen-wrapper";
import Typo from "@/components/typo";
import { useAuth } from "@/contexts/auth-context";
import { colors, radius } from "@/constants/theme";
import { Settings } from "lucide-react-native";
import { useRouter } from "expo-router";

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();
  return (
    <ScreenWrapper showPattern>
      <View style={styles.container}>
        <View style={styles.header}>
          <Typo
            size={24}
            color={colors.white}
            style={{
              maxWidth: "80%",
            }}
            textProps={{
              numberOfLines: 1,
            }}
          >
            Welcome to{" "}
            <Typo color={colors.white} size={24} fontWeight={800}>
              {user?.name}
            </Typo>
          </Typo>
          <TouchableOpacity
            onPress={() => router.push("/(main)/profile-modal")}
            style={styles.headerButton}
          >
            <Settings fill={colors.white} />
          </TouchableOpacity>
        </View>
        <View style={styles.content}></View>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 80,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerButton: {
    backgroundColor: colors.neutral200,
    borderRadius: radius._10,
    padding: 5,
  },
  content: {
    flex: 1,
    backgroundColor: colors.neutral200,
    borderTopLeftRadius: radius._30,
    borderTopRightRadius: radius._30,
    padding: 20,
  },
});
