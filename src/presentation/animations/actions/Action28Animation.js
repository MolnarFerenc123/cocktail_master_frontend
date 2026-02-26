import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated, Easing } from "react-native";
import { theme } from "../../../core/theme";
import { RegularGlass } from "../assets/glasses/RegularGlass";
import { IceCube } from "../assets/ingredients/IceCube";
import { CitrusWedge } from "../assets/ingredients/CitrusWedge";
import { BarSpoon } from "../assets/tools/BarSpoon";

export const Action28Animation = ({
  amount = 10,
  liquidColor = "transparent",
  fillLevel = 0,
  hasIce = false,
  hasRim = false,
  rimColor = "white",
  muddledFruit = null,
}) => {
  const stirAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const safeAmount = amount === null || amount === undefined ? 10 : parseFloat(amount);
    const cycleDuration = 800;
    const totalIterations = Math.max(1, Math.round((safeAmount * 1000) / cycleDuration));

    const sequenceSteps = [];
    
    for (let i = 0; i < totalIterations; i++) {
      sequenceSteps.push(
        Animated.timing(stirAnim, {
          toValue: 1,
          duration: cycleDuration,
          useNativeDriver: true,
          easing: Easing.linear,
        })
      );
      sequenceSteps.push(
        Animated.timing(stirAnim, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        })
      );
    }

    sequenceSteps.push(Animated.delay(2000));

    const animation = Animated.loop(Animated.sequence(sequenceSteps));

    animation.start();

    return () => animation.stop();
  }, [amount]);

  const spoonTranslateX = stirAnim.interpolate({
    inputRange: [0, 0.25, 0.5, 0.75, 1],
    outputRange: [0, 65, 0, -65, 0],
  });

  return (
    <View style={styles.container}>
      <View style={styles.scene}>
        <View style={styles.glassWrapper}>
          <View style={[styles.liquidMaskContainer, { height: fillLevel }]}>
            <View
              style={[
                styles.liquidTrapézShape,
                { borderTopColor: liquidColor },
              ]}
            />
          </View>

          {muddledFruit && (
            <View style={styles.muddledFruitContainer}>
              <View style={[styles.fruitWrapper, { transform: [{ scaleY: 0.6 }, { rotate: "-20deg" }] }]}>
                <CitrusWedge size={90} variant={muddledFruit} />
              </View>
              <View style={[styles.fruitWrapper, { transform: [{ scaleY: 0.6 }, { rotate: "15deg" }] }]}>
                <CitrusWedge size={90} variant={muddledFruit} />
              </View>
            </View>
          )}

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

          <Animated.View
            style={[
              styles.spoonContainer,
              {
                transform: [
                  { translateX: spoonTranslateX }
                ],
              },
            ]}
          >
            <BarSpoon size={350} />
          </Animated.View>

          <View style={styles.glassIconContainer}>
            <RegularGlass color={theme.colors.primary} size={280} />
            {hasRim && (
              <View style={[styles.crusta, { borderColor: rimColor }]} />
            )}
          </View>
        </View>
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
    zIndex: 3,
  },
  staticIce: {
    position: "absolute",
  },
  spoonContainer: {
    position: "absolute",
    top: -80,
    zIndex: 5,
  },
});