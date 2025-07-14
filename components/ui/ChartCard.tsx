import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ChartCardProps {
  title: string;
  description: string;
  icon?: keyof typeof Ionicons.glyphMap;
  placeholderText?: string;
  placeholderSubtext?: string;
  children?: React.ReactNode;
}

export default function ChartCard({ 
  title, 
  description, 
  icon = 'bar-chart-outline',
  placeholderText = "Chart Coming Soon",
  placeholderSubtext = "Interactive charts and analytics",
  children
}: ChartCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <View style={styles.content}>
        {children ? (
          children
        ) : (
          <View style={styles.placeholder}>
            <View style={styles.iconContainer}>
              <Ionicons name={icon} size={32} color="#22d3ee" />
            </View>
            <Text style={styles.placeholderText}>{placeholderText}</Text>
            <Text style={styles.placeholderSubtext}>{placeholderSubtext}</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    overflow: 'hidden',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    color: '#9ca3af',
  },
  content: {
    padding: 16,
  },
  placeholder: {
    height: 200,
    backgroundColor: 'rgba(34, 211, 238, 0.1)',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    width: 64,
    height: 64,
    backgroundColor: 'rgba(34, 211, 238, 0.2)',
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  placeholderText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    marginBottom: 8,
  },
  placeholderSubtext: {
    fontSize: 12,
    color: '#9ca3af',
    textAlign: 'center',
  },
});