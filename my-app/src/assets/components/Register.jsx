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
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [cpass, setCpass] = useState("");
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  const [info, setInfo] = useState("");
  const [err, setErr] = useState("");
  const [resend, setResend] = useState(0);

  const pollRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    let t;
    if (resend > 0) t = setInterval(() => setResend((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [resend]);

  const startCheck = () => {
    if (pollRef.current) return;

    pollRef.current = setInterval(async () => {
      if (!auth.currentUser) return;

      await reload(auth.currentUser);
      if (auth.currentUser.emailVerified) {
        clearInterval(pollRef.current);
        pollRef.current = null;
        setVerified(true);
        setInfo("Email verified. Continue.");
      }
    }, 3000);
  };

  useEffect(() => {
    return () => pollRef.current && clearInterval(pollRef.current);
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    setInfo("");

    if (!first.trim() || !last.trim()) return setErr("Enter full name.");
    if (pass.length < 8) return setErr("Password must be 8+ characters.");
    if (pass !== cpass) return setErr("Passwords do not match.");

    setLoading(true);

    try {
      const cred = await createUserWithEmailAndPassword(auth, email.trim(), pass);

      await updateProfile(cred.user, {
        displayName: `${first} ${last}`,
      });

      await setDoc(doc(db, "users", cred.user.uid), {
        first,
        last,
        email: email.trim(),
        uid: cred.user.uid,
        verified: false,
        createdAt: serverTimestamp(),
      });

      await sendEmailVerification(cred.user);

      setInfo("Verification email sent.");
      setResend(60);
      startCheck();
    } catch {
      setErr("Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#050B15]">

      {/* Branding Side */}
      <div className="hidden lg:flex flex-col justify-center items-start w-1/2 px-20 bg-gradient-to-br from-[#0A1628] to-[#02060C] border-r border-white/10">
        <h1 className="text-6xl font-bold text-white tracking-tight">Join Rentara</h1>

        <p className="text-xl text-gray-300 mt-6 leading-relaxed">
          Experience premium travel bookings.<br />
          Fast. Secure. Beautifully designed.
        </p>

        <div className="mt-12 w-32 h-1 bg-[#2E8EF7] rounded-full" />
      </div>

      {/* Form Side */}
      <div className="flex justify-center items-center w-full lg:w-1/2 px-6">
        <div className="w-full max-w-md bg-white/5 backdrop-blur-xl p-10 rounded-3xl border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.4)]">

          <h2 className="text-3xl text-white font-semibold">Create Account</h2>
          <p className="text-gray-400 text-sm mt-1 mb-8">Join the Rentara network</p>

          <form onSubmit={submit} className="space-y-6">

            <div className="grid grid-cols-2 gap-3">
              <input
                placeholder="First name"
                className="p-4 bg-[#0D1625] border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-[#2E8EF7]"
                value={first}
                onChange={(e) => setFirst(e.target.value)}
              />
              <input
                placeholder="Last name"
                className="p-4 bg-[#0D1625] border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-[#2E8EF7]"
                value={last}
                onChange={(e) => setLast(e.target.value)}
              />
            </div>

            <input
              placeholder="Email address"
              type="email"
              className="p-4 bg-[#0D1625] border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-[#2E8EF7] w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="relative">
              <input
                type={show1 ? "text" : "password"}
                placeholder="Password"
                className="p-4 w-full bg-[#0D1625] border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-[#2E8EF7]"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
              />
              <button
                type="button"
                className="absolute right-4 top-5 text-gray-400"
                onClick={() => setShow1((s) => !s)}
              >
                {show1 ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <div className="relative">
              <input
                type={show2 ? "text" : "password"}
                placeholder="Confirm password"
                className="p-4 w-full bg-[#0D1625] border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-[#2E8EF7]"
                value={cpass}
                onChange={(e) => setCpass(e.target.value)}
              />
              <button
                type="button"
                className="absolute right-4 top-5 text-gray-400"
                onClick={() => setShow2((s) => !s)}
              >
                {show2 ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {err && <p className="text-red-400 text-sm text-center">{err}</p>}
            {info && <p className="text-green-400 text-sm text-center">{info}</p>}

            <button
              type={verified ? "button" : "submit"}
              disabled={loading}
              className="w-full py-4 rounded-xl bg-[#2E8EF7] hover:bg-[#2E8EF7]/90 text-white font-semibold text-lg transition"
              onClick={verified ? () => navigate("/services") : undefined}
            >
              {loading ? "Processing..." : verified ? "Continue" : "Register"}
            </button>

            {!verified && info && (
              <p className="text-right text-sm text-gray-400">
                {resend > 0 ? (
                  <>Resend in {resend}s</>
                ) : (
                  <button
                    type="button"
                    onClick={async () => {
                      await sendEmailVerification(auth.currentUser);
                      setResend(60);
                      setInfo("Verification email resent.");
                    }}
                    className="text-[#2E8EF7] underline"
                  >
                    Resend email
                  </button>
                )}
              </p>
            )}

            <p className="text-sm text-gray-400 text-center">
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
    </div>
  );
};

export default Register;
