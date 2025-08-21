import { FlatList, StyleSheet, Text, View } from 'react-native';

import { MenuCard } from '@/components';

import { useFetchMenu } from '../api/menu';

export default function Index() {
  const { isPending, isError, data, error, refetch, isRefetching } = useFetchMenu(new Date('2025-08-26'));

  if (isError) return <Text>{error.message}</Text>;
  if (isPending) return <Text>Loading...</Text>;

  return (
    <View style={styles.container}>
      <FlatList
        data={data.days}
        renderItem={({ item }) => <MenuCard item={item} />}
        keyExtractor={item => item.date}
        refreshing={isRefetching}
        onRefresh={refetch}
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
