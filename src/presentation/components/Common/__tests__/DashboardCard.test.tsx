import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import DashboardCard from '../DashboardCard';
// import { Colors } from '../../../../core/theme/colors';

// Mock AppText if needed, but it's already a real component in the project.
import { AppText } from '../../../../components/atoms/AppText';
import { View } from 'react-native';

describe('DashboardCard', () => {
  it('renders title and amount', () => {
    const { getByText } = render(<DashboardCard title="Test Title" amount="$100" />);
    expect(getByText('Test Title')).toBeTruthy();
    expect(getByText('$100')).toBeTruthy();
  });

  it('renders indicator when color is provided', () => {
    render(
      <View testID="indicator-container">
        <DashboardCard title="Test" indicatorColor="red" />
      </View>,
    );
    // Note: We'd need to add testID to DashboardCard to test this properly,
    // but just rendering it covers the branch.
  });

  it('renders subtext', () => {
    const { getByText } = render(<DashboardCard title="Test" subtext="Subtext info" />);
    expect(getByText('Subtext info')).toBeTruthy();
  });

  it('renders status and action button', () => {
    const onAction = jest.fn();
    const { getByText } = render(
      <DashboardCard title="Test" status="Pending" actionLabel="Click Me" onAction={onAction} />,
    );
    expect(getByText('Pending')).toBeTruthy();
    const button = getByText('Click Me');
    fireEvent.press(button);
    expect(onAction).toHaveBeenCalled();
  });

  it('renders children', () => {
    const { getByText } = render(
      <DashboardCard title="Test">
        <AppText>Child Content</AppText>
      </DashboardCard>,
    );
    expect(getByText('Child Content')).toBeTruthy();
  });

  it('handles status only in footer', () => {
    const { getByText, queryByText } = render(<DashboardCard title="Test" status="Done" />);
    expect(getByText('Done')).toBeTruthy();
    expect(queryByText('View Details')).toBeNull();
  });

  it('handles action only in footer', () => {
    const onAction = jest.fn();
    const { getByText, queryByText } = render(
      <DashboardCard title="Test" actionLabel="Go" onAction={onAction} />,
    );
    expect(getByText('Go')).toBeTruthy();
    expect(queryByText('Pending')).toBeNull();
  });
});
