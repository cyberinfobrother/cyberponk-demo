export interface Challenge {
  id: number;
  roundNumber: number;
  title: string;
  subtitle: string;
  cipherName: string;
  difficulty: 'Easy' | 'Hard' | 'Sudden Death';
  timeLimitSeconds: number;
  baseScore: number;
  interceptedMessage: string;
  displayLines?: string[];
  cipherInstructions: string;
  hint: string;
  correctAnswer: string;
  cybersecurityTip: string;
  explanation: string;
  isBonus?: boolean;
}

export type GameMode = 'team' | 'solo';

export type ScreenState =
  | 'HOME'
  | 'SETUP'
  | 'BRIEFING'
  | 'GAMEPLAY'
  | 'ANSWER_FEEDBACK'
  | 'REALITY_CHECK'
  | 'LEADERBOARD'
  | 'MISSION_COMPLETE';

export interface RoundResult {
  roundId: number;
  completed: boolean;
  userAnswer: string;
  timeUsedSeconds: number;
  timeRemainingSeconds: number;
  basePointsEarned: number;
  firstTeamBonusEarned: boolean;
  totalPoints: number;
  timedOut: boolean;
  hintUsed: boolean;
}

export interface LeaderboardEntry {
  id: string;
  teamName: string;
  mode: GameMode;
  totalScore: number;
  completedRoundsCount: number;
  totalTimeUsedSeconds: number;
  date: string;
  roundResults: RoundResult[];
}
