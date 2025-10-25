import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import ScreenWrapper from "@/components/screen-wrapper";
import BackButton from "@/components/back-button";
import Typo from "@/components/typo";
import { colors, radius } from "@/constants/theme";
import { Type, User } from "lucide-react-native";
import Input from "@/components/input";

const Register = () => {
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
              Need some help?
            </Typo>
          </View>
          <View style={styles.content}>
            <Typo size={32} fontWeight={"bold"}>
              Get started
            </Typo>
            <Typo size={16} color={colors.neutral600}>
              Create your account to continue
            </Typo>

            <Input placeholder="Enter your username" icon={<User />} />
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
    backgroundColor: "white",
    borderTopLeftRadius: radius._30,
    borderTopRightRadius: radius._30,
    padding: 20,
  },
});
