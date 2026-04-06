import React from 'react';
import { render } from '@testing-library/react-native';
import Badge from '../Badge';
import { StyleSheet } from 'react-native';

describe('Badge', () => {
  it('renders correctly with label', () => {
    const { getByText } = render(<Badge label="Test Badge" />);
    expect(getByText('Test Badge')).toBeTruthy();
  });

  it('renders with custom color', () => {
    const { getByText } = render(<Badge label="Blue Badge" color="blue" />);
    const text = getByText('Blue Badge');
    // StyleSheet.flatten correctly resolves nested style arrays
    const flatStyle = StyleSheet.flatten(text.props.style);
    expect(flatStyle.color).toBe('blue');
  });
});
