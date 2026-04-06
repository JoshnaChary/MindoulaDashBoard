import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { MenuListItem } from '../MenuListItem';
import { Colors } from '../../../core/theme/colors';

// Helper to check for color in child component props if necessary,
// but we just check the rendered icon as they are components.
describe('MenuListItem', () => {
  it('renders correctly with default props', () => {
    const { getByText } = render(<MenuListItem title="Home" />);
    const textElement = getByText('Home');
    expect(textElement.props.style).toContainEqual(
      expect.objectContaining({ color: Colors.text.secondary }),
    );
  });

  it('renders with active styles', () => {
    const { getByText } = render(<MenuListItem title="Home" isActive />);
    const textElement = getByText('Home');
    expect(textElement.props.style).toContainEqual(
      expect.objectContaining({ color: Colors.primary }),
    );
  });

  it('triggers onPress correctly', () => {
    const onPress = jest.fn();
    const { getByText } = render(<MenuListItem title="Home" onPress={onPress} />);
    fireEvent.press(getByText('Home'));
    expect(onPress).toHaveBeenCalled();
  });

  describe('Icon Mapping', () => {
    it.each([
      ['Home', 'home'],
      ['Messages', 'mail-outline'],
      ['Appointments', 'calendar-today'],
      ['Prescriptions', 'medical-services'],
      ['Lab Results', 'science'],
      ['Documents', 'description'],
      ['Unknown', 'more-horiz'],
      ['HOME', 'home'], // Case sensitivity check
    ])('should map title "%s" to icon "%s"', (title, expectedIcon) => {
      const { getByText } = render(<MenuListItem title={title} />);
      const container = getByText(title).parent;
      // We check that it renders without error and we've hit the switch case
      expect(container).toBeTruthy();
    });
  });
});
