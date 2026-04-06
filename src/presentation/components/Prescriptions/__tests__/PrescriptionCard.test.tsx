import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import PrescriptionCard from '../PrescriptionCard';
import * as ResponsiveUtility from '../../../../core/utils/useResponsive';

jest.mock('../../../../core/utils/useResponsive', () => ({
  useResponsive: jest.fn(),
}));

describe('PrescriptionCard', () => {
  const item = {
    name: 'Amoxicillin',
    refills: 1,
    dosage: '500mg',
    frequency: 'Once daily',
  };

  const defaultProps = {
    item,
    onViewDetails: jest.fn(),
    onRequestRefill: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly on desktop', () => {
    (ResponsiveUtility.useResponsive as jest.Mock).mockReturnValue({ isPhone: false });
    const { getByText } = render(<PrescriptionCard {...defaultProps} />);

    expect(getByText('Amoxicillin')).toBeTruthy();
    expect(getByText(/500mg/)).toBeTruthy();
    expect(getByText(/1 refills/)).toBeTruthy();
  });

  it('renders correctly on phone', () => {
    (ResponsiveUtility.useResponsive as jest.Mock).mockReturnValue({ isPhone: true });
    const { getByText } = render(<PrescriptionCard {...defaultProps} />);

    // On phone, we expect the same data but different layout (not strictly testable via RTL without snapshots)
    expect(getByText('Amoxicillin')).toBeTruthy();
  });

  it('triggers onViewDetails correctly', () => {
    (ResponsiveUtility.useResponsive as jest.Mock).mockReturnValue({ isPhone: false });
    const { getByText } = render(<PrescriptionCard {...defaultProps} />);

    fireEvent.press(getByText('View Details'));
    expect(defaultProps.onViewDetails).toHaveBeenCalled();
  });

  it('triggers onRequestRefill correctly', () => {
    (ResponsiveUtility.useResponsive as jest.Mock).mockReturnValue({ isPhone: false });
    const { getByText } = render(<PrescriptionCard {...defaultProps} />);

    fireEvent.press(getByText('Request Refill'));
    expect(defaultProps.onRequestRefill).toHaveBeenCalled();
  });
});
