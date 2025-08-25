import { useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, Text } from 'react-native';

import { ErrorState, FoodItem } from '@/components';
import { colors } from '@/styles';
import { formatDate } from '@/utils';

import { useMenuDetails } from '../api';
import { MESSAGES } from '../constants/messages';

export default function MenuDetails() {
  const { date, currentDate } = useLocalSearchParams<{ date: string; currentDate: string }>();
  const { weekday, month, day } = formatDate(date, { month: 'short' });
  const data = useMenuDetails(currentDate, date);

  if (!data) return <ErrorState message={MESSAGES.ERRORS.UNABLE_TO_LOAD_MENU_DETAILS} />;

  return (
    <ScrollView
      style={styles.container}
      accessible={true}
      accessibilityLabel={`Menu details for ${weekday}, ${month} ${day}`}
      accessibilityHint="Shows detailed food items and nutritional information for the selected day">
      <Text style={styles.date} accessibilityRole="header">
        {weekday}, {month} {day}
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
