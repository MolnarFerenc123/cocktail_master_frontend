import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated, Easing } from "react-native";
import { theme } from "../../../core/theme";
import { RegularGlass } from "../assets/glasses/RegularGlass";
import { CitrusWedge } from "../assets/ingredients/CitrusWedge";
import { Muddler } from "../assets/tools/Muddler";

export const Action24Animation = ({ ingredient = "orange" }) => {
  const muddleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(muddleAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
          easing: Easing.in(Easing.ease),
        }),
        Animated.timing(muddleAnim, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
          easing: Easing.out(Easing.ease),
        }),
        Animated.delay(200),
      ]),
    );

    loop.start();
    return () => loop.stop();
  }, []);

  const muddlerTranslateY = muddleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-80, 100],
  });

  const fruitScaleY = muddleAnim.interpolate({
    inputRange: [0, 0.8, 1],
    outputRange: [1, 1, 0.6],
  });

  return (
    <View style={styles.container}>
      <View style={styles.scene}>
        <View style={styles.glassWrapper}>
          <View style={styles.glassIconContainer}>
            <RegularGlass color={theme.colors.primary} size={280} />
          </View>

          <View style={styles.ingredientsContainer}>
            <Animated.View
              style={[
                styles.fruitWrapper,
                { transform: [{ scaleY: fruitScaleY }, { rotate: "-20deg" }] },
              ]}
            >
              <CitrusWedge size={90} variant={ingredient} />
            </Animated.View>
            <Animated.View
              style={[
                styles.fruitWrapper,
                { transform: [{ scaleY: fruitScaleY }, { rotate: "15deg" }] },
              ]}
            >
              <CitrusWedge size={90} variant={ingredient} />
            </Animated.View>
          </View>
        </View>

        <Animated.View
          style={[
            styles.muddlerContainer,
            { transform: [{ translateY: muddlerTranslateY }] },
          ]}
        >
          <Muddler size={300} />
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
  ingredientsContainer: {
    position: "absolute",
    bottom: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    width: 120,
    height: 60,
    zIndex: 5,
  },
  fruitWrapper: {
    marginHorizontal: -20,
    marginBottom: -20,
  },
  muddlerContainer: {
    position: "absolute",
    top: -40,
    zIndex: 0,
  },
});
