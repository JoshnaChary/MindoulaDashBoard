import { getFigmaPos, FIGMA_BASE_X, FIGMA_BASE_Y } from '../layout';

describe('layout util', () => {
  it('should calculate relative position correctly', () => {
    const pos = getFigmaPos(100, 300);
    expect(pos.left).toBe(100 - FIGMA_BASE_X);
    expect(pos.top).toBe(300 - FIGMA_BASE_Y);
  });

  it('should use custom base coordinates', () => {
    const pos = getFigmaPos(100, 300, 0, 0);
    expect(pos.left).toBe(100);
    expect(pos.top).toBe(300);
  });
});
