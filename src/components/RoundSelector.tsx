import React, { useState } from 'react';
import {
  BookOpen,
  Clock,
  Sparkles,
  Trophy,
  CheckCircle2,
  ChevronRight,
  Search,
  Flame,
  Award,
  Filter,
  User,
  GraduationCap,
  Play,
  RotateCcw,
  Check
} from 'lucide-react';
import { RoundInfo, StudentInfo, ExamAttempt } from '../types';
import { sound } from '../utils/soundEffects';

interface RoundSelectorProps {
  rounds: RoundInfo[];
  studentInfo: StudentInfo;
  examHistory: Record<number, ExamAttempt>;
  onSelectRound: (roundId: number) => void;
  onEditStudent: () => void;
}

export const RoundSelector: React.FC<RoundSelectorProps> = ({
  rounds,
  studentInfo,
  examHistory,
  onSelectRound,
  onEditStudent,
}) => {
  const [selectedRoundId, setSelectedRoundId] = useState<number>(1);
  const [filterTab, setFilterTab] = useState<'all' | 'sem1' | 'sem2' | 'done'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'hub' | 'cards'>('hub');

  // Statistics
  const historyList = Object.values(examHistory) as ExamAttempt[];
  const completedCount = historyList.length;
  const totalScoreAchieved = historyList.reduce((acc: number, curr: ExamAttempt) => acc + curr.score, 0);
  const bestScore = historyList.reduce((max: number, curr: ExamAttempt) => Math.max(max, curr.score), 0);

  const selectedRound = rounds.find((r) => r.id === selectedRoundId) || rounds[0];
  const selectedAttempt = examHistory[selectedRoundId];

  // Filtered rounds list for search/cards
  const filteredRounds = rounds.filter((r) => {
    if (filterTab === 'sem1' && r.semester !== 1) return false;
    if (filterTab === 'sem2' && r.semester !== 2) return false;
    if (filterTab === 'done' && !examHistory[r.id]) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = r.title.toLowerCase().includes(q);
      const matchTopic = r.readingTopic.toLowerCase().includes(q);
      const matchTheme = r.theme.toLowerCase().includes(q);
      const matchDesc = r.description.toLowerCase().includes(q);
      const matchId = `vòng ${r.id}`.includes(q) || `${r.id}` === q;
      return matchTitle || matchTopic || matchTheme || matchDesc || matchId;
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6 space-y-8">
      {/* Top Controls: Switch between Hub View & Full Cards View */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 sm:p-5 rounded-[28px] border-b-6 border-r-6 border-[#E5E7EB] shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#FFEDD5] border-2 border-[#FED7AA] flex items-center justify-center text-[#FF8C00] font-black">
            🎯
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-black text-[#1F2937] uppercase tracking-tight">
              Bảng Chọn Vòng Ôn Luyện Lớp 2
            </h2>
            <p className="text-xs font-bold text-gray-400">
              Chuẩn 35 tuần học bộ sách Kết Nối Tri Thức Với Cuộc Sống
            </p>
          </div>
        </div>

        {/* View Toggle and Search */}
        <div className="flex items-center flex-wrap gap-2 w-full sm:w-auto">
          <div className="flex items-center bg-[#F3F4F6] p-1 rounded-2xl border border-[#E5E7EB]">
            <button
              onClick={() => {
                sound.playClick();
                setViewMode('hub');
              }}
              className={`px-4 py-1.5 rounded-xl text-xs font-black uppercase transition cursor-pointer ${
                viewMode === 'hub'
                  ? 'bg-[#FF8C00] text-white shadow-sm'
                  : 'text-[#64748B] hover:text-[#1F2937]'
              }`}
            >
              Ma Trận 35 Vòng
            </button>
            <button
              onClick={() => {
                sound.playClick();
                setViewMode('cards');
              }}
              className={`px-4 py-1.5 rounded-xl text-xs font-black uppercase transition cursor-pointer ${
                viewMode === 'cards'
                  ? 'bg-[#FF8C00] text-white shadow-sm'
                  : 'text-[#64748B] hover:text-[#1F2937]'
              }`}
            >
              Chi Tiết Từng Bài
            </button>
          </div>

          <div className="relative flex-1 sm:w-56">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm bài học, chủ điểm..."
              className="w-full pl-9 pr-3.5 py-1.5 bg-[#F9FAFB] border-2 border-[#E5E7EB] rounded-xl text-xs font-medium focus:outline-none focus:border-[#FFA500]"
            />
          </div>
        </div>
      </div>

      {/* Main Hub Grid Section */}
      {viewMode === 'hub' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (4 Cols): Student Info & Exam Structure */}
          <section className="lg:col-span-4 flex flex-col gap-6">
            {/* Student Info Card */}
            <div className="bg-white p-6 rounded-[32px] border-b-8 border-r-8 border-[#E5E7EB] shadow-sm">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-[#FF8C00] text-lg sm:text-xl font-black flex items-center gap-2 underline decoration-4 underline-offset-4 uppercase tracking-tight">
                  <span>👤</span> THÔNG TIN HỌC SINH
                </h2>
                <button
                  onClick={() => {
                    sound.playClick();
                    onEditStudent();
                  }}
                  className="text-xs font-bold text-[#0EA5E9] hover:underline uppercase cursor-pointer"
                >
                  Thay đổi
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#9CA3AF] uppercase mb-1 ml-1">
                    Tên Trường Học
                  </label>
                  <div className="w-full px-4 py-3 bg-[#F9FAFB] border-2 border-[#E5E7EB] rounded-xl font-bold text-[#1F2937] text-sm truncate">
                    {studentInfo.schoolName}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#9CA3AF] uppercase mb-1 ml-1">
                    Họ Và Tên Học Sinh
                  </label>
                  <div className="w-full px-4 py-3 bg-[#F9FAFB] border-2 border-[#E5E7EB] rounded-xl font-black text-[#1F2937] text-sm text-[#FF8C00]">
                    {studentInfo.studentName}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#9CA3AF] uppercase mb-1 ml-1">
                    Lớp
                  </label>
                  <div className="w-full px-4 py-3 bg-[#F9FAFB] border-2 border-[#E5E7EB] rounded-xl font-bold text-[#1F2937] text-sm">
                    {studentInfo.className}
                  </div>
                </div>
              </div>

              {/* Progress metric */}
              <div className="mt-5 pt-4 border-t-2 border-[#F3F4F6] flex items-center justify-between text-xs">
                <span className="font-bold text-[#64748B]">Đã hoàn thành:</span>
                <span className="font-black text-[#FF8C00] bg-[#FFEDD5] px-2.5 py-1 rounded-lg border border-[#FED7AA]">
                  {completedCount} / 35 Vòng
                </span>
              </div>
            </div>

            {/* Structure of Exam Card (Vibrant Green & Badges) */}
            <div className="bg-[#D1FAE5] p-6 rounded-[32px] border-b-8 border-r-8 border-[#A7F3D0]">
              <h3 className="text-[#065F46] text-sm font-black uppercase mb-4 tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#059669]" />
                Cấu trúc đề thi (Vòng {selectedRound.id.toString().padStart(2, '0')})
              </h3>
              <ul className="space-y-2.5">
                <li className="flex justify-between items-center bg-white/70 backdrop-blur-sm p-2.5 rounded-xl border border-white">
                  <span className="text-xs sm:text-sm font-black text-[#065F46]">
                    🔹 Mức 1 (Nhận biết)
                  </span>
                  <span className="bg-[#059669] text-white px-3 py-1 rounded-full text-xs font-black shadow-sm">
                    20 Câu (67%)
                  </span>
                </li>
                <li className="flex justify-between items-center bg-white/70 backdrop-blur-sm p-2.5 rounded-xl border border-white">
                  <span className="text-xs sm:text-sm font-black text-[#065F46]">
                    🔸 Mức 2 (Thông hiểu)
                  </span>
                  <span className="bg-[#D97706] text-white px-3 py-1 rounded-full text-xs font-black shadow-sm">
                    05 Câu (17%)
                  </span>
                </li>
                <li className="flex justify-between items-center bg-white/70 backdrop-blur-sm p-2.5 rounded-xl border border-white">
                  <span className="text-xs sm:text-sm font-black text-[#065F46]">
                    🔺 Mức 3 (Vận dụng)
                  </span>
                  <span className="bg-[#DC2626] text-white px-3 py-1 rounded-full text-xs font-black shadow-sm">
                    05 Câu (17%)
                  </span>
                </li>
              </ul>
              <div className="mt-4 pt-3 border-t border-[#A7F3D0] flex items-center justify-between text-[11px] text-[#065F46] font-bold">
                <span>⏱ Thời gian: 30:00</span>
                <span>🎯 Điểm tối đa: 300 điểm</span>
              </div>
            </div>
          </section>

          {/* Right Column (8 Cols): 35 Rounds Matrix Grid & Selection Banner */}
          <section className="lg:col-span-8 flex flex-col bg-white p-6 sm:p-8 rounded-[40px] border-b-8 border-r-8 border-[#E5E7EB] shadow-lg min-h-[580px] justify-between">
            <div>
              {/* Header Title & Filter Tabs */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 mb-6">
                <div>
                  <h2 className="text-[#1F2937] text-2xl font-black uppercase tracking-tight flex items-center">
                    CHỌN VÒNG THI <span className="text-[#FF8C00] ml-2">(35 Vòng)</span>
                  </h2>
                  <p className="text-xs font-bold text-gray-400 italic">
                    Chạm để chọn vòng ôn luyện và xem nội dung chi tiết
                  </p>
                </div>

                {/* Filter Tabs */}
                <div className="flex items-center gap-1 bg-[#F3F4F6] p-1 rounded-xl border border-[#E5E7EB]">
                  <button
                    onClick={() => {
                      sound.playClick();
                      setFilterTab('all');
                    }}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-black uppercase transition cursor-pointer ${
                      filterTab === 'all'
                        ? 'bg-[#FF8C00] text-white shadow-sm'
                        : 'text-gray-500 hover:text-gray-900'
                    }`}
                  >
                    Tất cả
                  </button>
                  <button
                    onClick={() => {
                      sound.playClick();
                      setFilterTab('sem1');
                    }}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-black uppercase transition cursor-pointer ${
                      filterTab === 'sem1'
                        ? 'bg-[#FF8C00] text-white shadow-sm'
                        : 'text-gray-500 hover:text-gray-900'
                    }`}
                  >
                    Học kì 1
                  </button>
                  <button
                    onClick={() => {
                      sound.playClick();
                      setFilterTab('sem2');
                    }}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-black uppercase transition cursor-pointer ${
                      filterTab === 'sem2'
                        ? 'bg-[#FF8C00] text-white shadow-sm'
                        : 'text-gray-500 hover:text-gray-900'
                    }`}
                  >
                    Học kì 2
                  </button>
                  <button
                    onClick={() => {
                      sound.playClick();
                      setFilterTab('done');
                    }}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-black uppercase transition cursor-pointer ${
                      filterTab === 'done'
                        ? 'bg-[#059669] text-white shadow-sm'
                        : 'text-gray-500 hover:text-gray-900'
                    }`}
                  >
                    Đã thi
                  </button>
                </div>
              </div>

              {/* 35 Rounds Grid (7 columns layout) */}
              <div className="grid grid-cols-4 sm:grid-cols-7 gap-2.5 sm:gap-3 content-start mb-6">
                {rounds.map((round) => {
                  const isSelected = round.id === selectedRoundId;
                  const hasAttempt = !!examHistory[round.id];
                  const isFilteredOut =
                    (filterTab === 'sem1' && round.semester !== 1) ||
                    (filterTab === 'sem2' && round.semester !== 2) ||
                    (filterTab === 'done' && !hasAttempt);

                  if (isFilteredOut) return null;

                  let cardStyle =
                    'bg-[#F3F4F6] border-2 border-[#E5E7EB] text-gray-500 hover:border-[#FF8C00] hover:text-[#FF8C00]';
                  if (isSelected) {
                    cardStyle =
                      'bg-[#FFEDD5] border-2 border-[#FED7AA] text-[#C2410C] ring-4 ring-[#FF8C00] shadow-md transform scale-105';
                  } else if (hasAttempt) {
                    cardStyle =
                      'bg-[#D1FAE5] border-2 border-[#A7F3D0] text-[#065F46] hover:ring-2 hover:ring-[#059669]';
                  }

                  return (
                    <button
                      key={round.id}
                      onClick={() => {
                        sound.playClick();
                        setSelectedRoundId(round.id);
                      }}
                      className={`flex flex-col items-center justify-center p-2.5 rounded-2xl cursor-pointer transition-all duration-150 ${cardStyle}`}
                    >
                      <span className="text-[10px] font-black uppercase tracking-wider">
                        VÒNG
                      </span>
                      <span className="text-xl sm:text-2xl font-black font-sans leading-tight">
                        {round.id.toString().padStart(2, '0')}
                      </span>
                      {hasAttempt && (
                        <span className="text-[9px] font-black mt-0.5 bg-white px-1.5 py-0.2 rounded-full border border-current">
                          {examHistory[round.id].score}đ
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Vibrant Sky Blue Selected Round Callout Banner */}
            <div className="bg-[#E0F2FE] p-5 rounded-2xl border-2 border-[#7DD3FC] shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-auto">
              <div className="flex items-center gap-3">
                <div className="text-3xl shrink-0">🎓</div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="bg-[#0284C7] text-white text-[10px] font-black uppercase px-2 py-0.5 rounded-md">
                      VÒNG {selectedRound.id.toString().padStart(2, '0')}
                    </span>
                    <span className="text-xs font-bold text-[#0369A1]">
                      Tuần {selectedRound.week} • HK{selectedRound.semester}
                    </span>
                  </div>
                  <h4 className="font-black text-sm sm:text-base text-[#0369A1] mt-0.5">
                    {selectedRound.readingTopic}
                  </h4>
                  <p className="text-xs text-[#0284C7] font-medium line-clamp-1">
                    {selectedRound.description}
                  </p>
                </div>
              </div>

              {/* Action buttons inside banner */}
              <div className="flex items-center gap-2.5 w-full sm:w-auto shrink-0 justify-end">
                <button
                  onClick={() => {
                    sound.playClick();
                    setViewMode('cards');
                  }}
                  className="px-4 py-2 bg-white border-2 border-[#CBD5E1] text-[#64748B] rounded-xl text-xs sm:text-sm font-black hover:bg-gray-50 uppercase cursor-pointer"
                >
                  Xem Đề
                </button>
                <button
                  onClick={() => {
                    sound.playFanfare();
                    onSelectRound(selectedRound.id);
                  }}
                  className="px-5 py-2 bg-[#0EA5E9] border-b-4 border-[#0284C7] text-white rounded-xl text-xs sm:text-sm font-black hover:bg-[#0284C7] active:translate-y-0.5 active:border-b-0 uppercase cursor-pointer shadow-sm flex items-center gap-1"
                >
                  <span>{selectedAttempt ? 'Thi Lại' : 'Làm Bài'}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </section>
        </div>
      ) : (
        /* Detailed Cards View */
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredRounds.map((round) => {
              const attempt = examHistory[round.id];
              const isSpecial = round.id % 9 === 0 || round.id === 35;

              return (
                <div
                  key={round.id}
                  className="bg-white rounded-[32px] border-b-8 border-r-8 border-[#E5E7EB] hover:border-[#FED7AA] p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="bg-[#FFEDD5] border-2 border-[#FED7AA] text-[#C2410C] font-black text-xs px-3 py-1 rounded-xl">
                        VÒNG {round.id.toString().padStart(2, '0')}
                      </span>
                      <span className="text-xs font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-lg">
                        Tuần {round.week}
                      </span>
                    </div>

                    <h3 className="font-black text-base text-[#1F2937] mb-1 leading-snug">
                      {round.title.replace(`Vòng ${round.id}: `, '')}
                    </h3>
                    <p className="text-xs font-bold text-[#FF8C00] mb-2 bg-[#FFFBEB] px-2.5 py-1 rounded-lg border border-[#FED7AA]/60">
                      📖 {round.readingTopic}
                    </p>
                    <p className="text-xs text-gray-500 line-clamp-2 mb-4 leading-relaxed">
                      {round.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t-2 border-[#F3F4F6] flex items-center justify-between">
                    {attempt ? (
                      <div className="text-xs">
                        <span className="font-bold text-gray-400">Điểm cao: </span>
                        <strong className="text-[#059669] font-black text-sm">{attempt.score}đ</strong>
                      </div>
                    ) : (
                      <div className="text-xs text-gray-400 font-bold flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#FF8C00]" /> 30:00 • 30 câu
                      </div>
                    )}

                    <button
                      onClick={() => {
                        sound.playFanfare();
                        onSelectRound(round.id);
                      }}
                      className="px-4 py-2 bg-[#FF8C00] hover:bg-[#E27D00] text-white font-black text-xs rounded-xl shadow-[0_3px_0_0_#C2410C] active:translate-y-0.5 active:shadow-none uppercase cursor-pointer flex items-center gap-1"
                    >
                      <span>{attempt ? 'Thi Lại' : 'Bắt Đầu'}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Massive Vibrant Footer CTA Bar */}
      <div className="h-24 bg-white rounded-[32px] border-b-8 border-r-8 border-[#E5E7EB] flex items-center justify-center px-6 sm:px-10 shadow-md">
        <button
          onClick={() => {
            sound.playFanfare();
            onSelectRound(selectedRoundId);
          }}
          className="w-full max-w-md py-4 bg-[#FF4500] hover:bg-[#CC3700] text-white rounded-2xl text-lg sm:text-xl font-black uppercase tracking-wider shadow-[0_6px_0_0_#992900] active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <Play className="w-6 h-6 fill-current" />
          <span>BẮT ĐẦU LÀM BÀI VÒNG {selectedRound.id.toString().padStart(2, '0')}</span>
        </button>
      </div>
    </div>
  );
};
