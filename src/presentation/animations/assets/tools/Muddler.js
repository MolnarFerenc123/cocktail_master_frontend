import React from "react";
import { View, StyleSheet } from "react-native";

export const Muddler = ({ size = 200 }) => {
  const scale = size / 200;

  return (
    <View style={[styles.container, { transform: [{ scale }] }]}>
      <View style={styles.handle} />
      <View style={styles.head} />
      <View style={styles.teethContainer}>
        <View style={styles.tooth} />
        <View style={styles.tooth} />
        <View style={styles.tooth} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 30,
    height: 200,
    alignItems: "center",
  },
  handle: {
    width: 14,
    height: 160,
    backgroundColor: "#a6a6a7",
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
  },
  head: {
    width: 26,
    height: 30,
    backgroundColor: "#18181b",
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  teethContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 26,
    height: 10,
    backgroundColor: "transparent",
  },
  tooth: {
    width: 6,
    height: 10,
    backgroundColor: "#18181b",
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
  },
});