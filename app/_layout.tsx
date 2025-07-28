import '../polyfills';
import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { PrivyProvider } from '@privy-io/expo';
import { WalletProvider } from '@/contexts/WalletContext';
import WalletModal from '@/components/WalletModal';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <PrivyProvider
        appId={process.env.EXPO_PUBLIC_PRIVY_APP_ID || 'cmdlev4ci0056l40jwjqmj9hh'}
        config={{}}
      >
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
      </PrivyProvider>
    </SafeAreaProvider>
  );
}