import { FlatList, StyleSheet, Text, View } from 'react-native';

import { LoadingIndicator, MenuCard } from '@/components';

import { useFetchMenu } from '../api/menu';

export default function Index() {
  const { isPending, isError, data, error, refetch, isRefetching } = useFetchMenu(new Date('2025-08-22'));

  if (isError) return <Text>{error.message}</Text>;
  if (isPending) return <LoadingIndicator text={"Loading this week's menu"} />;

  // useQuery's select filters out days with no menu items
  // so if it returns an empty array, there are no menu items for this week
  if (data.days.length === 0)
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>No menu available for this week</Text>
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
    backgroundColor: 'offWhite',
  },
  empty: {
    flex: 1,
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
