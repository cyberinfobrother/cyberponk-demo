import React, { useState } from 'react';
import { LeaderboardEntry } from '../types/game';
import { getLeaderboard, clearLeaderboard, saveLeaderboardEntry } from '../utils/leaderboard';
import { Trophy, Clock, Shield, Trash2, ArrowLeft, PlusCircle, CheckCircle2 } from 'lucide-react';
import { sound } from '../utils/soundEffects';

interface LeaderboardProps {
  onBack: () => void;
  onStartNewMission: () => void;
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ onBack, onStartNewMission }) => {
  const [entries, setEntries] = useState<LeaderboardEntry[]>(() => getLeaderboard());
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}m ${s}s`;
  };

  const handleClear = () => {
    clearLeaderboard();
    setEntries([]);
    setShowClearConfirm(false);
    sound.playKeyClick();
  };

  const handleSeedDemoData = () => {
    const demoEntries: LeaderboardEntry[] = [
      {
        id: 'demo-1',
        teamName: 'Zero Trust Knights',
        mode: 'team',
        totalScore: 75,
        completedRoundsCount: 6,
        totalTimeUsedSeconds: 310,
        date: new Date(Date.now() - 3600000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        roundResults: [],
      },
      {
        id: 'demo-2',
        teamName: 'Byte Busters',
        mode: 'team',
        totalScore: 65,
        completedRoundsCount: 6,
        totalTimeUsedSeconds: 420,
        date: new Date(Date.now() - 7200000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        roundResults: [],
      },
      {
        id: 'demo-3',
        teamName: 'Firewall Phantoms',
        mode: 'team',
        totalScore: 50,
        completedRoundsCount: 5,
        totalTimeUsedSeconds: 490,
        date: new Date(Date.now() - 10800000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        roundResults: [],
      },
    ];

    demoEntries.forEach(entry => saveLeaderboardEntry(entry));
    setEntries(getLeaderboard());
    sound.playKeyClick();
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <button
            type="button"
            onClick={() => {
              sound.playKeyClick();
              onBack();
            }}
            className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-emerald-400 mb-2 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>BACK</span>
          </button>
          <h1 className="text-3xl font-black font-display text-white flex items-center gap-2">
            <Trophy className="w-8 h-8 text-amber-400" />
            <span>SESSION LEADERBOARD</span>
          </h1>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Local device team rankings for Cybersecurity Day.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {entries.length === 0 && (
            <button
              type="button"
              onClick={handleSeedDemoData}
              className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Populate demo teams for display"
            >
              <PlusCircle className="w-3.5 h-3.5 text-cyan-400" />
              <span>LOAD DEMO TEAMS</span>
            </button>
          )}

          {entries.length > 0 && (
            <button
              type="button"
              onClick={() => setShowClearConfirm(true)}
              className="px-3 py-2 bg-slate-800/80 hover:bg-red-950/60 text-slate-400 hover:text-red-300 border border-slate-700 hover:border-red-500/40 text-xs font-mono rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>CLEAR HISTORY</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => {
              sound.playKeyClick();
              onStartNewMission();
            }}
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold font-mono rounded-lg transition-all shadow-md shadow-emerald-500/20 cursor-pointer"
          >
            NEW MISSION
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showClearConfirm && (
        <div className="p-4 bg-red-950/40 border border-red-500/50 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm font-mono text-red-200">
            Clear all session leaderboard records on this device?
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowClearConfirm(false)}
              className="px-3 py-1.5 text-xs font-mono bg-slate-800 text-slate-300 rounded hover:bg-slate-700"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="px-3 py-1.5 text-xs font-mono bg-red-600 hover:bg-red-500 text-white font-bold rounded"
            >
              Confirm Clear
            </button>
          </div>
        </div>
      )}

      {/* Leaderboard Table */}
      {entries.length === 0 ? (
        <div className="bg-slate-900/50 border border-dashed border-slate-800 rounded-2xl p-12 text-center space-y-3">
          <Shield className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-slate-300 font-display">
            No Mission Records Yet
          </h3>
          <p className="text-xs text-slate-500 font-mono max-w-sm mx-auto">
            Run a mission in Team Mode or Solo Practice to record scores on this station.
          </p>
        </div>
      ) : (
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/70 text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                  <th className="py-3 px-4">Rank</th>
                  <th className="py-3 px-4">Team / Agent</th>
                  <th className="py-3 px-4">Mode</th>
                  <th className="py-3 px-4 text-right">Score</th>
                  <th className="py-3 px-4 text-center">Decoded</th>
                  <th className="py-3 px-4 text-right">Time</th>
                  <th className="py-3 px-4 text-right">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs sm:text-sm">
                {entries.map((entry, idx) => {
                  const isFirst = idx === 0;
                  const isTopThree = idx < 3;

                  return (
                    <tr
                      key={entry.id}
                      className={`hover:bg-slate-800/40 transition-colors ${
                        isFirst ? 'bg-amber-500/5' : ''
                      }`}
                    >
                      {/* Rank */}
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex items-center justify-center w-6 h-6 rounded-full font-bold text-xs ${
                            idx === 0
                              ? 'bg-amber-400 text-slate-950 shadow-sm shadow-amber-400/50'
                              : idx === 1
                              ? 'bg-slate-300 text-slate-950'
                              : idx === 2
                              ? 'bg-amber-700 text-white'
                              : 'text-slate-500'
                          }`}
                        >
                          {idx + 1}
                        </span>
                      </td>

                      {/* Team Name */}
                      <td className="py-3.5 px-4 font-semibold text-white">
                        <div className="flex items-center gap-2">
                          <span>{entry.teamName}</span>
                          {isFirst && (
                            <span className="text-[10px] bg-amber-400/20 text-amber-300 px-1.5 py-0.5 rounded border border-amber-400/40">
                              TOP CODEBREAKER
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Mode */}
                      <td className="py-3.5 px-4 text-xs text-slate-400 uppercase">
                        {entry.mode}
                      </td>

                      {/* Score */}
                      <td className="py-3.5 px-4 text-right font-bold text-emerald-400 tabular-nums text-base">
                        {entry.totalScore} <span className="text-xs font-normal text-slate-500">PTS</span>
                      </td>

                      {/* Decoded Count */}
                      <td className="py-3.5 px-4 text-center">
                        <span className="inline-flex items-center gap-1 text-cyan-300 font-bold tabular-nums">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span>{entry.completedRoundsCount} / 6</span>
                        </span>
                      </td>

                      {/* Time */}
                      <td className="py-3.5 px-4 text-right text-slate-300 tabular-nums">
                        {formatTime(entry.totalTimeUsedSeconds)}
                      </td>

                      {/* Date */}
                      <td className="py-3.5 px-4 text-right text-slate-500 text-xs">
                        {entry.date}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
