import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
import { BostonShaker } from '../assets/tools/BostonShaker';

export const Action17Animation = ({ amount = 5 }) => {
  const tiltAnim = useRef(new Animated.Value(0)).current;
  const shakeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const shakeTimeSeconds = (amount && amount > 0 ? amount : 5);
    const oneShakeDuration = 160; 
    const iterations = Math.ceil((shakeTimeSeconds * 1000) / oneShakeDuration);

    const animationSequence = Animated.loop(
        Animated.sequence([
            Animated.timing(tiltAnim, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
                easing: Easing.inOut(Easing.quad)
            }),
            Animated.loop(
                Animated.sequence([
                    Animated.timing(shakeAnim, {
                        toValue: 1,
                        duration: oneShakeDuration / 2,
                        useNativeDriver: true,
                        easing: Easing.inOut(Easing.sin)
                    }),
                    Animated.timing(shakeAnim, {
                        toValue: -1,
                        duration: oneShakeDuration / 2,
                        useNativeDriver: true,
                        easing: Easing.inOut(Easing.sin)
                    })
                ]),
                { iterations: iterations }
            ),
            Animated.parallel([
                Animated.timing(shakeAnim, { toValue: 0, duration: 200, useNativeDriver: true }),
                Animated.timing(tiltAnim, { toValue: 0, duration: 500, useNativeDriver: true })
            ]),
            Animated.delay(1500)
        ])
    );

    animationSequence.start();

    return () => animationSequence.stop();
  }, [amount]);

  const rotate = tiltAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '30deg']
  });

  const shakeRange = 40;
  
  const translateX = shakeAnim.interpolate({
      inputRange: [-1, 1],
      outputRange: [-shakeRange * 0.5, shakeRange * 0.5] 
  });

  const translateY = shakeAnim.interpolate({
      inputRange: [-1, 1],
      outputRange: [shakeRange * 0.866, -shakeRange * 0.866] 
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[
          styles.shakerAssembly,
          {
              transform: [
                  { translateX },
                  { translateY },
                  { rotate }
              ]
          }
      ]}>
        <View style={styles.topShakerWrapper}>
             <BostonShaker size={250} />
        </View>

        <View style={styles.bottomShakerWrapper}>
            <BostonShaker size={300} />
        </View>
      </Animated.View>
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
  shakerAssembly: {
    width: 300,
    height: 400,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginTop: 50, 
  },
  bottomShakerWrapper: {
    position: 'absolute',
    bottom: 0,
    zIndex: 2, 
  },
  topShakerWrapper: {
    position: 'absolute',
    bottom: 180,
    left: 40,
    zIndex: 1,
    transform: [
        { rotate: '195deg' }
    ]
  }
});