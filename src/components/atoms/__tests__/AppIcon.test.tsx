import React from 'react';
import { render } from '@testing-library/react-native';
import { AppIcon } from '../AppIcon';
import { Colors } from '../../../core/theme/colors';
import { MaterialIcons } from '@expo/vector-icons';

describe('AppIcon', () => {
  it('renders correctly with default props', () => {
    const { UNSAFE_getByType } = render(<AppIcon name="add" />);
    const icon = UNSAFE_getByType(MaterialIcons);

    expect(icon.props.name).toBe('add');
    expect(icon.props.size).toBe(24);
    expect(icon.props.color).toBe(Colors.text.primary);
  });

  it('renders correctly with custom props', () => {
    const { UNSAFE_getByType } = render(<AppIcon name="close" size={32} color="red" />);
    const icon = UNSAFE_getByType(MaterialIcons);

    expect(icon.props.name).toBe('close');
    expect(icon.props.size).toBe(32);
    expect(icon.props.color).toBe('red');
  });
});
