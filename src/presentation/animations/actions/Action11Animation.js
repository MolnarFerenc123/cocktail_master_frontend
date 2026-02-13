import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions, Animated } from 'react-native';
import { theme } from '../../../core/theme';
import { RegularGlass } from '../assets/glasses/RegularGlass';

const { width } = Dimensions.get('window');

export const Action11Animation = ({ glassType }) => {
  const translateX = useRef(new Animated.Value(width)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.spring(translateX, {
      toValue: 0,
      useNativeDriver: true,
      bounciness: 6,
      speed: 9,
    }).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View 
        style={[
          styles.glassContainer, 
          { transform: [{ translateX }], opacity }
        ]}
      >
        <RegularGlass 
            color={theme.colors.primary} 
            size={280} 
        />
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
  glassContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 8,
  }
});