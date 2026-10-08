import { Question, RoundInfo } from '../types';
import { ROUNDS_METADATA } from './roundQuestionsBank';

// Specific high-fidelity question sets tailored for each round of Trạng Nguyên Tiếng Việt 2 (Kết Nối Tri Thức)
import { generateRoundQuestions } from './roundGenerator';

export const allRounds: RoundInfo[] = ROUNDS_METADATA.map((meta) => {
  return {
    id: meta.id,
    week: meta.week,
    semester: meta.semester,
    title: meta.title,
    theme: meta.theme,
    readingTopic: meta.readingTopic,
    description: meta.description,
    questions: generateRoundQuestions(meta.id)
  };
});

export function getRoundById(id: number): RoundInfo | undefined {
  return allRounds.find((r) => r.id === id);
}
