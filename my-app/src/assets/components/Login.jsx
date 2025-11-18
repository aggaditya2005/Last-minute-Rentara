import React, { useRef, useState } from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

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
      navigate("/services");
    } catch (err) {
      console.error("Login error:", err);
      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#08182a] to-[#031021] p-6">
      <div className="w-full max-w-md p-8 rounded-3xl shadow-xl bg-[#0f1720] border border-white/10">

        {/* Branding */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-white">RENTARA</h1>
          <p className="text-xs text-gray-400 mt-1">Smart bookings, smarter prices</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col space-y-5">

          <input
            ref={emailRef}
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 rounded-xl bg-white/5 text-gray-100 border border-white/10 placeholder-gray-500 focus:outline-none"
          />

          <div className="relative">
            <input
              ref={passwordRef}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
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

          {error && <div className="text-red-400 text-sm text-center">{error}</div>}

          <button
            type="submit"
            disabled={loading}
            className={`w-full p-3 rounded-xl font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/10 transition ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

          <div className="text-sm text-gray-400 text-center">
            Don’t have an account?{" "}
            <button
              type="button"
              onClick={() =>
                onSwitchToRegister ? onSwitchToRegister() : navigate("/register")
              }
              className="underline text-gray-200"
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
