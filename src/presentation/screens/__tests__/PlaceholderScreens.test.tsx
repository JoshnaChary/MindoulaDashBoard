import React from 'react';
import { render } from '@testing-library/react-native';
import {
  LabResultsScreen,
  QuestionnairesScreen,
  DocumentsScreen,
  InsuranceScreen,
  AppointmentsScreen,
} from '../PlaceholderScreens';

// Mock layout
jest.mock('../../components/MemberPortalLayout', () => ({ children, title }: any) => (
  <>{children}</>
));

describe('PlaceholderScreens', () => {
  it('renders LabResultsScreen correctly', () => {
    const { getByText } = render(<LabResultsScreen />);
    expect(getByText('Lab Results')).toBeTruthy();
    expect(getByText(/This module is coming soon/)).toBeTruthy();
  });

  it('renders QuestionnairesScreen correctly', () => {
    const { getByText } = render(<QuestionnairesScreen />);
    expect(getByText('Questionnaires')).toBeTruthy();
  });

  it('renders DocumentsScreen correctly', () => {
    const { getByText } = render(<DocumentsScreen />);
    expect(getByText('Documents')).toBeTruthy();
  });

  it('renders InsuranceScreen correctly', () => {
    const { getByText } = render(<InsuranceScreen />);
    expect(getByText('Insurance')).toBeTruthy();
  });

  it('renders AppointmentsScreen correctly', () => {
    const { getByText } = render(<AppointmentsScreen />);
    expect(getByText('Appointments')).toBeTruthy();
  });
});
