import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

export default function NodeDashboardOverview() {
  const handleViewAll = () => {
    router.push('/(tabs)/node-dashboard');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.title}>Node Dashboard</Text>
          <TouchableOpacity onPress={handleViewAll}>
            <Text style={styles.viewAllText}>View All →</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.subtitle}>Manage your smartphone compute node and track earnings</Text>
      </View>
      
      <View style={styles.content}>
        {/* Status Overview */}
        <View style={styles.statusGrid}>
          {[
            { label: "Node Status", status: "Online", color: "green" },
            { label: "Today's Earnings", status: "₿0.24", color: "green" },
            { label: "Total Earnings", status: "₿12.47", color: "cyan" },
          ].map((item, index) => (
            <View key={index} style={styles.statusCard}>
              <View style={styles.skeletonLine1} />
              <View style={styles.skeletonLine2} />
            </View>
          ))}
        </View>
        
        {/* Quick Actions */}
        <View style={styles.actionsGrid}>
          {[
            { title: "Service Settings" },
            { title: "Pricing" },
            { title: "Availability" },
            { title: "Withdrawals" },
          ].map((action, index) => (
            <TouchableOpacity
              key={index}
              style={styles.actionButton}
              onPress={() => console.log(`${action.title} pressed`)}
            >
              <View style={styles.actionSkeleton} />
            </TouchableOpacity>
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
  statusGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    gap: 8,
  },
  statusCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    padding: 12,
    flex: 1,
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
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 8,
  },
  actionButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    padding: 12,
    width: (width - 80) / 2,
  },
  actionSkeleton: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 4,
    width: '100%',
  },
});