/**
 * Layout constants and utilities for screen positioning.
 * These are base offsets derived from Figma mockups.
 */

export const FIGMA_BASE_X = 9;
export const FIGMA_BASE_Y = 254;

/**
 * Calculates absolute positioning based on Figma coordinates.
 * @param x Figma X coordinate
 * @param y Figma Y coordinate
 * @returns React Native style object with left and top offsets.
 */
export const getFigmaPos = (x: number, y: number, baseX = FIGMA_BASE_X, baseY = FIGMA_BASE_Y) => ({
  left: x - baseX,
  top: y - baseY,
});
