import React from 'react';
import Svg, { Rect, Path, Defs, LinearGradient, Stop } from 'react-native-svg';

export const IceCube = ({ size = 40 }) => (
  <Svg width={size} height={size} viewBox="0 0 50 50" fill="none">
    <Defs>
      <LinearGradient id="iceGradient" x1="0" y1="0" x2="1" y2="1">
        <Stop offset="0" stopColor="#e0f2fe" stopOpacity="0.9" />
        <Stop offset="1" stopColor="#bae6fd" stopOpacity="0.8" />
      </LinearGradient>
    </Defs>
    <Rect x="5" y="5" width="40" height="40" rx="4" fill="url(#iceGradient)" stroke="#7dd3fc" strokeWidth="1" />
    <Path d="M 10 10 L 20 20" stroke="#fff" strokeWidth="1.5" opacity="0.6" />
    <Path d="M 35 15 L 40 10" stroke="#fff" strokeWidth="1.5" opacity="0.6" />
    <Path d="M 15 35 L 10 40" stroke="#fff" strokeWidth="1.5" opacity="0.6" />
  </Svg>
);