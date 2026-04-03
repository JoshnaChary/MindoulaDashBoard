import { DashboardData } from '../models/DashboardModel';
import dashboardJson from '../mock/dashboard.json';

export const DashboardRepository = {
  getDashboardData: async (): Promise<DashboardData> => {
    // Simulate a network delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    return dashboardJson as DashboardData;
  },

  // Example of how it would look with the actual API
  getDashboardDataFromApi: async (): Promise<DashboardData | null> => {
    // In a real scenario, this would use the ApiService
    // const response = await ApiService.get<DashboardData>('/dashboard');
    // return response.data;
    return null;
  },
};
