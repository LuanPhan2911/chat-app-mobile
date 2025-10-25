import { Stack } from "expo-router";
import React, { Component } from "react";
import { StyleSheet } from "react-native";

export default class _layout extends Component {
  render() {
    return <Stack screenOptions={{ headerShown: false }} />;
  }
}

const styles = StyleSheet.create({});
