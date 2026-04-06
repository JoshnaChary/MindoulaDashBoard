import React from 'react';
import { render } from '@testing-library/react-native';
import { AppText } from '../AppText';
import { Typography } from '../../../core/theme/typography';
import { Colors } from '../../../core/theme/colors';

describe('AppText', () => {
  it('renders correctly with default props', () => {
    const { getByText } = render(<AppText>Test Text</AppText>);
    const textElement = getByText('Test Text');

    expect(textElement).toBeTruthy();
    expect(textElement.props.style).toContainEqual({
      fontSize: Typography.fontSize.body1,
      color: Colors.text.primary,
      fontFamily: Typography.fontFamily.regular,
      textAlign: 'left',
      lineHeight: Typography.lineHeight.body1,
    });
  });

  it('renders with custom variant and color', () => {
    const { getByText } = render(
      <AppText variant="h1" color="red">
        Heading
      </AppText>,
    );
    const textElement = getByText('Heading');

    expect(textElement.props.style).toContainEqual(
      expect.objectContaining({
        fontSize: Typography.fontSize.h1,
        color: 'red',
      }),
    );
  });

  it('applies bold font based on weight prop', () => {
    const { getByText } = render(<AppText weight="bold">Bold Text</AppText>);
    const textElement = getByText('Bold Text');
    expect(textElement.props.style).toContainEqual(
      expect.objectContaining({ fontFamily: Typography.fontFamily.bold }),
    );
  });

  it('applies medium font based on weight prop', () => {
    const { getByText } = render(<AppText weight="medium">Medium Text</AppText>);
    const textElement = getByText('Medium Text');
    expect(textElement.props.style).toContainEqual(
      expect.objectContaining({ fontFamily: Typography.fontFamily.medium }),
    );
  });

  it('applies bold font based on style.fontWeight', () => {
    const { getByText } = render(<AppText style={{ fontWeight: 'bold' }}>Styled Bold</AppText>);
    const textElement = getByText('Styled Bold');
    expect(textElement.props.style).toContainEqual(
      expect.objectContaining({ fontFamily: Typography.fontFamily.bold }),
    );
  });

  it('applies medium font based on style.fontWeight 500', () => {
    const { getByText } = render(<AppText style={{ fontWeight: '500' }}>Styled Medium</AppText>);
    const textElement = getByText('Styled Medium');
    expect(textElement.props.style).toContainEqual(
      expect.objectContaining({ fontFamily: Typography.fontFamily.medium }),
    );
  });

  it('applies alignment correctly', () => {
    const { getByText } = render(<AppText align="center">Centered</AppText>);
    const textElement = getByText('Centered');
    expect(textElement.props.style).toContainEqual(
      expect.objectContaining({ textAlign: 'center' }),
    );
  });
});
