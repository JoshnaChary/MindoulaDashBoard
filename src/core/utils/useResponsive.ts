import { Dimensions, ScaledSize } from 'react-native';
import { useMemo, useState, useEffect } from 'react';
import { DeviceType, getDeviceType } from '../theme/breakpoints';

export const useResponsive = () => {
  const [windowDimensions, setWindowDimensions] = useState<ScaledSize>(Dimensions.get('window'));

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setWindowDimensions(window);
    });
    return () => subscription?.remove();
  }, []);

  const { width, height } = windowDimensions;
  const deviceType: DeviceType = getDeviceType(width);

  const isPhone = deviceType === 'phone';
  const isTablet = deviceType === 'tablet';
  const isDesktop = deviceType === 'desktop';
  const isMobile = isPhone || isTablet;

  /**
   * Helper to select a value based on the current device type.
   * Example: const padding = responsiveValue({ phone: 10, tablet: 20, desktop: 32 });
   */
  const responsiveValue = <T>(values: { phone?: T; tablet?: T; desktop: T }): T => {
    if (isPhone && values.phone !== undefined) return values.phone;
    if (isTablet && values.tablet !== undefined) return values.tablet;
    return values.desktop;
  };

  return {
    width,
    height,
    deviceType,
    isPhone,
    isTablet,
    isDesktop,
    isMobile,
    responsiveValue,
  };
};
