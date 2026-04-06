import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import BillingCard from '../BillingCard';

describe('BillingCard', () => {
  const item = {
    title: 'Consultation Fee',
    amount: '$150.00',
    invoiceId: 'INV-001',
    dueDate: 'Apr 10, 2024',
    status: 'Pending',
    statusColor: '#E53E3E',
    indicatorColor: '#3182CE',
  };

  const onViewDetails = jest.fn();

  it('renders correctly', () => {
    const { getByText } = render(<BillingCard item={item} onViewDetails={onViewDetails} />);
    expect(getByText('Consultation Fee')).toBeTruthy();
    expect(getByText('$150.00')).toBeTruthy();
    expect(getByText(/Invoice ID: INV-001/)).toBeTruthy();
  });

  it('triggers onViewDetails correctly', () => {
    const { getByText } = render(<BillingCard item={item} onViewDetails={onViewDetails} />);
    fireEvent.press(getByText('View Details'));
    expect(onViewDetails).toHaveBeenCalled();
  });
});
