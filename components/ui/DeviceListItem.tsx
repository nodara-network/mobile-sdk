import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

interface DeviceListItemProps {
  deviceId?: string;
  location?: string;
  status?: string;
  responseTime?: string;
  isLoading?: boolean;
}

export default function DeviceListItem({ 
  deviceId, 
  location, 
  status, 
  responseTime, 
  isLoading = true
}: DeviceListItemProps) {
  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <View style={styles.deviceIcon} />
        <View style={styles.deviceInfo}>
          {isLoading ? (
            <>
              <View style={styles.skeletonLine1} />
              <View style={styles.skeletonLine2} />
            </>
          ) : (
            <>
              <Text style={styles.deviceId}>{deviceId}</Text>
              <Text style={styles.location}>{location}</Text>
            </>
          )}
        </View>
      </View>
      <View style={styles.rightSection}>
        {isLoading ? (
          <>
            <View style={styles.skeletonStatus} />
            <View style={styles.skeletonResponse} />
          </>
        ) : (
          <>
            <View style={[
              styles.statusBadge,
              status === 'online' ? styles.statusOnline : styles.statusOffline
            ]}>
              <Text style={[
                styles.statusText,
                status === 'online' ? styles.statusTextOnline : styles.statusTextOffline
              ]}>
                {status}
              </Text>
            </View>
            <Text style={styles.responseTime}>{responseTime}</Text>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    marginBottom: 12,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  deviceIcon: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    marginRight: 16,
  },
  deviceInfo: {
    flex: 1,
  },
  deviceId: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    marginBottom: 4,
  },
  location: {
    fontSize: 12,
    color: '#9ca3af',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusOnline: {
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
  },
  statusOffline: {
    backgroundColor: 'rgba(239, 68, 68, 0.2)',
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  statusTextOnline: {
    color: '#10b981',
  },
  statusTextOffline: {
    color: '#ef4444',
  },
  responseTime: {
    fontSize: 12,
    color: '#9ca3af',
  },
  skeletonLine1: {
    height: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    width: 120,
    marginBottom: 8,
  },
  skeletonLine2: {
    height: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 6,
    width: 80,
  },
  skeletonStatus: {
    height: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    width: 60,
  },
  skeletonResponse: {
    height: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    width: 50,
  },
});