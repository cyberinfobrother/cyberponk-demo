import React from 'react';
import { Challenge, RoundResult, GameMode } from '../types/game';
import { CHALLENGES } from '../data/challenges';
import { getPerformanceRating } from '../utils/scoring';
import {
  ShieldCheck,
  Trophy,
  Clock,
  RotateCcw,
  Home,
  CheckCircle2,
  XCircle,
  Award,
  Volume2,
  ListOrdered,
} from 'lucide-react';
import { sound } from '../utils/soundEffects';

interface MissionCompleteProps {
  teamName: string;
  gameMode: GameMode;
  roundResults: RoundResult[];
  onPlayAgain: () => void;
  onReturnHome: () => void;
  onViewLeaderboard: () => void;
}

export const MissionComplete: React.FC<MissionCompleteProps> = ({
  teamName,
  gameMode,
  roundResults,
  onPlayAgain,
  onReturnHome,
  onViewLeaderboard,
}) => {
  const totalScore = roundResults.reduce((sum, r) => sum + r.totalPoints, 0);
  const completedCount = roundResults.filter(r => r.completed).length;
  const totalTimeUsed = roundResults.reduce((sum, r) => sum + r.timeUsedSeconds, 0);

  const rating = getPerformanceRating(totalScore);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}m ${s}s`;
  };

  const facilitatorScript = `Team "${teamName || 'Cipher Squad'}" finished the mission with ${totalScore} points, successfully cracking ${completedCount} of 6 cybersecurity ciphers in ${formatTime(totalTimeUsed)}!`;

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 space-y-8 animate-fadeIn">
      {/* Banner / Access Granted */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 font-mono text-xs font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/40 px-3.5 py-1.5 rounded-full">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>&gt; ACCESS GRANTED</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black font-display tracking-tight text-white">
          MISSION COMPLETE
        </h1>

        <p className="text-lg md:text-xl font-medium text-emerald-300 font-sans">
          “Crack codes for fun. Lock your data for real.”
        </p>

        <p className="text-xs sm:text-sm text-slate-400 font-mono">
          Tally the scores and crown your champion codebreakers!
        </p>
      </div>

      {/* Hero Badge & Performance Overview */}
      <div className="bg-slate-900/90 border-2 border-emerald-500/40 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center divide-y sm:divide-y-0 sm:divide-x divide-slate-800">
          {/* Score */}
          <div className="pt-4 sm:pt-0 sm:px-4">
            <span className="text-xs font-mono text-slate-400 block mb-1">TOTAL MISSION SCORE</span>
            <div className="text-4xl sm:text-5xl font-black font-display text-emerald-400 tabular-nums">
              {totalScore} <span className="text-xl font-normal text-slate-400">PTS</span>
            </div>
            <span className="text-xs text-slate-400 mt-1 block">Max Possible: 80 PTS</span>
          </div>

          {/* Decryptions */}
          <div className="pt-4 sm:pt-0 sm:px-4">
            <span className="text-xs font-mono text-slate-400 block mb-1">CIPHERS DECODED</span>
            <div className="text-4xl sm:text-5xl font-black font-display text-cyan-300 tabular-nums">
              {completedCount} <span className="text-xl font-normal text-slate-400">/ 6</span>
            </div>
            <span className="text-xs text-slate-400 mt-1 block">5 Main + 1 Sudden Death</span>
          </div>

          {/* Time */}
          <div className="pt-4 sm:pt-0 sm:px-4">
            <span className="text-xs font-mono text-slate-400 block mb-1">TOTAL TIME USED</span>
            <div className="text-4xl sm:text-5xl font-black font-display text-slate-200 tabular-nums font-mono">
              {formatTime(totalTimeUsed)}
            </div>
            <span className="text-xs text-slate-400 mt-1 block">Across all challenges</span>
          </div>
        </div>

        {/* Rating Banner */}
        <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-950/70 p-4 rounded-xl border border-slate-800/80">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-emerald-500/20 text-emerald-400">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-mono text-emerald-400 font-bold tracking-wider">
                {rating.badge}
              </div>
              <div className="text-lg font-bold text-white font-display">
                {rating.rank} · {teamName || 'Codebreaker Team'}
              </div>
            </div>
          </div>
          <div className="text-xs text-slate-300 max-w-xs text-center sm:text-right">
            {rating.verdict}
          </div>
        </div>
      </div>

      {/* Facilitator Announcement Script */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 sm:p-5 flex items-start gap-3">
        <Volume2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="text-xs font-mono font-bold text-cyan-300 uppercase">
            Facilitator Read-Aloud Summary
          </span>
          <p className="text-sm font-mono text-slate-200 italic">
            “{facilitatorScript}”
          </p>
        </div>
      </div>

      {/* What You Decoded — Summary Grid (from slide 9 of PDF) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold font-display text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span>What You Decoded &amp; Key Safety Directives</span>
          </h2>
          <span className="text-xs font-mono text-slate-400">6 Real Security Tips</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {CHALLENGES.map(ch => {
            const res = roundResults.find(r => r.roundId === ch.id);
            const isDone = res?.completed;

            return (
              <div
                key={ch.id}
                className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex flex-col justify-between hover:border-slate-700 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-2 font-mono">
                    <span>
                      Round {ch.roundNumber} · {ch.cipherName.replace(' Cipher', '')}
                    </span>
                    {isDone ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-400" />
                    )}
                  </div>

                  <div className="font-mono font-bold text-base text-emerald-300 mb-2 tracking-wide">
                    {ch.correctAnswer}
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {ch.explanation}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>Earned:</span>
                  <span className="font-bold text-emerald-400 tabular-nums">
                    {res ? `+${res.totalPoints} PTS` : '0 PTS'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation Actions */}
      <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => {
            sound.playKeyClick();
            onViewLeaderboard();
          }}
          className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-mono font-semibold rounded-xl flex items-center gap-2 transition-colors cursor-pointer"
        >
          <ListOrdered className="w-4 h-4 text-cyan-400" />
          <span>SESSION LEADERBOARD</span>
        </button>

        <button
          type="button"
          onClick={() => {
            sound.playKeyClick();
            onPlayAgain();
          }}
          className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-sm font-mono font-bold rounded-xl flex items-center gap-2 shadow-xl shadow-emerald-500/20 transition-all cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>PLAY AGAIN</span>
        </button>

        <button
          type="button"
          onClick={() => {
            sound.playKeyClick();
            onReturnHome();
          }}
          className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-mono font-semibold rounded-xl flex items-center gap-2 transition-colors cursor-pointer"
        >
          <Home className="w-4 h-4 text-slate-400" />
          <span>RETURN HOME</span>
        </button>
      </div>
    </div>
  );
};
