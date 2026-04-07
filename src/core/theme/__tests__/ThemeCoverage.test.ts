import { Colors } from '../colors';
import { Spacing } from '../spacing';
import { Typography } from '../typography';
import { Breakpoints } from '../breakpoints';

describe('Theme Coverage', () => {
  it('colors theme is defined', () => {
    expect(Colors).toBeDefined();
    expect(Colors.primary).toBeDefined();
    expect(Colors.secondary).toBeDefined();
  });

  it('spacing theme is defined', () => {
    expect(Spacing).toBeDefined();
    expect(Spacing.md).toBeDefined();
    expect(Spacing.radius).toBeDefined();
  });

  it('typography theme is defined', () => {
    expect(Typography).toBeDefined();
    expect(Typography.fontSize).toBeDefined();
    expect(Typography.fontWeight).toBeDefined();
  });

  it('breakpoints theme is defined', () => {
    expect(Breakpoints).toBeDefined();
    expect(Breakpoints.phone).toBeDefined();
  });
});
