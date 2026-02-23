import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated, Easing } from "react-native";
import { theme } from "../../../core/theme";
import { RegularGlass } from "../assets/glasses/RegularGlass";
import { IceCube } from "../assets/ingredients/IceCube";

export const Action15Animation = ({ 
  hasRim = false,       // Alapértelmezetten nincs kruszta
  rimColor = "white"    // Alapértelmezett szín (cukor/só)
}) => {
  const anim1 = useRef(new Animated.Value(0)).current;
  const anim2 = useRef(new Animated.Value(0)).current;
  const anim3 = useRef(new Animated.Value(0)).current;
  const anim4 = useRef(new Animated.Value(0)).current;
  const anim5 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const createDropAnim = (animValue) => {
      return Animated.timing(animValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
        easing: Easing.bounce,
      });
    };

    const loopAnimation = () => {
      anim1.setValue(0);
      anim2.setValue(0);
      anim3.setValue(0);
      anim4.setValue(0);
      anim5.setValue(0);

      Animated.sequence([
        Animated.stagger(100, [
          createDropAnim(anim1),
          createDropAnim(anim2),
          createDropAnim(anim3),
          createDropAnim(anim4),
          createDropAnim(anim5),
        ]),
        Animated.delay(2000),
      ]).start(({ finished }) => {
        if (finished) {
          loopAnimation();
        }
      });
    };

    loopAnimation();

    return () => {};
  }, []);

  const translateY1 = anim1.interpolate({
    inputRange: [0, 1],
    outputRange: [-400, 210],
  });
  const rotate1 = "15deg";

  const translateY2 = anim2.interpolate({
    inputRange: [0, 1],
    outputRange: [-400, 200],
  });
  const rotate2 = "-15deg";

  const translateY3 = anim3.interpolate({
    inputRange: [0, 1],
    outputRange: [-400, 160],
  });
  const rotate3 = "60deg";

  const translateY4 = anim4.interpolate({
    inputRange: [0, 1],
    outputRange: [-400, 108],
  });
  const rotate4 = "-130deg";

  const translateY5 = anim5.interpolate({
    inputRange: [0, 1],
    outputRange: [-400, 145],
  });
  const rotate5 = "110deg";

  return (
    <View style={styles.container}>
      <View style={styles.scene}>
        <View style={styles.glassContainer}>
          <RegularGlass color={theme.colors.primary} size={280} />
          
          {/* KRUSZTA (RIM) LOGIKA */}
          {hasRim && (
            <View 
              style={[
                styles.crusta, 
                { borderColor: rimColor } 
              ]} 
            />
          )}
        </View>

        <Animated.View
          style={[
            styles.cubeContainer,
            {
              transform: [
                { translateX: -35 },
                { translateY: translateY1 },
                { rotate: rotate1 },
              ],
            },
          ]}
        >
          <IceCube size={70} />
        </Animated.View>

        <Animated.View
          style={[
            styles.cubeContainer,
            {
              transform: [
                { translateX: 30 },
                { translateY: translateY2 },
                { rotate: rotate2 },
              ],
            },
          ]}
        >
          <IceCube size={78} />
        </Animated.View>

        <Animated.View
          style={[
            styles.cubeContainer,
            {
              transform: [
                { translateX: -10 },
                { translateY: translateY3 },
                { rotate: rotate3 },
              ],
            },
          ]}
        >
          <IceCube size={58} />
        </Animated.View>

        <Animated.View
          style={[
            styles.cubeContainer,
            {
              transform: [
                { translateX: -48 },
                { translateY: translateY4 },
                { rotate: rotate4 },
              ],
            },
          ]}
        >
          <IceCube size={80} />
        </Animated.View>

        <Animated.View
          style={[
            styles.cubeContainer,
            {
              transform: [
                { translateX: 48 },
                { translateY: translateY5 },
                { rotate: rotate5 },
              ],
            },
          ]}
        >
          <IceCube size={60} />
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
    width: 280,
    height: 300,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  glassContainer: {
    position: "absolute",
    zIndex: 10,
    alignItems: 'center', // Hogy a kruszta középre kerüljön
  },
  cubeContainer: {
    position: "absolute",
    top: 0,
    zIndex: 1,
  },
  // A kruszta stílusa
  crusta: {
    position: 'absolute',
    top: 0, // A pohár tetejére igazítva
    width: 240, // A RegularGlass szájának szélessége kb. (a 280-as mérethez igazítva)
    height: 30, // Ovális magassága
    borderRadius: 15, // Ovális ív
    borderWidth: 4, // A kruszta vastagsága
    backgroundColor: 'transparent',
    zIndex: 20, // A pohár fölé
  }
});