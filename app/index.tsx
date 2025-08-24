import { FlatList, StyleSheet, Text, View } from 'react-native';

import { LoadingIndicator, MenuCard } from '@/components';

import { useFetchMenu } from '../api/menu';

export default function Index() {
  const { isPending, isError, data, error, refetch, isRefetching } = useFetchMenu(new Date('2025-08-26'));

  if (isError) return <Text>{error.message}</Text>;
  if (isPending) return <LoadingIndicator text={"Loading this week's menu"} />;
  if (data.days.length === 0) return <Text>No menu available for this week.</Text>;

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
});
