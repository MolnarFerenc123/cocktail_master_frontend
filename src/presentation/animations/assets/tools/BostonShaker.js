import React from 'react';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';

export const BostonShaker = ({ color = "#555", size = 150 }) => (
  <Svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <Defs>
      <LinearGradient id="metalGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <Stop offset="0%" stopColor="#aaa" />
        <Stop offset="50%" stopColor="#eee" />
        <Stop offset="100%" stopColor="#999" />
      </LinearGradient>
    </Defs>

    <Path
      d="M 20 30 L 30 95 L 70 95 L 80 30 Z"
      stroke={color}
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="url(#metalGradient)"
    />
    <Path
      d="M 35 10 L 42 45 L 65 40 L 65 5 Z"
      stroke={color}
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="url(#metalGradient)"
      opacity="0.9"
      transform="rotate(-8, 50, 50)"
    />
  </Svg>
);