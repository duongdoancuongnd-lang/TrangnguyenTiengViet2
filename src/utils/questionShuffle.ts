import { Question, RoundInfo } from '../types';

/**
 * Interface representing a raw question input (e.g. from AI generation, JSON files, or CMS).
 */
export interface RawQuestionInput {
  id?: number;
  level?: 1 | 2 | 3;
  levelText?: string;
  topic?: string;
  question: string;
  passage?: string;
  options: string[];
  correctAnswer: number | string; // Can be index (0..3) or letter ('A' | 'B' | 'C' | 'D') or text
  explanation?: string;
}

/**
 * Generates an array of target positions [0, 1, 2, 3] for a set of questions,
 * ensuring balanced distribution across A, B, C, D and avoiding long streaks.
 */
export function generateBalancedPositions(count: number, numOptions: number = 4): number[] {
  if (count <= 0) return [];
  const base = Math.floor(count / numOptions);
  const remainder = count % numOptions;

  // Distribute the remainder randomly among option indices 0..numOptions-1
  const counts = Array(numOptions).fill(base);
  const randomIndices = Array.from({ length: numOptions }, (_, i) => i).sort(() => Math.random() - 0.5);
  for (let i = 0; i < remainder; i++) {
    counts[randomIndices[i]]++;
  }

  // Create pool of positions
  const positions: number[] = [];
  for (let opt = 0; opt < numOptions; opt++) {
    for (let c = 0; c < counts[opt]; c++) {
      positions.push(opt);
    }
  }

  // Fisher-Yates shuffle
  for (let i = positions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = positions[i];
    positions[i] = positions[j];
    positions[j] = temp;
  }

  // Break streaks greater than 2 identical consecutive answers
  for (let i = 2; i < positions.length; i++) {
    if (positions[i] === positions[i - 1] && positions[i] === positions[i - 2]) {
      for (let j = i + 1; j < positions.length; j++) {
        if (positions[j] !== positions[i]) {
          const temp = positions[i];
          positions[i] = positions[j];
          positions[j] = temp;
          break;
        }
      }
    }
  }

  return positions;
}

/**
 * Shuffles the options of a single question while keeping the correct answer accurate.
 * If targetCorrectPos is provided, the correct answer will be placed at that exact index (0=A, 1=B, 2=C, 3=D).
 */
export function shuffleSingleQuestion(question: Question, targetCorrectPos?: number): Question {
  if (!question.options || question.options.length < 2) {
    return { ...question };
  }

  const numOptions = question.options.length;
  const originalCorrectIndex =
    question.correctAnswer >= 0 && question.correctAnswer < numOptions
      ? question.correctAnswer
      : 0;

  const correctText = question.options[originalCorrectIndex];
  const distractors = question.options
    .filter((_, idx) => idx !== originalCorrectIndex)
    .slice();

  // Fisher-Yates shuffle the distractors
  for (let i = distractors.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = distractors[i];
    distractors[i] = distractors[j];
    distractors[j] = temp;
  }

  // Determine final position of the correct answer
  let finalPos = targetCorrectPos;
  if (finalPos === undefined || finalPos < 0 || finalPos >= numOptions) {
    finalPos = Math.floor(Math.random() * numOptions);
  }

  // Construct new options array with correct answer at finalPos
  const newOptions: string[] = [];
  let distractorIdx = 0;
  for (let i = 0; i < numOptions; i++) {
    if (i === finalPos) {
      newOptions.push(correctText);
    } else {
      newOptions.push(distractors[distractorIdx++]);
    }
  }

  return {
    ...question,
    options: newOptions,
    correctAnswer: finalPos,
  };
}

/**
 * Shuffles an array of questions, ensuring balanced distribution across A, B, C, D.
 */
export function shuffleQuestionsList(questions: Question[]): Question[] {
  const positions = generateBalancedPositions(questions.length, 4);
  return questions.map((q, idx) => shuffleSingleQuestion(q, positions[idx]));
}

/**
 * Shuffles all questions in a RoundInfo object, returning a fresh round instance for an exam session.
 */
export function shuffleRoundQuestions(round: RoundInfo): RoundInfo {
  return {
    ...round,
    questions: shuffleQuestionsList(round.questions),
  };
}

/**
 * Handles raw or AI-generated questions where correctAnswer can be index (0..3),
 * letter ('A','B','C','D'), or matching text, and normalizes and shuffles them.
 */
