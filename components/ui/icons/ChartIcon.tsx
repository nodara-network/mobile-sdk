import React from 'react';
import { Ionicons } from '@expo/vector-icons';

interface ChartIconProps {
  size?: number;
  color?: string;
}

export default function ChartIcon({ size = 32, color = '#22d3ee' }: ChartIconProps) {
  return <Ionicons name="bar-chart-outline" size={size} color={color} />;
}