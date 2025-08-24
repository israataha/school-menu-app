import { FlatList, StyleSheet, Text, View } from 'react-native';

import { EmptyState, ErrorState, LoadingIndicator, MenuCard } from '@/components';
import { colors } from '@/styles';

import { useFetchMenu } from '../api';

export default function Index() {
  const { isPending, isError, data, refetch, isRefetching } = useFetchMenu(new Date('2025-08-26'));

  if (isPending) return <LoadingIndicator text={"Loading this week's menu"} />;

  if (isError)
    return (
      <ErrorState
        message={"Unable to load this week's menu. Please check your connection and try again."}
        onRetry={refetch}
      />
    );

  return (
    <View style={styles.container}>
      <FlatList
        data={data.days}
        renderItem={({ item }) => <MenuCard item={item} />}
        keyExtractor={item => item.date}
        refreshing={isRefetching}
        onRefresh={refetch}
        ListEmptyComponent={<EmptyState message="No menu available for this week" />}
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
    backgroundColor: colors.background,
  },
});
