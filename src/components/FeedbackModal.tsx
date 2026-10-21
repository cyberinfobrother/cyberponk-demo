import React, { useState } from 'react';
import { Challenge, GameMode } from '../types/game';
import { ShieldCheck, AlertOctagon, ArrowRight, Award, Zap, RotateCcw } from 'lucide-react';
import { MAIN_ROUND_POINTS, FIRST_TEAM_BONUS_POINTS, BONUS_ROUND_POINTS } from '../utils/scoring';
import { sound } from '../utils/soundEffects';

interface FeedbackModalProps {
  challenge: Challenge;
  isOpen: boolean;
  isSuccess: boolean;
  gameMode: GameMode;
  initialFirstTeamBonus?: boolean;
  onContinue: (awardedFirstTeam: boolean) => void;
  onRetryRound?: () => void;
}

export const FeedbackModal: React.FC<FeedbackModalProps> = ({
  challenge,
  isOpen,
  isSuccess,
  gameMode,
  initialFirstTeamBonus = false,
  onContinue,
  onRetryRound,
}) => {
  const [firstTeamBonus, setFirstTeamBonus] = useState(initialFirstTeamBonus);

  if (!isOpen) return null;

  const basePoints = isSuccess
    ? challenge.isBonus
      ? BONUS_ROUND_POINTS
      : MAIN_ROUND_POINTS
    : 0;

  const totalPoints = basePoints + (isSuccess && !challenge.isBonus && firstTeamBonus ? FIRST_TEAM_BONUS_POINTS : 0);

  const handleContinue = () => {
    sound.playKeyClick();
    onContinue(firstTeamBonus);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="feedback-modal-title"
    >
      <div className="relative w-full max-w-xl bg-slate-900 border-2 rounded-2xl p-6 md:p-8 shadow-2xl overflow-hidden animate-scaleUp border-emerald-500/50">
        {/* Accent Glow Header */}
        <div className="flex items-center gap-3 mb-5 border-b border-slate-800 pb-4">
          <div
            className={`p-3 rounded-xl ${
              isSuccess ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
            }`}
          >
            {isSuccess ? (
              <ShieldCheck className="w-8 h-8" />
            ) : (
              <AlertOctagon className="w-8 h-8" />
            )}
          </div>
          <div>
            <div className="text-xs font-mono tracking-wider text-slate-400 uppercase">
              {challenge.title} · {challenge.cipherName}
            </div>
            <h2
              id="feedback-modal-title"
              className={`text-xl md:text-2xl font-black font-display tracking-wide ${
                isSuccess ? 'text-emerald-400' : 'text-red-400'
              }`}
            >
              {isSuccess ? 'DECRYPTION SUCCESSFUL' : 'TIME EXPIRED'}
            </h2>
          </div>
        </div>

        {/* Decoded Output Box */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 mb-5">
          <div className="text-[11px] font-mono text-slate-400 uppercase">
            {isSuccess ? 'DECODED TRANSMISSION' : 'INTENDED MESSAGE'}
          </div>
          <div className="text-xl md:text-2xl font-bold font-mono tracking-wider text-emerald-300">
            {challenge.correctAnswer}
          </div>
        </div>

        {/* Cybersecurity Directive / Tip */}
        <div className="bg-slate-800/40 border border-slate-700/60 rounded-xl p-4 mb-5 space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-300 font-bold uppercase">
            <Zap className="w-4 h-4 text-cyan-400" />
            <span>CYBERSECURITY TIP REVEALED</span>
          </div>
          <div className="text-lg font-bold text-white font-display">
            “{challenge.cybersecurityTip}”
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">
            {challenge.explanation}
          </p>
        </div>

        {/* Scoring Breakdown */}
        {isSuccess ? (
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 mb-6 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-400 font-mono">Base Completion Points:</span>
              <span className="font-mono font-bold text-emerald-400 tabular-nums">
                +{basePoints} PTS
              </span>
            </div>

            {/* First Team Bonus toggle (main rounds only) */}
            {!challenge.isBonus && (
              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={firstTeamBonus}
                    onChange={e => {
                      setFirstTeamBonus(e.target.checked);
                      sound.playKeyClick();
                    }}
                    className="w-4 h-4 rounded text-emerald-500 accent-emerald-500 bg-slate-900 border-slate-700 cursor-pointer"
                  />
                  <span className="text-xs sm:text-sm text-slate-300 font-mono">
                    {gameMode === 'team'
                      ? 'First team to finish round (+5 Bonus)'
                      : 'Practice speed bonus (+5 Bonus)'}
                  </span>
                </label>
                {firstTeamBonus && (
                  <span className="text-xs font-mono font-bold text-cyan-400 tabular-nums">
                    +{FIRST_TEAM_BONUS_POINTS} PTS
                  </span>
                )}
              </div>
            )}

            <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-base font-bold font-mono">
              <span className="text-white">Round Points Earned:</span>
              <span className="text-emerald-400 text-lg tabular-nums">
                +{totalPoints} PTS
              </span>
            </div>
          </div>
        ) : (
          <div className="bg-slate-950 p-3.5 rounded-xl border border-red-500/30 mb-6 text-center text-xs font-mono text-slate-400">
            Round completed after timer expiry. Points awarded: <strong className="text-red-400">0 PTS</strong>.
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-end">
          {!isSuccess && onRetryRound && (
            <button
              type="button"
              onClick={onRetryRound}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-mono font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>PRACTICE RETRY</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleContinue}
            className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-sm font-mono font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-500/20 cursor-pointer"
          >
            <span>{challenge.roundNumber === 6 ? 'PROCEED TO DEBRIEF' : 'NEXT ROUND'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
