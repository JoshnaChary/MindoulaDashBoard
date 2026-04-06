export const Breakpoints = {
  phone: 0,
  tablet: 600,
  desktop: 1024,
};

export type DeviceType = 'phone' | 'tablet' | 'desktop';

export const getDeviceType = (width: number): DeviceType => {
  if (width < Breakpoints.tablet) {
    return 'phone';
  }
  if (width < Breakpoints.desktop) {
    return 'tablet';
  }
  return 'desktop';
};
