import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions, Animated, Easing } from 'react-native';
import { theme } from '../../../core/theme';

import { MargaritaGlass } from '../assets/glasses/MargaritaGlass';
import { MartiniGlass } from '../assets/glasses/MartiniGlass';
import { HighballGlass } from '../assets/glasses/HighballGlass';

const { width } = Dimensions.get('window');

const getGlassComponent = (glassType) => {
  const standardizedType = glassType?.toLowerCase() || '';
  switch (standardizedType) {
    case 'margarita':
    case 'margarita glass':
      return <MargaritaGlass color={theme.colors.primary} size={150} />;
    case 'martini':
    case 'martini glass':
    case 'cocktail glass':
      return <MartiniGlass color={theme.colors.primary} size={150} />;
    case 'highball':
    case 'collins':
      return <HighballGlass color={theme.colors.primary} size={150} />;
    default:
      return <HighballGlass color={theme.colors.textSecondary} size={150} />;
  }
};

export const Action11Animation = ({ glassType }) => {
  const translateX = useRef(new Animated.Value(-width)).current;

  useEffect(() => {
    Animated.spring(translateX, {
      toValue: 0,
      useNativeDriver: true,
      bounciness: 12,
      speed: 6,
      delay: 300
    }).start();
  }, []);

  const GlassSvg = getGlassComponent(glassType);

  return (
    <View style={styles.container}>
      <Animated.View 
        style={[
          styles.glassContainer, 
          { transform: [{ translateX }] }
        ]}
      >
        {GlassSvg}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  glassContainer: {
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 5,
  }
});