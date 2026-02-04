import React from 'react';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';

export const RegularGlass = ({ color = "#333", size = 150 }) => (
  <Svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <Defs>
      <LinearGradient id="glassGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <Stop offset="0%" stopColor={color} stopOpacity="0.05" />
        <Stop offset="50%" stopColor={color} stopOpacity="0.02" />
        <Stop offset="100%" stopColor={color} stopOpacity="0.08" />
      </LinearGradient>
    </Defs>

    <Path
      d="M 10 10 L 25 90 Q 25 95, 30 95 L 70 95 Q 75 95, 75 90 L 90 10 Z"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="url(#glassGradient)"
    />

    <Path d="M 30 95 L 20 40" stroke={color} strokeWidth="1.5" opacity="0.4" />
    <Path d="M 45 95 L 40 35" stroke={color} strokeWidth="1.5" opacity="0.3" />
    <Path d="M 55 95 L 60 35" stroke={color} strokeWidth="1.5" opacity="0.3" />
    <Path d="M 70 95 L 80 40" stroke={color} strokeWidth="1.5" opacity="0.4" />
  </Svg>
);