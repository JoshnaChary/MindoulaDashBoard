import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import PrescriptionScreen from '../PrescriptionScreen';
import * as ResponsiveUtility from '../../../../core/utils/useResponsive';
import { AppConstants } from '../../../../core/constants/AppConstants';
import { useNavigation } from '@react-navigation/native';

// Mocks
const mockNavigate = jest.fn();
const mockGoBack = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

jest.mock('../../../../core/utils/useResponsive', () => ({
  useResponsive: jest.fn(),
}));

jest.mock('../../../components/MemberPortalLayout', () => ({ children }: any) => <>{children}</>);

describe('PrescriptionScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (ResponsiveUtility.useResponsive as jest.Mock).mockReturnValue({ isPhone: false });
    (useNavigation as jest.Mock).mockReturnValue({
      navigate: mockNavigate,
      goBack: mockGoBack,
    });
  });

  it('renders prescriptions list', () => {
    const { getByText } = render(<PrescriptionScreen />);

    expect(getByText('Your Prescriptions')).toBeTruthy();
    expect(getByText('Sertraline')).toBeTruthy();
    expect(getByText('Lorazepam')).toBeTruthy();
  });

  it('navigates to dashboard on back button press', () => {
    const { getByText } = render(<PrescriptionScreen />);

    fireEvent.press(getByText('< Back to Dashboard'));
    expect(mockNavigate).toHaveBeenCalledWith(AppConstants.screens.dashboard);
  });

  it('navigates to view details screen', () => {
    const { getAllByText } = render(<PrescriptionScreen />);

    const viewDetailsBtns = getAllByText('View Details');
    fireEvent.press(viewDetailsBtns[0]);

    expect(mockNavigate).toHaveBeenCalledWith(
      AppConstants.screens.viewDetails,
      expect.objectContaining({
        prescription: expect.objectContaining({ name: 'Sertraline' }),
      }),
    );
  });

  it('navigates to refill request screen', () => {
    const { getAllByText } = render(<PrescriptionScreen />);

    const refillBtns = getAllByText('Request Refill');
    fireEvent.press(refillBtns[0]);

    expect(mockNavigate).toHaveBeenCalledWith(
      AppConstants.screens.refillRequest,
      expect.objectContaining({
        prescription: expect.objectContaining({ name: 'Sertraline' }),
      }),
    );
  });
});
