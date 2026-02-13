import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
import { theme } from '../../../core/theme';
import { RegularGlass } from '../assets/glasses/RegularGlass';
import { RimPlate } from '../assets/tools/RimPlate';

export const Action13Animation = ({ ingredient = 'salt' }) => {
  const moveAnim = useRef(new Animated.Value(0)).current;
  const twistAnim = useRef(new Animated.Value(0)).current;

  const getRimColor = (ing) => {
    const safeIng = ing ? ing.toLowerCase() : 'salt';
    
    switch (safeIng) {
      case 'sugar':
      case 'brown sugar':
        return '#fef3c7';
      case 'tajin':
      case 'chili salt':
        return '#ef4444';
      case 'cocoa powder':
      case 'cocoa':
        return '#78350f';
      case 'salt':
      default:
        return '#ffffff';
    }
  };

  const rimColor = getRimColor(ingredient);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(moveAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
          easing: Easing.out(Easing.quad),
        }),
        Animated.sequence([
          Animated.timing(twistAnim, { toValue: 1, duration: 150, useNativeDriver: true }),
          Animated.timing(twistAnim, { toValue: -1, duration: 150, useNativeDriver: true }),
          Animated.timing(twistAnim, { toValue: 1, duration: 150, useNativeDriver: true }),
          Animated.timing(twistAnim, { toValue: 0, duration: 150, useNativeDriver: true }),
        ]),
        Animated.delay(200),
        Animated.timing(moveAnim, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
          easing: Easing.in(Easing.quad),
        }),
        Animated.delay(500),
      ])
    ).start();
  }, []);

  const glassSize = 200;

  const translateY = moveAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-50, 20]
  });

  const rotateZ = twistAnim.interpolate({
    inputRange: [-1, 1],
    outputRange: ['160deg', '200deg']
  });

  const combinedRotate = twistAnim.interpolate({
      inputRange: [-1, 0, 1],
      outputRange: ['165deg', '180deg', '195deg'] 
  });

  return (
    <View style={styles.container}>
      <View style={styles.scene}>
        <Animated.View
          style={[
            styles.glassContainer,
            {
              transform: [
                { translateY },
                { rotate: combinedRotate } 
              ]
            }
          ]}
        >
          <RegularGlass color={theme.colors.primary} size={glassSize} />
        </Animated.View>

        <View style={styles.plateContainer}>
          <RimPlate size={220} color={rimColor} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  scene: {
    width: 300,
    height: 350,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 20,
  },
  glassContainer: {
    zIndex: 2,
    marginBottom: -40,
  },
  plateContainer: {
    zIndex: 1,
  }
});