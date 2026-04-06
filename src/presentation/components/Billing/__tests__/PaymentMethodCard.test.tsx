import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import PaymentMethodCard from '../PaymentMethodCard';
import * as ResponsiveUtility from '../../../../core/utils/useResponsive';
import { Platform } from 'react-native';

jest.mock('../../../../core/utils/useResponsive', () => ({
  useResponsive: jest.fn(),
}));

describe('PaymentMethodCard', () => {
  const defaultProps = {
    cardType: 'Visa',
    cardNumber: '************1234',
    expiryDate: '12/24',
    addedDate: '2023-01-01',
    isDefault: false,
    onRemove: jest.fn(),
    onSetDefault: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    Platform.OS = 'ios'; // Reset to default
  });

  it('renders card info correctly', () => {
    (ResponsiveUtility.useResponsive as jest.Mock).mockReturnValue({ isPhone: false });
    const { getByText } = render(<PaymentMethodCard {...defaultProps} />);
    expect(getByText('Visa ending in 1234')).toBeTruthy();
    expect(getByText(/Expires 12\/24/)).toBeTruthy();
  });

  it('renders default badge when isDefault is true', () => {
    (ResponsiveUtility.useResponsive as jest.Mock).mockReturnValue({ isPhone: false });
    const { getByText, queryByText } = render(<PaymentMethodCard {...defaultProps} isDefault />);
    expect(getByText('DEFAULT')).toBeTruthy();
    expect(queryByText('Set Default')).toBeNull();
  });

  it('triggers onSetDefault', () => {
    (ResponsiveUtility.useResponsive as jest.Mock).mockReturnValue({ isPhone: false });
    const { getByText } = render(<PaymentMethodCard {...defaultProps} />);
    fireEvent.press(getByText('Set Default'));
    expect(defaultProps.onSetDefault).toHaveBeenCalled();
  });

  it('triggers onRemove', () => {
    (ResponsiveUtility.useResponsive as jest.Mock).mockReturnValue({ isPhone: false });
    const { getByText } = render(<PaymentMethodCard {...defaultProps} />);
    fireEvent.press(getByText('Remove'));
    expect(defaultProps.onRemove).toHaveBeenCalled();
  });

  it('handles phone layout', () => {
    (ResponsiveUtility.useResponsive as jest.Mock).mockReturnValue({ isPhone: true });
    const { getByText } = render(<PaymentMethodCard {...defaultProps} />);
    expect(getByText('Visa ending in 1234')).toBeTruthy();
  });

  it('handles web platform styles', () => {
    Platform.OS = 'web';
    (ResponsiveUtility.useResponsive as jest.Mock).mockReturnValue({ isPhone: false });

    const { getByText } = render(<PaymentMethodCard {...defaultProps} />);
    expect(getByText('Visa ending in 1234')).toBeTruthy();
    // Platform-specific actions alignment check could be added here if needed
  });
});
