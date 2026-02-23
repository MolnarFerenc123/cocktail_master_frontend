import React from "react";
import { View, StyleSheet } from "react-native";

export const SimpleStrainer = ({ width = 90 }) => {
  const BASE_WIDTH = 90;
  const scale = width / BASE_WIDTH;

  const coils = Array.from({ length: 16 }).map((_, i) => (
    <View key={i} style={styles.coilLoop} />
  ));

  return (
    <View
      style={[
        styles.container,
        {
          width: BASE_WIDTH,
          transform: [{ scale }],
        },
      ]}
    >
      <View style={styles.handleContainer}>
        <View style={styles.handleBar} />
      </View>

      <View style={styles.discProfile}>
        <View style={[styles.ear, styles.earLeft]} />
        <View style={[styles.ear, styles.earRight]} />
      </View>

      <View style={styles.springRow}>{coils}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    height: 40,
  },
  discProfile: {
    width: 86,
    height: 6,
    backgroundColor: "#d1d5db",
    borderRadius: 3,
    borderWidth: 1,
    borderColor: "#9ca3af",
    zIndex: 2,
    position: "relative",
  },
  ear: {
    position: "absolute",
    top: -2,
    width: 10,
    height: 4,
    backgroundColor: "#9ca3af",
    borderRadius: 2,
  },
  earLeft: { left: -4 },
  earRight: { right: -4 },
  springRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 80,
    marginTop: -2,
    zIndex: 1,
  },
  coilLoop: {
    width: 4,
    height: 12,
    backgroundColor: "transparent",
    borderWidth: 1.5,
    borderColor: "#6b7280",
    borderRadius: 2,
    marginHorizontal: 0.5,
  },
  handleContainer: {
    position: "absolute",
    top: -15,
    zIndex: 0,
    transform: [{ rotate: "15deg" }],
  },
  handleBar: {
    width: 6,
    height: 25,
    backgroundColor: "#9ca3af",
    borderRadius: 3,
    borderWidth: 1,
    borderColor: "#6b7280",
  },
});