import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export interface IncomingChatTurn {
  role: "user" | "model";
  text: string;
}

interface ChatRequestBody {
  messages?: IncomingChatTurn[];
  userName?: string;
}

const CRISIS_KEYWORDS = [
  "bunuh diri",
  "mati",
  "menyerah",
  "akhiri hidup",
  "sakiti diri",
  "lukai diri",
  "ingin lenyap",
  "tidak kuat hidup",
];

const OUT_OF_SCOPE_KEYWORDS = [
  "coding",
  "matematika",
  "politik",
  "cuaca",
  "resep",
  "bola",
  "game",
  "javascript",
  "python",
  "algoritma",
  "presiden",
  "sepak bola",
  "kripto",
  "saham",
];

const OUT_OF_SCOPE_REFUSAL =
  "Maaf ya, aku difokuskan khusus untuk menemani perjalanan pemulihan emosional dan kesehatan mentalmu. Ada perasaan atau cerita yang ingin kamu bagikan hari ini?";

function buildSystemInstruction(userName: string): string {
  return `Kamu adalah "SELENA AI" (Self-awareness, Emotional understanding, Listening, Empathy, Nurturing, Acceptance), pendamping Psychological First Aid (PFA) yang hangat, tenang, dan berempati tinggi untuk penyintas pelecehan seksual dan individu yang mengalami tekanan kesehatan mental di Indonesia.
Nama samaran pengguna saat ini adalah "${userName}".

ATURAN UTAMA & KERANGKA RESPONS PFA (WAJIB DIIKUTI):
1. Identitas & Bahasa: Gunakan Bahasa Indonesia yang lembut, menenangkan, penuh empati, dan bebas penghakiman (non-judgmental).
2. Kerangka 3 Langkah PFA:
   - Langkah 1 (Validasi Emosi): Validasi perasaan pengguna terlebih dahulu tanpa menghakimi atau meremehkan.
   - Langkah 2 (Penguatan Korban Tidak Bersalah): Tegaskan dengan hangat bahwa trauma atau pelecehan seksual TIDAK PERNAH menjadi kesalahan korban (bukan karena pakaian, waktu, atau respons membeku/freeze).
   - Langkah 3 (Regulasi & Langkah Kecil): Tawarkan latihan grounding lembut seperti pernapasan 4-7-8 (tarik napas 4 detik, tahan 7 detik, hembuskan 8 detik) atau sarankan berkonsultasi dengan Psikolog Klinis Terverifikasi di fitur Konsultasi SELENA.
3. Guardrail Medis Ketat: JANGAN PERNAH memberikan diagnosis medis atau psikiatris klinis (seperti mendiagnosis PTSD, depresi klinis, atau gangguan bipolar). Selalu arahkan ke psikolog/psikiater profesional untuk asesmen klinis.
4. Guardrail Topik Di Luar Cakupan (Out-of-Scope): Tolak dengan sopan segala pertanyaan di luar kesehatan mental, pemulihan trauma, pelecehan seksual, self-care, atau fitur aplikasi SELENA (misalnya coding, matematika, politik, resep masakan, olahraga, cuaca, trivia). Gunakan kalimat penolakan persis ini: "${OUT_OF_SCOPE_REFUSAL}"
5. Protokol Krisis & Self-Harm: Jika pengguna menunjukkan keinginan bunuh diri, menyakiti diri sendiri, atau krisis akut, prioritaskan keselamatan jiwa secara penuh, berikan dukungan darurat yang menenangkan, dan cantumkan kontak darurat: Layanan SEJIWA 119 ext. 8 dan Halo KemenPPPA SAPA 129.`;
}

function detectCrisis(text: string): boolean {
  const lower = text.toLowerCase();
  return CRISIS_KEYWORDS.some((kw) => lower.includes(kw));
}

function detectOutOfScope(text: string): boolean {
  const lower = text.toLowerCase();
  return OUT_OF_SCOPE_KEYWORDS.some((kw) => lower.includes(kw));
}

