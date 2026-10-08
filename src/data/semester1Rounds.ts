import { RoundInfo } from '../types';

export const semester1Rounds: RoundInfo[] = [
  {
    id: 1,
    week: 1,
    semester: 1,
    title: 'Vòng 1: Em lớn lên từng ngày - Bài 1 & 2',
    theme: 'Em lớn lên từng ngày',
    readingTopic: 'Tôi là học sinh lớp 2 & Ngày hôm qua đâu rồi?',
    description: 'Chữ hoa A, chính tả ngày hôm qua, từ ngữ chỉ sự vật, hoạt động, câu giới thiệu.',
    questions: [
      // Mức 1 (20 câu: 1 -> 20)
      {
        id: 1,
        level: 1,
        levelText: 'Mức 1: Nhận biết',
        topic: 'Đọc hiểu SGK',
        question: 'Trong bài "Tôi là học sinh lớp 2", khi mẹ mới gọi một câu, bạn nhỏ đã làm gì?',
        options: ['Vùng dậy chuẩn bị thật nhanh', 'Tiếp tục ngủ nướng', 'Khóc nhè không muốn dậy', 'Nhờ mẹ mặc quần áo giúp'],
        correctAnswer: 0,
        explanation: 'Trong bài đọc, tác giả viết: "Sáng sớm, mẹ mới gọi một câu mà tôi đã vùng dậy, khác hẳn mọi ngày."'
      },
      {
        id: 2,
        level: 1,
        levelText: 'Mức 1: Nhận biết',
        topic: 'Đọc hiểu SGK',
        question: 'Bạn nhỏ trong bài "Tôi là học sinh lớp 2" rối rít nói với mẹ điều gì?',
        options: ['"Con muốn ở nhà chơi."', '"Con muốn đến sớm nhất lớp."', '"Con muốn ăn sáng thật ngon."', '"Con không thích đi học."'],
        correctAnswer: 1,
        explanation: 'Bạn nhỏ rối rít: "Con muốn đến sớm nhất lớp."'
      },
      {
        id: 3,
        level: 1,
        levelText: 'Mức 1: Nhận biết',
        topic: 'Từ ngữ chỉ người',
        question: 'Từ nào dưới đây là từ chỉ người?',
        options: ['Học sinh', 'Cặp sách', 'Bảng con', 'Trường học'],
        correctAnswer: 0,
        explanation: '"Học sinh" là từ ngữ chỉ người; "cặp sách", "bảng con" chỉ đồ vật; "trường học" chỉ nơi chốn.'
      },
      {
        id: 4,
        level: 1,
        levelText: 'Mức 1: Nhận biết',
        topic: 'Từ ngữ chỉ đồ vật',
        question: 'Dãy từ nào sau đây gồm toàn các từ chỉ đồ dùng học tập?',
        options: ['Bút mực, thước kẻ, compa', 'Bác sĩ, giáo viên, kĩ sư', 'Chạy bộ, nhảy dây, bơi lội', 'Bàn tay, bàn chân, đôi mắt'],
        correctAnswer: 0,
        explanation: 'Bút mực, thước kẻ, compa đều là các đồ dùng học tập của học sinh.'
      },
      {
        id: 5,
        level: 1,
        levelText: 'Mức 1: Nhận biết',
        topic: 'Chữ hoa',
        question: 'Chữ hoa đầu tiên trong bảng chữ cái tiếng Việt là chữ nào?',
        options: ['A', 'Ă', 'Â', 'B'],
        correctAnswer: 0,
        explanation: 'Chữ cái đầu tiên trong bảng chữ cái tiếng Việt là chữ A.'
      },
      {
        id: 6,
        level: 1,
        levelText: 'Mức 1: Nhận biết',
        topic: 'Chính tả',
        question: 'Điền chữ cái thích hợp vào chỗ trống: "Ánh ...ắng tràn ngập sân trường."',
        options: ['n', 'l', 'd', 'r'],
        correctAnswer: 0,
        explanation: 'Từ đúng là "Ánh nắng".'
      },
      {
        id: 7,
        level: 1,
        levelText: 'Mức 1: Nhận biết',
        topic: 'Đọc hiểu bài thơ',
        question: 'Trong bài thơ "Ngày hôm qua đâu rồi?", bạn nhỏ hỏi ai về ngày hôm qua?',
        options: ['Hỏi bố', 'Hỏi mẹ', 'Hỏi cô giáo', 'Hỏi bạn bè'],
        correctAnswer: 0,
        explanation: 'Khổ 1 bài thơ: "Em cầm tờ lịch cũ: / – Ngày hôm qua đâu rồi? / Ra ngoài sân hỏi bố / Xoa đầu em, bố cười."'
      },
      {
        id: 8,
        level: 1,
        levelText: 'Mức 1: Nhận biết',
        topic: 'Đọc hiểu bài thơ',
        question: 'Theo lời bố trong bài "Ngày hôm qua đâu rồi?", ngày hôm qua ở lại những nơi nào?',
        options: ['Trên cành hoa, trong hạt lúa, trong vở hồng', 'Trên ngọn tre, trên mái nhà, dưới giếng', 'Ở chợ hoa, trên bãi biển, trên rừng', 'Trong cặp sách, trên bảng đen, ngoài cổng'],
        correctAnswer: 0,
        explanation: 'Ngày hôm qua ở lại trên cành hoa trong vườn, trong hạt lúa mẹ trồng và trong vở hồng của con.'
      },
      {
        id: 9,
        level: 1,
        levelText: 'Mức 1: Nhận biết',
        topic: 'Từ ngữ chỉ hoạt động',
        question: 'Từ nào dưới đây là từ chỉ hoạt động?',
        options: ['Chạy nhảy', 'Bàn ghế', 'Xinh xắn', 'Thước kẻ'],
        correctAnswer: 0,
        explanation: '"Chạy nhảy" là từ chỉ hoạt động; "xinh xắn" chỉ đặc điểm; "bàn ghế", "thước kẻ" chỉ đồ vật.'
      },
      {
        id: 10,
        level: 1,
        levelText: 'Mức 1: Nhận biết',
        topic: 'Bảng chữ cái',
        question: 'Tên chữ cái "bê" tương ứng với chữ cái nào?',
        options: ['b', 'd', 'đ', 'c'],
        correctAnswer: 0,
        explanation: 'Trong bảng chữ cái, chữ cái "b" có tên gọi là "bê".'
      },
      {
        id: 11,
        level: 1,
        levelText: 'Mức 1: Nhận biết',
        topic: 'Chính tả',
        question: 'Từ ngữ nào dưới đây viết đúng chính tả?',
        options: ['Vội vã', 'Vội dã', 'Dội vã', 'Rội rã'],
        correctAnswer: 0,
        explanation: '"Vội vã" viết với âm "v" là đúng chính tả.'
      },
      {
        id: 12,
        level: 1,
        levelText: 'Mức 1: Nhận biết',
        topic: 'Mẫu câu',
        question: 'Câu "Em là học sinh lớp 2." thuộc kiểu câu nào?',
        options: ['Câu giới thiệu (Ai là gì?)', 'Câu nêu hoạt động (Ai làm gì?)', 'Câu nêu đặc điểm (Ai thế nào?)', 'Câu khiến'],
        correctAnswer: 0,
        explanation: 'Câu có từ "là" nối giữa chủ thể và danh từ xưng danh là câu giới thiệu (Ai là gì?).'
      },
      {
        id: 13,
        level: 1,
        levelText: 'Mức 1: Nhận biết',
        topic: 'Từ ngữ chỉ thời gian',
        question: 'Từ nào sau đây chỉ thời gian?',
        options: ['Hôm qua', 'Hoa hồng', 'Quyển vở', 'Hát ca'],
        correctAnswer: 0,
        explanation: '"Hôm qua" là từ ngữ chỉ mốc thời gian trong quá khứ.'
      },
      {
        id: 14,
        level: 1,
        levelText: 'Mức 1: Nhận biết',
        topic: 'Chính tả phân biệt c/k',
        question: 'Quy tắc chính tả: Âm "k" đứng trước các nguyên âm nào?',
        options: ['i, e, ê', 'a, o, ô', 'u, ư, ơ', 'ă, â, o'],
        correctAnswer: 0,
        explanation: 'Theo quy tắc chính tả tiếng Việt, âm "k" đi với các nguyên âm "i, e, ê".'
      },
      {
        id: 15,
        level: 1,
        levelText: 'Mức 1: Nhận biết',
        topic: 'Chính tả từ ngữ',
        question: 'Từ nào sau đây viết đúng chính tả?',
        options: ['Kể chuyện', 'Cể chuyện', 'Kể truyện', 'Cể truiện'],
        correctAnswer: 0,
        explanation: '"Kể" (k đứng trước ê) và "chuyện" (ch) là viết đúng.'
      },
      {
        id: 16,
        level: 1,
        levelText: 'Mức 1: Nhận biết',
        topic: 'Dấu câu',
        question: 'Cuối câu kể, câu giới thiệu thường đặt dấu câu gì?',
        options: ['Dấu chấm (.)', 'Dấu chấm hỏi (?)', 'Dấu chấm than (!)', 'Dấu phẩy (,)'],
        correctAnswer: 0,
        explanation: 'Cuối câu kể, giới thiệu kết thúc bằng dấu chấm.'
      },
      {
        id: 17,
        level: 1,
        levelText: 'Mức 1: Nhận biết',
        topic: 'Từ ngữ chỉ người thân',
        question: 'Từ nào sau đây chỉ người thân trong gia đình?',
        options: ['Bố mẹ', 'Bàn ghế', 'Bút chì', 'Sân trường'],
        correctAnswer: 0,
        explanation: '"Bố mẹ" là từ chỉ người thân ruột thịt trong gia đình.'
      },
      {
        id: 18,
        level: 1,
        levelText: 'Mức 1: Nhận biết',
        topic: 'Bảng chữ cái',
        question: 'Chữ cái đứng ngay sau chữ "a" trong bảng chữ cái tiếng Việt là chữ nào?',
        options: ['ă', 'â', 'b', 'c'],
        correctAnswer: 0,
        explanation: 'Thứ tự đầu bảng chữ cái: a, ă, â, b, c...'
      },
      {
        id: 19,
        level: 1,
        levelText: 'Mức 1: Nhận biết',
        topic: 'Từ ngữ chỉ cảnh vật',
        question: 'Từ nào chỉ cảnh vật thường thấy ở trường học?',
        options: ['Sân trường', 'Cánh đồng', 'Bãi biển', 'Đỉnh núi'],
        correctAnswer: 0,
        explanation: '"Sân trường" là cảnh vật thuộc không gian trường học.'
      },
      {
        id: 20,
        level: 1,
        levelText: 'Mức 1: Nhận biết',
        topic: 'Từ ngữ xưng hô',
        question: 'Khi gặp thầy cô giáo, em nên xưng hô như thế nào cho lễ phép?',
        options: ['Em chào thầy/cô ạ', 'Tớ chào cậu', 'Mình chào bạn', 'Chào anh nhé'],
        correctAnswer: 0,
        explanation: 'Học sinh xưng "em" và chào thầy/cô có từ "ạ" ở cuối thể hiện sự lễ phép.'
      },
      // Mức 2 (5 câu: 21 -> 25)
      {
        id: 21,
        level: 2,
        levelText: 'Mức 2: Thông hiểu',
        topic: 'Phân loại từ',
        question: 'Nhóm từ nào dưới đây gồm toàn các từ chỉ hoạt động của học sinh?',
        options: ['Đọc sách, viết bài, nghe giảng', 'Quyển vở, cây bút, cái bảng', 'Chăm chỉ, ngoan ngoãn, thông minh', 'Thầy giáo, cô giáo, bác bảo vệ'],
        correctAnswer: 0,
        explanation: 'Đọc sách, viết bài, nghe giảng đều là hoạt động học tập của học sinh.'
      },
      {
        id: 22,
        level: 2,
        levelText: 'Mức 2: Thông hiểu',
        topic: 'Đọc hiểu sâu',
        question: 'Ý nghĩa của câu thơ "Con học hành chăm chỉ / Là ngày qua vẫn còn" là gì?',
        options: ['Thời gian qua đi nhưng kết quả học tập tốt đẹp vẫn còn mãi', 'Ngày hôm qua sẽ quay trở lại nếu chăm chỉ', 'Chỉ cần học chăm là tờ lịch không bị xé', 'Ngày hôm qua được cất trong ngăn bàn'],
        correctAnswer: 0,
        explanation: 'Bài thơ khuyên các em chăm chỉ học tập để mỗi ngày trôi qua đều có ích và tích lũy được nhiều kiến thức.'
      },
      {
        id: 23,
        level: 2,
        levelText: 'Mức 2: Thông hiểu',
        topic: 'Ghép câu',
        question: 'Ghép từ ngữ ở vế A với vế B để tạo câu giới thiệu đúng: "Trường em / ..."',
        options: ['là Trường Tiểu học Kim Đồng.', 'đang quét dọn sân trường.', 'rất rộng và đẹp đẽ.', 'chạy nhanh thoăn thoắt.'],
        correctAnswer: 0,
        explanation: '"Trường em là Trường Tiểu học Kim Đồng." là câu giới thiệu (Ai là gì?).'
      },
      {
        id: 24,
        level: 2,
        levelText: 'Mức 2: Thông hiểu',
        topic: 'Quy tắc bảng chữ cái',
        question: 'Sắp xếp tên các bạn sau theo đúng thứ tự bảng chữ cái: An, Bình, Cường, Dũng',
        options: ['An, Bình, Cường, Dũng', 'Bình, An, Dũng, Cường', 'Dũng, Cường, Bình, An', 'An, Cường, Bình, Dũng'],
        correctAnswer: 0,
        explanation: 'Chữ cái đầu: A -> B -> C -> D, thứ tự đúng là An, Bình, Cường, Dũng.'
      },
      {
        id: 25,
        level: 2,
        levelText: 'Mức 2: Thông hiểu',
        topic: 'Nghĩa của từ',
        question: 'Từ "loáng một cái" trong bài đọc có nghĩa là gì?',
        options: ['Rất nhanh, chỉ trong chớp mắt', 'Rất chậm chạp, lề mề', 'Sáng bóng loáng', 'Ướt sũng nước'],
        correctAnswer: 0,
        explanation: 'Trong phần chú giải SGK: "Loáng (một cái): rất nhanh."'
      },
      // Mức 3 (5 câu: 26 -> 30)
      {
        id: 26,
        level: 3,
        levelText: 'Mức 3: Vận dụng',
        topic: 'Điền từ ca dao/tục ngữ',
        question: 'Hoàn thành câu tục ngữ sau: "Học thầy không tày học ..."',
        options: ['bạn', 'sách', 'anh', 'chị'],
        correctAnswer: 0,
        explanation: 'Tục ngữ Việt Nam: "Học thầy không tày học bạn" khuyên chúng ta nên học hỏi lẫn nhau.'
      },
      {
        id: 27,
        level: 3,
        levelText: 'Mức 3: Vận dụng',
        topic: 'Giải câu đố Trạng Nguyên',
        question: 'Giải câu đố sau:\n"Cái gì bằng gỗ hình vuông\nGiúp em viết chữ, thầy cô giảng bài?"\nLà cái gì?',
        options: ['Cái bảng lớp', 'Cái cặp sách', 'Cái thước kẻ', 'Cái compa'],
        correctAnswer: 0,
        explanation: 'Cái bảng lớp màu xanh hoặc đen để thầy cô và học sinh viết phấn giảng bài.'
      },
      {
        id: 28,
        level: 3,
        levelText: 'Mức 3: Vận dụng',
        topic: 'Tạo lập câu văn',
        question: 'Đặt một câu giới thiệu bản thân mình với các bạn mới trong ngày khai trường sao cho đúng và hay nhất?',
        options: ['Chào các bạn, mình tên là Minh, học sinh lớp 2A.', 'Cậu kia tên là gì?', 'Ê, cho mượn cái bút nào!', 'Mình chẳng thích nói chuyện với ai.'],
        correctAnswer: 0,
        explanation: 'Câu "Chào các bạn, mình tên là Minh, học sinh lớp 2A." là lời giới thiệu thân thiện, lịch sự và đúng mẫu câu giới thiệu.'
      },
      {
        id: 29,
        level: 3,
        levelText: 'Mức 3: Vận dụng',
        topic: 'Phát hiện lỗi câu',
        question: 'Câu nào dưới đây viết sai quy tắc viết hoa tên người?',
        options: ['bạn nguyễn văn nam là lớp trưởng.', 'Bạn Nguyễn Văn Nam là lớp trưởng.', 'Em rất quý bạn Lê Bảo An.', 'Thầy giáo khen bạn Trần Quốc Toản.'],
        correctAnswer: 0,
        explanation: 'Tên người phải viết hoa tất cả các chữ cái đầu của mỗi tiếng ("Nguyễn Văn Nam" chứ không viết "nguyễn văn nam").'
      },
      {
        id: 30,
        level: 3,
        levelText: 'Mức 3: Vận dụng',
        topic: 'Thành ngữ Trạng Nguyên',
        question: 'Điền từ còn thiếu vào câu thành ngữ sau: "... năng mài sắt, có ngày nên kim."',
        options: ['Có công', 'Có sức', 'Có tài', 'Có tiền'],
        correctAnswer: 0,
        explanation: 'Thành ngữ quen thuộc: "Có công mài sắt, có ngày nên kim" khuyên con người kiên trì, bền bỉ.'
      }
    ]
  },
  {
    id: 2,
    week: 2,
    semester: 1,
    title: 'Vòng 2: Em lớn lên từng ngày - Bài 3 & 4',
    theme: 'Em lớn lên từng ngày',
    readingTopic: 'Niềm vui của Bi và Bống & Làm việc thật là vui',
    description: 'Chữ hoa Ă, Â, bảng chữ cái, câu nêu hoạt động (Ai làm gì?), từ chỉ sự vật và hoạt động.',
    questions: [
      // Mức 1 (20 câu: 1 -> 20)
      {
        id: 1,
        level: 1,
        levelText: 'Mức 1: Nhận biết',
        topic: 'Đọc hiểu SGK',
        question: 'Trong bài "Niềm vui của Bi và Bống", khi thấy cầu vồng, hai anh em đã nói gì?',
        options: ['Bi nói dưới chân cầu vồng có bảy hũ vàng', 'Bi bảo cầu vồng có con gấu lớn', 'Bống bảo cầu vồng sắp rơi xuống đất', 'Hai anh em bỏ chạy vào nhà vì sợ'],
        correctAnswer: 0,
        explanation: 'Bi nói: "Anh nghe nói dưới chân cầu vồng có bảy hũ vàng đấy."'
      },
      {
        id: 2,
        level: 1,
        levelText: 'Mức 1: Nhận biết',
        topic: 'Đọc hiểu SGK',
        question: 'Nếu có bảy hũ vàng, bạn Bống sẽ mua những gì?',
        options: ['Nhiều búp bê và quần áo đẹp', 'Một chiếc máy bay phản lực', 'Bánh kẹo và nước ngọt', 'Một đàn gà con'],
        correctAnswer: 0,
        explanation: 'Bống nói: "Có vàng rồi, em sẽ mua nhiều búp bê và quần áo đẹp."'
      },
      {
        id: 3,
        level: 1,
        levelText: 'Mức 1: Nhận biết',
        topic: 'Đọc hiểu SGK',
        question: 'Trong bài "Làm việc thật là vui", con gà trống gáy vang để làm gì?',
        options: ['Báo cho mọi người biết trời sắp sáng, mau mau thức dậy', 'Kêu gọi đàn con đi kiếm mồi', 'Đuổi các con chim khác', 'Báo hiệu trời sắp mưa to'],
        correctAnswer: 0,
        explanation: 'Trong bài: "Con gà trống gáy vang ò ó o, báo cho mọi người biết trời sắp sáng, mau mau thức dậy."'
      },
      {
        id: 4,
        level: 1,
        levelText: 'Mức 1: Nhận biết',
        topic: 'Đọc hiểu SGK',
        question: 'Con tu hú kêu "tu hú, tu hú" báo hiệu mùa gì sắp đến?',
        options: ['Mùa vải chín', 'Mùa lúa chín', 'Mùa nhãn chín', 'Mùa dưa hấu'],
        correctAnswer: 0,
        explanation: 'SGK viết: "Con tu hú kêu tu hú, tu hú. Thế là sắp đến mùa vải chín."'
      },
      {
        id: 5,
        level: 1,
        levelText: 'Mức 1: Nhận biết',
        topic: 'Từ chỉ sự vật',
        question: 'Từ ngữ nào sau đây là từ chỉ đồ vật trong gia đình?',
        options: ['Cái chổi', 'Bác sĩ', 'Chạy bộ', 'Xanh ngắt'],
        correctAnswer: 0,
        explanation: '"Cái chổi" là đồ vật; "bác sĩ" chỉ người; "chạy bộ" chỉ hoạt động; "xanh ngắt" chỉ đặc điểm.'
      },
      {
        id: 6,
        level: 1,
        levelText: 'Mức 1: Nhận biết',
        topic: 'Chữ hoa',
        question: 'Cặp chữ hoa nào sau đây có hình dáng cấu tạo gần giống chữ hoa A?',
        options: ['Ă, Â', 'B, C', 'D, Đ', 'E, Ê'],
        correctAnswer: 0,
        explanation: 'Chữ hoa Ă và Â được viết từ nét chữ hoa A kèm thêm dấu mũ hoặc dấu á.'
      },
      {
        id: 7,
        level: 1,
        levelText: 'Mức 1: Nhận biết',
        topic: 'Chính tả',
        question: 'Chọn chữ cái phù hợp điền vào chỗ trống: "Ăn quả ...ớ kẻ trồng cây."',
        options: ['nh', 'ng', 'm', 'n'],
        correctAnswer: 0,
        explanation: 'Thành ngữ: "Ăn quả nhớ kẻ trồng cây".'
      },
      {
        id: 8,
        level: 1,
        levelText: 'Mức 1: Nhận biết',
        topic: 'Từ chỉ hoạt động',
        question: 'Trong câu "Bé quét nhà, nhặt rau giúp mẹ.", có những từ chỉ hoạt động nào?',
        options: ['quét nhà, nhặt rau, giúp', 'bé, mẹ', 'nhà, rau', 'bé, quét nhà'],
        correctAnswer: 0,
        explanation: '"Quét nhà", "nhặt rau", "giúp" đều là các từ chỉ hành động việc làm.'
      },
      {
        id: 9,
        level: 1,
        levelText: 'Mức 1: Nhận biết',
        topic: 'Mẫu câu',
        question: 'Câu "Chim bắt sâu bảo vệ mùa màng." thuộc mẫu câu nào?',
        options: ['Ai làm gì?', 'Ai là gì?', 'Ai thế nào?', 'Câu hỏi'],
        correctAnswer: 0,
        explanation: '"Bắt sâu" là hoạt động của chim nên câu này thuộc kiểu câu Ai làm gì?'
      },
      {
        id: 10,
        level: 1,
        levelText: 'Mức 1: Nhận biết',
        topic: 'Bảng chữ cái',
        question: 'Tên chữ cái "xê" là tên của chữ cái nào?',
        options: ['c', 's', 'x', 'k'],
        correctAnswer: 0,
        explanation: 'Trong bảng chữ cái, chữ cái "c" đọc tên là "xê".'
      },
      {
        id: 11,
        level: 1,
        levelText: 'Mức 1: Nhận biết',
        topic: 'Chính tả phân biệt g/gh',
        question: 'Quy tắc chính tả: Âm "gh" chỉ ghép với các chữ cái nào?',
        options: ['e, ê, i', 'a, o, ô', 'u, ư, ơ', 'ă, â, y'],
        correctAnswer: 0,
        explanation: 'Theo luật chính tả: "gh" và "ngh" chỉ ghép trước e, ê, i.'
      },
      {
        id: 12,
        level: 1,
        levelText: 'Mức 1: Nhận biết',
        topic: 'Chính tả',
        question: 'Từ ngữ nào viết đúng chính tả?',
        options: ['Ghi nhớ', 'Gi nhớ', 'Ghy nhớ', 'Ghy nhở'],
        correctAnswer: 0,
        explanation: '"Ghi" đi với âm "i" phải viết là "gh".'
      },
      {
        id: 13,
        level: 1,
        levelText: 'Mức 1: Nhận biết',
        topic: 'Từ chỉ sự vật',
        question: 'Trong bài "Làm việc thật là vui", cái đồng hồ làm công việc gì?',
        options: ['Tích tắc báo phút, báo giờ', 'Gáy ò ó o', 'Kêu tu hú', 'Rúc cú cú'],
        correctAnswer: 0,
        explanation: 'Cái đồng hồ tích tắc, tích tắc báo phút, báo giờ.'
      },
      {
        id: 14,
        level: 1,
        levelText: 'Mức 1: Nhận biết',
        topic: 'Đọc hiểu',
        question: 'Khi cầu vồng biến mất, Bi và Bống đã làm gì để mang lại niềm vui cho nhau?',
        options: ['Bống vẽ ngựa hồng và ô tô tặng anh, Bi vẽ búp bê và quần áo tặng em', 'Hai anh em ngồi khóc vì mất vàng', 'Hai anh em đi tìm người lớn', 'Hai anh em rủ nhau đi ngủ'],
        correctAnswer: 0,
        explanation: 'Không có vàng dưới chân cầu vồng, hai anh em liền dùng bút màu vẽ tranh tặng nhau.'
      },
      {
        id: 15,
        level: 1,
        levelText: 'Mức 1: Nhận biết',
        topic: 'Từ ngữ chỉ người',
        question: 'Từ nào sau đây chỉ thành viên trong gia đình?',
        options: ['Anh trai, em gái', 'Cô giáo, thầy giáo', 'Bác sĩ, y tá', 'Học sinh, sinh viên'],
        correctAnswer: 0,
        explanation: '"Anh trai, em gái" là người thân trong gia đình.'
      },
      {
        id: 16,
        level: 1,
        levelText: 'Mức 1: Nhận biết',
        topic: 'Dấu câu',
        question: 'Dấu phẩy (,) trong câu thường dùng để làm gì?',
        options: ['Ngăn cách các bộ phận cùng chức vụ trong câu', 'Kết thúc câu hỏi', 'Bày tỏ cảm xúc than thở', 'Báo hiệu lời nói trực tiếp'],
        correctAnswer: 0,
        explanation: 'Dấu phẩy dùng để ngắt các từ ngữ chỉ sự vật, hoạt động, đặc điểm liệt kê trong câu.'
      },
      {
        id: 17,
        level: 1,
        levelText: 'Mức 1: Nhận biết',
        topic: 'Chữ cái tiếng Việt',
        question: 'Bảng chữ cái tiếng Việt hiện hành có bao nhiêu chữ cái?',
        options: ['29 chữ cái', '26 chữ cái', '24 chữ cái', '32 chữ cái'],
        correctAnswer: 0,
        explanation: 'Bảng chữ cái tiếng Việt gồm có 29 chữ cái.'
      },
      {
        id: 18,
        level: 1,
        levelText: 'Mức 1: Nhận biết',
        topic: 'Từ ngữ chỉ loài vật',
        question: 'Con vật nào có ích cho đồng ruộng bằng cách bắt chuột ban đêm?',
        options: ['Chim cú mèo', 'Con bướm', 'Con muỗi', 'Con ruồi'],
        correctAnswer: 0,
        explanation: 'Trong bài "Làm việc thật là vui": "Chim cú mèo chập tối đứng trong hốc cây rúc cú cú cũng làm việc có ích cho đồng ruộng."'
      },
      {
        id: 19,
        level: 1,
        levelText: 'Mức 1: Nhận biết',
        topic: 'Chính tả s/x',
        question: 'Chọn từ đúng chính tả:',
        options: ['Sắc xuân', 'Xắc xuân', 'Sắc xuông', 'Xắc xuông'],
        correctAnswer: 0,
        explanation: '"Sắc xuân" là từ đúng chỉ vẻ đẹp của mùa xuân.'
      },
      {
        id: 20,
        level: 1,
        levelText: 'Mức 1: Nhận biết',
        topic: 'Từ đồng nghĩa',
        question: 'Từ "chăm chỉ" gần nghĩa nhất với từ nào?',
        options: ['Cần cù', 'Lười biếng', 'Nhanh nhẹn', 'Thật thà'],
        correctAnswer: 0,
        explanation: '"Cần cù" đồng nghĩa với "chăm chỉ".'
      },
      // Mức 2 (5 câu: 21 -> 25)
      {
        id: 21,
        level: 2,
        levelText: 'Mức 2: Thông hiểu',
        topic: 'Phân loại từ',
        question: 'Trong các từ sau: "búp bê, ô tô, hũ vàng, vẽ tranh, đi học, quét nhà", có bao nhiêu từ chỉ sự vật và bao nhiêu từ chỉ hoạt động?',
        options: ['3 từ chỉ sự vật, 3 từ chỉ hoạt động', '4 từ chỉ sự vật, 2 từ chỉ hoạt động', '2 từ chỉ sự vật, 4 từ chỉ hoạt động', '5 từ chỉ sự vật, 1 từ chỉ hoạt động'],
        correctAnswer: 0,
        explanation: 'Sự vật: búp bê, ô tô, hũ vàng (3 từ). Hoạt động: vẽ tranh, đi học, quét nhà (3 từ).'
      },
      {
        id: 22,
        level: 2,
        levelText: 'Mức 2: Thông hiểu',
        topic: 'Ý nghĩa bài học',
        question: 'Bài đọc "Làm việc thật là vui" muốn nhắn nhủ điều gì đến các em?',
        options: ['Mọi người, mọi vật đều làm việc và làm việc mang lại niềm vui, cuộc sống có ích', 'Chỉ có người lớn mới cần làm việc', 'Làm việc rất mệt mỏi nên không nên làm', 'Trẻ em chỉ cần chơi chứ không cần làm việc'],
        correctAnswer: 0,
        explanation: 'Bài đọc cho thấy xung quanh ta muôn loài đều hăng say làm việc, bé cũng làm việc và luôn luôn bận rộn mà lúc nào cũng vui.'
      },
      {
        id: 23,
        level: 2,
        levelText: 'Mức 2: Thông hiểu',
        topic: 'Nối câu hoàn chỉnh',
        question: 'Nối đúng hoạt động với sự vật tương ứng:\n1. Cành đào\n2. Gà trống\n3. Bé\na. gáy vang báo trời sáng\nb. nở hoa cho sắc xuân thêm rực rỡ\nc. quét nhà, nhặt rau',
        options: ['1 - b, 2 - a, 3 - c', '1 - a, 2 - b, 3 - c', '1 - c, 2 - a, 3 - b', '1 - b, 2 - c, 3 - a'],
        correctAnswer: 0,
        explanation: 'Cành đào nở hoa, gà trống gáy vang, bé quét nhà nhặt rau.'
      },
      {
        id: 24,
        level: 2,
        levelText: 'Mức 2: Thông hiểu',
        topic: 'Sắp xếp thứ tự chữ cái',
        question: 'Dãy chữ cái nào dưới đây được sắp xếp đúng theo thứ tự trong bảng chữ cái tiếng Việt?',
        options: ['b, c, d, đ, e, ê', 'b, d, c, đ, e, ê', 'b, c, đ, d, ê, e', 'c, b, d, đ, e, ê'],
        correctAnswer: 0,
        explanation: 'Thứ tự chuẩn: b -> c -> d -> đ -> e -> ê.'
      },
      {
        id: 25,
        level: 2,
        levelText: 'Mức 2: Thông hiểu',
        topic: 'Tìm câu nêu hoạt động',
        question: 'Câu nào dưới đây là câu nêu hoạt động của em ở nhà?',
        options: ['Em giúp mẹ tưới cây ngoài vườn.', 'Em là một học sinh chăm chỉ.', 'Căn phòng của em rất ngăn nắp.', 'Quyển truyện này rất hay.'],
        correctAnswer: 0,
        explanation: '"Em giúp mẹ tưới cây ngoài vườn" có hoạt động "tưới cây" là câu nêu hoạt động.'
      },
      // Mức 3 (5 câu: 26 -> 30)
      {
        id: 26,
        level: 3,
        levelText: 'Mức 3: Vận dụng',
        topic: 'Giải đố Trạng Nguyên',
        question: 'Giải câu đố sau:\n"Ngày ngày tích tắc không ngừng\nBáo giờ đi học, nhắc chừng ngủ ngơi\nLà cái gì?"',
        options: ['Cái đồng hồ', 'Cái cặp sách', 'Cái quạt trần', 'Cái gương'],
        correctAnswer: 0,
        explanation: 'Cái đồng hồ chạy tích tắc báo phút báo giờ nhắc em học tập và nghỉ ngơi đúng giờ.'
      },
      {
        id: 27,
        level: 3,
        levelText: 'Mức 3: Vận dụng',
        topic: 'Điền từ tục ngữ',
        question: 'Điền từ còn thiếu vào câu tục ngữ: "Uống nước nhớ ..."',
        options: ['nguồn', 'sông', 'suối', 'giếng'],
        correctAnswer: 0,
        explanation: 'Tục ngữ Việt Nam: "Uống nước nhớ nguồn" nhắc nhở lòng biết ơn đối với cội nguồn.'
      },
      {
        id: 28,
        level: 3,
        levelText: 'Mức 3: Vận dụng',
        topic: 'Tạo lập đoạn văn',
        question: 'Khi muốn kể một việc em làm ở nhà để giúp đỡ bố mẹ, trình tự các ý nào sau đây là hợp lý nhất?',
        options: ['Nêu tên việc em làm -> Kể các bước em thực hiện -> Nêu cảm nghĩ của em sau khi hoàn thành', 'Kể cảm nghĩ trước -> Đi ngủ -> Không làm gì cả', 'Bảo người khác làm thay -> Kể công -> Đòi phần thưởng', 'Nói về bài tập ở lớp -> Đi chơi bóng đá'],
        correctAnswer: 0,
        explanation: 'Trình tự kể việc: Tên việc làm -> Cách thực hiện -> Cảm xúc/kết quả sau khi làm xong việc.'
      },
      {
        id: 29,
        level: 3,
        levelText: 'Mức 3: Vận dụng',
        topic: 'Tình huống ứng xử',
        question: 'Em thấy em nhỏ nghịch làm rơi đồ chơi xuống đất. Em nên làm gì?',
        options: ['Nhẹ nhàng nhặt lên giúp em và dặn em chơi cẩn thận hơn', 'Mắng mỏ và đánh em nhỏ', 'Mặc kệ em tự khóc', 'Giấu đồ chơi đi không cho em chơi nữa'],
        correctAnswer: 0,
        explanation: 'Cử chỉ yêu thương, giúp đỡ và bảo ban nhẹ nhàng thể hiện tình cảm anh chị em tốt đẹp như Bi và Bống.'
      },
      {
        id: 30,
        level: 3,
        levelText: 'Mức 3: Vận dụng',
        topic: 'Chữ hoa ứng dụng',
        question: 'Câu tục ngữ "Ăn quả nhớ kẻ trồng cây" nhắc nhở bài học đạo đức truyền thống nào của dân tộc ta?',
        options: ['Lòng biết ơn', 'Tính tiết kiệm', 'Lòng dũng cảm', 'Tính tự lập'],
        correctAnswer: 0,
        explanation: '"Ăn quả nhớ kẻ trồng cây" là bài học về lòng biết ơn sâu sắc những người đã tạo ra thành quả cho ta hưởng.'
      }
    ]
  }
];
