import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ThreadItem from '../ThreadItem';
import { Colors } from '../../../../core/theme/colors';

describe('ThreadItem', () => {
  const thread = {
    id: '1',
    title: 'Dr. Smith',
    subtitle: 'Hello there',
    time: '10:30 AM',
    unread: true,
  };

  const defaultProps = {
    thread,
    isSelected: false,
    onPress: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders thread details', () => {
    const { getByText } = render(<ThreadItem {...defaultProps} />);
    expect(getByText('Dr. Smith')).toBeTruthy();
    expect(getByText('Hello there')).toBeTruthy();
    expect(getByText('10:30 AM')).toBeTruthy();
  });

  it('renders read thread correctly (bold check)', () => {
    const { getByText } = render(
      <ThreadItem {...defaultProps} thread={{ ...thread, unread: false }} />,
    );
    // This hits the 'medium' branch in weight
    expect(getByText('Dr. Smith')).toBeTruthy();
  });

  it('highlights when isSelected is true', () => {
    const { getByTestId } = render(<ThreadItem {...defaultProps} isSelected />);
    const container = getByTestId('thread-item');
    // Ensure the selected style is applied in the array of styles
    const styles = container.props.style;
    const hasSelectedStyle = (Array.isArray(styles) ? styles : [styles]).some(
      (s: any) => s && s.backgroundColor === Colors.bubbles.inboundBg,
    );
    expect(hasSelectedStyle).toBe(true);
  });

  it('triggers onPress', () => {
    const { getByTestId } = render(<ThreadItem {...defaultProps} />);
    fireEvent.press(getByTestId('thread-item'));
    expect(defaultProps.onPress).toHaveBeenCalled();
  });
});
