import React, { useState } from 'react';
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
import TimePeriodSelector from '@/components/ui/TimePeriodSelector';
import ChartCard from '@/components/ui/ChartCard';
import MetricCard from '@/components/ui/MetricCard';

const { width } = Dimensions.get('window');

export default function Analytics() {
  const [selectedPeriod, setSelectedPeriod] = useState('7d');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Analytics</Text>
          <Text style={styles.headerSubtitle}>
            Network performance and usage metrics
          </Text>
        </View>

        <TimePeriodSelector
          periods={['24H', '7D', '30D', '90D']}
          selectedPeriod={selectedPeriod.toUpperCase()}
          onPeriodChange={(period) => setSelectedPeriod(period.toLowerCase())}
        />

        <View style={styles.metricsGrid}>
          <MetricCard
            label="Total Compute Hours"
            value="1,247"
            trend="+12.5%"
          />
          <MetricCard
            label="Revenue (SOL)"
            value="89.32"
            trend="+8.3%"
          />
          <MetricCard
            label="Active Devices"
            value="892"
            trend="+5.7%"
          />
          <MetricCard
            label="Avg Response Time"
            value="120ms"
            trend="-2.1%"
          />
        </View>

        <View style={styles.chartsContainer}>
          <ChartCard
            title="Compute Usage"
            description="Hours per day"
            icon="bar-chart-outline"
          />
          <ChartCard
            title="Revenue Trends"
            description="SOL earned daily"
            icon="trending-up-outline"
          />
        </View>

        <View style={styles.detailsContainer}>
          <Text style={styles.detailsTitle}>Detailed Analytics</Text>
          
          <AnalyticsSection
            title="Geographic Distribution"
            icon="globe-outline"
          />
          <AnalyticsSection
            title="Service Types"
            icon="cube-outline"
          />
          <AnalyticsSection
            title="Performance Metrics"
            icon="analytics-outline"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}


interface AnalyticsSectionProps {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
}

function AnalyticsSection({ title, icon }: AnalyticsSectionProps) {
  return (
    <TouchableOpacity style={styles.analyticsSection}>
      <View style={styles.analyticsSectionIcon}>
        <Ionicons name={icon} size={20} color="#22d3ee" />
      </View>
      <Text style={styles.analyticsSectionTitle}>{title}</Text>
      <Ionicons name="chevron-forward-outline" size={20} color="#64748b" />
    </TouchableOpacity>
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
  metricsGrid: {
    paddingHorizontal: 24,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
    marginBottom: 32,
  },
  chartsContainer: {
    paddingHorizontal: 24,
    gap: 16,
    marginBottom: 32,
  },
  detailsContainer: {
    paddingHorizontal: 24,
  },
  detailsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 16,
  },
  analyticsSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  analyticsSectionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(34, 211, 238, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  analyticsSectionTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
  },
});