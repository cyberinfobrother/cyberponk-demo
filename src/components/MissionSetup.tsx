import React, { useState } from 'react';
import { GameMode } from '../types/game';
import { Users, User, ArrowLeft, ArrowRight, Shield, Dices, Clock, Trophy } from 'lucide-react';
import { sound } from '../utils/soundEffects';

interface MissionSetupProps {
  initialMode: GameMode;
  onStart: (teamName: string, mode: GameMode) => void;
  onBack: () => void;
}

const RANDOM_TEAM_NAMES = [
  'Zero Trust Ninjas',
  'Byte Busters',
  'Firewall Phantoms',
  'Crypto Wardens',
  'Patch Masters',
  'Packet Sniffers',
  'Binary Knights',
  'Enigma Squad',
  'Hash Breakers',
  'Cipher Sentinels',
];

export const MissionSetup: React.FC<MissionSetupProps> = ({ initialMode, onStart, onBack }) => {
  const [mode, setMode] = useState<GameMode>(initialMode);
  const [teamName, setTeamName] = useState(
    initialMode === 'team' ? 'Zero Trust Squad' : 'Agent Solo'
  );

  const handleRandomizeName = () => {
    sound.playKeyClick();
    const random = RANDOM_TEAM_NAMES[Math.floor(Math.random() * RANDOM_TEAM_NAMES.length)];
    setTeamName(random);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!teamName.trim()) return;
    sound.playKeyClick();
    onStart(teamName.trim(), mode);
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6 space-y-8 animate-fadeIn">
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
          <span>RETURN TO WELCOME</span>
        </button>
      </div>

      <div className="text-center space-y-2">
        <span className="text-xs font-mono tracking-widest text-emerald-400 font-semibold block">
          MISSION REGISTRATION
        </span>
        <h1 className="text-3xl sm:text-4xl font-black font-display text-white">
          Configure Your Operations Unit
        </h1>
        <p className="text-sm text-slate-400 max-w-md mx-auto">
          Equip your station for Cybersecurity Day: Cipher Challenge.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Game Mode Selector */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
          <label className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider block">
            Select Game Mode
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Team Mode */}
            <button
              type="button"
              onClick={() => {
                setMode('team');
                sound.playKeyClick();
                if (teamName === 'Agent Solo') setTeamName('Zero Trust Squad');
              }}
              className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between ${
                mode === 'team'
                  ? 'bg-emerald-950/40 border-emerald-500 text-white shadow-lg shadow-emerald-950/50'
                  : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 font-bold font-display text-base text-white">
                  <Users className={`w-5 h-5 ${mode === 'team' ? 'text-emerald-400' : 'text-slate-500'}`} />
                  <span>Team Mode (Default)</span>
                </div>
                {mode === 'team' && (
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                )}
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Designed for booths and teams of 3–5 codebreakers collaborating on one station.
              </p>
            </button>

            {/* Solo Practice */}
            <button
              type="button"
              onClick={() => {
                setMode('solo');
                sound.playKeyClick();
                if (teamName === 'Zero Trust Squad') setTeamName('Agent Solo');
              }}
              className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between ${
                mode === 'solo'
                  ? 'bg-cyan-950/40 border-cyan-500 text-white shadow-lg shadow-cyan-950/50'
                  : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 font-bold font-display text-base text-white">
                  <User className={`w-5 h-5 ${mode === 'solo' ? 'text-cyan-400' : 'text-slate-500'}`} />
                  <span>Solo Practice</span>
                </div>
                {mode === 'solo' && (
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                )}
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Practice and hone your cipher-cracking techniques with practice speed bonuses.
              </p>
            </button>
          </div>
        </div>

        {/* Team / Agent Name */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <label
              htmlFor="team-name-input"
              className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider block"
            >
              {mode === 'team' ? 'Team Name' : 'Agent Call-Sign'}
            </label>
            <button
              type="button"
              onClick={handleRandomizeName}
              className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer transition-colors"
            >
              <Dices className="w-3.5 h-3.5" />
              <span>Randomize</span>
            </button>
          </div>

          <input
            id="team-name-input"
            type="text"
            required
            maxLength={32}
            value={teamName}
            onChange={e => setTeamName(e.target.value)}
            placeholder="ENTER UNIT DESIGNATION..."
            className="w-full bg-slate-950 border-2 border-slate-700 focus:border-emerald-400 rounded-xl px-4 py-3 text-lg font-mono font-bold text-white placeholder-slate-600 focus:outline-none transition-colors"
          />
        </div>

        {/* Rules Overview Box */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 uppercase">
            <Shield className="w-4 h-4" />
            <span>Rules of Engagement</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300 font-mono">
            <div className="flex items-start gap-2 bg-slate-950/60 p-3 rounded-lg border border-slate-800/80">
              <Clock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block mb-0.5">Time Limits:</strong>
                Easy rounds: 3 min (180s). Hard: 5 min (300s). Bonus tie-breaker: 1 min (60s).
              </div>
            </div>

            <div className="flex items-start gap-2 bg-slate-950/60 p-3 rounded-lg border border-slate-800/80">
              <Trophy className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block mb-0.5">Scoring Protocol:</strong>
                +10 PTS per main round, +5 PTS first-team bonus. Sudden death bonus is +5 PTS.
              </div>
            </div>
          </div>
        </div>

        {/* Start Mission Button */}
        <div className="flex justify-center pt-2">
          <button
            type="submit"
            className="w-full sm:w-auto px-10 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold font-mono text-base rounded-xl flex items-center justify-center gap-2 shadow-xl shadow-emerald-500/25 transition-all cursor-pointer"
          >
            <span>START MISSION</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
};
