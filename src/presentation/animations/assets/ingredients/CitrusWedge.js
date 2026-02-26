import React from "react";
import Svg, { Path, G } from "react-native-svg";

export const CitrusWedge = ({ size = 50, variant = "lime" }) => {
  const type = variant ? variant.toLowerCase() : "lime";

  let colors = {
    rindFill: "#65a30d",
    rindStroke: "#4d7c0f",
    pulpFill: "#bef264",
    segmentStroke: "#ecfccb",
  };

  if (type.includes("lemon")) {
    colors = {
      rindFill: "#facc15",
      rindStroke: "#ca8a04",
      pulpFill: "#fef08a",
      segmentStroke: "#fefce8",
    };
  } else if (type.includes("orange")) {
    colors = {
      rindFill: "#ea580c",
      rindStroke: "#c2410c",
      pulpFill: "#fb923c",
      segmentStroke: "#ffedd5",
    };
  }

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <Path
        d="M 10 50 A 40 40 0 0 1 90 50 Z"
        fill={colors.rindFill}
        stroke={colors.rindStroke}
        strokeWidth="2"
      />
      <Path d="M 15 50 A 35 35 0 0 1 85 50 Z" fill={colors.pulpFill} />
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
