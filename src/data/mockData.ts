export type MoodType = "happy" | "neutral" | "sad";

export type ArticleCategory =
  | "Trauma Healing"
  | "Self-Love"
  | "Panic Attack"
  | "Hukum & Hak";

export interface Article {
  id: string;
  slug: string;
  title: string;
  category: ArticleCategory | string;
  readTime: string;
  date: string;
  author: string;
  authorCredential?: string;
  authorAvatar?: string;
  badge?: string;
  image?: string;
  summary: string;
  content: string[];
}

export interface GroupMessage {
  id: string;
  senderName: string;
  senderRole: "member" | "psychologist" | "admin";
  senderAvatar?: string;
  text: string;
  timestamp: string;
  isReported: boolean;
  isVoiceNote?: boolean;
  voiceDuration?: string;
}

export interface CommunityGroup {
  id: string;
  name: string;
  category: string;
  description: string;
  guidelines: string;
  memberCount: number;
  isJoined: boolean;
  icon: string;
  accentBg: string;
  badgeText: string;
  supervisorName: string;
  supervisorRole: string;
  supervisorAvatar: string;
  messages: GroupMessage[];
}

export interface ConsultationMessage {
  id: string;
  senderName: string;
  senderRole: "user" | "psychologist";
  text: string;
  timestamp: string;
  messageType?: "text" | "voice" | "booking" | "assessment" | "summary";
  metaTitle?: string;
  metaItems?: string[];
}

export interface Psychologist {
  id: string;
  name: string;
  specialty: string;
  experience: string;
  isOnline: boolean;
  bio: string;
  strNumber: string;
  avatarColor: string;
  avatarUrl: string;
  hospital: string;
  rating: string;
  sessionCount: number;
  scheduleSlots: string[];
  messages: ConsultationMessage[];
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: "welcome" | "psychologist" | "affirmation" | "community";
  link: string;
  isRead: boolean;
}

export interface UserProfile {
  name: string;
  alias: string;
  email: string;
  phone: string;
  role: "user" | "admin";
  avatarColor: string;
  bio: string;
}

export interface MoodEntry {
  id: string;
  mood: MoodType;
  label: string;
  date: string;
  note: string;
}

export interface GratitudeNote {
  id: string;
  text: string;
  date: string;
}

export const ANONYMOUS_ALIASES: string[] = [
  "Kupu-Kupu Senja",
  "Bintang Pagi",
  "Embun Tenang",
  "Pelangi Teduh",
  "Melati Tangguh",
  "Awan Lembut",
  "Cahaya Rembulan",
  "Daun Maple Hangat",
  "Angin Lembah",
  "Seruni Damai",
];

export const DEFAULT_USER: UserProfile = {
  name: "Maya Putri",
  alias: "Kupu-Kupu Senja",
  email: "maya.senja@selena.id",
  phone: "0812-3456-7890",
  role: "user",
  avatarColor: "#CDB4DB",
  bio: "Sedang belajar berdamai dengan masa lalu dan mengambil satu langkah lembut setiap harinya di ruang aman SELENA.",
};

export const DEFAULT_ADMIN: UserProfile = {
  name: "dr. Nadya Larasati, M.Psi., Psikolog",
  alias: "Psikolog Nadya",
  email: "nadya.psikolog@selena.id",
  phone: "0811-9988-7766",
  role: "admin",
  avatarColor: "#FFC8DD",
  bio: "Psikolog Klinis Dewasa dan Pendamping Pemulihan Trauma. Siap mendengarkan dan menjaga ruang aman tanpa penghakiman.",
};

export const INITIAL_MOOD_HISTORY: MoodEntry[] = [
  {
    id: "mh-1",
    mood: "sad",
    label: "Sedih",
    date: "11 Nov 2026 • 20:15",
    note: "Merasa sedikit kewalahan dengan kenangan lama, namun sudah mencoba latihan napas 4-7-8.",
  },
  {
    id: "mh-2",
    mood: "neutral",
    label: "Biasa Saja",
    date: "12 Nov 2026 • 09:30",
    note: "Hari yang cukup tenang. Belajar menetapkan batasan saat bekerja.",
  },
  {
    id: "mh-3",
    mood: "happy",
    label: "Senang",
    date: "13 Nov 2026 • 18:45",
    note: "Merasa lebih ringan setelah berbagi cerita di grup Healing Journey.",
  },
];

export const INITIAL_GRATITUDE_NOTES: GratitudeNote[] = [
  {
    id: "gn-1",
    text: "Aku bersyukur hari ini bisa bangun pagi dan menikmati teh hangat dengan tenang tanpa rasa cemas berlebih.",
    date: "Kemarin • 08:30",
  },
  {
    id: "gn-2",
    text: "Bersyukur menemukan komunitas yang mendengarkan ceritaku tanpa menghakimi sedikit pun.",
    date: "Hari ini • 07:45",
  },
];

