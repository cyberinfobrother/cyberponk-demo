import { Challenge, RoundResult, LeaderboardEntry, GameMode } from '../types/game';

export const MAIN_ROUND_POINTS = 10;
export const FIRST_TEAM_BONUS_POINTS = 5;
export const BONUS_ROUND_POINTS = 5;

/**
 * Calculates score for a round
 */
export function calculateRoundScore(
  challenge: Challenge,
  isCorrect: boolean,
  isFirstTeam: boolean
): { base: number; bonus: number; total: number } {
  if (!isCorrect) {
    return { base: 0, bonus: 0, total: 0 };
  }

  if (challenge.isBonus) {
    return {
      base: BONUS_ROUND_POINTS,
      bonus: 0,
      total: BONUS_ROUND_POINTS,
    };
  }

  const base = MAIN_ROUND_POINTS;
  const bonus = isFirstTeam ? FIRST_TEAM_BONUS_POINTS : 0;
  return {
    base,
    bonus,
    total: base + bonus,
  };
}

/**
 * Calculate total game stats across all rounds
 */
export function calculateGameTotals(results: RoundResult[]): {
  totalScore: number;
  completedCount: number;
  totalTimeUsed: number;
} {
  return results.reduce(
    (acc, curr) => {
      return {
        totalScore: acc.totalScore + curr.totalPoints,
        completedCount: acc.completedCount + (curr.completed ? 1 : 0),
        totalTimeUsed: acc.totalTimeUsed + curr.timeUsedSeconds,
      };
    },
    { totalScore: 0, completedCount: 0, totalTimeUsed: 0 }
  );
}

/**
 * Performance rank evaluation
 */
export function getPerformanceRating(totalScore: number, maxPossible = 80): {
  rank: string;
  badge: string;
  verdict: string;
} {
  const percentage = (totalScore / maxPossible) * 100;
  if (percentage >= 90) {
    return {
      rank: 'MASTER CIPHER AGENT',
      badge: 'TOP SECRET CLEARANCE',
      verdict: 'Elite cryptographic intuition and instant threat mitigation.',
    };
  }
  if (percentage >= 70) {
    return {
      rank: 'SENIOR CRYPTANALYST',
      badge: 'LEVEL 4 CLEARANCE',
      verdict: 'Impressive codebreaking speed and sharp cybersecurity vigilance.',
    };
  }
  if (percentage >= 40) {
    return {
      rank: 'DEFENSE SPECIALIST',
      badge: 'LEVEL 2 CLEARANCE',
      verdict: 'Solid grasp of foundational ciphers and cyber safety protocols.',
    };
  }
  return {
    rank: 'SECURITY RECRUIT',
    badge: 'OPERATIONAL TRAINEE',
    verdict: 'Great effort! Revisit the cipher patterns and sharpen your decoding speed.',
  };
}
