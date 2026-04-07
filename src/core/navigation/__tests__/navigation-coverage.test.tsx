import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { CustomDrawerContent } from '../CustomDrawerContent';
import { MainDrawerNavigator } from '../MainDrawerNavigator';
import { RootNavigator } from '../RootNavigator';
import { AppConstants } from '../../constants/AppConstants';

import { useResponsive } from '../../utils/useResponsive';

jest.mock('../../utils/useResponsive', () => ({
  useResponsive: jest.fn(),
}));

describe('Navigation coverage helpers', () => {
  it('CustomDrawerContent renders and calls navigation.navigate on press', () => {
    const navigate = jest.fn();

    const props: any = {
      navigation: { navigate },
      state: {
        routeNames: [AppConstants.screens.dashboard],
        index: 0,
      },
    };

    const { getByText } = render(<CustomDrawerContent {...props} />);

    fireEvent.press(getByText('Home'));
    expect(navigate).toHaveBeenCalledWith(AppConstants.screens.dashboard);

    fireEvent.press(getByText('Messages'));
    expect(navigate).toHaveBeenCalledWith(AppConstants.screens.messages);

    fireEvent.press(getByText('Appointments'));
    expect(navigate).toHaveBeenCalledWith(AppConstants.screens.appointments);

    fireEvent.press(getByText('Prescriptions'));
    expect(navigate).toHaveBeenCalledWith(AppConstants.screens.prescriptions);

    fireEvent.press(getByText('Lab results'));
    expect(navigate).toHaveBeenCalledWith(AppConstants.screens.labResults);

    fireEvent.press(getByText('Questionnaires'));
    expect(navigate).toHaveBeenCalledWith(AppConstants.screens.questionnaires);

    fireEvent.press(getByText('Documents'));
    expect(navigate).toHaveBeenCalledWith(AppConstants.screens.documents);

    fireEvent.press(getByText('Insurance'));
    expect(navigate).toHaveBeenCalledWith(AppConstants.screens.insurance);

    fireEvent.press(getByText('Billing'));
    expect(navigate).toHaveBeenCalledWith(AppConstants.screens.billing);

    fireEvent.press(getByText('Account'));
    expect(navigate).toHaveBeenCalledWith(AppConstants.screens.account);
  });

  it('MainDrawerNavigator builds drawer navigator', () => {
    const element = MainDrawerNavigator();
    expect(element).toBeTruthy();
  });

  it('RootNavigator builds stack navigator for phone and non-phone', () => {
    (useResponsive as jest.Mock).mockReturnValue({ isPhone: true });
    const phoneElement = RootNavigator();
    expect(phoneElement).toBeTruthy();

    (useResponsive as jest.Mock).mockReturnValue({ isPhone: false });
    const desktopElement = RootNavigator();
    expect(desktopElement).toBeTruthy();
  });
});
