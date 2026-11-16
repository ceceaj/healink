"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSelena } from "@/context/SelenaContext";
import { ANONYMOUS_ALIASES } from "@/data/mockData";
import {
  ShieldCheck,
  Sparkles,
  UserCheck,
  Stethoscope,
  RefreshCw,
  Lock,
  Mail,
  Phone,
  User,
  Eye,
  EyeOff,
  HeartHandshake,
} from "lucide-react";

export default function SplashLoginPage() {
  const router = useRouter();
  const { loginAsRole } = useSelena();

  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [showPassword, setShowPassword] = useState(false);

  // Login Form State
  const [loginIdentifier, setLoginIdentifier] = useState(
    "maya.senja@selena.id"
  );
  const [loginPassword, setLoginPassword] = useState("••••••••");
  const [loginRole, setLoginRole] = useState<"user" | "admin">("user");

  // Register Form State
  const [regAlias, setRegAlias] = useState("Kupu-Kupu Senja");
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [aliasIndex, setAliasIndex] = useState(0);
  const [feedbackToast, setFeedbackToast] = useState<string | null>(null);

  const handleGenerateAlias = () => {
    const nextIdx = (aliasIndex + 1) % ANONYMOUS_ALIASES.length;
    setAliasIndex(nextIdx);
    const chosen = ANONYMOUS_ALIASES[nextIdx];
    setRegAlias(chosen);
    setFeedbackToast(`Alias anonim dibuat: "${chosen}" ✨`);
    setTimeout(() => setFeedbackToast(null), 2500);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginRole === "admin") {
      loginAsRole("admin", {
        email: loginIdentifier || "nadya.psikolog@selena.id",
      });
      router.push("/dashboard-admin");
    } else {
      const isEmail = loginIdentifier.includes("@");
      loginAsRole("user", {
        email: isEmail ? loginIdentifier : "maya.senja@selena.id",
        alias: !isEmail && loginIdentifier.trim() ? loginIdentifier.trim() : "Kupu-Kupu Senja",
      });
      router.push("/dashboard-user");
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanAlias = regAlias.trim() || "Kupu-Kupu Senja";
    const cleanName = regName.trim() || cleanAlias;
    const cleanEmail = regEmail.trim() || "penyintas.aman@selena.id";
    const cleanPhone = regPhone.trim() || "0812-8899-0011";

    loginAsRole("user", {
      name: cleanName,
      alias: cleanAlias,
      email: cleanEmail,
      phone: cleanPhone,
      bio: `Anggota baru ruang aman SELENA dengan identitas terlindungi (${cleanAlias}).`,
    });
    router.push("/dashboard-user");
  };

  const handleQuickMember = () => {
    loginAsRole("user");
    router.push("/dashboard-user");
  };

  const handleQuickAdmin = () => {
    loginAsRole("admin");
    router.push("/dashboard-admin");
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#FAFAFA] shadow-xl relative pb-12 flex flex-col justify-between overflow-hidden">
      {/* Toast Notification */}
      {feedbackToast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-2xl bg-[#1D1A39] text-white text-xs font-bold shadow-lg flex items-center gap-2 animate-fade-in">
          <Sparkles className="w-4 h-4 text-[#FFC8DD]" />
          <span>{feedbackToast}</span>
        </div>
      )}

      {/* Top Warm Pastel Gradient Hero (#CDB4DB -> #FFC8DD -> #FAFAFA) */}
      <div className="w-full bg-gradient-to-b from-[#CDB4DB] via-[#FFC8DD]/80 to-[#FAFAFA] pt-6 pb-6 px-6 relative">
        {/* Top Sanctuary Pill */}
        <div className="flex items-center justify-between mb-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/85 backdrop-blur-md border border-white shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] font-extrabold text-[#1D1A39] tracking-tight">
              Ruang Aman Pemulihan 24/7
            </span>
          </div>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/70 text-[11px] font-bold text-[#1D1A39]">
            <Lock className="w-3 h-3 text-[#6B5779]" />
            <span>Anonim &amp; Terenkripsi</span>
          </span>
        </div>

        {/* Brand Identity Card */}
        <div className="text-center flex flex-col items-center">
          <div className="w-16 h-16 rounded-3xl bg-white/90 shadow-gentle-card border border-white flex items-center justify-center mb-3">
            <HeartHandshake className="w-9 h-9 text-[#6B5779]" />
          </div>

          <h1 className="text-3xl font-extrabold tracking-wider text-[#1D1A39]">
            SELENA
          </h1>

          <p className="mt-1.5 text-[11px] font-bold tracking-wide text-[#1D1A39]/80 leading-relaxed max-w-[330px] mx-auto">
            Self-awareness, Emotional understanding, Listening, Empathy,
            Nurturing, Acceptance
          </p>

          {/* Tagline Pill */}
          <div className="mt-3 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/90 border border-[#CDB4DB] shadow-sm">
            <ShieldCheck className="w-4 h-4 text-[#6B5779]" />
            <span className="text-xs font-extrabold text-[#1D1A39]">
              Aman, Terpercaya, dan Membantu (ATM)
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <main className="px-5 -mt-2 flex-1 flex flex-col gap-5 relative z-10">
        {/* Instant Demo Access Card for Judges */}
        <section
          aria-label="Akses Cepat Demo Juri"
          className="bg-gradient-to-br from-[#F4EEF8] via-white to-[#FFF0F5] rounded-3xl p-4 shadow-gentle-card border border-[#CDB4DB]/50"
        >
          <div className="flex items-center justify-between mb-2.5">
            <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#1D1A39]">
              <Sparkles className="w-4 h-4 text-[#6B5779]" />
              <span>Akses Instan Demo (1-Klik)</span>
            </span>
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#CDB4DB]/40 text-[#1D1A39]">
              Mode Evaluasi
            </span>
          </div>

          <div className="space-y-2.5">
            <button
              type="button"
              onClick={handleQuickMember}
              className="w-full py-3.5 px-4 bg-[#CDB4DB] hover:bg-[#c1a3d3] active:scale-[0.98] transition-all text-[#1D1A39] font-extrabold rounded-2xl shadow-soft-purple flex items-center justify-center gap-2 text-xs"
            >
              <UserCheck className="w-4 h-4 shrink-0" />
              <span>Masuk Cepat sebagai Member</span>
            </button>

            <button
              type="button"
              onClick={handleQuickAdmin}
              className="w-full py-3.5 px-4 bg-[#FFC8DD] hover:bg-[#f7b5cf] active:scale-[0.98] transition-all text-[#1D1A39] font-extrabold rounded-2xl shadow-soft-pink flex items-center justify-center gap-2 text-xs"
            >
              <Stethoscope className="w-4 h-4 shrink-0" />
              <span>Masuk Cepat sebagai Psikolog/Admin</span>
            </button>
          </div>
        </section>

        {/* Interactive Auth Card: Tab Toggle between "Masuk" and "Daftar Akun Baru" */}
        <section className="bg-white rounded-3xl p-5 shadow-gentle-card border border-[#CDB4DB]/30">
          {/* Tab Switcher */}
          <div className="grid grid-cols-2 gap-1.5 p-1.5 bg-[#F4EEF8] rounded-2xl mb-4">
            <button
              type="button"
              onClick={() => setActiveTab("login")}
              className={`py-2.5 rounded-xl text-xs font-extrabold transition-all ${
                activeTab === "login"
                  ? "bg-white text-[#1D1A39] shadow-sm"
                  : "text-[#4A4E69] hover:text-[#1D1A39]"
              }`}
            >
              Masuk
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("register")}
              className={`py-2.5 rounded-xl text-xs font-extrabold transition-all ${
                activeTab === "register"
                  ? "bg-white text-[#1D1A39] shadow-sm"
                  : "text-[#4A4E69] hover:text-[#1D1A39]"
              }`}
            >
              Daftar Akun Baru
            </button>
          </div>

          {activeTab === "login" ? (
            <form onSubmit={handleLoginSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-extrabold text-[#1D1A39] mb-1">
                  Pilih Peran Masuk
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setLoginRole("user");
                      setLoginIdentifier("maya.senja@selena.id");
                    }}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                      loginRole === "user"
                        ? "bg-[#CDB4DB]/35 border-[#CDB4DB] text-[#1D1A39]"
                        : "bg-[#FAFAFA] border-gray-200 text-[#4A4E69]"
                    }`}
                  >
                    🌸 Member / Penyintas
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setLoginRole("admin");
                      setLoginIdentifier("nadya.psikolog@selena.id");
                    }}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                      loginRole === "admin"
                        ? "bg-[#FFC8DD]/45 border-[#FFC8DD] text-[#1D1A39]"
                        : "bg-[#FAFAFA] border-gray-200 text-[#4A4E69]"
                    }`}
                  >
                    🩺 Psikolog / Admin
                  </button>
                </div>
              </div>

              <div>
                <label
                  htmlFor="login-id"
                  className="block text-xs font-extrabold text-[#1D1A39] mb-1"
                >
                  Email atau Alias Anonim
                </label>
                <div className="relative flex items-center">
                  <Mail className="w-4 h-4 text-[#4A4E69] absolute left-3.5 pointer-events-none" />
                  <input
                    id="login-id"
                    type="text"
                    required
                    value={loginIdentifier}
                    onChange={(e) => setLoginIdentifier(e.target.value)}
                    placeholder="Contoh: Kupu-Kupu Senja atau email..."
                    className="w-full pl-10 pr-4 py-2.5 text-xs font-semibold bg-[#FAFAFA] border border-[#CDB4DB]/40 rounded-2xl text-[#1D1A39] focus:outline-none focus:ring-2 focus:ring-[#CDB4DB]"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="login-password"
                  className="block text-xs font-extrabold text-[#1D1A39] mb-1"
                >
                  Kata Sandi
                </label>
                <div className="relative flex items-center">
                  <Lock className="w-4 h-4 text-[#4A4E69] absolute left-3.5 pointer-events-none" />
                  <input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Masukkan kata sandi..."
                    className="w-full pl-10 pr-10 py-2.5 text-xs font-semibold bg-[#FAFAFA] border border-[#CDB4DB]/40 rounded-2xl text-[#1D1A39] focus:outline-none focus:ring-2 focus:ring-[#CDB4DB]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label="Tampilkan kata sandi"
                    className="absolute right-3 text-[#4A4E69] hover:text-[#1D1A39]"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-[#1D1A39] hover:bg-[#2c2754] active:scale-[0.98] transition-all text-white font-extrabold rounded-2xl text-xs shadow-sm"
              >
                Masuk ke Ruang Aman SELENA →
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
              {/* Anonymous Alias Field + Generator */}
              <div className="p-3 rounded-2xl bg-[#F4EEF8]/80 border border-[#CDB4DB]/40">
                <div className="flex items-center justify-between mb-1.5">
                  <label
                    htmlFor="reg-alias"
                    className="text-xs font-extrabold text-[#1D1A39]"
                  >
                    Nama / Alias Anonim (Publik)
                  </label>
                  <button
                    type="button"
                    onClick={handleGenerateAlias}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-[#CDB4DB] hover:bg-[#FFC8DD] text-[#1D1A39] text-[11px] font-extrabold transition-all active:scale-95 shadow-sm"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Generate Alias Anonim</span>
                  </button>
                </div>
                <div className="relative flex items-center">
                  <User className="w-4 h-4 text-[#6B5779] absolute left-3.5 pointer-events-none" />
                  <input
                    id="reg-alias"
                    type="text"
                    required
                    value={regAlias}
                    onChange={(e) => setRegAlias(e.target.value)}
                    placeholder="Contoh: Kupu-Kupu Senja"
                    className="w-full pl-10 pr-3 py-2.5 text-xs font-extrabold bg-white border border-[#CDB4DB]/50 rounded-xl text-[#1D1A39] focus:outline-none focus:ring-2 focus:ring-[#CDB4DB]"
                  />
                </div>
                <p className="text-[10px] text-[#4A4E69] mt-1.5 leading-relaxed">
                  🔒 Alias ini melindungi privasimu saat berbagi cerita di
                  komunitas maupun sesi tanya psikolog.
                </p>
              </div>

              <div>
                <label
                  htmlFor="reg-name"
                  className="block text-xs font-extrabold text-[#1D1A39] mb-1"
                >
                  Nama Panggilan (Opsional / Rahasia)
                </label>
                <input
                  id="reg-name"
                  type="text"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  placeholder="Boleh dikosongkan demi privasi penuh"
                  className="w-full px-3.5 py-2.5 text-xs font-semibold bg-[#FAFAFA] border border-[#CDB4DB]/40 rounded-2xl text-[#1D1A39] focus:outline-none focus:ring-2 focus:ring-[#CDB4DB]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="reg-email"
                    className="block text-xs font-extrabold text-[#1D1A39] mb-1"
                  >
                    Email
                  </label>
                  <div className="relative flex items-center">
                    <Mail className="w-4 h-4 text-[#4A4E69] absolute left-3.5 pointer-events-none" />
                    <input
                      id="reg-email"
                      type="email"
                      required
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      placeholder="nama@email.com"
                      className="w-full pl-10 pr-3 py-2.5 text-xs font-semibold bg-[#FAFAFA] border border-[#CDB4DB]/40 rounded-2xl text-[#1D1A39] focus:outline-none focus:ring-2 focus:ring-[#CDB4DB]"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="reg-phone"
                    className="block text-xs font-extrabold text-[#1D1A39] mb-1"
                  >
                    Nomor WA (Darurat/OTP)
                  </label>
                  <div className="relative flex items-center">
                    <Phone className="w-4 h-4 text-[#4A4E69] absolute left-3.5 pointer-events-none" />
                    <input
                      id="reg-phone"
                      type="tel"
                      required
                      value={regPhone}
                      onChange={(e) => setRegPhone(e.target.value)}
                      placeholder="0812xxxx"
                      className="w-full pl-10 pr-3 py-2.5 text-xs font-semibold bg-[#FAFAFA] border border-[#CDB4DB]/40 rounded-2xl text-[#1D1A39] focus:outline-none focus:ring-2 focus:ring-[#CDB4DB]"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label
                  htmlFor="reg-password"
                  className="block text-xs font-extrabold text-[#1D1A39] mb-1"
                >
                  Kata Sandi Baru
                </label>
                <div className="relative flex items-center">
                  <Lock className="w-4 h-4 text-[#4A4E69] absolute left-3.5 pointer-events-none" />
                  <input
                    id="reg-password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    placeholder="Minimal 6 karakter..."
                    className="w-full pl-10 pr-10 py-2.5 text-xs font-semibold bg-[#FAFAFA] border border-[#CDB4DB]/40 rounded-2xl text-[#1D1A39] focus:outline-none focus:ring-2 focus:ring-[#CDB4DB]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label="Tampilkan kata sandi"
                    className="absolute right-3 text-[#4A4E69] hover:text-[#1D1A39]"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-4 bg-[#CDB4DB] hover:bg-[#FFC8DD] active:scale-[0.98] transition-all text-[#1D1A39] font-extrabold rounded-2xl text-xs shadow-soft-purple"
              >
                Daftar &amp; Aktifkan Identitas Anonim 💜
              </button>
            </form>
          )}
        </section>
      </main>

      {/* Footer Privacy Guarantee */}
      <footer className="px-6 pt-5 text-center">
        <p className="text-[11px] text-[#4A4E69] font-semibold flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>
            Dilindungi enkripsi lokal &amp; pedoman trauma-informed care
            Indonesia.
          </span>
        </p>
      </footer>
    </div>
  );
}
