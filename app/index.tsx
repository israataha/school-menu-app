import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import { EmptyState, ErrorState, LoadingIndicator, MenuCard } from '@/components';
import { MESSAGES } from '@/constants/messages';
import { colors } from '@/styles';
import { getDateString } from '@/utils';

import { useFetchMenu } from '../api';

export default function Index({ initialDate = new Date() }: { initialDate?: Date }) {
  const [currentDate, setCurrentDate] = useState(initialDate ?? new Date());

  useFocusEffect(
    useCallback(() => {
      const date = new Date();
      if (getDateString(date) === getDateString(currentDate)) return;

      setCurrentDate(date);
    }, [currentDate]),
  );

  const { isPending, isError, data, refetch, isRefetching } = useFetchMenu(currentDate);

  if (isPending) return <LoadingIndicator text={MESSAGES.LOADING.WEEKLY_MENU} />;

  if (isError) return <ErrorState message={MESSAGES.ERRORS.UNABLE_TO_LOAD_MENU} onRetry={refetch} />;

  return (
    <View style={styles.container} accessible={true}>
      <FlatList
        data={data.days}
        renderItem={({ item }) => <MenuCard item={item} currentDate={getDateString(currentDate)} />}
        keyExtractor={item => item.date}
        refreshing={isRefetching}
        onRefresh={refetch}
        ListEmptyComponent={<EmptyState message={MESSAGES.EMPTY_STATES.NO_MENU_AVAILABLE} />}
        ListHeaderComponent={
          <Text style={styles.header} accessible={true} accessibilityRole="header">
            {MESSAGES.MENU.WEEKLY_MENU_HEADER}
          </Text>
        }
        accessibilityLabel="Weekly lunch menu list"
        accessibilityHint="Scrollable list of lunch menu for this week"
        accessibilityRole="list"
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
