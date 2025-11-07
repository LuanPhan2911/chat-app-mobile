import {
  Alert,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import ScreenWrapper from "@/components/screen-wrapper";
import Header from "@/components/header";
import BackButton from "@/components/back-button";
import { colors, radius } from "@/constants/theme";
import Avatar from "@/components/avatar";
import { AtSign, Edit2, LogOut, User } from "lucide-react-native";
import * as ImagePicker from "expo-image-picker";
import Button from "@/components/button";
import Typo from "@/components/typo";
import { useAuth } from "@/contexts/auth-context";
import Input from "@/components/input";
const ProfileModal = () => {
  const [image, setImage] = useState<string | null>(null);
  const { signOut, user, editUser } = useAuth();

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      return;
    }
    setName(user.name);
    setEmail(user.email);
  }, [user]);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    if (!name) {
      Alert.alert("Need filled name");
    }

    try {
      setLoading(true);
      await editUser(name);
    } catch (error: any) {
      Alert.alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenWrapper isModal>
      <View style={styles.container}>
        <Header
          title="Profile"
          leftIcon={<BackButton color={colors.black} />}
        />
        <View style={styles.content}>
          <ScrollView style={styles.form}>
            <View style={styles.avatarContainer}>
              <Avatar uri={image} />
              <TouchableOpacity
                style={styles.avatarIcon}
                onPress={pickImage}
                disabled={isLoading}
              >
                <Edit2 fill={colors.rose} />
              </TouchableOpacity>
            </View>
            <View style={styles.line}></View>
            <View>
              <Input
                placeholder="Your email"
                icon={<AtSign />}
                onChangeText={setEmail}
                editable={false}
                value={email}
              />
              <Input
                placeholder="Your name"
                icon={<User />}
                onChangeText={setName}
                value={name}
              />
            </View>
          </ScrollView>
        </View>

        <View style={styles.footer}>
          <Button style={styles.logoutButton} onPress={signOut} disabled={true}>
            <LogOut />
          </Button>

          <Button style={styles.updateButton} onPress={handleSubmit}>
            <Typo fontWeight={600}>Update</Typo>
          </Button>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default ProfileModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    backgroundColor: colors.primary,
    borderTopLeftRadius: radius._30,
    borderTopRightRadius: radius._30,

    padding: 20,
  },
  footer: {
    height: 60,
    backgroundColor: colors.green,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    gap: 20,
    justifyContent: "space-between",
  },
  logoutButton: {
    padding: 10,
    backgroundColor: colors.white,
  },
  updateButton: {
    width: 200,
  },
  form: {
    flex: 1,
  },
  avatarContainer: {
    alignItems: "center",
  },
  avatarIcon: {
    position: "absolute",
    bottom: 0,
    right: "30%",
    backgroundColor: colors.neutral100,
    opacity: 1,
    borderRadius: radius._10,
    borderColor: colors.black,
    borderWidth: 1,
    padding: 5,
  },
  line: {
    height: 1,
    backgroundColor: colors.black,
    marginVertical: 10,
  },
});
