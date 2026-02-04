import React from 'react';
import Svg, { Path } from 'react-native-svg';

export const RegularGlass = ({ color = "#333", size = 150 }) => (
  <Svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <Path
      d="M 15 10 L 30 90 L 70 90 L 85 10"
      stroke={color}
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </Svg>
);