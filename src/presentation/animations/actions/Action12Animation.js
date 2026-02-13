import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
import { theme } from '../../../core/theme';
import { RegularGlass } from '../assets/glasses/RegularGlass';
import { LimeSlice } from '../assets/ingredients/LimeSlice';

export const Action12Animation = ({ ingredient = 'lime' }) => {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(progress, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.sin),
        }),
        Animated.timing(progress, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.sin),
        })
      ])
    ).start();
  }, []);

  const glassSize = 280;
  
  const rimY = glassSize * 0.1;
  const startX = glassSize * 0.1;
  const endX = glassSize * 0.9;
  const travelDistance = endX - startX;

  const translateX = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [-travelDistance / 2, travelDistance / 2]
  });

  const rotate = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['-30deg', '30deg']
  });

  return (
    <View style={styles.container}>
      <View style={styles.scene}>
        <View style={styles.glassContainer}>
            <RegularGlass color={theme.colors.primary} size={glassSize} />
        </View>
        
        <Animated.View 
            style={[
                styles.limeContainer,
                { 
                    top: rimY - 40,
                    transform: [
                        { translateX },
                        { rotate }
                    ] 
                }
            ]}
        >
            <LimeSlice size={100} variant={ingredient} />
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
      position: 'relative',
      width: 280,
      height: 280,
      justifyContent: 'center',
      alignItems: 'center',
  },
  glassContainer: {
    position: 'absolute',
    zIndex: 1,
  },
  limeContainer: {
    position: 'absolute',
    zIndex: 2,
  }
});