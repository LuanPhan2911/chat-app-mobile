import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { AvatarProps } from "@/types/types";
import { colors, radius } from "@/constants/theme";
import { Image } from "expo-image";
import { getImageUri } from "@/utils/image";
const Avatar = ({ uri, isGroup = false, size = 40, style }: AvatarProps) => {
  return (
    <View style={styles.avatar}>
      <Image
        source={getImageUri(uri, isGroup)}
        contentFit="cover"
        style={styles.image}
      />
    </View>
  );
};

export default Avatar;

const styles = StyleSheet.create({
  avatar: {
    width: 100,
    height: 100,
    borderRadius: radius.full,
    borderWidth: 1,
    backgroundColor: colors.green,
    overflow: "hidden",
  },
  image: {
    flex: 1,
  },
});
