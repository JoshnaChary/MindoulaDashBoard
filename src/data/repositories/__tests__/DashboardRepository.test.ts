import { DashboardRepository } from '../DashboardRepository';
import dashboardJson from '../../mock/dashboard.json';

describe('DashboardRepository', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('getDashboardData', () => {
    it('returns data from the mock JSON after a 500ms delay', async () => {
      const promise = DashboardRepository.getDashboardData();

      // Initially, it should still be pending
      jest.advanceTimersByTime(499);

      // Advance past 500ms
      jest.advanceTimersByTime(1);

      const data = await promise;
      expect(data).toEqual(dashboardJson);
    });

    it('returns null for the placeholder getDashboardDataFromApi', async () => {
      const data = await DashboardRepository.getDashboardDataFromApi();
      expect(data).toBeNull();
    });
  });
});
