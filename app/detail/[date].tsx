import { useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, Text } from 'react-native';

import { FoodItem } from '@/components/food-item';
import { colors } from '@/styles';
import { formatDate } from '@/utils';

import { useMenuData } from '../../api/menu';

export default function Detail() {
  const { date } = useLocalSearchParams<{ date: string }>();
  const data = useMenuData('2025-08-26');
  const { weekday, month, day } = formatDate(date, { month: 'short' });

  return (
    <ScrollView style={styles.container}>
      <Text style={{ fontWeight: '600', fontSize: 18, alignSelf: 'center', marginBottom: 10 }}>
        {weekday}, {month} {day}
      </Text>
      {data?.menu_items.map((item, index) => {
        if (item.is_section_title || item.is_holiday)
          return (
            <Text key={index} style={{ fontWeight: '600', fontSize: 16, paddingVertical: 10 }}>
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
});
