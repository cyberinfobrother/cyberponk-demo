import React, { useState, useCallback } from 'react';
import { ScreenState, GameMode, RoundResult, Challenge } from './types/game';
import { CHALLENGES } from './data/challenges';
import { validateAnswer } from './engines/answerValidation';
import { calculateRoundScore } from './utils/scoring';
import { saveLeaderboardEntry } from './utils/leaderboard';
import { sound } from './utils/soundEffects';
import { useGameTimer } from './hooks/useGameTimer';

import { WelcomeScreen } from './components/WelcomeScreen';
import { MissionSetup } from './components/MissionSetup';
import { MissionBriefing } from './components/MissionBriefing';
import { GameHUD } from './components/GameHUD';
import { CipherDisplay } from './components/CipherDisplay';
import { Timer } from './components/Timer';
import { AnswerInput } from './components/AnswerInput';
import { HintPanel } from './components/HintPanel';
import { InteractiveToolbox } from './components/InteractiveToolbox';
import { FeedbackModal } from './components/FeedbackModal';
import { RealityCheck } from './components/RealityCheck';
import { MissionComplete } from './components/MissionComplete';
import { Leaderboard } from './components/Leaderboard';

export default function App() {
  const [screen, setScreen] = useState<ScreenState>('HOME');
  const [gameMode, setGameMode] = useState<GameMode>('team');
  const [teamName, setTeamName] = useState<string>('Zero Trust Squad');
  const [currentRoundIndex, setCurrentRoundIndex] = useState<number>(0);
  const [roundResults, setRoundResults] = useState<RoundResult[]>([]);

  // Current round active state
  const currentChallenge: Challenge = CHALLENGES[currentRoundIndex] || CHALLENGES[0];
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [lastErrorFeedback, setLastErrorFeedback] = useState<string | null>(null);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState<boolean>(false);
  const [modalIsSuccess, setModalIsSuccess] = useState<boolean>(false);
  const [hintUsedThisRound, setHintUsedThisRound] = useState<boolean>(false);

  // Total points calculation
  const totalScore = roundResults.reduce((acc, curr) => acc + curr.totalPoints, 0);

  // Timer Hook
  const handleTimeout = useCallback(() => {
    setIsTimerRunning(false);
    setModalIsSuccess(false);
    setIsFeedbackModalOpen(true);
  }, []);

  const { secondsRemaining, timeUsed, resetTimer } = useGameTimer({
    initialSeconds: currentChallenge.timeLimitSeconds,
    isRunning: isTimerRunning && screen === 'GAMEPLAY' && !isFeedbackModalOpen,
    onTimeout: handleTimeout,
  });

  // Start new mission flow
  const handleStartMissionSetup = (mode: GameMode) => {
    setGameMode(mode);
    setScreen('SETUP');
  };

  const handleSetupComplete = (chosenTeamName: string, chosenMode: GameMode) => {
    setTeamName(chosenTeamName);
    setGameMode(chosenMode);
    setScreen('BRIEFING');
  };

  const startRound = (roundIdx: number) => {
    setCurrentRoundIndex(roundIdx);
    setLastErrorFeedback(null);
    setIsFeedbackModalOpen(false);
    setHintUsedThisRound(false);
    const challenge = CHALLENGES[roundIdx];
    resetTimer(challenge.timeLimitSeconds);
    setIsTimerRunning(true);
    setScreen('GAMEPLAY');
  };

  const handleLaunchFirstRound = () => {
    setRoundResults([]);
    startRound(0);
  };

  // Answer submission
  const handleSubmitAnswer = (userAnswer: string) => {
    const validation = validateAnswer(userAnswer, currentChallenge.correctAnswer);

    if (validation.isValid) {
      sound.playCorrect();
      setIsTimerRunning(false);
      setLastErrorFeedback(null);
      setModalIsSuccess(true);
      setIsFeedbackModalOpen(true);
    } else {
      sound.playIncorrect();
      setLastErrorFeedback(validation.feedbackMessage);
    }
  };

  // Feedback modal continue action
  const handleFeedbackContinue = (awardedFirstTeam: boolean) => {
    setIsFeedbackModalOpen(false);

    // Record round result
    const scoreBreakdown = calculateRoundScore(currentChallenge, modalIsSuccess, awardedFirstTeam);

    const newResult: RoundResult = {
      roundId: currentChallenge.id,
      completed: modalIsSuccess,
      userAnswer: modalIsSuccess ? currentChallenge.correctAnswer : '',
      timeUsedSeconds: timeUsed,
      timeRemainingSeconds: secondsRemaining,
      basePointsEarned: scoreBreakdown.base,
      firstTeamBonusEarned: awardedFirstTeam && modalIsSuccess && !currentChallenge.isBonus,
      totalPoints: scoreBreakdown.total,
      timedOut: !modalIsSuccess,
      hintUsed: hintUsedThisRound,
    };

    const updatedResults = [...roundResults, newResult];
    setRoundResults(updatedResults);

    // Check if next round exists
    const nextRoundIndex = currentRoundIndex + 1;
    if (nextRoundIndex < CHALLENGES.length) {
      startRound(nextRoundIndex);
    } else {
      // Finished all 6 challenges -> show Educational Reality Check before final completion
      setIsTimerRunning(false);

      // Save to session leaderboard
      const totalFinalScore = updatedResults.reduce((acc, curr) => acc + curr.totalPoints, 0);
      const completedCount = updatedResults.filter(r => r.completed).length;
      const totalTime = updatedResults.reduce((acc, curr) => acc + curr.timeUsedSeconds, 0);

      saveLeaderboardEntry({
        id: `session-${Date.now()}`,
        teamName: teamName || 'Cipher Squad',
        mode: gameMode,
        totalScore: totalFinalScore,
        completedRoundsCount: completedCount,
        totalTimeUsedSeconds: totalTime,
        date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        roundResults: updatedResults,
      });

      sound.playVictory();
      setScreen('REALITY_CHECK');
    }
  };

  // Practice retry when timeout occurs
  const handleRetryRound = () => {
    setIsFeedbackModalOpen(false);
    resetTimer(currentChallenge.timeLimitSeconds);
    setIsTimerRunning(true);
    setLastErrorFeedback(null);
  };

  const handleAbandonMission = () => {
    setIsTimerRunning(false);
    setScreen('HOME');
  };

  return (
    <div className="min-h-screen bg-[#080e17] text-slate-100 flex flex-col font-sans relative selection:bg-emerald-500 selection:text-slate-950">
      {/* Background ambient lighting */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-emerald-500/10 blur-[130px] rounded-full" />
        <div className="absolute top-1/2 -right-40 w-[500px] h-[350px] bg-cyan-500/5 blur-[120px] rounded-full" />
      </div>

      {/* Persistent HUD during gameplay */}
      {screen === 'GAMEPLAY' && (
        <GameHUD
          currentRoundNumber={currentChallenge.roundNumber}
          teamName={teamName}
          gameMode={gameMode}
          totalScore={totalScore}
          roundResults={roundResults}
          onAbandonMission={handleAbandonMission}
        />
      )}

      {/* Screen Views */}
      <main className="flex-1 relative z-10">
        {screen === 'HOME' && (
          <WelcomeScreen
            onStartMission={handleStartMissionSetup}
            onHowToPlay={() => setScreen('BRIEFING')}
            onViewLeaderboard={() => setScreen('LEADERBOARD')}
          />
        )}

        {screen === 'SETUP' && (
          <MissionSetup
            initialMode={gameMode}
            onStart={handleSetupComplete}
            onBack={() => setScreen('HOME')}
          />
        )}

        {screen === 'BRIEFING' && (
          <MissionBriefing
            teamName={teamName}
            onLaunch={handleLaunchFirstRound}
            onBack={() => setScreen('SETUP')}
          />
        )}

        {screen === 'GAMEPLAY' && (
          <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 space-y-6 animate-fadeIn">
            {/* Header info & timer */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
              <div>
                <div className="text-xs font-mono font-bold text-emerald-400 tracking-wider">
                  {currentChallenge.title}
                </div>
                <h1 className="text-2xl sm:text-3xl font-black font-display text-white mt-0.5">
                  {currentChallenge.subtitle}
                </h1>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
                  {currentChallenge.cipherInstructions}
                </p>
              </div>

              {/* Countdown Timer */}
              <div className="shrink-0 self-start sm:self-center">
                <Timer
                  secondsRemaining={secondsRemaining}
                  totalSeconds={currentChallenge.timeLimitSeconds}
                />
              </div>
            </div>

            {/* Intercepted Cipher Display Card */}
            <CipherDisplay challenge={currentChallenge} />

            {/* Interactive Decoding Toolbox */}
            <InteractiveToolbox challenge={currentChallenge} />

            {/* Hint Panel */}
            <HintPanel
              hint={currentChallenge.hint}
              onHintRevealed={() => setHintUsedThisRound(true)}
            />

            {/* Answer Input & Submission Form */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 md:p-6 shadow-xl space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-1">
                <span>TERMINAL INPUT // SUBMIT DECRYPTED TEXT:</span>
                <span>SPACES PRESERVED</span>
              </div>
              <AnswerInput
                onSubmit={handleSubmitAnswer}
                lastErrorFeedback={lastErrorFeedback}
                disabled={isFeedbackModalOpen}
              />
            </div>
          </div>
        )}

        {screen === 'REALITY_CHECK' && (
          <RealityCheck onContinue={() => setScreen('MISSION_COMPLETE')} />
        )}

        {screen === 'MISSION_COMPLETE' && (
          <MissionComplete
            teamName={teamName}
            gameMode={gameMode}
            roundResults={roundResults}
            onPlayAgain={() => {
              setRoundResults([]);
              startRound(0);
            }}
            onReturnHome={() => setScreen('HOME')}
            onViewLeaderboard={() => setScreen('LEADERBOARD')}
          />
        )}

        {screen === 'LEADERBOARD' && (
          <Leaderboard
            onBack={() => setScreen('HOME')}
            onStartNewMission={() => {
              setRoundResults([]);
              setScreen('SETUP');
            }}
          />
        )}
      </main>

      {/* Answer Feedback Modal */}
      <FeedbackModal
        challenge={currentChallenge}
        isOpen={isFeedbackModalOpen}
        isSuccess={modalIsSuccess}
        gameMode={gameMode}
        initialFirstTeamBonus={false}
        onContinue={handleFeedbackContinue}
        onRetryRound={handleRetryRound}
      />
    </div>
  );
}
