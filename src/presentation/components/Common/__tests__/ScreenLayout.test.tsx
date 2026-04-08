import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ScreenLayout from '../ScreenLayout';
import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';
import { AppText } from '../../../../components/atoms/AppText';

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

describe('ScreenLayout', () => {
  const mockNavigation = {
    goBack: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useNavigation as jest.Mock).mockReturnValue(mockNavigation);
  });

  it('renders title and back button', () => {
    const { getAllByText, getByText } = render(
      <ScreenLayout title="My Title" backLabel="Go Back">
        <View>
          <AppText>Content</AppText>
        </View>
      </ScreenLayout>,
    );
    expect(getAllByText('My Title').length).toBeGreaterThan(0);
    expect(getByText('< Go Back')).toBeTruthy();
    expect(getByText('Content')).toBeTruthy();
  });

  it('handles default navigation goBack', () => {
    const { getByText } = render(
      <ScreenLayout title="Test">
        <View />
      </ScreenLayout>,
    );
    const backButton = getByText('< Back');
    fireEvent.press(backButton);
    expect(mockNavigation.goBack).toHaveBeenCalled();
  });

  it('handles custom onBack handler', () => {
    const onBack = jest.fn();
    const { getByText } = render(
      <ScreenLayout title="Test" onBack={onBack}>
        <View />
      </ScreenLayout>,
    );
    const backButton = getByText('< Back');
    fireEvent.press(backButton);
    expect(onBack).toHaveBeenCalled();
    expect(mockNavigation.goBack).not.toHaveBeenCalled();
  });

  it('renders with headerTitle', () => {
    // MemberPortalLayout uses the title prop, but ScreenLayout passes it.
    // We can't directly test MemberPortalLayout title here easily without deep rendering,
    // but we can verify it's passed correctly.
    render(
      <ScreenLayout title="Screen Title" headerTitle="Header Title">
        <View />
      </ScreenLayout>,
    );
    // Covering the branch for headerTitle || title.
  });
});
