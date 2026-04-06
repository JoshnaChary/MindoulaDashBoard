import React from 'react';
import { render } from '@testing-library/react-native';
import ChargeCard from '../ChargeCard';

describe('ChargeCard', () => {
  const defaultProps = {
    title: 'Consultation',
    amount: '$50.00',
    quantity: 1,
    serviceDate: '2023-10-01',
  };

  it('renders title, amount and details', () => {
    const { getByText } = render(<ChargeCard {...defaultProps} />);
    expect(getByText('Consultation')).toBeTruthy();
    expect(getByText('$50.00')).toBeTruthy();
    expect(getByText(/Date: 2023-10-01 • Qty: 1/)).toBeTruthy();
  });

  it('renders note when provided', () => {
    const { getByText } = render(<ChargeCard {...defaultProps} note="Initial visit" />);
    expect(getByText('Initial visit')).toBeTruthy();
  });
});
