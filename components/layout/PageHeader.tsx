import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

interface PageHeaderProps {
  title: string;
  description: string;
  subtitle?: string;
}

export default function PageHeader({ title, description, subtitle }: PageHeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      {subtitle && (
        <Text style={styles.subtitle}>{subtitle}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#9ca3af',
    lineHeight: 24,
  },
  subtitle: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 8,
  },
});