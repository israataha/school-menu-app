import { useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, Text } from 'react-native';

import { ErrorState, FoodItem } from '@/components';
import { colors } from '@/styles';
import { formatDate } from '@/utils';

import { useMenuDetails } from '../api';
import { MESSAGES } from '../constants/messages';

/**
 * Displays the menu details screen for a specific date.
 * The date and currentDate params are passed in through the router params and retrieved using the useLocalSearchParams hook.
 *
 * @param {string} currentDate - The current date in YYYY-MM-DD format used as queryKey for cached data
 * @param {string} date - The date to fetch menu details for in YYYY-MM-DD format
 * @returns {JSX.Element} The menu details screen component.
 */
export default function MenuDetails() {
  const { date, currentDate } = useLocalSearchParams<{ date: string; currentDate: string }>();
  const data = useMenuDetails(currentDate, date);

  if (!data) return <ErrorState message={MESSAGES.ERRORS.UNABLE_TO_LOAD_MENU_DETAILS} />;

  // If the date was not valid, data would have been null or undefined and we would not have reached this point
  const { weekday, month, day } = formatDate(date, { month: 'short' })!;
  const dateString = `${weekday}, ${month} ${day}`;

  return (
    <ScrollView
      style={styles.container}
      accessible={true}
      accessibilityLabel={`Menu details for ${dateString}`}
      accessibilityHint="Shows detailed food items and nutritional information for the selected day">
      <Text style={styles.date} accessibilityRole="header">
        {dateString}
      </Text>
      {data.menu_items.map((item, index) => {
        if (item.is_section_title || item.is_holiday)
          return (
            <Text
              key={index}
              style={styles.section_title}
              accessibilityLabel={item.is_section_title ? 'section title' : 'holiday'}>
              {item.text}
            </Text>
          );

        return <FoodItem key={index} item={item} />;
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.background,
  },
  date: {
    fontWeight: '600',
    fontSize: 18,
    alignSelf: 'center',
    marginBottom: 10,
  },
  section_title: {
    fontWeight: '600',
    fontSize: 16,
    paddingVertical: 10,
  },
});
