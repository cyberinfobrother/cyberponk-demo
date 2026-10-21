import React from 'react';
import { ShieldCheck, Cpu, KeyRound, ArrowRight } from 'lucide-react';
import { sound } from '../utils/soundEffects';

interface RealityCheckProps {
  onContinue: () => void;
}

export const RealityCheck: React.FC<RealityCheckProps> = ({ onContinue }) => {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      <div className="text-center mb-8">
        <span className="text-xs font-mono tracking-widest text-emerald-400 font-semibold block mb-1">
          EDUCATIONAL BRIEFING
        </span>
        <h2 className="text-3xl md:text-4xl font-black font-display text-white">
          Why Real Encryption is Stronger
        </h2>
        <p className="text-slate-400 text-sm mt-2 max-w-xl mx-auto">
          Classical paper ciphers are fantastic learning tools, but modern cyber defense relies on mathematical computational hardness.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Classical Cipher Card */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono tracking-wider text-slate-400 uppercase font-semibold">
                CAESAR CIPHER
              </span>
              <KeyRound className="w-5 h-5 text-red-400" />
            </div>

            <div className="font-display font-extrabold text-5xl md:text-6xl text-red-400 mb-4 tracking-tight tabular-nums">
              25
            </div>

            <div className="text-base font-semibold text-slate-200 mb-2">
              Possible Keys
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              You cracked it by hand in minutes — a modern smartphone or laptop can test every possible permutation in microseconds.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 text-xs font-mono text-red-400/90 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500" />
            <span>Vulnerable to brute-force and frequency analysis</span>
          </div>
        </div>

        {/* Modern AES-256 Card */}
        <div className="bg-slate-900/90 border-2 border-emerald-500/60 rounded-2xl p-6 md:p-8 flex flex-col justify-between shadow-xl shadow-emerald-950/40">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono tracking-wider text-emerald-400 uppercase font-semibold">
                AES-256 ENCRYPTION
              </span>
              <Cpu className="w-5 h-5 text-emerald-400" />
            </div>

            <div className="font-display font-extrabold text-5xl md:text-6xl text-emerald-400 mb-4 tracking-tight">
              2<sup className="text-3xl text-emerald-300">256</sup>
            </div>

            <div className="text-base font-semibold text-slate-200 mb-2">
              Possible Keys (78-digit number)
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              1.15 × 10<sup>77</sup> combinations. It would take all supercomputers on Earth billions of years to crack. It protects your banking, shopping, passwords, and messaging apps.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 text-xs font-mono text-emerald-400 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Military-grade standard for modern cybersecurity</span>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          type="button"
          onClick={() => {
            sound.playKeyClick();
            onContinue();
          }}
          className="px-8 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold font-mono rounded-xl flex items-center gap-2 shadow-xl shadow-emerald-500/20 cursor-pointer text-base transition-all"
        >
          <span>VIEW FINAL MISSION RESULTS</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
