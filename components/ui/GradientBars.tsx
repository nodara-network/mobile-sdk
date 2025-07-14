import React from "react";
import { View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function GradientBars() {
  const numBars = 20;

  const getBarColor = (i: number) => {
    const colors = ["#22d3ee", "#2dd4bf", "#06b6d4", "#0891b2", "#0e7490"];
    return colors[i % colors.length];
  };

  return (
    <View style={styles.container}>
      <View style={styles.barsContainer}>
        {Array.from({ length: numBars }).map((_, index) => (
          <View key={index} style={styles.barWrapper}>
            <LinearGradient
              colors={[getBarColor(index), "transparent"]}
              style={styles.bar}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
            />
          </View>
        ))}
      </View>
      <LinearGradient
        colors={[
          "rgba(17, 24, 39, 0.95)",
          "rgba(17, 24, 39, 0.6)",
          "rgba(17, 24, 39, 0.3)",
          "rgba(17, 24, 39, 0.6)",
          "rgba(17, 24, 39, 0.95)",
        ]}
        style={styles.overlay}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
    overflow: "hidden",
  },
  barsContainer: {
    flexDirection: "row",
    height: "100%",
    width: "120%",
    left: "-10%",
    alignItems: "flex-end",
    justifyContent: "space-around",
  },
  barWrapper: {
    flex: 1,
    alignItems: "center",
    marginHorizontal: 2,
  },
  bar: {
    width: "80%",
    height: 200,
    borderRadius: 2,
    opacity: 0.4,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
