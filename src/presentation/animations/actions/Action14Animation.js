import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
import { BostonShaker } from '../assets/tools/BostonShaker';
import { IceCube } from '../assets/ingredients/IceCube';

export const Action14Animation = () => {
  const cube1 = useRef(new Animated.Value(0)).current;
  const cube2 = useRef(new Animated.Value(0)).current;
  const cube3 = useRef(new Animated.Value(0)).current;

  const createDropAnimation = (animValue, delay) => {
    return Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(animValue, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
          easing: Easing.in(Easing.quad),
        }),
        Animated.timing(animValue, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        })
      ])
    );
  };

  useEffect(() => {
    const anim1 = createDropAnimation(cube1, 0);
    const anim2 = createDropAnimation(cube2, 200);
    const anim3 = createDropAnimation(cube3, 400);

    anim1.start();
    anim2.start();
    anim3.start();
  }, []);

  const getCubeStyle = (animValue, xOffset, rotateDeg) => {
    const translateY = animValue.interpolate({
      inputRange: [0, 1],
      outputRange: [-800, 100]
    });

    return {
      transform: [
        { translateX: xOffset },
        { translateY },
        { rotate: rotateDeg }
      ],
    };
  };

  return (
    <View style={styles.container}>
      <View style={styles.scene}>
        <View style={styles.shakerContainer}>
          <BostonShaker size={300} />
        </View>
        <Animated.View style={[styles.cubeContainer, getCubeStyle(cube1, -15, '15deg')]}>
          <IceCube size={60} />
        </Animated.View>
        
        <Animated.View style={[styles.cubeContainer, getCubeStyle(cube2, 10, '-10deg')]}>
          <IceCube size={65} />
        </Animated.View>

        <Animated.View style={[styles.cubeContainer, getCubeStyle(cube3, -5, '45deg')]}>
          <IceCube size={58} />
        </Animated.View>
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
    width: 200,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  shakerContainer: {
    position: 'absolute',
    bottom: 20,
    zIndex: 1,
  },
  cubeContainer: {
    position: 'absolute',
    top: 50,
    zIndex: 0,
  }
});