export const ARTICLES: Article[] = [
  {
    id: "art-1",
    slug: "mengenal-pelecehan-verbal-non-verbal-serta-dampaknya",
    title: "Mengenal Pelecehan Verbal & Non-Verbal serta Dampaknya",
    category: "Trauma Healing",
    readTime: "6 Menit Baca",
    date: "10 Nov 2026",
    author: "dr. Nadya Larasati, M.Psi., Psikolog",
    authorCredential: "Psikolog Klinis Spesialis Pemulihan Trauma",
    authorAvatar: "/psychologists/nadya.svg",
    badge: "Edukasi Utama 💜",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDa47e91cF313nZYolVafJ7KBnLRMRiT9zuv4XrIf9n6_Z8qRgIw08DQLnFnTrnFzU6ubrJoAOaUcnncoFuLu2tjUVAFgoefgXqiDFNy1cKUdquJMPLwSPwsiZPKIvT_DjCwr-PA94jZG3zDDx-PIr_C_gyYx7sjAVkuePhxdQaxDHEZC9RqU7AoDWGK73PqBZcu8zJ9uCI720yNXqnfRodhZLNr3Z8BClLXoAm3Og",
    summary:
      "Pelecehan seksual tidak selalu melibatkan kontak fisik. Memahami bentuk pelecehan verbal dan non-verbal membantu kita memvalidasi perasaan tidak nyaman dan mengenali bahwa pengalamanmu nyata.",
    content: [
      "Banyak penyintas meragukan pengalaman mereka sendiri karena menganggap pelecehan hanya terjadi ketika ada sentuhan fisik. Padahal, pelecehan seksual mencakup segala bentuk tindakan bernuansa seksual, baik secara verbal maupun non-verbal, yang dilakukan sepihak tanpa persetujuan dan merendahkan martabat seseorang.",
      "Pelecehan verbal dapat berupa siulan di ruang publik, komentar bernada seksual tentang bentuk tubuh, lelucon seksis yang memojokkan, hingga ajakan atau pertanyaan intim yang dipaksakan di lingkungan kampus maupun tempat kerja. Meskipun sering dibungkus dengan alasan hanya bercanda, rasa tidak nyaman dan terancam yang kamu rasakan adalah sinyal valid bahwa batasan pribadimu telah dilanggar.",
      "Sementara itu, pelecehan non-verbal meliputi tatapan mata yang mengintimidasi, gerakan tubuh atau isyarat bernuansa seksual, membuntuti korban secara diam-diam, hingga mengirimkan gambar atau pesan bermuatan seksual tanpa persetujuan. Tindakan tersebut merampas rasa aman seseorang atas ruang dan tubuhnya sendiri.",
      "Dampak psikologis dari pelecehan verbal dan non-verbal sangat nyata. Penyintas sering mengalami kewaspadaan berlebih saat berada di tempat umum, kecemasan sosial, gangguan tidur, penurunan rasa percaya diri, hingga perasaan malu atau menyalahkan diri sendiri atas pakaian atau keberadaan mereka saat kejadian berlangsung.",
      "Langkah pertama menuju pemulihan adalah memberikan validasi penuh kepada dirimu sendiri bahwa apa yang terjadi bukanlah salahmu. Kamu berhak merasa marah, sedih, atau takut. Mencatat kronologi kejadian, mencari dukungan di ruang aman seperti SELENA, dan berbicara dengan konselor profesional dapat membantumu memproses beban emosional tersebut secara bertahap dan aman.",
    ],
  },
  {
    id: "art-2",
    slug: "pertolongan-pertama-saat-mengalami-panic-attack",
    title: "Pertolongan Pertama Saat Mengalami Panic Attack",
    category: "Panic Attack",
    readTime: "5 Menit Baca",
    date: "11 Nov 2026",
    author: "Psikolog Sarah Wijaya, M.Psi.",
    authorCredential: "Psikolog Klinis Spesialis Kecemasan & Regulasi Emosi",
    authorAvatar: "/psychologists/sarah.svg",
    badge: "Panduan Darurat 🌿",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDWNIs01Z0-6am6Ignndd-c6CbHC1nL94GpWwPDZ8SnnuNaQxYcsnc6GYQgyFBQthIWLfT-f2lsnlp3kYC0Ka-JnlS6-ZcqpvOyOB55KkjIgdkqcldgh5yRgvaOEsC6bUBJuazM-_CIkHOLVzfesDKg8uFHuQEu3K_kTy85P-aBfqfDFQ0HvJl6_C8THo1T3x8TnCeT2cH_Akvoupo5qwtSNxjAFt3FkYheCvZFaQE",
    summary:
      "Saat gelombang panik datang tiba-tiba, jantung berdebar kencang dan napas terasa pendek. Pelajari teknik pernapasan 4-7-8 dan metode grounding untuk mengembalikan rasa aman pada tubuhmu.",
    content: [
      "Serangan panik sering kali datang seperti gelombang besar yang tiba-tiba. Detak jantung meningkat drastis, dada terasa sesak, telapak tangan dingin atau gemetar, dan muncul rasa takut kehilangan kendali. Bagi penyintas trauma, serangan panik kerap dipicu oleh ingatan bawah sadar yang membuat sistem saraf mengira bahaya sedang terjadi saat ini.",
      "Hal paling penting untuk diingat saat serangan panik terjadi adalah menyadari bahwa meskipun rasanya sangat menakutkan, kondisi ini tidak berbahaya secara fatal dan pasti akan mereda. Sistem saraf simpatismu sedang bekerja terlalu cepat, sehingga tugas kita adalah mengirimkan sinyal fisik bahwa kamu berada di tempat yang aman sekarang.",
      "Langkah pertama adalah mengatur ritme napas menggunakan teknik 4-7-8. Letakkan satu tangan di dada dan satu tangan di perut. Tarik napas perlahan melalui hidung selama 4 detik, tahan dengan lembut selama 7 detik, lalu hembuskan perlahan melalui mulut selama 8 detik. Hembusan napas yang lebih panjang secara biologis mengaktifkan saraf vagus untuk menurunkan detak jantung.",
      "Langkah kedua adalah mengembalikan kesadaran ke masa kini dengan teknik Grounding 5-4-3-2-1. Sebutkan dalam hati atau dengan suara pelan: 5 benda di sekitarmu yang bisa kamu lihat, 4 tekstur benda yang bisa kamu sentuh seperti kain bajumu atau permukaan kursi, 3 suara yang bisa kamu dengar, 2 aroma yang bisa kamu hirup, dan 1 kalimat penguat untuk dirimu sendiri.",
      "Setelah gelombang panik mulai surut, tubuhmu mungkin akan terasa sangat lelah. Jangan memaksakan diri untuk langsung beraktivitas berat. Minumlah segelas air hangat, selimuti tubuhmu jika terasa dingin, dan berikan apresiasi lembut pada dirimu karena telah berhasil melewati momen sulit tersebut.",
    ],
  },
  {
    id: "art-3",
    slug: "membangun-batasan-diri-boundaries-pasca-trauma",
    title: "Membangun Batasan Diri (Boundaries) Pasca Trauma",
    category: "Trauma Healing",
    readTime: "7 Menit Baca",
    date: "12 Nov 2026",
    author: "dr. Nadya Larasati, M.Psi., Psikolog",
    authorCredential: "Psikolog Klinis Spesialis Pemulihan Trauma",
    authorAvatar: "/psychologists/nadya.svg",
    badge: "Pemulihan 🌸",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBSSHT1UzitH9nHuCWixbOOIoVt1ZZbcowHTNo3v9blJyyN5uB5IvSKwNoLTNBKj7vFe2Pb0ze_pwLjKJnQFf3AzHZ837SYWkN2yp0mPEKdMXE_GQZ0jA7QmzS3_H7jCXOBImnAAk-9Fv0tKGRMB5sR_2Z8LYajt6a8_WrB5fRwaLOY6X9CgFOUJhXE7KXOHj2FSLKA1ordrUkiJ8cC39oOYfyrBbVZwf-FNKRurbE",
    summary:
      "Trauma sering membuat kita merasa kehilangan kendali atas ruang pribadi. Belajar berkata tidak tanpa rasa bersalah adalah wujud perlindungan dan penghormatan tertinggi terhadap dirimu.",
    content: [
      "Pengalaman pelecehan atau kekerasan seksual pada dasarnya adalah pelanggaran paksa terhadap batasan tubuh dan otonomi seseorang. Akibatnya, setelah peristiwa traumatis, banyak penyintas merasa kesulitan mengenali di mana batasan mereka berada, atau merasa takut bahwa penolakan akan memicu konflik.",
      "Membangun kembali batasan diri adalah inti dari pemulihan trauma. Batasan diri bukanlah tembok tebal untuk mengisolasi diri dari dunia, melainkan gerbang sehat yang memberimu hak penuh untuk menentukan siapa dan apa yang boleh masuk ke dalam ruang fisik, emosional, dan mentalmu.",
      "Batasan fisik mencakup hak mutlak atas tubuhmu. Kamu berhak menolak pelukan, jabat tangan, atau jarak duduk yang terlalu dekat, bahkan dari orang yang kamu kenal sekalipun. Kamu tidak berutang penjelasan panjang ketika tubuhmu merasa tidak nyaman. Kalimat sederhana dan tegas bahwa kamu sedang kurang nyaman sudah sangat cukup.",
      "Batasan emosional dan percakapan juga sama pentingnya. Kamu berhak menghentikan pembicaraan yang menyinggung topik pemicu trauma, menolak menjawab pertanyaan yang terlalu pribadi, dan tidak berkewajiban menceritakan detail traumamu kepada siapa pun sebelum kamu benar-benar siap.",
      "Pada awalnya, menetapkan batasan mungkin akan memunculkan rasa sungkan, terutama jika kita terbiasa mendahulukan kenyamanan orang lain. Ingatkan dirimu setiap hari bahwa menjaga keamanan dan ketenangan batinmu bukanlah tindakan egois, melainkan hak dasar setiap manusia.",
    ],
  },
  {
    id: "art-4",
    slug: "self-love-berdamai-dengan-diri-sendiri-tanpa-menyalahkan-diri",
    title: "Self-Love: Berdamai dengan Diri Sendiri Tanpa Menyalahkan Diri",
    category: "Self-Love",
    readTime: "5 Menit Baca",
    date: "13 Nov 2026",
    author: "Psikolog Sarah Wijaya, M.Psi.",
    authorCredential: "Psikolog Konseling & Praktisi Self-Compassion",
    authorAvatar: "/psychologists/sarah.svg",
    badge: "Refleksi Diri ✨",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBRUUq0__mv0jR3BljK9N6wF_h1GHBbBadmvPhrwWfvK_WhQsrGFyzzTzxzms2lvucrBH17cDlwXBKm_z4asKId9m9yFWVfxkggeEWS5ECc9zcZcuEdBkKjOgr2pMnXg_ZkwgXDUx7dawwe42GSQMSscRvS6X_e1QEcOR-MpB3qx6vr8SSJ5zYh2EZrn0lrdb4-d0l_UJ2F4HYaCCJH0a3YGobFLqi2LyS97dYauMM",
    summary:
      "Banyak penyintas terjebak dalam penyesalan mengapa waktu itu tidak melawan atau menghindar. Mari pelajari bagaimana respons alami tubuh bekerja dan cara memeluk diri sendiri dengan welas asih.",
    content: [
      "Salah satu luka terdalam pasca pelecehan bukanlah hanya kejadian itu sendiri, melainkan suara kritis di dalam kepala yang terus bertanya mengapa waktu itu kita hanya diam membeku dan tidak berteriak. Perasaan menyalahkan diri sendiri ini sangat umum, namun penting untuk dipahami dari sudut pandang ilmiah.",
      "Saat menghadapi ancaman mendadak, otak manusia tidak hanya memiliki respons melawan atau lari, tetapi juga membeku dan menuruti situasi demi bertahan hidup. Respons membeku adalah mekanisme pertahanan otomatis dari sistem saraf pusat untuk melindungi keselamatanmu saat otak menilai situasi terlalu berisiko.",
      "Artinya, jika saat kejadian tubuhmu terasa kaku dan tidak bisa bersuara, itu bukan karena kamu lemah atau mengizinkan hal itu terjadi. Itu adalah cara biologis tubuhmu menyelamatkanmu pada saat itu. Berhentilah menghukum dirimu atas respons alami yang berada di luar kendali sadarmu.",
      "Praktik mencintai diri sendiri dimulai dengan mengubah cara kita berbicara kepada batin kita. Bayangkan seorang sahabat terdekatmu datang sambil menangis dan menceritakan pengalaman yang sama persis dengan yang kamu alami. Kamu tentu tidak akan menyalahkannya, melainkan memeluknya dan meyakinkannya bahwa ia tidak bersalah.",
      "Berikan kelembutan yang sama kepada dirimu hari ini. Pemulihan tidak selalu berjalan lurus, akan ada hari yang cerah dan hari yang terasa berat. Di setiap fase itu, kamu tetap berharga, utuh, dan layak mendapatkan cinta serta rasa aman.",
    ],
  },
  {
    id: "art-5",
    slug: "panduan-hak-hukum-perlindungan-korban-kekerasan-seksual-di-indonesia",
    title: "Panduan Hak Hukum & Perlindungan Korban Kekerasan Seksual di Indonesia",
    category: "Hukum & Hak",
    readTime: "8 Menit Baca",
    date: "14 Nov 2026",
    author: "Bimo Prasetyo, M.Psi., Psikolog",
    authorCredential: "Psikolog Klinis & Pendamping Advokasi Penyintas",
    authorAvatar: "/psychologists/bimo.svg",
    badge: "UU TPKS 🛡️",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDa47e91cF313nZYolVafJ7KBnLRMRiT9zuv4XrIf9n6_Z8qRgIw08DQLnFnTrnFzU6ubrJoAOaUcnncoFuLu2tjUVAFgoefgXqiDFNy1cKUdquJMPLwSPwsiZPKIvT_DjCwr-PA94jZG3zDDx-PIr_C_gyYx7sjAVkuePhxdQaxDHEZC9RqU7AoDWGK73PqBZcu8zJ9uCI720yNXqnfRodhZLNr3Z8BClLXoAm3Og",
    summary:
      "Melalui Undang-Undang Nomor 12 Tahun 2022 tentang Tindak Pidana Kekerasan Seksual (UU TPKS), negara menjamin hak penanganan, perlindungan, dan pemulihan bagi penyintas. Kenali langkah aman dan hak-hakmu.",
    content: [
      "Mengetahui hak hukum sebagai penyintas memberikan kekuatan dan pilihan, baik ketika kamu memutuskan untuk melapor maupun ketika kamu masih menimbang langkah terbaik. Di Indonesia, Undang-Undang Nomor 12 Tahun 2022 tentang Tindak Pidana Kekerasan Seksual atau UU TPKS menjadi payung hukum progresif yang berpihak pada perspektif korban.",
      "UU TPKS mengakui berbagai bentuk kekerasan seksual yang sebelumnya belum diatur secara tegas, termasuk pelecehan seksual fisik maupun non-fisik seperti ucapan atau isyarat merendahkan, kekerasan seksual berbasis elektronik, pemaksaan kontrasepsi, hingga eksploitasi seksual.",
      "Sebagai korban atau penyintas, kamu memiliki tiga hak utama yang dijamin oleh negara. Pertama adalah Hak atas Penanganan berupa pendampingan hukum, layanan kesehatan, dan penguatan psikologis. Kedua adalah Hak atas Perlindungan berupa kerahasiaan identitas dari publik serta perlindungan dari ancaman pelaku melalui LPSK. Ketiga adalah Hak atas Pemulihan medis, psikososial, serta restitusi.",
      "Jika kamu mengalami kekerasan seksual termasuk kekerasan berbasis digital, langkah dokumentasi bukti sangatlah penting. Simpan tangkapan layar percakapan, rekaman suara, pakaian, atau catatan waktu dan lokasi kejadian di folder aman yang terkunci, serta catat saksi yang mengetahui perubahan kondisimu.",
      "Kamu tidak harus melangkah sendirian. Kamu dapat menghubungi layanan SAPA 129 dari Kementerian PPPA, Komnas Perempuan, UPTD PPA di daerahmu, Satgas PPKS di lingkungan kampus, atau berdiskusi secara rahasia dengan psikolog di SELENA untuk menyusun rencana keselamatan tanpa paksaan apa pun.",
    ],
  },
];

