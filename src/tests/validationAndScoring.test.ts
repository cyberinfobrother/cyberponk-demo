import { describe, it, expect } from 'vitest';
import { normalizeAnswer, validateAnswer } from '../engines/answerValidation';
import {
  calculateRoundScore,
  calculateGameTotals,
  getPerformanceRating,
  MAIN_ROUND_POINTS,
  FIRST_TEAM_BONUS_POINTS,
  BONUS_ROUND_POINTS,
} from '../utils/scoring';
import { sortLeaderboard } from '../utils/leaderboard';
import { CHALLENGES } from '../data/challenges';
import { RoundResult, LeaderboardEntry } from '../types/game';

describe('Answer Validation & Normalization', () => {
  it('normalizes casing and trims surrounding whitespace', () => {
    expect(normalizeAnswer('  stay safe online  ')).toBe('STAY SAFE ONLINE');
  });

  it('collapses multiple spaces between words into a single space', () => {
    expect(normalizeAnswer('STAY    SAFE     ONLINE')).toBe('STAY SAFE ONLINE');
  });

  it('validates correct answer with case-insensitivity', () => {
    const res = validateAnswer('stay safe online', 'STAY SAFE ONLINE');
    expect(res.isValid).toBe(true);
  });

  it('rejects incorrect answers with helpful diagnostic word count feedback', () => {
    const res = validateAnswer('STAY SAFE', 'STAY SAFE ONLINE');
    expect(res.isValid).toBe(false);
    expect(res.feedbackMessage).toContain('expected message has 3 words');
  });

  it('detects partial matches and encourages student/player', () => {
    const res = validateAnswer('STAY SAFE OFFLINE', 'STAY SAFE ONLINE');
    expect(res.isValid).toBe(false);
    expect(res.feedbackMessage).toContain('Partial match detected');
  });

  it('rejects completely wrong word order or wrong text', () => {
    const res = validateAnswer('WRONG COMPLETELY NONSENSE', 'STAY SAFE ONLINE');
    expect(res.isValid).toBe(false);
  });
});

describe('Scoring Protocol', () => {
  const mainChallenge = CHALLENGES[0]; // Round 1
  const bonusChallenge = CHALLENGES[5]; // Bonus

  it('awards 10 base points for correct main round without first-team bonus', () => {
    const score = calculateRoundScore(mainChallenge, true, false);
    expect(score.base).toBe(MAIN_ROUND_POINTS);
    expect(score.bonus).toBe(0);
    expect(score.total).toBe(10);
  });

  it('awards 15 points (10 base + 5 bonus) for first team to finish main round', () => {
    const score = calculateRoundScore(mainChallenge, true, true);
    expect(score.base).toBe(MAIN_ROUND_POINTS);
    expect(score.bonus).toBe(FIRST_TEAM_BONUS_POINTS);
    expect(score.total).toBe(15);
  });

  it('awards 5 points total for bonus round without main round 10 pts', () => {
    const score = calculateRoundScore(bonusChallenge, true, true);
    expect(score.base).toBe(BONUS_ROUND_POINTS);
    expect(score.bonus).toBe(0);
    expect(score.total).toBe(5);
  });

  it('awards 0 points for failed or timed-out rounds', () => {
    const score = calculateRoundScore(mainChallenge, false, false);
    expect(score.total).toBe(0);
  });

  it('calculates game totals accurately', () => {
    const mockResults: RoundResult[] = [
      {
        roundId: 1,
        completed: true,
        userAnswer: 'STAY SAFE ONLINE',
        timeUsedSeconds: 45,
        timeRemainingSeconds: 135,
        basePointsEarned: 10,
        firstTeamBonusEarned: true,
        totalPoints: 15,
        timedOut: false,
        hintUsed: false,
      },
      {
        roundId: 2,
        completed: true,
        userAnswer: 'NEVER SHARE YOUR PASSWORD',
        timeUsedSeconds: 120,
        timeRemainingSeconds: 180,
        basePointsEarned: 10,
        firstTeamBonusEarned: false,
        totalPoints: 10,
        timedOut: false,
        hintUsed: true,
      },
      {
        roundId: 3,
        completed: false,
        userAnswer: '',
        timeUsedSeconds: 180,
        timeRemainingSeconds: 0,
        basePointsEarned: 0,
        firstTeamBonusEarned: false,
        totalPoints: 0,
        timedOut: true,
        hintUsed: true,
      },
    ];

    const totals = calculateGameTotals(mockResults);
    expect(totals.totalScore).toBe(25);
    expect(totals.completedCount).toBe(2);
    expect(totals.totalTimeUsed).toBe(345);
  });

  it('provides appropriate clearance rank for score', () => {
    expect(getPerformanceRating(75).rank).toBe('MASTER CIPHER AGENT');
    expect(getPerformanceRating(60).rank).toBe('SENIOR CRYPTANALYST');
    expect(getPerformanceRating(35).rank).toBe('DEFENSE SPECIALIST');
    expect(getPerformanceRating(15).rank).toBe('SECURITY RECRUIT');
  });
});

describe('Leaderboard Sorting Protocol', () => {
  it('sorts by score descending, then completed count descending, then time ascending', () => {
    const teams: LeaderboardEntry[] = [
      {
        id: '1',
        teamName: 'Team Slow High Score',
        mode: 'team',
        totalScore: 70,
        completedRoundsCount: 6,
        totalTimeUsedSeconds: 600,
        date: '10:00 AM',
        roundResults: [],
      },
      {
        id: '2',
        teamName: 'Team Fast High Score',
        mode: 'team',
        totalScore: 70,
        completedRoundsCount: 6,
        totalTimeUsedSeconds: 300,
        date: '10:15 AM',
        roundResults: [],
      },
      {
        id: '3',
        teamName: 'Team Medium Score',
        mode: 'team',
        totalScore: 50,
        completedRoundsCount: 5,
        totalTimeUsedSeconds: 200,
        date: '10:30 AM',
        roundResults: [],
      },
    ];

    const sorted = sortLeaderboard(teams);
    expect(sorted[0].teamName).toBe('Team Fast High Score');
    expect(sorted[1].teamName).toBe('Team Slow High Score');
    expect(sorted[2].teamName).toBe('Team Medium Score');
  });
});
