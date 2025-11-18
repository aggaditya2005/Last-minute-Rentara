// File: Register.jsx
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
import "./Login.css";

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

  const handleContinue = () => navigate("/introduction");

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="mb-8 text-center">
          <h1 className="login-title">RENTARA</h1>
          <p className="login-subtitle">Create your account</p>
        </div>

        <form onSubmit={handleRegister} className="flex flex-col">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 12,
              marginBottom: 12,
            }}
          >
            <input
              placeholder="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="login-input"
            />
            <input
              placeholder="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="login-input"
            />
          </div>

          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login-input"
          />

          <div className="password-wrapper" style={{ marginBottom: 12 }}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password (8+ characters)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
              style={{ paddingRight: 44 }}
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="password-toggle"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <div className="password-wrapper" style={{ marginBottom: 8 }}>
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="login-input"
              style={{ paddingRight: 44 }}
            />
            <button
              type="button"
              onClick={() => setShowConfirm((s) => !s)}
              className="password-toggle"
            >
              {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {error && <div className="error-text">{error}</div>}
          {info && (
            <div className="info-text" style={{ color: "#8de08d", textAlign: "center", marginBottom: 6 }}>
              {info}
            </div>
          )}

          <button
            type={verified ? "button" : "submit"}
            disabled={loading}
            onClick={verified ? handleContinue : undefined}
            className={`login-btn ${loading ? "btn-loading" : ""}`}
            style={{ marginTop: 6 }}
          >
            {loading ? "Processing..." : verified ? "Continue" : "Register"}
          </button>

          {!verified && info && (
            <div style={{ textAlign: "right", fontSize: 13, color: "#9fb7dd", marginTop: 8 }}>
              {resendTimer > 0 ? (
                <>Resend available in {resendTimer}s</>
              ) : (
                <button onClick={handleResend} className="register-link">
                  Resend verification email
                </button>
              )}
            </div>
          )}

          <div className="register-text" style={{ marginTop: 12 }}>
            Already have an account?{" "}
            <button
              type="button"
              onClick={() =>
                onSwitchToLogin ? onSwitchToLogin() : navigate("/login")
              }
              className="register-link"
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
