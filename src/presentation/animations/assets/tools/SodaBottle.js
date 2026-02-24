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