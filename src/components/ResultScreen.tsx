import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Award,
  Trophy,
  CheckCircle2,
  XCircle,
  Clock,
  RotateCcw,
  ChevronRight,
  Home,
  BookOpen,
  Sparkles
} from 'lucide-react';
import { RoundInfo, StudentInfo, ExamAttempt, Question } from '../types';
import { sound } from '../utils/soundEffects';

interface ResultScreenProps {
  round: RoundInfo;
  studentInfo: StudentInfo;
  attempt: ExamAttempt;
  onRetakeRound: () => void;
  onNextRound: () => void;
  onGoHome: () => void;
  onOpenCertificate: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  round,
  studentInfo,
  attempt,
  onRetakeRound,
  onNextRound,
  onGoHome,
  onOpenCertificate,
}) => {
  const [filterMode, setFilterMode] = useState<'all' | 'wrong' | 'correct'>('all');

  useEffect(() => {
    if (attempt.score >= 200) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
        });
      }, 300);
    }
  }, [attempt.score]);

  const minutes = Math.floor(attempt.timeSpentSeconds / 60);
  const seconds = attempt.timeSpentSeconds % 60;
  const timeSpentFormatted = `${minutes} phút ${seconds} giây`;

  const getQuestionStatus = (q: Question) => {
    const userAns = attempt.userAnswers[q.id];
    if (userAns === undefined) return 'skipped';
    if (userAns === q.correctAnswer) return 'correct';
    return 'wrong';
  };

  const filteredQuestions = round.questions.filter((q) => {
    const status = getQuestionStatus(q);
    if (filterMode === 'correct') return status === 'correct';
    if (filterMode === 'wrong') return status === 'wrong' || status === 'skipped';
    return true;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 py-6 space-y-8">
      {/* Grand Score Banner with Vibrant Palette styling */}
      <div className="bg-gradient-to-r from-[#FF8C00] to-[#FFA500] rounded-[36px] border-b-8 border-r-8 border-[#E27D00] shadow-2xl p-6 sm:p-10 text-white text-center relative overflow-hidden">
        <div className="relative z-10 space-y-5">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-[#FFF0D1] text-xs font-black uppercase tracking-wider border border-white/30">
            <Sparkles className="w-4 h-4 text-amber-200" />
            Kết Quả Vòng {round.id.toString().padStart(2, '0')} • {round.readingTopic}
          </div>

          <div className="space-y-1">
            <h2 className="text-lg sm:text-xl font-bold text-[#FFF0D1]">
              Sĩ tử: <strong className="text-white font-black">{studentInfo.studentName}</strong> ({studentInfo.className} - {studentInfo.schoolName})
            </h2>
            <div className="text-5xl sm:text-7xl font-black text-white drop-shadow-md py-1">
              {attempt.score} <span className="text-2xl sm:text-3xl text-[#FFF0D1] font-bold">/ 300 điểm</span>
            </div>
            <div className="inline-block bg-white text-[#9A3412] font-black text-sm sm:text-lg px-5 py-1.5 rounded-full shadow border-2 border-white/60 uppercase tracking-wide">
              👑 {attempt.rankTitle}
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto pt-2">
            <div className="bg-white/20 backdrop-blur-sm p-3.5 rounded-2xl border border-white/30">
              <div className="text-[#D1FAE5] font-black text-2xl">{attempt.correctCount}/30</div>
              <div className="text-[11px] text-[#FFF0D1] font-bold uppercase">Số Câu Đúng</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm p-3.5 rounded-2xl border border-white/30">
              <div className="text-[#FEE2E2] font-black text-2xl">{attempt.wrongCount + attempt.skippedCount}/30</div>
              <div className="text-[11px] text-[#FFF0D1] font-bold uppercase">Câu Sai / Bỏ Qua</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm p-3.5 rounded-2xl border border-white/30">
              <div className="text-white font-black text-2xl">
                {Math.round((attempt.score / 300) * 100)}%
              </div>
              <div className="text-[11px] text-[#FFF0D1] font-bold uppercase">Độ Chính Xác</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm p-3.5 rounded-2xl border border-white/30">
              <div className="text-white font-black text-base sm:text-lg leading-tight mt-1">{timeSpentFormatted}</div>
              <div className="text-[11px] text-[#FFF0D1] font-bold uppercase">Thời Gian Làm</div>
            </div>
          </div>

          {/* Level Breakdown Grid */}
          <div className="bg-black/10 backdrop-blur-sm rounded-[24px] p-4 max-w-2xl mx-auto border border-white/20 text-xs">
            <p className="font-black text-[#FFF0D1] mb-2 uppercase tracking-wider">Thống Kê 3 Mức Độ Câu Hỏi:</p>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-white/10 p-2.5 rounded-xl border border-white/20">
                <div className="font-black text-white text-sm">{attempt.level1Correct} / 20 câu</div>
                <div className="text-[10px] text-[#D1FAE5] font-bold">Mức 1 (Dễ)</div>
              </div>
              <div className="bg-white/10 p-2.5 rounded-xl border border-white/20">
                <div className="font-black text-white text-sm">{attempt.level2Correct} / 5 câu</div>
                <div className="text-[10px] text-[#FED7AA] font-bold">Mức 2 (Trung bình)</div>
              </div>
              <div className="bg-white/10 p-2.5 rounded-xl border border-white/20">
                <div className="font-black text-white text-sm">{attempt.level3Correct} / 5 câu</div>
                <div className="text-[10px] text-[#FECACA] font-bold">Mức 3 (Vận dụng)</div>
              </div>
            </div>
          </div>

          {/* Action Buttons Row */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
            <button
              onClick={() => {
                sound.playClick();
                onOpenCertificate();
              }}
              className="px-6 py-3 rounded-2xl bg-white hover:bg-amber-50 text-[#9A3412] font-black text-xs sm:text-sm shadow-md transition flex items-center gap-2 cursor-pointer uppercase tracking-wider"
            >
              <Trophy className="w-4 h-4 text-[#FF8C00]" />
              <span>Xem Giấy Khen Trạng Nguyên</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                onRetakeRound();
              }}
              className="px-5 py-3 rounded-2xl bg-white/20 hover:bg-white/30 text-white font-black text-xs sm:text-sm transition flex items-center gap-1.5 cursor-pointer border border-white/30 uppercase"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Thi Lại Vòng Này</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                onNextRound();
              }}
              className="px-6 py-3 rounded-2xl bg-[#0EA5E9] hover:bg-[#0284C7] text-white font-black text-xs sm:text-sm shadow-md border-b-4 border-[#0284C7] active:translate-y-0.5 active:border-b-0 transition flex items-center gap-1.5 cursor-pointer uppercase"
            >
              <span>Vòng Tiếp Theo</span>
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                sound.playClick();
                onGoHome();
              }}
              className="px-5 py-3 rounded-2xl bg-[#FF4500] hover:bg-[#CC3700] text-white font-black text-xs sm:text-sm shadow-[0_3px_0_0_#992900] active:translate-y-0.5 active:shadow-none transition flex items-center gap-1.5 cursor-pointer uppercase"
            >
              <Home className="w-4 h-4" />
              <span>Trang Chủ</span>
            </button>
          </div>
        </div>
      </div>

      {/* Question Review Section */}
      <div className="bg-white rounded-[36px] border-b-8 border-r-8 border-[#E5E7EB] shadow-lg p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b-2 border-[#F3F4F6] pb-5">
          <div>
            <h3 className="text-lg sm:text-xl font-black text-[#1F2937] uppercase flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#FF8C00]" />
              Xem Lại Bài Thi & Lời Giải Chi Tiết
            </h3>
            <p className="text-xs font-bold text-gray-400">
              Kiểm tra chi tiết từng câu hỏi, đáp án chuẩn và lời giải thích giáo viên
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 bg-[#F3F4F6] p-1.5 rounded-2xl border border-[#E5E7EB]">
            <button
              onClick={() => {
                sound.playClick();
                setFilterMode('all');
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-black uppercase transition cursor-pointer ${
                filterMode === 'all'
                  ? 'bg-[#FF8C00] text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Tất cả (30)
            </button>
            <button
              onClick={() => {
                sound.playClick();
                setFilterMode('wrong');
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-black uppercase transition cursor-pointer flex items-center gap-1 ${
                filterMode === 'wrong'
                  ? 'bg-[#DC2626] text-white shadow-sm'
                  : 'text-gray-600 hover:text-[#DC2626]'
              }`}
            >
              <XCircle className="w-3.5 h-3.5" />
              Câu Sai ({attempt.wrongCount + attempt.skippedCount})
            </button>
            <button
              onClick={() => {
                sound.playClick();
                setFilterMode('correct');
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-black uppercase transition cursor-pointer flex items-center gap-1 ${
                filterMode === 'correct'
                  ? 'bg-[#059669] text-white shadow-sm'
                  : 'text-gray-600 hover:text-[#059669]'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              Câu Đúng ({attempt.correctCount})
            </button>
          </div>
        </div>

        {/* List of Questions */}
        <div className="space-y-4">
          {filteredQuestions.map((q) => {
            const userChoiceIdx = attempt.userAnswers[q.id];
            const isCorrect = userChoiceIdx === q.correctAnswer;
            const isSkipped = userChoiceIdx === undefined;

            return (
              <div
                key={q.id}
                className={`p-5 rounded-[24px] border-2 transition ${
                  isCorrect
                    ? 'bg-[#ECFDF5] border-[#A7F3D0]'
                    : isSkipped
                    ? 'bg-[#F9FAFB] border-[#E5E7EB]'
                    : 'bg-[#FEF2F2] border-[#FECACA]'
                }`}
              >
                {/* Meta */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-black text-xs sm:text-sm bg-white px-3 py-1 rounded-xl border border-[#E5E7EB] shadow-sm text-[#1F2937]">
                      Câu {q.id}
                    </span>
                    <span className="text-[11px] font-black text-gray-500 bg-white px-2.5 py-0.5 rounded-lg border border-[#E5E7EB]">
                      {q.levelText}
                    </span>
                    <span className="text-[11px] text-[#FF8C00] font-bold">
                      {q.topic}
                    </span>
                  </div>

                  <div>
                    {isCorrect ? (
                      <span className="flex items-center gap-1 text-xs font-black text-[#065F46] bg-[#D1FAE5] px-3 py-1 rounded-xl border border-[#A7F3D0]">
                        <CheckCircle2 className="w-4 h-4 text-[#059669]" /> Đúng (+10đ)
                      </span>
                    ) : isSkipped ? (
                      <span className="flex items-center gap-1 text-xs font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded-xl">
                        Chưa làm (0đ)
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-xs font-black text-[#991B1B] bg-[#FEE2E2] px-3 py-1 rounded-xl border border-[#FCA5A5]">
                        <XCircle className="w-4 h-4 text-[#DC2626]" /> Sai (0đ)
                      </span>
                    )}
                  </div>
                </div>

                {/* Question */}
                <h4 className="font-black text-sm sm:text-base text-[#1F2937] mb-3 whitespace-pre-line">
                  {q.question}
                </h4>

                {/* Options */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                  {q.options.map((opt, optIdx) => {
                    const isUserChoice = userChoiceIdx === optIdx;
                    const isRightAnswer = q.correctAnswer === optIdx;
                    const optLabel = String.fromCharCode(65 + optIdx);

                    let optStyle = 'bg-white border-[#E5E7EB] text-gray-700';
                    if (isRightAnswer) {
                      optStyle = 'bg-[#D1FAE5] border-[#059669] text-[#065F46] font-black';
                    } else if (isUserChoice && !isCorrect) {
                      optStyle = 'bg-[#FEE2E2] border-[#DC2626] text-[#991B1B] font-bold line-through';
                    }

                    return (
                      <div
                        key={optIdx}
                        className={`p-3 rounded-xl border text-xs sm:text-sm flex items-start gap-2 ${optStyle}`}
                      >
                        <span className="font-black shrink-0">{optLabel}.</span>
                        <span>{opt}</span>
                        {isRightAnswer && (
                          <span className="ml-auto text-[10px] bg-[#059669] text-white font-black px-2 py-0.5 rounded uppercase shrink-0">
                            Đáp án đúng
                          </span>
                        )}
                        {isUserChoice && !isRightAnswer && (
                          <span className="ml-auto text-[10px] bg-[#DC2626] text-white font-black px-2 py-0.5 rounded uppercase shrink-0">
                            Em chọn
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Explanation */}
                <div className="bg-[#FFFBEB] p-3.5 rounded-xl border border-[#FED7AA] text-xs text-[#78350F] leading-relaxed">
                  <strong className="text-[#C2410C] font-black">💡 Lời giải chi tiết:</strong> {q.explanation}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
