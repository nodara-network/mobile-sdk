import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ServiceCardProps {
  title?: string;
  description?: string;
  price?: string;
  rating?: string;
  isLoading?: boolean;
  onPress?: () => void;
}

export default function ServiceCard({ 
  title, 
  description, 
  price, 
  rating, 
  isLoading = true,
  onPress
}: ServiceCardProps) {
  const CardWrapper = onPress ? TouchableOpacity : View;
  
  return (
    <CardWrapper style={styles.container} onPress={onPress}>
      {isLoading ? (
        <>
          <View style={styles.skeletonTitle} />
          <View style={styles.skeletonDescription} />
          <View style={styles.skeletonLine} />
          <View style={styles.footer}>
            <View style={styles.skeletonPrice} />
            <View style={styles.skeletonRating} />
          </View>
        </>
      ) : (
        <>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
          <View style={styles.footer}>
            <Text style={styles.price}>{price}</Text>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={12} color="#fbbf24" />
              <Text style={styles.rating}>{rating}</Text>
            </View>
          </View>
        </>
      )}
    </CardWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#9ca3af',
    marginBottom: 16,
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#22d3ee',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rating: {
    fontSize: 12,
    color: '#9ca3af',
  },
  skeletonTitle: {
    height: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    marginBottom: 12,
  },
  skeletonDescription: {
    height: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    marginBottom: 8,
  },
  skeletonLine: {
    height: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    marginBottom: 16,
  },
  skeletonPrice: {
    height: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    width: 60,
  },
  skeletonRating: {
    height: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    width: 50,
  },
});