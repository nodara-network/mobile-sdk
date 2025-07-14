import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

interface MetricCardProps {
  label: string;
  value: string;
  trend?: string;
  isLoading?: boolean;
}

export default function MetricCard({ 
  label, 
  value, 
  trend, 
  isLoading = false 
}: MetricCardProps) {
  return (
    <View style={styles.container}>
      {isLoading ? (
        <>
          <View style={styles.skeletonLine1} />
          <View style={styles.skeletonLine2} />
          <View style={styles.skeletonLine3} />
        </>
      ) : (
        <>
          <Text style={styles.label}>{label}</Text>
          <Text style={styles.value}>{value}</Text>
          {trend && (
            <Text style={[
              styles.trend,
              trend.startsWith('+') ? styles.trendPositive : styles.trendNegative
            ]}>
              {trend}
            </Text>
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    width: (width - 64) / 2,
    alignItems: 'center',
  },
  label: {
    fontSize: 12,
    color: '#9ca3af',
    marginBottom: 8,
    textAlign: 'center',
  },
  value: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#22d3ee',
    marginBottom: 4,
    textAlign: 'center',
  },
  trend: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
  trendPositive: {
    color: '#10b981',
  },
  trendNegative: {
    color: '#ef4444',
  },
  skeletonLine1: {
    height: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 6,
    marginBottom: 8,
    width: '80%',
  },
  skeletonLine2: {
    height: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    marginBottom: 8,
    width: '60%',
  },
  skeletonLine3: {
    height: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 6,
    width: '40%',
  },
});