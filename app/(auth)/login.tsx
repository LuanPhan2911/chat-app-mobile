import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import React, { useState } from "react";
import ScreenWrapper from "@/components/screen-wrapper";
import BackButton from "@/components/back-button";
import Typo from "@/components/typo";
import { colors, radius, spacingX, spacingY } from "@/constants/theme";
import { Lock, User } from "lucide-react-native";
import Input from "@/components/input";
import Button from "@/components/button";
import LineSeparator from "@/components/line-seperator";
import { useRouter } from "expo-router";
import { useAuth } from "@/contexts/auth-context";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(false);

  const { signIn } = useAuth();
  const handleSubmit = async () => {
    if (!email || !password) {
      Alert.alert("Signin", "Please fill on fields");
      return;
    }
    try {
      setLoading(true);
      await signIn(email, password);
    } catch (error: any) {
      Alert.alert(error.message);
    } finally {
      setLoading(false);
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
              size={20}
              style={{ fontStyle: "italic" }}
              color={colors.white}
            >
              Forgot password?
            </Typo>
          </View>
          <View style={styles.content}>
            <ScrollView>
              <Typo size={36} fontWeight={"bold"}>
                Welcome back
              </Typo>
              <Typo size={20} color={colors.neutral600}>
                We are happy to see you
              </Typo>

              <View style={{ marginVertical: spacingY._10 }}>
                <Input
                  placeholder="Enter your email"
                  icon={<User />}
                  onChangeText={setEmail}
                  value={email}
                />

                <Input
                  placeholder="Enter your password"
                  secureTextEntry
                  icon={<Lock />}
                  onChangeText={setPassword}
                  value={password}
                />
              </View>
              <Button onPress={handleSubmit} loading={isLoading}>
                <Typo fontWeight={600} size={24}>
                  Login
                </Typo>
              </Button>
              <LineSeparator />
              <View style={styles.footer}>
                <Typo size={20}>Don't have account?</Typo>
                <Pressable onPress={() => router.replace("/(auth)/register")}>
                  <Typo size={20} color={colors.primaryDark}>
                    Signup
                  </Typo>
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
    backgroundColor: colors.neutral200,
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
