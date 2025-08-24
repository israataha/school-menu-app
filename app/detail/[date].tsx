import { useLocalSearchParams } from 'expo-router';
import { ScrollView, Text } from 'react-native';

import { FoodItem } from '@/components/food-item';
import { formatDate } from '@/utils';

import { useMenuData } from '../../api/menu';

export default function Detail() {
  const { date } = useLocalSearchParams<{ date: string }>();

  const data = useMenuData('2025-08-26');

  return (
    <ScrollView style={{ padding: 20 }}>
      <Text style={{ fontWeight: '600', fontSize: 20, alignSelf: 'center' }}>
        {formatDate(date, { weekday: 'long', month: 'short', day: 'numeric' })}
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
