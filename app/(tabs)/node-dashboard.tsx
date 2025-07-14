import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function NodeDashboard() {
  const activityItems = Array.from({ length: 6 }, (_, i) => ({ id: i.toString() }));

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Node Dashboard</Text>
          <Text style={styles.headerSubtitle}>
            Monitor your node performance and earnings
          </Text>
        </View>

        <View style={styles.statusGrid}>
          <StatusCard
            title="Node Status"
            value="Online"
            status="success"
            icon="checkmark-circle-outline"
          />
          <StatusCard
            title="Uptime"
            value="99.8%"
            status="success"
            icon="time-outline"
          />
          <StatusCard
            title="Earnings Today"
            value="2.45 SOL"
            status="neutral"
            icon="wallet-outline"
          />
        </View>

        <View style={styles.chartsContainer}>
          <ChartCard
            title="Performance Metrics"
            subtitle="CPU, Memory, Network"
            icon="speedometer-outline"
          />
          <ChartCard
            title="Earnings Overview"
            subtitle="Daily SOL rewards"
            icon="trending-up-outline"
          />
        </View>

        <View style={styles.actionsGrid}>
          <ActionCard
            title="Start Service"
            icon="play-outline"
            color="#10b981"
          />
          <ActionCard
            title="Settings"
            icon="settings-outline"
            color="#64748b"
          />
          <ActionCard
            title="Restart Node"
            icon="refresh-outline"
            color="#f59e0b"
          />
          <ActionCard
            title="View Logs"
            icon="document-text-outline"
            color="#22d3ee"
          />
        </View>

        <View style={styles.activityContainer}>
          <Text style={styles.activityTitle}>Recent Activity</Text>
          <FlatList
            data={activityItems}
            renderItem={({ item }) => <ActivityItem />}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

interface StatusCardProps {
  title: string;
  value: string;
  status: 'success' | 'warning' | 'error' | 'neutral';
  icon: keyof typeof Ionicons.glyphMap;
}

function StatusCard({ title, value, status, icon }: StatusCardProps) {
  const getStatusColor = () => {
    switch (status) {
      case 'success': return '#10b981';
      case 'warning': return '#f59e0b';
      case 'error': return '#ef4444';
      default: return '#22d3ee';
    }
  };

  return (
    <View style={styles.statusCard}>
      <View style={styles.statusCardHeader}>
        <Ionicons name={icon} size={20} color={getStatusColor()} />
      </View>
      <Text style={[styles.statusValue, { color: getStatusColor() }]}>{value}</Text>
      <Text style={styles.statusTitle}>{title}</Text>
    </View>
  );
}

interface ChartCardProps {
  title: string;
  subtitle: string;
  icon: keyof typeof Ionicons.glyphMap;
}

function ChartCard({ title, subtitle, icon }: ChartCardProps) {
  return (
    <View style={styles.chartCard}>
      <View style={styles.chartHeader}>
        <View>
          <Text style={styles.chartTitle}>{title}</Text>
          <Text style={styles.chartSubtitle}>{subtitle}</Text>
        </View>
        <Ionicons name={icon} size={24} color="#22d3ee" />
      </View>
      <View style={styles.chartPlaceholder}>
        <Text style={styles.chartPlaceholderText}>Real-time Charts Coming Soon</Text>
      </View>
    </View>
  );
}

interface ActionCardProps {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
}

function ActionCard({ title, icon, color }: ActionCardProps) {
  return (
    <TouchableOpacity style={styles.actionCard}>
      <View style={[styles.actionCardIcon, { backgroundColor: `${color}20` }]}>
        <Ionicons name={icon} size={24} color={color} />
      </View>
      <Text style={styles.actionCardTitle}>{title}</Text>
    </TouchableOpacity>
  );
}

function ActivityItem() {
  return (
    <View style={styles.activityItem}>
      <View style={styles.activityIcon}>
        <View style={styles.activityDot} />
      </View>
      <View style={styles.activityContent}>
        <View style={styles.activityHeader}>
          <View style={[styles.skeletonText, { width: 150 }]} />
          <View style={[styles.skeletonText, { width: 60 }]} />
        </View>
        <View style={[styles.skeletonText, { width: 200 }]} />
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
  statusGrid: {
    paddingHorizontal: 24,
    flexDirection: 'row',
    gap: 12,
    marginBottom: 32,
  },
  statusCard: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  statusCardHeader: {
    marginBottom: 8,
  },
  statusValue: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statusTitle: {
    fontSize: 12,
    color: '#64748b',
    textAlign: 'center',
  },
  chartsContainer: {
    paddingHorizontal: 24,
    gap: 16,
    marginBottom: 32,
  },
  chartCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 20,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    marginBottom: 4,
  },
  chartSubtitle: {
    fontSize: 14,
    color: '#64748b',
  },
  chartPlaceholder: {
    height: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chartPlaceholderText: {
    color: '#64748b',
    fontSize: 14,
  },
  actionsGrid: {
    paddingHorizontal: 24,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 32,
  },
  actionCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    width: (width - 60) / 2,
    alignItems: 'center',
  },
  actionCardIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  actionCardTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: 'white',
    textAlign: 'center',
  },
  activityContainer: {
    paddingHorizontal: 24,
  },
  activityTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 16,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  activityIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  activityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#22d3ee',
  },
  activityContent: {
    flex: 1,
  },
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  skeletonText: {
    height: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 6,
    marginBottom: 4,
  },
});