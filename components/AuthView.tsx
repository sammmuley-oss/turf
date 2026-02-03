import React, { useState } from 'react';
import { Smartphone, ShieldCheck, ArrowRight } from 'lucide-react';
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
} from 'firebase/auth';
import { auth } from '../firebase';

interface AuthViewProps {
  onLogin: (phone: string) => void;
}

export const AuthView: React.FC<AuthViewProps> = ({ onLogin }) => {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'PHONE' | 'OTP'>('PHONE');
  const [confirmation, setConfirmation] =
    useState<ConfirmationResult | null>(null);
  const [loading, setLoading] = useState(false);

  /* =======================
     SEND OTP
     ======================= */
  const sendOtp = async () => {
    if (!phone || phone.length < 10) {
      alert('Enter a valid mobile number');
      return;
    }

    // ✅ Force India country code (+91)
    const formattedPhone = phone.startsWith('+')
      ? phone
      : `+91${phone}`;

    try {
      setLoading(true);

      // ✅ Initialize reCAPTCHA only once
      if (!(window as any).recaptchaVerifier) {
        (window as any).recaptchaVerifier = new RecaptchaVerifier(
          auth,
          'recaptcha-container',
          {
            size: 'invisible',
            callback: () => {},
          }
        );
      }

      const appVerifier = (window as any).recaptchaVerifier;

      const result = await signInWithPhoneNumber(
        auth,
        formattedPhone,
        appVerifier
      );

      setConfirmation(result);
      setStep('OTP');
    } catch (error: any) {
      console.error('OTP Error:', error);

      if (error.code === 'auth/too-many-requests') {
        alert('Too many attempts. Try again later.');
      } else {
        alert('Failed to send OTP. Check number & Firebase setup.');
      }
    } finally {
      setLoading(false);
    }
  };

  /* =======================
     VERIFY OTP
     ======================= */
  const verifyOtp = async () => {
    if (!confirmation || otp.length !== 6) {
      alert('Enter valid 6-digit OTP');
      return;
    }

    try {
      setLoading(true);
      await confirmation.confirm(otp);

      // ✅ Login success
      onLogin(phone.startsWith('+') ? phone : `+91${phone}`);
    } catch (error) {
      console.error('OTP Verify Error:', error);
      alert('Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full glass p-10 rounded-3xl space-y-10 border-white/10 shadow-2xl">
      {/* 🔥 Firebase requires this */}
      <div id="recaptcha-container" />

      <div className="text-center space-y-2">
        <h2 className="text-3xl font-orbitron font-bold">
          {step === 'PHONE' ? 'Identify Yourself' : 'Verify OTP'}
        </h2>
        <p className="text-white/50">
          {step === 'PHONE'
            ? 'Login to start your sports session'
            : 'Enter the OTP sent to your phone'}
        </p>
      </div>

      {step === 'PHONE' && (
        <>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-white/40">
              Mobile Number
            </label>
            <div className="relative">
              <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" />
              <input
                type="tel"
                value={phone}
                onChange={e =>
                  setPhone(e.target.value.replace(/\D/g, ''))
                }
                placeholder="Enter 10-digit number"
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-12 pr-4 text-xl outline-none"
              />
            </div>
            <p className="text-xs text-white/30">
              OTP will be sent via SMS
            </p>
          </div>

          <button
            onClick={sendOtp}
            disabled={loading}
            className="w-full py-5 bg-blue-600 rounded-2xl font-bold text-xl glow-blue flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {loading ? 'Sending OTP…' : 'Send OTP'}
            <ArrowRight />
          </button>
        </>
      )}

      {step === 'OTP' && (
        <>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-white/40">
              One Time Password
            </label>
            <input
              type="text"
              value={otp}
              onChange={e =>
                setOtp(e.target.value.replace(/\D/g, ''))
              }
              maxLength={6}
              placeholder="••••••"
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-4 text-xl tracking-widest text-center outline-none"
            />
          </div>

          <button
            onClick={verifyOtp}
            disabled={loading}
            className="w-full py-5 bg-green-600 rounded-2xl font-bold text-xl flex items-center justify-center gap-2 disabled:opacity-60"
          >
            <ShieldCheck />
            Verify & Continue
          </button>
        </>
      )}
    </div>
  );
};
