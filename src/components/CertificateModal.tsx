import React, { useRef } from 'react';
import { X, Printer, Trophy, Award, Sparkles, Download, CheckCircle2 } from 'lucide-react';
import { StudentInfo, ExamAttempt, RoundInfo } from '../types';
import { sound } from '../utils/soundEffects';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentInfo: StudentInfo;
  round: RoundInfo;
  attempt: ExamAttempt;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  studentInfo,
  round,
  attempt,
}) => {
  const printRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handlePrint = () => {
    sound.playClick();
    window.print();
  };

  const todayFormatted = new Intl.DateTimeFormat('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date());

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-[36px] shadow-2xl max-w-3xl w-full overflow-hidden border-b-8 border-r-8 border-[#E5E7EB] my-auto animate-scaleUp">
        {/* Modal Top Actions */}
        <div className="bg-gradient-to-r from-[#FF8C00] to-[#FFA500] px-6 py-4 text-white flex items-center justify-between border-b-4 border-[#E27D00] print:hidden">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-200" />
            <h3 className="font-black text-sm sm:text-base uppercase tracking-wide">Giấy Chứng Nhận Trạng Nguyên</h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 bg-white text-[#9A3412] text-xs sm:text-sm font-black px-4 py-2 rounded-xl shadow-sm hover:bg-amber-50 transition cursor-pointer uppercase tracking-wider"
            >
              <Printer className="w-4 h-4" />
              <span>In Giấy Khen</span>
            </button>
            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="p-1.5 text-white/80 hover:text-white rounded-lg hover:bg-white/10 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Printable Canvas */}
        <div
          ref={printRef}
          className="p-6 sm:p-10 bg-[#FFFBEB] relative border-[12px] border-double border-[#FF8C00] m-4 rounded-[28px] text-center space-y-4 shadow-inner"
        >
          {/* Decorative Corner Ornaments */}
          <div className="absolute top-2 left-3 text-[#C2410C] text-[10px] sm:text-xs font-black uppercase tracking-widest">❖ TRẠNG NGUYÊN</div>
          <div className="absolute top-2 right-3 text-[#C2410C] text-[10px] sm:text-xs font-black uppercase tracking-widest">TIẾNG VIỆT ❖</div>
          <div className="absolute bottom-2 left-3 text-[#C2410C] text-[10px] sm:text-xs font-black uppercase tracking-widest">❖ GDPT 2018</div>
          <div className="absolute bottom-2 right-3 text-[#C2410C] text-[10px] sm:text-xs font-black uppercase tracking-widest">KẾT NỐI TRI THỨC ❖</div>

          {/* Crown */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-[#FF8C00] to-[#FFA500] rounded-full flex items-center justify-center mx-auto shadow-lg border-4 border-white">
            <span className="text-3xl sm:text-4xl">👑</span>
          </div>

          <div className="space-y-1">
            <p className="text-xs uppercase tracking-widest text-[#C2410C] font-black">
              HỘI THI TRẠNG NGUYÊN TIẾNG VIỆT LỚP 2
            </p>
            <h1 className="text-2xl sm:text-4xl font-black text-[#9A3412] uppercase tracking-tight font-serif">
              GIẤY CHỨNG NHẬN
            </h1>
            <p className="text-xs sm:text-sm text-[#D97706] font-bold italic">
              Vinh danh thành tích học tập và rèn luyện xuất sắc
            </p>
          </div>

          {/* Student details */}
          <div className="py-2 space-y-2 max-w-lg mx-auto">
            <p className="text-xs text-gray-500 font-bold">Ban Tổ Chức trân trọng chứng nhận Sĩ tử:</p>
            <h2 className="text-xl sm:text-3xl font-black text-[#9A3412] border-b-4 border-[#FF8C00] pb-2 inline-block px-6">
              {studentInfo.studentName || 'Nguyễn Minh Anh'}
            </h2>
            <div className="flex items-center justify-center gap-4 text-xs sm:text-sm text-gray-700 font-bold">
              <span>Lớp: <strong className="text-[#FF8C00]">{studentInfo.className}</strong></span>
              <span>•</span>
              <span>Trường: <strong>{studentInfo.schoolName}</strong></span>
            </div>
          </div>

          {/* Achievement Details */}
          <div className="bg-white border-2 border-[#FED7AA] rounded-2xl p-4 max-w-lg mx-auto shadow-sm space-y-2">
            <p className="text-xs text-gray-600 font-bold">
              Đã xuất sắc hoàn thành bài thi <strong>Vòng {round.id} ({round.readingTopic})</strong>
            </p>
            <div className="flex items-center justify-center gap-8">
              <div>
                <div className="text-[10px] text-gray-400 font-bold uppercase">Điểm số đạt được</div>
                <div className="text-2xl sm:text-3xl font-black text-[#FF4500]">
                  {attempt.score} / 300
                </div>
              </div>
              <div className="h-10 w-0.5 bg-[#FED7AA]" />
              <div>
                <div className="text-[10px] text-gray-400 font-bold uppercase">Danh hiệu trao tặng</div>
                <div className="text-base sm:text-lg font-black text-[#059669]">
                  {attempt.rankTitle}
                </div>
              </div>
            </div>
          </div>

          {/* Footer Signature & Seal */}
          <div className="flex items-end justify-between pt-4 px-4 sm:px-10 text-left">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full border-4 border-[#DC2626] border-dashed flex items-center justify-center text-[#DC2626] font-black text-[10px] p-2 leading-tight uppercase rotate-[-12deg] mx-auto bg-[#FEE2E2]/60">
                TRẠNG NGUYÊN TIẾNG VIỆT 2
              </div>
              <p className="text-[10px] text-gray-400 font-bold mt-1">Dấu Triện Ban Tổ Chức</p>
            </div>

            <div className="text-center space-y-1">
              <p className="text-xs text-gray-500 italic">Ngày {todayFormatted}</p>
              <p className="text-xs font-black text-gray-800 uppercase">HỘI ĐỒNG KHẢO THÍ</p>
              <div className="font-serif italic font-black text-[#FF8C00] pt-2 text-base">Trạng Nguyên Việt</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
