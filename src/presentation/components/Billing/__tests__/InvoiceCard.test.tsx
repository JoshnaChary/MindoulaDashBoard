import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import InvoiceCard from '../InvoiceCard';

describe('InvoiceCard', () => {
  const defaultProps = {
    title: 'October Invoice',
    amount: '$100.00',
    invoiceId: 'INV-001',
    dueDate: '2023-10-31',
    status: 'PAID',
    statusColor: 'green',
    onViewDetails: jest.fn(),
  };

  it('renders correctly', () => {
    const { getByText } = render(<InvoiceCard {...defaultProps} />);
    expect(getByText('October Invoice')).toBeTruthy();
    expect(getByText('$100.00')).toBeTruthy();
    expect(getByText(/INV-001/)).toBeTruthy();
    expect(getByText('PAID')).toBeTruthy();
  });

  it('triggers onViewDetails when pressed', () => {
    const { getByText } = render(<InvoiceCard {...defaultProps} />);
    fireEvent.press(getByText('View Details'));
    expect(defaultProps.onViewDetails).toHaveBeenCalled();
  });
});
