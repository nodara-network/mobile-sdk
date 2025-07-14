import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import ServiceCard from '@/components/ui/ServiceCard';

const { width } = Dimensions.get('window');

export default function Services() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Services</Text>
          <Text style={styles.headerSubtitle}>
            Discover and rent compute services from the network
          </Text>
        </View>

        <View style={styles.comingSoonContainer}>
          <Ionicons name="construct-outline" size={48} color="#22d3ee" />
          <Text style={styles.comingSoonTitle}>Coming Soon</Text>
          <Text style={styles.comingSoonDescription}>
            The service marketplace is under development. Soon you'll be able to browse and rent compute services from devices worldwide.
          </Text>
        </View>

        <View style={styles.featuresContainer}>
          <Text style={styles.featuresTitle}>What's Coming</Text>
          <FeatureItem
            icon="flash-outline"
            title="Real-time Pricing"
            description="Dynamic pricing based on demand and device capabilities"
          />
          <FeatureItem
            icon="checkmark-circle-outline"
            title="Instant Booking"
            description="Book compute resources instantly with automatic provisioning"
          />
          <FeatureItem
            icon="shield-checkmark-outline"
            title="Trust Scores"
            description="Verified device ratings and performance history"
          />
          <FeatureItem
            icon="speedometer-outline"
            title="Performance Metrics"
            description="Real-time monitoring of service quality and latency"
          />
        </View>

        <View style={styles.servicesGrid}>
          <ServiceCard
            title="AI Image Processing"
            description="High-performance GPU compute for image processing and AI inference"
            price="0.05 SOL/hr"
            rating="4.8"
            isLoading={false}
          />
          <ServiceCard
            title="Data Analysis"
            description="CPU-intensive data processing and analytics workloads"
            price="0.03 SOL/hr"
            rating="4.6"
            isLoading={false}
          />
          <ServiceCard
            title="Web Scraping"
            description="Distributed web scraping with residential IP addresses"
            price="0.02 SOL/hr"
            rating="4.9"
            isLoading={false}
          />
          <ServiceCard
            title="Video Encoding"
            description="Hardware-accelerated video encoding and transcoding"
            price="0.08 SOL/hr"
            rating="4.7"
            isLoading={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

interface FeatureItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
}

function FeatureItem({ icon, title, description }: FeatureItemProps) {
  return (
    <View style={styles.featureItem}>
      <View style={styles.featureIcon}>
        <Ionicons name={icon} size={20} color="#22d3ee" />
      </View>
      <View style={styles.featureContent}>
        <Text style={styles.featureTitle}>{title}</Text>
        <Text style={styles.featureDescription}>{description}</Text>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  header: {
    paddingHorizontal: 24,
    paddingVertical: 32,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
  },
  comingSoonContainer: {
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 40,
  },
  comingSoonTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 16,
    marginBottom: 8,
  },
  comingSoonDescription: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 24,
  },
  featuresContainer: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  featuresTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  featureIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(34, 211, 238, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
  },
  servicesGrid: {
    paddingHorizontal: 24,
  },
});