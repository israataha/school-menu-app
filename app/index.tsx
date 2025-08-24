import { FlatList, StyleSheet, Text, View } from 'react-native';

import { EmptyState, LoadingIndicator, MenuCard } from '@/components';

import { useFetchMenu } from '../api/menu';

export default function Index() {
  const { isPending, isError, data, error, refetch, isRefetching } = useFetchMenu(new Date('2025-08-22'));

  if (isPending) return <LoadingIndicator text={"Loading this week's menu"} />;

  if (isError)
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>{error.message || 'Failed to fetch menu data'}</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      <FlatList
        data={data.days}
        renderItem={({ item }) => <MenuCard item={item} />}
        keyExtractor={item => item.date}
        refreshing={isRefetching}
        onRefresh={refetch}
        ListEmptyComponent={<EmptyState text="No menu available for this week" />}
        ListHeaderComponent={
          <Text style={{ fontWeight: '600', fontSize: 16, marginBottom: 8, alignSelf: 'center' }}>
            {"This week's menu"}
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  empty: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
