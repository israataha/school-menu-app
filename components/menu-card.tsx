import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { Day } from '@/api/types';
import { colors } from '@/styles';
import { formatDate } from '@/utils';

export const MenuCard = ({ item }: { item: Day }) => {
  const { weekday, month, day } = formatDate(item.date);

  return (
    <Pressable
      accessibilityHint="Navigates to the menu detail page"
      testID={`menu-card-${item.date}`}
      style={styles.card}
      onPress={() => router.push(`/detail/${item.date}`)}>
      <View style={styles.dateContainer}>
        <View accessibilityLabel="date">
          <Text style={styles.date}>{weekday}</Text>
          <Text style={{ fontSize: 14, color: colors.textSecondary, fontStyle: 'italic' }}>
            {month} {day}
          </Text>
        </View>
        <Ionicons name="chevron-forward-outline" size={18} color="#6B7280" />
      </View>
      {item.menu_items.length === 0 ? (
        <Text style={{ fontStyle: 'italic' }}>There is currently nothing on the menu today.</Text>
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
            <Text key={index} style={{ lineHeight: 20, color: colors.textSecondary }}>
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
    fontSize: 18,
    lineHeight: 22,
    fontStyle: 'italic',
  },
  section_title: {
    fontWeight: '600',
    fontSize: 14,
    marginTop: 8,
  },
});
