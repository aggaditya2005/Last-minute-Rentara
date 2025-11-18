// File: Login.jsx
import React, { useRef, useState } from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const Login = ({ onSuccess, onSwitchToRegister } = {}) => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!EMAIL_REGEX.test(email.trim())) {
      return setError("Enter a valid email address.");
    }
    if (!password) {
      return setError("Password is required.");
    }

    setLoading(true);
    try {
      const q = query(collection(db, "users"), where("email", "==", email.trim()));
      const snap = await getDocs(q);

      if (snap.empty) {
        setError("Email not registered.");
        setLoading(false);
        return;
      }

      const cred = await signInWithEmailAndPassword(auth, email.trim(), password);

      if (!cred.user.emailVerified) {
        await signOut(auth);
        setError("Please verify your email before logging in.");
        setLoading(false);
        return;
      }

      localStorage.setItem("user_id", cred.user.uid);
      onSuccess?.(cred.user.uid);

      // Updated navigation
      navigate("/");
    } catch (err) {
      console.error("Login error:", err);
      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="mb-8 text-center">
          <h1 className="login-title">RENTARA</h1>
          <p className="login-subtitle">Smart bookings, smarter prices</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
          <input
            ref={emailRef}
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login-input"
          />

          <div className="password-wrapper">
            <input
              ref={passwordRef}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="password-toggle"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {error && <div className="error-text">{error}</div>}

          <button
            type="submit"
            disabled={loading}
            className={`login-btn ${loading ? "btn-loading" : ""}`}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

          <div className="register-text">
            Don’t have an account?{" "}
            <button
              type="button"
              onClick={() =>
                onSwitchToRegister ? onSwitchToRegister() : navigate("/register")
              }
              className="register-link"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
