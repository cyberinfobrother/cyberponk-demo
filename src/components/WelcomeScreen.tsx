import React from 'react';
import { GameMode } from '../types/game';
import { Shield, Play, User, HelpCircle, Trophy, Terminal, Lock } from 'lucide-react';
import { sound } from '../utils/soundEffects';

interface WelcomeScreenProps {
  onStartMission: (mode: GameMode) => void;
  onHowToPlay: () => void;
  onViewLeaderboard: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onStartMission,
  onHowToPlay,
  onViewLeaderboard,
}) => {
  return (
    <div className="relative min-h-[calc(100vh-80px)] flex flex-col justify-center items-center py-12 px-4 sm:px-6 overflow-hidden">
      {/* Decorative Binary Stream Background element from PDF */}
      <div className="absolute inset-0 flex flex-col justify-between py-6 opacity-10 pointer-events-none font-mono text-xs text-emerald-400 select-none overflow-hidden">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="whitespace-nowrap tracking-[0.3em]">
            01001100 01001111 01000011 01001011 · 01000011 01011001 01000010 01000101 01010010 · 01000011 01001001 01010000 01001000 01000101 01010010
          </div>
        ))}
      </div>

      <div className="relative z-10 max-w-3xl w-full text-center space-y-8">
        {/* Shield Icon / Emblem */}
        <div className="inline-flex items-center justify-center p-4 rounded-3xl bg-slate-900/90 border border-emerald-500/30 shadow-2xl shadow-emerald-500/10">
          <div className="relative">
            <Shield className="w-16 h-16 sm:w-20 sm:h-20 text-emerald-400" />
            <Lock className="w-7 h-7 text-cyan-300 absolute inset-0 m-auto" />
          </div>
        </div>

        {/* Title & Tagline matching PDF Slide 1 */}
        <div className="space-y-3">
          <div className="font-mono text-xs sm:text-sm font-bold tracking-[0.25em] text-emerald-400 uppercase">
            &gt; CYBERSECURITY DAY
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black font-display tracking-tight text-white drop-shadow-sm">
            CIPHER CHALLENGE
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl font-medium text-slate-300 font-sans">
            “Crack the code. Learn the tip. Stay safe online.”
          </p>
        </div>

        {/* Decorative Binary pill from PDF slide 1 */}
        <div className="inline-block bg-slate-900/80 border border-slate-800 px-4 py-1.5 rounded-full font-mono text-xs text-slate-400 tracking-widest select-all">
          01001100 01001111 01000011 01001011
        </div>

        {/* Core Actions */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
          {/* Primary CTA: Start Mission in Team Mode */}
          <button
            type="button"
            onClick={() => {
              sound.playKeyClick();
              onStartMission('team');
            }}
            className="w-full sm:w-auto px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-base font-bold font-mono rounded-xl flex items-center justify-center gap-2.5 shadow-xl shadow-emerald-500/25 transition-all cursor-pointer hover:scale-[1.02]"
          >
            <Play className="w-5 h-5 fill-slate-950" />
            <span>START MISSION (TEAM)</span>
          </button>

          {/* Solo Practice */}
          <button
            type="button"
            onClick={() => {
              sound.playKeyClick();
              onStartMission('solo');
            }}
            className="w-full sm:w-auto px-6 py-4 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-cyan-400 text-sm font-mono font-semibold rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <User className="w-4 h-4 text-cyan-400" />
            <span>SOLO PRACTICE</span>
          </button>
        </div>

        {/* Secondary Links: How to play & Leaderboard */}
        <div className="pt-2 flex items-center justify-center gap-6 text-xs sm:text-sm font-mono text-slate-400">
          <button
            type="button"
            onClick={() => {
              sound.playKeyClick();
              onHowToPlay();
            }}
            className="hover:text-emerald-400 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <HelpCircle className="w-4 h-4" />
            <span>HOW TO PLAY</span>
          </button>

          <span className="text-slate-700">·</span>

          <button
            type="button"
            onClick={() => {
              sound.playKeyClick();
              onViewLeaderboard();
            }}
            className="hover:text-amber-400 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>LEADERBOARD</span>
          </button>
        </div>
      </div>
    </div>
  );
};
