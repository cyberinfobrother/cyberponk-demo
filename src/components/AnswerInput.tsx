import React, { useState, useRef, useEffect } from 'react';
import { Send, RotateCcw, ShieldCheck, AlertCircle } from 'lucide-react';
import { sound } from '../utils/soundEffects';

interface AnswerInputProps {
  onSubmit: (answer: string) => void;
  isSubmitting?: boolean;
  disabled?: boolean;
  lastErrorFeedback?: string | null;
  placeholder?: string;
}

export const AnswerInput: React.FC<AnswerInputProps> = ({
  onSubmit,
  isSubmitting = false,
  disabled = false,
  lastErrorFeedback = null,
  placeholder = 'TYPE DECRYPTED MESSAGE HERE...',
}) => {
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus on mount or round change
    if (!disabled && inputRef.current) {
      inputRef.current.focus();
    }
  }, [disabled]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!value.trim() || disabled || isSubmitting) return;
    sound.playKeyClick();
    onSubmit(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="w-full space-y-3">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <label htmlFor="cipher-answer-input" className="sr-only">
            Decrypted message submission
          </label>
          <input
            id="cipher-answer-input"
            ref={inputRef}
            type="text"
            value={value}
            disabled={disabled || isSubmitting}
            onChange={e => {
              setValue(e.target.value.toUpperCase());
            }}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            autoComplete="off"
            spellCheck="false"
            className="w-full bg-slate-950 border-2 border-slate-700 focus:border-emerald-400 rounded-xl px-4 py-3 text-base md:text-lg font-mono tracking-wider text-white placeholder-slate-600 focus:outline-none transition-colors shadow-inner"
          />

          {value && !disabled && (
            <button
              type="button"
              onClick={() => {
                setValue('');
                inputRef.current?.focus();
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 p-1"
              title="Clear input"
              aria-label="Clear input"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
        </div>

        <button
          type="submit"
          disabled={!value.trim() || disabled || isSubmitting}
          className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-800 disabled:text-slate-600 text-slate-950 font-bold font-mono rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-500/20 disabled:shadow-none whitespace-nowrap cursor-pointer disabled:cursor-not-allowed"
        >
          <Send className="w-4 h-4" />
          <span>SUBMIT DECRYPTION</span>
        </button>
      </form>

      {/* Helpful Error/Correction Alert */}
      {lastErrorFeedback && (
        <div
          role="alert"
          className="flex items-start gap-2.5 p-3 rounded-lg bg-red-950/50 border border-red-500/40 text-red-200 text-xs md:text-sm font-mono animate-shake"
        >
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
          <span>{lastErrorFeedback}</span>
        </div>
      )}
    </div>
  );
};