export const INITIAL_GROUPS: CommunityGroup[] = [
  {
    id: "grp-healing-journey",
    name: "Healing Journey",
    category: "Dukungan Sebaya",
    description:
      "Ruang aman untuk berbagi cerita pemulihan trauma, merayakan langkah-langkah kecil setiap hari, dan saling menguatkan tanpa penghakiman.",
    guidelines:
      "1. Gunakan nama alias anonim demi keamanan bersama. 2. Dilarang menyalahkan korban atau meremehkan cerita anggota. 3. Gunakan peringatan pemicu sebelum menulis cerita sensitif.",
    memberCount: 142,
    isJoined: true,
    icon: "🌸",
    accentBg: "bg-selena-pink/60",
    badgeText: "✨ Populer",
    supervisorName: "dr. Nadya Larasati, M.Psi., Psikolog",
    supervisorRole: "Psikolog Klinis Pendamping Grup",
    supervisorAvatar: "/psychologists/nadya.svg",
    messages: [
      {
        id: "gm-101",
        senderName: "dr. Nadya Larasati, M.Psi., Psikolog",
        senderRole: "psychologist",
        senderAvatar: "/psychologists/nadya.svg",
        text: "Selamat datang di ruang Healing Journey 💜 Ingat bahwa setiap langkah kecil menuju pulih sangat layak dirayakan hari ini.",
        timestamp: "08:30",
        isReported: false,
      },
      {
        id: "gm-102",
        senderName: "Bintang Pagi",
        senderRole: "member",
        text: "Halo teman-teman. Hari ini aku akhirnya berani naik transportasi umum lagi setelah 2 bulan merasa takut. Tanganku sempat gemetar tapi aku pakai teknik napas 4-7-8 dari SELENA.",
        timestamp: "09:12",
        isReported: false,
      },
      {
        id: "gm-103",
        senderName: "Embun Tenang",
        senderRole: "member",
        text: "Peluk jauh untukmu Bintang Pagi! Kamu hebat sekali sudah berani melangkah hari ini 🌸✨",
        timestamp: "09:15",
        isReported: false,
      },
      {
        id: "gm-104",
        senderName: "Akun Anonim #409",
        senderRole: "member",
        text: "Kenapa masih dipikirin terus sih, kan kejadiannya cuma digoda biasa di jalan, harusnya santai aja kali.",
        timestamp: "09:20",
        isReported: true,
      },
    ],
  },
  {
    id: "grp-ruang-aman-anonim",
    name: "Ruang Aman Anonim",
    category: "Curhat Rahasia",
    description:
      "Tempat mencurahkan beban pikiran secara 100% anonim bagi penyintas pelecehan verbal maupun non-verbal yang belum siap bercerita di ruang terbuka.",
    guidelines:
      "1. Privasi adalah prioritas mutlak, dilarang menanyakan identitas asli atau lokasi anggota. 2. Dengarkan dengan empati penuh. 3. Laporkan pesan yang melanggar rasa aman kepada moderator.",
    memberCount: 98,
    isJoined: false,
    icon: "🛡️",
    accentBg: "bg-selena-purple/60",
    badgeText: "🔒 100% Anonim",
    supervisorName: "dr. Nadya Larasati, M.Psi., Psikolog",
    supervisorRole: "Psikolog Klinis & Moderator Utama",
    supervisorAvatar: "/psychologists/nadya.svg",
    messages: [
      {
        id: "gm-201",
        senderName: "Admin Moderator SELENA",
        senderRole: "admin",
        text: "Ruang Aman Anonim dijaga 24/7 oleh tim psikolog dan moderator. Identitasmu sepenuhnya tersembunyi di balik nama samaran pilihanmu.",
        timestamp: "09:00",
        isReported: false,
      },
      {
        id: "gm-202",
        senderName: "Pelangi Teduh",
        senderRole: "member",
        text: "Selama ini aku malu cerita ke keluarga karena takut dibilang berlebihan. Rasanya lega sekali tahu aku tidak sendirian di sini.",
        timestamp: "10:05",
        isReported: false,
      },
      {
        id: "gm-203",
        senderName: "Melati Tangguh",
        senderRole: "member",
        text: "Perasaanmu sangat valid, Kak Pelangi Teduh. Kita pulih pelan-pelan bersama di sini ya 💜",
        timestamp: "10:12",
        isReported: false,
      },
    ],
  },
  {
    id: "grp-tanya-psikolog",
    name: "Tanya Psikolog",
    category: "Sesi Terbimbing",
    description:
      "Diskusi interaktif dan tanya jawab terbuka bersama Psikolog Klinis terverifikasi seputar regulasi emosi, kecemasan, dan pemulihan pasca trauma.",
    guidelines:
      "1. Sesi diskusi bersifat psikoedukasi kelompok. Untuk konseling mendalam gunakan fitur Konsultasi 1-on-1. 2. Hormati giliran bertanya setiap anggota.",
    memberCount: 116,
    isJoined: false,
    icon: "👩‍⚕️",
    accentBg: "bg-selena-purple-light",
    badgeText: "🩺 Terverifikasi",
    supervisorName: "Psikolog Sarah Wijaya, M.Psi.",
    supervisorRole: "Psikolog Konseling & Regulasi Emosi",
    supervisorAvatar: "/psychologists/sarah.svg",
    messages: [
      {
        id: "gm-301",
        senderName: "Psikolog Sarah Wijaya, M.Psi.",
        senderRole: "psychologist",
        senderAvatar: "/psychologists/sarah.svg",
        text: "Selamat pagi sahabat SELENA 🌿 Topik diskusi kita hari ini adalah Mengatasi Rasa Bersalah Saat Menetapkan Batasan Diri. Silakan tulis pertanyaanmu dengan nyaman ya.",
        timestamp: "09:30",
        isReported: false,
      },
      {
        id: "gm-302",
        senderName: "Awan Lembut",
        senderRole: "member",
        text: "Kak Sarah, bagaimana caranya menolak ajakan rekan kerja yang sering melontarkan candaan tidak sopan tanpa membuat suasana kantor canggung?",
        timestamp: "09:38",
        isReported: false,
      },
      {
        id: "gm-303",
        senderName: "Psikolog Sarah Wijaya, M.Psi.",
        senderRole: "psychologist",
        senderAvatar: "/psychologists/sarah.svg",
        text: "Pertanyaan yang sangat relevan, Awan Lembut. Kamu bisa menggunakan kalimat asertif singkat seperti menyampaikan bahwa kamu kurang nyaman dengan topik bercandaan tersebut dan mengajak kembali membahas pekerjaan. Tetap tenang, tegas, dan catat waktunya bila berulang.",
        timestamp: "09:42",
        isReported: false,
      },
    ],
  },
  {
    id: "grp-bangkit-pulih-bersama",
    name: "Bangkit & Pulih Bersama",
    category: "Pemberdayaan Diri",
    description:
      "Komunitas afirmasi positif, latihan kesadaran penuh harian, dan dukungan membangun kembali rasa percaya diri pasca pengalaman traumatis.",
    guidelines:
      "1. Fokus pada dukungan konstruktif, afirmasi lembut, dan pemberdayaan sesama penyintas. 2. Jaga bahasa yang hangat dan inklusif.",
    memberCount: 89,
    isJoined: false,
    icon: "🌿",
    accentBg: "bg-selena-mint",
    badgeText: "🌱 Afirmasi Aktif",
    supervisorName: "Bimo Prasetyo, M.Psi., Psikolog",
    supervisorRole: "Psikolog Klinis & Pendamping Pemulihan",
    supervisorAvatar: "/psychologists/bimo.svg",
    messages: [
      {
        id: "gm-401",
        senderName: "Cahaya Rembulan",
        senderRole: "member",
        text: "Afirmasi pagi ini untuk kita semua: Masa laluku tidak mendefinisikan masa depanku. Aku berhak merasa aman di dalam tubuhku sendiri ✨",
        timestamp: "07:50",
        isReported: false,
      },
      {
        id: "gm-402",
        senderName: "Seruni Damai",
        senderRole: "member",
        text: "Terima kasih pengingatnya! Hari ini aku berhasil menyelesaikan tugas kuliah tepat waktu setelah seminggu sulit fokus.",
        timestamp: "08:25",
        isReported: false,
      },
    ],
  },
];

