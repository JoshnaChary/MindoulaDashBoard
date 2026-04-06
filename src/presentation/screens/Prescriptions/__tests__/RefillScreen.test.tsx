import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import RefillScreen from '../RefillScreen';
import { Alert } from 'react-native';
import * as ResponsiveUtility from '../../../core/utils/useResponsive';

// Mocks
const mockGoBack = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    goBack: mockGoBack,
  }),
}));

jest.mock('../../components/MemberPortalLayout', () => ({ children }: any) => <>{children}</>);

jest.mock('../../../core/utils/useResponsive', () => ({
  useResponsive: jest.fn(),
}));

describe('RefillScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    (ResponsiveUtility.useResponsive as jest.Mock).mockReturnValue({ isPhone: false });
    const { getByText, getByPlaceholderText } = render(<RefillScreen />);

    expect(getByText('Request Refill')).toBeTruthy();
    expect(
      getByPlaceholderText('Enter any additional information for your provider...'),
    ).toBeTruthy();
  });

  it('triggers success alert and navigates back on request', () => {
    (ResponsiveUtility.useResponsive as jest.Mock).mockReturnValue({ isPhone: false });
    const alertSpy = jest.spyOn(Alert, 'alert').mockImplementation((title, message, buttons) => {
      // Execute the OK button callback
      if (buttons && buttons[0]?.onPress) {
        buttons[0].onPress();
      }
    });

    const { getByText } = render(<RefillScreen />);

    fireEvent.press(getByText('Request Refill'));
    expect(alertSpy).toHaveBeenCalledWith(
      'Success',
      'Refill requested successfully!',
      expect.any(Array),
    );
    expect(mockGoBack).toHaveBeenCalled();
  });

  it('navigates back on back button press', () => {
    (ResponsiveUtility.useResponsive as jest.Mock).mockReturnValue({ isPhone: false });
    const { getByText } = render(<RefillScreen />);

    fireEvent.press(getByText('< Back'));
    expect(mockGoBack).toHaveBeenCalled();
  });

  it('navigates back on cancel button press', () => {
    (ResponsiveUtility.useResponsive as jest.Mock).mockReturnValue({ isPhone: false });
    const { getByText } = render(<RefillScreen />);

    fireEvent.press(getByText('Cancel'));
    expect(mockGoBack).toHaveBeenCalled();
  });

  it('handles phone layout styles', () => {
    (ResponsiveUtility.useResponsive as jest.Mock).mockReturnValue({ isPhone: true });
    render(<RefillScreen />);
    // Just need to hit the responsive style branches
  });
});
