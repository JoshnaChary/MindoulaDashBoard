import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '../../core/theme/colors';

interface AppIconProps {
  name: keyof typeof MaterialIcons.glyphMap;
  size?: number;
  color?: string;
  style?: any;
}

export const AppIcon: React.FC<AppIconProps> = ({
  name,
  size = 24,
  color = Colors.text.primary,
  style,
}) => {
  return <MaterialIcons name={name} size={size} color={color} style={style} />;
};
