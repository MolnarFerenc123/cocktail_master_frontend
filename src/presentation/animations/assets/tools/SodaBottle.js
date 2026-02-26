import React from "react";
import { View, StyleSheet } from "react-native";

export const SodaBottle = () => (
  <View style={styles.bottleContainer}>
    <View style={styles.bottleNeck} />
    <View style={styles.bottleBody}>
      <View style={styles.bottleLabel} />
    </View>
  </View>
);

const styles = StyleSheet.create({
  bottleContainer: {
    alignItems: "center",
  },
  bottleNeck: {
    width: 16,
    height: 60,
    backgroundColor: "#1e3a8a", // Sötétkék üveg nyak
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    borderBottomWidth: 0,
  },
  bottleBody: {
    width: 60,
    height: 160,
    backgroundColor: "#1d4ed8", // Világosabb kék üveg test
    borderRadius: 12,
    marginTop: -5,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden", // FIX: Ezzel garantáltan nem lóg ki a címke
    borderRightWidth: 4,
    borderRightColor: "rgba(0,0,0,0.1)", // Kis belső árnyék
  },
  bottleLabel: {
    width: 62, // FIX: Kitölti a belső teret
    height: 50,
    backgroundColor: "#f8fafc",
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: "#cbd5e1",
  },
});