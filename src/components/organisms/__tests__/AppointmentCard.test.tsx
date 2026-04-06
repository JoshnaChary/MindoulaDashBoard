import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { AppointmentCard } from '../AppointmentCard';

describe('AppointmentCard', () => {
  const defaultProps = {
    date: 'Mon, Oct 24',
    doctor: 'Dr. Smith',
    time: '10:00 AM',
    cta: 'Confirm',
    onCtaPress: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all appointment details', () => {
    const { getByText } = render(<AppointmentCard {...defaultProps} />);
    expect(getByText('Mon, Oct 24')).toBeTruthy();
    expect(getByText('Dr. Smith')).toBeTruthy();
    expect(getByText('10:00 AM')).toBeTruthy();
    expect(getByText('Confirm')).toBeTruthy();
  });

  it('triggers onCtaPress correctly', () => {
    const { getByText } = render(<AppointmentCard {...defaultProps} />);
    fireEvent.press(getByText('Confirm'));
    expect(defaultProps.onCtaPress).toHaveBeenCalled();
  });
});
