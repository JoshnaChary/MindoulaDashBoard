import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Platform } from 'react-native';
import FigmaDashboardView from '../FigmaDashboardView';
import * as ResponsiveUtility from '../../../../core/utils/useResponsive';
import { AppConstants } from '../../../../core/constants/AppConstants';

// Mocks
const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

jest.mock('../../../../core/utils/useResponsive', () => ({
  useResponsive: jest.fn(),
}));

// Mock member portal layout since it's already tested
jest.mock('../../../components/MemberPortalLayout', () => ({ children, title }: any) => (
  <>{children}</>
));

describe('FigmaDashboardView', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly on desktop', () => {
    (ResponsiveUtility.useResponsive as jest.Mock).mockReturnValue({ isPhone: false });
    const { getByText } = render(<FigmaDashboardView />);

    expect(getByText('Hello, Jane')).toBeTruthy();
    expect(getByText('Upcoming appointment')).toBeTruthy();
    expect(getByText('Follow-up with Dr. J Kim')).toBeTruthy();
  });

  it('renders correctly on mobile', () => {
    (ResponsiveUtility.useResponsive as jest.Mock).mockReturnValue({ isPhone: true });
    const { getByText } = render(<FigmaDashboardView />);

    expect(getByText('Join Video')).toBeTruthy();
  });

  it('navigates to messages when "new messages" card is pressed', () => {
    (ResponsiveUtility.useResponsive as jest.Mock).mockReturnValue({ isPhone: false });
    const { getByText } = render(<FigmaDashboardView />);

    fireEvent.press(getByText('View 3 new messages'));
    expect(mockNavigate).toHaveBeenCalledWith(AppConstants.screens.messages);
  });

  it('navigates to prescriptions when "refill" card is pressed', () => {
    (ResponsiveUtility.useResponsive as jest.Mock).mockReturnValue({ isPhone: false });
    const { getByText } = render(<FigmaDashboardView />);

    fireEvent.press(getByText('Request a prescription refill'));
    expect(mockNavigate).toHaveBeenCalledWith(AppConstants.screens.prescriptions);
  });

  it('navigates to messages when "send message" card is pressed', () => {
    (ResponsiveUtility.useResponsive as jest.Mock).mockReturnValue({ isPhone: false });
    const { getByText } = render(<FigmaDashboardView />);

    fireEvent.press(getByText('Send a message to my care team'));
    expect(mockNavigate).toHaveBeenCalledWith(AppConstants.screens.messages);
  });

  it('applies web layout styles when Platform.OS is web', () => {
    const prevOS = Platform.OS;
    // jest.setup defaults Platform.OS to 'ios' but it is writable.
    // The Platform-based ternaries are evaluated during render, so we can
    // simply flip Platform.OS and render.
    (Platform as any).OS = 'web';
    (ResponsiveUtility.useResponsive as jest.Mock).mockReturnValue({ isPhone: false });

    const { getByText } = render(<FigmaDashboardView />);
    expect(getByText('Upcoming appointment')).toBeTruthy();

    (Platform as any).OS = prevOS;
  });
});
