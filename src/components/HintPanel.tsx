import React, { useState } from 'react';
import { Lightbulb, ChevronDown, ChevronUp } from 'lucide-react';
import { sound } from '../utils/soundEffects';

interface HintPanelProps {
  hint: string;
  onHintRevealed?: () => void;
}

export const HintPanel: React.FC<HintPanelProps> = ({ hint, onHintRevealed }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasRevealed, setHasRevealed] = useState(false);

  const toggleHint = () => {
    const nextState = !isOpen;
    setIsOpen(nextState);
    if (nextState && !hasRevealed) {
      setHasRevealed(true);
      sound.playHint();
      onHintRevealed?.();
    }
  };

  return (
    <div className="w-full">
      <button
        type="button"
        onClick={toggleHint}
        className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl border transition-all text-xs md:text-sm font-mono ${
          isOpen
            ? 'bg-amber-950/40 border-amber-500/50 text-amber-300'
            : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-amber-500/40 hover:text-amber-300'
        }`}
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-2">
          <Lightbulb
            className={`w-4 h-4 ${isOpen ? 'text-amber-400 fill-amber-400/30' : 'text-slate-400'}`}
          />
          <span className="font-semibold">
            {isOpen ? 'HINT DECRYPTED' : 'REQUEST HINT (NO PENALTY)'}
          </span>
        </div>
        {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>

      {isOpen && (
        <div className="mt-2 p-4 rounded-xl bg-amber-950/30 border border-amber-500/30 text-amber-200/90 text-sm font-sans leading-relaxed flex items-start gap-3 animate-fadeIn">
          <span className="text-amber-400 font-bold font-mono text-xs mt-0.5 shrink-0">[INTEL]</span>
          <p>{hint}</p>
        </div>
      )}
    </div>
  );
};
