import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated, Easing, Dimensions } from "react-native";
import { theme } from "../../../core/theme";
import { RegularGlass } from "../assets/glasses/RegularGlass";
import { IceCube } from "../assets/ingredients/IceCube";
import { CitrusWedge } from "../assets/ingredients/CitrusWedge";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export const Action27Animation = ({
  ingredient = "water",
  amount = 30,
  unit = "ml",
  pourColor = "rgba(255, 255, 255, 0.6)",
  initialLiquidColor = "transparent",
  finalLiquidColor = "#f59e0b",
  initialFillLevel = 0,
  finalFillLevel = 40,
  hasIce = false,
  hasRim = false,
  rimColor = "white",
  muddledFruit = null,
}) => {
  const streamAnim = useRef(new Animated.Value(0)).current;
  const fillAnim = useRef(new Animated.Value(0)).current;

  const safeAmount = amount === null || amount === undefined ? 30 : amount;

  const calculateDuration = () => {
    let multiplier = 1;
    const safeUnit = unit || "ml";

    switch (safeUnit.toLowerCase()) {
      case "cl":
        multiplier = 10;
        break;
      case "dl":
        multiplier = 100;
        break;
      case "oz":
        multiplier = 29.57;
        break;
    }
    const ml = parseFloat(safeAmount) * multiplier;
    if (isNaN(ml) || ml <= 0) return 3;
    return ml / 10;
  };

  useEffect(() => {
    const pourDurationSeconds = calculateDuration() - 0.5;
    const pourDurationMs = Math.max(pourDurationSeconds * 1000, 500);

    const dropInDuration = 300;
    const fallOutDuration = 300;
    const pauseMs = 500;

    const animation = Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(streamAnim, {
            toValue: 0,
            duration: 0,
            useNativeDriver: false,
          }),
          Animated.timing(fillAnim, {
            toValue: 0,
            duration: 0,
            useNativeDriver: false,
          }),
        ]),

        Animated.timing(streamAnim, {
          toValue: 1,
          duration: dropInDuration,
          useNativeDriver: false,
          easing: Easing.in(Easing.quad),
        }),

        Animated.parallel([
          Animated.timing(fillAnim, {
            toValue: 1,
            duration: pourDurationMs,
            useNativeDriver: false,
          }),
          Animated.sequence([
            Animated.delay(pourDurationMs),
            Animated.timing(streamAnim, {
              toValue: 2,
              duration: fallOutDuration,
              useNativeDriver: false,
              easing: Easing.in(Easing.quad),
            }),
          ]),
        ]),

        Animated.delay(pauseMs),
      ])
    );

    animation.start();

    return () => animation.stop();
  }, [safeAmount, unit]);

  const totalStreamLength = SCREEN_HEIGHT / 2 + 300;

  const streamHeight = streamAnim.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [0, totalStreamLength, 0],
  });

  const topStart = -SCREEN_HEIGHT / 2;
  const topEnd = 200;

  const streamTop = streamAnim.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [topStart, topStart, topEnd],
  });

  const currentFillHeight = fillAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [initialFillLevel, finalFillLevel],
  });

  const animStartColor = initialLiquidColor === "transparent" ? "rgba(255, 255, 255, 0)" : initialLiquidColor;
  
  const animatedLiquidColor = fillAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [animStartColor, finalLiquidColor],
  });

  return (
    <View style={styles.container}>
      <View style={styles.scene}>
        <View style={styles.glassWrapper}>
          <Animated.View
            style={[styles.liquidMaskContainer, { height: currentFillHeight }]}
          >
            <Animated.View
              style={[
                styles.liquidTrapézShape,
                { borderTopColor: animatedLiquidColor },
              ]}
            />
          </Animated.View>

          {muddledFruit && (
            <View style={styles.muddledFruitContainer}>
              <Animated.View
                style={[
                  styles.fruitWrapper,
                  { transform: [ { rotate: "-20deg" }] },
                ]}
              >
                <CitrusWedge size={90} variant={muddledFruit} />
              </Animated.View>
              <Animated.View
                style={[
                  styles.fruitWrapper,
                  { transform: [{ rotate: "15deg" }] },
                ]}
              >
                <CitrusWedge size={90} variant={muddledFruit} />
              </Animated.View>
            </View>
          )}

          {hasIce && (
            <View style={styles.iceLayer}>
              <View
                style={[
                  styles.staticIce,
                  { top: 20, left: -20, transform: [{ rotate: "15deg" }] },
                ]}
              >
                <IceCube size={70} />
              </View>
              <View
                style={[
                  styles.staticIce,
                  { top: 10, left: 41, transform: [{ rotate: "-15deg" }] },
                ]}
              >
                <IceCube size={78} />
              </View>
              <View
                style={[
                  styles.staticIce,
                  { top: -30, left: 11, transform: [{ rotate: "60deg" }] },
                ]}
              >
                <IceCube size={58} />
              </View>
              <View
                style={[
                  styles.staticIce,
                  { top: -82, left: -38, transform: [{ rotate: "-130deg" }] },
                ]}
              >
                <IceCube size={80} />
              </View>
              <View
                style={[
                  styles.staticIce,
                  { top: -45, left: 68, transform: [{ rotate: "110deg" }] },
                ]}
              >
                <IceCube size={60} />
              </View>
            </View>
          )}

          <View style={styles.glassIconContainer}>
            <RegularGlass color={theme.colors.primary} size={280} />
            {hasRim && (
              <View style={[styles.crusta, { borderColor: rimColor }]} />
            )}
          </View>
        </View>

        <Animated.View
          style={[
            styles.stream,
            {
              backgroundColor: pourColor,
              height: streamHeight,
              top: streamTop,
            },
          ]}
        />
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
    alignItems: "center",
  },
  crusta: {
    position: "absolute",
    top: 20,
    width: 230,
    height: 1,
    borderRadius: 15,
    borderWidth: 4,
    backgroundColor: "transparent",
    zIndex: 20,
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
  muddledFruitContainer: {
    position: "absolute",
    bottom: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    width: 120,
    height: 60,
    zIndex: 2,
  },
  fruitWrapper: {
    marginHorizontal: -20,
    marginBottom: -20,
  },
  iceLayer: {
    position: "absolute",
    bottom: 40,
    width: 100,
    height: 100,
    alignItems: "center",
    zIndex: 1,
  },
  staticIce: {
    position: "absolute",
  },
  stream: {
    width: 14,
    borderRadius: 7,
    position: "absolute",
    left: 143,
    zIndex: 0,
  },
});