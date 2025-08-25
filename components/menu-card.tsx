import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { Day } from '@/api';
import { MESSAGES } from '@/constants/messages';
import { colors } from '@/styles';
import { formatDate } from '@/utils';

/**
 * A MenuCard component that displays the date, menu items, and holiday information for a specific day.
 * The component uses Expo Router router.push() to navigate to the MenuDetails screen when the card is pressed.
 *
 * @param {Day} item the menu item to display
 * @param {string} currentDate the current date in YYYY-MM-DD format used as queryKey to query cached data
 * @returns {JSX.Element} the MenuCard component
 */
export const MenuCard = ({ item, currentDate }: { item: Day; currentDate: string }) => {
  const result = formatDate(item.date);
  const dateString = result ? `${result.weekday}, ${result.month} ${result.day}` : item.date;

  return (
    <Pressable
      accessibilityRole="link"
      accessibilityLabel={`Menu card for ${item.date}`}
      accessibilityHint="Press to navigate to the menu details page"
      testID={`menu-card-${item.date}`}
      style={styles.card}
      onPress={() =>
        router.push({
          pathname: `/menu-details`,
          params: { date: item.date, currentDate: currentDate },
        })
      }>
      <View style={styles.dateContainer}>
        <View accessible={true} accessibilityLabel="date">
          <Text style={styles.date}>{dateString}</Text>
        </View>
        <Ionicons
          name="chevron-forward-outline"
          size={18}
          color={colors.icon}
          accessible={true}
          accessibilityLabel="forward chevron icon"
        />
      </View>
      {item.menu_items.length === 0 ? (
        <Text style={styles.emptyText}>{MESSAGES.EMPTY_STATES.NO_MENU_TODAY}</Text>
      ) : (
        item.menu_items.map((item, index) => {
          if (item.is_section_title || item.is_holiday)
            return (
              <Text
                accessibilityLabel={item.is_section_title ? 'section title' : 'holiday'}
                key={index}
                style={styles.section_title}>
                {item.text}
              </Text>
            );

          if (!item.food) return null;
          return (
            <Text key={index} style={styles.item}>
              {item.food.name}
            </Text>
          );
        })
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    padding: 16,
    marginBottom: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  date: {
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 22,
    fontStyle: 'italic',
  },
  section_title: {
    fontWeight: '600',
    fontSize: 14,
    marginTop: 8,
  },
  emptyText: {
    fontStyle: 'italic',
  },
  item: {
    lineHeight: 20,
    color: colors.textSecondary,
  },
});
