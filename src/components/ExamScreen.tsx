import React, { useState, useEffect, useRef } from 'react';
import {
  Clock,
  ChevronLeft,
  ChevronRight,
  Send,
  Volume2,
  VolumeX,
  AlertTriangle,
  Bookmark,
  CheckCircle2,
  Play,
  Sparkles,
  HelpCircle
} from 'lucide-react';
import { RoundInfo, StudentInfo, Question } from '../types';
import { sound } from '../utils/soundEffects';
import { speakVietnamese, stopSpeaking } from '../utils/speech';

interface ExamScreenProps {
  round: RoundInfo;
  studentInfo: StudentInfo;
  onFinishExam: (answers: Record<number, number>, timeSpentSeconds: number) => void;
  onExit: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

const TOTAL_TIME_SECONDS = 30 * 60; // 30 mins

export const ExamScreen: React.FC<ExamScreenProps> = ({
  round,
  studentInfo,
  onFinishExam,
  onExit,
  soundEnabled,
  onToggleSound,
}) => {
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [flagged, setFlagged] = useState<Record<number, boolean>>({});
  const [timeLeft, setTimeLeft] = useState<number>(TOTAL_TIME_SECONDS);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (hasStarted) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            handleAutoSubmit();
            return 0;
          }
          if (prev === 60 || prev === 300) {
            sound.playTick();
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      stopSpeaking();
    };
  }, [hasStarted]);

  const handleAutoSubmit = () => {
    sound.playFanfare();
    onFinishExam(answers, TOTAL_TIME_SECONDS);
  };

  const handleSelectOption = (optionIndex: number) => {
    sound.playSelect();
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionIndex,
    }));
  };

  const handleToggleFlag = () => {
    sound.playClick();
    setFlagged((prev) => ({
      ...prev,
      [currentQuestion.id]: !prev[currentQuestion.id],
    }));
  };

  const handleNext = () => {
    sound.playClick();
    stopSpeaking();
    setIsSpeaking(false);
    if (currentIdx < round.questions.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    sound.playClick();
    stopSpeaking();
    setIsSpeaking(false);
    if (currentIdx > 0) {
      setCurrentIdx((prev) => prev - 1);
    }
  };

  const handleSpeakQuestion = () => {
    if (isSpeaking) {
      stopSpeaking();
      setIsSpeaking(false);
      return;
    }
    setIsSpeaking(true);
    const textToRead = `Câu ${currentQuestion.id}. ${currentQuestion.question}. Các phương án là: ` +
      currentQuestion.options.map((opt, i) => `Phương án ${String.fromCharCode(65 + i)}: ${opt}`).join('. ');
    speakVietnamese(textToRead, () => setIsSpeaking(false));
  };

  const currentQuestion = round.questions[currentIdx] || round.questions[0];
  const answeredCount = Object.keys(answers).length;
  const unansweredCount = round.questions.length - answeredCount;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  // Start Intro confirmation screen
  if (!hasStarted) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-[36px] border-b-8 border-r-8 border-[#E5E7EB] shadow-2xl overflow-hidden">
          {/* Vibrant Top Header */}
          <div className="bg-gradient-to-r from-[#FF8C00] to-[#FFA500] px-6 sm:px-10 py-8 text-white text-center border-b-4 border-[#E27D00]">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-inner border-4 border-white">
              <span className="text-3xl">🎯</span>
            </div>
            <div className="inline-block bg-[#FFF0D1] text-[#9A3412] font-black text-xs uppercase px-3 py-1 rounded-full mb-2 tracking-wider shadow-sm">
              Chuẩn Bị Vào Vòng Thi
            </div>
            <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white drop-shadow-sm">
              VÒNG {round.id.toString().padStart(2, '0')} • {round.readingTopic}
            </h2>
            <p className="text-[#FFF0D1] text-xs sm:text-sm font-semibold max-w-xl mx-auto mt-1">
              {round.description}
            </p>
          </div>

          <div className="p-6 sm:p-10 space-y-6">
            {/* Student Info Card */}
            <div className="bg-[#FFFBEB] p-5 rounded-[28px] border-2 border-[#FED7AA]">
              <h3 className="text-[#C2410C] text-sm font-black uppercase mb-3 flex items-center gap-2">
                <span>👤</span> THÔNG TIN SĨ TỬ DỰ THI:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-white p-3.5 rounded-xl border border-[#FED7AA]">
                  <span className="text-[11px] font-bold text-gray-400 uppercase block">Học sinh</span>
                  <span className="font-black text-base text-[#1F2937]">{studentInfo.studentName}</span>
                </div>
                <div className="bg-white p-3.5 rounded-xl border border-[#FED7AA]">
                  <span className="text-[11px] font-bold text-gray-400 uppercase block">Lớp</span>
                  <span className="font-black text-base text-[#1F2937]">{studentInfo.className}</span>
                </div>
                <div className="bg-white p-3.5 rounded-xl border border-[#FED7AA]">
                  <span className="text-[11px] font-bold text-gray-400 uppercase block">Trường học</span>
                  <span className="font-black text-base text-[#1F2937] truncate block">{studentInfo.schoolName}</span>
                </div>
              </div>
            </div>

            {/* Exam Specification Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-[#D1FAE5] p-4 rounded-[24px] border-b-6 border-r-6 border-[#A7F3D0]">
                <div className="text-[#065F46] font-black text-lg mb-1">30 Câu Hỏi</div>
                <div className="text-xs text-[#047857] font-semibold space-y-1">
                  <div>• 20 câu Mức 1 (Nhận biết)</div>
                  <div>• 05 câu Mức 2 (Thông hiểu)</div>
                  <div>• 05 câu Mức 3 (Vận dụng)</div>
                </div>
              </div>

              <div className="bg-[#FFEDD5] p-4 rounded-[24px] border-b-6 border-r-6 border-[#FED7AA]">
                <div className="text-[#C2410C] font-black text-lg mb-1">30:00 Phút</div>
                <div className="text-xs text-[#9A3412] font-semibold leading-relaxed">
                  Đồng hồ đếm ngược tự động. Hết giờ hệ thống sẽ tự động khóa và nộp bài.
                </div>
              </div>

              <div className="bg-[#E0F2FE] p-4 rounded-[24px] border-b-6 border-r-6 border-[#7DD3FC]">
                <div className="text-[#0369A1] font-black text-lg mb-1">300 Điểm</div>
                <div className="text-xs text-[#0284C7] font-semibold leading-relaxed">
                  Mỗi câu trả lời đúng được 10 điểm. Vinh danh bảng vàng Trạng Nguyên!
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t-2 border-[#F3F4F6]">
              <button
                onClick={() => {
                  sound.playClick();
                  onExit();
                }}
                className="w-full sm:w-auto px-6 py-3 bg-white border-2 border-[#CBD5E1] text-[#64748B] rounded-xl text-sm font-black hover:bg-gray-50 uppercase cursor-pointer"
              >
                Trở Lại Danh Sách
              </button>

              <button
                onClick={() => {
                  sound.playFanfare();
                  setHasStarted(true);
                }}
                className="w-full sm:w-auto px-8 py-3.5 bg-[#FF4500] hover:bg-[#CC3700] text-white rounded-2xl text-lg font-black uppercase tracking-wider shadow-[0_6px_0_0_#992900] active:translate-y-1 active:shadow-none transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <Play className="w-5 h-5 fill-current" />
                <span>BẮT ĐẦU LÀM BÀI NGAY</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Level Badge Helper in Vibrant Palette
  const renderLevelBadge = (level: number) => {
    if (level === 1) {
      return (
        <span className="bg-[#059669] text-white text-xs font-black px-3 py-0.5 rounded-full shadow-sm uppercase tracking-wide">
          Mức 1 • Dễ
        </span>
      );
    }
    if (level === 2) {
      return (
        <span className="bg-[#D97706] text-white text-xs font-black px-3 py-0.5 rounded-full shadow-sm uppercase tracking-wide">
          Mức 2 • Trung bình
        </span>
      );
    }
    return (
      <span className="bg-[#DC2626] text-white text-xs font-black px-3 py-0.5 rounded-full shadow-sm uppercase tracking-wide">
        Mức 3 • Vận dụng
      </span>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6 space-y-6">
      {/* Top Banner Control Bar */}
      <div className="bg-white rounded-[28px] border-b-6 border-r-6 border-[#E5E7EB] p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 shadow-sm">
        {/* Left: Round & Student Info */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              sound.playClick();
              setIsSubmitModalOpen(true);
            }}
            className="p-2 bg-[#F3F4F6] hover:bg-[#E5E7EB] rounded-xl text-gray-600 transition cursor-pointer"
            title="Dừng hoặc nộp bài"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-[#FFEDD5] border border-[#FED7AA] text-[#C2410C] font-black text-xs px-2.5 py-0.5 rounded-lg">
                VÒNG {round.id.toString().padStart(2, '0')}
              </span>
              <span className="font-bold text-xs text-gray-700 truncate max-w-[150px] sm:max-w-xs">
                {round.readingTopic}
              </span>
            </div>
            <p className="text-[11px] text-gray-400 font-semibold mt-0.5">
              Sĩ tử: <strong className="text-gray-700">{studentInfo.studentName}</strong> ({studentInfo.className})
            </p>
          </div>
        </div>

        {/* Center: Vibrant Countdown Timer */}
        <div
          className={`flex items-center gap-2 px-5 py-2 rounded-2xl border-2 font-mono font-black text-xl shadow-inner transition ${
            timeLeft <= 300
              ? 'bg-[#FEE2E2] text-[#DC2626] border-[#FCA5A5] animate-pulse'
              : 'bg-[#FFEDD5] text-[#C2410C] border-[#FED7AA]'
          }`}
        >
          <Clock className="w-5 h-5" />
          <span>{formattedTime}</span>
        </div>

        {/* Right: Audio Reading & Submit Button */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={handleSpeakQuestion}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-black uppercase transition cursor-pointer border ${
              isSpeaking
                ? 'bg-[#DC2626] text-white border-[#B91C1C] animate-bounce'
                : 'bg-[#E0F2FE] text-[#0369A1] border-[#7DD3FC] hover:bg-[#BAE6FD]'
            }`}
            title="Nghe cô giáo đọc to câu hỏi"
          >
            <Volume2 className="w-4 h-4" />
            <span className="hidden sm:inline">{isSpeaking ? 'Đang Đọc...' : 'Đọc Câu Hỏi'}</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setIsSubmitModalOpen(true);
            }}
            className="px-5 py-2 bg-[#FF4500] hover:bg-[#CC3700] text-white font-black text-xs sm:text-sm rounded-xl shadow-[0_3px_0_0_#992900] active:translate-y-0.5 active:shadow-none uppercase cursor-pointer flex items-center gap-1.5"
          >
            <Send className="w-4 h-4" />
            <span>Nộp Bài</span>
          </button>
        </div>
      </div>

      {/* Main Examination Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (8 Cols): Main Active Question */}
        <div className="lg:col-span-8 flex flex-col bg-white p-6 sm:p-8 rounded-[36px] border-b-8 border-r-8 border-[#E5E7EB] shadow-lg min-h-[480px] justify-between">
          <div>
            {/* Question Meta Header */}
            <div className="flex items-center justify-between gap-3 border-b-2 border-[#F3F4F6] pb-4 mb-5">
              <div className="flex items-center gap-2.5">
                <span className="font-black text-lg text-[#FF8C00] bg-[#FFEDD5] px-3 py-1 rounded-xl border border-[#FED7AA]">
                  Câu {currentIdx + 1}/30
                </span>
                {renderLevelBadge(currentQuestion.level)}
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-gray-400 bg-gray-100 px-3 py-1 rounded-xl">
                  {currentQuestion.topic}
                </span>
                <button
                  onClick={handleToggleFlag}
                  className={`p-2 rounded-xl border-2 transition cursor-pointer ${
                    flagged[currentQuestion.id]
                      ? 'bg-[#FFEDD5] text-[#C2410C] border-[#FED7AA]'
                      : 'text-gray-400 border-[#E5E7EB] hover:bg-gray-50'
                  }`}
                  title="Đánh dấu cần xem lại"
                >
                  <Bookmark className={`w-4 h-4 ${flagged[currentQuestion.id] ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>

            {/* Passage if present */}
            {currentQuestion.passage && (
              <div className="bg-[#FFFBEB] border-l-4 border-[#FF8C00] p-4 rounded-r-2xl mb-5 text-sm text-[#78350F] leading-relaxed italic font-serif">
                {currentQuestion.passage}
              </div>
            )}

            {/* Question Text */}
            <h3 className="text-base sm:text-xl font-black text-[#1F2937] leading-relaxed mb-6 whitespace-pre-line">
              {currentQuestion.question}
            </h3>

            {/* 4 Options */}
            <div className="space-y-3">
              {currentQuestion.options.map((option, idx) => {
                const isSelected = answers[currentQuestion.id] === idx;
                const optionLabel = String.fromCharCode(65 + idx);

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex items-start gap-3.5 cursor-pointer ${
                      isSelected
                        ? 'bg-[#FFEDD5] border-[#FF8C00] text-[#1F2937] ring-4 ring-[#FED7AA] shadow-sm font-black'
                        : 'bg-[#F9FAFB] border-[#E5E7EB] text-gray-700 hover:bg-[#FFFBEB] hover:border-[#FFA500] font-bold'
                    }`}
                  >
                    <span
                      className={`w-8 h-8 rounded-xl shrink-0 flex items-center justify-center font-black text-sm transition ${
                        isSelected
                          ? 'bg-[#FF8C00] text-white shadow-sm'
                          : 'bg-white text-gray-500 border-2 border-[#E5E7EB]'
                      }`}
                    >
                      {optionLabel}
                    </span>
                    <span className="text-sm sm:text-base leading-relaxed pt-0.5">
                      {option}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Navigation Bottom Controls */}
          <div className="flex items-center justify-between gap-3 pt-6 mt-8 border-t-2 border-[#F3F4F6]">
            <button
              onClick={handlePrev}
              disabled={currentIdx === 0}
              className={`px-5 py-2.5 bg-white border-2 border-[#CBD5E1] text-[#64748B] rounded-xl text-xs sm:text-sm font-black uppercase transition cursor-pointer flex items-center gap-1.5 ${
                currentIdx === 0 ? 'opacity-40 cursor-not-allowed' : 'hover:bg-gray-50'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>TRỞ LẠI</span>
            </button>

            <div className="text-xs font-bold text-gray-400">
              Đã làm: <strong className="text-[#059669] text-sm font-black">{answeredCount}</strong> / 30 câu
            </div>

            {currentIdx < round.questions.length - 1 ? (
              <button
                onClick={handleNext}
                className="px-6 py-2.5 bg-[#0EA5E9] border-b-4 border-[#0284C7] text-white rounded-xl text-xs sm:text-sm font-black uppercase hover:bg-[#0284C7] active:translate-y-0.5 active:border-b-0 transition flex items-center gap-1.5 cursor-pointer"
              >
                <span>TIẾP TỤC</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => {
                  sound.playClick();
                  setIsSubmitModalOpen(true);
                }}
                className="px-6 py-2.5 bg-[#FF4500] hover:bg-[#CC3700] text-white rounded-xl text-xs sm:text-sm font-black uppercase shadow-[0_3px_0_0_#992900] active:translate-y-0.5 active:shadow-none transition flex items-center gap-1.5 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>HOÀN THÀNH</span>
              </button>
            )}
          </div>
        </div>

        {/* Right Column (4 Cols): Question Grid Map */}
        <div className="lg:col-span-4 bg-white p-6 rounded-[32px] border-b-8 border-r-8 border-[#E5E7EB] shadow-lg space-y-4">
          <div className="flex items-center justify-between border-b-2 border-[#F3F4F6] pb-3">
            <h4 className="font-black text-sm text-[#1F2937] uppercase flex items-center gap-1.5">
              <span>📋</span> Bảng 30 Câu Hỏi
            </h4>
            <span className="text-xs font-black bg-[#D1FAE5] text-[#065F46] px-2.5 py-0.5 rounded-lg border border-[#A7F3D0]">
              {answeredCount} / 30
            </span>
          </div>

          {/* Level Legend */}
          <div className="flex items-center justify-between text-[11px] text-gray-500 font-bold bg-[#F9FAFB] p-2.5 rounded-xl border border-[#E5E7EB]">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#059669]" /> C1-20 (Dễ)
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D97706]" /> C21-25 (TB)
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#DC2626]" /> C26-30 (Khó)
            </span>
          </div>

          {/* 30 buttons (6 cols) */}
          <div className="grid grid-cols-6 gap-2">
            {round.questions.map((q, idx) => {
              const isCurrent = idx === currentIdx;
              const isAnswered = answers[q.id] !== undefined;
              const isFlagged = flagged[q.id];

              let btnStyle = 'bg-[#F3F4F6] text-gray-500 border-2 border-[#E5E7EB] hover:border-[#FFA500]';
              if (isCurrent) {
                btnStyle = 'bg-[#FF4500] text-white font-black border-2 border-[#CC3700] ring-2 ring-[#FFA500] shadow-sm';
              } else if (isAnswered) {
                btnStyle = 'bg-[#059669] text-white font-black border-2 border-[#047857] shadow-sm';
              } else if (isFlagged) {
                btnStyle = 'bg-[#FFEDD5] text-[#C2410C] font-black border-2 border-[#FED7AA]';
              }

              return (
                <button
                  key={q.id}
                  onClick={() => {
                    sound.playClick();
                    stopSpeaking();
                    setIsSpeaking(false);
                    setCurrentIdx(idx);
                  }}
                  className={`h-10 rounded-xl text-xs flex items-center justify-center transition relative cursor-pointer ${btnStyle}`}
                >
                  <span>{idx + 1}</span>
                  {isFlagged && !isCurrent && (
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#FF8C00] rounded-full ring-1 ring-white" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Legend status indicators */}
          <div className="pt-3 border-t-2 border-[#F3F4F6] grid grid-cols-3 gap-1 text-[11px] text-gray-500 font-bold text-center">
            <div className="flex items-center gap-1 justify-center">
              <div className="w-3 h-3 bg-[#FF4500] rounded-md" /> Đang làm
            </div>
            <div className="flex items-center gap-1 justify-center">
              <div className="w-3 h-3 bg-[#059669] rounded-md" /> Đã chọn
            </div>
            <div className="flex items-center gap-1 justify-center">
              <div className="w-3 h-3 bg-[#F3F4F6] border border-[#E5E7EB] rounded-md" /> Chưa làm
            </div>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              setIsSubmitModalOpen(true);
            }}
            className="w-full py-3 bg-[#0EA5E9] hover:bg-[#0284C7] border-b-4 border-[#0284C7] text-white font-black text-xs uppercase rounded-2xl shadow-sm transition cursor-pointer flex items-center justify-center gap-1.5 mt-2"
          >
            <Send className="w-4 h-4" />
            <span>Nộp Bài Thi Ngay</span>
          </button>
        </div>
      </div>

      {/* Confirmation Submit Modal */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-[36px] border-b-8 border-r-8 border-[#E5E7EB] shadow-2xl max-w-md w-full p-6 sm:p-8 space-y-5">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 bg-[#FFEDD5] border-2 border-[#FED7AA] text-[#C2410C] rounded-full flex items-center justify-center mx-auto text-3xl">
                ⚠️
              </div>
              <h3 className="text-xl font-black uppercase text-[#1F2937]">
                Xác Nhận Nộp Bài Thi
              </h3>
              <p className="text-xs font-bold text-gray-500">
                Em có chắc chắn muốn nộp bài thi <strong>Vòng {round.id}</strong> không?
              </p>
            </div>

            <div className="bg-[#F9FAFB] p-4 rounded-2xl border-2 border-[#E5E7EB] space-y-2 text-xs font-bold">
              <div className="flex items-center justify-between text-gray-700">
                <span>Số câu đã trả lời:</span>
                <strong className="text-[#059669] text-sm font-black">{answeredCount} / 30 câu</strong>
              </div>
              <div className="flex items-center justify-between text-gray-700">
                <span>Số câu chưa làm:</span>
                <strong className={`text-sm font-black ${unansweredCount > 0 ? 'text-[#DC2626]' : 'text-gray-400'}`}>
                  {unansweredCount} câu
                </strong>
              </div>
              <div className="flex items-center justify-between text-gray-700">
                <span>Thời gian còn lại:</span>
                <strong className="text-[#C2410C] font-mono text-sm font-black">{formattedTime}</strong>
              </div>
            </div>

            {unansweredCount > 0 && (
              <p className="text-xs text-[#9A3412] bg-[#FFEDD5] p-3 rounded-xl border border-[#FED7AA] text-center font-bold">
                ⚠️ Em vẫn còn {unansweredCount} câu chưa trả lời. Em có muốn kiểm tra lại trước khi nộp không?
              </p>
            )}

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => {
                  sound.playClick();
                  setIsSubmitModalOpen(false);
                }}
                className="flex-1 py-3 bg-white border-2 border-[#CBD5E1] text-[#64748B] font-black text-xs uppercase rounded-xl hover:bg-gray-50 cursor-pointer"
              >
                Làm Tiếp
              </button>
              <button
                onClick={() => {
                  setIsSubmitModalOpen(false);
                  sound.playFanfare();
                  const timeSpent = TOTAL_TIME_SECONDS - timeLeft;
                  onFinishExam(answers, timeSpent);
                }}
                className="flex-1 py-3 bg-[#FF4500] hover:bg-[#CC3700] text-white font-black text-xs uppercase rounded-xl shadow-[0_3px_0_0_#992900] active:translate-y-0.5 active:shadow-none cursor-pointer flex items-center justify-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Nộp Bài</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
