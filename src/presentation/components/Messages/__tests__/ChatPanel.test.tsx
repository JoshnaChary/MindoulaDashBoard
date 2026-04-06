import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ChatPanel from '../ChatPanel';
import * as ResponsiveUtility from '../../../../core/utils/useResponsive';

jest.mock('../../../../core/utils/useResponsive', () => ({
  useResponsive: jest.fn(),
}));

describe('ChatPanel', () => {
  const onBack = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders notification messages for threadId 1', () => {
    (ResponsiveUtility.useResponsive as jest.Mock).mockReturnValue({ isPhone: false });
    const { getByText, getAllByText } = render(<ChatPanel threadId={1} />);
    expect(getByText(/Your April 3 appointment is confirmed/)).toBeTruthy();
    expect(getAllByText('View').length).toBeGreaterThan(0);
  });

  it('renders chat bubbles for threadId 2', () => {
    (ResponsiveUtility.useResponsive as jest.Mock).mockReturnValue({ isPhone: false });
    const { getByText } = render(<ChatPanel threadId={2} />);
    expect(getByText(/lab results from last week are in/)).toBeTruthy();
    expect(getByText(/sleep is still a little difficult/)).toBeTruthy();
  });

  it('shows back button on phone', () => {
    (ResponsiveUtility.useResponsive as jest.Mock).mockReturnValue({ isPhone: true });
    const { getByText } = render(<ChatPanel threadId={1} onBack={onBack} />);
    const backBtn = getByText('< Back');
    fireEvent.press(backBtn);
    expect(onBack).toHaveBeenCalled();
  });

  it('shows appointment button on desktop', () => {
    (ResponsiveUtility.useResponsive as jest.Mock).mockReturnValue({ isPhone: false });
    const { getByText } = render(<ChatPanel threadId={1} />);
    expect(getByText('Request Appointment')).toBeTruthy();
  });

  it('allows typing in the input', () => {
    (ResponsiveUtility.useResponsive as jest.Mock).mockReturnValue({ isPhone: false });
    const { getByPlaceholderText } = render(<ChatPanel threadId={1} />);
    const input = getByPlaceholderText('Type your message here...');
    fireEvent.changeText(input, 'Hello World');
    // Basic interaction check
  });
});