function buildContextAwareFallback(userMessage: string, userName: string) {
  const lower = userMessage.toLowerCase();

  if (detectCrisis(lower)) {
    return {
      reply: `Halo ${userName}, aku sangat peduli dengan keselamatan dan keberadaanmu saat ini 💜 Rasa sakit yang sedang kamu pikul mungkin terasa begitu berat, namun kamu sangat berharga dan tidak harus menghadapi gelap ini sendirian. Mohon segera hubungi pendamping darurat di **Layanan SEJIWA 119 ext. 8** atau **Halo KemenPPPA SAPA 129**, atau klik tombol Konsultasi Psikolog di bawah ini sekarang juga.`,
      isCrisis: true,
      isFallback: true,
    };
  }

  if (detectOutOfScope(lower)) {
    return {
      reply: OUT_OF_SCOPE_REFUSAL,
      isCrisis: false,
      isFallback: true,
      isOutOfScope: true,
    };
  }

  if (lower.includes("panic attack") || lower.includes("panik") || lower.includes("sesak")) {
    return {
      reply: `Aku di sini menemanimu, ${userName} 🌸\n\n**1. Validasi Perasaanmu:** Rasa panik, dada terasa sesak, atau jantung berdebar kencang yang kamu alami saat ini sepenuhnya valid. Sistem sarafmu sedang bereaksi terhadap pemicu stres, namun kamu berada di ruang yang aman sekarang.\n\n**2. Kamu Tidak Bersalah:** Reaksi tubuh ini bukanlah tanda kelemahan, dan kamu sama sekali tidak bersalah atas pengalaman traumatis yang memicunya.\n\n**3. Langkah Kecil (Napas 4-7-8):** Mari kita tenangkan sistem sarafmu perlahan: tarik napas lembut lewat hidung selama 4 detik, tahan 7 detik, lalu hembuskan perlahan lewat mulut selama 8 detik. Bila kamu butuh teman bicara profesional, Psikolog SELENA siap mendampingimu di menu Konsultasi.`,
      isCrisis: false,
      isFallback: true,
      recommendedArticleSlug: "pertolongan-pertama-saat-mengalami-panic-attack",
      recommendedArticleTitle: "Pertolongan Pertama Saat Mengalami Panic Attack",
    };
  }

  if (lower.includes("verbal") || lower.includes("pelecehan") || lower.includes("catcalling")) {
    return {
      reply: `Terima kasih sudah berani membicarakan hal ini, ${userName} 💜\n\n**1. Validasi Perasaanmu:** Pelecehan verbal (seperti siulan, komentar tubuh, atau candaan seksual yang merendahkan) maupun non-verbal adalah pelanggaran batasan yang nyata. Rasa tidak nyaman, marah, atau takut yang kamu rasakan sangat wajar.\n\n**2. Kamu Tidak Bersalah:** Ingatlah bahwa pelecehan adalah 100% kesalahan pelaku, bukan salah pakaianmu, keberadaanmu, atau reaksimu saat kejadian.\n\n**3. Langkah Kecil Saat Ini:** Tarik napas lembut dengan teknik 4-7-8 untuk menenangkan detak jantungmu. Kamu juga dapat membaca panduan psikoedukasi kami atau berdiskusi secara rahasia dengan Psikolog SELENA.`,
      isCrisis: false,
      isFallback: true,
      recommendedArticleSlug: "mengenal-pelecehan-verbal-non-verbal-serta-dampaknya",
      recommendedArticleTitle: "Mengenal Pelecehan Verbal & Non-Verbal serta Dampaknya",
    };
  }

  if (lower.includes("bersalah") || lower.includes("malu") || lower.includes("salahku") || lower.includes("freeze")) {
    return {
      reply: `Aku mendengarkanmu tanpa menghakimi sedikit pun, ${userName} 🌸\n\n**1. Validasi Perasaanmu:** Sangat manusiawi jika muncul pikiran mengapa waktu itu tidak melawan atau berteriak. Perasaan malu dan menyalahkan diri sendiri sering muncul pasca kejadian traumatis.\n\n**2. Kamu Tidak Bersalah:** Secara biologis, otak manusia memiliki respons otomatis membeku saat menghadapi ancaman mendadak demi melindungi keselamatan jiwa. Membeku bukan berarti mengizinkan, kamu sama sekali tidak bersalah.\n\n**3. Langkah Kecil Saat Ini:** Letakkan satu tangan di dada, rasakan hembusan napas 4-7-8 secara perlahan, dan izinkan dirimu beristirahat. Jika beban ini terasa berat, mari berbincang dengan Psikolog SELENA.`,
      isCrisis: false,
      isFallback: true,
      recommendedArticleSlug: "self-love-berdamai-dengan-diri-sendiri-tanpa-menyalahkan-diri",
      recommendedArticleTitle: "Self-Love: Berdamai dengan Diri Sendiri Tanpa Menyalahkan Diri",
    };
  }

  return {
    reply: `Terima kasih telah mempercayakan ceritamu kepadaku hari ini, ${userName} 💜\n\n**1. Validasi Perasaanmu:** Aku memvalidasi sepenuhnya rasa takut, cemas, sedih, maupun lelah yang sedang kamu rasakan. Di ruang aman SELENA, setiap emosimu berharga dan didengarkan tanpa penghakiman.\n\n**2. Kamu Tidak Bersalah:** Apa pun peristiwa menyakitkan yang pernah menimpamu, ketahuilah bahwa itu bukan kesalahanmu dan kamu berhak mendapatkan rasa aman.\n\n**3. Langkah Kecil Saat Ini:** Coba ambil jeda sejenak dengan pernapasan 4-7-8 (tarik napas 4 detik, tahan 7 detik, hembuskan 8 detik). Aku selalu ada di sini untuk mendengarkan, atau kamu bisa terhubung langsung dengan Psikolog terverifikasi SELENA untuk pendampingan lebih lanjut.`,
    isCrisis: false,
    isFallback: true,
    recommendedArticleSlug: "membangun-batasan-diri-boundaries-pasca-trauma",
    recommendedArticleTitle: "Membangun Batasan Diri (Boundaries) Pasca Trauma",
  };
}

