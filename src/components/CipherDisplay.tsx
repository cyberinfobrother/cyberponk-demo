import React from 'react';
import { Challenge } from '../types/game';
import { PigpenSymbol } from './PigpenSymbol';

interface CipherDisplayProps {
  challenge: Challenge;
}

export const CipherDisplay: React.FC<CipherDisplayProps> = ({ challenge }) => {
  const isPigpen = challenge.roundNumber === 5;
  const isBonus = challenge.isBonus;

  return (
    <div className="relative rounded-2xl overflow-hidden border border-emerald-500/30 bg-slate-950/90 shadow-2xl shadow-emerald-950/30">
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/90 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
          <span className="ml-2 font-mono text-[11px] tracking-widest text-slate-400 uppercase">
            {isBonus ? 'SUDDEN-DEATH MESSAGE' : 'INTERCEPTED MESSAGE'}
          </span>
        </div>
        <div className="text-[11px] font-mono text-slate-400">
          SEC-LEVEL: {challenge.difficulty.toUpperCase()}
        </div>
      </div>

      {/* Main Cipher Content Box */}
      <div className="p-6 md:p-10 flex flex-col items-center justify-center min-h-[200px] md:min-h-[240px] relative overflow-hidden">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b12_1px,transparent_1px),linear-gradient(to_bottom,#1e293b12_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

        {isPigpen ? (
          /* Vector Pigpen cipher display */
          <div className="flex flex-col items-center gap-4 sm:gap-6 relative z-10 w-full max-w-2xl py-2">
            {challenge.displayLines?.map((line, lineIdx) => (
              <div
                key={lineIdx}
                className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 p-2 bg-slate-900/60 rounded-xl border border-slate-800/80"
              >
                {line.split('').map((char, charIdx) => (
                  <div
                    key={charIdx}
                    className="p-1 sm:p-2 bg-slate-950/90 rounded border border-emerald-500/30 hover:border-cyan-400 transition-colors shadow-inner"
                  >
                    <PigpenSymbol
                      char={char}
                      size={38}
                      color="#00ff66"
                      strokeWidth={6}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        ) : (
          /* Monospace text cipher display */
          <div className="space-y-2 text-center relative z-10">
            {challenge.displayLines ? (
              challenge.displayLines.map((line, idx) => (
                <div
                  key={idx}
                  className="font-mono text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-widest text-emerald-400 drop-shadow-[0_0_12px_rgba(0,255,102,0.4)] select-all"
                >
                  {line}
                </div>
              ))
            ) : (
              <div className="font-mono text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-widest text-emerald-400 drop-shadow-[0_0_12px_rgba(0,255,102,0.4)] select-all">
                {challenge.interceptedMessage}
              </div>
            )}
          </div>
        )}

        {/* Decorative metadata line at bottom of message window */}
        <div className="mt-6 flex items-center justify-center gap-3 text-xs font-mono text-slate-400">
          <span>{Math.floor(challenge.timeLimitSeconds / 60)} MIN</span>
          <span aria-hidden="true">·</span>
          <span>+{challenge.baseScore} PTS</span>
          <span aria-hidden="true">·</span>
          <span>{challenge.cipherName}</span>
        </div>
      </div>
    </div>
  );
};
