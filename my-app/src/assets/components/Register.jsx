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
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [verified, setVerified] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  const pollRef = useRef(null);
  const navigate = useNavigate();

  // Resend countdown timer
  useEffect(() => {
    let t;
    if (resendTimer > 0) {
      t = setInterval(() => setResendTimer((s) => s - 1), 1000);
    }
    return () => clearInterval(t);
  }, [resendTimer]);

  // Poll email verification status
  const startCheck = () => {
    if (pollRef.current) return;
    pollRef.current = setInterval(async () => {
      if (auth.currentUser) {
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
      }
    }, 4000);
  };

  // Cleanup polling on unmount
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
      setError("Enter full name.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be 8+ characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
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

      // Add user to Firestore
      await setDoc(doc(db, "users", cred.user.uid), {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        uid: cred.user.uid,
        verified: false,
        createdAt: serverTimestamp(),
      });

      // Send email verification
      await sendEmailVerification(cred.user);
      setInfo("Verification email sent.");
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
    if (!auth.currentUser) {
      setError("No user session found.");
      return;
    }

    try {
      await sendEmailVerification(auth.currentUser);
      setInfo("Verification email resent.");
      setResendTimer(60);
    } catch (err) {
      console.error("Resend error:", err);
      setError("Failed to resend email.");
    }
  };

  const handleContinue = () => {
    navigate("/services");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#08182a] to-[#031021] p-6">
      <div className="w-full max-w-md p-8 rounded-3xl shadow-xl bg-[#0f1720] border border-white/10">

        {/* Branding */}
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-white">RENTARA</h1>
          <p className="text-xs text-gray-400 mt-1">Create your account</p>
        </div>

        <form onSubmit={handleRegister} className="flex flex-col space-y-4">
          <h2 className="text-lg font-semibold text-white text-center">Register</h2>

          {/* Name fields */}
          <div className="grid grid-cols-2 gap-3">
            <input
              placeholder="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="p-3 rounded-xl bg-white/5 text-gray-100 placeholder-gray-500 border border-white/10 focus:outline-none"
              required
            />
            <input
              placeholder="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="p-3 rounded-xl bg-white/5 text-gray-100 placeholder-gray-500 border border-white/10 focus:outline-none"
              required
            />
          </div>

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 rounded-xl bg-white/5 text-gray-100 placeholder-gray-500 border border-white/10 focus:outline-none"
            required
            autoComplete="email"
          />

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password (8+ chars)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 pr-10 rounded-xl bg-white/5 text-gray-100 placeholder-gray-500 border border-white/10 focus:outline-none"
              required
              autoComplete="new-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword((p) => !p)}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-200"
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
              className="w-full p-3 pr-10 rounded-xl bg-white/5 text-gray-100 placeholder-gray-500 border border-white/10 focus:outline-none"
              required
              autoComplete="new-password"
            />
            <button
              type="button"
              onClick={() => setShowConfirm((p) => !p)}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-200"
            >
              {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Messages */}
          {error && <div className="text-red-400 text-sm text-center">{error}</div>}
          {info && <div className="text-green-400 text-sm text-center">{info}</div>}

          {/* Button */}
          <button
            type={verified ? "button" : "submit"}
            onClick={verified ? handleContinue : undefined}
            disabled={loading}
            className={`w-full p-3 rounded-xl font-medium bg-white/10 hover:bg-white/20 text-white border border-white/10 transition ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Processing..." : verified ? "Continue" : "Register"}
          </button>

          {/* Resend section */}
          {resendTimer > 0 ? (
            <div className="text-xs text-gray-400 text-right">
              Resend available in {resendTimer}s
            </div>
          ) : (
            info &&
            !verified && (
              <div className="text-xs text-gray-400 text-right">
                Didn’t get the email?{" "}
                <button
                  type="button"
                  onClick={handleResend}
                  className="text-gray-200 underline hover:text-white"
                >
                  Resend
                </button>
              </div>
            )
          )}

          {/* Switch to Login */}
          <div className="text-sm text-gray-400 text-center">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => {
                if (onSwitchToLogin) onSwitchToLogin();
                else navigate("/login");
              }}
              className="text-gray-200 underline hover:text-white"
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
