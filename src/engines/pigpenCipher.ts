/**
 * Pigpen Cipher Engine
 * Traditional Freemason / Rosicrucian cipher with 2 3x3 grids and 2 X-grids.
 */

export type PigpenShapeType = 'grid' | 'x';

export interface PigpenSymbolDef {
  letter: string;
  gridType: PigpenShapeType;
  hasDot: boolean;
  // SVG path drawing commands inside 100x100 viewBox with padding
  path: string;
  dotCoords?: { cx: number; cy: number };
  description: string;
}

// Coordinate constants for clean 100x100 SVG box with 15px margin (15 to 85)
const MIN = 18;
const MAX = 82;
const MID = 50;

export const PIGPEN_MAP: Record<string, PigpenSymbolDef> = {
  // --- GRID 1: A-I (No dot) ---
  // A: top-left, bottom and right borders
  A: {
    letter: 'A',
    gridType: 'grid',
    hasDot: false,
    path: `M ${MIN} ${MAX} L ${MAX} ${MAX} L ${MAX} ${MIN}`,
    description: 'Bottom and right line (open top and left)',
  },
  // B: top-center, left, bottom, right borders
  B: {
    letter: 'B',
    gridType: 'grid',
    hasDot: false,
    path: `M ${MIN} ${MIN} L ${MIN} ${MAX} L ${MAX} ${MAX} L ${MAX} ${MIN}`,
    description: 'Left, bottom, right line (open top)',
  },
  // C: top-right, left and bottom borders
  C: {
    letter: 'C',
    gridType: 'grid',
    hasDot: false,
    path: `M ${MIN} ${MIN} L ${MIN} ${MAX} L ${MAX} ${MAX}`,
    description: 'Left and bottom line (open top and right)',
  },
  // D: middle-left, top, right, bottom borders
  D: {
    letter: 'D',
    gridType: 'grid',
    hasDot: false,
    path: `M ${MIN} ${MIN} L ${MAX} ${MIN} L ${MAX} ${MAX} L ${MIN} ${MAX}`,
    description: 'Top, right, bottom line (open left)',
  },
  // E: center, all 4 borders (box)
  E: {
    letter: 'E',
    gridType: 'grid',
    hasDot: false,
    path: `M ${MIN} ${MIN} L ${MAX} ${MIN} L ${MAX} ${MAX} L ${MIN} ${MAX} Z`,
    description: 'Full enclosed square',
  },
  // F: middle-right, top, left, bottom borders
  F: {
    letter: 'F',
    gridType: 'grid',
    hasDot: false,
    path: `M ${MAX} ${MIN} L ${MIN} ${MIN} L ${MIN} ${MAX} L ${MAX} ${MAX}`,
    description: 'Top, left, bottom line (open right)',
  },
  // G: bottom-left, top and right borders
  G: {
    letter: 'G',
    gridType: 'grid',
    hasDot: false,
    path: `M ${MIN} ${MIN} L ${MAX} ${MIN} L ${MAX} ${MAX}`,
    description: 'Top and right line (open bottom and left)',
  },
  // H: bottom-center, left, top, right borders
  H: {
    letter: 'H',
    gridType: 'grid',
    hasDot: false,
    path: `M ${MIN} ${MAX} L ${MIN} ${MIN} L ${MAX} ${MIN} L ${MAX} ${MAX}`,
    description: 'Left, top, right line (open bottom)',
  },
  // I: bottom-right, top and left borders
  I: {
    letter: 'I',
    gridType: 'grid',
    hasDot: false,
    path: `M ${MAX} ${MIN} L ${MIN} ${MIN} L ${MIN} ${MAX}`,
    description: 'Top and left line (open bottom and right)',
  },

  // --- GRID 2: J-R (With dot) ---
  J: {
    letter: 'J',
    gridType: 'grid',
    hasDot: true,
    path: `M ${MIN} ${MAX} L ${MAX} ${MAX} L ${MAX} ${MIN}`,
    dotCoords: { cx: 42, cy: 42 },
    description: 'Bottom and right line with dot',
  },
  K: {
    letter: 'K',
    gridType: 'grid',
    hasDot: true,
    path: `M ${MIN} ${MIN} L ${MIN} ${MAX} L ${MAX} ${MAX} L ${MAX} ${MIN}`,
    dotCoords: { cx: MID, cy: 42 },
    description: 'Left, bottom, right line with dot',
  },
  L: {
    letter: 'L',
    gridType: 'grid',
    hasDot: true,
    path: `M ${MIN} ${MIN} L ${MIN} ${MAX} L ${MAX} ${MAX}`,
    dotCoords: { cx: 58, cy: 42 },
    description: 'Left and bottom line with dot',
  },
  M: {
    letter: 'M',
    gridType: 'grid',
    hasDot: true,
    path: `M ${MIN} ${MIN} L ${MAX} ${MIN} L ${MAX} ${MAX} L ${MIN} ${MAX}`,
    dotCoords: { cx: 42, cy: MID },
    description: 'Top, right, bottom line with dot',
  },
  N: {
    letter: 'N',
    gridType: 'grid',
    hasDot: true,
    path: `M ${MIN} ${MIN} L ${MAX} ${MIN} L ${MAX} ${MAX} L ${MIN} ${MAX} Z`,
    dotCoords: { cx: MID, cy: MID },
    description: 'Full enclosed square with dot',
  },
  O: {
    letter: 'O',
    gridType: 'grid',
    hasDot: true,
    path: `M ${MAX} ${MIN} L ${MIN} ${MIN} L ${MIN} ${MAX} L ${MAX} ${MAX}`,
    dotCoords: { cx: 58, cy: MID },
    description: 'Top, left, bottom line with dot',
  },
  P: {
    letter: 'P',
    gridType: 'grid',
    hasDot: true,
    path: `M ${MIN} ${MIN} L ${MAX} ${MIN} L ${MAX} ${MAX}`,
    dotCoords: { cx: 42, cy: 58 },
    description: 'Top and right line with dot',
  },
  Q: {
    letter: 'Q',
    gridType: 'grid',
    hasDot: true,
    path: `M ${MIN} ${MAX} L ${MIN} ${MIN} L ${MAX} ${MIN} L ${MAX} ${MAX}`,
    dotCoords: { cx: MID, cy: 58 },
    description: 'Left, top, right line with dot',
  },
  R: {
    letter: 'R',
    gridType: 'grid',
    hasDot: true,
    path: `M ${MAX} ${MIN} L ${MIN} ${MIN} L ${MIN} ${MAX}`,
    dotCoords: { cx: 58, cy: 58 },
    description: 'Top and left line with dot',
  },

  // --- X-GRID 1: S-V (No dot) ---
  // S: top quadrant -> points downward V
  S: {
    letter: 'S',
    gridType: 'x',
    hasDot: false,
    path: `M ${MIN} ${MIN} L ${MID} ${MID} L ${MAX} ${MIN}`,
    description: 'V-shape pointing down (open top)',
  },
  // T: left quadrant -> points rightward >
  T: {
    letter: 'T',
    gridType: 'x',
    hasDot: false,
    path: `M ${MIN} ${MIN} L ${MID} ${MID} L ${MIN} ${MAX}`,
    description: 'Angle pointing right (open left)',
  },
  // U: right quadrant -> points leftward <
  U: {
    letter: 'U',
    gridType: 'x',
    hasDot: false,
    path: `M ${MAX} ${MIN} L ${MID} ${MID} L ${MAX} ${MAX}`,
    description: 'Angle pointing left (open right)',
  },
  // V: bottom quadrant -> points upward ^
  V: {
    letter: 'V',
    gridType: 'x',
    hasDot: false,
    path: `M ${MIN} ${MAX} L ${MID} ${MID} L ${MAX} ${MAX}`,
    description: 'Inverted V-shape pointing up (open bottom)',
  },

  // --- X-GRID 2: W-Z (With dot) ---
  W: {
    letter: 'W',
    gridType: 'x',
    hasDot: true,
    path: `M ${MIN} ${MIN} L ${MID} ${MID} L ${MAX} ${MIN}`,
    dotCoords: { cx: MID, cy: 30 },
    description: 'V-shape pointing down with dot',
  },
  X: {
    letter: 'X',
    gridType: 'x',
    hasDot: true,
    path: `M ${MIN} ${MIN} L ${MID} ${MID} L ${MIN} ${MAX}`,
    dotCoords: { cx: 30, cy: MID },
    description: 'Angle pointing right with dot',
  },
  Y: {
    letter: 'Y',
    gridType: 'x',
    hasDot: true,
    path: `M ${MAX} ${MIN} L ${MID} ${MID} L ${MAX} ${MAX}`,
    dotCoords: { cx: 70, cy: MID },
    description: 'Angle pointing left with dot',
  },
  Z: {
    letter: 'Z',
    gridType: 'x',
    hasDot: true,
    path: `M ${MIN} ${MAX} L ${MID} ${MID} L ${MAX} ${MAX}`,
    dotCoords: { cx: MID, cy: 70 },
    description: 'Inverted V-shape pointing up with dot',
  },
};

export function getPigpenSymbol(char: string): PigpenSymbolDef | null {
  const upper = char.toUpperCase();
  return PIGPEN_MAP[upper] || null;
}

export function encodePigpen(text: string): (PigpenSymbolDef | 'SPACE')[] {
  const result: (PigpenSymbolDef | 'SPACE')[] = [];
  for (const char of text.toUpperCase()) {
    if (char === ' ') {
      result.push('SPACE');
    } else if (PIGPEN_MAP[char]) {
      result.push(PIGPEN_MAP[char]);
    }
  }
  return result;
}
