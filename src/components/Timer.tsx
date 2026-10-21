import React from 'react';
import { Clock, AlertTriangle } from 'lucide-react';

interface TimerProps {
  secondsRemaining: number;
  totalSeconds: number;
}

export const Timer: React.FC<TimerProps> = ({ secondsRemaining, totalSeconds }) => {
  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const percentRemaining = Math.max(0, Math.min(100, (secondsRemaining / totalSeconds) * 100));

  const isLowTime = secondsRemaining <= 30;
  const isCriticalTime = secondsRemaining <= 10;

  let textColor = 'text-emerald-400';
  let barColor = 'bg-emerald-500';
  let borderColor = 'border-slate-800';

  if (isCriticalTime) {
    textColor = 'text-red-400 animate-pulse';
    barColor = 'bg-red-500';
    borderColor = 'border-red-500/50';
  } else if (isLowTime) {
    textColor = 'text-amber-400';
    barColor = 'bg-amber-500';
    borderColor = 'border-amber-500/40';
  }

  return (
    <div
      className={`bg-slate-900/90 border ${borderColor} rounded-xl px-4 py-2 flex flex-col justify-center min-w-[140px] shadow-md`}
      role="timer"
      aria-live="polite"
      aria-label={`Time remaining: ${minutes} minutes and ${seconds} seconds`}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 text-slate-400 text-xs font-mono">
          {isCriticalTime ? (
            <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
          ) : (
            <Clock className="w-3.5 h-3.5 text-slate-400" />
          )}
          <span>TIME LEFT</span>
        </div>
        <div className={`font-mono text-lg font-extrabold tracking-wider tabular-nums ${textColor}`}>
          {formattedTime}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-800/80 rounded-full h-1.5 mt-1.5 overflow-hidden">
        <div
          className={`h-full transition-all duration-300 ${barColor}`}
          style={{ width: `${percentRemaining}%` }}
        />
      </div>
    </div>
  );
};
