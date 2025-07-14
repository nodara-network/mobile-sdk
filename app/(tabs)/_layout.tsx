import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Platform } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#22d3ee",
        tabBarInactiveTintColor: "#64748b",
        tabBarStyle: {
          backgroundColor: "#0f172a",
          borderTopWidth: 0,
          height: Platform.OS === "ios" ? 90 : 70,
          paddingBottom: Platform.OS === "ios" ? 30 : 10,
          boxShadow: "0px -2px 8px rgba(0, 0, 0, 0.1)",
          elevation: 8,
        },
        tabBarLabelStyle: {
          fontSize: 8,
          fontWeight: "500",
          marginTop: 4,
        },
        tabBarItemStyle: {
          paddingVertical: 8,
          paddingHorizontal: 12,
          alignItems: "center",
          justifyContent: "center",
        },
        headerStyle: {
          backgroundColor: "#0f172a",
        },
        headerTintColor: "white",
        headerTitleStyle: {
          fontWeight: "600",
        },
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "grid" : "grid-outline"}
              size={22}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="services"
        options={{
          title: "Services",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "cube" : "cube-outline"}
              size={22}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="devices"
        options={{
          title: "Devices",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "phone-portrait" : "phone-portrait-outline"}
              size={22}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="analytics"
        options={{
          title: "Analytics",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "analytics" : "analytics-outline"}
              size={22}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="node-dashboard"
        options={{
          title: "Node",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "server" : "server-outline"}
              size={22}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
