import React from 'react';
import { Ionicons } from '@expo/vector-icons';

interface LocationIconProps {
  size?: number;
  color?: string;
}

export default function LocationIcon({ size = 32, color = '#22d3ee' }: LocationIconProps) {
  return <Ionicons name="location-outline" size={size} color={color} />;
}