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

export default function ServicesOverview() {
  const handleViewAll = () => {
    router.push('/(tabs)/services');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.title}>Service Marketplace</Text>
          <TouchableOpacity onPress={handleViewAll}>
            <Text style={styles.viewAllText}>View All →</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.subtitle}>Browse and book compute services from smartphone providers</Text>
      </View>
      
      <View style={styles.content}>
        <View style={styles.servicesGrid}>
          {Array.from({ length: 3 }).map((_, index) => (
            <View key={index} style={styles.serviceCard}>
              <View style={styles.skeletonLine1} />
              <View style={styles.skeletonLine2} />
              <View style={styles.serviceCardFooter}>
                <View style={styles.skeletonPrice} />
                <View style={styles.skeletonRating} />
              </View>
            </View>
          ))}
        </View>
        
        <View style={styles.featuresContainer}>
          <View style={styles.featureTag}>
            <Text style={styles.featureTagText}>Real-time Pricing</Text>
          </View>
          <View style={styles.featureTag}>
            <Text style={styles.featureTagText}>Instant Booking</Text>
          </View>
          <View style={styles.featureTag}>
            <Text style={styles.featureTagText}>Trust Scores</Text>
          </View>
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
  servicesGrid: {
    gap: 12,
    marginBottom: 16,
  },
  serviceCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    padding: 12,
  },
  skeletonLine1: {
    height: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 6,
    marginBottom: 8,
  },
  skeletonLine2: {
    height: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    marginBottom: 8,
  },
  serviceCardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  skeletonPrice: {
    height: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    width: 50,
  },
  skeletonRating: {
    height: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    width: 40,
  },
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  featureTag: {
    backgroundColor: 'rgba(34, 211, 238, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(34, 211, 238, 0.3)',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  featureTagText: {
    color: '#22d3ee',
    fontSize: 10,
    fontWeight: '500',
  },
});