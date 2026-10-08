export type QuestionLevel = 1 | 2 | 3;

export interface Question {
  id: number;
  level: QuestionLevel; // 1: Nhận biết (20 câu), 2: Thông hiểu (5 câu), 3: Vận dụng (5 câu)
  levelText: string;
  topic: string; // e.g. "Từ chỉ sự vật", "Chính tả c/k", "Dấu câu", "Đọc hiểu"
  question: string;
  passage?: string; // Optional reading passage or poem excerpt
  options: string[];
  correctAnswer: number; // 0, 1, 2, 3
  explanation: string;
}

export interface RoundInfo {
  id: number;
  title: string;
  week: number;
  semester: 1 | 2;
  theme: string;
  description: string;
  readingTopic: string;
  questions: Question[];
}

export interface StudentInfo {
  studentName: string;
  className: string;
  schoolName: string;
}

export interface ExamAttempt {
  roundId: number;
  timestamp: number;
  timeSpentSeconds: number;
  score: number; // Max 300
  totalQuestions: number;
  correctCount: number;
  wrongCount: number;
  skippedCount: number;
  level1Correct: number;
  level2Correct: number;
  level3Correct: number;
  userAnswers: Record<number, number>; // questionId -> selectedOption
  rankTitle: string;
}
