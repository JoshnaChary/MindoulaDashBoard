import React from 'react';
import { View } from 'react-native';
import { render } from '@testing-library/react-native';
import { ResponsiveContainer } from '../ResponsiveContainer';
import { Spacing } from '../../../core/theme/spacing';
import * as ResponsiveUtility from '../../../core/utils/useResponsive';

jest.mock('../../../core/utils/useResponsive', () => ({
  useResponsive: jest.fn(),
}));

describe('ResponsiveContainer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with default props on desktop', () => {
    (ResponsiveUtility.useResponsive as jest.Mock).mockReturnValue({ isPhone: false });
    const { getByTestId } = render(
      <ResponsiveContainer testID="container">
        <View />
      </ResponsiveContainer>,
    );
    const container = getByTestId('container');

    expect(container.props.style).toContainEqual(
      expect.objectContaining({
        maxWidth: 1200,
        paddingHorizontal: Spacing.lg,
      }),
    );
  });

  it('removes maxWidth on phone', () => {
    (ResponsiveUtility.useResponsive as jest.Mock).mockReturnValue({ isPhone: true });
    const { getByTestId } = render(
      <ResponsiveContainer testID="container">
        <View />
      </ResponsiveContainer>,
    );
    const container = getByTestId('container');

    expect(container.props.style).toContainEqual(
      expect.objectContaining({
        maxWidth: undefined,
      }),
    );
  });

  it('renders correctly when fluid', () => {
    (ResponsiveUtility.useResponsive as jest.Mock).mockReturnValue({ isPhone: false });
    const { getByTestId } = render(
      <ResponsiveContainer fluid testID="container">
        <View />
      </ResponsiveContainer>,
    );
    const container = getByTestId('container');

    expect(container.props.style).toContainEqual(
      expect.objectContaining({
        paddingHorizontal: 0,
      }),
    );
  });

  it('renders correctly with custom padding', () => {
    (ResponsiveUtility.useResponsive as jest.Mock).mockReturnValue({ isPhone: false });
    const { getByTestId } = render(
      <ResponsiveContainer padding="xs" testID="container">
        <View />
      </ResponsiveContainer>,
    );
    const container = getByTestId('container');

    expect(container.props.style).toContainEqual(
      expect.objectContaining({
        paddingHorizontal: Spacing.xs,
      }),
    );
  });
});
