import React from 'react';
import { getPigpenSymbol } from '../engines/pigpenCipher';

interface PigpenSymbolProps {
  char: string;
  size?: number;
  color?: string;
  className?: string;
  strokeWidth?: number;
}

export const PigpenSymbol: React.FC<PigpenSymbolProps> = ({
  char,
  size = 48,
  color = '#00ff66',
  className = '',
  strokeWidth = 6,
}) => {
  if (char === ' ') {
    return <span style={{ width: size * 0.5, display: 'inline-block' }} aria-hidden="true" />;
  }

  const symbol = getPigpenSymbol(char);

  if (!symbol) {
    // Fallback for non A-Z
    return (
      <span className={`inline-flex items-center justify-center font-mono font-bold ${className}`} style={{ width: size, height: size }}>
        {char}
      </span>
    );
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={`inline-block select-none ${className}`}
      role="img"
      aria-label={`Pigpen symbol for letter ${symbol.letter}: ${symbol.description}`}
    >
      <path
        d={symbol.path}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {symbol.hasDot && symbol.dotCoords && (
        <circle
          cx={symbol.dotCoords.cx}
          cy={symbol.dotCoords.cy}
          r={strokeWidth * 1.1}
          fill={color}
        />
      )}
    </svg>
  );
};