export function processAndShuffleRawQuestion(
  raw: RawQuestionInput,
  targetCorrectPos?: number
): Question {
  let initialCorrectIndex = 0;

  if (typeof raw.correctAnswer === 'number') {
    initialCorrectIndex = raw.correctAnswer >= 0 && raw.correctAnswer < raw.options.length
      ? raw.correctAnswer
      : 0;
  } else if (typeof raw.correctAnswer === 'string') {
    const rawStr = raw.correctAnswer;
    const trimmed = rawStr.trim().toUpperCase();
    if (trimmed === 'A') initialCorrectIndex = 0;
    else if (trimmed === 'B') initialCorrectIndex = 1;
    else if (trimmed === 'C') initialCorrectIndex = 2;
    else if (trimmed === 'D') initialCorrectIndex = 3;
    else {
      // Find by text match
      const matchedIdx = raw.options.findIndex((opt) => opt.trim() === rawStr.trim());
      initialCorrectIndex = matchedIdx !== -1 ? matchedIdx : 0;
    }
  }

  const baseQuestion: Question = {
    id: raw.id || 1,
    level: raw.level || 1,
    levelText: raw.levelText || (raw.level === 3 ? 'Mức 3: Vận dụng' : raw.level === 2 ? 'Mức 2: Thông hiểu' : 'Mức 1: Nhận biết'),
    topic: raw.topic || 'Tiếng Việt',
    question: raw.question,
    passage: raw.passage,
    options: [...raw.options],
    correctAnswer: initialCorrectIndex,
    explanation: raw.explanation || 'Đáp án chính xác dựa theo kiến thức SGK Tiếng Việt 2.',
  };

  return shuffleSingleQuestion(baseQuestion, targetCorrectPos);
}

/**
 * Diagnostic test report interface for Requirement 14.
 */
export interface ShuffleTestResult {
  totalQuestions: number;
  distribution: {
    A: { count: number; percentage: number };
    B: { count: number; percentage: number };
    C: { count: number; percentage: number };
    D: { count: number; percentage: number };
  };
  sampleQuestions: {
    id: number;
    question: string;
    options: string[];
    correctLetter: 'A' | 'B' | 'C' | 'D';
    correctAnswerText: string;
    verifiedAccurate: boolean;
  }[];
  allPositionsPresent: boolean;
  isBalanced: boolean;
  timestamp: number;
}

/**
 * Runs an automated diagnostic verification on a set of questions (default 24 questions).
 * Verifies that correct answers appear in A, B, C, D with balanced distribution,
 * and that options were genuinely scrambled while preserving correct answer integrity.
 */
export function runShuffleVerification(sampleQuestionsCount: number = 24): ShuffleTestResult {
  // Create 24 sample questions where originally all correct answers are at index 0 (Option A)
  const baseQuestions: Question[] = Array.from({ length: sampleQuestionsCount }, (_, i) => ({
    id: i + 1,
    level: ((i % 3) + 1) as 1 | 2 | 3,
    levelText: `Mức ${(i % 3) + 1}`,
    topic: 'Kiểm tra xáo trộn',
    question: `Câu hỏi thử nghiệm ${i + 1}: Chọn đáp án đúng cho câu này?`,
    options: [
      `[Đáp án ĐÚNG câu ${i + 1}]`,
      `[Phương án gây nhiễu 1 - câu ${i + 1}]`,
      `[Phương án gây nhiễu 2 - câu ${i + 1}]`,
      `[Phương án gây nhiễu 3 - câu ${i + 1}]`,
    ],
    correctAnswer: 0, // Originally fixed at A!
    explanation: `Giải thích cho câu ${i + 1}`,
  }));

  // Shuffle the questions using our balanced algorithm
  const shuffled = shuffleQuestionsList(baseQuestions);

  const counts = { A: 0, B: 0, C: 0, D: 0 };
  const letters: ('A' | 'B' | 'C' | 'D')[] = ['A', 'B', 'C', 'D'];

  const samples = shuffled.map((q, idx) => {
    const letter = letters[q.correctAnswer] || 'A';
    counts[letter]++;

    const originalExpectedAnswer = `[Đáp án ĐÚNG câu ${idx + 1}]`;
    const actualAnswerText = q.options[q.correctAnswer];
    const verifiedAccurate = actualAnswerText === originalExpectedAnswer;

    return {
      id: q.id,
      question: q.question,
      options: q.options,
      correctLetter: letter,
      correctAnswerText: actualAnswerText,
      verifiedAccurate,
    };
  });

  const total = shuffled.length;
  const dist = {
    A: { count: counts.A, percentage: Math.round((counts.A / total) * 100) },
    B: { count: counts.B, percentage: Math.round((counts.B / total) * 100) },
    C: { count: counts.C, percentage: Math.round((counts.C / total) * 100) },
    D: { count: counts.D, percentage: Math.round((counts.D / total) * 100) },
  };

  const allPositionsPresent = counts.A > 0 && counts.B > 0 && counts.C > 0 && counts.D > 0;
  // Balanced means each option is between 15% and 35% of the total in a 24-question test
  const isBalanced =
    counts.A >= 4 && counts.B >= 4 && counts.C >= 4 && counts.D >= 4;

  return {
    totalQuestions: total,
    distribution: dist,
    sampleQuestions: samples,
    allPositionsPresent,
    isBalanced,
    timestamp: Date.now(),
  };
}
