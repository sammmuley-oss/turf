import React, { useState, useEffect } from "react";
import { Smartphone, ArrowRight, ShieldCheck, Loader2 } from "lucide-react";

interface AuthViewProps {
  onLogin: (phone: string) => void;
}

export const AuthView: React.FC<AuthViewProps> = ({ onLogin }) => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"PHONE" | "OTP">("PHONE");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(0);

  const maskedPhone = phone.replace(/\d(?=\d{4})/g, "*");

  // ⏱ Countdown timer for resend OTP
  useEffect(() => {
    if (step === "OTP" && timer > 0) {
      const t = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [timer, step]);

  // 📤 SEND OTP
  const sendOTP = async () => {
    if (phone.length !== 10) {
      setError("Enter valid 10-digit number");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await fetch("http://localhost:5000/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "OTP failed");

      setStep("OTP");
      setTimer(30); // ⏱ start resend timer
    } catch (err: any) {
      setError(err.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  // ✅ VERIFY OTP
  const verifyOTP = async () => {
    if (otp.length !== 6) {
      setError("Enter 6-digit OTP");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await fetch("http://localhost:5000/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, otp }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Invalid OTP");

      onLogin(phone);
    } catch (err: any) {
      setError(err.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full glass p-10 rounded-3xl space-y-8">
      <h2 className="text-3xl font-orbitron font-bold text-center">
        {step === "PHONE" ? "Login with Mobile" : "Verify OTP"}
      </h2>

      {step === "PHONE" && (
        <>
          <div className="relative">
            <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" />
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Mobile number"
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-12 pr-4 text-xl"
            />
          </div>

          <button
            onClick={sendOTP}
            disabled={loading}
            className="w-full py-5 bg-blue-600 rounded-2xl font-bold text-xl flex items-center justify-center gap-3"
          >
            {loading ? <Loader2 className="animate-spin" /> : "Send OTP (SMS / Call)"}
            <ArrowRight />
          </button>
        </>
      )}

      {step === "OTP" && (
        <>
          <p className="text-sm text-white/50 text-center">
            OTP sent to {maskedPhone}. You may receive it via SMS or automated call.
          </p>

          <input
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 text-xl text-center tracking-widest"
          />

          <button
            onClick={verifyOTP}
            disabled={loading}
            className="w-full py-5 bg-green-600 rounded-2xl font-bold text-xl flex items-center justify-center gap-3"
          >
            {loading ? <Loader2 className="animate-spin" /> : "Verify & Continue"}
            <ShieldCheck />
          </button>

          {/* 🔁 Resend OTP */}
          <div className="text-center mt-4">
            <button
              onClick={sendOTP}
              disabled={timer > 0}
              className="text-sm text-blue-400 disabled:text-white/30"
            >
              {timer > 0 ? `Resend OTP in ${timer}s` : "Resend OTP"}
            </button>
          </div>
        </>
      )}

      {error && (
        <div className="text-red-400 text-sm text-center bg-red-500/10 p-3 rounded-xl">
          {error}
        </div>
      )}
    </div>
  );
};
