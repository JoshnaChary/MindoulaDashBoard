import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import MemberPortalLayout from '../MemberPortalLayout';
import * as ResponsiveUtility from '../../../core/utils/useResponsive';
// import { DrawerActions } from '@react-navigation/native';
import { AppConstants } from '../../../core/constants/AppConstants';

// Mocks
jest.mock('../../../core/utils/useResponsive', () => ({
  useResponsive: jest.fn(),
}));

const mockDispatch = jest.fn();
const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    dispatch: mockDispatch,
    navigate: mockNavigate,
  }),
  DrawerActions: {
    toggleDrawer: jest.fn(() => ({ type: 'TOGGLE_DRAWER' })),
  },
}));

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 20, bottom: 0, left: 0, right: 0 }),
}));

describe('MemberPortalLayout', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders title correctly', () => {
    (ResponsiveUtility.useResponsive as jest.Mock).mockReturnValue({
      isMobile: false,
      isDesktop: true,
      isTablet: false,
    });
    const { getByText } = render(
      <MemberPortalLayout title="Custom Portal">
        <></>
      </MemberPortalLayout>,
    );
    expect(getByText('Custom Portal')).toBeTruthy();
  });

  it('shows menu button on mobile/tablet and toggles drawer', () => {
    (ResponsiveUtility.useResponsive as jest.Mock).mockReturnValue({
      isMobile: true,
      isDesktop: false,
      isTablet: true,
    });
    const { getByTestId } = render(
      <MemberPortalLayout>
        <></>
      </MemberPortalLayout>,
    );
    const menuBtn = getByTestId('menu-button');
    fireEvent.press(menuBtn);
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'TOGGLE_DRAWER' });
  });

  it('shows sidebar on desktop', () => {
    (ResponsiveUtility.useResponsive as jest.Mock).mockReturnValue({
      isMobile: false,
      isDesktop: true,
      isTablet: false,
    });
    const { getByText } = render(
      <MemberPortalLayout>
        <></>
      </MemberPortalLayout>,
    );
    expect(getByText('Home')).toBeTruthy();
    expect(getByText('Messages')).toBeTruthy();
  });

  it('navigates when sidebar items are pressed', () => {
    (ResponsiveUtility.useResponsive as jest.Mock).mockReturnValue({
      isMobile: false,
      isDesktop: true,
      isTablet: false,
    });
    const { getByTestId } = render(
      <MemberPortalLayout>
        <></>
      </MemberPortalLayout>,
    );

    // Test slugified IDs
    fireEvent.press(getByTestId('nav-item-home'));
    expect(mockNavigate).toHaveBeenCalledWith(AppConstants.screens.dashboard);

    fireEvent.press(getByTestId('nav-item-messages'));
    expect(mockNavigate).toHaveBeenCalledWith(AppConstants.screens.messages);

    fireEvent.press(getByTestId('nav-item-prescriptions'));
    expect(mockNavigate).toHaveBeenCalledWith(AppConstants.screens.prescriptions);

    fireEvent.press(getByTestId('nav-item-billing'));
    expect(mockNavigate).toHaveBeenCalledWith(AppConstants.screens.billing);

    fireEvent.press(getByTestId('nav-item-account'));
    expect(mockNavigate).toHaveBeenCalledWith(AppConstants.screens.account);

    // Click remaining items to hit empty functions
    fireEvent.press(getByTestId('nav-item-appointments'));
    fireEvent.press(getByTestId('nav-item-lab-results'));
    fireEvent.press(getByTestId('nav-item-questionnaires'));
    fireEvent.press(getByTestId('nav-item-documents'));
    fireEvent.press(getByTestId('nav-item-insurance'));
    fireEvent.press(getByTestId('nav-item-log-out'));
  });

  it('handles refresh control when onRefresh is provided', () => {
    (ResponsiveUtility.useResponsive as jest.Mock).mockReturnValue({
      isMobile: true,
      isDesktop: false,
      isTablet: false,
    });
    const onRefresh = jest.fn();
    render(
      <MemberPortalLayout onRefresh={onRefresh} refreshing={false}>
        <></>
      </MemberPortalLayout>,
    );
  });
});
