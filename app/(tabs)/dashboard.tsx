import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import WalletButton from "@/components/WalletButton";
import AnalyticsOverview from "@/components/dashboard/AnalyticsOverview";
import ServicesOverview from "@/components/dashboard/ServicesOverview";
import DevicesOverview from "@/components/dashboard/DevicesOverview";
import NodeDashboardOverview from "@/components/dashboard/NodeDashboardOverview";
import MetricCard from "@/components/ui/MetricCard";

const windowDimensions = Dimensions.get("window");

export default function Dashboard() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Dashboard</Text>
          <Text style={styles.headerSubtitle}>
            Welcome to the Nodara Network
          </Text>
          <View style={styles.walletContainer}>
            <WalletButton />
          </View>
        </View>

        <View style={styles.featuresContainer}>
          <View style={styles.featureTags}>
            <View style={styles.featureTag}>
              <Text style={styles.featureTagText}>Decentralized</Text>
            </View>
            <View style={styles.featureTag}>
              <Text style={styles.featureTagText}>Trustless</Text>
            </View>
            <View style={styles.featureTag}>
              <Text style={styles.featureTagText}>Pay-per-use</Text>
            </View>
          </View>
        </View>

        <View style={styles.overviewGrid}>
          <ServicesOverview />
          <DevicesOverview />
          <AnalyticsOverview />
          <NodeDashboardOverview />
        </View>

        <View style={styles.metricsGrid}>
          <MetricCard label="Active Services" value="24" trend="+5%" />
          <MetricCard label="Connected Devices" value="156" trend="+12%" />
          <MetricCard label="Earnings (SOL)" value="12.5" trend="+8%" />
          <MetricCard label="Uptime" value="99.2%" trend="+0.3%" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
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
    alignItems: "center",
  },
  walletContainer: {
    marginTop: 16,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#64748b",
    textAlign: "center",
  },
  featuresContainer: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  featureTags: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 8,
  },
  featureTag: {
    backgroundColor: "rgba(34, 211, 238, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(34, 211, 238, 0.3)",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  featureTagText: {
    color: "#22d3ee",
    fontSize: 12,
    fontWeight: "500",
  },
  overviewGrid: {
    paddingHorizontal: 24,
    marginBottom: 32,
    gap: 16,
  },
  metricsGrid: {
    paddingHorizontal: 24,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 16,
  },
});
