import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ViewDetailsScreen from '../ViewDetailsScreen';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as ResponsiveUtility from '../../../../core/utils/useResponsive';

// Mocks
const mockGoBack = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
  useRoute: jest.fn(),
}));

jest.mock('../../../components/MemberPortalLayout', () => ({ children }: any) => <>{children}</>);

jest.mock('../../../../core/utils/useResponsive', () => ({
  useResponsive: jest.fn(),
}));

describe('ViewDetailsScreen', () => {
  const mockPrescription = {
    id: 1,
    name: 'Sertraline',
    refills: 5,
    dosage: '50mg',
    frequency: 'Weekly',
    instructions: 'Take one tablet by mouth.',
    prescribedBy: 'Dr. Amar Sel',
    prescribedOn: 'March 4, 2026',
    route: 'Oral Tablet',
    validUntil: 'March 4, 2027',
    therapyType: 'Continous',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (ResponsiveUtility.useResponsive as jest.Mock).mockReturnValue({ isPhone: false });
    (useNavigation as jest.Mock).mockReturnValue({
      goBack: mockGoBack,
    });
  });

  it('renders null if no prescription in route params', () => {
    (useRoute as jest.Mock).mockReturnValue({ params: {} });

    const { toJSON } = render(<ViewDetailsScreen />);
    expect(toJSON()).toBeNull();
  });

  it('renders prescription details correctly', () => {
    (useRoute as jest.Mock).mockReturnValue({ params: { prescription: mockPrescription } });

    const { getByText } = render(<ViewDetailsScreen />);

    expect(getByText('Sertraline')).toBeTruthy();
    expect(getByText('Take one tablet by mouth.')).toBeTruthy();
    expect(getByText('50mg')).toBeTruthy();
    expect(getByText('Dr. Amar Sel')).toBeTruthy();
    expect(getByText('Weekly')).toBeTruthy();
  });

  it('navigates back when back button is pressed', () => {
    (useRoute as jest.Mock).mockReturnValue({ params: { prescription: mockPrescription } });

    const { getByText } = render(<ViewDetailsScreen />);

    fireEvent.press(getByText('< Back to Prescriptions'));
    expect(mockGoBack).toHaveBeenCalled();
  });
});
