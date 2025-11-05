import { AuthProvider, useAuth } from "@/contexts/auth-context";
import { Stack } from "expo-router";
import React from "react";
import SplashScreenController from "./splash";

const Root = () => {
  return (
    <AuthProvider>
      <SplashScreenController />
      <RootNavigator />
    </AuthProvider>
  );
};
const RootNavigator = () => {
  return <Stack screenOptions={{ headerShown: false }}></Stack>;
};
export default Root;
