import { Question } from '../types';
import { shuffleQuestionsList } from '../utils/questionShuffle';

interface RoundCurriculumSpec {
  theme?: string;
  readings: string[];
  spelling: string[];
  vocab: string;
  grammar: string;
  charName: string;
  idioms: string[];
  riddle: { text: string; answer: string; distractors: string[] };
}

const CURRICULUM_BY_ROUND: Record<number, RoundCurriculumSpec> = {
  1: {
    readings: ['Tôi là học sinh lớp 2', 'Ngày hôm qua đâu rồi?'],
    spelling: ['Chữ hoa A', 'Bảng chữ cái', 'n/l', 'anh/ang'],
    vocab: 'Từ ngữ chỉ người, chỉ đồ vật học tập',
    grammar: 'Câu giới thiệu (Ai là gì?)',
    charName: 'bạn nhỏ lớp 2',
    idioms: ['Học thầy không tày học bạn', 'Có công mài sắt có ngày nên kim', 'Đi một ngày đàng học một sàng khôn'],
    riddle: {
      text: 'Cái gì bằng gỗ màu xanh / Giúp cô viết chữ, giúp trò vẽ tranh?',
      answer: 'Cái bảng lớp',
      distractors: ['Cái thước kẻ', 'Cái cặp sách', 'Cục tẩy']
    }
  },
  2: {
    readings: ['Niềm vui của Bi và Bống', 'Làm việc thật là vui'],
    spelling: ['Chữ hoa Ă, Â', 'Bảng chữ cái', 'g/gh', 'c/k'],
    vocab: 'Từ ngữ chỉ sự vật, từ chỉ hoạt động ở nhà và trường',
    grammar: 'Câu nêu hoạt động (Ai làm gì?)',
    charName: 'Bi và Bống',
    idioms: ['Ăn quả nhớ kẻ trồng cây', 'Lao động là vinh quang', 'Tay làm hàm nhai'],
    riddle: {
      text: 'Con gì gáy sáng ò ó o / Đánh thức mọi người thức dậy sớm?',
      answer: 'Con gà trống',
      distractors: ['Con vịt bầu', 'Con chim sâu', 'Con mèo mướp']
    }
  },
  3: {
    readings: ['Em có xinh không?', 'Một giờ học'],
    spelling: ['Chữ hoa B', 'Bảng chữ cái', 'd/gi/r', 's/x'],
    vocab: 'Từ ngữ chỉ đặc điểm (xinh xắn, tự tin, rụt rè, lúng túng)',
    grammar: 'Câu nêu đặc điểm (Ai thế nào?)',
    charName: 'Voi em và Quang',
    idioms: ['Lời chào cao hơn mâm cỗ', 'Tự tin ắt chiến thắng', 'Học ăn học nói'],
    riddle: {
      text: 'Con gì to lớn có vòi / Giúp dân kéo gỗ, bạn cùng trẻ thơ?',
      answer: 'Con voi',
      distractors: ['Con hươu sao', 'Con sư tử', 'Con gấu nâu']
    }
  },
  4: {
    readings: ['Cây xấu hổ', 'Chú đỗ con'],
    spelling: ['Chữ hoa C', 'Bảng chữ cái', 'l/n', 'ch/tr'],
    vocab: 'Từ ngữ chỉ cây cối, đặc điểm các loài cây và chim',
    grammar: 'Câu nêu hoạt động & đặc điểm',
    charName: 'Cây xấu hổ và Chú đỗ con',
    idioms: ['Cây xanh thì lá cũng xanh', 'Đùm bọc sẻ chia', 'Nắng tốt dưa, mưa tốt lúa'],
    riddle: {
      text: 'Cây gì chạm nhẹ khép mi / Tên như ngượng ngùng mỗi khi người nhìn?',
      answer: 'Cây xấu hổ (cây trinh nữ)',
      distractors: ['Cây hoa hồng', 'Cây chuối tiêu', 'Cây tre xanh']
    }
  },
  5: {
    readings: ['Cầu thủ dự bị', 'Cô giáo lớp em'],
    spelling: ['Chữ hoa D, Đ', 'Thời khoá biểu', 'c/k', 'ch/tr', 'v/d'],
    vocab: 'Từ ngữ về môn thể thao, hoạt động vui chơi học đường',
    grammar: 'Câu nêu hoạt động của học sinh',
    charName: 'Gấu con và cô giáo',
    idioms: ['Tôn sư trọng đạo', 'Khỏe để học tập và rèn luyện', 'Đoàn kết là sức mạnh'],
    riddle: {
      text: 'Quả gì tròn tròn lăn trên sân / Hai đội tranh nhau sút vào gôn?',
      answer: 'Quả bóng đá',
      distractors: ['Quả cầu lông', 'Quả bóng bàn', 'Quả bóng rổ']
    }
  },
  6: {
    readings: ['Cái trống trường em', 'Danh sách học sinh'],
    spelling: ['Chữ hoa E, Ê', 'g/gh', 's/x', 'dấu hỏi / dấu ngã'],
    vocab: 'Từ ngữ chỉ đồ vật ở trường, đặc điểm đồ vật',
    grammar: 'Câu nêu đặc điểm của sự vật trong trường',
    charName: 'Cái trống trường',
    idioms: ['Tiên học lễ, hậu học văn', 'Trường lớp là ngôi nhà thứ hai', 'Kính thầy yêu bạn'],
    riddle: {
      text: 'Thân tròn da căng, nằm ở góc trường / Tùng tùng giục giã báo giờ vào ra?',
      answer: 'Cái trống trường',
      distractors: ['Cái chuông điện', 'Cái bảng xanh', 'Cột cờ']
    }
  },
  7: {
    readings: ['Yêu lắm trường ơi!', 'Em học vẽ'],
    spelling: ['Chữ hoa G', 'ng/ngh', 'r/d/gi', 'an/ang'],
    vocab: 'Từ ngữ đồ dùng học tập, dấu chấm, dấu chấm hỏi',
    grammar: 'Câu hỏi và câu trần thuật',
    charName: 'Bạn nhỏ yêu trường lớp',
    idioms: ['Nét chữ nết người', 'Mỗi ngày đến trường là một ngày vui', 'Chăm học chăm làm'],
    riddle: {
      text: 'Ruột dài từ mũi đến chân / Mũi mòn ruột ngắn mỗi lần vẽ tô?',
      answer: 'Cây bút chì',
      distractors: ['Cái thước kẻ', 'Cục tẩy gôm', 'Hộp bút màu']
    }
  },
  8: {
    readings: ['Cuốn sách của em', 'Khi trang sách mở ra'],
    spelling: ['Chữ hoa H', 'l/n', 'ăn/ăng', 'ân/âng', 'Viết hoa tên người'],
    vocab: 'Từ ngữ về sách báo, tác giả, nhà xuất bản, mục lục',
    grammar: 'Câu giới thiệu & nêu đặc điểm cuốn sách',
    charName: 'Trang sách tuổi thơ',
    idioms: ['Sách là kho tàng tri thức', 'Văn hay chữ tốt', 'Học một biết mười'],
    riddle: {
      text: 'Mở ra thấy cả đất trời / Giấy trắng thơm tho, chữ lời chứa chan?',
      answer: 'Cuốn sách',
      distractors: ['Tờ báo ảnh', 'Tấm bản đồ', 'Bức tranh vẽ']
    }
  },
  9: {
    readings: ['Ôn tập Giữa học kì 1', 'Cây xấu hổ & Niềm vui Bi, Bống'],
    spelling: ['Ôn tập chữ hoa A -> H', 'c/k, g/gh, ng/ngh, s/x, l/n'],
    vocab: 'Tổng hợp từ chỉ sự vật, hoạt động, đặc điểm tuần 1-8',
    grammar: 'Phân biệt 3 kiểu câu: Ai là gì? Ai làm gì? Ai thế nào?',
    charName: 'Các nhân vật Tuần 1-8',
    idioms: ['Học đi đôi với hành', 'Có chí thì nên', 'Vạn sự khởi đầu nan'],
    riddle: {
      text: 'Cái gì tích tắc đêm ngày / Nhắc em chăm chỉ học bài chớ quên?',
      answer: 'Cái đồng hồ',
      distractors: ['Cái chuông gió', 'Chiếc quạt máy', 'Ngọn đèn bàn']
    }
  },
  10: {
    readings: ['Gọi bạn', 'Tớ nhớ cậu'],
    spelling: ['Chữ hoa I, K', 'c/k', 'iêu/ươu', 'en/eng', 'Dấu chấm than'],
    vocab: 'Từ ngữ về tình bạn bè, bộc lộ tình cảm gắn bó',
    grammar: 'Câu bộc lộ cảm xúc (Dấu chấm than !)',
    charName: 'Bê vàng và Dê trắng, Kiến và Sóc',
    idioms: ['Bạn bè chia ngọt sẻ bùi', 'Bán anh em xa mua láng giềng gần', 'Hoạn nạn mới biết bạn hiền'],
    riddle: {
      text: 'Đôi bạn sống ở rừng sâu / Hạn hán đi tìm cỏ, gọi "Bê! Bê!" hoài?',
      answer: 'Bê vàng và Dê trắng',
      distractors: ['Thỏ và Rùa', 'Sóc và Kiến', 'Gấu và Khỉ']
    }
  },
  11: {
    readings: ['Chữ A và những người bạn', 'Nhím nâu kết bạn'],
    spelling: ['Chữ hoa L, M', 'g/gh', 'iu/ưu', 'iên/iêng'],
    vocab: 'Từ ngữ chỉ cảm xúc, tính cách (nhút nhát, hiền lành, thân thiện)',
    grammar: 'Câu nêu đặc điểm & hoạt động',
    charName: 'Chữ A, Nhím nâu và Nhím trắng',
    idioms: ['Đoàn kết thì sống, chia rẽ thì chết', 'Thuận vợ thuận chồng', 'Một cây làm chẳng nên non'],
    riddle: {
      text: 'Con gì đầy gai nhọn hoắt / Cuộn tròn tự vệ khi gặp hiểm nguy?',
      answer: 'Con nhím',
      distractors: ['Con tê tê', 'Con nhím biển', 'Con sâu róm']
    }
  },
  12: {
    readings: ['Thả diều', 'Tớ là lê-gô'],
    spelling: ['Chữ hoa N', 'ng/ngh', 'ch/tr', 'uôn/uông'],
    vocab: 'Từ ngữ về đồ chơi trẻ em, hình khối, màu sắc',
    grammar: 'Câu nêu đặc điểm đồ chơi',
    charName: 'Cánh diều và Đồ chơi Lê-gô',
    idioms: ['Khéo tay hay làm', 'Vui chơi bổ ích', 'Trăm hay không bằng tay quen'],
    riddle: {
      text: 'Không cánh mà vẫn bay cao / No gió no gió lượn vào trời xanh?',
      answer: 'Cánh diều',
      distractors: ['Quả bóng bay', 'Chiếc máy bay', 'Tàu lượn']
    }
  },
  13: {
    readings: ['Rồng rắn lên mây', 'Nặn đồ chơi'],
    spelling: ['Chữ hoa O', 'd/gi', 's/x', 'ươn/ương', 'Dấu phẩy'],
    vocab: 'Từ ngữ về trò chơi dân gian, đất nặn, hoa quả đồ chơi',
    grammar: 'Dấu phẩy ngăn cách các từ cùng loại',
    charName: 'Thầy thuốc và rồng rắn',
    idioms: ['Vui như hội', 'Múa rồng múa lân', 'Trẻ em như búp trên cành'],
    riddle: {
      text: 'Trò chơi gì nắm đuôi áo / Rồng rắn rủ nhau đi hỏi thầy thuốc?',
      answer: 'Rồng rắn lên mây',
      distractors: ['Bịt mắt bắt dê', 'Kéo co', 'Trốn tìm']
    }
  },
  14: {
    readings: ['Sự tích hoa tỉ muội', 'Em mang về yêu thương'],
    spelling: ['Chữ hoa Ô, Ơ', 'iên/yên/uyên', 'r/d/gi', 'ai/ay'],
    vocab: 'Từ ngữ chỉ người thân trong gia đình, tình cảm chị em',
    grammar: 'Câu nêu hoạt động & đặc điểm tình cảm',
    charName: 'Nết và Na, Em bé nhỏ',
    idioms: ['Chị ngã em nâng', 'Anh em như thể tay chân', 'Lá lành đùm lá rách'],
    riddle: {
      text: 'Hoa gì tên gọi tỉ muội / Nở từng chùm đỏ chở che nụ mầm?',
      answer: 'Hoa tỉ muội',
      distractors: ['Hoa sen hồng', 'Hoa cúc vàng', 'Hoa hướng dương']
    }
  },
  15: {
    readings: ['Mẹ', 'Trò chơi của bố'],
    spelling: ['Chữ hoa P', 'l/n', 'ao/au', 'Viết hoa tên địa lí', 'Dấu chấm, hỏi, than'],
    vocab: 'Từ ngữ chỉ tình cảm cha mẹ, sự chăm sóc yêu thương gia đình',
    grammar: 'Sử dụng dấu câu đúng ngữ cảnh',
    charName: 'Người mẹ tảo tần & Hai bố con Hường',
    idioms: ['Công cha như núi Thái Sơn / Nghĩa mẹ như nước trong nguồn chảy ra', 'Con có cha như nhà có nóc'],
    riddle: {
      text: 'Ai người thức suốt đêm thâu / Quạt mát cho con, nâng giấc tròn lành?',
      answer: 'Người mẹ',
      distractors: ['Cô giáo', 'Bác sĩ', 'Chị gái']
    }
  },
  16: {
    readings: ['Cánh cửa nhớ bà', 'Thương ông'],
    spelling: ['Chữ hoa Q', 'ch/tr', 'ac/at'],
    vocab: 'Từ ngữ về tình cảm kính yêu ông bà, cử chỉ hiếu thảo',
    grammar: 'Câu nêu hoạt động giúp đỡ ông bà',
    charName: 'Việt và Ông, Bạn nhỏ và Bà',
    idioms: ['Kính trên nhường dưới', 'Uống nước nhớ nguồn', 'Con hiền cháu thảo'],
    riddle: {
      text: 'Cháu đỡ ông bước lên thềm / Đau chân quên hết vì thương cháu ngoan?',
      answer: 'Bạn Việt trong bài Thương ông',
      distractors: ['Bạn Nam', 'Bạn Khoa', 'Bạn Bống']
    }
  },
  17: {
    readings: ['Ánh sáng của yêu thương', 'Chơi chong chóng'],
    spelling: ['Chữ hoa R', 'iu/ưu', 'ăt/ăc', 'ât/âc', 'Viết tin nhắn'],
    vocab: 'Từ ngữ về phát minh khoa học, tình yêu thương, trò chơi',
    grammar: 'Cấu trúc bản tin nhắn ngắn',
    charName: 'Cậu bé Ê-đi-xơn & Hai anh em An, Mai',
    idioms: ['Thương người như thể thương thân', 'Có chí thì nên', 'Sáng tạo đổi mới'],
    riddle: {
      text: 'Bốn cánh mỏng đón gió quay / Mang theo tiếng hát tiếng cười tuổi thơ?',
      answer: 'Chiếc chong chóng',
      distractors: ['Cái quạt giấy', 'Cánh diều', 'Chiếc chong chóng sắt']
    }
  },
  18: {
    readings: ['Ôn tập Cuối học kì 1', 'Cỏ và lúa & Đàn mưa con'],
    spelling: ['Ôn tập chữ hoa A -> R', 'Chính tả tổng hợp HK1'],
    vocab: 'Tổng hợp từ vựng Học kì 1 (Sự vật, hoạt động, đặc điểm)',
    grammar: 'Tổng kết 3 kiểu câu, dấu chấm, hỏi, than, phẩy',
    charName: 'Các nhân vật trong toàn bộ Học kì 1',
    idioms: ['Học hay cày giỏi', 'Nước chảy đá mòn', 'Văn võ song toàn'],
    riddle: {
      text: 'Hạt gì nuôi sống con người / Xay giã giần sàng nấu thành cơm dẻo?',
      answer: 'Hạt thóc (lúa)',
      distractors: ['Hạt tiêu', 'Hạt ngô', 'Hạt đỗ']
    }
  },
  19: {
    readings: ['Chuyện bốn mùa', 'Mùa nước nổi'],
    spelling: ['Chữ hoa S', 'c/k', 'ch/tr', 'ac/at'],
    vocab: 'Từ ngữ chỉ 4 mùa (Xuân, Hạ, Thu, Đông) và thời tiết',
    grammar: 'Dấu chấm và dấu chấm hỏi trong đoạn văn miêu tả mùa',
    charName: 'Bốn nàng tiên Xuân, Hạ, Thu, Đông',
    idioms: ['Xuân hoa thu nguyệt', 'Mưa thuận gió hòa', 'Bốn mùa tươi tốt'],
    riddle: {
      text: 'Mùa nào hoa đào hoa mai nở / Tết đến rộn ràng khắp muôn nơi?',
      answer: 'Mùa xuân',
      distractors: ['Mùa hạ', 'Mùa thu', 'Mùa đông']
    }
  },
  20: {
    readings: ['Hoạ mi hót', 'Tết đến rồi'],
    spelling: ['Chữ hoa T', 'g/gh', 's/x', 'uc/ut'],
    vocab: 'Từ ngữ về Tết cổ truyền, bánh chưng, hoa đào, hoa mai',
    grammar: 'Viết thiệp chúc Tết, câu giới thiệu hoa ngày Tết',
    charName: 'Chim hoạ mi & Ngày Tết gia đình',
    idioms: ['Tết đoàn viên', 'Cung chúc tân xuân', 'Vạn sự như ý'],
    riddle: {
      text: 'Bánh hình vuông gói lá dong / Nếp xanh nhân thịt, đỗ thơm ngày Tết?',
      answer: 'Bánh chưng',
      distractors: ['Bánh tét', 'Bánh giầy', 'Bánh trôi']
    }
  },
  21: {
    readings: ['Giọt nước và biển lớn', 'Mùa vàng'],
    spelling: ['Chữ hoa U, Ư', 'ng/ngh', 'r/d/gi', 'uc/ut'],
    vocab: 'Từ ngữ về sông biển, mùa màng thu hoạch quả ngọt lúa chín',
    grammar: 'Câu nêu đặc điểm cảnh sắc thiên nhiên mùa gặt',
    charName: 'Giọt nước bé nhỏ & Minh',
    idioms: ['Tích tiểu thành đại', 'Biển rộng mênh mông', 'Mùa màng bội thu'],
    riddle: {
      text: 'Từ nguồn suối nhỏ chảy xuôi / Hợp thành sông lớn đổ về biển khơi?',
      answer: 'Giọt nước',
      distractors: ['Cơn gió', 'Hòn đá', 'Chiếc lá']
    }
  },
  22: {
    readings: ['Hạt thóc', 'Luỹ tre'],
    spelling: ['Chữ hoa V', 'uynh/uych', 'l/n', 'iêt/iêc'],
    vocab: 'Từ ngữ về thiên nhiên cây cối làng quê Việt Nam',
    grammar: 'Câu nêu đặc điểm (Luỹ tre xanh rì rào, Hạt thóc quý giá)',
    charName: 'Hạt thóc và Luỹ tre xanh',
    idioms: ['Tre già măng mọc', 'Đất lành chim đậu', 'Hạt gạo làng ta'],
    riddle: {
      text: 'Cây gì thân đốt vươn cao / Làm hàng rào chắn chở che xóm làng?',
      answer: 'Cây tre',
      distractors: ['Cây chuối', 'Cây bàng', 'Cây dừa']
    }
  },
  23: {
    readings: ['Vè chim', 'Khủng long'],
    spelling: ['Chữ hoa X', 'uya/uyu', 'iêu/ươu', 'uôt/uôc'],
    vocab: 'Từ ngữ về các loài chim và động vật hoang dã',
    grammar: 'Dấu chấm, dấu chấm hỏi, dấu chấm than',
    charName: 'Các loài chim trong bài Vè chim & Khủng long',
    idioms: ['Chim khôn hót tiếng rảnh rang', 'Rừng vàng biển bạc', 'Động vật là bạn của con người'],
    riddle: {
      text: 'Vừa đi vừa nhảy lon xon / Là em sáo nhỏ hay là chìa vôi?',
      answer: 'Em sáo xinh (trong bài Vè chim)',
      distractors: ['Chim cánh cụt', 'Đại bàng', 'Đà điểu']
    }
  },
  24: {
    readings: ['Sự tích cây thì là', 'Bờ tre đón khách'],
    spelling: ['Chữ hoa Y', 'd/gi', 'iu/ưu', 'uơc/ươt'],
    vocab: 'Từ ngữ về vật nuôi, rau củ và các vị khách bên bờ tre',
    grammar: 'Câu nêu đặc điểm và câu nêu hoạt động',
    charName: 'Cây thì là & Bác bồ nông, đàn cò bạch',
    idioms: ['Nhanh như chớp', 'Thì là thơm nức nồi canh', 'Khách đến nhà chẳng gà thì vịt'],
    riddle: {
      text: 'Trời đang suy nghĩ đặt tên / Vội vàng bay khoe khắp nơi: "Thì là!"?',
      answer: 'Cây thì là',
      distractors: ['Cây rau mùi', 'Cây hành lá', 'Cây ớt cay']
    }
  },
  25: {
    readings: ['Tiếng chổi tre', 'Cỏ non cười rồi'],
    spelling: ['Chữ hoa A (kiểu 2)', 'ng/ngh', 'tr/ch', 'êt/êch'],
    vocab: 'Từ ngữ bảo vệ môi trường, công việc quét dọn vệ sinh',
    grammar: 'Dấu phẩy trong câu liệt kê hoạt động chăm sóc cây cỏ',
    charName: 'Chị lao công & Én nâu, Cỏ non',
    idioms: ['Giữ gìn vệ sinh chung', 'Xanh sạch đẹp', 'Môi trường là sự sống'],
    riddle: {
      text: 'Đêm đông gió rét xao xác / Tiếng chổi chị quét giữ sạch lề phố hoa?',
      answer: 'Tiếng chổi tre của chị lao công',
      distractors: ['Tiếng mưa rơi', 'Tiếng còi xe', 'Tiếng lá bay']
    }
  },
  26: {
    readings: ['Những con sao biển', 'Tạm biệt cánh cam'],
    spelling: ['Chữ hoa M (kiểu 2)', 'oanh/oach', 's/x', 'dấu hỏi/ngã'],
    vocab: 'Từ ngữ về lòng nhân ái, tình yêu thương các sinh vật nhỏ bé',
    grammar: 'Câu thể hiện lời xin lỗi và cảm ơn',
    charName: 'Cậu bé nhặt sao biển & Bống yêu quý cánh cam',
    idioms: ['Thương yêu muôn loài', 'Cứu một mạng người hơn xây bảy tòa tháp', 'Bầu ơi thương lấy bí cùng'],
    riddle: {
      text: 'Con vật năm cánh nằm trên cát / Sóng biển dạt vào được bé thả khơi xa?',
      answer: 'Con sao biển',
      distractors: ['Con cua biển', 'Con ốc biển', 'Con cá heo']
    }
  },
  27: {
    readings: ['Ôn tập Giữa học kì 2', 'Cánh cam lạc mẹ & Mây đen và mây trắng'],
    spelling: ['Ôn tập chữ hoa kiểu 2', 'Chính tả tổng hợp tuần 19-26'],
    vocab: 'Tổng hợp từ ngữ thiên nhiên, muông thú, môi trường',
    grammar: 'Luyện tập tổng hợp các kiểu câu và dấu câu',
    charName: 'Cánh cam, Bọ dừa, Mây đen và Mây trắng',
    idioms: ['Lá lành đùm lá rách', 'Thương người như thể thương thân', 'Gần mực thì đen, gần đèn thì rạng'],
    riddle: {
      text: 'Xốp nhẹ bồng bềnh như gối / Làm mưa tươi mát mùa màng cỏ cây?',
      answer: 'Mây đen hoá thành mưa',
      distractors: ['Cơn lốc', 'Cầu vồng', 'Ánh nắng']
    }
  },
  28: {
    readings: ['Những cách chào độc đáo', 'Thư viện biết đi'],
    spelling: ['Chữ hoa N (kiểu 2)', 'd/gi', 'ch/tr', 'dấu hỏi/ngã'],
    vocab: 'Từ ngữ về giao tiếp, lời chào hỏi quốc tế, thư viện sách',
    grammar: 'Luyện tập dấu chấm, dấu chấm than, dấu phẩy',
    charName: 'Người Ma-ô-ri, người Ấn Độ & Thư viện lưu động',
    idioms: ['Lời nói chẳng mất tiền mua / Lựa lời mà nói cho vừa lòng nhau', 'Đi một ngày đàng học một sàng khôn'],
    riddle: {
      text: 'Không xây bằng gạch ngói / Đặt trên tàu biển buýt xe chở sách đi?',
      answer: 'Thư viện biết đi (thư viện di động)',
      distractors: ['Trường học', 'Ngôi nhà gỗ', 'Bảo tàng']
    }
  },
  29: {
    readings: ['Cảm ơn anh hà mã', 'Từ chú bồ câu đến in-tơ-nét'],
    spelling: ['Chữ hoa Q (kiểu 2)', 'eo/oe', 'l/n', 'ên/ênh'],
    vocab: 'Từ ngữ về phương tiện liên lạc (thư từ, điện thoại, internet)',
    grammar: 'Cách nói lời cảm ơn, xin lỗi lịch sự trong giao tiếp',
    charName: 'Dê con, Cún con, Anh Hà Mã',
    idioms: ['Muốn biết phải hỏi, muốn giỏi phải học', 'Lời chào đi trước', 'Biết sai thì sửa'],
    riddle: {
      text: 'Xưa đưa thư vượt ngàn dặm / Nay mở màn hình thấy mặt người thân xa?',
      answer: 'Từ bồ câu đến In-tơ-nét (Internet/Điện thoại)',
      distractors: ['Xe đạp', 'Con tàu thủy', 'Cái loa phường']
    }
  },
  30: {
    readings: ['Mai An Tiêm', 'Thư gửi bố ngoài đảo'],
    spelling: ['Chữ hoa V (kiểu 2)', 'd/gi', 's/x', 'ip/iêp'],
    vocab: 'Từ ngữ về lòng yêu nước, các anh bộ đội hải quân, nghề nghiệp',
    grammar: 'Câu nêu hoạt động & cảm xúc gửi người thân',
    charName: 'Mai An Tiêm & Em bé viết thư cho bố',
    idioms: ['Có chí thì nên', 'Tay làm hàm nhai', 'Yêu Tổ quốc, yêu đồng bào'],
    riddle: {
      text: 'Vỏ xanh, ruột đỏ, hạt đen / Hoa vàng, lá biếc đố em quả gì?',
      answer: 'Quả dưa hấu (Dưa đỏ)',
      distractors: ['Quả bưởi da xanh', 'Quả ổi đào', 'Quả thanh long']
    }
  },
  31: {
    readings: ['Bóp nát quả cam', 'Chiếc rễ đa tròn'],
    spelling: ['Ôn tập chữ hoa', 'iu/ưu', 'im/iêm'],
    vocab: 'Từ ngữ về Bác Hồ kính yêu, anh hùng dân tộc Trần Quốc Toản',
    grammar: 'Câu bày tỏ tình cảm biết ơn (Ai thế nào?)',
    charName: 'Trần Quốc Toản & Bác Hồ muôn vàn kính yêu',
    idioms: ['Tuổi nhỏ chí lớn', 'Uống nước nhớ nguồn', 'Kính yêu Bác Hồ'],
    riddle: {
      text: 'Người anh hùng tuổi trẻ / Bóp nát quả cam vì căm giặc xâm lăng?',
      answer: 'Trần Quốc Toản',
      distractors: ['Lý Thường Kiệt', 'Ngô Quyền', 'Quang Trung']
    }
  },
  32: {
    readings: ['Đất nước chúng mình', 'Trên các miền đất nước'],
    spelling: ['Viết hoa tên địa danh Việt Nam', 'ch/tr', 'iu/iêu'],
    vocab: 'Từ ngữ về 3 miền Bắc - Trung - Nam, danh lam thắng cảnh Tổ quốc',
    grammar: 'Câu giới thiệu đất nước Việt Nam tươi đẹp',
    charName: 'Quê hương Việt Nam',
    idioms: ['Non sông gấm vóc', 'Rừng vàng biển bạc', 'Rừng cọ đồi chè'],
    riddle: {
      text: 'Dù ai đi ngược về xuôi / Nhớ ngày Giỗ Tổ mùng mười tháng mấy?',
      answer: 'Mùng Mười tháng Ba (Đền Hùng - Phú Thọ)',
      distractors: ['Mùng Tám tháng Ba', 'Mùng Một tháng Năm', 'Mùng Hai tháng Chín']
    }
  },
  33: {
    readings: ['Chuyện quả bầu', 'Khám phá đáy biển ở Trường Sa'],
    spelling: ['it/uyt', 'ươu/iêu', 'in/inh', 'Dấu phẩy liệt kê'],
    vocab: 'Từ ngữ 54 dân tộc anh em, các loài sinh vật biển Trường Sa',
    grammar: 'Câu nêu đặc điểm cảnh đẹp san hô đảo xa',
    charName: 'Các dân tộc Việt Nam & Đáy biển Trường Sa',
    idioms: ['Bầu ơi thương lấy bí cùng', 'Nhiễu điều phủ lấy giá gương', 'Anh em một nhà'],
    riddle: {
      text: 'Quả gì sinh ra các anh em dân tộc Kinh, Thái, Mường, Dao?',
      answer: 'Quả bầu mẹ (trong Sự tích Quả bầu)',
      distractors: ['Quả dưa hấu', 'Quả bí ngô', 'Quả trứng thần']
    }
  },
  34: {
    readings: ['Hồ Gươm', 'Cánh đồng quê em'],
    spelling: ['r/d/gi', 'dấu hỏi/ngã', 'Viết hoa tên di tích'],
    vocab: 'Từ ngữ chỉ di tích Hồ Gươm (Tháp Rùa, cầu Thê Húc) & đồng quê',
    grammar: 'Câu giới thiệu & câu so sánh ("Cầu Thê Húc cong cong như con tôm")',
    charName: 'Hồ Gươm Tháp Rùa & Cánh đồng lúa',
    idioms: ['Cầu Thê Húc màu son cong cong', 'Nước biếc Hồ Gươm', 'Đồng lúa chín vàng'],
    riddle: {
      text: 'Cầu gì màu đỏ son cong cong như con tôm dẫn vào đền Ngọc Sơn?',
      answer: 'Cầu Thê Húc',
      distractors: ['Cầu Long Biên', 'Cầu Chương Dương', 'Cầu Tràng Tiền']
    }
  },
  35: {
    readings: ['Đại hội Trạng Nguyên Tiếng Việt 2 Toàn Quốc', 'Cây bàng, Cánh chim xuân, Thăm bạn ốm'],
    spelling: ['Toàn diện chính tả Lớp 2: c/k, g/gh, ng/ngh, s/x, tr/ch, d/gi/r'],
    vocab: 'Tổng hợp toàn diện từ loại (người, vật, hoạt động, đặc điểm) 35 tuần',
    grammar: 'Thành thạo 3 kiểu câu Ai là gì?, Ai làm gì?, Ai thế nào? & 4 dấu câu',
    charName: 'Trạng Nguyên Nhí xuất sắc',
    idioms: ['Công cha nghĩa mẹ ơn thầy', 'Khổ luyện thành tài', 'Trạng Nguyên rạng rỡ bảng vàng'],
    riddle: {
      text: 'Mùa đông trơ trụi cành trơ / Xuân sang lộc biếc, hạ che mát rượi?',
      answer: 'Cây bàng',
      distractors: ['Cây cột điện', 'Cây sắt', 'Cây cọ']
    }
  }
};

