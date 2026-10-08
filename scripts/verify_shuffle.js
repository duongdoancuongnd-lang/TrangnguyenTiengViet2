// Node.js test script for verifying question option scrambling and answer position distribution
// Satisfies Requirement 14 of Trạng Nguyên Tiếng Việt 2

function generateBalancedPositions(count, numOptions = 4) {
  if (count <= 0) return [];
  const base = Math.floor(count / numOptions);
  const remainder = count % numOptions;

  const counts = Array(numOptions).fill(base);
  const randomIndices = [0, 1, 2, 3].sort(() => Math.random() - 0.5);
  for (let i = 0; i < remainder; i++) {
    counts[randomIndices[i]]++;
  }

  const positions = [];
  for (let opt = 0; opt < numOptions; opt++) {
    for (let c = 0; c < counts[opt]; c++) {
      positions.push(opt);
    }
  }

  for (let i = positions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [positions[i], positions[j]] = [positions[j], positions[i]];
  }

  for (let i = 2; i < positions.length; i++) {
    if (positions[i] === positions[i - 1] && positions[i] === positions[i - 2]) {
      for (let j = i + 1; j < positions.length; j++) {
        if (positions[j] !== positions[i]) {
          [positions[i], positions[j]] = [positions[j], positions[i]];
          break;
        }
      }
    }
  }

  return positions;
}

function shuffleSingleQuestion(question, targetCorrectPos) {
  const numOptions = question.options.length;
  const originalCorrectIndex = question.correctAnswer;
  const correctText = question.options[originalCorrectIndex];
  const distractors = question.options.filter((_, idx) => idx !== originalCorrectIndex);

  for (let i = distractors.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [distractors[i], distractors[j]] = [distractors[j], distractors[i]];
  }

  let finalPos = targetCorrectPos !== undefined ? targetCorrectPos : Math.floor(Math.random() * numOptions);

  const newOptions = [];
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

function runTest(sampleCount) {
  console.log(`\n======================================================`);
  console.log(`CHẠY BỘ KIỂM THỬ: ${sampleCount} CÂU HỎI TRẮC NGHIỆM TRẠNG NGUYÊN`);
  console.log(`======================================================`);

  // Original questions with answer ALWAYS fixed at 0 (A)
  const originalQuestions = Array.from({ length: sampleCount }, (_, i) => ({
    id: i + 1,
    question: `Câu hỏi số ${i + 1}: Chọn từ ngữ chỉ đồ vật học tập?`,
    options: [
      `[Đáp án ĐÚNG câu ${i + 1}: Quyển sách]`,
      `[Nhiễu 1: Chạy nhảy]`,
      `[Nhiễu 2: Xinh xắn]`,
      `[Nhiễu 3: Nhanh nhẹn]`
    ],
    correctAnswer: 0, // Originally ALWAYS 0 (A)!
  }));

  const positions = generateBalancedPositions(sampleCount, 4);
  const shuffled = originalQuestions.map((q, idx) => shuffleSingleQuestion(q, positions[idx]));

  const letters = ['A', 'B', 'C', 'D'];
  const counts = { A: 0, B: 0, C: 0, D: 0 };
  let allAccurate = true;

  console.log(`\nChi tiết kết quả từng câu:`);
  shuffled.forEach((q, idx) => {
    const letter = letters[q.correctAnswer];
    counts[letter]++;
    const chosenText = q.options[q.correctAnswer];
    const isExpected = chosenText.includes(`[Đáp án ĐÚNG câu ${idx + 1}`);
    if (!isExpected) allAccurate = false;

    console.log(
      `Câu ${String(q.id).padStart(2, '0')}: Đáp án đúng -> Vị trí ${letter} | Nội dung: "${chosenText.substring(0, 32)}..." | Chính xác: ${isExpected ? '✓ ĐẠT' : '✗ LỖI'}`
    );
  });

  console.log(`\n------------------------------------------------------`);
  console.log(`THỐNG KÊ PHÂN BỐ VỊ TRÍ ĐÁP ÁN ĐÚNG (${sampleCount} câu):`);
  console.log(`------------------------------------------------------`);
  letters.forEach((l) => {
    const pct = ((counts[l] / sampleCount) * 100).toFixed(1);
    console.log(`Vị trí ${l}: ${counts[l]} câu (${pct}%)`);
  });

  const allPresent = counts.A > 0 && counts.B > 0 && counts.C > 0 && counts.D > 0;
  console.log(`\nKẾT QUẢ NGHIỆM THU:`);
  console.log(`1. Đáp án đúng xuất hiện ở cả 4 vị trí A, B, C, D: ${allPresent ? '✓ ĐẠT' : '✗ KHÔNG ĐẠT'}`);
  console.log(`2. Không còn cố định ở vị trí A: ${counts.A < sampleCount ? '✓ ĐẠT (A chiếm ' + counts.A + '/' + sampleCount + ')' : '✗ LỖI'}`);
  console.log(`3. Phân bố cân bằng đồng đều: ${Math.max(...Object.values(counts)) - Math.min(...Object.values(counts)) <= 2 ? '✓ ĐẠT' : '✗ CẦN CÂN BẰNG HƠN'}`);
  console.log(`4. Bảo toàn chính xác nội dung đáp án: ${allAccurate ? '✓ ĐẠT 100%' : '✗ LỖI NỘI DUNG'}`);

  return { allPresent, allAccurate, counts };
}

// Run for 20 questions
const result20 = runTest(20);

// Run for 30 questions (full exam round)
const result30 = runTest(30);

// Run 3 playthroughs of the same question to verify randomness across attempts (Requirement 7)
console.log(`\n======================================================`);
console.log(`KIỂM TRA TÍNH NGẪU NHIÊN QUA 3 LẦN THI KHÁC NHAU (Câu số 1):`);
console.log(`======================================================`);
const sampleQ = {
  id: 1,
  question: 'Chữ hoa đầu tiên trong bảng chữ cái tiếng Việt là:',
  options: ['Chữ A', 'Chữ B', 'Chữ C', 'Chữ D'],
  correctAnswer: 0
};
for (let attempt = 1; attempt <= 3; attempt++) {
  const shuffledInstance = shuffleSingleQuestion(sampleQ);
  const letter = ['A', 'B', 'C', 'D'][shuffledInstance.correctAnswer];
  console.log(`Lượt thi ${attempt}: Đáp án đúng ("Chữ A") nằm ở vị trí [${letter}] -> Các lựa chọn: ${JSON.stringify(shuffledInstance.options)}`);
}

if (!result20.allPresent || !result20.allAccurate || !result30.allPresent || !result30.allAccurate) {
  process.exit(1);
}
console.log(`\n>>> TẤT CẢ CÁC BÀI KIỂM THỬ ĐÃ THÀNH CÔNG VƯỢT TRỘI! <<<`);
