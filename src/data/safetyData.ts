export interface ChildAvatarOption {
  id: string;
  emoji: string;
  name: string;
  bgClass: string;
}

export interface StorySlide {
  slideNumber: number;
  title: string;
  visualEmoji: string;
  secondaryEmojis: string;
  illustrationBg: string;
  storyText: string;
  reflectionPrompt: string;
  reflectionAnswer: string;
}

export interface LearningModule {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  pillarLabel: string;
  icon: string;
  colorTheme: {
    cardBg: string;
    border: string;
    badgeBg: string;
    badgeText: string;
    buttonBg: string;
    buttonBorder: string;
  };
  rewardStars: number;
  summary: string;
  storySlides: StorySlide[];
}

export interface SimulationScenario {
  id: number;
  title: string;
  pillar: string;
  story: string;
  visualEmoji: string;
  isSafe: boolean;
  choices: string[];
  correctChoiceIndex: number;
  gentleFeedback: string;
  rewardStars: number;
}

export interface EvaluationQuestion {
  id: number;
  pillar: string;
  emoji: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface VolunteerStage {
  step: number;
  title: string;
  duration: string;
  emoji: string;
  activity: string;
  facilitatorTip: string;
}

export interface VolunteerGuideData {
  programTitle: string;
  location: string;
  partners: string[];
  targetParticipants: string;
  sessionStages: VolunteerStage[];
  communicationPrinciples: {
    dos: string[];
    donts: string[];
  };
  safetyProtocols: Array<{
    id: string;
    title: string;
    emoji: string;
    description: string;
  }>;
  prepChecklist: Array<{
    id: string;
    label: string;
    category: string;
  }>;
}

export interface ParticipantEvaluationRecord {
  id: string;
  code: string;
  nickname: string;
  avatar: string;
  ageGroup: string;
  preTestScore: number;
  postTestScore: number;
  completedModules: number;
  updatedAt: string;
}

export const CHILD_AVATARS: ChildAvatarOption[] = [
  {
    id: "kucing",
    emoji: "🐱",
    name: "Kucing Pemberani",
    bgClass: "bg-[#ECFDF5] border-[#10B981]",
  },
  {
    id: "kelinci",
    emoji: "🐰",
    name: "Kelinci Ceria",
    bgClass: "bg-[#FEF9C3] border-[#FACC15]",
  },
  {
    id: "singa",
    emoji: "🦁",
    name: "Singa Tangguh",
    bgClass: "bg-[#FEF9C3] border-[#F59E0B]",
  },
  {
    id: "burung-hantu",
    emoji: "🦉",
    name: "Burung Hantu Pintar",
    bgClass: "bg-[#ECFDF5] border-[#059669]",
  },
  {
    id: "panda",
    emoji: "🐼",
    name: "Panda Sahabat",
    bgClass: "bg-[#E0F2FE] border-[#38BDF8]",
  },
  {
    id: "lumba",
    emoji: "🐬",
    name: "Lumba-Lumba Gesit",
    bgClass: "bg-[#FFE4E6] border-[#FB7185]",
  },
];

export const LEARNING_MODULES: LearningModule[] = [
  {
    id: "mod-1",
    slug: "batasan-pribadi",
    title: "Tubuhku Berharga (Batasan Pribadi)",
    shortTitle: "Tubuhku Berharga",
    pillarLabel: "Pulau 1 • Batasan Diri",
    icon: "🛡️",
    rewardStars: 20,
    summary:
      "Belajar Aturan Baju Renang, mengenali bagian tubuh pribadi, dan berani berkata TIDAK dengan suara lantang.",
    colorTheme: {
      cardBg: "bg-[#ECFDF5]",
      border: "border-[#10B981]",
      badgeBg: "bg-[#059669]",
      badgeText: "text-white",
      buttonBg: "bg-[#10B981] hover:bg-[#059669] text-white",
      buttonBorder: "border-b-4 border-[#064E3B]",
    },
    storySlides: [
      {
        slideNumber: 1,
        title: "Aku Pemilik Tubuhku!",
        visualEmoji: "🧒✨",
        secondaryEmojis: "💪🌟🛡️",
        illustrationBg: "from-[#E0F2FE] to-[#BAE6FD]",
        storyText:
          "Tahukah kamu? Tubuhmu adalah milikmu sendiri yang sangat istimewa dan berharga! Kamu berhak menjaga tubuhmu agar selalu sehat, bersih, dan terasa aman setiap hari.",
        reflectionPrompt: "Siapa pemilik tubuhmu yang berharga?",
        reflectionAnswer:
          "Betul sekali! Kamu sendiri adalah pemilik tubuhmu, dan kamu berhak menjaganya agar tetap aman.",
      },
      {
        slideNumber: 2,
        title: "Aturan Baju Renang",
        visualEmoji: "🩱🩳",
        secondaryEmojis: "🚫✋🔒",
        illustrationBg: "from-[#FEF3C7] to-[#FDE68A]",
        storyText:
          "Bagian tubuh yang tertutup oleh baju renang (dada, bagian di antara paha, dan pantat) ditambah bibir adalah BAGIAN PRIBADI. Tidak ada seorang pun yang boleh melihat atau menyentuhnya.",
        reflectionPrompt: "Apa saja bagian tubuh pribadi yang harus dijaga?",
        reflectionAnswer:
          "Pintar! Bagian yang tertutup baju renang (dada, bagian bawah/kemaluan, pantat) serta bibir adalah bagian pribadimu.",
      },
      {
        slideNumber: 3,
        title: "Sentuhan Aman vs Tidak Aman",
        visualEmoji: "🤝💛",
        secondaryEmojis: "🖐️😊⚠️",
        illustrationBg: "from-[#D1FAE5] to-[#A7F3D0]",
        storyText:
          "Sentuhan aman membuatmu merasa disayangi dan nyaman, seperti tos tangan dengan teman atau pelukan Ibu saat kamu sedih. Pengecualian hanya saat dokter memeriksa kesehatanmu dengan ditemani orang tua.",
        reflectionPrompt:
          "Kapan dokter boleh memeriksa tubuh kita?",
        reflectionAnswer:
          "Tepat! Hanya saat kita sedang sakit atau diperiksa kesehatannya, dan HARUS didampingi oleh orang tua atau wali.",
      },
      {
        slideNumber: 4,
        title: "Tiga Langkah Jagoan: TIDAK, LARI, CERITA!",
        visualEmoji: "📢🏃‍♂️",
        secondaryEmojis: "🛑⚡👨‍👩‍👧",
        illustrationBg: "from-[#FFE4E6] to-[#FECDD3]",
        storyText:
          "Jika ada siapa pun yang mencoba menyentuh bagian pribadimu, lakukan 3 Jurus Jagoan: (1) Teriak 'TIDAK BOLEH!', (2) Segera LARI menjauh ke tempat ramai, dan (3) CERITAKAN kepada orang tua, guru, atau Kakak Relawan JEKATA!",
        reflectionPrompt: "Apa 3 Jurus Jagoan untuk melindungi diri?",
        reflectionAnswer:
          "Luar biasa! Katakan TIDAK, LARI menjauh ke tempat ramai, dan segera CERITA pada orang dewasa tepercaya!",
      },
    ],
  },
  {
    id: "mod-2",
    slug: "pengenalan-emosi",
    title: "Kenali Perasaanku (Pengenalan Emosi)",
    shortTitle: "Kenali Perasaanku",
    pillarLabel: "Pulau 2 • Radar Emosi",
    icon: "💛",
    rewardStars: 20,
    summary:
      "Mengenali perasaan Senang, Sedih, Takut, Marah, dan mendengarkan Alarm Tubuh saat merasa Tidak Nyaman.",
    colorTheme: {
      cardBg: "bg-[#FEF9C3]",
      border: "border-[#FACC15]",
      badgeBg: "bg-[#F59E0B]",
      badgeText: "text-white",
      buttonBg: "bg-[#FACC15] hover:bg-[#F59E0B] text-[#064E3B]",
      buttonBorder: "border-b-4 border-[#D97706]",
    },
    storySlides: [
      {
        slideNumber: 1,
        title: "Semua Perasaanku Penting!",
        visualEmoji: "😊😢😠",
        secondaryEmojis: "🌈💭💛",
        illustrationBg: "from-[#FEF3C7] to-[#FDE68A]",
        storyText:
          "Setiap hari hati kita bisa merasakan banyak hal: Senang saat bermain bersama teman di Desa Cibodas, Sedih saat mainan rusak, Marah saat diganggu, atau Takut saat gelap. Semua perasaan itu wajar!",
        reflectionPrompt: "Apakah boleh anak pemberani merasa sedih atau takut?",
        reflectionAnswer:
          "Boleh banget! Merasa takut atau sedih adalah hal yang wajar dan membantu kita tahu kapan kita butuh bantuan.",
      },
      {
        slideNumber: 2,
        title: "Alarm Ajaib di Dalam Tubuhku",
        visualEmoji: "🚨💓",
        secondaryEmojis: "😰🦋⚡",
        illustrationBg: "from-[#FFE4E6] to-[#FECDD3]",
        storyText:
          "Tubuh kita punya ALARM AJAIB! Saat kamu berada di situasi yang tidak aman, jantungmu bisa berdebar cepat, perut terasa mulas, atau tanganmu berkeringat dingin. Itu tandanya tubuhmu berkata: 'Hati-hati!'",
        reflectionPrompt: "Bagaimana rasanya saat Alarm Tubuh menyala?",
        reflectionAnswer:
          "Hebat! Jantung berdebar kencang, perut terasa tidak enak, atau badan gemetar adalah sinyal alarm tubuhmu.",
      },
      {
        slideNumber: 3,
        title: "Perasaan Nyaman vs Tidak Nyaman",
        visualEmoji: "🌸😣",
        secondaryEmojis: "✅❌🛡️",
        illustrationBg: "from-[#E0F2FE] to-[#BAE6FD]",
        storyText:
          "Jika seseorang berbicara atau memperlakukanmu dengan cara yang membuatmu merasa aneh, malu, takut, atau tidak nyaman, percayalah pada perasaanmu! Kamu tidak wajib menuruti hal yang membuatmu takut.",
        reflectionPrompt:
          "Apa yang harus kamu lakukan jika merasa tidak nyaman?",
        reflectionAnswer:
          "Benar! Percayai perasaanmu, segera menjauh, dan jangan diam saja.",
      },
      {
        slideNumber: 4,
        title: "Napas Balon Penenang Hati",
        visualEmoji: "🎈🌬️",
        secondaryEmojis: "🧘‍♂️🌿✨",
        illustrationBg: "from-[#D1FAE5] to-[#A7F3D0]",
        storyText:
          "Saat kamu merasa kaget atau takut, ayo tiup Balon Penenang: Tarik napas pelan dari hidung sambil menghitung 1-2-3, lalu tiupkan pelan lewat mulut seperti meniup balon besar. Setelah tenang, ceritakan perasaanmu pada orang tua!",
        reflectionPrompt: "Yuk coba tarik napas 1-2-3 dan hembuskan pelan!",
        reflectionAnswer:
          "Wah, kamu hebat! Napas Balon membuat hati dan pikiran kita kembali tenang dan siap bercerita.",
      },
    ],
  },
  {
    id: "mod-3",
    slug: "situasi-aman",
    title: "Aman atau Tidak Aman?",
    shortTitle: "Aman / Tidak Aman",
    pillarLabel: "Pulau 3 • Detektif Aman",
    icon: "🔍",
    rewardStars: 20,
    summary:
      "Membedakan Kejutan Baik vs Rahasia Buruk, serta mewaspadai bujukan hadiah atau ajakan ke tempat sepi.",
    colorTheme: {
      cardBg: "bg-[#E0F2FE]",
      border: "border-[#38BDF8]",
      badgeBg: "bg-[#0284C7]",
      badgeText: "text-white",
      buttonBg: "bg-[#38BDF8] hover:bg-[#0284C7] text-white",
      buttonBorder: "border-b-4 border-[#0284C7]",
    },
    storySlides: [
      {
        slideNumber: 1,
        title: "Kejutan Baik vs Rahasia Buruk",
        visualEmoji: "🎁🤫",
        secondaryEmojis: "🎂🎉⚠️",
        illustrationBg: "from-[#D1FAE5] to-[#A7F3D0]",
        storyText:
          "Kejutan Baik itu menyenangkan dan nantinya akan dibuka bersama, seperti kado ulang tahun untuk Ibu! Tapi kalau ada orang berkata: 'Jangan bilang siapa-siapa ya tentang sentuhan ini,' itu adalah RAHASIA BURUK!",
        reflectionPrompt: "Bolehkah kita menyimpan Rahasia Buruk?",
        reflectionAnswer:
          "TIDAK BOLEH! Rahasia yang membuatmu takut atau menyangkut tubuh pribadi harus langsung diceritakan kepada orang tua.",
      },
      {
        slideNumber: 2,
        title: "Waspada Bujukan Permen & Hadiah",
        visualEmoji: "🍬🎮",
        secondaryEmojis: "🚗🛑🙅",
        illustrationBg: "from-[#FEF3C7] to-[#FDE68A]",
        storyText:
          "Orang yang tidak kita kenal, atau bahkan orang yang kita kenal, kadang menawarkan permen, uang jajan, atau pinjam HP supaya kita mau ikut dengannya. Jangan pernah mau ikut tanpa izin ayah atau ibu!",
        reflectionPrompt:
          "Kalau ditawari hadiah agar mau ikut ke tempat sepi, apa jawabmu?",
        reflectionAnswer:
          "Tegas sekali! Tolak hadiahnya, katakan 'Tidak mau!', dan tetap berada di tempat yang ramai.",
      },
      {
        slideNumber: 3,
        title: "Tempat Terang & Ramai Itu Lebih Aman",
        visualEmoji: "🏫🌳",
        secondaryEmojis: "☀️👫👀",
        illustrationBg: "from-[#E0F2FE] to-[#BAE6FD]",
        storyText:
          "Saat bermain di Desa Cibodas atau pulang sekolah, berjalanlah bersama teman-teman di jalan yang terang dan ramai. Hindari masuk ke kebun sepi, bangunan kosong, atau kamar tertutup sendirian dengan orang lain.",
        reflectionPrompt: "Mengapa kita harus bermain di tempat yang terang dan ramai?",
        reflectionAnswer:
          "Karena di tempat terang dan ramai banyak orang dewasa baik yang bisa mengawasi dan menolong kita jika terjadi sesuatu.",
      },
      {
        slideNumber: 4,
        title: "Ancaman Tidak Boleh Membuatmu Takut Bercerita",
        visualEmoji: "🦁💬",
        secondaryEmojis: "🛡️❤️🌟",
        illustrationBg: "from-[#FFE4E6] to-[#FECDD3]",
        storyText:
          "Jika ada orang nakal yang mengancam atau menyalahkanmu agar kamu tutup mulut, ingatlah: KAMU TIDAK BERSALAH! Orang tua dan Kakak Relawan JEKATA akan selalu percaya dan melindungimu.",
        reflectionPrompt: "Apakah anak yang diganggu orang nakal itu bersalah?",
        reflectionAnswer:
          "Sama sekali TIDAK bersalah! Kamu adalah anak pemberani yang selalu dilindungi.",
      },
    ],
  },
  {
    id: "mod-4",
    slug: "cari-pertolongan",
    title: "Berani Minta Tolong",
    shortTitle: "Berani Minta Tolong",
    pillarLabel: "Pulau 4 • Lingkar Pelindung",
    icon: "🤝",
    rewardStars: 20,
    summary:
      "Mengenal 5 Orang Dewasa Tepercaya di sekitarmu dan cara meminta pertolongan dengan jelas dan berani.",
    colorTheme: {
      cardBg: "bg-[#FFE4E6]",
      border: "border-[#FB7185]",
      badgeBg: "bg-[#E11D48]",
      badgeText: "text-white",
      buttonBg: "bg-[#FB7185] hover:bg-[#E11D48] text-white",
      buttonBorder: "border-b-4 border-[#E11D48]",
    },
    storySlides: [
      {
        slideNumber: 1,
        title: "5 Jari Orang Dewasa Tepercaya",
        visualEmoji: "🖐️👨‍👩‍👧",
        secondaryEmojis: "👩‍🏫🧑‍🤝‍🧑🏡",
        illustrationBg: "from-[#FFE4E6] to-[#FECDD3]",
        storyText:
          "Lihat 5 jari tanganmu! Ayo sebutkan 5 orang dewasa tepercaya yang siap melindungimu: (1) Ayah & Ibu, (2) Kakek/Nenek/Keluarga di rumah, (3) Bapak/Ibu Guru di sekolah, (4) Kakak Relawan JEKATA, dan (5) Perangkat Desa / Polisi.",
        reflectionPrompt: "Siapa saja yang ada di 5 Jari Pelindungmu?",
        reflectionAnswer:
          "Hebat! Ayah/Ibu, keluarga dekat, Guru, Kakak Relawan JEKATA, dan petugas keamanan desa selalu siap menolongmu.",
      },
      {
        slideNumber: 2,
        title: "Cara Meminta Tolong dengan Jelas",
        visualEmoji: "🗣️💡",
        secondaryEmojis: "👂❤️✅",
        illustrationBg: "from-[#E0F2FE] to-[#BAE6FD]",
        storyText:
          "Saat meminta tolong, katakan dengan jelas: 'Bu/Pak/Kak, tadi ada yang membuatku takut dan tidak nyaman.' Kamu tidak perlu malu atau takut dimarahi, karena bercerita adalah tindakan anak pemberani!",
        reflectionPrompt: "Bagaimana kalimat pemberani saat meminta bantuan?",
        reflectionAnswer:
          "Pintar! Sampaikan apa yang terjadi dan bagaimana perasaanmu kepada orang dewasa tepercaya.",
      },
      {
        slideNumber: 3,
        title: "Terus Bercerita Sampai Didengarkan",
        visualEmoji: "🔔🌟",
        secondaryEmojis: "🤝💪🛡️",
        illustrationBg: "from-[#FEF3C7] to-[#FDE68A]",
        storyText:
          "Jika orang dewasa pertama yang kamu beri tahu sedang sibuk dan belum paham ceritamu, jangan menyerah! Ceritakan kepada orang dewasa tepercaya lainnya di 5 Jari Pelindungmu sampai kamu benar-benar dibantu.",
        reflectionPrompt:
          "Kalau orang pertama sedang sibuk, apa yang harus kita lakukan?",
        reflectionAnswer:
          "Tepat sekali! Ceritakan kepada orang dewasa tepercaya berikutnya seperti Guru atau Kakak Relawan JEKATA.",
      },
      {
        slideNumber: 4,
        title: "Kita Saling Menjaga di Desa Cibodas!",
        visualEmoji: "🏡🌈",
        secondaryEmojis: "👧👦🏅🎉",
        illustrationBg: "from-[#D1FAE5] to-[#A7F3D0]",
        storyText:
          "Selamat! Kamu juga bisa menjadi sahabat pelindung dengan menemani temanmu melapor ke guru atau Kakak Relawan JEKATA jika temanmu terlihat ketakutan. Anak Desa Cibodas berani, cerdas, dan terlindungi!",
        reflectionPrompt: "Siapkah kamu menjadi Duta Anak Aman Desa Cibodas?",
        reflectionAnswer:
          "SIAP! Kamu telah menamatkan pulau belajar ini dan siap menjaga diri serta sahabatmu!",
      },
    ],
  },
];

export const SIMULATION_SCENARIOS: SimulationScenario[] = [
  {
    id: 1,
    title: "Tawaran Permen di Jalan Sepi",
    pillar: "Situasi Aman",
    visualEmoji: "🍬🚗",
    isSafe: false,
    rewardStars: 15,
    story:
      "Saat kamu pulang bermain di jalan Desa Cibodas, ada orang tidak dikenal menghentikan motornya. Ia menawarkan cokelat besar dan mengajakmu ikut ke gang sepi.",
    choices: [
      "Menerima cokelatnya dan ikut sebentar",
      "Berkata 'TIDAK MAU!', lari ke rumah warga/tempat ramai, lalu cerita ke orang tua",
      "Diam saja dan berdiri di dekat motornya",
    ],
    correctChoiceIndex: 1,
    gentleFeedback:
      "Pilihanmu sangat tepat! Jangan pernah menerima pemberian atau ikut dengan orang tidak dikenal. Segera lari ke tempat ramai dan beri tahu orang tua!",
  },
  {
    id: 2,
    title: "Mengobati Luka di Ruang UKS Terbuka",
    pillar: "Batasan Pribadi",
    visualEmoji: "🩹👩‍🏫",
    isSafe: true,
    rewardStars: 15,
    story:
      "Saat olahraga di sekolah, lututmu terjatuh dan lecet. Ibu Guru mengajakmu ke ruang UKS yang pintunya terbuka bersama teman-teman untuk membersihkan luka di lututmu.",
    choices: [
      "Mengizinkan Ibu Guru mengobati luka di lutut karena itu sentuhan pertolongan yang aman",
      "Berlari keluar sekolah sendirian",
      "Menyembunyikan luka sampai infeksi",
    ],
    correctChoiceIndex: 0,
    gentleFeedback:
      "Benar sekali! Mengobati lutut yang terluka di ruang UKS terbuka oleh guru atau petugas kesehatan adalah contoh sentuhan pertolongan yang AMAN.",
  },
  {
    id: 3,
    title: "Rahasia yang Membuat Perut Mulas",
    pillar: "Pengenalan Emosi",
    visualEmoji: "🤫😰",
    isSafe: false,
    rewardStars: 15,
    story:
      "Seorang kenalan dewasa menyentuh bagian tubuhmu yang membuat jantungmu berdebar takut, lalu ia berbisik: 'Ini rahasia kita berdua ya, jangan bilang ibumu!'",
    choices: [
      "Menyimpan rahasia itu karena takut",
      "Menjauh darinya dan LANGSUNG menceritakan semuanya kepada Ibu/Ayah atau Kakak JEKATA",
      "Melupakannya begitu saja",
    ],
    correctChoiceIndex: 1,
    gentleFeedback:
      "Kamu sangat pemberani! Itu adalah Rahasia Buruk. Kita TIDAK BOLEH menyimpan rahasia tentang sentuhan tubuh pribadi. Segera ceritakan pada orang tua!",
  },
  {
    id: 4,
    title: "Aturan Baju Renang Saat Bermain",
    pillar: "Batasan Pribadi",
    visualEmoji: "🩱🛑",
    isSafe: false,
    rewardStars: 15,
    story:
      "Saat sedang bermain petak umpet di tempat tertutup, ada seseorang yang meminta kamu membuka baju atau ingin melihat bagian tubuh pribadimu.",
    choices: [
      "Menuruti permintaannya karena sedang bermain",
      "Teriak 'TIDAK BOLEH!', segera keluar dari tempat itu, dan lapor ke orang dewasa tepercaya",
      "Tertawa saja",
    ],
    correctChoiceIndex: 1,
    gentleFeedback:
      "Luar biasa! Bagian tubuh yang tertutup baju renang tidak boleh dilihat atau disentuh siapa pun, bahkan saat bermain. Katakan TIDAK dan segera pergi!",
  },
  {
    id: 5,
    title: "Tersesat Saat Keramaian Desa",
    pillar: "Berani Minta Tolong",
    visualEmoji: "🏪🙋",
    isSafe: false,
    rewardStars: 15,
    story:
      "Saat ada acara ramai di lapangan desa, kamu terlepas dari gandengan tangan Ibu dan tidak melihat Ibu di dekatmu.",
    choices: [
      "Tetap di tempat terang/panggung utama dan meminta bantuan panitia desa, satpam, atau ibu-ibu yang membawa anak",
      "Pergi jalan kaki sendirian ke luar desa",
      "Ikut orang asing yang mengajak naik mobil",
    ],
    correctChoiceIndex: 0,
    gentleFeedback:
      "Cerdas sekali! Saat terpisah dari orang tua, tetaplah di tempat terang dan minta bantuan petugas resmi, perangkat desa, atau ibu yang bersama keluarganya.",
  },
  {
    id: 6,
    title: "Belajar Bersama Kakak Relawan JEKATA",
    pillar: "Berani Minta Tolong",
    visualEmoji: "📚🦉",
    isSafe: true,
    rewardStars: 15,
    story:
      "Di Balai Desa Cibodas yang terbuka dan ramai, Kakak Relawan JEKATA mengajakmu dan 25 teman-teman bernyanyi lagu 'Sentuhan Boleh & Tidak Boleh' bersama-sama.",
    choices: [
      "Ikut bernyanyi dan belajar dengan gembira karena ruangannya terbuka, ramai, dan aman",
      "Pulang tanpa pamit",
      "Menangis di pojok ruangan",
    ],
    correctChoiceIndex: 0,
    gentleFeedback:
      "Betul! Belajar bersama teman-teman di ruang terbuka yang diawasi Kakak Relawan JEKATA dan warga desa adalah kegiatan yang sangat AMAN dan menyenangkan!",
  },
];

export const EVALUATION_QUESTIONS: EvaluationQuestion[] = [
  {
    id: 1,
    pillar: "Batasan Pribadi",
    emoji: "🩱",
    question:
      "Bagian tubuh mana yang termasuk Bagian Pribadi menurut Aturan Baju Renang?",
    options: [
      "Telapak tangan dan bahu",
      "Bibir, dada, bagian di antara paha (kemaluan), dan pantat",
      "Ujung rambut dan sepatu",
    ],
    correctIndex: 1,
    explanation:
      "Bibir, dada, kemaluan, dan pantat adalah bagian tubuh pribadi yang harus selalu dilindungi.",
  },
  {
    id: 2,
    pillar: "Batasan Pribadi",
    emoji: "🛑",
    question:
      "Apa yang harus kamu lakukan jika ada orang yang mencoba menyentuh bagian tubuh pribadimu?",
    options: [
      "Diam saja karena malu",
      "Berkata 'TIDAK BOLEH!', lari ke tempat ramai, dan ceritakan pada orang tua",
      "Menunggu sampai besok",
    ],
    correctIndex: 1,
    explanation:
      "Gunakan 3 Jurus Jagoan: Katakan TIDAK dengan lantang, LARI ke tempat aman, dan CERITAKAN pada orang dewasa tepercaya.",
  },
  {
    id: 3,
    pillar: "Pengenalan Emosi",
    emoji: "🚨",
    question:
      "Saat jantungmu berdebar kencang, perut terasa tidak enak, dan kamu merasa takut di dekat seseorang, itu tanda apa?",
    options: [
      "Alarm tubuh sedang memberi sinyal bahwa situasi itu TIDAK AMAN",
      "Tanda kita harus diam saja",
      "Tanda kita sedang mengantuk",
    ],
    correctIndex: 0,
    explanation:
      "Tubuh kita memiliki alarm alami. Jika merasa takut atau tidak nyaman, segera menjauh dan cari bantuan.",
  },
  {
    id: 4,
    pillar: "Pengenalan Emosi",
    emoji: "🎈",
    question:
      "Bagaimana cara menenangkan diri saat merasa kaget atau takut sebelum bercerita pada orang tua?",
    options: [
      "Menahan napas lama-lama",
      "Melakukan Napas Balon: tarik napas pelan lewat hidung 1-2-3 dan hembuskan pelan lewat mulut",
      "Berlari ke tempat gelap",
    ],
    correctIndex: 1,
    explanation:
      "Napas Balon membantu menenangkan detak jantung agar kita bisa bercerita dengan jelas.",
  },
  {
    id: 5,
    pillar: "Situasi Aman",
    emoji: "🍬",
    question:
      "Jika ada orang asing menawarkan permen atau mainan agar kamu mau ikut ke tempat sepi, apa tindakan yang aman?",
    options: [
      "Ikut sebentar karena ingin permennya",
      "Menolak dengan tegas, menjauh ke tempat ramai, dan melapor ke orang tua",
      "Mengajak adik ikut bersama orang asing itu",
    ],
    correctIndex: 1,
    explanation:
      "Jangan pernah menerima hadiah atau ikut ke tempat sepi tanpa izin orang tua.",
  },
  {
    id: 6,
    pillar: "Situasi Aman",
    emoji: "🤫",
    question:
      "Seseorang menyentuhmu dengan cara yang tidak nyaman lalu menyuruhmu merahasiakannya dari Ibu. Apakah rahasia itu boleh disimpan?",
    options: [
      "Tidak boleh disimpan! Itu Rahasia Buruk yang harus langsung diceritakan kepada Ibu/Ayah",
      "Harus disimpan supaya dia tidak marah",
      "Disimpan sendiri selamanya",
    ],
    correctIndex: 0,
    explanation:
      "Rahasia yang membuatmu takut atau menyangkut tubuh pribadi adalah Rahasia Buruk dan wajib diceritakan.",
  },
  {
    id: 7,
    pillar: "Berani Minta Tolong",
    emoji: "🖐️",
    question:
      "Siapa saja yang termasuk dalam Lingkaran Orang Dewasa Tepercaya yang bisa kamu mintai pertolongan?",
    options: [
      "Orang asing yang baru ditemui di jalan",
      "Orang tua, Guru, Keluarga dekat, Kakak Relawan JEKATA, dan Polisi/Perangkat Desa",
      "Orang yang menyuruh kita berbohong pada Ibu",
    ],
    correctIndex: 1,
    explanation:
      "5 Jari Pelindungmu adalah Orang Tua, Keluarga dekat, Guru, Kakak Relawan JEKATA, dan Petugas Desa/Polisi.",
  },
  {
    id: 8,
    pillar: "Berani Minta Tolong",
    emoji: "🦁",
    question:
      "Jika ada orang nakal yang mengganggumu, apakah kejadian itu adalah kesalahanmu?",
    options: [
      "Bukan salahku! Anak yang diganggu tidak pernah bersalah dan berhak dilindungi",
      "Salahku sendiri",
      "Tidak boleh diceritakan karena memalukan",
    ],
    correctIndex: 0,
    explanation:
      "Kamu tidak pernah bersalah jika ada orang yang melanggar batasan pribadimu. Orang dewasa tepercaya akan selalu melindungimu.",
  },
];

export const VOLUNTEER_GUIDE: VolunteerGuideData = {
  programTitle:
    "Laboratorium Komunitas Perlindungan Anak Berbasis AI — HEALINK: SAFETY LEARNING",
  location: "Desa Cibodas, Kabupaten Purwakarta, Jawa Barat",
  partners: ["JEKATA Purwakarta", "Yayasan CARE Peduli"],
  targetParticipants: "25+ Anak Usia Sekolah Dasar & Pra-Remaja Desa Cibodas",
  sessionStages: [
    {
      step: 1,
      title: "Pembukaan Ceria & Ice Breaking Lagu Tubuhku",
      duration: "15 Menit",
      emoji: "🎵",
      activity:
        "Relawan JEKATA menyapa anak-anak dalam lingkaran terbuka di Balai Desa Cibodas, mengajak pemanasan gerak dan lagu pelindung tubuh, serta memilih avatar hewan di aplikasi HEALINK.",
      facilitatorTip:
        "Pastikan suasana hangat, tanpa paksaan, dan anak duduk nyaman berkelompok bersama fasilitator pendamping.",
    },
    {
      step: 2,
      title: "Pre-Test Interaktif (Pemetaan Pemahaman Awal)",
      duration: "10 Menit",
      emoji: "📝",
      activity:
        "Anak mengerjakan 8 soal bergambar pada menu Kuis (Tab Pre-Test) dengan pendampingan pembacaan soal oleh relawan bagi anak kelas rendah.",
      facilitatorTip:
        "Ingatkan anak bahwa ini bukan ujian sekolah yang dinilai salah/benar, melainkan permainan awal untuk mengenal pulau belajar.",
    },
    {
      step: 3,
      title: "Eksplorasi 4 Pulau Belajar (Storytelling Interaktif)",
      duration: "30 Menit",
      emoji: "🏝️",
      activity:
        "Menggunakan proyektor atau perangkat tablet/HP kelompok, fasilitator memandu cerita bergambar 4 pilar: Batasan Pribadi, Pengenalan Emosi, Situasi Aman, dan Berani Minta Tolong.",
      facilitatorTip:
        "Gunakan pertanyaan refleksi di setiap slide untuk memancing diskusi aktif dan latihan teriak 'TIDAK BOLEH!' bersama-sama.",
    },
    {
      step: 4,
      title: "Praktik Game Simulasi & Tanya Kakak AI HEALINK",
      duration: "20 Menit",
      emoji: "🎮",
      activity:
        "Anak mencoba 6 skenario 'Aman atau Tidak Aman?' secara bergantian dan mencoba bertanya pada fitur Tanya AI Ramah Anak dengan pengawasan relawan.",
      facilitatorTip:
        "Berikan pujian atas keberanian anak memilih tindakan aman dan jelaskan alasan keselamatan tanpa menakut-nakuti.",
    },
    {
      step: 5,
      title: "Post-Test, Apresiasi Bintang & Refleksi Penutup",
      duration: "15 Menit",
      emoji: "🏅",
      activity:
        "Anak mengerjakan Post-Test untuk mengukur peningkatan pemahaman (target peningkatan >80%), menerima lencana Duta Anak Aman Desa Cibodas, dan penutupan doa bersama.",
      facilitatorTip:
        "Catat hasil Pre-Test & Post-Test otomatis di Dashboard Evaluasi Relawan sebagai bukti luaran program PKM-PM.",
    },
  ],
  communicationPrinciples: {
    dos: [
      "Gunakan bahasa yang positif, memberdayakan, dan mudah dipahami anak (misalnya 'Aturan Baju Renang' dan '5 Jari Pelindung').",
      "Sejajarkan posisi mata (berlutut atau duduk bersama) saat berbicara dengan anak agar anak merasa setara dan aman.",
      "Berikan apresiasi pada setiap keberanian anak menjawab, meskipun jawabannya masih perlu diarahkan.",
      "Tekankan berulang kali bahwa anak TIDAK PERNAH bersalah jika mengalami situasi tidak nyaman.",
    ],
    donts: [
      "JANGAN menggunakan cerita horor, ancaman menakutkan, atau gambar kekerasan eksplisit yang memicu ketakutan berlebih.",
      "JANGAN memaksa anak menceritakan pengalaman buruk pribadinya di depan teman-teman kelompok.",
      "JANGAN memarahi atau menertawakan anak ketika salah memilih jawaban pada simulasi atau kuis.",
      "JANGAN memberikan janji palsu; ikuti alur rujukan resmi JEKATA & Yayasan CARE Peduli jika ditemukan indikasi kasus nyata.",
    ],
  },
  safetyProtocols: [
    {
      id: "prot-1",
      title: "Anonimitas & Perlindungan Identitas Anak",
      emoji: "🔒",
      description:
        "Gunakan nama panggilan singkat atau kode peserta (mis. Peserta #01 - Kelinci Ceria) di aplikasi. Dokumentasi foto kegiatan wajib diambil dari belakang/samping tanpa mengekspos wajah anak secara dekat.",
    },
    {
      id: "prot-2",
      title: "Ruang Terbuka & Pendampingan Berpasangan",
      emoji: "👥",
      description:
        "Seluruh sesi edukasi di Desa Cibodas dilaksanakan di ruang terbuka/balai warga dengan minimal 2 relawan JEKATA di setiap kelompok kecil (aturan Two-Adult Rule).",
    },
    {
      id: "prot-3",
      title: "Batas Peran Relawan (Bukan Terapis Klinis)",
      emoji: "🛡️",
      description:
        "Aplikasi HEALINK dan relawan berfokus pada edukasi pencegahan primer (Safety Learning). Jika ada anak yang menyampaikan pengungkapan (disclosure) kasus nyata, dengarkan dengan tenang tanpa menginterogasi dan rujuk ke koordinator perlindungan anak JEKATA & Yayasan CARE Peduli.",
    },
  ],
  prepChecklist: [
    {
      id: "chk-1",
      label: "Menyiapkan ruang belajar terbuka & ramah anak di Balai Desa Cibodas",
      category: "Lokasi & Keamanan",
    },
    {
      id: "chk-2",
      label: "Memastikan aplikasi PWA HEALINK terbuka lancar di perangkat tablet/HP kelompok",
      category: "Teknis Aplikasi",
    },
    {
      id: "chk-3",
      label: "Membagikan kartu 5 Jari Pelindung & stiker bintang apresiasi untuk 25+ peserta",
      category: "Media Edukasi",
    },
    {
      id: "chk-4",
      label: "Briefing prinsip Do's & Don'ts komunikasi ramah anak bersama tim JEKATA",
      category: "Fasilitator",
    },
    {
      id: "chk-5",
      label: "Mencatat skor Pre-Test & Post-Test peserta ke tabel rekapitulasi evaluasi",
      category: "Evaluasi PKM-PM",
    },
  ],
};

export const INITIAL_PARTICIPANT_RECORDS: ParticipantEvaluationRecord[] = [
  {
    id: "rec-1",
    code: "Peserta #01",
    nickname: "Raka",
    avatar: "🦁",
    ageGroup: "9 Tahun (SD Kelas 3)",
    preTestScore: 50,
    postTestScore: 88,
    completedModules: 4,
    updatedAt: "Sesi 1 • Desa Cibodas",
  },
  {
    id: "rec-2",
    code: "Peserta #02",
    nickname: "Siti",
    avatar: "🐰",
    ageGroup: "10 Tahun (SD Kelas 4)",
    preTestScore: 38,
    postTestScore: 100,
    completedModules: 4,
    updatedAt: "Sesi 1 • Desa Cibodas",
  },
  {
    id: "rec-3",
    code: "Peserta #03",
    nickname: "Daffa",
    avatar: "🐱",
    ageGroup: "8 Tahun (SD Kelas 2)",
    preTestScore: 50,
    postTestScore: 88,
    completedModules: 4,
    updatedAt: "Sesi 1 • Desa Cibodas",
  },
  {
    id: "rec-4",
    code: "Peserta #04",
    nickname: "Nayla",
    avatar: "🦉",
    ageGroup: "11 Tahun (SD Kelas 5)",
    preTestScore: 63,
    postTestScore: 100,
    completedModules: 4,
    updatedAt: "Sesi 1 • Desa Cibodas",
  },
  {
    id: "rec-5",
    code: "Peserta #05",
    nickname: "Alif",
    avatar: "🐼",
    ageGroup: "9 Tahun (SD Kelas 3)",
    preTestScore: 38,
    postTestScore: 88,
    completedModules: 4,
    updatedAt: "Sesi 1 • Desa Cibodas",
  },
];
