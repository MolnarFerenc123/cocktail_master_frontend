import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions, Animated, Text } from 'react-native';
import { theme } from '../../../core/theme';
import { RegularGlass } from '../assets/glasses/RegularGlass';

const { width } = Dimensions.get('window');

export const Action11Animation = ({ glassType, onComplete }) => {
  const translateX = useRef(new Animated.Value(width)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.spring(translateX, {
      toValue: 0,
      useNativeDriver: true,
      bounciness: 8,
      speed: 10,
    }).start(({ finished }) => {
      if (finished) {
        setTimeout(() => {
           if (onComplete) onComplete();
        }, 1500);
      }
    });
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
            size={300}
        />
        
        <Text style={styles.label}>{glassType || "Glass"}</Text>
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
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  label: {
    marginTop: 30,
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text,
    textTransform: 'capitalize',
    letterSpacing: 1
  }
});