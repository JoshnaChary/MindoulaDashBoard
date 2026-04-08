import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { StyleSheet } from 'react-native';
import { AppButton } from '../AppButton';
import { Colors } from '../../../core/theme/colors';
import { Spacing } from '../../../core/theme/spacing';
import * as HapticsUtility from '../../../core/utils/haptics';

jest.mock('../../../core/utils/haptics', () => ({
  impactMedium: jest.fn(),
  impactLight: jest.fn(),
}));

describe('AppButton', () => {
  const defaultProps = {
    label: 'Test Button',
    onPress: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with default props', () => {
    const { getByText, getByTestId } = render(<AppButton {...defaultProps} />);
    const button = getByTestId('app-button');
    const label = getByText('Test Button');

    expect(StyleSheet.flatten(button.props.style)).toMatchObject({
      backgroundColor: Colors.primary,
    });
    expect(StyleSheet.flatten(label.props.style)).toMatchObject({ color: Colors.white });
  });

  it('renders correctly for secondary variant', () => {
    const { getByTestId } = render(<AppButton {...defaultProps} variant="secondary" />);
    const button = getByTestId('app-button');
    expect(StyleSheet.flatten(button.props.style)).toMatchObject({
      backgroundColor: Colors.secondary,
    });
  });

  it('renders correctly for outline variant', () => {
    const { getByTestId } = render(<AppButton {...defaultProps} variant="outline" />);
    const button = getByTestId('app-button');
    expect(StyleSheet.flatten(button.props.style)).toMatchObject({
      backgroundColor: 'transparent',
      borderWidth: 1,
    });
  });

  it('renders correctly for ghost variant', () => {
    const { getByTestId } = render(<AppButton {...defaultProps} variant="ghost" />);
    const button = getByTestId('app-button');
    expect(StyleSheet.flatten(button.props.style)).toMatchObject({
      backgroundColor: 'transparent',
    });
  });

  it('renders correctly with fallback variant for code coverage', () => {
    // @ts-ignore - testing runtime fallback for invalid variant
    const { getByTestId } = render(<AppButton {...defaultProps} variant="invalid" />);
    const button = getByTestId('app-button');
    expect(StyleSheet.flatten(button.props.style)).toMatchObject({
      backgroundColor: Colors.primary,
    });
  });

  it('renders correctly for small size', () => {
    const { getByTestId } = render(<AppButton {...defaultProps} size="small" />);
    const button = getByTestId('app-button');
    expect(StyleSheet.flatten(button.props.style)).toMatchObject({
      minHeight: 32,
      paddingVertical: Spacing.xs,
    });
  });

  it('renders correctly for large size', () => {
    const { getByTestId } = render(<AppButton {...defaultProps} size="large" />);
    const button = getByTestId('app-button');
    expect(StyleSheet.flatten(button.props.style)).toMatchObject({
      minHeight: 56,
      paddingVertical: Spacing.lg,
    });
  });

  it('triggers medium haptics on primary press', () => {
    const { getByTestId } = render(<AppButton {...defaultProps} variant="primary" />);
    fireEvent.press(getByTestId('app-button'));
    expect(HapticsUtility.impactMedium).toHaveBeenCalled();
    expect(defaultProps.onPress).toHaveBeenCalled();
  });

  it('triggers light haptics on secondary press', () => {
    const { getByTestId } = render(<AppButton {...defaultProps} variant="secondary" />);
    fireEvent.press(getByTestId('app-button'));
    expect(HapticsUtility.impactLight).toHaveBeenCalled();
  });

  it('triggers light haptics on ghost press', () => {
    const { getByTestId } = render(<AppButton {...defaultProps} variant="ghost" />);
    fireEvent.press(getByTestId('app-button'));
    expect(HapticsUtility.impactLight).toHaveBeenCalled();
  });

  it('renders correctly with fallback size for code coverage', () => {
    // @ts-ignore - testing runtime fallback for invalid size
    const { getByTestId } = render(<AppButton {...defaultProps} size="invalid" />);
    const button = getByTestId('app-button');
    expect(StyleSheet.flatten(button.props.style)).toMatchObject({
      minHeight: 44,
    });
  });

  it('does not trigger onPress when disabled', () => {
    const { getByTestId } = render(<AppButton {...defaultProps} disabled />);
    const button = getByTestId('app-button');
    fireEvent.press(button);
    expect(defaultProps.onPress).not.toHaveBeenCalled();
    expect(StyleSheet.flatten(button.props.style)).toMatchObject({ opacity: 0.5 });
  });

  it('handles press when onPress is not provided without crashing', () => {
    const { getByTestId } = render(<AppButton label="No Press" />);
    fireEvent.press(getByTestId('app-button'));
    expect(HapticsUtility.impactMedium).not.toHaveBeenCalled();
  });
});
