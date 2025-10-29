import { StyleSheet } from "react-native";
import React from "react";
import ScreenWrapper from "@/components/screen-wrapper";
import Typo from "@/components/typo";
import { useAuth } from "@/contexts/auth-context";
import Button from "@/components/button";

export default function Home() {
  const { signOut } = useAuth();

  return (
    <ScreenWrapper>
      <Typo>Main page</Typo>
      <Button onPress={async () => await signOut()}>
        <Typo>Sign out</Typo>
      </Button>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({});
