import { StyleSheet, Text, View } from 'react-native';

import { MenuItem } from '@/api/types';
import { colors } from '@/styles';

export const FoodItem = ({ item }: { item: MenuItem }) => {
  if (!item.food) return null;
  return (
    <View accessible={true} style={[styles.card]}>
      <View style={styles.headerRow}>
        <Text style={styles.foodName} accessibilityLabel="food name">
          {item.food.name}
        </Text>
        <View style={styles.caloriesBadge}>
          <Text style={styles.caloriesText} accessibilityLabel="calories">
            {item.food.rounded_nutrition_info.calories} cal{' '}
          </Text>
        </View>
      </View>
      {item.food.description && (
        <Text style={styles.description} accessibilityLabel="food description">
          {item.food.description}
        </Text>
      )}
      {item.food.icons.myplate_icons.length > 0 && (
        <Text style={styles.myplateIcons} accessibilityLabel="allergens">
          Contains: {item.food.icons.myplate_icons.map(icon => icon.name).join(', ')}
        </Text>
      )}
      <Text style={styles.nutritionInfo} accessibilityLabel="nutrition information">
        Carbs: {item.food.rounded_nutrition_info.g_carbs} g • Fat: {item.food.rounded_nutrition_info.g_fat} g • Protein:{' '}
        {item.food.rounded_nutrition_info.g_protein} g
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 4,
  },
  foodName: {
    fontWeight: '600',
    fontSize: 14,
  },
  caloriesBadge: {
    backgroundColor: colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  caloriesText: {
    fontWeight: 'bold',
    fontSize: 12,
    color: colors.buttonText,
  },
  description: {
    paddingBottom: 8,
    fontSize: 12,
    color: colors.textSecondary,
  },
  myplateIcons: {
    paddingBottom: 8,
    fontSize: 12,
    fontStyle: 'italic',
  },
  nutritionInfo: {
    fontSize: 12,
  },
});
