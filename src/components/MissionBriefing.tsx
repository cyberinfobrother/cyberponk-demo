import React from 'react';
import { Users, Layers, Clock, Trophy, ShieldCheck, ArrowRight, ArrowLeft } from 'lucide-react';
import { sound } from '../utils/soundEffects';

interface MissionBriefingProps {
  teamName: string;
  onLaunch: () => void;
  onBack: () => void;
}

export const MissionBriefing: React.FC<MissionBriefingProps> = ({ teamName, onLaunch, onBack }) => {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 space-y-8 animate-fadeIn">
      {/* Back button */}
      <div>
        <button
          type="button"
          onClick={() => {
            sound.playKeyClick();
            onBack();
          }}
          className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-emerald-400 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>BACK TO SETUP</span>
        </button>
      </div>

      {/* Header */}
      <div className="text-center space-y-2">
        <span className="text-xs font-mono tracking-widest text-emerald-400 font-semibold block uppercase">
          MISSION BRIEFING // OPERATIONS MANUAL
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-display text-white">
          How the Challenge Works
        </h1>
        <p className="text-sm md:text-base text-slate-400 max-w-xl mx-auto">
          Operational briefing for <strong className="text-emerald-400">{teamName}</strong>. Review protocol before interception begins.
        </p>
      </div>

      {/* 4 Pillars Grid (Matching Slide 2 of PDF) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Pillar 1: Teams of 3-5 */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:border-slate-700 transition-colors">
          <div>
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white font-display mb-2">
              Teams of 3–5
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Work together to decode each intercepted message. Split tasks, compare ideas, and verify each word.
            </p>
          </div>
        </div>

        {/* Pillar 2: 5 + 1 Rounds */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:border-slate-700 transition-colors">
          <div>
            <div className="w-12 h-12 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center mb-4">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white font-display mb-2">
              5 + 1 Rounds
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Five cipher rounds that get progressively harder, plus a sudden-death bonus tie-breaker challenge.
            </p>
          </div>
        </div>

        {/* Pillar 3: Beat the Clock */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:border-slate-700 transition-colors">
          <div>
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white font-display mb-2">
              Beat the Clock
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              3 minutes for easy rounds, 5 minutes for harder ones. Sudden death gives you 60 seconds of adrenaline!
            </p>
          </div>
        </div>

        {/* Pillar 4: Score Points */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:border-slate-700 transition-colors">
          <div>
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-4">
              <Trophy className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white font-display mb-2">
              Score Points
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              10 points per correct answer, +5 for the first team done. The bonus round awards 5 points.
            </p>
          </div>
        </div>
      </div>

      {/* Cyber Tip Reminder Banner from Slide 2 */}
      <div className="bg-gradient-to-r from-emerald-950/40 via-slate-900 to-cyan-950/40 border border-emerald-500/30 rounded-2xl p-5 text-center">
        <div className="flex items-center justify-center gap-2 text-emerald-300 font-display font-semibold text-base sm:text-lg">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          <span>Every decoded message is a real safety tip – remember them!</span>
        </div>
      </div>

      {/* Launch Action */}
      <div className="flex justify-center pt-2">
        <button
          type="button"
          onClick={() => {
            sound.playKeyClick();
            onLaunch();
          }}
          className="px-10 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black font-mono text-base rounded-xl flex items-center gap-2 shadow-xl shadow-emerald-500/25 transition-all cursor-pointer"
        >
          <span>BEGIN ROUND 01</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
