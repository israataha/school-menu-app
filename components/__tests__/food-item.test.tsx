import { render, screen } from '@testing-library/react-native';

import { FoodItem } from '../food-item';

describe('FoodItem', () => {
  it('should not render food item if food is null', () => {
    const menu_item = {
      is_section_title: false,
      is_holiday: false,
      no_line_break: false,
      position: 0,
      text: '',
      food: null,
      category: null,
      serving_size_amount: null,
      serving_size_unit: null,
    };

    render(<FoodItem item={menu_item} />);

    expect(screen.queryByLabelText('food name')).toBeNull();
    expect(screen.queryByLabelText('food description')).toBeNull();
    expect(screen.queryByLabelText('contains')).toBeNull();
    expect(screen.queryByLabelText('nutrition information')).toBeNull();
  });

  it('should not render description if food description is empty', () => {
    const menu_item = {
      is_section_title: false,
      is_holiday: false,
      no_line_break: false,
      position: 0,
      text: '',
      food: {
        name: 'Chicken Tenders',
        description: '',
        image_url: 'https://assets.nutrislice.com/asset/serve/image/jpg/202955/thumbnail2',
        food_category: 'entree',
        has_nutrition_info: true,
        rounded_nutrition_info: {
          calories: 100,
          g_fat: 10,
          g_saturated_fat: 5,
          g_trans_fat: 0,
          mg_cholesterol: 100,
          g_carbs: 10,
          g_added_sugar: null,
          g_sugar: 0.0,
          mg_potassium: null,
          mg_sodium: 10,
          g_fiber: 10,
          g_protein: 10,
          mg_iron: 10,
          mg_calcium: 10,
          mg_vitamin_c: 10,
          iu_vitamin_a: null,
          re_vitamin_a: null,
          mcg_vitamin_a: null,
          mg_vitamin_d: null,
          mcg_vitamin_d: null,
        },
        icons: {
          myplate_icons: [],
        },
      },
      category: null,
      serving_size_amount: 2,
      serving_size_unit: 'each',
    };

    render(<FoodItem item={menu_item} />);

    expect(screen.queryByLabelText('food description')).toBeNull();
  });

  it('should not render allergen information if there are no allergens', () => {
    const menu_item = {
      is_section_title: false,
      is_holiday: false,
      no_line_break: false,
      position: 0,
      text: '',
      food: {
        name: 'Chicken Tenders',
        description: 'Delicious',
        image_url: 'https://assets.nutrislice.com/asset/serve/image/jpg/202955/thumbnail2',
        food_category: 'entree',
        has_nutrition_info: true,
        rounded_nutrition_info: {
          calories: 100,
          g_fat: 10,
          g_saturated_fat: 5,
          g_trans_fat: 0,
          mg_cholesterol: 100,
          g_carbs: 10,
          g_added_sugar: null,
          g_sugar: 0.0,
          mg_potassium: null,
          mg_sodium: 10,
          g_fiber: 10,
          g_protein: 10,
          mg_iron: 10,
          mg_calcium: 10,
          mg_vitamin_c: 10,
          iu_vitamin_a: null,
          re_vitamin_a: null,
          mcg_vitamin_a: null,
          mg_vitamin_d: null,
          mcg_vitamin_d: null,
        },
        icons: {
          myplate_icons: [],
        },
      },
      category: null,
      serving_size_amount: 2,
      serving_size_unit: 'each',
    };

    render(<FoodItem item={menu_item} />);

    expect(screen.queryByLabelText('allergens')).toBeNull();
  });

  it('should render food item with name, description, allergens, and nutrition information', () => {
    const menu_item = {
      is_section_title: false,
      is_holiday: false,
      no_line_break: false,
      position: 0,
      text: '',
      food: {
        name: 'Chicken Tenders',
        description: 'Delicious',
        image_url: 'https://assets.nutrislice.com/asset/serve/image/jpg/202955/thumbnail2',
        food_category: 'entree',
        has_nutrition_info: true,
        rounded_nutrition_info: {
          calories: 100,
          g_fat: 10,
          g_saturated_fat: 5,
          g_trans_fat: 0,
          mg_cholesterol: 100,
          g_carbs: 10,
          g_added_sugar: null,
          g_sugar: 0.0,
          mg_potassium: null,
          mg_sodium: 10,
          g_fiber: 10,
          g_protein: 10,
          mg_iron: 10,
          mg_calcium: 10,
          mg_vitamin_c: 10,
          iu_vitamin_a: null,
          re_vitamin_a: null,
          mcg_vitamin_a: null,
          mg_vitamin_d: null,
          mcg_vitamin_d: null,
        },
        icons: {
          myplate_icons: [
            {
              name: 'Protein',
              help_text: 'This contains protein',
              sort_order: 2,
            },
          ],
        },
      },
      category: null,
      serving_size_amount: 2,
      serving_size_unit: 'each',
    };

    const { getByLabelText } = render(<FoodItem item={menu_item} />);
    expect(getByLabelText('food name')).toBeDefined();
    expect(getByLabelText('food description')).toBeDefined();
    expect(getByLabelText('calories')).toBeDefined();
    expect(getByLabelText('allergens')).toBeDefined();
    expect(getByLabelText('nutrition information')).toBeDefined();
  });
});
