import React, { useEffect, useRef, useState } from "react";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  reload,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Register = ({ onSwitchToLogin } = {}) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  const [info, setInfo] = useState("");
  const [error, setError] = useState("");
  const [resendTimer, setResendTimer] = useState(0);

  const pollRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    let t;
    if (resendTimer > 0) {
      t = setInterval(() => setResendTimer((s) => s - 1), 1000);
    }
    return () => clearInterval(t);
  }, [resendTimer]);

  const startCheck = () => {
    if (pollRef.current) return;

    pollRef.current = setInterval(async () => {
      if (!auth.currentUser) return;

      try {
        await reload(auth.currentUser);
        if (auth.currentUser.emailVerified) {
          clearInterval(pollRef.current);
          pollRef.current = null;
          setVerified(true);
          setInfo("Email verified. You can continue.");
        }
      } catch (err) {
        console.error("Reload error:", err);
      }
    }, 3000);
  };

  useEffect(() => {
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setInfo("");

    if (!firstName.trim() || !lastName.trim()) return setError("Enter your full name.");
    if (password.length < 8) return setError("Password must be at least 8 characters.");
    if (password !== confirm) return setError("Passwords do not match.");

    setLoading(true);

    try {
      const cred = await createUserWithEmailAndPassword(auth, email.trim(), password);

      await updateProfile(cred.user, {
        displayName: `${firstName.trim()} ${lastName.trim()}`,
      });

      await setDoc(doc(db, "users", cred.user.uid), {
        firstName,
        lastName,
        email: email.trim(),
        uid: cred.user.uid,
        verified: false,
        createdAt: serverTimestamp(),
      });

      await sendEmailVerification(cred.user);
      setInfo("Verification email sent. Check your inbox.");
      setResendTimer(60);
      startCheck();
    } catch (err) {
      console.error(err);
      setError("Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleContinue = () => navigate("/services");

  const handleResend = async () => {
    if (!auth.currentUser) return;

    try {
      await sendEmailVerification(auth.currentUser);
      setResendTimer(60);
      setInfo("Verification email resent.");
    } catch {
      setError("Failed to resend email.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#060E17]">
      <div className="w-full max-w-md p-10 rounded-3xl bg-[#0C1622]/70 backdrop-blur-xl border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.3)]">

        <div className="text-center mb-10">
          <h1 className="text-4xl font-semibold tracking-tight text-white">Create Account</h1>
          <p className="text-sm text-gray-400 mt-2">Join Rentara and start booking smarter.</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-6">

          <div className="grid grid-cols-2 gap-3">
            <input
              placeholder="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="p-3 bg-[#101B29] border border-white/10 rounded-xl text-gray-100 focus:ring-2 focus:ring-[#2E8EF7] outline-none"
            />
            <input
              placeholder="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="p-3 bg-[#101B29] border border-white/10 rounded-xl text-gray-100 focus:ring-2 focus:ring-[#2E8EF7] outline-none"
            />
          </div>

          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 bg-[#101B29] border border-white/10 rounded-xl text-gray-100 focus:ring-2 focus:ring-[#2E8EF7] outline-none w-full"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password (8+ characters)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-3 bg-[#101B29] border border-white/10 rounded-xl w-full text-gray-100 focus:ring-2 focus:ring-[#2E8EF7] outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="absolute right-3 top-3 text-gray-400"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="p-3 bg-[#101B29] border border-white/10 rounded-xl w-full text-gray-100 focus:ring-2 focus:ring-[#2E8EF7] outline-none"
            />
            <button
              type="button"
              onClick={() => setShowConfirm((s) => !s)}
              className="absolute right-3 top-3 text-gray-400"
            >
              {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {error && <div className="text-red-400 text-center text-sm">{error}</div>}
          {info && <div className="text-green-400 text-center text-sm">{info}</div>}

          <button
            type={verified ? "button" : "submit"}
            disabled={loading}
            onClick={verified ? handleContinue : undefined}
            className="w-full p-3 bg-[#2E8EF7]/20 border border-[#2E8EF7]/30 text-white rounded-xl hover:bg-[#2E8EF7]/30 transition font-semibold text-md"
          >
            {loading ? "Processing..." : verified ? "Continue" : "Register"}
          </button>

          {!verified && info && (
            <div className="text-xs text-gray-400 text-right">
              {resendTimer > 0 ? (
                <>Resend available in {resendTimer}s</>
              ) : (
                <button onClick={handleResend} className="underline text-[#2E8EF7]">
                  Resend verification email
                </button>
              )}
            </div>
          )}

          <p className="text-center text-sm text-gray-400">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() =>
                onSwitchToLogin ? onSwitchToLogin() : navigate("/login")
              }
              className="text-[#2E8EF7] underline"
            >
              Log in
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
