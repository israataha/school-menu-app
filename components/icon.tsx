import { Feather, FontAwesome, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { StyleProp, TextStyle } from 'react-native';

// Define a type for the supported icon types
export type IconType = 'Ionicons' | 'Feather' | 'MaterialIcons' | 'MaterialCommunityIcons' | 'FontAwesome';

export type IconName =
  | keyof typeof Ionicons.glyphMap
  | keyof typeof Feather.glyphMap
  | keyof typeof MaterialIcons.glyphMap
  | keyof typeof MaterialCommunityIcons.glyphMap
  | keyof typeof FontAwesome.glyphMap;

export type IconProps = {
  type: IconType;
  name: IconName;
  size?: number;
  color?: string;
  style?: StyleProp<TextStyle>;
};

export function Icon(props: IconProps) {
  const { type, color, name, size = 24, ...otherProps } = props;
  const iconColor = color ?? '#fff';

  let IconComponent;
  switch (type) {
    case 'Feather':
      IconComponent = Feather;
      // Ensure name is a valid Feather icon name
      const featherName = name as keyof typeof Feather.glyphMap;
      return <IconComponent name={featherName} size={size} color={iconColor} {...otherProps} />;
    case 'MaterialIcons':
      IconComponent = MaterialIcons;
      // Ensure name is a valid MaterialIcons icon name
      const materialName = name as keyof typeof MaterialIcons.glyphMap;
      return <IconComponent name={materialName} size={size} color={iconColor} {...otherProps} />;
    case 'MaterialCommunityIcons':
      IconComponent = MaterialCommunityIcons;
      // Ensure name is a valid MaterialCommunityIcons icon name
      const materialCommunityName = name as keyof typeof MaterialCommunityIcons.glyphMap;
      return <IconComponent name={materialCommunityName} size={size} color={iconColor} {...otherProps} />;
    case 'FontAwesome':
      IconComponent = FontAwesome;
      // Ensure name is a valid FontAwesome icon name
      const fontAwesomeName = name as keyof typeof FontAwesome.glyphMap;
      return <IconComponent name={fontAwesomeName} size={size} color={iconColor} {...otherProps} />;
    case 'Ionicons':
    default:
      IconComponent = Ionicons;
      // Ensure name is a valid Ionicons icon name
      const ioniconsName = name as keyof typeof Ionicons.glyphMap;
      return <IconComponent name={ioniconsName} size={size} color={iconColor} {...otherProps} />;
  }
}
