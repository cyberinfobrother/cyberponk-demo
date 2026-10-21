import { LeaderboardEntry } from '../types/game';

const STORAGE_KEY = 'cyber_cipher_leaderboard_v1';

export function getLeaderboard(): LeaderboardEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const entries: LeaderboardEntry[] = JSON.parse(raw);
    return sortLeaderboard(entries);
  } catch {
    return [];
  }
}

export function saveLeaderboardEntry(entry: LeaderboardEntry): LeaderboardEntry[] {
  const current = getLeaderboard();
  const updated = [entry, ...current];
  const sorted = sortLeaderboard(updated);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sorted));
  } catch (e) {
    console.warn('Failed to save to localStorage', e);
  }
  return sorted;
}

export function clearLeaderboard(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.warn('Failed to clear leaderboard', e);
  }
}

export function sortLeaderboard(entries: LeaderboardEntry[]): LeaderboardEntry[] {
  return [...entries].sort((a, b) => {
    // 1. Highest score
    if (b.totalScore !== a.totalScore) {
      return b.totalScore - a.totalScore;
    }
    // 2. Highest number of completed challenges
    if (b.completedRoundsCount !== a.completedRoundsCount) {
      return b.completedRoundsCount - a.completedRoundsCount;
    }
    // 3. Shortest completion time
    return a.totalTimeUsedSeconds - b.totalTimeUsedSeconds;
  });
}
