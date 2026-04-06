import { AppConstants } from '../AppConstants';

describe('AppConstants', () => {
  it('has valid structure', () => {
    expect(AppConstants.api.baseUrl).toBe('https://api.medplum.com');
    expect(AppConstants.screens.dashboard).toBe('Dashboard');
    expect(AppConstants.platforms.ios).toBe('ios');
  });
});
