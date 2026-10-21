import React, { useState } from 'react';
import { PigpenSymbol } from './PigpenSymbol';
import { PIGPEN_MAP } from '../engines/pigpenCipher';

export const PigpenChart: React.FC = () => {
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 md:p-6 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3 mb-4">
        <div>
          <h3 className="text-base font-bold text-white tracking-wide flex items-center gap-2">
            <span className="w-2 h-2 rounded-sm bg-cyan-400" />
            PIGPEN CIPHER KEY
          </h3>
          <p className="text-xs text-slate-400">
            Each symbol is the geometric shape of the “pen” enclosing each letter.
          </p>
        </div>
        {selectedLetter && (
          <div className="flex items-center gap-3 bg-cyan-950/60 border border-cyan-500/40 px-3 py-1.5 rounded-lg">
            <div className="text-right">
              <span className="text-xs text-cyan-300 block font-mono">SELECTED:</span>
              <span className="text-lg font-bold text-white">{selectedLetter}</span>
            </div>
            <div className="bg-slate-900 p-1 rounded border border-cyan-500/50">
              <PigpenSymbol char={selectedLetter} size={36} color="#00e5ff" strokeWidth={7} />
            </div>
            <button
              onClick={() => setSelectedLetter(null)}
              className="text-xs text-slate-400 hover:text-white ml-1 px-1 py-0.5"
              title="Clear selection"
            >
              ✕
            </button>
          </div>
        )}
      </div>

      {/* Grid Diagrams */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Grids 1 & 2 */}
        <div className="space-y-4">
          <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center justify-between">
            <span>Square Grids (A–R)</span>
            <span className="text-slate-400 text-[11px] font-normal">Dot indicates Grid 2</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Grid 1: A-I (No dot) */}
            <div className="bg-slate-950/70 p-3 rounded-lg border border-slate-800/80 flex flex-col items-center">
              <span className="text-[11px] font-mono text-emerald-400 mb-2 font-semibold">GRID 1 (NO DOT)</span>
              <div className="relative w-36 h-36 border-2 border-emerald-500/60 grid grid-cols-3 grid-rows-3 divide-x-2 divide-y-2 divide-emerald-500/60">
                {[
                  ['A', 'B', 'C'],
                  ['D', 'E', 'F'],
                  ['G', 'H', 'I'],
                ].map((row, rIdx) =>
                  row.map((letter, cIdx) => (
                    <button
                      key={letter}
                      type="button"
                      onClick={() => setSelectedLetter(letter)}
                      className={`flex flex-col items-center justify-center transition-colors hover:bg-emerald-500/20 ${
                        selectedLetter === letter ? 'bg-cyan-500/30 text-cyan-200' : 'text-slate-200'
                      }`}
                      title={`Inspect ${letter}`}
                    >
                      <span className="text-sm font-bold font-mono">{letter}</span>
                    </button>
                  ))
                )}
              </div>
            </div>

            {/* Grid 2: J-R (With dot) */}
            <div className="bg-slate-950/70 p-3 rounded-lg border border-slate-800/80 flex flex-col items-center">
              <span className="text-[11px] font-mono text-emerald-400 mb-2 font-semibold">GRID 2 (WITH DOT)</span>
              <div className="relative w-36 h-36 border-2 border-emerald-500/60 grid grid-cols-3 grid-rows-3 divide-x-2 divide-y-2 divide-emerald-500/60">
                {[
                  ['J', 'K', 'L'],
                  ['M', 'N', 'O'],
                  ['P', 'Q', 'R'],
                ].map((row, rIdx) =>
                  row.map((letter, cIdx) => (
                    <button
                      key={letter}
                      type="button"
                      onClick={() => setSelectedLetter(letter)}
                      className={`flex flex-col items-center justify-center transition-colors hover:bg-emerald-500/20 ${
                        selectedLetter === letter ? 'bg-cyan-500/30 text-cyan-200' : 'text-slate-200'
                      }`}
                      title={`Inspect ${letter} (dotted)`}
                    >
                      <div className="flex items-center gap-0.5">
                        <span className="text-sm font-bold font-mono">{letter}</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* X Grids: S-Z */}
        <div className="space-y-4">
          <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center justify-between">
            <span>X Grids (S–Z)</span>
            <span className="text-slate-400 text-[11px] font-normal">Diagonal Sectors</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* X 1: S, T, U, V (No dot) */}
            <div className="bg-slate-950/70 p-3 rounded-lg border border-slate-800/80 flex flex-col items-center">
              <span className="text-[11px] font-mono text-cyan-400 mb-2 font-semibold">X 1 (NO DOT)</span>
              <div className="relative w-36 h-36 flex items-center justify-center">
                {/* Diagonal lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-cyan-500/60 stroke-2">
                  <line x1="8" y1="8" x2="136" y2="136" />
                  <line x1="136" y1="8" x2="8" y2="136" />
                </svg>

                {/* S - Top */}
                <button
                  type="button"
                  onClick={() => setSelectedLetter('S')}
                  className={`absolute top-2 w-8 h-8 rounded flex items-center justify-center text-sm font-bold font-mono transition-colors ${
                    selectedLetter === 'S' ? 'bg-cyan-500/40 text-cyan-200' : 'text-slate-200 hover:bg-cyan-500/20'
                  }`}
                  title="Inspect S"
                >
                  S
                </button>

                {/* T - Left */}
                <button
                  type="button"
                  onClick={() => setSelectedLetter('T')}
                  className={`absolute left-2 w-8 h-8 rounded flex items-center justify-center text-sm font-bold font-mono transition-colors ${
                    selectedLetter === 'T' ? 'bg-cyan-500/40 text-cyan-200' : 'text-slate-200 hover:bg-cyan-500/20'
                  }`}
                  title="Inspect T"
                >
                  T
                </button>

                {/* U - Right */}
                <button
                  type="button"
                  onClick={() => setSelectedLetter('U')}
                  className={`absolute right-2 w-8 h-8 rounded flex items-center justify-center text-sm font-bold font-mono transition-colors ${
                    selectedLetter === 'U' ? 'bg-cyan-500/40 text-cyan-200' : 'text-slate-200 hover:bg-cyan-500/20'
                  }`}
                  title="Inspect U"
                >
                  U
                </button>

                {/* V - Bottom */}
                <button
                  type="button"
                  onClick={() => setSelectedLetter('V')}
                  className={`absolute bottom-2 w-8 h-8 rounded flex items-center justify-center text-sm font-bold font-mono transition-colors ${
                    selectedLetter === 'V' ? 'bg-cyan-500/40 text-cyan-200' : 'text-slate-200 hover:bg-cyan-500/20'
                  }`}
                  title="Inspect V"
                >
                  V
                </button>
              </div>
            </div>

            {/* X 2: W, X, Y, Z (With dot) */}
            <div className="bg-slate-950/70 p-3 rounded-lg border border-slate-800/80 flex flex-col items-center">
              <span className="text-[11px] font-mono text-cyan-400 mb-2 font-semibold">X 2 (WITH DOT)</span>
              <div className="relative w-36 h-36 flex items-center justify-center">
                {/* Diagonal lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-cyan-500/60 stroke-2">
                  <line x1="8" y1="8" x2="136" y2="136" />
                  <line x1="136" y1="8" x2="8" y2="136" />
                </svg>

                {/* W - Top */}
                <button
                  type="button"
                  onClick={() => setSelectedLetter('W')}
                  className={`absolute top-2 px-1.5 py-1 rounded flex items-center gap-0.5 text-sm font-bold font-mono transition-colors ${
                    selectedLetter === 'W' ? 'bg-cyan-500/40 text-cyan-200' : 'text-slate-200 hover:bg-cyan-500/20'
                  }`}
                  title="Inspect W (dotted)"
                >
                  <span>W</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                </button>

                {/* X - Left */}
                <button
                  type="button"
                  onClick={() => setSelectedLetter('X')}
                  className={`absolute left-1 px-1.5 py-1 rounded flex items-center gap-0.5 text-sm font-bold font-mono transition-colors ${
                    selectedLetter === 'X' ? 'bg-cyan-500/40 text-cyan-200' : 'text-slate-200 hover:bg-cyan-500/20'
                  }`}
                  title="Inspect X (dotted)"
                >
                  <span>X</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                </button>

                {/* Y - Right */}
                <button
                  type="button"
                  onClick={() => setSelectedLetter('Y')}
                  className={`absolute right-1 px-1.5 py-1 rounded flex items-center gap-0.5 text-sm font-bold font-mono transition-colors ${
                    selectedLetter === 'Y' ? 'bg-cyan-500/40 text-cyan-200' : 'text-slate-200 hover:bg-cyan-500/20'
                  }`}
                  title="Inspect Y (dotted)"
                >
                  <span>Y</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                </button>

                {/* Z - Bottom */}
                <button
                  type="button"
                  onClick={() => setSelectedLetter('Z')}
                  className={`absolute bottom-2 px-1.5 py-1 rounded flex items-center gap-0.5 text-sm font-bold font-mono transition-colors ${
                    selectedLetter === 'Z' ? 'bg-cyan-500/40 text-cyan-200' : 'text-slate-200 hover:bg-cyan-500/20'
                  }`}
                  title="Inspect Z (dotted)"
                >
                  <span>Z</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Interactive Alphabet Strip */}
      <div className="mt-4 pt-4 border-t border-slate-800">
        <span className="text-[11px] font-mono text-slate-400 block mb-2">
          QUICK GLYPH FINDER (TAP ANY LETTER TO PREVIEW ITS PEN SYMBOL):
        </span>
        <div className="flex flex-wrap gap-1">
          {Object.keys(PIGPEN_MAP).map(letter => (
            <button
              key={letter}
              type="button"
              onClick={() => setSelectedLetter(letter)}
              className={`w-7 h-7 text-xs font-bold font-mono rounded transition-colors ${
                selectedLetter === letter
                  ? 'bg-cyan-500 text-slate-950 shadow-sm'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {letter}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