export const PSYCHOLOGISTS: Psychologist[] = [
  {
    id: "psy-1",
    name: "dr. Nadya Larasati, M.Psi., Psikolog",
    specialty: "Trauma Kekerasan Seksual, EMDR & Regulasi Somatik",
    experience: "9 Tahun Pengalaman",
    isOnline: true,
    strNumber: "STR-PK-2026-08912",
    avatarColor: "#CDB4DB",
    avatarUrl: "/psychologists/nadya.svg",
    hospital: "Klinik Pulih Bersama & Mitra SELENA Jakarta",
    rating: "4.9 (340+ Sesi)",
    sessionCount: 348,
    scheduleSlots: [
      "Hari Ini • 15:00 WIB",
      "Hari Ini • 19:00 WIB",
      "Besok • 10:00 WIB",
      "Besok • 14:00 WIB",
    ],
    bio: "Psikolog Klinis Dewasa dengan spesialisasi terapi trauma berbasis somatik dan EMDR. Berpengalaman mendampingi penyintas pelecehan seksual dengan pendekatan trauma-informed care yang hangat dan rahasia.",
    messages: [
      {
        id: "cm-101",
        senderName: "dr. Nadya Larasati, M.Psi., Psikolog",
        senderRole: "psychologist",
        text: "Halo Kupu-Kupu Senja 💜 Selamat datang di ruang konsultasi privat SELENA. Seluruh percakapan kita dijamin kerahasiaannya sesuai kode etik psikologi. Bagaimana kabar hati dan tubuhmu hari ini?",
        timestamp: "09:00",
        messageType: "text",
      },
      {
        id: "cm-102",
        senderName: "Kupu-Kupu Senja",
        senderRole: "user",
        text: "Halo Ibu Nadya, terima kasih. Akhir-akhir ini saya sering tiba-tiba teringat kejadian tidak menyenangkan di tempat kerja dan dada saya langsung berdebar kencang.",
        timestamp: "09:04",
        messageType: "text",
      },
      {
        id: "cm-103",
        senderName: "dr. Nadya Larasati, M.Psi., Psikolog",
        senderRole: "psychologist",
        text: "Terima kasih sudah berani berbagi, Kupu-Kupu Senja. Respons berdebar itu adalah reaksi alami sistem sarafmu saat mendeteksi pengingat trauma. Kamu tidak sendiri dan kamu sama sekali tidak bersalah. Mau kita bahas pemicunya perlahan atau kita latihan menenangkan tubuh terlebih dahulu?",
        timestamp: "09:06",
        messageType: "text",
      },
    ],
  },
  {
    id: "psy-2",
    name: "Psikolog Sarah Wijaya, M.Psi.",
    specialty: "Kecemasan, Panic Attack & Self-Compassion",
    experience: "7 Tahun Pengalaman",
    isOnline: true,
    strNumber: "STR-PK-2026-05421",
    avatarColor: "#FFC8DD",
    avatarUrl: "/psychologists/sarah.svg",
    hospital: "Pusat Konseling Ruang Hati & Mitra SELENA Bandung",
    rating: "4.9 (280+ Sesi)",
    sessionCount: 285,
    scheduleSlots: [
      "Hari Ini • 16:30 WIB",
      "Hari Ini • 20:00 WIB",
      "Besok • 09:00 WIB",
      "Besok • 15:30 WIB",
    ],
    bio: "Berfokus pada terapi kognitif perilaku dan praktik welas asih diri untuk membantu penyintas melepaskan rasa menyalahkan diri sendiri serta mengatasi serangan panik.",
    messages: [
      {
        id: "cm-201",
        senderName: "Psikolog Sarah Wijaya, M.Psi.",
        senderRole: "psychologist",
        text: "Halo sahabat SELENA 🌸 Aku Psikolog Sarah. Ruang ini sepenuhnya aman untukmu bercerita dengan ritmemu sendiri. Apa yang ingin kamu bagikan hari ini?",
        timestamp: "10:15",
        messageType: "text",
      },
    ],
  },
  {
    id: "psy-3",
    name: "Bimo Prasetyo, M.Psi., Psikolog",
    specialty: "Batasan Diri, Pendampingan Kampus/Kerja & Krisis Emosi",
    experience: "6 Tahun Pengalaman",
    isOnline: true,
    strNumber: "STR-PK-2026-03319",
    avatarColor: "#D8F3DC",
    avatarUrl: "/psychologists/bimo.svg",
    hospital: "Lembaga Pendampingan Psikologis & Mitra SELENA Yogyakarta",
    rating: "4.8 (210+ Sesi)",
    sessionCount: 214,
    scheduleSlots: [
      "Hari Ini • 14:00 WIB",
      "Hari Ini • 18:30 WIB",
      "Besok • 11:00 WIB",
      "Besok • 16:00 WIB",
    ],
    bio: "Pendamping psikologis yang berfokus pada penguatan batasan diri, pemulihan rasa aman di lingkungan sosial maupun kampus, dan pertolongan pertama psikologis.",
    messages: [
      {
        id: "cm-301",
        senderName: "Bimo Prasetyo, M.Psi., Psikolog",
        senderRole: "psychologist",
        text: "Salam hangat 🌿 Saya Bimo. Ruang konsultasi ini terbuka untuk mendampingimu menyusun langkah pemulihan dan batasan diri yang aman. Silakan ceritakan kondisimu saat ini.",
        timestamp: "08:45",
        messageType: "text",
      },
    ],
  },
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "notif-1",
    title: "Selamat Datang di Ruang Aman SELENA 💜",
    message:
      "Privasi dan kenyamananmu adalah prioritas utama kami. Identitas anonimmu Kupu-Kupu Senja telah aktif dan terlindungi.",
    timestamp: "Baru saja",
    type: "welcome",
    link: "/profil",
    isRead: false,
  },
  {
    id: "notif-2",
    title: "Balasan Baru dari dr. Nadya Larasati, M.Psi.",
    message:
      "Psikolog Nadya telah membalas pesan konsultasi 1-on-1 kamu: Terima kasih sudah berani berbagi, Kupu-Kupu Senja.",
    timestamp: "10 menit lalu",
    type: "psychologist",
    link: "/konsultasi/psy-1",
    isRead: false,
  },
  {
    id: "notif-3",
    title: "Afirmasi Lembut Hari Ini 🌸",
    message:
      "Kamu tidak harus menyembuhkan semuanya sekaligus hari ini. Satu tarikan napas tenang sudah merupakan keberanian.",
    timestamp: "1 jam lalu",
    type: "affirmation",
    link: "/dashboard-user",
    isRead: false,
  },
  {
    id: "notif-4",
    title: "Panduan Kehangatan Ruang Komunitas 🛡️",
    message:
      "Terima kasih telah menjaga ruang diskusi tetap empatik, bebas penghakiman, dan saling menguatkan antar sesama penyintas.",
    timestamp: "Kemarin",
    type: "community",
    link: "/komunitas",
    isRead: true,
  },
];
