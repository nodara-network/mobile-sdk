import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { WalletProvider } from '@/contexts/WalletContext';
import WalletModal from '@/components/WalletModal';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <WalletProvider>
        <StatusBar style="auto" />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: '#0f172a' },
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen 
            name="(tabs)" 
            options={{
              contentStyle: { backgroundColor: '#0f172a' },
            }}
          />
        </Stack>
        <WalletModal />
      </WalletProvider>
    </SafeAreaProvider>
  );
}