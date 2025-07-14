import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Link, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import * as WebBrowser from "expo-web-browser";
import GradientBars from "@/components/ui/GradientBars";

const windowDimensions = Dimensions.get("window");

type AvatarProps = {
  imageSrc: string;
  delay: number;
};

export default function HeroPage() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.backgroundGradient} />
        <GradientBars />

        <View style={styles.content}>
          <TrustElements />

          <View style={styles.heroTextContainer}>
            <Text style={styles.heroTitle}>
              Trustless Compute, Straight from Your Phone
            </Text>
            <View style={styles.gradientText} />
          </View>

          <Text style={styles.subtitle}>Run Functions. Pay Per Result.</Text>

          <AuthForm />

          <TouchableOpacity
            style={styles.socialLink}
            onPress={() =>
              WebBrowser.openBrowserAsync("https://x.com/nodaranetwork")
            }
          >
            <Text style={styles.socialText}>@nodaranetwork</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Avatar({ imageSrc, delay }: AvatarProps) {
  return (
    <View style={styles.avatar}>
      <Image source={{ uri: imageSrc }} style={styles.avatarImage} />
    </View>
  );
}

function TrustElements() {
  const avatars = [
    "https://pbs.twimg.com/profile_images/1890067153073704961/lW-CFqgG_400x400.jpg",
    "https://pbs.twimg.com/profile_images/1925608041321275393/gmyPy1KH_400x400.png",
    "https://pbs.twimg.com/profile_images/1903172797263908867/nnm1MD_j_400x400.jpg",
    "https://pbs.twimg.com/profile_images/1929103363880493056/GQ3W-aGE_400x400.jpg",
    "https://pbs.twimg.com/profile_images/1937865077786316800/fVGLgl_A_400x400.jpg",
  ];

  return (
    <View style={styles.trustContainer}>
      <View style={styles.avatarContainer}>
        {avatars.map((avatar, index) => (
          <Avatar key={index} imageSrc={avatar} delay={index * 200} />
        ))}
      </View>
      <Text style={styles.trustText}>currently on the waitlist</Text>
    </View>
  );
}

function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!email || !email.includes("@")) {
      Alert.alert("Error", "Please enter a valid email");
      return;
    }

    if (!password || password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters");
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      Alert.alert(
        "Success",
        isSignUp ? "Account created successfully!" : "Welcome back!",
        [
          {
            text: "Go to Dashboard",
            onPress: () => {
              router.push("/(tabs)/dashboard");
            },
          },
        ]
      );
    }, 1000);
  };

  return (
    <View style={styles.formContainer}>
      <Text style={styles.formTitle}>
        {isSignUp ? "Create Account" : "Welcome Back"}
      </Text>
      <Text style={styles.formSubtitle}>
        {isSignUp ? "Join the Nodara Network" : "Sign in to your account"}
      </Text>

      <TextInput
        style={styles.emailInput}
        value={email}
        onChangeText={setEmail}
        placeholder="Enter Your Email"
        placeholderTextColor="#9ca3af"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <TextInput
        style={styles.passwordInput}
        value={password}
        onChangeText={setPassword}
        placeholder="Enter Your Password"
        placeholderTextColor="#9ca3af"
        secureTextEntry
        autoCapitalize="none"
        autoCorrect={false}
      />

      <TouchableOpacity
        style={[
          styles.submitButton,
          isSubmitting && styles.submitButtonDisabled,
        ]}
        onPress={handleSubmit}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <ActivityIndicator size="small" color="#111827" />
        ) : (
          <Text style={styles.submitButtonText}>
            {isSignUp ? "Create Account" : "Sign In"}
          </Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.toggleButton}
        onPress={() => setIsSignUp(!isSignUp)}
      >
        <Text style={styles.toggleButtonText}>
          {isSignUp
            ? "Already have an account? Sign In"
            : "New to Nodara? Create Account"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111827",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    minHeight: windowDimensions.height,
  },
  backgroundGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#111827",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 40,
    zIndex: 10,
  },
  trustContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(17, 24, 39, 0.6)",
    borderRadius: 25,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginBottom: 40,
  },
  avatarContainer: {
    flexDirection: "row",
    marginRight: 12,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#374151",
    marginLeft: -8,
    overflow: "hidden",
  },
  avatarImage: {
    width: "100%",
    height: "100%",
  },
  trustText: {
    color: "white",
    fontSize: 14,
    fontWeight: "500",
  },
  heroTextContainer: {
    alignItems: "center",
    marginBottom: 32,
  },
  heroTitle: {
    fontSize: windowDimensions.width > 400 ? 32 : 28,
    fontWeight: "600",
    color: "white",
    textAlign: "center",
    lineHeight: windowDimensions.width > 400 ? 40 : 36,
    marginBottom: 16,
  },
  gradientText: {
    height: 4,
    width: 100,
    borderRadius: 2,
    backgroundColor: "#22d3ee",
  },
  subtitle: {
    fontSize: 18,
    color: "#a5f3fc",
    textAlign: "center",
    marginBottom: 48,
    lineHeight: 24,
  },
  formContainer: {
    width: "100%",
    maxWidth: 400,
    marginBottom: 40,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 8,
  },
  formSubtitle: {
    fontSize: 16,
    color: "#9ca3af",
    textAlign: "center",
    marginBottom: 32,
  },
  emailInput: {
    backgroundColor: "rgba(17, 24, 39, 0.6)",
    borderWidth: 1,
    borderColor: "#164e63",
    borderRadius: 25,
    paddingHorizontal: 24,
    paddingVertical: 16,
    color: "white",
    fontSize: 16,
    marginBottom: 16,
  },
  passwordInput: {
    backgroundColor: "rgba(17, 24, 39, 0.6)",
    borderWidth: 1,
    borderColor: "#164e63",
    borderRadius: 25,
    paddingHorizontal: 24,
    paddingVertical: 16,
    color: "white",
    fontSize: 16,
    marginBottom: 24,
  },
  submitButton: {
    backgroundColor: "#22d3ee",
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: "center",
  },
  submitButtonDisabled: {
    backgroundColor: "#164e63",
  },
  submitButtonText: {
    color: "#111827",
    fontSize: 16,
    fontWeight: "600",
  },
  toggleButton: {
    marginTop: 16,
    alignItems: "center",
  },
  toggleButtonText: {
    color: "#9ca3af",
    fontSize: 14,
    textDecorationLine: "underline",
  },
  successContainer: {
    backgroundColor: "rgba(34, 211, 238, 0.2)",
    borderWidth: 1,
    borderColor: "rgba(34, 211, 238, 0.3)",
    borderRadius: 25,
    paddingVertical: 16,
    paddingHorizontal: 24,
    marginBottom: 40,
  },
  successText: {
    color: "#67e8f9",
    fontSize: 16,
    textAlign: "center",
  },
  socialLink: {
    marginBottom: 32,
  },
  socialText: {
    color: "#9ca3af",
    fontSize: 14,
  },
  dashboardLink: {
    width: "100%",
    maxWidth: 300,
  },
  dashboardButton: {
    backgroundColor: "#1f2937",
    borderWidth: 1,
    borderColor: "#374151",
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: "center",
  },
  dashboardButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
