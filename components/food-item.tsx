import { StyleSheet, Text, View } from 'react-native';

import { MenuItem } from '@/api/types';
import { MESSAGES } from '@/constants/messages';
import { colors } from '@/styles';

/**
 * A FoodItem component that displays the name, description, and nutritional information of a menu item.
 *
 * @param {MenuItem} item - the menu item to display
 * @returns {JSX.Element} the FoodItem component
 */
export const FoodItem = ({ item }: { item: MenuItem }) => {
  if (!item.food) return null;
  return (
    <View
      accessible={true}
      accessibilityHint="Contains nutritional information and allergens for this food item"
      style={[styles.card]}>
      <View style={styles.headerRow}>
        <Text style={styles.foodName} accessibilityLabel="food name">
          {item.food.name}
        </Text>
        <View style={styles.caloriesBadge} accessibilityLabel="calories">
          <Text style={styles.caloriesText}>
            {item.food.rounded_nutrition_info.calories} {MESSAGES.FOOD_LABELS.CALORIES}
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
          {MESSAGES.FOOD_LABELS.CONTAINS} {item.food.icons.myplate_icons.map(icon => icon.name).join(', ')}
        </Text>
      )}
      <Text style={styles.nutritionInfo} accessibilityLabel="nutrition information">
        {MESSAGES.FOOD_LABELS.CARBS} {item.food.rounded_nutrition_info.g_carbs} {MESSAGES.FOOD_LABELS.GRAMS} •{' '}
        {MESSAGES.FOOD_LABELS.FAT} {item.food.rounded_nutrition_info.g_fat} {MESSAGES.FOOD_LABELS.GRAMS} •{' '}
        {MESSAGES.FOOD_LABELS.PROTEIN} {item.food.rounded_nutrition_info.g_protein} {MESSAGES.FOOD_LABELS.GRAMS}
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
