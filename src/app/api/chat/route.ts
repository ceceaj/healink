import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export interface IncomingTurn {
  role: "user" | "model";
  text: string;
}

export interface LearningCardAttachment {
  title: string;
  pillar: string;
  emoji: string;
  description: string;
  href: string;
  ctaLabel: string;
  bgClass: string;
  borderClass: string;
}

interface ChatBody {
  messages?: IncomingTurn[];
  childName?: string;
}

const TRUSTED_ADULT_GUARDRAIL_REPLY =
  "Kamu hebat sudah berani bercerita. Aku cuma robot teman belajar, jadi aku tidak bisa menangani masalah ini sendirian. Yuk, segera ceritakan hal ini ke orang dewasa yang kamu percaya—seperti Orang Tua, Guru, atau Kakak Relawan JEKATA di dekatmu ya.";

const OUT_OF_SCOPE_REPLY =
  "Halo Sahabat! Aku Sahabat HEALINK yang khusus menemanimu belajar tentang 4 Pulau Keamanan Diri (Aturan Baju Renang, Mengenal Perasaan, Situasi Aman, dan Berani Minta Tolong). Yuk tanya tentang topik keamanan diri atau minta dongeng keberanian ya! 🦉✨";

const CASE_OR_DIAGNOSIS_KEYWORDS = [
  "disentuh paksa",
  "dipukul",
  "disakiti",
  "dilecehkan",
  "dicabuli",
  "diancam",
  "dipaksa buka baju",
  "sentuh kemaluan",
  "trauma berat",
  "depresi",
  "diagnosis",
  "psikiater",
  "bunuh diri",
  "sakiti diri",
  "aku takut ada yang menyentuhku",
  "ada orang menyentuh",
];

const OUT_OF_SCOPE_KEYWORDS = [
  "matematika",
  "perkalian",
  "pembagian",
  "pr sekolah",
  "politik",
  "presiden",
  "coding",
  "javascript",
  "python",
  "free fire",
  "mobile legends",
  "roblox",
  "resep masakan",
  "kripto",
];

function detectNeedsTrustedAdult(text: string): boolean {
  const lower = text.toLowerCase();
  return CASE_OR_DIAGNOSIS_KEYWORDS.some((kw) => lower.includes(kw));
}

function detectOutOfScope(text: string): boolean {
  const lower = text.toLowerCase();
  return OUT_OF_SCOPE_KEYWORDS.some((kw) => lower.includes(kw));
}

function matchLearningCard(
  userText: string,
  aiText?: string
): LearningCardAttachment | null {
  const combined = `${userText} ${aiText || ""}`.toLowerCase();

  if (
    combined.includes("baju renang") ||
    combined.includes("batasan pribadi") ||
    combined.includes("tubuhku berharga") ||
    combined.includes("bilang tidak") ||
    combined.includes("bagian pribadi")
  ) {
    return {
      title: "Pulau 1: Tubuhku Berharga (Batasan Pribadi)",
      pillar: "Aturan Baju Renang & Berkata TIDAK",
      emoji: "🛡️🩱",
      description:
        "Pelajari 4 cerita bergambar tentang menjaga bagian tubuh pribadi dan 3 Jurus Jagoan!",
      href: "/anak/materi/batasan-pribadi",
      ctaLabel: "Buka Cerita Tubuhku Berharga →",
      bgClass: "bg-[#E0F2FE]",
      borderClass: "border-[#0284C7]",
    };
  }

  if (
    combined.includes("emosi") ||
    combined.includes("perasaan") ||
    combined.includes("alarm tubuh") ||
    combined.includes("napas balon") ||
    combined.includes("berdebar")
  ) {
    return {
      title: "Pulau 2: Kenali Perasaanku (Pengenalan Emosi)",
      pillar: "Radar Emosi & Alarm Tubuh",
      emoji: "💛🎈",
      description:
        "Kenali sinyal alarm tubuh saat tidak nyaman dan latihan Napas Balon 1-2-3!",
      href: "/anak/materi/pengenalan-emosi",
      ctaLabel: "Buka Cerita Kenali Perasaanku →",
      bgClass: "bg-[#FEF3C7]",
      borderClass: "border-[#D97706]",
    };
  }

  if (
    combined.includes("minta tolong") ||
    combined.includes("cerita ke siapa") ||
    combined.includes("orang dewasa") ||
    combined.includes("5 jari") ||
    combined.includes("takut") ||
    combined.includes("jekata")
  ) {
    return {
      title: "Pulau 4: Berani Minta Tolong",
      pillar: "Lingkaran 5 Jari Orang Dewasa Tepercaya",
      emoji: "🤝🖐️",
      description:
        "Kenali 5 orang dewasa pelindung di sekitarmu (Orang Tua, Guru, Relawan JEKATA) dan cara bicara dengan berani.",
      href: "/anak/materi/cari-pertolongan",
      ctaLabel: "Buka Cerita Berani Minta Tolong →",
      bgClass: "bg-[#FFE4E6]",
      borderClass: "border-[#E11D48]",
    };
  }

  if (
    combined.includes("rahasia") ||
    combined.includes("permen") ||
    combined.includes("orang asing") ||
    combined.includes("situasi aman") ||
    combined.includes("simulasi")
  ) {
    return {
      title: "Game Simulasi: Aman atau Tidak Aman?",
      pillar: "Latihan Detektif Keamanan Diri",
      emoji: "🎮🔍",
      description:
        "Latih kemampuanmu membedakan Kejutan Baik vs Rahasia Buruk dalam 6 skenario interaktif!",
      href: "/anak/simulasi",
      ctaLabel: "Mainkan Simulasi Sekarang →",
      bgClass: "bg-[#D1FAE5]",
      borderClass: "border-[#059669]",
    };
  }

  return null;
}

