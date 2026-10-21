import React, { useState } from 'react';
import { Challenge } from '../types/game';
import { caesarDecrypt } from '../engines/caesarCipher';
import { atbashDecode } from '../engines/atbashCipher';
import { reverseString } from '../engines/reverseCipher';
import { PigpenChart } from './PigpenChart';

interface InteractiveToolboxProps {
  challenge: Challenge;
}

export const InteractiveToolbox: React.FC<InteractiveToolboxProps> = ({ challenge }) => {
  // Round 1 state
  const [round1Shift, setRound1Shift] = useState(3);

  // Round 2 state
  const [mysteryShift, setMysteryShift] = useState(1);

  // Round 3 state (A1Z26)
  const [testNumber, setTestNumber] = useState('');

  // Round 4 state (Atbash)
  const [testAtbashInput, setTestAtbashInput] = useState('');

  // Bonus state (Reverse)
  const [testReverseInput, setTestReverseInput] = useState('');

  const renderTool = () => {
    switch (challenge.roundNumber) {
      case 1: {
        const preview = caesarDecrypt('VWDB VDIH RQOLQH', round1Shift);
        return (
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-semibold text-emerald-400">
                CAESAR DECRYPTION SLIDER
              </span>
              <span className="text-xs font-mono text-slate-400">
                Shift: <strong className="text-emerald-300">-{round1Shift}</strong>
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-slate-500">1</span>
              <input
                type="range"
                min="1"
                max="5"
                value={round1Shift}
                onChange={e => setRound1Shift(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
                aria-label="Caesar shift slider"
              />
              <span className="text-xs font-mono text-slate-500">5</span>
            </div>

            <div className="bg-slate-950 p-2.5 rounded border border-slate-800 font-mono text-xs">
              <div className="text-slate-400 text-[11px] mb-1">
                Preview with shift -{round1Shift}:
              </div>
              <div className="text-emerald-300 font-bold tracking-wider text-sm">
                {preview}
              </div>
            </div>
          </div>
        );
      }

      case 2: {
        const shortWordDecoded = caesarDecrypt('DTZW', mysteryShift);
        const fullPreview = caesarDecrypt('SJAJW XMFWJ DTZW UFXXBTWI', mysteryShift);
        return (
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-semibold text-emerald-400">
                MYSTERY SHIFT BRUTE-FORCE EXPLORER (1–10)
              </span>
              <span className="text-xs font-mono text-cyan-300 font-bold">
                Test Shift: -{mysteryShift}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-slate-500">1</span>
              <input
                type="range"
                min="1"
                max="10"
                value={mysteryShift}
                onChange={e => setMysteryShift(Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
                aria-label="Mystery shift slider"
              />
              <span className="text-xs font-mono text-slate-500">10</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="bg-slate-950 p-2.5 rounded border border-slate-800 font-mono text-xs">
                <div className="text-slate-400 text-[11px] mb-0.5">Short Word: DTZW</div>
                <div className="text-cyan-300 font-bold text-sm tracking-wider">
                  {shortWordDecoded}{' '}
                  {shortWordDecoded === 'YOUR' && (
                    <span className="text-emerald-400 text-xs font-semibold">✓ MATCH!</span>
                  )}
                </div>
              </div>

              <div className="bg-slate-950 p-2.5 rounded border border-slate-800 font-mono text-xs">
                <div className="text-slate-400 text-[11px] mb-0.5">Full Message Preview</div>
                <div className="text-slate-200 font-bold text-xs tracking-wider truncate">
                  {fullPreview}
                </div>
              </div>
            </div>
          </div>
        );
      }

      case 3: {
        return (
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-semibold text-emerald-400">
                A1Z26 NUMBER DECODER REFERENCE
              </span>
              <span className="text-xs font-mono text-slate-400">A=1 ... Z=26</span>
            </div>

            {/* Quick 26-letter grid */}
            <div className="grid grid-cols-13 gap-1 text-center font-mono">
              {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((letter, i) => (
                <div
                  key={letter}
                  className="bg-slate-950 border border-slate-800 rounded p-1 hover:border-emerald-500 transition-colors"
                >
                  <div className="text-xs font-bold text-emerald-300">{letter}</div>
                  <div className="text-[10px] text-slate-400">{i + 1}</div>
                </div>
              ))}
            </div>

            {/* Scratchpad */}
            <div className="flex items-center gap-2 pt-1">
              <input
                type="text"
                placeholder="Type numbers e.g. 12-15-3-11"
                value={testNumber}
                onChange={e => setTestNumber(e.target.value)}
                className="bg-slate-950 border border-slate-700 rounded px-2.5 py-1 text-xs font-mono text-white focus:outline-none focus:border-emerald-400 flex-1"
              />
              <div className="bg-slate-950 px-3 py-1 rounded border border-slate-800 font-mono text-xs text-cyan-300 font-bold">
                {testNumber
                  ? testNumber
                      .split(/[- ]+/)
                      .map(n => {
                        const val = parseInt(n, 10);
                        return val >= 1 && val <= 26 ? String.fromCharCode(64 + val) : '?';
                      })
                      .join('')
                  : 'RESULT'}
              </div>
            </div>
          </div>
        );
      }

      case 4: {
        const mirrorAlphabet = 'ZYXWVUTSRQPONMLKJIHGFEDCBA';
        const atbashPreview = atbashDecode(testAtbashInput || 'GSRMP');

        return (
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-semibold text-emerald-400">
                ATBASH MIRROR ALPHABET STRIP
              </span>
              <span className="text-xs font-mono text-slate-400">A ↔ Z, B ↔ Y</span>
            </div>

            <div className="grid grid-cols-13 gap-1 text-center font-mono">
              {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((letter, i) => (
                <div
                  key={letter}
                  className="bg-slate-950 border border-slate-800 rounded p-1 hover:border-cyan-500 transition-colors"
                >
                  <div className="text-xs font-bold text-cyan-300">{letter}</div>
                  <div className="text-[10px] text-emerald-400">{mirrorAlphabet[i]}</div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 pt-1">
              <input
                type="text"
                placeholder="Test Atbash word e.g. GSRMP"
                value={testAtbashInput}
                onChange={e => setTestAtbashInput(e.target.value)}
                className="bg-slate-950 border border-slate-700 rounded px-2.5 py-1 text-xs font-mono text-white focus:outline-none focus:border-cyan-400 flex-1"
              />
              <div className="bg-slate-950 px-3 py-1 rounded border border-slate-800 font-mono text-xs text-emerald-300 font-bold">
                Decoded: {atbashPreview}
              </div>
            </div>
          </div>
        );
      }

      case 5: {
        return <PigpenChart />;
      }

      case 6: {
        return (
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-semibold text-emerald-400">
                REVERSE TEXT SCRATCHPAD
              </span>
              <span className="text-xs font-mono text-slate-400">Read Right to Left</span>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Test reversing e.g. DROWSSAP"
                value={testReverseInput}
                onChange={e => setTestReverseInput(e.target.value)}
                className="bg-slate-950 border border-slate-700 rounded px-2.5 py-1 text-xs font-mono text-white focus:outline-none focus:border-emerald-400 flex-1"
              />
              <div className="bg-slate-950 px-3 py-1 rounded border border-slate-800 font-mono text-xs text-cyan-300 font-bold">
                {reverseString(testReverseInput || 'DROWSSAP')}
              </div>
            </div>
          </div>
        );
      }

      default:
        return null;
    }
  };

  return <div className="mt-4">{renderTool()}</div>;
};
