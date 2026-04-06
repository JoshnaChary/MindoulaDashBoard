import React from 'react';
import { render } from '@testing-library/react-native';
import MessageIcon from '../MessageIcon';

describe('MessageIcon', () => {
  it('renders correctly', () => {
    const { toJSON } = render(<MessageIcon />);
    expect(toJSON()).toMatchSnapshot();
  });
});
