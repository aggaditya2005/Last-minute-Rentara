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
    let timer;
    if (resendTimer > 0) {
      timer = setInterval(() => setResendTimer((s) => s - 1), 1000);
    }
    return () => clearInterval(timer);
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
      if (pollRef.current) {
        clearInterval(pollRef.current);
        pollRef.current = null;
      }
    };
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setInfo("");

    if (!firstName.trim() || !lastName.trim()) {
      return setError("Enter full name.");
    }
    if (password.length < 8) {
      return setError("Password must be at least 8 characters.");
    }
    if (password !== confirm) {
      return setError("Passwords do not match.");
    }

    setLoading(true);

    try {
      const cred = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

      await updateProfile(cred.user, {
        displayName: `${firstName.trim()} ${lastName.trim()}`,
      });

      await setDoc(doc(db, "users", cred.user.uid), {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        uid: cred.user.uid,
        verified: false,
        createdAt: serverTimestamp(),
      });

      await sendEmailVerification(cred.user);
      setInfo("Verification email sent. Please check your inbox.");
      setResendTimer(60);
      startCheck();
    } catch (err) {
      console.error("Registration error:", err);
      setError("Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!auth.currentUser) return setError("No user session found.");

    try {
      await sendEmailVerification(auth.currentUser);
      setInfo("Verification email resent.");
      setResendTimer(60);
    } catch (err) {
      console.error("Resend error:", err);
      setError("Failed to resend email.");
    }
  };

  const handleContinue = () => navigate("/services");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#08182a] to-[#031021] p-6">
      <div className="w-full max-w-md p-8 rounded-3xl shadow-xl bg-[#0f1720] border border-white/10">

        {/* Branding */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-white">RENTARA</h1>
          <p className="text-xs text-gray-400 mt-1">Create your account</p>
        </div>

        <form onSubmit={handleRegister} className="flex flex-col space-y-5">
          {/* Name */}
          <div className="grid grid-cols-2 gap-3">
            <input
              placeholder="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="p-3 rounded-xl bg-white/5 text-gray-100 border border-white/10 placeholder-gray-500 focus:outline-none"
            />
            <input
              placeholder="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="p-3 rounded-xl bg-white/5 text-gray-100 border border-white/10 placeholder-gray-500 focus:outline-none"
            />
          </div>

          {/* Email */}
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 rounded-xl bg-white/5 text-gray-100 border border-white/10 placeholder-gray-500 focus:outline-none"
          />

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password (8+ characters)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 pr-10 rounded-xl bg-white/5 text-gray-100 border border-white/10 placeholder-gray-500 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="absolute right-3 top-3 text-gray-400"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="w-full p-3 pr-10 rounded-xl bg-white/5 text-gray-100 border border-white/10 placeholder-gray-500 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setShowConfirm((s) => !s)}
              className="absolute right-3 top-3 text-gray-400"
            >
              {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Messages */}
          {error && <div className="text-red-400 text-sm text-center">{error}</div>}
          {info && <div className="text-green-400 text-sm text-center">{info}</div>}

          {/* CTA */}
          <button
            type={verified ? "button" : "submit"}
            disabled={loading}
            onClick={verified ? handleContinue : undefined}
            className={`w-full p-3 rounded-xl font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/10 transition ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Processing..." : verified ? "Continue" : "Register"}
          </button>

          {/* Resend */}
          {!verified && info && (
            <div className="text-xs text-gray-400 text-right">
              {resendTimer > 0 ? (
                <>Resend available in {resendTimer}s</>
              ) : (
                <button onClick={handleResend} className="underline text-gray-200">
                  Resend verification email
                </button>
              )}
            </div>
          )}

          {/* Switch */}
          <div className="text-sm text-gray-400 text-center">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() =>
                onSwitchToLogin ? onSwitchToLogin() : navigate("/login")
              }
              className="underline text-gray-200"
            >
              Log in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