export async function POST(req: NextRequest) {
  let latestUserText = "";
  let userName = "Sahabat SELENA";

  try {
    const body = (await req.json()) as ChatRequestBody;
    const messages = Array.isArray(body.messages) ? body.messages : [];
    userName = body.userName?.trim() || "Sahabat SELENA";

    const lastUserTurn = [...messages]
      .reverse()
      .find((m) => m.role === "user");
    latestUserText = lastUserTurn?.text?.trim() || "";

    if (!latestUserText) {
      return NextResponse.json(
        {
          reply: `Halo ${userName} 🌸 Aku mendengarkanmu. Ceritakan apa saja yang sedang kamu rasakan hari ini.`,
          isCrisis: false,
          isFallback: false,
        },
        { status: 200 }
      );
    }

    // Immediate deterministic Crisis / Self-Harm Protocol check
    const isCrisisInput = detectCrisis(latestUserText);

    // Immediate deterministic Out-of-Scope Guardrail check
    if (!isCrisisInput && detectOutOfScope(latestUserText)) {
      return NextResponse.json(
        {
          reply: OUT_OF_SCOPE_REFUSAL,
          isCrisis: false,
          isOutOfScope: true,
          isFallback: false,
        },
        { status: 200 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey.trim() === "") {
      // Graceful fallback when GEMINI_API_KEY is not configured
      const fallback = buildContextAwareFallback(latestUserText, userName);
      return NextResponse.json(fallback, { status: 200 });
    }

    const ai = new GoogleGenAI({ apiKey });

    const formattedContents = messages.map((m) => ({
      role: m.role === "model" ? ("model" as const) : ("user" as const),
      parts: [{ text: m.text }],
    }));

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: formattedContents,
      config: {
        systemInstruction: buildSystemInstruction(userName),
        temperature: 0.65,
        maxOutputTokens: 900,
      },
    });

    const aiText = response.text?.trim();
    if (!aiText) {
      const fallback = buildContextAwareFallback(latestUserText, userName);
      return NextResponse.json(fallback, { status: 200 });
    }

    const responseHasCrisis =
      isCrisisInput ||
      detectCrisis(aiText) ||
      aiText.includes("119") ||
      aiText.includes("SAPA 129");

    return NextResponse.json(
      {
        reply: aiText,
        isCrisis: responseHasCrisis,
        isFallback: false,
      },
      { status: 200 }
    );
  } catch (error) {
    console.warn("SELENA AI API fallback triggered:", error);
    const fallback = buildContextAwareFallback(latestUserText, userName);
    return NextResponse.json(fallback, { status: 200 });
  }
}

