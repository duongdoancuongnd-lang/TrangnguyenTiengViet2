import React from 'react';
import { X, Award, Trophy, Trash2, BookOpen } from 'lucide-react';
import { StudentInfo, ExamAttempt, RoundInfo } from '../types';
import { sound } from '../utils/soundEffects';

interface LeaderboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentInfo: StudentInfo;
  rounds: RoundInfo[];
  examHistory: Record<number, ExamAttempt>;
  onSelectRound: (roundId: number) => void;
  onClearHistory: () => void;
}

export const LeaderboardModal: React.FC<LeaderboardModalProps> = ({
  isOpen,
  onClose,
  studentInfo,
  rounds,
  examHistory,
  onSelectRound,
  onClearHistory,
}) => {
  if (!isOpen) return null;

  const historyList: ExamAttempt[] = (Object.values(examHistory) as ExamAttempt[]).sort((a, b) => b.timestamp - a.timestamp);
  const totalRoundsCompleted = historyList.length;
  const totalPoints = historyList.reduce((sum: number, h: ExamAttempt) => sum + h.score, 0);
  const averageScore = totalRoundsCompleted > 0 ? Math.round(totalPoints / totalRoundsCompleted) : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-[36px] border-b-8 border-r-8 border-[#E5E7EB] shadow-2xl max-w-2xl w-full overflow-hidden flex flex-col max-h-[85vh]">
        {/* Vibrant Gradient Header */}
        <div className="bg-gradient-to-r from-[#FF8C00] to-[#FFA500] px-6 py-4 text-white flex items-center justify-between border-b-4 border-[#E27D00]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white text-[#FF8C00] rounded-2xl flex items-center justify-center font-black shadow-inner">
              🏆
            </div>
            <div>
              <h2 className="text-lg font-black uppercase tracking-tight">Bảng Vàng Thành Tích Sĩ Tử</h2>
              <p className="text-xs text-[#FFF0D1] font-semibold">
                {studentInfo.studentName} • {studentInfo.className} ({studentInfo.schoolName})
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="text-white/80 hover:text-white p-1.5 rounded-xl hover:bg-white/10 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stats Summary Bar */}
        <div className="bg-[#FFFBEB] p-4 border-b-2 border-[#FED7AA] grid grid-cols-3 gap-3 text-center text-xs">
          <div className="p-3 bg-white rounded-2xl border-2 border-[#FED7AA]">
            <div className="text-gray-400 font-bold uppercase text-[10px]">Đã Hoàn Thành</div>
            <div className="text-xl font-black text-[#FF8C00] mt-0.5">{totalRoundsCompleted} / 35 Vòng</div>
          </div>
          <div className="p-3 bg-white rounded-2xl border-2 border-[#FED7AA]">
            <div className="text-gray-400 font-bold uppercase text-[10px]">Tổng Điểm</div>
            <div className="text-xl font-black text-[#059669] mt-0.5">{totalPoints}đ</div>
          </div>
          <div className="p-3 bg-white rounded-2xl border-2 border-[#FED7AA]">
            <div className="text-gray-400 font-bold uppercase text-[10px]">Điểm Trung Bình</div>
            <div className="text-xl font-black text-[#0EA5E9] mt-0.5">{averageScore} / 300</div>
          </div>
        </div>

        {/* History List */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-3 flex-1 bg-[#F9FAFB]">
          {historyList.length === 0 ? (
            <div className="text-center py-12 space-y-2">
              <Trophy className="w-12 h-12 text-gray-300 mx-auto" />
              <p className="text-sm font-black text-gray-600">Chưa có kết quả làm bài nào</p>
              <p className="text-xs font-bold text-gray-400">Hãy chọn một vòng thi và bắt đầu làm bài nhé!</p>
            </div>
          ) : (
            historyList.map((attempt) => {
              const r = rounds.find((x) => x.id === attempt.roundId);
              const dateStr = new Intl.DateTimeFormat('vi-VN', {
                hour: '2-digit',
                minute: '2-digit',
                day: '2-digit',
                month: '2-digit',
              }).format(new Date(attempt.timestamp));

              return (
                <div
                  key={attempt.roundId}
                  className="bg-white p-4 rounded-2xl border-2 border-[#E5E7EB] hover:border-[#FED7AA] transition flex items-center justify-between gap-3 shadow-sm"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-black text-xs bg-[#FFEDD5] text-[#C2410C] px-2.5 py-0.5 rounded-lg border border-[#FED7AA]">
                        VÒNG {attempt.roundId.toString().padStart(2, '0')}
                      </span>
                      <span className="font-black text-sm text-[#1F2937] truncate max-w-[180px] sm:max-w-xs">
                        {r?.readingTopic || `Vòng ${attempt.roundId}`}
                      </span>
                    </div>
                    <div className="text-[11px] text-gray-400 font-bold flex items-center gap-2">
                      <span>{dateStr}</span>
                      <span>•</span>
                      <span className="text-[#059669]">Đúng {attempt.correctCount}/30 câu</span>
                      <span>•</span>
                      <span className="text-[#FF8C00]">{attempt.rankTitle}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-right">
                      <div className="text-lg font-black text-[#FF4500]">
                        {attempt.score}đ
                      </div>
                      <div className="text-[10px] text-gray-400 font-bold">/300 điểm</div>
                    </div>
                    <button
                      onClick={() => {
                        sound.playSelect();
                        onClose();
                        onSelectRound(attempt.roundId);
                      }}
                      className="px-4 py-2 bg-[#FF8C00] hover:bg-[#E27D00] text-white font-black text-xs uppercase rounded-xl shadow-[0_2px_0_0_#C2410C] active:translate-y-0.5 active:shadow-none transition cursor-pointer"
                    >
                      Thi Lại
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t-2 border-[#E5E7EB] flex items-center justify-between">
          {historyList.length > 0 ? (
            <button
              onClick={() => {
                if (window.confirm('Em có chắc chắn muốn xóa toàn bộ lịch sử thi không?')) {
                  sound.playClick();
                  onClearHistory();
                }
              }}
              className="text-xs font-bold text-[#DC2626] hover:underline flex items-center gap-1 cursor-pointer uppercase"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Xóa Lịch Sử
            </button>
          ) : <div />}
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="px-5 py-2.5 bg-white border-2 border-[#CBD5E1] text-[#64748B] font-black text-xs uppercase rounded-xl hover:bg-gray-50 cursor-pointer"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
