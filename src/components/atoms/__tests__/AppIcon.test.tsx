import React from 'react';
import { render } from '@testing-library/react-native';
import { AppIcon } from '../AppIcon';
import { Colors } from '../../../core/theme/colors';

describe('AppIcon', () => {
  it('renders correctly with default props', () => {
    const { getByTestId } = render(<AppIcon name="add" testID="app-icon" />);
    const icon = getByTestId('app-icon');

    expect(icon.props.name).toBe('add');
    expect(icon.props.size).toBe(24);
    expect(icon.props.color).toBe(Colors.text.primary);
  });

  it('renders correctly with custom props', () => {
    const { getByTestId } = render(
      <AppIcon name="close" size={32} color="red" testID="app-icon" />,
    );
    const icon = getByTestId('app-icon');

    expect(icon.props.name).toBe('close');
    expect(icon.props.size).toBe(32);
    expect(icon.props.color).toBe('red');
  });
});
