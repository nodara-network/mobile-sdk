import { Link, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function NotFoundScreen() {
  const bounceAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Bounce animation for the 404 text
    Animated.sequence([
      Animated.timing(bounceAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(bounceAnim, {
        toValue: 0.9,
        friction: 3,
        useNativeDriver: true,
      })
    ]).start();

    // Fade in animation for content
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      delay: 200,
      useNativeDriver: true,
    }).start();
  }, [bounceAnim, fadeAnim]);

  return (
    <>
      <Stack.Screen options={{ 
        title: 'Page Not Found',
        headerStyle: { backgroundColor: '#0f0f0f' },
        headerTintColor: '#ffffff',
        headerTitleStyle: { fontWeight: 'bold' }
      }} />
      <StatusBar style="light" />
      
      <View style={styles.container}>
        <View style={styles.content}>
          {/* Animated 404 */}
          <Animated.View 
            style={[
              styles.errorContainer,
              {
                transform: [{ scale: bounceAnim }],
                opacity: fadeAnim
              }
            ]}
          >
            <Text style={styles.errorCode}>404</Text>
            <View style={styles.errorDivider} />
          </Animated.View>

          {/* Main Content */}
          <Animated.View style={[styles.messageContainer, { opacity: fadeAnim }]}>
            <Text style={styles.errorTitle}>Oops! Page Not Found</Text>
            <Text style={styles.errorDescription}>
              The page you&apos;re looking for seems to have wandered off into the digital wilderness.
            </Text>
            
            {/* Illustration */}
            <View style={styles.illustration}>
              <Text style={styles.illustrationEmoji}>🌌</Text>
              <Text style={styles.illustrationText}>Lost in space?</Text>
            </View>
          </Animated.View>

          {/* Action Buttons */}
          <Animated.View style={[styles.actionContainer, { opacity: fadeAnim }]}>
            <Link href="/" asChild>
              <TouchableOpacity style={styles.primaryButton}>
                <Text style={styles.primaryButtonText}>🏠 Go Home</Text>
              </TouchableOpacity>
            </Link>
            
            <TouchableOpacity 
              style={styles.secondaryButton}
              onPress={() => {
                // You can add navigation history back functionality here
                console.log('Go back pressed');
              }}
            >
              <Text style={styles.secondaryButtonText}>← Go Back</Text>
            </TouchableOpacity>
          </Animated.View>

          {/* Help Section */}
          <Animated.View style={[styles.helpContainer, { opacity: fadeAnim }]}>
            <Text style={styles.helpTitle}>Need Help?</Text>
            <Text style={styles.helpText}>
              If you think this is an error, please contact our support team.
            </Text>
            <View style={styles.helpOptions}>
              <TouchableOpacity style={styles.helpOption}>
                <Text style={styles.helpOptionText}>📧 Contact Support</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.helpOption}>
                <Text style={styles.helpOptionText}>🔍 Search</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f0f',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  content: {
    alignItems: 'center',
    maxWidth: 400,
    width: '100%',
  },
  errorContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  errorCode: {
    fontSize: 120,
    fontWeight: 'bold',
    color: '#2563eb',
    textShadowColor: 'rgba(37, 99, 235, 0.5)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 20,
  },
  errorDivider: {
    width: 60,
    height: 4,
    backgroundColor: '#2563eb',
    borderRadius: 2,
    marginTop: 10,
  },
  messageContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  errorTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 16,
  },
  errorDescription: {
    fontSize: 16,
    color: '#a1a1aa',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 30,
  },
  illustration: {
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  illustrationEmoji: {
    fontSize: 48,
    marginBottom: 8,
  },
  illustrationText: {
    fontSize: 14,
    color: '#a1a1aa',
    fontStyle: 'italic',
  },
  actionContainer: {
    width: '100%',
    marginBottom: 30,
  },
  primaryButton: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#2563eb',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  secondaryButton: {
    borderWidth: 2,
    borderColor: '#2a2a2a',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: 'transparent',
  },
  secondaryButtonText: {
    color: '#a1a1aa',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  helpContainer: {
    width: '100%',
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  helpTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 8,
  },
  helpText: {
    fontSize: 14,
    color: '#a1a1aa',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 20,
  },
  helpOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  helpOption: {
    flex: 1,
    backgroundColor: '#2a2a2a',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  helpOptionText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
});