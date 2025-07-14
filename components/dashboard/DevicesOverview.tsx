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

export default function DevicesOverview() {
  const handleViewAll = () => {
    router.push('/(tabs)/devices');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.title}>Global Device Network</Text>
          <TouchableOpacity onPress={handleViewAll}>
            <Text style={styles.viewAllText}>View All →</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.subtitle}>Explore the worldwide network of smartphone compute devices</Text>
      </View>
      
      <View style={styles.content}>
        {/* Map Preview */}
        <View style={styles.mapPreview}>
          <View style={styles.mapIcon}>
            <Ionicons name="location-outline" size={24} color="#22d3ee" />
          </View>
          <Text style={styles.mapTitle}>Interactive Map</Text>
          <Text style={styles.mapSubtitle}>Real-time device locations</Text>
        </View>
        
        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          {[
            { label: "Total Devices", value: "2,847" },
            { label: "Online Now", value: "1,923" },
            { label: "Active Regions", value: "156" },
            { label: "Avg Response", value: "12ms" },
          ].map((stat, index) => (
            <View key={index} style={styles.statCard}>
              <View style={styles.skeletonLine1} />
              <View style={styles.skeletonLine2} />
            </View>
          ))}
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
  mapPreview: {
    height: 140,
    backgroundColor: 'rgba(34, 211, 238, 0.1)',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  mapIcon: {
    width: 48,
    height: 48,
    backgroundColor: 'rgba(34, 211, 238, 0.2)',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  mapTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
    marginBottom: 2,
  },
  mapSubtitle: {
    fontSize: 12,
    color: '#9ca3af',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 8,
  },
  statCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    padding: 12,
    width: (width - 80) / 2,
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
    width: 50,
  },
});