import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

interface TimePeriodSelectorProps {
  periods?: string[];
  selectedPeriod?: string;
  onPeriodChange?: (period: string) => void;
}

export default function TimePeriodSelector({ 
  periods = ["1H", "24H", "7D", "30D", "90D"],
  selectedPeriod = "24H",
  onPeriodChange
}: TimePeriodSelectorProps) {
  return (
    <View style={styles.container}>
      <View style={styles.selector}>
        {periods.map((period) => (
          <TouchableOpacity
            key={period}
            onPress={() => onPeriodChange?.(period)}
            style={[
              styles.periodButton,
              selectedPeriod === period ? styles.selectedButton : styles.unselectedButton
            ]}
          >
            <Text
              style={[
                styles.periodText,
                selectedPeriod === period ? styles.selectedText : styles.unselectedText
              ]}
            >
              {period}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  selector: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  periodButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
  },
  selectedButton: {
    backgroundColor: 'rgba(34, 211, 238, 0.2)',
    borderColor: 'rgba(34, 211, 238, 0.5)',
  },
  unselectedButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  periodText: {
    fontSize: 14,
    fontWeight: '500',
  },
  selectedText: {
    color: '#22d3ee',
  },
  unselectedText: {
    color: '#9ca3af',
  },
});