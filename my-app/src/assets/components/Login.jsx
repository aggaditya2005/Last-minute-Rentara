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
    if (!password) return setError("Password is required.");

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
      console.error("Error:", err);
      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#060E17]">
      <div className="w-full max-w-md p-10 rounded-3xl bg-[#0C1622]/70 backdrop-blur-xl border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.3)]">

        {/* Branding */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-semibold tracking-tight text-white">Rentara</h1>
          <p className="text-sm text-gray-400 mt-2">Smart bookings. Premium experience.</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">

          <div>
            <label className="text-sm text-gray-300 px-1">Email Address</label>
            <input
              ref={emailRef}
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 p-3 w-full bg-[#101B29] border border-white/10 rounded-xl text-gray-100 focus:ring-2 focus:ring-[#2E8EF7] outline-none"
            />
          </div>

          <div>
            <label className="text-sm text-gray-300 px-1">Password</label>
            <div className="relative mt-2">
              <input
                ref={passwordRef}
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="p-3 w-full bg-[#101B29] border border-white/10 rounded-xl text-gray-100 focus:ring-2 focus:ring-[#2E8EF7] outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-3 top-3 text-gray-400"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full p-3 rounded-xl bg-[#2E8EF7]/20 border border-[#2E8EF7]/30 text-white font-semibold hover:bg-[#2E8EF7]/30 transition-all shadow-lg"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

          <p className="text-center text-sm text-gray-400">
            New here?{" "}
            <button
              type="button"
              onClick={() =>
                onSwitchToRegister ? onSwitchToRegister() : navigate("/register")
              }
              className="text-[#2E8EF7] underline"
            >
              Create an account
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
