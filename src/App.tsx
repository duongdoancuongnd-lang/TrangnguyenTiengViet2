import React, { useState, useEffect } from 'react';
import { RoundInfo, StudentInfo, ExamAttempt } from './types';
import { allRounds, getRoundById } from './data/roundsData';
import { Header } from './components/Header';
import { RoundSelector } from './components/RoundSelector';
import { ExamScreen } from './components/ExamScreen';
import { ResultScreen } from './components/ResultScreen';
import { StudentFormModal } from './components/StudentFormModal';
import { LeaderboardModal } from './components/LeaderboardModal';
import { CertificateModal } from './components/CertificateModal';
import { ShuffleTestModal } from './components/ShuffleTestModal';
import { shuffleRoundQuestions } from './utils/questionShuffle';
import { sound } from './utils/soundEffects';

const STORAGE_KEY_STUDENT = 'tn_tv2_student_info';
const STORAGE_KEY_HISTORY = 'tn_tv2_exam_history';

const DEFAULT_STUDENT: StudentInfo = {
  studentName: 'Nguyễn Minh Anh',
  className: '2A4',
  schoolName: 'Trường Tiểu Học Ánh Dương',
};

export default function App() {
  // Application State
  const [studentInfo, setStudentInfo] = useState<StudentInfo>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_STUDENT);
      return saved ? JSON.parse(saved) : DEFAULT_STUDENT;
    } catch {
      return DEFAULT_STUDENT;
    }
  });

  const [examHistory, setExamHistory] = useState<Record<number, ExamAttempt>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_HISTORY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [activeRoundId, setActiveRoundId] = useState<number | null>(null);
  const [currentExamRound, setCurrentExamRound] = useState<RoundInfo | null>(null);
  const [isExamActive, setIsExamActive] = useState<boolean>(false);
  const [lastAttempt, setLastAttempt] = useState<ExamAttempt | null>(null);

  // Modals
  const [isStudentModalOpen, setIsStudentModalOpen] = useState<boolean>(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState<boolean>(false);
  const [isCertificateOpen, setIsCertificateOpen] = useState<boolean>(false);
  const [isShuffleTestOpen, setIsShuffleTestOpen] = useState<boolean>(false);

  // Sync state to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_STUDENT, JSON.stringify(studentInfo));
    } catch (e) {
      console.error(e);
    }
  }, [studentInfo]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(examHistory));
    } catch (e) {
      console.error(e);
    }
  }, [examHistory]);

  const handleToggleSound = () => {
    const nextState = !soundEnabled;
    setSoundEnabled(nextState);
    sound.setEnabled(nextState);
  };

  const handleSelectRound = (roundId: number) => {
    const baseRound = getRoundById(roundId);
    if (!baseRound) return;
    // Freshly shuffle options & randomize correct answers (balanced A, B, C, D) for this attempt
    const shuffledRoundInstance = shuffleRoundQuestions(baseRound);
    setCurrentExamRound(shuffledRoundInstance);
    setActiveRoundId(roundId);
    setIsExamActive(true);
    setLastAttempt(null);
  };

  const handleFinishExam = (answers: Record<number, number>, timeSpentSeconds: number) => {
    if (!activeRoundId) return;
    const round = currentExamRound || getRoundById(activeRoundId);
    if (!round) return;

    let correctCount = 0;
    let wrongCount = 0;
    let skippedCount = 0;
    let level1Correct = 0;
    let level2Correct = 0;
    let level3Correct = 0;

    round.questions.forEach((q) => {
      const userChoice = answers[q.id];
      if (userChoice === undefined) {
        skippedCount++;
      } else if (userChoice === q.correctAnswer) {
        correctCount++;
        if (q.level === 1) level1Correct++;
        if (q.level === 2) level2Correct++;
        if (q.level === 3) level3Correct++;
      } else {
        wrongCount++;
      }
    });

    const score = correctCount * 10;

    let rankTitle = 'Khuyến Khích';
    if (score >= 280) rankTitle = '🥇 Trạng Nguyên Xuất Sắc';
    else if (score >= 250) rankTitle = '🥈 Bảng Nhãn Giỏi';
    else if (score >= 210) rankTitle = '🥉 Thám Hoa Khá';
    else if (score >= 150) rankTitle = '⭐ Tiến Sĩ';

    const attempt: ExamAttempt = {
      roundId: activeRoundId,
      score,
      totalQuestions: 30,
      timeSpentSeconds,
      correctCount,
      wrongCount,
      skippedCount,
      userAnswers: answers,
      timestamp: Date.now(),
      rankTitle,
      level1Correct,
      level2Correct,
      level3Correct,
    };

    setExamHistory((prev) => ({
      ...prev,
      [activeRoundId]: attempt,
    }));

    setLastAttempt(attempt);
    setIsExamActive(false);
  };

  const handleRetakeCurrentRound = () => {
    if (activeRoundId) {
      const baseRound = getRoundById(activeRoundId);
      if (!baseRound) return;
      // Freshly shuffle again for the retake so the student faces randomized positions
      const shuffledRoundInstance = shuffleRoundQuestions(baseRound);
      setCurrentExamRound(shuffledRoundInstance);
      setLastAttempt(null);
      setIsExamActive(true);
    }
  };

  const handleNextRound = () => {
    if (!activeRoundId) return;
    const nextId = activeRoundId < 35 ? activeRoundId + 1 : 1;
    handleSelectRound(nextId);
  };

  const handleGoHome = () => {
    setActiveRoundId(null);
    setCurrentExamRound(null);
    setIsExamActive(false);
    setLastAttempt(null);
  };

  const handleClearHistory = () => {
    setExamHistory({});
    localStorage.removeItem(STORAGE_KEY_HISTORY);
  };

  const activeRound = currentExamRound || (activeRoundId ? getRoundById(activeRoundId) : null);

  return (
    <div className="min-h-screen bg-[#FFFBEB] text-[#1F2937] flex flex-col font-sans selection:bg-[#FED7AA] selection:text-[#9A3412]">
      {/* App Header */}
      <Header
        studentInfo={studentInfo}
        onOpenStudentModal={() => setIsStudentModalOpen(true)}
        onOpenHistory={() => setIsHistoryModalOpen(true)}
        onOpenShuffleTest={() => setIsShuffleTestOpen(true)}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        activeRoundId={activeRoundId}
        onGoHome={handleGoHome}
      />

      {/* Main Content Areas */}
      <main className="flex-1 pb-10">
        {/* State 1: Active Exam taking screen */}
        {isExamActive && activeRound && (
          <ExamScreen
            round={activeRound}
            studentInfo={studentInfo}
            onFinishExam={handleFinishExam}
            onExit={handleGoHome}
            soundEnabled={soundEnabled}
            onToggleSound={handleToggleSound}
          />
        )}

        {/* State 2: Result and Solution Review Screen */}
        {!isExamActive && lastAttempt && activeRound && (
          <ResultScreen
            round={activeRound}
            studentInfo={studentInfo}
            attempt={lastAttempt}
            onRetakeRound={handleRetakeCurrentRound}
            onNextRound={handleNextRound}
            onGoHome={handleGoHome}
            onOpenCertificate={() => setIsCertificateOpen(true)}
          />
        )}

        {/* State 3: Round Selection Portal & Overview */}
        {!isExamActive && !lastAttempt && (
          <RoundSelector
            rounds={allRounds}
            studentInfo={studentInfo}
            examHistory={examHistory}
            onSelectRound={handleSelectRound}
            onEditStudent={() => setIsStudentModalOpen(true)}
          />
        )}
      </main>

      {/* Student Profile Modal */}
      <StudentFormModal
        isOpen={isStudentModalOpen}
        onClose={() => setIsStudentModalOpen(false)}
        studentInfo={studentInfo}
        onSave={(info) => setStudentInfo(info)}
      />

      {/* Leaderboard / History Modal */}
      <LeaderboardModal
        isOpen={isHistoryModalOpen}
        onClose={() => setIsHistoryModalOpen(false)}
        studentInfo={studentInfo}
        rounds={allRounds}
        examHistory={examHistory}
        onSelectRound={(roundId) => handleSelectRound(roundId)}
        onClearHistory={handleClearHistory}
      />

      {/* Printable Certificate Modal */}
      {lastAttempt && activeRound && (
        <CertificateModal
          isOpen={isCertificateOpen}
          onClose={() => setIsCertificateOpen(false)}
          studentInfo={studentInfo}
          round={activeRound}
          attempt={lastAttempt}
        />
      )}

      {/* Diagnostic A/B/C/D Shuffle Test Modal (Requirement 14) */}
      <ShuffleTestModal
        isOpen={isShuffleTestOpen}
        onClose={() => setIsShuffleTestOpen(false)}
      />
    </div>
  );
}
