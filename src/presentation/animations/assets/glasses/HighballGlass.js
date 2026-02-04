import React from 'react';
import Svg, { Path } from 'react-native-svg';

export const HighballGlass = ({ color = "#333", size = 100 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M5 3H19L18 21H6L5 3Z"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);