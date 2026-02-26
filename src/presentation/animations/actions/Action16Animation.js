import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing, Dimensions } from 'react-native';
import { BostonShaker } from '../assets/tools/BostonShaker';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export const Action16Animation = ({ ingredient = 'water', amount = 30, unit = "ml", pourColor = "rgba(255, 255, 255, 0.6)" }) => {
  const progress = useRef(new Animated.Value(0)).current;

  const safeAmount = (amount === null || amount === undefined) ? 30 : amount;

  const calculateDuration = () => {
    let multiplier = 1;
    const safeUnit = unit || "ml";
    
    switch(safeUnit.toLowerCase()) {
      case "cl": multiplier = 10; break;
      case "dl": multiplier = 100; break;
      case "oz": multiplier = 29.57; break;
    }
    const ml = parseFloat(safeAmount) * multiplier;
    if (isNaN(ml) || ml <= 0) return 3;
    return ml / 10; 
  };

  useEffect(() => {
    const pourDurationSeconds = calculateDuration() - 0.5;
    const pourDurationMs = pourDurationSeconds * 1000;
    
    const dropInDuration = 300; 
    const fallOutDuration = 300; 
    const pauseMs = 500;

    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(progress, { toValue: 0, duration: 0, useNativeDriver: false }),
        
        Animated.timing(progress, {
          toValue: 1, 
          duration: dropInDuration,
          useNativeDriver: false, 
          easing: Easing.in(Easing.quad),
        }),
        
        Animated.delay(pourDurationMs),
        
        Animated.timing(progress, {
          toValue: 2,
          duration: fallOutDuration,
          useNativeDriver: false,
          easing: Easing.in(Easing.quad),
        }),

        Animated.delay(pauseMs)
      ])
    );
    
    animation.start();
    
    return () => animation.stop();
  }, [safeAmount, unit]);
  
  const totalStreamLength = SCREEN_HEIGHT / 2 + 100;

  const height = progress.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [0, totalStreamLength, 0]
  });

  const topStart = -SCREEN_HEIGHT / 2;
  const topEnd = 200; 

  const top = progress.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [topStart, topStart, topEnd]
  });

  return (
    <View style={styles.container}>
      <View style={styles.scene}>
        <View style={styles.shakerContainer}>
          <BostonShaker size={300} />
        </View>

        <View style={styles.liquidLayer}>
            <Animated.View 
                style={[
                    styles.stream, 
                    { 
                        backgroundColor: pourColor,
                        height: height,
                        top: top,
                    }
                ]} 
            />
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
    width: 200,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  shakerContainer: {
    position: 'absolute',
    bottom: 20,
    zIndex: 10,
  },
  liquidLayer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 1,
  },
  stream: {
    width: 14,
    borderRadius: 7,
    position: 'absolute',
  }
});