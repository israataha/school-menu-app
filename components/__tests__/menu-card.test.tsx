import { render } from '@testing-library/react-native';

import { MESSAGES } from '@/constants/messages';

import { MenuCard } from '../menu-card';

describe('MenuCard', () => {
  it('should render MenuCard with date and message when there are no menu items', () => {
    const { getByLabelText, getByText } = render(
      <MenuCard
        item={{
          date: '2025-09-01',
          menu_items: [],
        }}
      />,
    );
    expect(getByLabelText('date')).toBeDefined();
    expect(getByText(MESSAGES.EMPTY_STATES.NO_MENU_TODAY)).toBeDefined();
  });

  it('should render MenuCard with date and holiday if is_holiday is true', () => {
    const { getByLabelText, getByText } = render(
      <MenuCard
        item={{
          date: '2025-09-01',
          menu_items: [
            {
              is_section_title: false,
              no_line_break: false,
              is_holiday: true,
              position: 0,
              text: 'Labor Day',
              food: null,
              category: null,
              serving_size_amount: null,
              serving_size_unit: null,
            },
          ],
        }}
      />,
    );
    expect(getByLabelText('date')).toBeDefined();
    expect(getByLabelText('holiday')).toBeDefined();
    expect(getByText('Labor Day')).toBeDefined();
  });

  it('should render MenuCard with date and section title if is_section_title is true', () => {
    const { getByLabelText, getByText } = render(
      <MenuCard
        item={{
          date: '2025-09-01',
          menu_items: [
            {
              is_section_title: true,
              no_line_break: false,
              is_holiday: false,
              position: 0,
              text: 'Entrees',
              food: null,
              category: null,
              serving_size_amount: null,
              serving_size_unit: null,
            },
          ],
        }}
      />,
    );
    expect(getByLabelText('date')).toBeDefined();
    expect(getByLabelText('section title')).toBeDefined();
    expect(getByText('Entrees')).toBeDefined();
  });

  it('should render MenuCard with date and food item if food is not null', () => {
    const { getByLabelText, getByText } = render(
      <MenuCard
        item={{
          date: '2025-09-01',
          menu_items: [
            {
              is_section_title: false,
              no_line_break: false,
              is_holiday: false,
              position: 0,
              text: '',
              food: {
                name: 'Chicken Tenders',
                description: '',
                image_url: 'https://example.com/chicken.jpg',
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
            },
          ],
        }}
      />,
    );
    expect(getByLabelText('date')).toBeDefined();
    expect(getByText('Chicken Tenders')).toBeDefined();
  });
});
