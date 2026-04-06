import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import RefillScreen from '../RefillScreen';
import { Alert } from 'react-native';
import * as ResponsiveUtility from '../../../../core/utils/useResponsive';
import { useNavigation } from '@react-navigation/native';

// Mocks
const mockGoBack = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

// Mock layout
jest.mock('../../../components/MemberPortalLayout', () => ({ children, title }: any) => (
  <>{children}</>
));

jest.mock('../../../../core/utils/useResponsive', () => ({
  useResponsive: jest.fn(),
}));

describe('RefillScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (ResponsiveUtility.useResponsive as jest.Mock).mockReturnValue({ isPhone: false });
    (useNavigation as jest.Mock).mockReturnValue({
      goBack: mockGoBack,
    });
  });

  it('renders correctly', () => {
    const { getByText, getAllByText, getByPlaceholderText } = render(<RefillScreen />);

    expect(getAllByText('Request Refill').length).toBeGreaterThan(0);
    expect(
      getByPlaceholderText('Enter any additional information for your provider...'),
    ).toBeTruthy();
  });

  it('triggers success alert and navigates back on request', () => {
    const alertSpy = jest.spyOn(Alert, 'alert').mockImplementation((title, message, buttons) => {
      if (buttons && buttons[0]?.onPress) {
        buttons[0].onPress();
      }
    });

    const { getAllByText } = render(<RefillScreen />);

    fireEvent.press(getAllByText('Request Refill')[1]); // The button
    expect(alertSpy).toHaveBeenCalledWith(
      'Success',
      'Refill requested successfully!',
      expect.any(Array),
    );
    expect(mockGoBack).toHaveBeenCalled();
  });

  it('navigates back on back button press', () => {
    const { getByText } = render(<RefillScreen />);

    fireEvent.press(getByText('< Back'));
    expect(mockGoBack).toHaveBeenCalled();
  });

  it('navigates back on cancel button press', () => {
    const { getByText } = render(<RefillScreen />);

    fireEvent.press(getByText('Cancel'));
    expect(mockGoBack).toHaveBeenCalled();
  });

  it('handles phone layout styles', () => {
    (ResponsiveUtility.useResponsive as jest.Mock).mockReturnValue({ isPhone: true });
    render(<RefillScreen />);
  });
});
