"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Lock, ArrowLeft, Check } from "lucide-react";

type Step = "email" | "otp" | "success";

export default function RegisterPage() {
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [resendTimer, setResendTimer] = useState(0);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();

  // Timer untuk resend cooldown
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setInterval(() => setResendTimer((t) => t - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [resendTimer]);

  // Timer untuk OTP expiry
  useEffect(() => {
    if (step === "otp" && cooldown > 0) {
      const timer = setInterval(() => setCooldown((t) => t - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [step, cooldown]);

  const sendOTP = async () => {
    if (!email) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (!data.success) {
        setError(data.error.message);
      } else {
        setStep("otp");
        setCooldown(300); // 5 menit
        setResendTimer(60); // resend setelah 60 detik
        setTimeout(() => otpRefs.current[0]?.focus(), 100);
      }
    } catch {
      setError("Network error. Please try again.");
    }

    setLoading(false);
  };

  const verifyOTP = async () => {
    const code = otp.join("");
    if (code.length !== 6) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });
      const data = await res.json();

      if (!data.success) {
        setError(data.error.message);
      } else {
        setStep("success");
        setTimeout(() => router.push("/dashboard"), 2000);
      }
    } catch {
      setError("Network error. Please try again.");
    }

    setLoading(false);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }

    // Auto-submit jika 6 digit terisi
    if (index === 5 && value) {
      const code = newOtp.join("");
      if (code.length === 6) {
        setTimeout(verifyOTP, 200);
      }
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pasted.length > 0) {
      const newOtp = [...otp];
      pasted.split("").forEach((char, i) => {
        if (i < 6) newOtp[i] = char;
      });
      setOtp(newOtp);
      otpRefs.current[Math.min(pasted.length, 5)]?.focus();
    }
    e.preventDefault();
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const steps = [
    { label: "EMAIL", active: step === "email", done: step !== "email" },
    { label: "VERIFY", active: step === "otp", done: step === "success" },
    { label: "SUCCESS", active: step === "success", done: false },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-beulrock-black">
      <div className="w-full max-w-4xl flex flex-col lg:flex-row gap-0 rounded-2xl overflow-hidden border border-beulrock-border shadow-2xl shadow-red-900/10">
        
        {/* Left Panel - Branding */}
        <div className="lg:w-5/12 bg-gradient-to-br from-[#111] to-[#0a0a0a] p-8 lg:p-12 flex flex-col justify-between border-r border-beulrock-border">
          <div>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl font-extrabold tracking-tight"
            >
              BEULROCK<span className="text-beulrock-red text-glow-red"> EXECUTOR</span>
            </motion.div>
            <p className="mt-4 text-sm text-gray-400">Execute scripts with unmatched power, security, and precision.</p>
          </div>

          <div className="space-y-4 mt-8">
            <div className="flex items-center gap-3 text-xs text-gray-500">
              <Shield size={16} className="text-beulrock-red" />
              <span>End-to-end encrypted sessions</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-gray-500">
              <Lock size={16} className="text-beulrock-red" />
              <span>Zero-trust security model</span>
            </div>
          </div>

          <p className="text-[10px] text-gray-600 mt-auto pt-8">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>

        {/* Right Panel - Form */}
        <div className="lg:w-7/12 bg-beulrock-card/60 backdrop-blur-md p-8 lg:p-12">
          {/* Step Indicator */}
          <div className="flex items-center gap-2 mb-8">
            {steps.map((s, i) => (
              <div key={s.label} className="flex items-center gap-2">
                <div
                  className={`flex items-center justify-center h-8 w-8 rounded-full text-xs font-bold transition-all duration-300 ${
                    s.done
                      ? "bg-green-500 text-white"
                      : s.active
                      ? "bg-beulrock-red text-white"
                      : "bg-beulrock-border text-gray-500"
                  }`}
                >
                  {s.done ? <Check size={14} /> : i + 1}
                </div>
                <span className={`text-xs font-semibold hidden sm:block ${
                  s.active ? "text-white" : "text-gray-600"
                }`}>
                  {s.label}
                </span>
                {i < steps.length - 1 && (
                  <div className={`h-0.5 w-6 sm:w-10 ${s.done ? "bg-green-500" : "bg-beulrock-border"}`} />
                )}
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {/* Step 1: Email */}
            {step === "email" && (
              <motion.div
                key="email"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-lg font-bold mb-2">ENTER YOUR EMAIL</h3>
                <p className="text-sm text-gray-400 mb-6">We'll send a 6-digit verification code to your email address.</p>
                
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full rounded-lg border border-beulrock-border bg-beulrock-black px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-beulrock-red focus:ring-1 focus:ring-beulrock-red transition mb-4"
                  onKeyDown={(e) => e.key === "Enter" && sendOTP()}
                />

                {error && (
                  <p className="text-red-400 text-xs mb-4">{error}</p>
                )}

                <button
                  onClick={sendOTP}
                  disabled={loading || !email}
                  className="w-full rounded-lg bg-beulrock-red py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-red-700 hover:box-glow-red disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Sending..." : "SEND VERIFICATION CODE"}
                </button>

                <p className="mt-6 text-center text-xs text-gray-500">
                  Already have an account?{" "}
                  <Link href="/auth/login" className="text-beulrock-red hover:underline">Log in</Link>
                </p>
              </motion.div>
            )}

            {/* Step 2: OTP */}
            {step === "otp" && (
              <motion.div
                key="otp"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-lg font-bold mb-2">VERIFY YOUR EMAIL</h3>
                <p className="text-sm text-gray-400 mb-1">
                  Enter the 6-digit code we sent to
                </p>
                <p className="text-sm text-white font-semibold mb-6">{email}</p>

                {/* OTP Input Boxes */}
                <div className="flex justify-center gap-3 mb-4" onPaste={handleOtpPaste}>
                  {otp.map((digit, i) => (
                    <input
                      key={i}
                      ref={(el) => { otpRefs.current[i] = el; }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(i, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(i, e)}
                      className="h-14 w-12 rounded-lg border border-beulrock-border bg-beulrock-black text-center text-xl font-bold text-white focus:outline-none focus:border-beulrock-red focus:ring-1 focus:ring-beulrock-red transition"
                    />
                  ))}
                </div>

                {/* Countdown */}
                <p className="text-xs text-gray-500 text-center mb-4">
                  {cooldown > 0 ? (
                    <>Code expires in <span className="text-beulrock-red">{Math.floor(cooldown / 60)}:{(cooldown % 60).toString().padStart(2, "0")}</span></>
                  ) : (
                    "Code expired"
                  )}
                </p>

                {error && (
                  <p className="text-red-400 text-xs text-center mb-4">{error}</p>
                )}

                <button
                  onClick={verifyOTP}
                  disabled={loading || otp.join("").length !== 6}
                  className="w-full rounded-lg bg-beulrock-red py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-red-700 hover:box-glow-red disabled:opacity-50 disabled:cursor-not-allowed mb-4"
                >
                  {loading ? "Verifying..." : "VERIFY CODE"}
                </button>

                <div className="text-center">
                  <p className="text-xs text-gray-500 mb-1">Didn't receive the code?</p>
                  {resendTimer > 0 ? (
                    <span className="text-xs text-gray-600">Resend in {resendTimer}s</span>
                  ) : (
                    <button onClick={sendOTP} className="text-xs text-beulrock-red hover:underline">
                      Resend Code
                    </button>
                  )}
                </div>

                <button
                  onClick={() => setStep("email")}
                  className="mt-6 text-xs text-gray-500 flex items-center gap-1 hover:text-white transition mx-auto"
                >
                  <ArrowLeft size={12} /> BACK TO EMAIL
                </button>
              </motion.div>
            )}

            {/* Step 3: Success */}
            {step === "success" && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center py-8"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="mx-auto h-20 w-20 rounded-full bg-green-500/20 flex items-center justify-center mb-6"
                >
                  <Check size={40} className="text-green-500" />
                </motion.div>
                <h3 className="text-2xl font-bold mb-2">VERIFIED!</h3>
                <p className="text-gray-400 text-sm">Your account has been created. Redirecting to dashboard...</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}