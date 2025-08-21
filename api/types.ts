export type Menu = {
  start_date: string;
  days: Day[];
  last_updated: string;
};

export type Day = {
  date: string;
  menu_items: MenuItem[];
};

export type MenuItem = {
  is_section_title: boolean;
  is_holiday: boolean;
  text: string;
  food: Food | null;
  category: string | null;
  serving_size_amount: number;
  serving_size_unit: string;
};

export type Food = {
  name: string;
  description: string;
  image_url: string;
  food_category: string;
  has_nutrition_info: boolean;
  rounded_nutrition_info: NutritionInfo;
};

export type NutritionInfo = {
  calories: number;
  g_fat: number;
  g_saturated_fat: number;
  g_trans_fat: number;
  mg_cholesterol: number;
  g_carbs: number;
  g_added_sugar: number | null;
  g_sugar: number;
  mg_potassium: number | null;
  mg_sodium: number;
  g_fiber: number;
  g_protein: number;
  mg_iron: number;
  mg_calcium: number;
  mg_vitamin_c: number;
  iu_vitamin_a: number | null;
  re_vitamin_a: number | null;
  mcg_vitamin_a: number | null;
  mg_vitamin_d: number | null;
  mcg_vitamin_d: number | null;
};
