import { useState, useEffect, useRef, useCallback } from 'react';
import { sound } from '../utils/soundEffects';

interface UseGameTimerProps {
  initialSeconds: number;
  isRunning: boolean;
  onTimeout: () => void;
}

export function useGameTimer({ initialSeconds, isRunning, onTimeout }: UseGameTimerProps) {
  const [secondsRemaining, setSecondsRemaining] = useState<number>(initialSeconds);
  const onTimeoutRef = useRef(onTimeout);
  onTimeoutRef.current = onTimeout;

  // Track start time for drift-free timing
  const startTimeRef = useRef<number | null>(null);
  const expectedDurationRef = useRef<number>(initialSeconds);

  // Reset when initialSeconds changes
  useEffect(() => {
    setSecondsRemaining(initialSeconds);
    expectedDurationRef.current = initialSeconds;
    startTimeRef.current = Date.now();
  }, [initialSeconds]);

  useEffect(() => {
    if (!isRunning) return;

    startTimeRef.current = Date.now() - (expectedDurationRef.current - secondsRemaining) * 1000;

    const interval = setInterval(() => {
      if (!startTimeRef.current) return;
      const elapsedSeconds = Math.floor((Date.now() - startTimeRef.current) / 1000);
      const remaining = Math.max(0, expectedDurationRef.current - elapsedSeconds);

      setSecondsRemaining(remaining);

      // Warning tick sound for last 10 seconds
      if (remaining <= 10 && remaining > 0) {
        sound.playTick();
      }

      if (remaining <= 0) {
        clearInterval(interval);
        sound.playTimeout();
        onTimeoutRef.current();
      }
    }, 250); // High precision tick

    return () => clearInterval(interval);
  }, [isRunning, secondsRemaining]);

  const timeUsed = expectedDurationRef.current - secondsRemaining;

  const resetTimer = useCallback((newSeconds: number) => {
    expectedDurationRef.current = newSeconds;
    setSecondsRemaining(newSeconds);
    startTimeRef.current = Date.now();
  }, []);

  return {
    secondsRemaining,
    timeUsed,
    resetTimer,
  };
}
