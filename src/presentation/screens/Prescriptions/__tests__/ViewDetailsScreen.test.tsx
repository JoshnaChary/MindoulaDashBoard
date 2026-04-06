import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ViewDetailsScreen from '../ViewDetailsScreen';

// Mocks
const mockGoBack = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    goBack: mockGoBack,
  }),
  useRoute: jest.fn(),
}));

jest.mock('../../components/MemberPortalLayout', () => ({ children }: any) => <>{children}</>);

jest.mock('../../../core/utils/useResponsive', () => ({
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
  });

  it('renders null if no prescription in route params', () => {
    const { useRoute } = require('@react-navigation/native');
    useRoute.mockReturnValue({ params: {} });

    const { toJSON } = render(<ViewDetailsScreen />);
    expect(toJSON()).toBeNull();
  });

  it('renders prescription details correctly', () => {
    const { useRoute } = require('@react-navigation/native');
    useRoute.mockReturnValue({ params: { prescription: mockPrescription } });

    const { getByText } = render(<ViewDetailsScreen />);

    expect(getByText('Sertraline')).toBeTruthy();
    expect(getByText('Take one tablet by mouth.')).toBeTruthy();
    expect(getByText('50mg')).toBeTruthy();
    expect(getByText('Dr. Amar Sel')).toBeTruthy();
    expect(getByText('Weekly')).toBeTruthy();
  });

  it('navigates back when back button is pressed', () => {
    const { useRoute } = require('@react-navigation/native');
    useRoute.mockReturnValue({ params: { prescription: mockPrescription } });

    const { getByText } = render(<ViewDetailsScreen />);

    fireEvent.press(getByText('< Back to Prescriptions'));
    expect(mockGoBack).toHaveBeenCalled();
  });
});
