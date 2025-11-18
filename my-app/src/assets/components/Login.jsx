import React, { useRef, useState } from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const Login = ({ onSuccess, onSwitchToRegister } = {}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setErr("");

    if (!EMAIL_REGEX.test(email.trim())) return setErr("Enter a valid email.");
    if (!password) return setErr("Password required.");

    setLoading(true);

    try {
      const q = query(collection(db, "users"), where("email", "==", email.trim()));
      const snap = await getDocs(q);

      if (snap.empty) {
        setErr("Email not registered.");
        setLoading(false);
        return;
      }

      const cred = await signInWithEmailAndPassword(auth, email.trim(), password);

      if (!cred.user.emailVerified) {
        await signOut(auth);
        setErr("Verify email before logging in.");
        setLoading(false);
        return;
      }

      localStorage.setItem("user_id", cred.user.uid);
      onSuccess?.(cred.user.uid);
      navigate("/services");
    } catch (e) {
      setErr("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#050B15]">

      {/* Branding Section */}
      <div className="hidden lg:flex flex-col justify-center items-start w-1/2 px-20 bg-gradient-to-br from-[#0A1628] to-[#02060C] border-r border-white/10">
        <h1 className="text-6xl font-bold text-white tracking-tight">RENTARA</h1>
        <p className="text-xl text-gray-300 mt-6 leading-relaxed">
          Book smarter. Travel effortlessly.<br />
          A premium booking experience crafted for you.
        </p>

        <div className="mt-12 w-32 h-1 bg-[#2E8EF7] rounded-full" />
      </div>

      {/* Auth Card */}
      <div className="flex justify-center items-center w-full lg:w-1/2 px-6">
        <div className="w-full max-w-md bg-white/5 backdrop-blur-xl p-10 rounded-3xl border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.4)]">

          <h2 className="text-3xl text-white font-semibold">Welcome Back</h2>
          <p className="text-gray-400 text-sm mt-1 mb-8">Sign in to continue your journey</p>

          <form onSubmit={submit} className="space-y-6">

            <div>
              <label className="text-gray-300 text-sm">Email Address</label>
              <input
                type="email"
                className="mt-2 p-4 w-full bg-[#0D1625] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-[#2E8EF7]"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="text-gray-300 text-sm">Password</label>
              <div className="relative">
                <input
                  type={show ? "text" : "password"}
                  className="mt-2 p-4 w-full bg-[#0D1625] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-[#2E8EF7]"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute right-4 top-5 text-gray-400"
                  onClick={() => setShow((s) => !s)}
                >
                  {show ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {err && <p className="text-red-400 text-sm text-center">{err}</p>}

            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-[#2E8EF7] hover:bg-[#2E8EF7]/90 text-white font-semibold text-lg transition"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>

            <p className="text-sm text-gray-400 text-center">
              Don’t have an account?{" "}
              <button
                className="text-[#2E8EF7] underline"
                type="button"
                onClick={() =>
                  onSwitchToRegister ? onSwitchToRegister() : navigate("/register")
                }
              >
                Register
              </button>
            </p>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
