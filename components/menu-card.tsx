import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { Day } from '@/api/types';
import { formatDate } from '@/utils';

export const MenuCard = ({ item }: { item: Day }) => {
  return (
    <Pressable
      accessibilityHint="Navigates to your menu detail page"
      testID={`menu-card-${item.date}`}
      style={styles.card}
      onPress={() => router.push(`/detail/${item.date}`)}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text accessibilityLabel="date" style={styles.date}>
          {formatDate(item.date)}
        </Text>
        <Ionicons name="chevron-forward-outline" size={18} color="black" />
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
            <Text key={index} style={{ paddingVertical: 2 }}>
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
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  date: { fontWeight: '600', fontSize: 16, marginBottom: 8 },
  section_title: { fontWeight: '600', fontSize: 14, marginTop: 8 },
});
