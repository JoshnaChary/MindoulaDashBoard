import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import BillingScreen from '../BillingScreen';
import * as ResponsiveUtility from '../../../core/utils/useResponsive';
import { Alert } from 'react-native';

// Mocks
jest.mock('../../../core/utils/useResponsive', () => ({
  useResponsive: jest.fn(),
}));

jest.mock('../../components/MemberPortalLayout', () => ({ children }: any) => <>{children}</>);

describe('BillingScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders Outstanding tab by default', () => {
    (ResponsiveUtility.useResponsive as jest.Mock).mockReturnValue({ isPhone: false });
    const { getByText, getAllByText } = render(<BillingScreen />);

    expect(getByText('Total outstanding balance:')).toBeTruthy();
    expect(getByText('$360.00')).toBeTruthy();
    // BillingCard for item 1
    expect(getAllByText('Follow Up - Medication Review').length).toBeGreaterThan(0);
  });

  it('switches to History tab', () => {
    (ResponsiveUtility.useResponsive as jest.Mock).mockReturnValue({ isPhone: false });
    const { getByText } = render(<BillingScreen />);

    fireEvent.press(getByText('History'));
    expect(getByText('Filter by date')).toBeTruthy();
    expect(getByText('All time')).toBeTruthy();
  });

  it('switches to Payment tab and handles actions', () => {
    (ResponsiveUtility.useResponsive as jest.Mock).mockReturnValue({ isPhone: false });
    const alertSpy = jest.spyOn(Alert, 'alert').mockImplementation(() => {});
    const { getByText } = render(<BillingScreen />);

    fireEvent.press(getByText('Payment'));
    expect(getByText(/Card details are stored securely/)).toBeTruthy();

    const addBtn = getByText('Add New Card');
    fireEvent.press(addBtn);
    expect(alertSpy).toHaveBeenCalledWith('Add New Card');

    const removeBtn = getByText('Remove');
    fireEvent.press(removeBtn);
    expect(alertSpy).toHaveBeenCalledWith('Remove Card');

    const setDefaultBtn = getByText('Set Default');
    fireEvent.press(setDefaultBtn);
    expect(alertSpy).toHaveBeenCalledWith('Set Default');
  });

  it('transitions to Invoice Details view and back', () => {
    (ResponsiveUtility.useResponsive as jest.Mock).mockReturnValue({ isPhone: false });
    const { getByText, queryByText, getAllByText } = render(<BillingScreen />);

    // Press "View Details" on the first BillingCard in Outstanding tab
    const viewDetailsBtns = getAllByText('View Details');
    fireEvent.press(viewDetailsBtns[0]);

    expect(getByText('< Back to Billing')).toBeTruthy();
    expect(getByText('Charges:')).toBeTruthy();
    expect(getByText('Dr. J. Kim, Northern Clinic')).toBeTruthy();

    // Go back
    fireEvent.press(getByText('< Back to Billing'));
    expect(queryByText('Charges:')).toBeNull();
    expect(getByText('Billing')).toBeTruthy();
  });

  it('handles phone layout in Outstanding tab', () => {
    (ResponsiveUtility.useResponsive as jest.Mock).mockReturnValue({ isPhone: true });
    const { getByText } = render(<BillingScreen />);
    expect(getByText('$360.00')).toBeTruthy();
  });

  it('handles phone layout in Details view', () => {
    (ResponsiveUtility.useResponsive as jest.Mock).mockReturnValue({ isPhone: true });
    const { getAllByText, getByText } = render(<BillingScreen />);

    const viewDetailsBtns = getAllByText('View Details');
    fireEvent.press(viewDetailsBtns[0]);

    expect(getByText('$180.50')).toBeTruthy();
  });

  it('allows clicking Filter by date select', () => {
    (ResponsiveUtility.useResponsive as jest.Mock).mockReturnValue({ isPhone: false });
    const { getByText } = render(<BillingScreen />);
    fireEvent.press(getByText('History'));

    // Just click it to cover the TouchableOpacity
    fireEvent.press(getByText('All time'));
  });
});
