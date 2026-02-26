import React from "react";
import { View, StyleSheet } from "react-native";

export const BarSpoon = ({ size = 250 }) => {
  const scale = size / 250;

  return (
    <View style={[styles.container, { transform: [{ scale }] }]}>
      <View style={styles.topCap} />
      <View style={styles.handle} />
      <View style={styles.spoonHead} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 20,
    height: 250,
    alignItems: "center",
  },
  topCap: {
    width: 10,
    height: 10,
    backgroundColor: "#9ca3af",
    borderRadius: 5,
  },
  handle: {
    width: 4,
    height: 210,
    backgroundColor: "#d1d5db",
  },
  spoonHead: {
    width: 14,
    height: 30,
    backgroundColor: "#9ca3af",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
});