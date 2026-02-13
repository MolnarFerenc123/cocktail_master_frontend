import React from 'react';
import Svg, { Path, G } from 'react-native-svg';

export const LimeSlice = ({ size = 50, variant = 'lime' }) => {
  const isLemon = variant && variant.toLowerCase().includes('lemon');

  const colors = isLemon ? {
    rindFill: "#facc15",
    rindStroke: "#ca8a04",
    pulpFill: "#fef08a",
    segmentStroke: "#fefce8"
  } : {
    rindFill: "#65a30d",
    rindStroke: "#4d7c0f",  
    pulpFill: "#bef264",
    segmentStroke: "#ecfccb" 
  };

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <Path
        d="M 10 50 A 40 40 0 0 1 90 50 Z"
        fill={colors.rindFill} 
        stroke={colors.rindStroke}
        strokeWidth="2"
      />
      <Path
        d="M 15 50 A 35 35 0 0 1 85 50 Z"
        fill={colors.pulpFill}
      />
      <G stroke={colors.segmentStroke} strokeWidth="2">
          <Path d="M 50 50 L 50 15" />
          <Path d="M 50 50 L 25 25" />
          <Path d="M 50 50 L 75 25" />
          <Path d="M 50 50 L 15 50" />
          <Path d="M 50 50 L 85 50" />
      </G>
    </Svg>
  );
};