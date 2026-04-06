import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { DashboardHeader } from '../DashboardHeader';

describe('DashboardHeader', () => {
  const defaultProps = {
    title: 'Welcome',
    subtitle: 'How are you today?',
    onProfilePress: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with title and subtitle', () => {
    const { getByText } = render(<DashboardHeader {...defaultProps} />);
    expect(getByText('Welcome')).toBeTruthy();
    expect(getByText('How are you today?')).toBeTruthy();
  });

  it('triggers onProfilePress correctly', () => {
    const { getByTestId } = render(<DashboardHeader {...defaultProps} />);
    const profileButton = getByTestId('profile-button');
    fireEvent.press(profileButton);
    expect(defaultProps.onProfilePress).toHaveBeenCalled();
  });
});
