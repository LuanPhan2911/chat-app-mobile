import { StyleSheet, View } from "react-native";
import React from "react";
import ScreenWrapper from "@/components/screen-wrapper";
import Typo from "@/components/typo";
import { useAuth } from "@/contexts/auth-context";
import { colors } from "@/constants/theme";

export default function Home() {
  const { signOut } = useAuth();

  return (
    <ScreenWrapper>
      <View>
        <Typo color={colors.white}>Home page</Typo>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({});
