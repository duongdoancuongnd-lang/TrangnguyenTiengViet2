import React, { useState } from 'react';
import { X, User, School, BookOpen, Check } from 'lucide-react';
import { StudentInfo } from '../types';
import { sound } from '../utils/soundEffects';

interface StudentFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentInfo: StudentInfo;
  onSave: (info: StudentInfo) => void;
}

export const StudentFormModal: React.FC<StudentFormModalProps> = ({
  isOpen,
  onClose,
  studentInfo,
  onSave,
}) => {
  const [name, setName] = useState(studentInfo.studentName);
  const [className, setClassName] = useState(studentInfo.className);
  const [school, setSchool] = useState(studentInfo.schoolName);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playSelect();
    onSave({
      studentName: name.trim() || 'Nguyễn Minh Anh',
      className: className.trim() || '2A4',
      schoolName: school.trim() || 'Trường Tiểu Học Ánh Dương',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-[36px] border-b-8 border-r-8 border-[#E5E7EB] shadow-2xl max-w-md w-full overflow-hidden">
        {/* Vibrant Gradient Header */}
        <div className="bg-gradient-to-r from-[#FF8C00] to-[#FFA500] px-6 py-4 text-white flex items-center justify-between border-b-4 border-[#E27D00]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white text-[#FF8C00] rounded-2xl flex items-center justify-center font-black shadow-inner">
              👤
            </div>
            <div>
              <h2 className="text-lg font-black uppercase tracking-tight">Thông Tin Học Sinh</h2>
              <p className="text-xs text-[#FFF0D1] font-semibold">Ghi danh thi Trạng Nguyên Tiếng Việt 2</p>
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

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#9CA3AF] uppercase mb-1 ml-1">
              Họ và Tên Học Sinh
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nhập tên của em..."
              className="w-full px-4 py-3 bg-[#F9FAFB] border-2 border-[#E5E7EB] rounded-xl font-bold focus:outline-none focus:border-[#FFA500] text-sm text-[#1F2937]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#9CA3AF] uppercase mb-1 ml-1">
                Lớp
              </label>
              <input
                type="text"
                required
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                placeholder="Ví dụ: 2A4"
                className="w-full px-4 py-3 bg-[#F9FAFB] border-2 border-[#E5E7EB] rounded-xl font-bold focus:outline-none focus:border-[#FFA500] text-sm text-[#1F2937]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#9CA3AF] uppercase mb-1 ml-1">
                Tên Trường Học
              </label>
              <input
                type="text"
                required
                value={school}
                onChange={(e) => setSchool(e.target.value)}
                placeholder="Nhập tên trường..."
                className="w-full px-4 py-3 bg-[#F9FAFB] border-2 border-[#E5E7EB] rounded-xl font-bold focus:outline-none focus:border-[#FFA500] text-sm text-[#1F2937]"
              />
            </div>
          </div>

          {/* Quick presets */}
          <div className="pt-2 border-t-2 border-[#F3F4F6]">
            <p className="text-xs font-bold text-gray-400 mb-2 uppercase">Chọn nhanh lớp mẫu:</p>
            <div className="flex flex-wrap gap-1.5">
              {['2A1', '2A2', '2A3', '2A4', '2A5', '2B', '2C'].map((cls) => (
                <button
                  type="button"
                  key={cls}
                  onClick={() => {
                    setClassName(cls);
                    sound.playClick();
                  }}
                  className={`text-xs px-3 py-1 rounded-lg border font-black transition cursor-pointer ${
                    className === cls
                      ? 'bg-[#FFEDD5] text-[#C2410C] border-[#FED7AA]'
                      : 'bg-[#F9FAFB] text-gray-600 border-[#E5E7EB] hover:bg-gray-100'
                  }`}
                >
                  {cls}
                </button>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t-2 border-[#F3F4F6]">
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="px-5 py-2.5 bg-white border-2 border-[#CBD5E1] text-[#64748B] font-black text-xs uppercase rounded-xl hover:bg-gray-50 cursor-pointer"
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#FF4500] hover:bg-[#CC3700] text-white font-black text-xs uppercase rounded-xl shadow-[0_3px_0_0_#992900] active:translate-y-0.5 active:shadow-none transition flex items-center gap-1.5 cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>Lưu Thông Tin</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
