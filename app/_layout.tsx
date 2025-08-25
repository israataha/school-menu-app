import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';

import { colors } from '@/styles';
const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 2 } },
});

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack screenOptions={{ headerStyle: { backgroundColor: colors.background } }}>
        <Stack.Screen name="index" options={{ headerTitle: 'School Lunch' }} />
        <Stack.Screen name="menu-details" options={{ headerBackTitle: 'Back', headerTitle: 'Menu Details' }} />
      </Stack>
    </QueryClientProvider>
  );
}
