import { Question, RoundInfo } from '../types';

// Curated comprehensive bank of questions for all 35 rounds of Trạng Nguyên Tiếng Việt Lớp 2
// Based directly on GDPT 2018 - "Kết Nối Tri Thức Với Cuộc Sống" (Tập 1 & Tập 2)

export interface RoundMetadata {
  id: number;
  week: number;
  semester: 1 | 2;
  title: string;
  theme: string;
  readingTopic: string;
  description: string;
}

export const ROUNDS_METADATA: RoundMetadata[] = [
  {
    id: 1,
    week: 1,
    semester: 1,
    title: 'Vòng 1: Tôi là học sinh lớp 2 - Ngày hôm qua đâu rồi?',
    theme: 'Em lớn lên từng ngày',
    readingTopic: 'Tôi là học sinh lớp 2 & Ngày hôm qua đâu rồi?',
    description: 'Chữ hoa A, từ chỉ người/vật, câu giới thiệu (Ai là gì?), chính tả bảng chữ cái.'
  },
  {
    id: 2,
    week: 2,
    semester: 1,
    title: 'Vòng 2: Niềm vui của Bi và Bống - Làm việc thật là vui',
    theme: 'Em lớn lên từng ngày',
    readingTopic: 'Niềm vui của Bi và Bống & Làm việc thật là vui',
    description: 'Chữ hoa Ă/Â, từ chỉ sự vật/hoạt động, câu nêu hoạt động (Ai làm gì?).'
  },
  {
    id: 3,
    week: 3,
    semester: 1,
    title: 'Vòng 3: Em có xinh không? - Một giờ học',
    theme: 'Em lớn lên từng ngày',
    readingTopic: 'Em có xinh không? & Một giờ học',
    description: 'Chữ hoa B, từ chỉ đặc điểm, câu nêu đặc điểm (Ai thế nào?).'
  },
  {
    id: 4,
    week: 4,
    semester: 1,
    title: 'Vòng 4: Cây xấu hổ - Chú đỗ con',
    theme: 'Em lớn lên từng ngày',
    readingTopic: 'Cây xấu hổ & Chú đỗ con',
    description: 'Chữ hoa C, từ chỉ đặc điểm/hoạt động, cách kể chuyện tự nhiên.'
  },
  {
    id: 5,
    week: 5,
    semester: 1,
    title: 'Vòng 5: Cầu thủ dự bị - Cô giáo lớp em',
    theme: 'Đi học vui sao',
    readingTopic: 'Cầu thủ dự bị & Cô giáo lớp em',
    description: 'Chữ hoa D/Đ, thời khoá biểu, phân biệt c/k, ch/tr, v/d, câu nêu hoạt động.'
  },
  {
    id: 6,
    week: 6,
    semester: 1,
    title: 'Vòng 6: Cái trống trường em - Danh sách học sinh',
    theme: 'Đi học vui sao',
    readingTopic: 'Cái trống trường em & Danh sách học sinh',
    description: 'Chữ hoa E/Ê, phân biệt g/gh, s/x, dấu hỏi/ngã, câu nêu đặc điểm.'
  },
  {
    id: 7,
    week: 7,
    semester: 1,
    title: 'Vòng 7: Yêu lắm trường ơi! - Em học vẽ',
    theme: 'Đi học vui sao',
    readingTopic: 'Yêu lắm trường ơi! & Em học vẽ',
    description: 'Chữ hoa G, phân biệt ng/ngh, r/d/gi, an/ang, dấu chấm & dấu chấm hỏi.'
  },
  {
    id: 8,
    week: 8,
    semester: 1,
    title: 'Vòng 8: Cuốn sách của em - Khi trang sách mở ra',
    theme: 'Đi học vui sao',
    readingTopic: 'Cuốn sách của em & Khi trang sách mở ra',
    description: 'Chữ hoa H, phân biệt l/n, ăn/ăng, ân/âng, quy tắc viết hoa tên người.'
  },
  {
    id: 9,
    week: 9,
    semester: 1,
    title: 'Vòng 9: Ôn tập và Đánh giá giữa học kì 1',
    theme: 'Đi học vui sao & Em lớn lên từng ngày',
    readingTopic: 'Ôn tập tổng hợp giữa học kì 1 (Bài 1 - Bài 16)',
    description: 'Đề thi Trạng Nguyên tổng hợp Giữa Học Kì 1: Các mẫu câu, từ loại, chính tả, đọc hiểu.'
  },
  {
    id: 10,
    week: 10,
    semester: 1,
    title: 'Vòng 10: Gọi bạn - Tớ nhớ cậu',
    theme: 'Niềm vui tuổi thơ',
    readingTopic: 'Gọi bạn & Tớ nhớ cậu',
    description: 'Chữ hoa I/K, phân biệt c/k, iêu/ươu, en/eng, từ chỉ tình cảm bạn bè, dấu chấm than.'
  },
  {
    id: 11,
    week: 11,
    semester: 1,
    title: 'Vòng 11: Chữ A và những người bạn - Nhím nâu kết bạn',
    theme: 'Niềm vui tuổi thơ',
    readingTopic: 'Chữ A và những người bạn & Nhím nâu kết bạn',
    description: 'Chữ hoa L/M, phân biệt g/gh, iu/ưu, iên/iêng, từ chỉ cảm xúc & hành động.'
  },
  {
    id: 12,
    week: 12,
    semester: 1,
    title: 'Vòng 12: Thả diều - Tớ là lê-gô',
    theme: 'Niềm vui tuổi thơ',
    readingTopic: 'Thả diều & Tớ là lê-gô',
    description: 'Chữ hoa N, phân biệt ng/ngh, ch/tr, uôn/uông, từ chỉ đồ chơi & lợi ích.'
  },
  {
    id: 13,
    week: 13,
    semester: 1,
    title: 'Vòng 13: Rồng rắn lên mây - Nặn đồ chơi',
    theme: 'Niềm vui tuổi thơ',
    readingTopic: 'Rồng rắn lên mây & Nặn đồ chơi',
    description: 'Chữ hoa O, phân biệt d/gi, s/x, ươn/ương, mở rộng vốn từ đồ chơi, dấu phẩy.'
  },
  {
    id: 14,
    week: 14,
    semester: 1,
    title: 'Vòng 14: Sự tích hoa tỉ muội - Em mang về yêu thương',
    theme: 'Mái ấm gia đình',
    readingTopic: 'Sự tích hoa tỉ muội & Em mang về yêu thương',
    description: 'Chữ hoa Ô/Ơ, phân biệt iên/yên/uyên, r/d/gi, ai/ay, vốn từ tình cảm gia đình.'
  },
  {
    id: 15,
    week: 15,
    semester: 1,
    title: 'Vòng 15: Mẹ - Trò chơi của bố',
    theme: 'Mái ấm gia đình',
    readingTopic: 'Mẹ & Trò chơi của bố',
    description: 'Chữ hoa P, phân biệt l/n, ao/au, viết hoa tên riêng địa lí, dấu chấm, hỏi, than.'
  },
  {
    id: 16,
    week: 16,
    semester: 1,
    title: 'Vòng 16: Cánh cửa nhớ bà - Thương ông',
    theme: 'Mái ấm gia đình',
    readingTopic: 'Cánh cửa nhớ bà & Thương ông',
    description: 'Chữ hoa Q, phân biệt ch/tr, ac/at, câu nêu hoạt động, tình yêu thương ông bà.'
  },
  {
    id: 17,
    week: 17,
    semester: 1,
    title: 'Vòng 17: Ánh sáng của yêu thương - Chơi chong chóng',
    theme: 'Mái ấm gia đình',
    readingTopic: 'Ánh sáng của yêu thương & Chơi chong chóng',
    description: 'Chữ hoa R, phân biệt iu/ưu, ăt/ăc, ât/âc, viết tin nhắn, dấu phẩy, tình cảm anh em.'
  },
  {
    id: 18,
    week: 18,
    semester: 1,
    title: 'Vòng 18: Ôn tập và Đánh giá cuối học kì 1',
    theme: 'Mái ấm gia đình & Ôn tập Cuối HK1',
    readingTopic: 'Cỏ và lúa & Đàn mưa con',
    description: 'Đề thi Trạng Nguyên Cuối Học Kì 1: Toàn bộ kiến thức 18 tuần đầu tiên.'
  },
  {
    id: 19,
    week: 19,
    semester: 2,
    title: 'Vòng 19: Chuyện bốn mùa - Mùa nước nổi',
    theme: 'Vẻ đẹp quanh em',
    readingTopic: 'Chuyện bốn mùa & Mùa nước nổi',
    description: 'Chữ hoa S, phân biệt c/k, ch/tr, ac/at, vốn từ các mùa, dấu chấm, chấm hỏi.'
  },
  {
    id: 20,
    week: 20,
    semester: 2,
    title: 'Vòng 20: Hoạ mi hót - Tết đến rồi',
    theme: 'Vẻ đẹp quanh em',
    readingTopic: 'Hoạ mi hót & Tết đến rồi',
    description: 'Chữ hoa T, phân biệt g/gh, s/x, uc/ut, vốn từ ngày Tết, viết thiệp chúc mừng.'
  },
  {
    id: 21,
    week: 21,
    semester: 2,
    title: 'Vòng 21: Giọt nước và biển lớn - Mùa vàng',
    theme: 'Vẻ đẹp quanh em',
    readingTopic: 'Giọt nước và biển lớn & Mùa vàng',
    description: 'Chữ hoa U/Ư, phân biệt ng/ngh, r/d/gi, uc/ut, vốn từ cây cối, mùa màng.'
  },
  {
    id: 22,
    week: 22,
    semester: 2,
    title: 'Vòng 22: Hạt thóc - Luỹ tre',
    theme: 'Vẻ đẹp quanh em',
    readingTopic: 'Hạt thóc & Luỹ tre',
    description: 'Chữ hoa V, phân biệt uynh/uych, l/n, iêt/iêc, vốn từ thiên nhiên, câu nêu đặc điểm.'
  },
  {
    id: 23,
    week: 23,
    semester: 2,
    title: 'Vòng 23: Vè chim - Khủng long',
    theme: 'Hành tinh xanh của em',
    readingTopic: 'Vè chim & Khủng long',
    description: 'Chữ hoa X, phân biệt uya/uyu, iêu/ươu, uôt/uôc, vốn từ muông thú, dấu câu.'
  },
  {
    id: 24,
    week: 24,
    semester: 2,
    title: 'Vòng 24: Sự tích cây thì là - Bờ tre đón khách',
    theme: 'Hành tinh xanh của em',
    readingTopic: 'Sự tích cây thì là & Bờ tre đón khách',
    description: 'Chữ hoa Y, phân biệt d/gi, iu/ưu, uơc/ươt, vốn từ vật nuôi, câu nêu đặc điểm.'
  },
  {
    id: 25,
    week: 25,
    semester: 2,
    title: 'Vòng 25: Tiếng chổi tre - Cỏ non cười rồi',
    theme: 'Hành tinh xanh của em',
    readingTopic: 'Tiếng chổi tre & Cỏ non cười rồi',
    description: 'Chữ hoa A (kiểu 2), phân biệt ng/ngh, tr/ch, êt/êch, bảo vệ môi trường, dấu phẩy.'
  },
  {
    id: 26,
    week: 26,
    semester: 2,
    title: 'Vòng 26: Những con sao biển - Tạm biệt cánh cam',
    theme: 'Hành tinh xanh của em',
    readingTopic: 'Những con sao biển & Tạm biệt cánh cam',
    description: 'Chữ hoa M (kiểu 2), phân biệt oanh/oach, s/x, dấu hỏi/ngã, loài vật nhỏ bé.'
  },
  {
    id: 27,
    week: 27,
    semester: 2,
    title: 'Vòng 27: Ôn tập và Đánh giá giữa học kì 2',
    theme: 'Hành tinh xanh của em & Vẻ đẹp quanh em',
    readingTopic: 'Cánh cam lạc mẹ & Mây đen và mây trắng',
    description: 'Đề thi Trạng Nguyên Giữa Học Kì 2: Tổng hợp kiến thức từ tuần 19 đến tuần 26.'
  },
  {
    id: 28,
    week: 28,
    semester: 2,
    title: 'Vòng 28: Những cách chào độc đáo - Thư viện biết đi',
    theme: 'Giao tiếp và kết nối',
    readingTopic: 'Những cách chào độc đáo & Thư viện biết đi',
    description: 'Chữ hoa N (kiểu 2), phân biệt d/gi, ch/tr, dấu hỏi/ngã, luyện tập dấu câu.'
  },
  {
    id: 29,
    week: 29,
    semester: 2,
    title: 'Vòng 29: Cảm ơn anh hà mã - Từ chú bồ câu đến in-tơ-nét',
    theme: 'Giao tiếp và kết nối',
    readingTopic: 'Cảm ơn anh hà mã & Từ chú bồ câu đến in-tơ-nét',
    description: 'Chữ hoa Q (kiểu 2), phân biệt eo/oe, l/n, ên/ênh, phương tiện giao tiếp & lời cảm ơn.'
  },
  {
    id: 30,
    week: 30,
    semester: 2,
    title: 'Vòng 30: Mai An Tiêm - Thư gửi bố ngoài đảo',
    theme: 'Con người Việt Nam',
    readingTopic: 'Mai An Tiêm & Thư gửi bố ngoài đảo',
    description: 'Chữ hoa V (kiểu 2), phân biệt d/gi, s/x, ip/iêp, từ ngữ nghề nghiệp & bộ đội hải quân.'
  },
  {
    id: 31,
    week: 31,
    semester: 2,
    title: 'Vòng 31: Bóp nát quả cam - Chiếc rễ đa tròn',
    theme: 'Con người Việt Nam',
    readingTopic: 'Bóp nát quả cam & Chiếc rễ đa tròn',
    description: 'Ôn chữ hoa, phân biệt iu/ưu, im/iêm, từ ngữ Bác Hồ & các vị anh hùng dân tộc.'
  },
  {
    id: 32,
    week: 32,
    semester: 2,
    title: 'Vòng 32: Đất nước chúng mình - Trên các miền đất nước',
    theme: 'Việt Nam quê hương em',
    readingTopic: 'Đất nước chúng mình & Trên các miền đất nước',
    description: 'Viết hoa tên địa danh, phân biệt ch/tr, iu/iêu, sản phẩm truyền thống, câu giới thiệu.'
  },
  {
    id: 33,
    week: 33,
    semester: 2,
    title: 'Vòng 33: Chuyện quả bầu - Khám phá đáy biển ở Trường Sa',
    theme: 'Việt Nam quê hương em',
    readingTopic: 'Chuyện quả bầu & Khám phá đáy biển ở Trường Sa',
    description: 'Phân biệt it/uyt, ươu/iêu, in/inh, từ ngữ các dân tộc anh em & sinh vật biển, dấu phẩy.'
  },
  {
    id: 34,
    week: 34,
    semester: 2,
    title: 'Vòng 34: Hồ Gươm - Cánh đồng quê em',
    theme: 'Việt Nam quê hương em',
    readingTopic: 'Hồ Gươm & Cánh đồng quê em',
    description: 'Phân biệt r/d/gi, dấu hỏi/ngã, danh lam thắng cảnh thủ đô Hà Nội và vẻ đẹp đồng quê.'
  },
  {
    id: 35,
    week: 35,
    semester: 2,
    title: 'Vòng 35: Đại Thi Đấu Trạng Nguyên Tiếng Việt Lớp 2 (Cuối Năm)',
    theme: 'Toàn bộ chương trình Tiếng Việt Lớp 2',
    readingTopic: 'Cây bàng, Cánh chim báo mùa xuân & Thăm bạn ốm',
    description: 'Vòng thi Trạng Nguyên Đình Lớp 2 Đỉnh Cao: Đánh giá toàn diện 35 tuần học tập xuất sắc.'
  }
];
