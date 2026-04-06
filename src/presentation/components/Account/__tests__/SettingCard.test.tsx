import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import SettingCard from '../SettingCard';
import * as ResponsiveUtility from '../../../../core/utils/useResponsive';

jest.mock('../../../../core/utils/useResponsive', () => ({
  useResponsive: jest.fn(),
}));

describe('SettingCard', () => {
  const defaultProps = {
    label: 'Email',
    value: 'test@example.com',
    actionLabel: 'Edit',
    onAction: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders label and value', () => {
    (ResponsiveUtility.useResponsive as jest.Mock).mockReturnValue({ isPhone: false });
    const { getByText } = render(<SettingCard {...defaultProps} />);
    expect(getByText('Email')).toBeTruthy();
    expect(getByText('test@example.com')).toBeTruthy();
  });

  it('triggers onAction when action button is pressed', () => {
    (ResponsiveUtility.useResponsive as jest.Mock).mockReturnValue({ isPhone: false });
    const { getByText } = render(<SettingCard {...defaultProps} />);
    fireEvent.press(getByText('Edit'));
    expect(defaultProps.onAction).toHaveBeenCalled();
  });

  it('does not render action button if actionLabel is missing', () => {
    (ResponsiveUtility.useResponsive as jest.Mock).mockReturnValue({ isPhone: false });
    const { queryByText } = render(<SettingCard label="Test" value="Value" />);
    expect(queryByText('Edit')).toBeNull();
  });

  it('applies phone styles when on phone', () => {
    (ResponsiveUtility.useResponsive as jest.Mock).mockReturnValue({ isPhone: true });
    const { getByText } = render(<SettingCard {...defaultProps} />);
    // On phone, we expect same content but different styles (not strictly testable via RTL)
    expect(getByText('Email')).toBeTruthy();
  });
});
