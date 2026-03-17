export interface Word {
  id: string | number;
  chinese: string;
  pinyin: string;
  vietnamese: string;
  category?: string;
  exampleChinese?: string;
  examplePinyin?: string;
  exampleVietnamese?: string;
}

export const vocabulary: Word[] = [
  { 
    id: 1, 
    chinese: "时间", 
    pinyin: "Shíjiān", 
    vietnamese: "Thời gian",
    exampleChinese: "你有时间吗？",
    examplePinyin: "Nǐ yǒu shíjiān ma?",
    exampleVietnamese: "Bạn có thời gian không?"
  },
  { 
    id: 2, 
    chinese: "日/天", 
    pinyin: "Rì/tiān", 
    vietnamese: "Ngày",
    exampleChinese: "今天是3月5日。",
    examplePinyin: "Jīntiān shì sān yuè wǔ rì.",
    exampleVietnamese: "Hôm nay là ngày 5 tháng 3."
  },
  { 
    id: 3, 
    chinese: "周", 
    pinyin: "Zhōu", 
    vietnamese: "Tuần",
    exampleChinese: "这周我很忙。",
    examplePinyin: "Zhè zhōu wǒ hěn máng.",
    exampleVietnamese: "Tuần này tôi rất bận."
  },
  { 
    id: 4, 
    chinese: "月", 
    pinyin: "Yuè", 
    vietnamese: "Tháng",
    exampleChinese: "一个月有三十天。",
    examplePinyin: "Yīgè yuè yǒu sānshí tiān.",
    exampleVietnamese: "Một tháng có ba mươi ngày."
  },
  { 
    id: 5, 
    chinese: "年", 
    pinyin: "Nián", 
    vietnamese: "Năm",
    exampleChinese: "今年我要学中文。",
    examplePinyin: "Jīnnián wǒ yào xué Zhōngwén.",
    exampleVietnamese: "Năm nay tôi muốn học tiếng Trung."
  },
  { 
    id: 6, 
    chinese: "小时/点", 
    pinyin: "Xiǎoshí/Diǎn", 
    vietnamese: "Tiếng/Giờ",
    exampleChinese: "现在是10点。",
    examplePinyin: "Xiànzài shì shí diǎn.",
    exampleVietnamese: "Bây giờ là 10 giờ."
  },
  { 
    id: 7, 
    chinese: "分钟", 
    pinyin: "Fēnzhōng", 
    vietnamese: "Phút",
    exampleChinese: "等我五分钟。",
    examplePinyin: "Děng wǒ wǔ fēnzhōng.",
    exampleVietnamese: "Đợi tôi năm phút."
  },
  { 
    id: 8, 
    chinese: "秒", 
    pinyin: "miǎo", 
    vietnamese: "Giây",
    exampleChinese: "一分钟有六十秒。",
    examplePinyin: "Yī fēnzhōng yǒu liùshí miǎo.",
    exampleVietnamese: "Một phút có sáu mươi giây."
  },
  { 
    id: 9, 
    chinese: "星期一/周一", 
    pinyin: "Xīngqī yī/zhōuyī", 
    vietnamese: "Thứ hai",
    exampleChinese: "星期一我要上班。",
    examplePinyin: "Xīngqīyī wǒ yào shàngbān.",
    exampleVietnamese: "Thứ hai tôi phải đi làm."
  },
  { 
    id: 10, 
    chinese: "星期二/周二", 
    pinyin: "Xīngqī èr/zhōu'èr", 
    vietnamese: "Thứ ba",
    exampleChinese: "周二我们见面吧。",
    examplePinyin: "Zhōu'èr wǒmen jiànmiàn ba.",
    exampleVietnamese: "Thứ ba chúng ta gặp nhau nhé."
  },
  { 
    id: 11, 
    chinese: "星期三/周三", 
    pinyin: "Xīngqī sān/zhōusān", 
    vietnamese: "Thứ Tư",
    exampleChinese: "星期三有中文课。",
    examplePinyin: "Xīngqī sān yǒu Zhōngwén kè.",
    exampleVietnamese: "Thứ Tư có tiết học tiếng Trung."
  },
  { 
    id: 12, 
    chinese: "星期四/周四", 
    pinyin: "Xīngqī sì/zhōu sì", 
    vietnamese: "Thứ năm",
    exampleChinese: "今天是星期四。",
    examplePinyin: "Jīntiān shì xīngqīsì.",
    exampleVietnamese: "Hôm nay là thứ năm."
  },
  { 
    id: 13, 
    chinese: "星期五/周五", 
    pinyin: "Xīngqī wǔ/zhōu wǔ", 
    vietnamese: "Thứ sáu",
    exampleChinese: "周五晚上去吃饭吗？",
    examplePinyin: "Zhōuwǔ wǎnshàng qù chīfàn ma?",
    exampleVietnamese: "Tối thứ sáu đi ăn cơm không?"
  },
  { 
    id: 14, 
    chinese: "星期六/周六", 
    pinyin: "Xīngqī Liù/zhōu liù", 
    vietnamese: "Thứ bảy",
    exampleChinese: "今天是星期六。",
    examplePinyin: "Jīntiān shì xīngqīliù.",
    exampleVietnamese: "Hôm nay là thứ bảy."
  },
  { 
    id: 15, 
    chinese: "星期天/礼拜天", 
    pinyin: "Xīngqī Tiān/ lǐbài tiān", 
    vietnamese: "Chủ nhật",
    exampleChinese: "星期天我休息。",
    examplePinyin: "Xīngqītiān wǒ xiūxi.",
    exampleVietnamese: "Chủ nhật tôi nghỉ ngơi."
  },
  { 
    id: 16, 
    chinese: "周末", 
    pinyin: "Zhōumò", 
    vietnamese: "Cuối tuần",
    exampleChinese: "周末你有空吗？",
    examplePinyin: "Zhōumò nǐ yǒu kòng ma?",
    exampleVietnamese: "Cuối tuần bạn có rảnh không?"
  },
  { 
    id: 17, 
    chinese: "上午", 
    pinyin: "Shàngwǔ", 
    vietnamese: "Buổi sáng (0-12H)",
    exampleChinese: "今天上午你吃什么？",
    examplePinyin: "Jīntiān shàngwǔ nǐ chī shénme?",
    exampleVietnamese: "Sáng nay bạn ăn gì?"
  },
  { 
    id: 18, 
    chinese: "早上", 
    pinyin: "Zǎoshang", 
    vietnamese: "Thức dậy-10H",
    exampleChinese: "我早上六点起床。",
    examplePinyin: "Wǒ zǎoshang liù diǎn qǐchuáng.",
    exampleVietnamese: "Tôi thức dậy lúc 6 giờ sáng."
  },
  { 
    id: 19, 
    chinese: "中午", 
    pinyin: "Zhōngwǔ", 
    vietnamese: "Buổi trưa (12h-13H)",
    exampleChinese: "中午我们一起吃饭吧。",
    examplePinyin: "Zhōngwǔ wǒmen yīqǐ chīfàn ba.",
    exampleVietnamese: "Trưa nay chúng ta cùng đi ăn cơm nhé."
  },
  { 
    id: 20, 
    chinese: "下午", 
    pinyin: "Xiàwǔ", 
    vietnamese: "Buổi chiều (13H-18H)",
    exampleChinese: "下午三点开会。",
    examplePinyin: "Xiàwǔ sān diǎn kāihuì.",
    exampleVietnamese: "3 giờ chiều họp."
  },
  { 
    id: 21, 
    chinese: "晚上", 
    pinyin: "Wǎnshàng", 
    vietnamese: "Buổi tối (18H-23H)",
    exampleChinese: "晚上我学中文。",
    examplePinyin: "Wǎnshàng wǒ xué Zhōngwén.",
    exampleVietnamese: "Buổi tối tôi học tiếng Trung."
  },
  { 
    id: 22, 
    chinese: "上周", 
    pinyin: "Shàng zhōu", 
    vietnamese: "Tuần trước",
    exampleChinese: "上周我去旅游了。",
    examplePinyin: "Shàng zhōu wǒ qù lǚyóu le.",
    exampleVietnamese: "Tuần trước tôi đã đi du lịch."
  },
  { 
    id: 23, 
    chinese: "本周", 
    pinyin: "Běn zhōu", 
    vietnamese: "Tuần này",
    exampleChinese: "本周工作很多。",
    examplePinyin: "Běn zhōu gōngzuò hěn duō.",
    exampleVietnamese: "Tuần này công việc rất nhiều."
  },
  { 
    id: 24, 
    chinese: "下周", 
    pinyin: "Xià zhōu", 
    vietnamese: "Tuần sau",
    exampleChinese: "下周见！",
    examplePinyin: "Xià zhōu jiàn!",
    exampleVietnamese: "Tuần sau gặp lại!"
  },
  { 
    id: 25, 
    chinese: "上个月", 
    pinyin: "Shàng gè yuè", 
    vietnamese: "Tháng trước",
    exampleChinese: "上个月天气很热。",
    examplePinyin: "Shàng gè yuè tiānqì hěn rè.",
    exampleVietnamese: "Tháng trước thời tiết rất nóng."
  },
  { 
    id: 26, 
    chinese: "这个月", 
    pinyin: "Zhège yuè", 
    vietnamese: "Tháng này",
    exampleChinese: "这个月我有计划。",
    examplePinyin: "Zhège yuè wǒ yǒu jìhuà.",
    exampleVietnamese: "Tháng này tôi có kế hoạch."
  },
  { 
    id: 27, 
    chinese: "下个月", 
    pinyin: "Xià gè yuè", 
    vietnamese: "Tháng sau",
    exampleChinese: "下个月是我的生日。",
    examplePinyin: "Xià gè yuè shì wǒ de shēngrì.",
    exampleVietnamese: "Tháng sau là sinh nhật của tôi."
  },
  { 
    id: 28, 
    chinese: "去年", 
    pinyin: "Qù nián", 
    vietnamese: "Năm ngoái",
    exampleChinese: "去年我在中国。",
    examplePinyin: "Qùnián wǒ zài Zhōngguó.",
    exampleVietnamese: "Năm ngoái tôi ở Trung Quốc."
  },
  { 
    id: 29, 
    chinese: "今年", 
    pinyin: "Jīnnián", 
    vietnamese: "Năm nay",
    exampleChinese: "今年你有什么计划吗？",
    examplePinyin: "Jīnnián nǐ yǒu shénme jìhuà ma?",
    exampleVietnamese: "Năm nay bạn có kế hoạch gì không?"
  },
  { 
    id: 30, 
    chinese: "明年", 
    pinyin: "Míngnián", 
    vietnamese: "Năm sau",
    exampleChinese: "明年我想去北京。",
    examplePinyin: "Míngnián wǒ xiǎng qù Běijīng.",
    exampleVietnamese: "Năm sau tôi muốn đi Bắc Kinh."
  },
  { 
    id: 31, 
    chinese: "上旬", 
    pinyin: "Shàngxún", 
    vietnamese: "Đầu tháng (1–10)",
    exampleChinese: "三月上旬我们要开会。",
    examplePinyin: "Sānyuè shàngxún wǒmen yào kāihuì.",
    exampleVietnamese: "Đầu tháng 3 chúng tôi phải họp."
  },
  { 
    id: 32, 
    chinese: "中旬", 
    pinyin: "zhōngxún", 
    vietnamese: "Giữa tháng (11-20)",
    exampleChinese: "五月中旬天气不错。",
    examplePinyin: "Wǔyuè zhōngxún tiānqì bùcuò.",
    exampleVietnamese: "Giữa tháng 5 thời tiết khá tốt."
  },
  { 
    id: 33, 
    chinese: "下旬", 
    pinyin: "Xiàxún", 
    vietnamese: "Cuối tháng (21–31)",
    exampleChinese: "本月下旬我有空。",
    examplePinyin: "Běnyuè xiàxún wǒ yǒu kòng.",
    exampleVietnamese: "Cuối tháng này tôi rảnh."
  },
  { 
    id: 34, 
    chinese: "跑步", 
    pinyin: "Pǎobù", 
    vietnamese: "Chạy bộ",
    exampleChinese: "我们一起去跑步吧！",
    examplePinyin: "Wǒmen yīqǐ qù pǎobù ba!",
    exampleVietnamese: "Chúng ta cùng đi chạy bộ nhé!"
  },
  { 
    id: 35, 
    chinese: "爬山", 
    pinyin: "Páshān", 
    vietnamese: "Leo núi",
    exampleChinese: "你喜欢爬山还是跑步？",
    examplePinyin: "Nǐ xǐhuan páshān háishì pǎobù?",
    exampleVietnamese: "Bạn thích leo núi hay chạy bộ?"
  },
  { 
    id: 36, 
    chinese: "散步", 
    pinyin: "Sànbù", 
    vietnamese: "Đi bộ",
    exampleChinese: "晚饭后我们去散步吧。",
    examplePinyin: "Wǎnfàn hòu wǒmen qù sànbù ba.",
    exampleVietnamese: "Sau bữa tối chúng ta đi tản bộ nhé."
  },
  { 
    id: 37, 
    chinese: "骑自行车", 
    pinyin: "Qí zìxíngchē", 
    vietnamese: "Đạp xe",
    exampleChinese: "我骑自行车去学校。",
    examplePinyin: "Wǒ qí zìxíngchē qù xuéxiào.",
    exampleVietnamese: "Tôi đạp xe đến trường."
  },
  { 
    id: 38, 
    chinese: "骑摩托车", 
    pinyin: "Qí mótuō chē", 
    vietnamese: "Đi xe máy",
    exampleChinese: "我骑摩托车上班。",
    examplePinyin: "Wǒ qí mótuōchē shàngbān.",
    exampleVietnamese: "Tôi đi xe máy đi làm."
  },
  { 
    id: 39, 
    chinese: "开汽车", 
    pinyin: "Kāi qìchē", 
    vietnamese: "Đi ô tô",
    exampleChinese: "他开汽车去公司。",
    examplePinyin: "Tā kāi qìchē qù gōngsī.",
    exampleVietnamese: "Anh ấy lái ô tô đến công ty."
  },
  { 
    id: 40, 
    chinese: "坐公交车", 
    pinyin: "Zuò gōngjiāo chē", 
    vietnamese: "Đi xe bus",
    exampleChinese: "坐公交车大约要30分钟。",
    examplePinyin: "Zuò gōngjiāochē dàyuē yào sānshí fēnzhōng.",
    exampleVietnamese: "Đi xe buýt mất khoảng 30 phút."
  },
  { 
    id: 41, 
    chinese: "公司", 
    pinyin: "Gōngsī", 
    vietnamese: "Công ty",
    exampleChinese: "你在哪家公司工作？",
    examplePinyin: "Nǐ zài nǎ jiā gōngsī gōngzuò?",
    exampleVietnamese: "Bạn làm việc ở công ty nào?"
  },
  { 
    id: 42, 
    chinese: "离", 
    pinyin: "Lí", 
    vietnamese: "Cách xa",
    exampleChinese: "你家离这里远吗？",
    examplePinyin: "Nǐ jiā lí zhèlǐ yuǎn ma?",
    exampleVietnamese: "Nhà bạn cách đây có xa không?"
  },
  { 
    id: 43, 
    chinese: "远", 
    pinyin: "Yuǎn", 
    vietnamese: "Xa",
    exampleChinese: "我家离这里很远。",
    examplePinyin: "Wǒ jiā lí zhèlǐ hěn yuǎn.",
    exampleVietnamese: "Nhà tôi cách đây rất xa."
  },
  { 
    id: 44, 
    chinese: "近", 
    pinyin: "Jìn", 
    vietnamese: "Gần",
    exampleChinese: "公司离我家很近。",
    examplePinyin: "Gōngsī lí wǒ jiā hěn jìn.",
    exampleVietnamese: "Công ty cách nhà tôi rất gần."
  },
  { 
    id: 45, 
    chinese: "米", 
    pinyin: "Mǐ", 
    vietnamese: "Mét",
    exampleChinese: "离这里只有一百米。",
    examplePinyin: "Lí zhèlǐ zhǐyǒu yībǎi mǐ.",
    exampleVietnamese: "Cách đây chỉ có 100 mét."
  },
  { 
    id: 46, 
    chinese: "公里", 
    pinyin: "Gōnglǐ", 
    vietnamese: "Kilômét",
    exampleChinese: "我家离这里8公里。",
    examplePinyin: "Wǒ jiā lí zhèlǐ bā gōnglǐ.",
    exampleVietnamese: "Nhà tôi cách đây 8 cây số."
  },
  { 
    id: 47, 
    chinese: "工作", 
    pinyin: "Gōngzuò", 
    vietnamese: "Công việc",
    exampleChinese: "你的工作是什么？",
    examplePinyin: "Nǐ de gōngzuò shì shénme?",
    exampleVietnamese: "Công việc của bạn là gì?"
  },
  { 
    id: 48, 
    chinese: "经验", 
    pinyin: "Jīngyàn", 
    vietnamese: "Kinh nghiệm",
    exampleChinese: "我有4年的工作经验。",
    examplePinyin: "Wǒ yǒu sì nián de gōngzuò jīngyàn.",
    exampleVietnamese: "Tôi có 4 năm kinh nghiệm làm việc."
  },
  { 
    id: 49, 
    chinese: "简历", 
    pinyin: "jiǎnlì", 
    vietnamese: "Sơ yếu lý lịch (CV)",
    exampleChinese: "这是我的简历。",
    examplePinyin: "Zhè shì wǒ de jiǎnlì.",
    exampleVietnamese: "Đây là CV của tôi."
  },
  { 
    id: 50, 
    chinese: "薪资", 
    pinyin: "Xīnzī", 
    vietnamese: "Tiền lương",
    exampleChinese: "你希望的薪资是多少？",
    examplePinyin: "Nǐ xīwàng de xīnzī shì duōshǎo?",
    exampleVietnamese: "Mức lương mong muốn của bạn là bao nhiêu?"
  },
  { 
    id: 51, 
    chinese: "白班", 
    pinyin: "Báibān", 
    vietnamese: "Ca ngày",
    exampleChinese: "这周我上白班。",
    examplePinyin: "Zhè zhōu wǒ shàng báibān.",
    exampleVietnamese: "Tuần này tôi làm ca ngày."
  },
  { 
    id: 52, 
    chinese: "夜班", 
    pinyin: "Yèbān", 
    vietnamese: "Ca đêm",
    exampleChinese: "你可以去夜班吗？",
    examplePinyin: "Nǐ kěyǐ qù yèbān ma?",
    exampleVietnamese: "Bạn có thể làm ca đêm không?"
  },
  { 
    id: 53, 
    chinese: "离开", 
    pinyin: "Líkāi", 
    vietnamese: "Rời đi",
    exampleChinese: "他已经离开公司了。",
    examplePinyin: "Tā yǐjīng líkāi gōngsī le.",
    exampleVietnamese: "Anh ấy đã rời khỏi công ty rồi."
  },
  { 
    id: 54, 
    chinese: "优点", 
    pinyin: "Yōudiǎn", 
    vietnamese: "Ưu điểm",
    exampleChinese: "你的优点是什么？",
    examplePinyin: "Nǐ de yōudiǎn shì shénme?",
    exampleVietnamese: "Ưu điểm của bạn là gì?"
  },
  { 
    id: 55, 
    chinese: "缺点", 
    pinyin: "Quēdiǎn", 
    vietnamese: "Nhược điểm",
    exampleChinese: "每个人都有缺点。",
    examplePinyin: "Měi gè rén dōu yǒu quēdiǎn.",
    exampleVietnamese: "Mỗi người đều có nhược điểm."
  },
  { 
    id: 56, 
    chinese: "选择", 
    pinyin: "Xuǎnzé", 
    vietnamese: "Lựa chọn",
    exampleChinese: "为什么你选择我们公司？",
    examplePinyin: "Wèishéme nǐ xuǎnzé wǒmen gōngsī?",
    exampleVietnamese: "Tại sao bạn chọn công ty chúng tôi?"
  },
  { 
    id: 57, 
    chinese: "应聘", 
    pinyin: "Yìngpìn", 
    vietnamese: "Ứng tuyển",
    exampleChinese: "我想应聘这个职位。",
    examplePinyin: "Wǒ xiǎng yìngpìn zhège zhíwèi.",
    exampleVietnamese: "Tôi muốn ứng tuyển vào vị trí này."
  },
  { 
    id: 58, 
    chinese: "面试", 
    pinyin: "Miànshì", 
    vietnamese: "Phỏng vấn",
    exampleChinese: "明天我有面试。",
    examplePinyin: "Míngtiān wǒ yǒu miànshì.",
    exampleVietnamese: "Ngày mai tôi có buổi phỏng vấn."
  },
  { 
    id: 59, 
    chinese: "通过面试", 
    pinyin: "Tōngguò miànshì", 
    vietnamese: "Vượt qua phỏng vấn",
    exampleChinese: "恭喜你通过面试！",
    examplePinyin: "Gōngxǐ nǐ tōngguò miànshì!",
    exampleVietnamese: "Chúc mừng bạn đã vượt qua phỏng vấn!"
  },
  { 
    id: 60, 
    chinese: "老板", 
    pinyin: "Lǎobǎn", 
    vietnamese: "Ông chủ / Sếp",
    exampleChinese: "我们的老板很客气。",
    examplePinyin: "Wǒmen de lǎobǎn hěn kèqi.",
    exampleVietnamese: "Sếp của chúng tôi rất lịch sự."
  },
  { 
    id: 61, 
    chinese: "客户", 
    pinyin: "Kèhù", 
    vietnamese: "Khách hàng",
    exampleChinese: "今天要见一位重要的客户。",
    examplePinyin: "Jīntiān yào jiàn yī wèi zhòngyào de kèhù.",
    exampleVietnamese: "Hôm nay phải gặp một khách hàng quan trọng."
  },
  { 
    id: 62, 
    chinese: "加班", 
    pinyin: "Jiābān", 
    vietnamese: "Làm thêm giờ (OT)",
    exampleChinese: "你可以加班吗？",
    examplePinyin: "Nǐ kěyǐ jiābān ma?",
    exampleVietnamese: "Bạn có thể làm thêm giờ không?"
  },
  { 
    id: 63, 
    chinese: "符合", 
    pinyin: "Fúhé", 
    vietnamese: "Phù hợp",
    exampleChinese: "你不符合我们的要求。",
    examplePinyin: "Nǐ bù fúhé wǒmen de yāoqiú.",
    exampleVietnamese: "Bạn không phù hợp với yêu cầu của chúng tôi."
  },
  { 
    id: 64, 
    chinese: "要求", 
    pinyin: "Yāoqiú", 
    vietnamese: "Yêu cầu",
    exampleChinese: "公司有什么要求？",
    examplePinyin: "Gōngsī yǒu shénme yāoqiú?",
    exampleVietnamese: "Công ty có những yêu cầu gì?"
  },
  { 
    id: 65, 
    chinese: "负责", 
    pinyin: "Fùzé", 
    vietnamese: "Phụ trách / Có trách nhiệm",
    exampleChinese: "他负责这个项目。",
    examplePinyin: "Tā fùzé zhège xiàngmù.",
    exampleVietnamese: "Anh ấy phụ trách dự án này."
  },
  { 
    id: 66, 
    chinese: "离职", 
    pinyin: "Lízhí", 
    vietnamese: "Nghỉ việc",
    exampleChinese: "为什么你离职上一家公司？",
    examplePinyin: "Wèishéme nǐ lízhí shàng yījiā gōngsī?",
    exampleVietnamese: "Tại sao bạn nghỉ việc ở công ty trước?"
  },
  { 
    id: 67, 
    chinese: "领域", 
    pinyin: "Lǐngyù", 
    vietnamese: "Lĩnh vực",
    exampleChinese: "在这个领域你有几年的经验了？",
    examplePinyin: "Zài zhège lǐngyù nǐ yǒu jǐ nián de jīngyàn le?",
    exampleVietnamese: "Trong lĩnh vực này bạn đã có mấy năm kinh nghiệm rồi?"
  },
  { 
    id: 68, 
    chinese: "生活", 
    pinyin: "Shēnghuó", 
    vietnamese: "Cuộc sống / Sinh sống",
    exampleChinese: "我想在这里工作和生活。",
    examplePinyin: "Wǒ xiǎng zài zhèlǐ gōngzuò hé shēnghuó.",
    exampleVietnamese: "Tôi muốn làm việc và sinh sống ở đây."
  },
  { 
    id: 69, 
    chinese: "希望", 
    pinyin: "Xīwàng", 
    vietnamese: "Hy vọng",
    exampleChinese: "我希望明天天气好。",
    examplePinyin: "Wǒ xīwàng míngtiān tiānqì hǎo.",
    exampleVietnamese: "Tôi hy vọng ngày mai thời tiết tốt."
  },
  { 
    id: 70, 
    chinese: "越南盾", 
    pinyin: "Yuènán dùn", 
    vietnamese: "Đồng Việt Nam (VND)",
    exampleChinese: "我希望的薪资是1500万越南盾。",
    examplePinyin: "Wǒ xīwàng de xīnzī shì yīqiān wǔbǎi wàn Yuènán dùn.",
    exampleVietnamese: "Mức lương tôi mong muốn là 15 triệu VNĐ."
  },
  { 
    id: 71, 
    chinese: "美元", 
    pinyin: "Měiyuán", 
    vietnamese: "Đô la Mỹ (USD)",
    exampleChinese: "一百美元是多少越南盾？",
    examplePinyin: "Yībǎi měiyuán shì duōshǎo Yuènán dùn?",
    exampleVietnamese: "100 USD là bao nhiêu tiền Việt?"
  },
  { 
    id: 72, 
    chinese: "毕业", 
    pinyin: "Bìyè", 
    vietnamese: "Tốt nghiệp",
    exampleChinese: "我毕业于河内工业大学。",
    examplePinyin: "Wǒ bìyè yú Hénèi gōngyè dàxué.",
    exampleVietnamese: "Tôi tốt nghiệp trường Đại học Công nghiệp Hà Nội."
  },
  { 
    id: 73, 
    chinese: "河内工业大学", 
    pinyin: "Hénèi gōngyè dàxué", 
    vietnamese: "Đại học Công nghiệp Hà Nội",
    exampleChinese: "河内工业大学很大。",
    examplePinyin: "Hénèi gōngyè dàxué hěn dà.",
    exampleVietnamese: "Trường ĐH Công nghiệp Hà Nội rất lớn."
  },
  { 
    id: 74, 
    chinese: "专业", 
    pinyin: "zhuānyè", 
    vietnamese: "Chuyên ngành",
    exampleChinese: "我的专业是信息技术。",
    examplePinyin: "Wǒ de zhuānyè shì xìnxī jìshù.",
    exampleVietnamese: "Chuyên ngành của tôi là Công nghệ thông tin."
  },
  { 
    id: 75, 
    chinese: "信息技术", 
    pinyin: "xìnxī jìshù", 
    vietnamese: "Công nghệ thông tin (IT)",
    exampleChinese: "信息技术领域很有发展。",
    examplePinyin: "Xìnxī jìshù lǐngyù hěn yǒu fāzhǎn.",
    exampleVietnamese: "Lĩnh vực CNTT rất có triển vọng."
  },
  { 
    id: 76, 
    chinese: "职位", 
    pinyin: "Zhíwèi", 
    vietnamese: "Vị trí",
    exampleChinese: "为什么你应聘这个职位？",
    examplePinyin: "Wèishéme nǐ yìngpìn zhège zhíwèi?",
    exampleVietnamese: "Tại sao bạn ứng tuyển vào vị trí này?"
  },
  { 
    id: 77, 
    chinese: "已经", 
    pinyin: "Yǐjīng", 
    vietnamese: "Đã",
    exampleChinese: "我已经有4年的工作经验。",
    examplePinyin: "Wǒ yǐjīng yǒu sì nián de gōngzuò jīngyàn.",
    exampleVietnamese: "Tôi đã có 4 năm kinh nghiệm làm việc."
  },
];
