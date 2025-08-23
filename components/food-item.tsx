import { StyleSheet, Text, View } from 'react-native';

import { MenuItem } from '@/api/types';

export const FoodItem = ({ item }: { item: MenuItem }) => {
  if (!item.food) return null;
  return (
    <View style={[styles.card, { paddingBottom: 20 }]}>
      {/* {item.food.image_url && <Image source={{ uri: item.food.image_url }} style={{ height: 200 }} />} */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 4 }}>
        <Text style={{ fontWeight: '600', fontSize: 14 }}>{item.food.name}</Text>
        <View style={styles.caloriesBadge}>
          <Text style={{ fontWeight: 'bold', fontSize: 12, color: 'white' }}>
            {item.food.rounded_nutrition_info.calories} cal{' '}
          </Text>
        </View>
      </View>
      {item.food.description && <Text style={{ paddingBottom: 4 }}>{item.food.description}</Text>}
      <Text style={{ paddingBottom: 4 }}>
        Contains: {item.food.icons.myplate_icons.map(icon => icon.name).join(', ')}
      </Text>
      <Text style={{ fontSize: 12 }}>
        Carbs: {item.food.rounded_nutrition_info.g_carbs} g • Fat: {item.food.rounded_nutrition_info.g_fat} g • Protein:{' '}
        {item.food.rounded_nutrition_info.g_protein} g
      </Text>
    </View>
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
  caloriesBadge: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
});