function buildSystemInstruction(childName: string): string {
  return `Kamu adalah Sahabat HEALINK, asisten belajar ramah anak untuk program Safety Learning JEKATA Purwakarta & Yayasan CARE Peduli di Desa Cibodas.
Kamu sedang menemani anak bernama "${childName}".

CAKUPAN & BATASAN KETAT (WAJIB DIIKUTI):
1. Ruang Lingkup Edukasi: HANYA menjawab pertanyaan seputar 4 pilar keamanan diri anak:
   - Batasan Pribadi (Aturan Baju Renang: bibir, dada, kemaluan, dan pantat adalah bagian pribadi; berani berkata TIDAK).
   - Pengenalan Emosi (Senang, Sedih, Takut, Marah, serta mengenali sinyal Alarm Tubuh saat merasa tidak nyaman).
   - Situasi Aman vs Tidak Aman (Kejutan Baik vs Rahasia Buruk, menolak ajakan/hadiah ke tempat sepi).
   - Cara Mencari Pertolongan (Lingkaran 5 Jari Orang Dewasa Tepercaya: Orang Tua, Keluarga dekat, Guru, Kakak Relawan JEKATA, dan Petugas Desa).
   Kamu juga boleh menceritakan dongeng singkat ramah anak tentang keberanian menjaga diri, atau membantu Relawan JEKATA mencari ide ice-breaking/fasilitasi edukasi anak.
2. Hard Guardrail 1 (DILARANG Mendiagnosis & DILARANG Menangani Kasus): Jika anak menyebutkan dirinya disakiti, disentuh secara tidak pantas, mengalami kekerasan, atau meminta diagnosis psikologis, JANGAN mendiagnosis dan JANGAN menginvestigasi kasusnya. Balas persis dengan kalimat lembut ini:
   "${TRUSTED_ADULT_GUARDRAIL_REPLY}"
3. Hard Guardrail 2 (Topik di Luar Cakupan): Tolak dengan sopan topik yang tidak berkaitan (seperti PR matematika, politik, game online, atau coding) dan ajak kembali belajar keamanan diri.
4. Gaya Bahasa: Gunakan Bahasa Indonesia yang ceria, hangat, kalimat pendek yang mudah dipahami anak SD, dan tidak menakut-nakuti.`;
}

