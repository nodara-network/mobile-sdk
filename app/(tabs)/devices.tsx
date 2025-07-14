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
import DeviceListItem from '@/components/ui/DeviceListItem';
import MetricCard from '@/components/ui/MetricCard';

const { width } = Dimensions.get('window');

export default function Devices() {
  const mockDevices = [
    { id: '1', deviceId: 'NODE-7F3A2B', location: 'San Francisco, CA', status: 'online', responseTime: '45ms' },
    { id: '2', deviceId: 'NODE-9E4C1D', location: 'New York, NY', status: 'online', responseTime: '62ms' },
    { id: '3', deviceId: 'NODE-2A8F5E', location: 'London, UK', status: 'offline', responseTime: '---' },
    { id: '4', deviceId: 'NODE-6B9C3A', location: 'Tokyo, JP', status: 'online', responseTime: '78ms' },
    { id: '5', deviceId: 'NODE-4D7E8F', location: 'Sydney, AU', status: 'online', responseTime: '95ms' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Devices</Text>
          <Text style={styles.headerSubtitle}>
            Global network of compute devices
          </Text>
        </View>

        <View style={styles.mapPlaceholder}>
          <Ionicons name="map-outline" size={48} color="#22d3ee" />
          <Text style={styles.mapPlaceholderText}>Interactive Map</Text>
          <Text style={styles.mapPlaceholderSubtext}>
            Coming soon - visualize the global device network
          </Text>
        </View>

        <View style={styles.statsGrid}>
          <MetricCard label="Total Devices" value="1,247" />
          <MetricCard label="Online Now" value="892" />
          <MetricCard label="Active Regions" value="42" />
          <MetricCard label="Avg Response" value="120ms" />
        </View>

        <View style={styles.devicesList}>
          <Text style={styles.devicesListTitle}>Connected Devices</Text>
          <FlatList
            data={mockDevices}
            renderItem={({ item }) => (
              <DeviceListItem
                deviceId={item.deviceId}
                location={item.location}
                status={item.status}
                responseTime={item.responseTime}
                isLoading={false}
              />
            )}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
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
  mapPlaceholder: {
    marginHorizontal: 24,
    marginBottom: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    paddingVertical: 48,
    alignItems: 'center',
  },
  mapPlaceholderText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    marginTop: 12,
    marginBottom: 4,
  },
  mapPlaceholderSubtext: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
  },
  statsGrid: {
    paddingHorizontal: 24,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
    marginBottom: 32,
  },
  devicesList: {
    paddingHorizontal: 24,
  },
  devicesListTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 16,
  },
});