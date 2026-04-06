import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import BillingTabs from '../BillingTabs';
import { Colors } from '../../../../core/theme/colors';

describe('BillingTabs', () => {
  const options = ['Invoices', 'Charges', 'Payment Methods'];
  const onTabChange = jest.fn();

  it('renders all tab options', () => {
    const { getByText } = render(
      <BillingTabs options={options} activeTab="Invoices" onTabChange={onTabChange} />,
    );
    expect(getByText('Invoices')).toBeTruthy();
    expect(getByText('Charges')).toBeTruthy();
    expect(getByText('Payment Methods')).toBeTruthy();
  });

  it('highlights the active tab', () => {
    const { getByText } = render(
      <BillingTabs options={options} activeTab="Invoices" onTabChange={onTabChange} />,
    );
    // Invoices is active
    expect(getByText('Invoices').props.style).toContainEqual(
      expect.objectContaining({ color: Colors.primary }),
    );
    // Charges is inactive
    expect(getByText('Charges').props.style).toContainEqual(
      expect.objectContaining({ color: Colors.text.secondary }),
    );
  });

  it('triggers onTabChange when a tab is pressed', () => {
    const { getByText } = render(
      <BillingTabs options={options} activeTab="Invoices" onTabChange={onTabChange} />,
    );
    fireEvent.press(getByText('Charges'));
    expect(onTabChange).toHaveBeenCalledWith('Charges');
  });
});
