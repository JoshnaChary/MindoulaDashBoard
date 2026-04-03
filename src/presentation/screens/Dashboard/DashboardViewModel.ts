import { useState, useEffect, useCallback } from 'react';
import { DashboardData } from '../../../data/models/DashboardModel';
import { DashboardRepository } from '../../../data/repositories/DashboardRepository';

export const useDashboardViewModel = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeMenu, setActiveMenu] = useState<string>('Home');

  const fetchDashboardData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await DashboardRepository.getDashboardData();
      setData(response);
    } catch (err: any) {
      setError(err.message || 'Failed to load dashboard data');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const onMenuPress = (menu: string) => {
    setActiveMenu(menu);
    // Add navigation logic here if needed
  };

  const onCtaPress = (cta: string) => {
    console.log(`CTA Pressed: ${cta}`);
    // Add specific CTA navigation/action logic here
  };

  const onActionPress = (title: string) => {
    console.log(`Action Pressed: ${title}`);
    // Add specific action navigation/action logic here
  };

  const onProfilePress = () => {
    console.log('Profile Pressed');
    // Add profile navigation logic here
  };

  return {
    data,
    isLoading,
    error,
    activeMenu,
    onMenuPress,
    onCtaPress,
    onActionPress,
    onProfilePress,
    refresh: fetchDashboardData,
  };
};
