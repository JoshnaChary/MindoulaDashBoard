import { renderHook, act } from '@testing-library/react-native';
import { Dimensions } from 'react-native';
import { useResponsive } from '../useResponsive';

// Mock breakout logic if necessary, but we can just use set width
describe('useResponsive', () => {
  let removeSubscription: jest.Mock;

  beforeEach(() => {
    removeSubscription = jest.fn();
    jest.spyOn(Dimensions, 'get').mockReturnValue({ width: 375, height: 812 } as any);
    jest.spyOn(Dimensions, 'addEventListener').mockReturnValue({
      remove: removeSubscription,
    } as any);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should return initial dimensions and device type (phone)', () => {
    const { result } = renderHook(() => useResponsive());

    expect(result.current.width).toBe(375);
    expect(result.current.isPhone).toBe(true);
    expect(result.current.isMobile).toBe(true);
    expect(result.current.deviceType).toBe('phone');
  });

  it('should update dimensions when change event fires', () => {
    const { result } = renderHook(() => useResponsive());

    const changeCallback = (Dimensions.addEventListener as jest.Mock).mock.calls[0][1];

    act(() => {
      changeCallback({ window: { width: 1024, height: 768 } });
    });

    expect(result.current.width).toBe(1024);
    expect(result.current.deviceType).toBe('desktop');
    expect(result.current.isDesktop).toBe(true);
    expect(result.current.isMobile).toBe(false);
  });

  it('should remove event listener on unmount', () => {
    const { unmount } = renderHook(() => useResponsive());
    unmount();
    expect(removeSubscription).toHaveBeenCalled();
  });

  describe('responsiveValue', () => {
    it('should return phone value when on phone', () => {
      const { result } = renderHook(() => useResponsive());
      const val = result.current.responsiveValue({ phone: 10, tablet: 20, desktop: 30 });
      expect(val).toBe(10);
    });

    it('should return tablet value when on tablet', () => {
      jest.spyOn(Dimensions, 'get').mockReturnValue({ width: 800, height: 600 } as any);
      const { result } = renderHook(() => useResponsive());
      const val = result.current.responsiveValue({ phone: 10, tablet: 20, desktop: 30 });
      expect(val).toBe(20);
    });

    it('should return desktop value when on desktop', () => {
      jest.spyOn(Dimensions, 'get').mockReturnValue({ width: 1440, height: 900 } as any);
      const { result } = renderHook(() => useResponsive());
      const val = result.current.responsiveValue({ phone: 10, tablet: 20, desktop: 30 });
      expect(val).toBe(30);
    });

    it('should fallback to desktop if optional phone/tablet values are missing', () => {
      jest.spyOn(Dimensions, 'get').mockReturnValue({ width: 375, height: 812 } as any);
      const { result } = renderHook(() => useResponsive());
      const val = result.current.responsiveValue({ desktop: 30 });
      expect(val).toBe(30);
    });
  });
});
