/**
 * Represents the menu data returned by the Nutrislice API
 *
 * @param {string} start_date - string representing the start date of the menu in the format YYYY-MM-DD
 * @param {Day[]} days - array of Day objects representing the days of the week's menu
 * @param {string} last_updated - string representing the last updated date of the menu in ISO format
 */
export interface Menu {
  start_date: string;
  days: Day[];
  last_updated: string;
}

/**
 * Represents a day of the week's menu
 *
 * @param {string} date - string representing the date of the menu in the format YYYY-MM-DD
 * @param {MenuItem[]} menu_items - array of MenuItem objects representing the menu items for that day; can be an empty array
 */
export interface Day {
  date: string;
  menu_items: MenuItem[];
}

/**
 * Represents a menu item
 *
 * @param {boolean} is_section_title - boolean indicating whether the menu item is a section title (e.g., "Entrees", "Sides", etc.)
 * @param {boolean} is_holiday - boolean indicating whether the menu item is a holiday (e.g., "Labor Day")
 * @param {boolean} no_line_break - boolean indicating whether the menu item should have a line break
 * @param {number} position - number representing the position of the menu item in the list and usually dictates order
 * @param {string} text - string representing the name of the section or holiday; blank if it's a menu item
 * @param {Food | null} food - Food object representing the food associated with the menu item if it's not a section title or holiday
 * @param {string | null} category - string representing the category of the food associated with the menu item (e.g., entree, side, etc.)
 * @param {number | null} serving_size_amount - number representing the serving size amount of the food associated with the menu item (e.g., 60 g)
 * @param {string | null} serving_size_unit - string representing the serving size unit of the food associated with the menu item (e.g., "each")
 */
export interface MenuItem {
  is_section_title: boolean;
  is_holiday: boolean;
  no_line_break: boolean;
  position: number;
  text: string;
  food: Food | null;
  category: string | null;
  serving_size_amount: number | null;
  serving_size_unit: string | null;
}

/**
 * Represents the food associated with a menu item
 *
 * @param {string} name - string representing the name of the food
 * @param {string} description - string representing the description of the food
 * @param {string} image_url - string representing the URL of the food's image
 * @param {string} food_category - string representing the category of the food (e.g., entree, side, etc.); not always populated
 * @param {boolean} has_nutrition_info - boolean indicating whether the food has nutrition information
 * @param {NutritionInfo} rounded_nutrition_info - NutritionInfo object representing the nutrition information of the food
 * @param {Icons} icons - Icons object representing the icons associated with the food, used for getting food type and allergens (grain, dairy, etc.)
 */
export interface Food {
  name: string;
  description: string;
  image_url: string | null;
  food_category: string;
  has_nutrition_info: boolean;
  rounded_nutrition_info: NutritionInfo;
  icons: Icons;
}

/**
 * Represents the nutrition information of a food
 *
 * @param {number} calories - number representing the calories
 * @param {number} g_fat - number representing the grams of fat
 * @param {number} g_saturated_fat - number representing the grams of saturated fat
 * @param {number} g_trans_fat - number representing the grams of trans fat
 * @param {number} mg_cholesterol - number representing the milligrams of cholesterol
 * @param {number} g_carbs - number representing the grams of carbs
 * @param {number} g_added_sugar - number representing the grams of added sugar
 * @param {number} g_sugar - number representing the grams of sugar
 * @param {number} mg_potassium - number representing the milligrams of potassium
 * @param {number} mg_sodium - number representing the milligrams of sodium
 * @param {number} g_fiber - number representing the grams of fiber
 * @param {number} g_protein - number representing the grams of protein
 * @param {number} mg_iron - number representing the milligrams of iron
 * @param {number} mg_calcium - number representing the milligrams of calcium
 * @param {number} mg_vitamin_c - number representing the milligrams of vitamin C
 * @param {number} iu_vitamin_a - number representing the IU of vitamin A
 * @param {number} re_vitamin_a - number representing the RE of vitamin A
 * @param {number} mcg_vitamin_a - number representing the MCG of vitamin A
 * @param {number} mg_vitamin_d - number representing the milligrams of vitamin D
 * @param {number} mcg_vitamin_d - number representing the milligrams of vitamin D
 */
export interface NutritionInfo {
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
}

/**
 * Represents the icons associated with a food, used for getting food type and allergens (grain, dairy, etc.)
 *
 * @param {MyPlateIcons[]} myplate_icons - array of MyPlateIcons objects representing the icons associated with the food
 */
export interface Icons {
  myplate_icons: MyPlateIcons[];
}

/**
 * Represents an icon associated with a food, used for getting food type and allergens (grain, dairy, etc.)
 *
 * @param {string} name - string representing the name of the icon (e.g. Protein, Grain, Fruit, Dairy, etc.)
 * @param {string} help_text - string representing the help text associated with the icon
 * @param {number} sort_order - number representing the sort order of the icon (not currently used)
 */
export interface MyPlateIcons {
  name: string;
  help_text: string;
  sort_order: number;
}
