import { FlatList, StyleSheet, Text, View } from 'react-native';

import { EmptyState, ErrorState, LoadingIndicator, MenuCard } from '@/components';
import { MESSAGES } from '@/constants/messages';
import { colors } from '@/styles';

import { useFetchMenu } from '../api';

export default function Index() {
  const { isPending, isError, data, refetch, isRefetching } = useFetchMenu(new Date('2025-08-26'));

  if (isPending) return <LoadingIndicator text={MESSAGES.LOADING.WEEKLY_MENU} />;

  if (isError) return <ErrorState message={MESSAGES.ERRORS.UNABLE_TO_LOAD_MENU} onRetry={refetch} />;

  return (
    <View style={styles.container}>
      <FlatList
        data={data.days}
        renderItem={({ item }) => <MenuCard item={item} />}
        keyExtractor={item => item.date}
        refreshing={isRefetching}
        onRefresh={refetch}
        ListEmptyComponent={<EmptyState message={MESSAGES.EMPTY_STATES.NO_MENU_AVAILABLE} />}
        ListHeaderComponent={<Text style={styles.header}>{MESSAGES.MENU.WEEKLY_MENU_HEADER}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.background,
  },
  header: {
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 12,
    alignSelf: 'center',
  },
});
