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
import { useAuth } from "@/contexts/auth-context";

const Register = () => {
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(false);
  const { signUp } = useAuth();
  const handleSubmit = async () => {
    if (!name || !email || !password) {
      Alert.alert("Signup", "Please fill on fields");
      return;
    }
    try {
      setLoading(true);
      await signUp(email, password, name);
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
              Need some help?
            </Typo>
          </View>
          <View style={styles.content}>
            <ScrollView>
              <Typo size={36} fontWeight={"bold"}>
                Get started
              </Typo>
              <Typo size={20} color={colors.neutral600}>
                Create your account to continue
              </Typo>

              <View style={{ marginVertical: spacingY._10 }}>
                <Input
                  placeholder="Enter your name"
                  icon={<User />}
                  onChangeText={setName}
                />
                <Input
                  placeholder="Enter your email"
                  icon={<AtSign />}
                  onChangeText={setEmail}
                />
                <Input
                  placeholder="Enter your password"
                  secureTextEntry
                  icon={<Lock />}
                  onChangeText={setPassword}
                />
              </View>
              <Button onPress={handleSubmit}>
                <Typo size={24} fontWeight={600}>
                  Signup
                </Typo>
              </Button>
              <LineSeparator />
              <View style={styles.footer}>
                <Typo size={20}>Already have account?</Typo>
                <Pressable onPress={() => router.push("/(auth)/login")}>
                  <Typo size={20} color={colors.primaryDark}>
                    Signin
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

export default Register;

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
