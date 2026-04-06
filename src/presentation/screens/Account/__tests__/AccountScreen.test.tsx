import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import AccountScreen from '../AccountScreen';
import { Alert } from 'react-native';

// Mocks
jest.mock('../../components/MemberPortalLayout', () => ({ children }: any) => <>{children}</>);

describe('AccountScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders Settings tab by default', () => {
    const { getByText } = render(<AccountScreen />);

    expect(getByText('Account')).toBeTruthy();
    expect(getByText('Full Name:')).toBeTruthy();
    expect(getByText('Jane Doe')).toBeTruthy();
  });

  it('triggers alerts on setting actions', () => {
    const alertSpy = jest.spyOn(Alert, 'alert').mockImplementation(() => {});
    const { getByText } = render(<AccountScreen />);

    fireEvent.press(getByText('Edit'));
    expect(alertSpy).toHaveBeenCalledWith('Edit Name');

    const changeBtns = getByText('Change'); // This might find multiple, use getByText if unique or just find the one for email
    // Since there are two "Change" buttons, we'll use getAllByText if needed, but fireEvent.press works on the first one if found
  });

  it('triggers specific alerts for different settings', () => {
    const alertSpy = jest.spyOn(Alert, 'alert').mockImplementation(() => {});
    const { getAllByText } = render(<AccountScreen />);

    const changeBtns = getAllByText('Change');

    // First Change button (Email)
    fireEvent.press(changeBtns[0]);
    expect(alertSpy).toHaveBeenCalledWith('Change Email');

    // Second Change button (Password)
    fireEvent.press(changeBtns[1]);
    expect(alertSpy).toHaveBeenCalledWith('Change Password');
  });

  it('switches to Notifications tab', () => {
    const { getByText } = render(<AccountScreen />);

    fireEvent.press(getByText('Notifications'));
    expect(getByText('Content for Notifications coming soon...')).toBeTruthy();
  });

  it('switches to Delegate/Care Givers tab', () => {
    const { getByText } = render(<AccountScreen />);

    fireEvent.press(getByText('Delegate/Care Givers'));
    expect(getByText('Content for Delegate/Care Givers coming soon...')).toBeTruthy();
  });
});
