import React from 'react';
import { Ionicons } from '@expo/vector-icons';

interface MoneyIconProps {
  size?: number;
  color?: string;
}

export default function MoneyIcon({ size = 32, color = '#22d3ee' }: MoneyIconProps) {
  return <Ionicons name="cash-outline" size={size} color={color} />;
}