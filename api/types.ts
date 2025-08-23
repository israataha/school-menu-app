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
  no_line_break: boolean;
  position: number;
  text: string;
  food: Food | null;
  category: string | null;
  serving_size_amount: number | null;
  serving_size_unit: string | null;
};

export type Food = {
  name: string;
  description: string;
  image_url: string | null;
  food_category: string;
  has_nutrition_info: boolean;
  rounded_nutrition_info: NutritionInfo;
  icons: Icons;
};

export type NutritionInfo = {
  calories: number;
  g_fat: number | null;
  g_saturated_fat: number | null;
  g_trans_fat: number | null;
  mg_cholesterol: number | null;
  g_carbs: number | null;
  g_added_sugar: number | null;
  g_sugar: number | null;
  mg_potassium: number | null;
  mg_sodium: number | null;
  g_fiber: number | null;
  g_protein: number | null;
  mg_iron: number | null;
  mg_calcium: number | null;
  mg_vitamin_c: number | null;
  iu_vitamin_a: number | null;
  re_vitamin_a: number | null;
  mcg_vitamin_a: number | null;
  mg_vitamin_d: number | null;
  mcg_vitamin_d: number | null;
};

export type Icons = {
  myplate_icons: MyPlateIcons[];
};

export type MyPlateIcons = {
  name: string;
  help_text: string;
  sort_order: number;
};
