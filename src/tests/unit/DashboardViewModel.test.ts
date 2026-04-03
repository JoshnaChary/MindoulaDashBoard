import { renderHook, waitFor } from '@testing-library/react-native';
import { useDashboardViewModel } from '../../presentation/screens/Dashboard/DashboardViewModel';
import { DashboardRepository } from '../../data/repositories/DashboardRepository';

// Mock the repository
jest.mock('../../data/repositories/DashboardRepository', () => ({
  DashboardRepository: {
    getDashboardData: jest.fn(),
  },
}));

describe('DashboardViewModel', () => {
  const mockData = {
    screen: 'Dashboard',
    header: { title: 'Hello', subtitle: 'World' },
    menu: ['Home'],
    cards: [],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with loading state and fetch data', async () => {
    (DashboardRepository.getDashboardData as jest.Mock).mockResolvedValue(mockData);

    const { result } = renderHook(() => useDashboardViewModel());

    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBe(null);

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBe(null);
  });

  it('should handle errors during data fetching', async () => {
    const errorMessage = 'Fetch failed';
    (DashboardRepository.getDashboardData as jest.Mock).mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => useDashboardViewModel());

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.error).toBe(errorMessage);
    expect(result.current.data).toBe(null);
  });

  it('should update active menu on press', async () => {
    (DashboardRepository.getDashboardData as jest.Mock).mockResolvedValue(mockData);
    const { result } = renderHook(() => useDashboardViewModel());

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    renderHook(() => result.current.onMenuPress('Messages'));
    expect(result.current.activeMenu).toBe('Messages');
  });
});
