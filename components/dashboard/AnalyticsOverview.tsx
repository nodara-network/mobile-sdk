import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

export default function AnalyticsOverview() {
  const handleViewAll = () => {
    router.push('/(tabs)/analytics');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.title}>Network Analytics</Text>
          <TouchableOpacity onPress={handleViewAll}>
            <Text style={styles.viewAllText}>View All →</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.subtitle}>Comprehensive insights and performance metrics</Text>
      </View>
      
      <View style={styles.content}>
        {/* Metrics Grid */}
        <View style={styles.metricsGrid}>
          {[
            { label: "Total Compute Hours", value: "1,247", trend: "+12.5%" },
            { label: "Active Devices", value: "1,923", trend: "+8.2%" },
            { label: "Revenue Generated", value: "₿2,847", trend: "+15.3%" },
            { label: "Avg Response", value: "12ms", trend: "-5.1%" },
          ].map((metric, index) => (
            <View key={index} style={styles.metricCard}>
              <View style={styles.skeletonLine1} />
              <View style={styles.skeletonLine2} />
              <View style={styles.skeletonLine3} />
            </View>
          ))}
        </View>
        
        {/* Chart Preview */}
        <View style={styles.chartPreview}>
          <View style={styles.chartIcon}>
            <Ionicons name="bar-chart-outline" size={16} color="#22d3ee" />
          </View>
          <Text style={styles.chartTitle}>Analytics Dashboard</Text>
          <Text style={styles.chartSubtitle}>Performance metrics</Text>
        </View>
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
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  viewAllText: {
    fontSize: 14,
    color: '#22d3ee',
    fontWeight: '500',
  },
  subtitle: {
    fontSize: 12,
    color: '#9ca3af',
  },
  content: {
    padding: 16,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  metricCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    padding: 12,
    width: (width - 80) / 2,
    marginBottom: 8,
  },
  skeletonLine1: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 4,
    marginBottom: 4,
  },
  skeletonLine2: {
    height: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 6,
    width: 60,
    marginBottom: 4,
  },
  skeletonLine3: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 4,
    width: 40,
  },
  chartPreview: {
    height: 100,
    backgroundColor: 'rgba(34, 211, 238, 0.1)',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chartIcon: {
    width: 32,
    height: 32,
    backgroundColor: 'rgba(34, 211, 238, 0.2)',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  chartTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: 'white',
    marginBottom: 2,
  },
  chartSubtitle: {
    fontSize: 10,
    color: '#9ca3af',
  },
});