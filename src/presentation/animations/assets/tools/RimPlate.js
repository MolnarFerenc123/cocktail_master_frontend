import React from 'react';
import Svg, { Ellipse } from 'react-native-svg';

export const RimPlate = ({ size = 200, color = '#ffffff' }) => (
  <Svg width={size} height={size / 2} viewBox="0 0 100 50">
    {/* Plate shadow/base */}
    <Ellipse cx="50" cy="25" rx="48" ry="15" fill="#94a3b8" opacity="0.5" />
    {/* The Pile (Salt/Sugar) */}
    <Ellipse cx="50" cy="24" rx="45" ry="12" fill={color} />
  </Svg>
);