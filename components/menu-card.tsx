import { Pressable, StyleSheet, Text } from 'react-native';

import type { Day } from '@/api/types';

export const MenuCard = ({ item }: { item: Day }) => {
  return (
    <Pressable style={styles.card}>
      <Text style={styles.date}>
        {new Date(`${item.date}T00:00:00.000`).toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
        })}
      </Text>
      {item.menu_items.length === 0 ? (
        <Text style={{ fontStyle: 'italic' }}>There is currently nothing on the menu today.</Text>
      ) : (
        item.menu_items.map((item, index) => {
          if (item.is_section_title || item.is_holiday)
            return (
              <Text key={index} style={styles.section_title}>
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
