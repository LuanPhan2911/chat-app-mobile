import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import ScreenWrapper from "@/components/screen-wrapper";
import BackButton from "@/components/back-button";
import Typo from "@/components/typo";
import { colors, radius, spacingX, spacingY } from "@/constants/theme";
import { AtSign, Lock, Type, User } from "lucide-react-native";
import Input from "@/components/input";
import Button from "@/components/button";
import LineSeparator from "@/components/line-seperator";
import { useRouter } from "expo-router";

const Login = () => {
  const router = useRouter();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(false);
  const handleSubmit = async () => {
    if (!username || !password) {
      Alert.alert("Signin", "Please fill on fields");
      return;
    }
  };
  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
      }}
      behavior={Platform.OS == "android" ? "height" : "padding"}
    >
      <ScreenWrapper showPattern>
        <View style={styles.container}>
          <View style={styles.header}>
            <BackButton />
            <Typo
              size={16}
              style={{ fontStyle: "italic" }}
              fontWeight={600}
              color={colors.white}
            >
              Forgot password?
            </Typo>
          </View>
          <View style={styles.content}>
            <ScrollView>
              <Typo size={32} fontWeight={"bold"}>
                Welcome back
              </Typo>
              <Typo size={16} color={colors.neutral600}>
                We are happy to see you
              </Typo>

              <View style={{ marginVertical: spacingY._10 }}>
                <Input
                  placeholder="Enter your username"
                  icon={<User />}
                  onChangeText={setUsername}
                />

                <Input
                  placeholder="Enter your password"
                  secureTextEntry
                  icon={<Lock />}
                  onChangeText={setPassword}
                />
              </View>
              <Button onPress={handleSubmit}>
                <Typo fontWeight={600}>Sign in</Typo>
              </Button>
              <LineSeparator />
              <View style={styles.footer}>
                <Typo>Don't have account?</Typo>
                <Pressable onPress={() => router.replace("/(auth)/register")}>
                  <Typo color={colors.primaryDark}>Signup</Typo>
                </Pressable>
              </View>
            </ScrollView>
          </View>
        </View>
      </ScreenWrapper>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  content: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: radius._30,
    borderTopRightRadius: radius._30,
    padding: 20,
  },
  footer: {
    flexDirection: "row",
    gap: spacingX._5,
    justifyContent: "center",
    alignItems: "center",
  },
});
