import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ActionCard } from '../ActionCard';

describe('ActionCard', () => {
  const defaultProps = {
    title: 'Update Profile',
    onPress: jest.fn(),
  };

  it('renders correctly with title', () => {
    const { getByText } = render(<ActionCard {...defaultProps} />);
    expect(getByText('Update Profile')).toBeTruthy();
  });

  it('triggers onPress correctly when the card is pressed', () => {
    const { getByText } = render(<ActionCard {...defaultProps} />);
    // The entire card is touchable
    fireEvent.press(getByText('Update Profile'));
    expect(defaultProps.onPress).toHaveBeenCalled();
  });
});
