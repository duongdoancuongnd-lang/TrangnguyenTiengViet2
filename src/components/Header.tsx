import React from 'react';
import { Award, User, Volume2, VolumeX, BookOpen, Clock, Sparkles, FlaskConical } from 'lucide-react';
import { StudentInfo } from '../types';
import { sound } from '../utils/soundEffects';

interface HeaderProps {
  studentInfo: StudentInfo;
  onOpenStudentModal: () => void;
  onOpenHistory: () => void;
  onOpenShuffleTest?: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  activeRoundId: number | null;
  onGoHome: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  studentInfo,
  onOpenStudentModal,
  onOpenHistory,
  onOpenShuffleTest,
  soundEnabled,
  onToggleSound,
  activeRoundId,
  onGoHome,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-gradient-to-r from-[#FF8C00] to-[#FFA500] border-b-4 border-[#E27D00] shadow-md text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 sm:py-4 flex flex-wrap items-center justify-between gap-4">
        {/* Brand / Logo */}
        <button
          onClick={() => {
            sound.playClick();
            onGoHome();
          }}
          className="flex items-center gap-3 sm:gap-4 text-left group cursor-pointer hover:opacity-95 transition"
        >
          <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-full flex items-center justify-center border-4 border-white shadow-inner shrink-0 transform group-hover:scale-105 transition duration-200">
            <span className="text-2xl sm:text-3xl leading-none">📖</span>
          </div>
          <div>
            <h1 className="text-white text-xl sm:text-2xl lg:text-3xl font-black uppercase tracking-tight leading-tight font-sans drop-shadow-sm">
              Trạng Nguyên Tiếng Việt
            </h1>
            <p className="text-[#FFF0D1] text-[11px] sm:text-xs font-bold uppercase tracking-wide">
              Bộ Đề Ôn Luyện Lớp 2 • Kết Nối Tri Thức
            </p>
          </div>
        </button>

        {/* Center/Right Action Widgets */}
        <div className="flex items-center flex-wrap gap-2.5 sm:gap-3">
          {/* Exam Standard Time Badge */}
          <div className="hidden md:flex bg-white/20 px-4 py-1.5 rounded-2xl border border-white/30 backdrop-blur-sm flex-col items-center">
            <span className="text-[#FFF0D1] text-[9px] uppercase font-black tracking-widest leading-none">
              Thời Gian Vòng Thi
            </span>
            <span className="text-white text-base sm:text-lg font-mono font-black leading-tight">
              30:00
            </span>
          </div>

          {/* Student Info Pill */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenStudentModal();
            }}
            className="flex items-center gap-2 bg-white/20 hover:bg-white/30 border-2 border-white/40 rounded-2xl px-3 py-1.5 transition text-left cursor-pointer backdrop-blur-sm shadow-sm group"
            title="Bấm để đổi thông tin học sinh"
          >
            <div className="w-7 h-7 rounded-xl bg-white text-[#FF8C00] flex items-center justify-center font-black text-xs shadow-sm">
              <User className="w-4 h-4" />
            </div>
            <div className="text-xs leading-tight max-w-[120px] sm:max-w-[170px] truncate">
              <p className="font-black text-white truncate">
                {studentInfo.studentName || 'Sĩ Tử Nhí'}
              </p>
              <p className="text-[#FFF0D1] text-[11px] font-semibold truncate">
                {studentInfo.className} • {studentInfo.schoolName}
              </p>
            </div>
          </button>

          {/* Leaderboard / History */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenHistory();
            }}
            className="flex items-center gap-1.5 bg-[#FF4500] hover:bg-[#CC3700] text-white font-black text-xs sm:text-sm px-3.5 py-2 rounded-xl shadow-[0_3px_0_0_#992900] active:translate-y-0.5 active:shadow-none transition cursor-pointer border border-[#FFA500]/50 uppercase tracking-wide"
            title="Xem Bảng Vàng & Lịch Sử Thi"
          >
            <Award className="w-4 h-4 text-amber-200" />
            <span className="hidden sm:inline">Bảng Vàng</span>
          </button>

          {/* Diagnostic Test Button (Requirement 14) */}
          {onOpenShuffleTest && (
            <button
              onClick={() => {
                sound.playClick();
                onOpenShuffleTest();
              }}
              className="flex items-center gap-1.5 bg-white/20 hover:bg-white/30 text-white font-black text-xs px-3 py-2 rounded-xl border border-white/40 transition cursor-pointer backdrop-blur-sm uppercase tracking-wide"
              title="Kiểm tra phân bố đáp án A/B/C/D"
            >
              <FlaskConical className="w-4 h-4 text-yellow-300" />
              <span className="hidden lg:inline">Kiểm Thử A/B/C/D</span>
            </button>
          )}

          {/* Audio toggle */}
          <button
            onClick={() => {
              onToggleSound();
              sound.playClick();
            }}
            className={`p-2 rounded-xl border-2 transition cursor-pointer ${
              soundEnabled
                ? 'bg-white text-[#FF8C00] border-white shadow-sm hover:bg-amber-50'
                : 'bg-black/20 text-[#FFF0D1] border-white/30 hover:bg-black/30'
            }`}
            title={soundEnabled ? 'Tắt âm thanh hiệu ứng' : 'Bật âm thanh hiệu ứng'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
};
