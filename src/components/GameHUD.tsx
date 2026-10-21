import React, { useState } from 'react';
import { GameMode, RoundResult } from '../types/game';
import { CHALLENGES } from '../data/challenges';
import { Shield, Volume2, VolumeX, LogOut, Check, Trophy } from 'lucide-react';
import { sound } from '../utils/soundEffects';

interface GameHUDProps {
  currentRoundNumber: number;
  teamName: string;
  gameMode: GameMode;
  totalScore: number;
  roundResults: RoundResult[];
  onAbandonMission: () => void;
}

export const GameHUD: React.FC<GameHUDProps> = ({
  currentRoundNumber,
  teamName,
  gameMode,
  totalScore,
  roundResults,
  onAbandonMission,
}) => {
  const [isMuted, setIsMuted] = useState(() => sound.getMuted());
  const [showAbandonConfirm, setShowAbandonConfirm] = useState(false);

  const toggleSound = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
    if (!muted) sound.playKeyClick();
  };

  return (
    <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3">
        {/* Top bar: Brand + Team + Score + Audio/Quit */}
        <div className="flex items-center justify-between gap-4">
          {/* Brand & Team */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] font-mono tracking-widest text-emerald-400 uppercase font-semibold">
                CYBERSECURITY DAY // {gameMode.toUpperCase()}
              </div>
              <div className="text-sm md:text-base font-bold font-display text-white truncate max-w-[180px] sm:max-w-xs">
                {teamName}
              </div>
            </div>
          </div>

          {/* Score & Controls */}
          <div className="flex items-center gap-3">
            {/* Score */}
            <div className="bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-400" />
              <div className="font-mono text-sm sm:text-base font-extrabold text-emerald-400 tabular-nums">
                {totalScore} <span className="text-[11px] font-normal text-slate-400">PTS</span>
              </div>
            </div>

            {/* Audio Toggle */}
            <button
              type="button"
              onClick={toggleSound}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
              title={isMuted ? 'Unmute sounds' : 'Mute sounds'}
              aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
            </button>

            {/* Abandon mission button */}
            <button
              type="button"
              onClick={() => setShowAbandonConfirm(true)}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-red-400 transition-colors cursor-pointer"
              title="Abandon mission"
              aria-label="Abandon mission"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mission Progress Indicator Bar */}
        <div className="mt-3 pt-2 border-t border-slate-850 flex items-center justify-between overflow-x-auto no-scrollbar gap-2 py-1">
          {CHALLENGES.map((ch, idx) => {
            const isCompleted = roundResults.some(r => r.roundId === ch.id && r.completed);
            const isCurrent = ch.roundNumber === currentRoundNumber;
            const isLocked = ch.roundNumber > currentRoundNumber && !isCompleted;

            let badgeClass = 'text-slate-500 border-slate-800 bg-slate-950';
            if (isCompleted) {
              badgeClass = 'text-emerald-400 border-emerald-500/50 bg-emerald-950/40';
            } else if (isCurrent) {
              badgeClass = 'text-cyan-300 border-cyan-400 bg-cyan-950/60 ring-2 ring-cyan-500/30';
            }

            return (
              <React.Fragment key={ch.id}>
                <div
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-mono whitespace-nowrap transition-all ${badgeClass}`}
                  title={`${ch.title}: ${ch.cipherName}`}
                >
                  {isCompleted ? (
                    <Check className="w-3 h-3 text-emerald-400" />
                  ) : (
                    <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />
                  )}
                  <span className="font-semibold">
                    {ch.isBonus ? 'BONUS' : `ROUND 0${ch.roundNumber}`}
                  </span>
                </div>

                {idx < CHALLENGES.length - 1 && (
                  <span className="text-slate-700 text-xs hidden sm:inline" aria-hidden="true">
                    →
                  </span>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Abandon Confirmation Dialog */}
      {showAbandonConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-sm w-full space-y-4 shadow-2xl">
            <h3 className="text-lg font-bold text-white font-display">Abandon Mission?</h3>
            <p className="text-xs text-slate-400 leading-relaxed font-mono">
              Are you sure you want to exit? Your ongoing cipher round progress will be cancelled.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowAbandonConfirm(false)}
                className="px-4 py-2 text-xs font-mono bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700"
              >
                Continue Mission
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowAbandonConfirm(false);
                  onAbandonMission();
                }}
                className="px-4 py-2 text-xs font-mono bg-red-600 hover:bg-red-500 text-white font-bold rounded-lg"
              >
                Confirm Exit
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