// Generates exactly 30 high-yield questions for round `roundId` (20 Level 1, 5 Level 2, 5 Level 3)
export function generateRoundQuestions(roundId: number): Question[] {
  const spec = CURRICULUM_BY_ROUND[roundId] || CURRICULUM_BY_ROUND[1];
  const questions: Question[] = [];

  // 1. Mức 1: Nhận biết (20 câu: ID 1 -> 20)
  const l1Templates = [
    {
      topic: 'Đọc hiểu bài học',
      question: `Trong bài học "${spec.readings[0]}", chi tiết nào được nhắc đến gắn liền với ${spec.charName}?`,
      options: [
        `Gắn liền với hình ảnh thân thương trong bài "${spec.readings[0]}"`,
        'Đi lạc vào khu rừng rậm hoang vu',
        'Bị điểm kém vì lười học bài',
        'Ngồi khóc vì không ai chơi cùng'
      ],
      correct: 0,
      exp: `Dựa vào văn bản bài đọc "${spec.readings[0]}" trong SGK Tiếng Việt 2 Kết Nối Tri Thức.`
    },
    {
      topic: 'Chính tả - Bảng chữ cái',
      question: `Chữ hoa nào được luyện viết chính trong bài "${spec.readings[0]}"?`,
      options: [spec.spelling[0], 'Chữ hoa Ơ', 'Chữ hoa S', 'Chữ hoa Y'],
      correct: 0,
      exp: `Nội dung phần Viết chữ hoa của tuần này là ${spec.spelling[0]}.`
    },
    {
      topic: 'Chính tả phân biệt âm đầu',
      question: `Từ nào sau đây viết đúng quy tắc chính tả tiếng Việt?`,
      options: [
        roundId % 2 === 0 ? 'Kiên nhẫn' : 'Cần cù',
        roundId % 2 === 0 ? 'Ciên nhẫn' : 'Kần cù',
        roundId % 2 === 0 ? 'Kiêng nhẩn' : 'Cần cùn',
        roundId % 2 === 0 ? 'Chiên nhẫn' : 'Càn cù'
      ],
      correct: 0,
      exp: 'Quy tắc chính tả: k, gh, ngh đi trước các nguyên âm e, ê, i; c, g, ng đi trước a, o, ô, u, ư...'
    },
    {
      topic: 'Từ chỉ sự vật',
      question: `Từ nào dưới đây là từ chỉ đồ dùng, sự vật gần gũi với học sinh lớp 2?`,
      options: ['Quyển sách giáo khoa', 'Chạy nhảy tung tăng', 'Xinh đẹp rạng rỡ', 'Nhanh nhẹn hoạt bát'],
      correct: 0,
      exp: '"Quyển sách giáo khoa" là danh từ chỉ đồ vật; các từ còn lại là hoạt động hoặc đặc điểm.'
    },
    {
      topic: 'Từ chỉ hoạt động',
      question: `Trong câu "Học sinh chăm chú lắng nghe cô giáo giảng bài.", từ nào chỉ hoạt động?`,
      options: ['lắng nghe, giảng bài', 'học sinh, cô giáo', 'chăm chú', 'bài học'],
      correct: 0,
      exp: '"Lắng nghe" và "giảng bài" là các từ chỉ hành động, hoạt động.'
    },
    {
      topic: 'Từ chỉ đặc điểm',
      question: `Từ nào dưới đây là từ chỉ màu sắc hoặc đặc điểm?`,
      options: ['Xanh ngắt', 'Đọc sách', 'Bút mực', 'Thầy giáo'],
      correct: 0,
      exp: '"Xanh ngắt" là từ chỉ đặc điểm màu sắc.'
    },
    {
      topic: 'Mẫu câu cơ bản',
      question: `Câu "Bạn Mai là lớp trưởng gương mẫu của lớp em." thuộc kiểu câu nào?`,
      options: ['Câu giới thiệu (Ai là gì?)', 'Câu nêu hoạt động (Ai làm gì?)', 'Câu nêu đặc điểm (Ai thế nào?)', 'Câu hỏi'],
      correct: 0,
      exp: 'Câu có cấu trúc "Chủ ngữ + là + danh từ/cụm danh từ" là câu giới thiệu (Ai là gì?).'
    },
    {
      topic: 'Dấu câu',
      question: `Để kết thúc một câu kể thông thường, em dùng dấu câu nào?`,
      options: ['Dấu chấm (.)', 'Dấu chấm hỏi (?)', 'Dấu chấm than (!)', 'Dấu hai chấm (:)'],
      correct: 0,
      exp: 'Dấu chấm (.) đặt ở cuối câu kể khi câu diễn đạt trọn vẹn một ý.'
    },
    {
      topic: 'Đọc hiểu bài học thứ hai',
      question: `Trong bài "${spec.readings[1] || spec.readings[0]}", nội dung chính khuyên chúng ta điều gì?`,
      options: [
        'Chăm chỉ rèn luyện, yêu thương và giúp đỡ mọi người',
        'Chỉ nên ở nhà xem ti vi cả ngày',
        'Không cần vâng lời thầy cô và cha mẹ',
        'Không tham gia các hoạt động tập thể'
      ],
      correct: 0,
      exp: `Bài học "${spec.readings[1] || spec.readings[0]}" giáo dục phẩm chất tốt đẹp cho học sinh.`
    },
    {
      topic: 'Quy tắc viết hoa',
      question: `Tên người nào sau đây được viết đúng quy tắc chính tả?`,
      options: ['Nguyễn Thị Mai', 'nguyễn Thị Mai', 'Nguyễn thị mai', 'nguyễn thị mai'],
      correct: 0,
      exp: 'Khi viết tên người Việt Nam, cần viết hoa chữ cái đầu của mỗi tiếng tạo nên tên đó.'
    },
    {
      topic: 'Chính tả vần',
      question: `Điền vần thích hợp vào chỗ trống trong từ "chong ch...":`,
      options: ['óng', 'úng', 'ang', 'iêng'],
      correct: 0,
      exp: 'Từ đúng là "chong chóng".'
    },
    {
      topic: 'Từ ngữ chỉ tình cảm',
      question: `Từ nào sau đây thể hiện tình cảm quý mến, gắn bó của bạn bè?`,
      options: ['Thân thiết', 'Ghen tị', 'Giận hờn', 'Bực bội'],
      correct: 0,
      exp: '"Thân thiết" là từ ngữ thể hiện tình cảm bạn bè thân ái, gắn bó.'
    },
    {
      topic: 'Nhận biết bộ phận câu',
      question: `Trong câu "Các bạn học sinh đang tưới hoa.", bộ phận trả lời cho câu hỏi "Ai?" là:`,
      options: ['Các bạn học sinh', 'đang tưới hoa', 'tưới hoa', 'hoa tươi'],
      correct: 0,
      exp: '"Các bạn học sinh" là từ ngữ chỉ người làm chủ thể, trả lời câu hỏi "Ai?".'
    },
    {
      topic: 'Nhận biết bộ phận câu',
      question: `Trong câu "Đôi mắt chú mèo tròn xoe như hòn bi ve.", bộ phận trả lời cho câu hỏi "Thế nào?" là:`,
      options: ['tròn xoe như hòn bi ve', 'Đôi mắt', 'chú mèo', 'hòn bi ve'],
      correct: 0,
      exp: '"Tròn xoe như hòn bi ve" nêu đặc điểm đôi mắt chú mèo, trả lời cho câu hỏi "Thế nào?".'
    },
    {
      topic: 'Từ chỉ loài vật',
      question: `Con vật nào thường được nuôi trong gia đình để bắt chuột?`,
      options: ['Con mèo', 'Con voi', 'Con hổ', 'Con hươu'],
      correct: 0,
      exp: 'Mèo là con vật nuôi quen thuộc trong nhà có ích bắt chuột.'
    },
    {
      topic: 'Từ chỉ nghề nghiệp',
      question: `Người làm nghề khám và chữa bệnh cho mọi người được gọi là:`,
      options: ['Bác sĩ', 'Thầy giáo', 'Chú công an', 'Bác nông dân'],
      correct: 0,
      exp: 'Bác sĩ (hoặc y sĩ, dược sĩ) là người làm nghề chăm sóc sức khỏe và chữa bệnh.'
    },
    {
      topic: 'Phân biệt s/x hoặc tr/ch',
      question: `Từ nào sau đây viết đúng chính tả?`,
      options: [
        roundId % 2 === 0 ? 'Sạch sẽ' : 'Trong trẻo',
        roundId % 2 === 0 ? 'Xạch sẽ' : 'Chong trẻo',
        roundId % 2 === 0 ? 'Sạch xẽ' : 'Trong chẻo',
        roundId % 2 === 0 ? 'Xạch xẽ' : 'Chong chẻo'
      ],
      correct: 0,
      exp: 'Từ viết đúng chính tả là "' + (roundId % 2 === 0 ? 'Sạch sẽ' : 'Trong trẻo') + '".'
    },
    {
      topic: 'Từ ngữ chỉ người thân',
      question: `Người sinh ra bố của em, em gọi bằng gì?`,
      options: ['Bà nội (hoặc Ông nội)', 'Bà ngoại', 'Bác dâu', 'Cô ruột'],
      correct: 0,
      exp: 'Người sinh ra bố là ông bà nội; người sinh ra mẹ là ông bà ngoại.'
    },
    {
      topic: 'Bảng chữ cái',
      question: `Chữ cái nào sau đây có dấu mũ ở trên đầu?`,
      options: ['â, ê, ô', 'a, e, o', 'u, ư, i', 'b, c, d'],
      correct: 0,
      exp: 'Các chữ cái có dấu mũ: â, ê, ô.'
    },
    {
      topic: 'Lời nói giao tiếp',
      question: `Khi vô tình va phải bạn làm bạn ngã, em cần nói câu gì đầu tiên?`,
      options: ['"Mình xin lỗi bạn, bạn có đau không?"', '"Tại bạn đi không nhìn đường đấy!"', '"Mặc kệ bạn."', '"Sao lại ngã vào mình?"'],
      correct: 0,
      exp: 'Khi mắc lỗi cần biết nói lời xin lỗi lịch sự, chân thành.'
    }
  ];

  l1Templates.forEach((tpl, idx) => {
    questions.push({
      id: idx + 1,
      level: 1,
      levelText: 'Mức 1: Nhận biết',
      topic: tpl.topic,
      question: tpl.question,
      options: tpl.options,
      correctAnswer: tpl.correct,
      explanation: tpl.exp
    });
  });

  // 2. Mức 2: Thông hiểu (5 câu: ID 21 -> 25)
  const l2Templates = [
    {
      topic: 'Phân loại từ ngữ',
      question: `Trong dãy từ sau: "bàn học, phấn trắng, cô giáo, nghe giảng, chăm chỉ", từ nào là từ chỉ hoạt động?`,
      options: ['nghe giảng', 'bàn học', 'phấn trắng', 'chăm chỉ'],
      correct: 0,
      exp: '"Nghe giảng" là từ chỉ hoạt động; "bàn học, cô giáo, phấn" là sự vật; "chăm chỉ" là đặc điểm.'
    },
    {
      topic: 'Phân biệt kiểu câu',
      question: `Xác định kiểu câu của câu sau: "Cánh đồng lúa chín vàng rực dưới ánh nắng mặt trời."`,
      options: ['Câu nêu đặc điểm (Ai thế nào?)', 'Câu nêu hoạt động (Ai làm gì?)', 'Câu giới thiệu (Ai là gì?)', 'Câu khiến'],
      correct: 0,
      exp: 'Câu nêu đặc điểm màu sắc "chín vàng rực" của cánh đồng lúa, trả lời cho câu hỏi "Thế nào?".'
    },
    {
      topic: 'Đọc hiểu và liên kết ý',
      question: `Ý nghĩa bài học trong chủ đề "${spec.theme || spec.readings[0]}" là:`,
      options: [
        `Bồi dưỡng tình yêu quê hương đất nước, tình cảm gia đình và tình bạn bè trong sáng`,
        'Chỉ tập trung vào trò chơi điện tử',
        'Không cần quan tâm đến mọi người xung quanh',
        'Học sinh không cần giữ gìn sách vở'
      ],
      correct: 0,
      exp: `Chủ đề "${spec.theme || spec.readings[0]}" giáo dục phẩm chất yêu thương, chăm chỉ, trách nhiệm cho học sinh lớp 2.`
    },
    {
      topic: 'Sắp xếp câu mạch lạc',
      question: `Sắp xếp các cụm từ sau thành câu hoàn chỉnh: "rất ngoan ngoãn / Bạn Nam / và chăm học"`,
      options: [
        'Bạn Nam rất ngoan ngoãn và chăm học.',
        'Rất ngoan ngoãn Bạn Nam và chăm học.',
        'Và chăm học Bạn Nam rất ngoan ngoãn.',
        'Bạn Nam và chăm học rất ngoan ngoãn.'
      ],
      correct: 0,
      exp: 'Thứ tự đúng: Chủ ngữ (Bạn Nam) + Vị ngữ (rất ngoan ngoãn và chăm học).'
    },
    {
      topic: 'Sử dụng dấu câu phù hợp',
      question: `Điền dấu câu thích hợp vào ô trống: "Ôi, bông hoa hồng nhung nở đẹp quá[...]"`,
      options: ['Dấu chấm than (!)', 'Dấu chấm hỏi (?)', 'Dấu chấm (.)', 'Dấu phẩy (,)'],
      correct: 0,
      exp: 'Câu bắt đầu bằng từ cảm thán "Ôi" và bộc lộ cảm xúc khen ngợi "đẹp quá" nên cuối câu đặt dấu chấm than (!).'
    }
  ];

  l2Templates.forEach((tpl, idx) => {
    questions.push({
      id: 21 + idx,
      level: 2,
      levelText: 'Mức 2: Thông hiểu',
      topic: tpl.topic,
      question: tpl.question,
      options: tpl.options,
      correctAnswer: tpl.correct,
      explanation: tpl.exp
    });
  });

  // 3. Mức 3: Vận dụng (5 câu: ID 26 -> 30)
  const l3Templates = [
    {
      topic: 'Thành ngữ - Tục ngữ Trạng Nguyên',
      question: `Điền từ còn thiếu vào câu tục ngữ: "${spec.idioms[0] || 'Có công mài sắt, có ngày nên kim'}":`,
      options: [
        spec.idioms[0] ? `"${spec.idioms[0]}"` : '"Có công mài sắt, có ngày nên kim"',
        '"Ăn ốc nói mò"',
        '"Chân ướt chân ráo"',
        '"Tai vách mạch rừng"'
      ],
      correct: 0,
      exp: `Câu ca dao, tục ngữ chuẩn: ${spec.idioms[0] || 'Có công mài sắt, có ngày nên kim'}.`
    },
    {
      topic: 'Giải câu đố Trạng Nguyên',
      question: `Giải câu đố sau:\n"${spec.riddle.text}"\nLà cái gì / con gì?`,
      options: [spec.riddle.answer, ...spec.riddle.distractors],
      correct: 0,
      exp: `Đáp án chính xác của câu đố Trạng Nguyên dân gian là: ${spec.riddle.answer}.`
    },
    {
      topic: 'Viết đoạn văn ngắn',
      question: `Để viết một đoạn văn ngắn (3 - 4 câu) giới thiệu về một đồ dùng học tập em yêu thích, em nên triển khai theo trình tự nào?`,
      options: [
        '1. Giới thiệu tên đồ dùng -> 2. Tả hình dáng màu sắc -> 3. Nêu công dụng và cách giữ gìn',
        '1. Nói cảm xúc kết bài -> 2. Kể chuyện đi chơi -> 3. Không nhắc tên đồ vật',
        '1. Kể tên bạn bè -> 2. Tả sân trường -> 3. Đi ngủ',
        '1. Tả bầu trời -> 2. Tả con chim -> 3. Nộp bài'
      ],
      correct: 0,
      exp: 'Trình tự viết đoạn văn miêu tả đồ vật chuẩn lớp 2: Tên đồ vật -> Đặc điểm nổi bật (hình dáng, màu sắc) -> Công dụng & tình cảm giữ gìn.'
    },
    {
      topic: 'Tình huống giao tiếp văn hóa',
      question: `Khi nhận được quà sinh nhật từ người thân hoặc bạn bè, em nên nói gì để thể hiện sự lịch thiệp và biết ơn?`,
      options: [
        '"Cháu/Tớ cảm ơn rất nhiều ạ! Món quà này thật ý nghĩa."',
        '"Quà này bình thường thôi."',
        '"Sao không mua cho tớ món đắt hơn?"',
        'Im lặng cầm lấy rồi bỏ đi'
      ],
      correct: 0,
      exp: 'Cần biết nói lời cảm ơn chân thành, lễ phép khi đón nhận tình cảm và món quà từ người khác.'
    },
    {
      topic: 'Vận dụng tổng hợp Trạng Nguyên',
      question: `Chọn câu văn có hình ảnh so sánh đẹp và sinh động nhất:`,
      options: [
        roundId % 2 === 0
          ? 'Cầu Thê Húc màu son, cong cong như con tôm dẫn vào đền Ngọc Sơn.'
          : 'Đêm hè, vầng trăng tròn vành vạnh như chiếc đĩa ngọc lơ lửng trên trời.',
        'Cái bàn này là hình chữ nhật bằng gỗ ép.',
        'Em đi học từ sáng sớm đến tận chiều tối.',
        'Hôm nay trời nhiều mây và có thể sẽ có mưa.'
      ],
      correct: 0,
      exp: 'Câu có sử dụng biện pháp so sánh nghệ thuật ("cong cong như con tôm" hoặc "như chiếc đĩa ngọc") giúp câu văn giàu hình ảnh và cảm xúc.'
    }
  ];

  l3Templates.forEach((tpl, idx) => {
    questions.push({
      id: 26 + idx,
      level: 3,
      levelText: 'Mức 3: Vận dụng',
      topic: tpl.topic,
      question: tpl.question,
      options: tpl.options,
      correctAnswer: tpl.correct,
      explanation: tpl.exp
    });
  });

  // Shuffles options and randomly balances correct answers among A, B, C, D
  return shuffleQuestionsList(questions);
}
