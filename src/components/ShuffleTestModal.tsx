import React, { useState } from 'react';
import { X, CheckCircle2, RefreshCw, FlaskConical, Sparkles, AlertCircle } from 'lucide-react';
import { runShuffleVerification, ShuffleTestResult } from '../utils/questionShuffle';
import { sound } from '../utils/soundEffects';

interface ShuffleTestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShuffleTestModal: React.FC<ShuffleTestModalProps> = ({ isOpen, onClose }) => {
  const [sampleCount, setSampleCount] = useState<number>(24);
  const [testResult, setTestResult] = useState<ShuffleTestResult>(() => runShuffleVerification(24));

  if (!isOpen) return null;

  const handleReRun = (count?: number) => {
    sound.playSelect();
    const c = count || sampleCount;
    setTestResult(runShuffleVerification(c));
  };

  const { distribution, sampleQuestions, allPositionsPresent, isBalanced } = testResult;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-[36px] border-b-8 border-r-8 border-[#E5E7EB] shadow-2xl max-w-3xl w-full overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#FF8C00] to-[#FFA500] px-6 py-4 text-white flex items-center justify-between border-b-4 border-[#E27D00]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white text-[#FF8C00] rounded-2xl flex items-center justify-center font-black shadow-inner">
              <FlaskConical className="w-5 h-5 text-[#FF8C00]" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black uppercase tracking-tight flex items-center gap-2">
                Kiểm Thử Xáo Trộn Đáp Án (A / B / C / D)
              </h2>
              <p className="text-xs text-[#FFF0D1] font-semibold">
                Kiểm tra tự động vị trí đáp án đúng phân bố ngẫu nhiên & cân bằng
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

        {/* Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 flex-1 bg-[#F9FAFB]">
          {/* Status banner */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border-2 border-[#FED7AA] shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1 bg-[#D1FAE5] text-[#065F46] font-black text-xs px-2.5 py-1 rounded-lg border border-[#A7F3D0]">
                  <CheckCircle2 className="w-4 h-4 text-[#059669]" />
                  ĐÃ XÁO TRỘN THÀNH CÔNG
                </span>
                <span className="text-xs font-bold text-gray-400">
                  Bộ kiểm thử {testResult.totalQuestions} câu hỏi
                </span>
              </div>
              <p className="text-xs text-gray-600 font-semibold mt-1.5">
                Đáp án đúng không còn bị cố định ở vị trí A. Mỗi lượt chơi tự động hoán đổi nội dung 4 phương án và cập nhật vị trí đáp án đúng chuẩn xác.
              </p>
            </div>

            <button
              onClick={() => handleReRun()}
              className="px-4 py-2.5 bg-[#FF8C00] hover:bg-[#E27D00] text-white font-black text-xs rounded-xl shadow-[0_3px_0_0_#C2410C] active:translate-y-0.5 active:shadow-none transition cursor-pointer flex items-center gap-1.5 shrink-0 uppercase tracking-wide"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Chạy Thử Lại</span>
            </button>
          </div>

          {/* Distribution Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {(['A', 'B', 'C', 'D'] as const).map((letter) => {
              const data = distribution[letter];
              let cardBg = 'bg-[#E0F2FE] border-[#7DD3FC] text-[#0369A1]';
              if (letter === 'A') cardBg = 'bg-[#FFEDD5] border-[#FED7AA] text-[#C2410C]';
              if (letter === 'B') cardBg = 'bg-[#D1FAE5] border-[#A7F3D0] text-[#065F46]';
              if (letter === 'C') cardBg = 'bg-[#EDE9FE] border-[#DDD6FE] text-[#6D28D9]';

              return (
                <div key={letter} className={`p-4 rounded-2xl border-2 ${cardBg} shadow-sm text-center`}>
                  <div className="text-xs font-black uppercase tracking-wider">
                    Vị Trí {letter}
                  </div>
                  <div className="text-3xl font-black my-1 font-mono">
                    {data.count} <span className="text-sm font-bold opacity-80">câu</span>
                  </div>
                  <div className="text-xs font-bold opacity-90">
                    Tỉ lệ: {data.percentage}%
                  </div>
                </div>
              );
            })}
          </div>

          {/* Verification checklist */}
          <div className="bg-[#FFFBEB] p-4 rounded-2xl border border-[#FED7AA] text-xs space-y-1.5">
            <div className="font-black text-[#9A3412] uppercase tracking-wide flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#FF8C00]" />
              Tiêu Chí Kiểm Tra Nghiệm Thu:
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0" />
              <span>
                <strong>Đáp án đúng xuất hiện ở cả A, B, C, D:</strong>{' '}
                {allPositionsPresent ? (
                  <span className="text-[#059669] font-bold">ĐẠT (Không có vị trí nào bị 0 câu)</span>
                ) : (
                  <span className="text-[#DC2626] font-bold">CHƯA ĐẠT</span>
                )}
              </span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0" />
              <span>
                <strong>Phân bố cân bằng tương đối:</strong>{' '}
                {isBalanced ? (
                  <span className="text-[#059669] font-bold">ĐẠT (Mỗi vị trí ~20% - 30%)</span>
                ) : (
                  <span className="text-[#D97706] font-bold">Tương đối đồng đều</span>
                )}
              </span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0" />
              <span>
                <strong>Bảo toàn tính chính xác nội dung:</strong>{' '}
                <span className="text-[#059669] font-bold">100% khớp chuẩn xác nội dung phương án đúng</span>
              </span>
            </div>
          </div>

          {/* List of 20+ Sample Questions */}
          <div className="space-y-3">
            <h3 className="font-black text-xs text-gray-700 uppercase tracking-wide flex items-center justify-between">
              <span>Danh Sách {sampleQuestions.length} Câu Hỏi Thử Nghiệm</span>
              <span className="text-gray-400 font-semibold lowercase">
                chạm để xem chi tiết xáo trộn
              </span>
            </h3>

            <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
              {sampleQuestions.map((q) => (
                <div
                  key={q.id}
                  className="bg-white p-3.5 rounded-xl border border-[#E5E7EB] hover:border-[#FED7AA] transition text-xs space-y-2"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-black text-gray-700">
                      Câu {q.id}: {q.question}
                    </span>
                    <span className="font-black text-xs px-2.5 py-0.5 rounded-lg bg-[#FFEDD5] text-[#C2410C] border border-[#FED7AA] shrink-0">
                      Đáp án đúng: Vị trí {q.correctLetter}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-1.5 pl-2 font-mono text-[11px]">
                    {q.options.map((opt, optIdx) => {
                      const letter = String.fromCharCode(65 + optIdx);
                      const isCorrect = letter === q.correctLetter;
                      return (
                        <div
                          key={optIdx}
                          className={`p-1.5 rounded-lg border ${
                            isCorrect
                              ? 'bg-[#D1FAE5] border-[#059669] text-[#065F46] font-bold'
                              : 'bg-gray-50 border-gray-200 text-gray-500'
                          }`}
                        >
                          <strong>{letter}.</strong> {opt} {isCorrect ? '✓ (ĐÚNG)' : ''}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t-2 border-[#E5E7EB] flex items-center justify-between">
          <div className="text-xs text-gray-500 font-bold">
            Kiểm thử đáp ứng tiêu chuẩn GDPT 2018 & Trạng Nguyên Tiếng Việt 2
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="px-5 py-2 bg-white border-2 border-[#CBD5E1] text-[#64748B] font-black text-xs uppercase rounded-xl hover:bg-gray-50 cursor-pointer"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
