import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import MessagingCenterView from '../MessagingCenterView';
import * as ResponsiveUtility from '../../../../core/utils/useResponsive';

// Mocks
jest.mock('../../../../core/utils/useResponsive', () => ({
  useResponsive: jest.fn(),
}));

jest.mock('../../../components/MemberPortalLayout', () => ({ children }: any) => <>{children}</>);

describe('MessagingCenterView', () => {
  const defaultHeight = 800;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders split view correctly on desktop', () => {
    (ResponsiveUtility.useResponsive as jest.Mock).mockReturnValue({
      isPhone: false,
      isDesktop: true,
      height: defaultHeight,
    });

    const { getByText, getAllByText } = render(<MessagingCenterView />);

    // Thread list title
    expect(getByText('Messages')).toBeTruthy();
    // Threads
    expect(getByText('Northside Clinic')).toBeTruthy();
    expect(getByText('Care Team')).toBeTruthy();
    // Chat panel should be visible (default ID 1 selected)
    expect(getAllByText('View').length).toBeGreaterThan(0);
  });

  it('renders list view on mobile by default', () => {
    (ResponsiveUtility.useResponsive as jest.Mock).mockReturnValue({
      isPhone: true,
      isDesktop: false,
      height: defaultHeight,
    });

    const { getByText, queryByText } = render(<MessagingCenterView />);

    expect(getByText('Messages')).toBeTruthy();
    // On mobile, detail pane shouldn't be visible initially if showDetailOnMobile is false
    expect(queryByText('+ Attach file')).toBeNull();
  });

  it('switches to detail view on mobile when a thread is selected', () => {
    (ResponsiveUtility.useResponsive as jest.Mock).mockReturnValue({
      isPhone: true,
      isDesktop: false,
      height: defaultHeight,
    });

    const { getByText, queryByText } = render(<MessagingCenterView />);

    // Select a thread (Dr. J Kim)
    fireEvent.press(getByText('Dr. J Kim'));

    // Now detail pane should be visible
    expect(getByText('+ Attach file')).toBeTruthy();
    // And list pane should be hidden
    expect(queryByText('Messages')).toBeNull();
  });

  it('goes back to list view on mobile via ChatPanel back button', () => {
    (ResponsiveUtility.useResponsive as jest.Mock).mockReturnValue({
      isPhone: true,
      isDesktop: false,
      height: defaultHeight,
    });

    const { getByText, queryByText } = render(<MessagingCenterView />);

    // Go to detail
    fireEvent.press(getByText('Dr. J Kim'));

    // Find back button in ChatPanel
    fireEvent.press(getByText('< Back'));

    // Now list should be back
    expect(getByText('Messages')).toBeTruthy();
    expect(queryByText('+ Attach file')).toBeNull();
  });

  it('selecting a thread on desktop does not toggle mobile detail state', () => {
    (ResponsiveUtility.useResponsive as jest.Mock).mockReturnValue({
      isPhone: false,
      isDesktop: true,
      height: defaultHeight,
    });

    const { getByText } = render(<MessagingCenterView />);

    fireEvent.press(getByText('Care Team'));

    // On desktop the detail pane is always visible, so ChatPanel content should remain visible.
    expect(getByText('+ Attach file')).toBeTruthy();
    // And the list pane should still be present.
    expect(getByText('Messages')).toBeTruthy();
  });

  it('renders empty state when selectedId is null', () => {
    (ResponsiveUtility.useResponsive as jest.Mock).mockReturnValue({
      isPhone: false,
      isDesktop: true,
      height: defaultHeight,
    });

    const { getByText, queryByText } = render(
      <MessagingCenterView initialSelectedId={null} initialShowDetailOnMobile={false} />,
    );

    expect(getByText('Select a thread to start messaging')).toBeTruthy();
    expect(queryByText('+ Attach file')).toBeNull();
  });
});
