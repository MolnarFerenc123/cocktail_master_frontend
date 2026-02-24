import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated, Easing } from "react-native";
import { theme } from "../../../core/theme";
import { RegularGlass } from "../assets/glasses/RegularGlass";
import { IceCube } from "../assets/ingredients/IceCube";

export const Action20Animation = ({
  liquidColor = "#f59e0b", // A már benne lévő folyadék színe
  hasIce = false,
}) => {
  const masterAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(masterAnim, {
          toValue: 0,
          duration: 0,
          useNativeDriver: false,
        }),
        Animated.timing(masterAnim, {
          toValue: 100,
          duration: 10000,
          useNativeDriver: false,
          easing: Easing.inOut(Easing.cubic),
        }),
        Animated.delay(1000),
      ]),
    );

    loop.start();
    return () => loop.stop();
  }, []);

  // --- INTERPOLÁCIÓK ---

  const bottleTranslateX = masterAnim.interpolate({
    inputRange: [0, 10, 90, 100],
    outputRange: [200, 100, 100, 200],
  });

  const bottleTranslateY = masterAnim.interpolate({
    inputRange: [0, 10, 90, 100],
    outputRange: [-100, -160, -160, -100],
  });

  const bottleRotate = masterAnim.interpolate({
    inputRange: [0, 10, 40, 60, 90, 100],
    outputRange: ["0deg", "0deg", "-105deg", "-105deg", "0deg", "0deg"],
  });

  const streamHeight = masterAnim.interpolate({
    inputRange: [40, 45, 60, 65],
    outputRange: [0, 250, 250, 0], // Picit rövidebb a sugár, mert már van benne pia
  });

  const streamOpacity = masterAnim.interpolate({
    inputRange: [40, 42, 63, 65],
    outputRange: [0, 1, 1, 0],
  });

  // A LÉNYEG: A maszk már 140-ről indul (alaplé), és 180-ra töltjük (tele)
  const currentFillHeight = masterAnim.interpolate({
    inputRange: [0, 42, 65, 100],
    outputRange: [140, 140, 180, 180], 
  });

  return (
    <View style={styles.container}>
      <View style={styles.scene}>
        <View style={styles.glassWrapper}>
          
          <Animated.View
            style={[
              styles.liquidMaskContainer,
              { height: currentFillHeight }, 
            ]}
          >
            <View
              style={[
                styles.liquidTrapézShape,
                { borderTopColor: liquidColor },
              ]}
            />
          </Animated.View>
          
          {hasIce && (
            <View style={styles.iceLayer}>
              <View style={[styles.staticIce, { top: 20, left: -20, transform: [{ rotate: "15deg" }] }]}>
                <IceCube size={70} />
              </View>
              <View style={[styles.staticIce, { top: 10, left: 41, transform: [{ rotate: "-15deg" }] }]}>
                <IceCube size={78} />
              </View>
              <View style={[styles.staticIce, { top: -30, left: 11, transform: [{ rotate: "60deg" }] }]}>
                <IceCube size={58} />
              </View>
              <View style={[styles.staticIce, { top: -82, left: -38, transform: [{ rotate: "-130deg" }] }]}>
                <IceCube size={80} />
              </View>
              <View style={[styles.staticIce, { top: -45, left: 68, transform: [{ rotate: "110deg" }] }]}>
                <IceCube size={60} />
              </View>
            </View>
          )}

          <View style={styles.glassIconContainer}>
            <RegularGlass color={theme.colors.primary} size={280} />
          </View>
        </View>

        <Animated.View
          style={[
            styles.stream,
            {
              backgroundColor: "rgba(200, 240, 255, 0.7)", // Szódavíz színe (áttetsző fehéres-kék)
              height: streamHeight,
              opacity: streamOpacity,
            },
          ]}
        />

        <Animated.View
          style={[
            styles.bottleAssembly,
            {
              transform: [
                { translateX: bottleTranslateX },
                { translateY: bottleTranslateY },
                { rotate: bottleRotate },
              ],
            },
          ]}
        >
          <SodaBottle />
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  scene: {
    width: 300,
    height: 400,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 20,
    position: "relative",
  },

  // --- Pohár ---
  glassWrapper: {
    width: 280,
    height: 280,
    alignItems: "center",
    justifyContent: "flex-end",
    position: "relative",
    zIndex: 1,
  },
  glassIconContainer: {
    zIndex: 10,
    top: -40,
  },
  liquidMaskContainer: {
    position: "absolute",
    bottom: 45,
    width: 240,
    alignItems: "center",
    justifyContent: "flex-end",
    zIndex: 4,
    overflow: "hidden",
    marginBottom: 10,
    opacity: 0.9,
  },
  liquidTrapézShape: {
    width: 210,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderTopWidth: 180,
    borderLeftWidth: 40,
    borderRightWidth: 40,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
  },
  iceLayer: {
    position: "absolute",
    bottom: 40,
    width: 100,
    height: 100,
    alignItems: "center",
    zIndex: 3,
  },
  staticIce: {
    position: "absolute",
  },
  
  // --- Sugár (Szóda) ---
  stream: {
    width: 5,
    position: "absolute",
    top: 55, // Eredeti hely, ahogy kérted
    left: 168, // Eredeti hely, ahogy kérted
    zIndex: 0,
    borderRadius: 3,
  },

  // --- Üveg Assembly ---
  bottleAssembly: {
    position: "absolute",
    top: 0,
    zIndex: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  // --- SZÓDÁSÜVEG STÍLUSAI ---
  bottleContainer: {
    alignItems: "center",
  },
  bottleNeck: {
    width: 16,
    height: 60,
    backgroundColor: "#065f46", // Sötétzöld üveg nyak
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    borderBottomWidth: 0,
  },
  bottleBody: {
    width: 60,
    height: 160,
    backgroundColor: "#047857", // Sötétzöld üveg test
    borderRadius: 12,
    marginTop: -5,
    alignItems: "center",
    justifyContent: "center",
    borderRightWidth: 4,
    borderRightColor: "rgba(0,0,0,0.1)",
  },
  bottleLabel: {
    width: 60,
    height: 50,
    backgroundColor: "#f8fafc",
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: "#cbd5e1",
  }
});