function buildSmartLocalFallback(userText: string, childName: string): string {
  const lower = userText.toLowerCase();

  if (lower.includes("dongeng") || lower.includes("ceritain") || lower.includes("bilang tidak")) {
    return `Yuk dengarkan dongeng singkat tentang **Kiko si Kelinci Pemberani**! 🐰🌟\n\nSuatu sore di pinggir lapangan desa, ada orang asing membawa wortel manis dan mengajak Kiko pergi ke kebun yang sepi. Perut Kiko terasa tidak nyaman—alarm tubuhnya berbunyi! Kiko langsung mundur, mengangkat tangan, dan berkata dengan suara lantang: **"TIDAK MAU!"** Lalu Kiko berlari ke arah Ibu dan Kakak Relawan JEKATA yang sedang berada di Balai Desa. Ibu memeluk Kiko dengan bangga karena Kiko berani menjaga dirinya tetap aman!`;
  }

  if (lower.includes("baju renang") || lower.includes("batasan") || lower.includes("tubuh")) {
    return `Pertanyaan hebat, ${childName}! 🩱🛡️ **Aturan Baju Renang** artinya bagian tubuh kita yang tertutup baju renang—yaitu **dada, bagian di antara paha (kemaluan), dan pantat**, ditambah **bibir**—adalah bagian tubuh pribadi yang sangat berharga. Tidak ada seorang pun yang boleh melihat atau menyentuhnya. Kalau ada yang mencoba menyentuh, gunakan 3 Jurus Jagoan: teriak **TIDAK!**, **LARI** ke tempat ramai, dan **CERITA** ke orang tua atau Kakak Relawan JEKATA!`;
  }

  if (
    lower.includes("takut") ||
    lower.includes("cerita ke siapa") ||
    lower.includes("minta tolong") ||
    lower.includes("emosi")
  ) {
    return `Kalau kamu merasa takut, kaget, atau tidak nyaman, kamu tidak sendirian ya, ${childName}! 🖐️💛 Ingat **5 Jari Orang Dewasa Tepercaya** yang selalu siap melindungimu:\n1. Ayah dan Ibu di rumah\n2. Kakek, Nenek, atau Kakak kandung\n3. Bapak dan Ibu Guru di sekolah\n4. Kakak Relawan JEKATA di Desa Cibodas\n5. Pak RT/Perangkat Desa atau Polisi\n\nTarik napas balon 1-2-3 perlahan, lalu ceritakan kepada mereka sampai kamu dibantu!`;
  }

  if (lower.includes("ice breaking") || lower.includes("relawan") || lower.includes("fasilitasi")) {
    return `Halo Kakak Relawan JEKATA! 📋✨ Untuk *ice-breaking* sesi edukasi 25+ anak di Desa Cibodas, Kakak bisa menggunakan permainan **"Lampu Merah, Lampu Hijau Keamanan"**: saat Kakak menyebut situasi aman (misal: *bersalaman dengan teman*), anak-anak melompat sambil berseru **"HIJAU AMAN!"**. Saat Kakak menyebut situasi berisiko (misal: *diajak orang asing ke tempat sepi*), anak-anak menyilangkan tangan di dada sambil berseru **"MERAH TIDAK!"**.`;
  }

  return `Halo ${childName} yang hebat! 🦉✨ Aku Sahabat HEALINK, teman belajarmu dari JEKATA Purwakarta. Kamu bisa memintaku menceritakan dongeng berani bilang TIDAK, bertanya tentang Aturan Baju Renang, mengenal Alarm Tubuh, atau cara meminta pertolongan ke 5 Jari Pelindung!`;
}

export async function POST(req: NextRequest) {
  let latestUserText = "";
  let childName = "Sahabat Ceria";

  try {
    const body = (await req.json()) as ChatBody;
    const messages = Array.isArray(body.messages) ? body.messages : [];
    childName = body.childName?.trim() || "Sahabat Ceria";

    const lastUser = [...messages].reverse().find((m) => m.role === "user");
    latestUserText = lastUser?.text?.trim() || "";

    if (!latestUserText) {
      return NextResponse.json({
        reply: `Halo ${childName}! 🦉 Aku Sahabat HEALINK. Mau dengar dongeng keberanian atau belajar Aturan Baju Renang hari ini?`,
        needsTrustedAdult: false,
        learningCard: null,
      });
    }

    // Hard Guardrail 1: Immediate check for case disclosure / being hurt / diagnosis request
    if (detectNeedsTrustedAdult(latestUserText)) {
      return NextResponse.json({
        reply: TRUSTED_ADULT_GUARDRAIL_REPLY,
        needsTrustedAdult: true,
        learningCard: matchLearningCard("minta tolong"),
      });
    }

    // Hard Guardrail 2: Out-of-scope check
    if (detectOutOfScope(latestUserText)) {
      return NextResponse.json({
        reply: OUT_OF_SCOPE_REPLY,
        needsTrustedAdult: false,
        learningCard: null,
      });
    }

    const preMatchedCard = matchLearningCard(latestUserText);
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey || !apiKey.trim()) {
      const fallbackReply = buildSmartLocalFallback(latestUserText, childName);
      return NextResponse.json({
        reply: fallbackReply,
        needsTrustedAdult: false,
        learningCard:
          preMatchedCard || matchLearningCard(latestUserText, fallbackReply),
        isFallback: true,
      });
    }

    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: messages.map((m) => ({
        role: m.role,
        parts: [{ text: m.text }],
      })),
      config: {
        systemInstruction: buildSystemInstruction(childName),
        temperature: 0.6,
        maxOutputTokens: 500,
      },
    });

    const aiText =
      response.text?.trim() ||
      buildSmartLocalFallback(latestUserText, childName);

    const needsAdultInResponse =
      detectNeedsTrustedAdult(aiText) ||
      aiText.includes("Aku cuma robot teman belajar");

    return NextResponse.json({
      reply: needsAdultInResponse ? TRUSTED_ADULT_GUARDRAIL_REPLY : aiText,
      needsTrustedAdult: needsAdultInResponse,
      learningCard:
        preMatchedCard || matchLearningCard(latestUserText, aiText),
      isFallback: false,
    });
  } catch {
    const fallbackReply = buildSmartLocalFallback(latestUserText, childName);
    return NextResponse.json({
      reply: fallbackReply,
      needsTrustedAdult: false,
      learningCard: matchLearningCard(latestUserText, fallbackReply),
      isFallback: true,
    });
  }
}
