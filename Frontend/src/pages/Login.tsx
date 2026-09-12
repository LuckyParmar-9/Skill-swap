import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ identifier: "", password: "" });
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (!form.identifier || !form.password) {
      setError("Please fill in all fields.");
      return;
    }
    setError("");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12" style={{ background: "#F0F8FF" }}>
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "#185FA5" }}>
              <svg width="18" height="18" viewBox="0 0 28 28" fill="none">
                <path d="M8 14 C8 10, 13 7, 14 10 C15 13, 20 10, 20 14 C20 18, 15 21, 14 18 C13 15, 8 18, 8 14Z" fill="white" />
              </svg>
            </div>
            <span className="font-semibold text-base" style={{ color: "#042C53" }}>SkillSwap</span>
          </div>
          <h1 className="text-2xl font-bold" style={{ color: "#042C53" }}>Welcome back</h1>
          <p className="text-sm mt-1" style={{ color: "#6B8FA8" }}>Sign in to continue swapping</p>
        </div>

        <div className="rounded-2xl p-6 border" style={{ background: "#fff", borderColor: "#B5D4F4" }}>
          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: "#042C53" }}>Email or username</label>
              <input
                type="text"
                placeholder="mia@example.com"
                value={form.identifier}
                onChange={(e) => setForm({ ...form, identifier: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl text-sm border"
                style={{ borderColor: "#B5D4F4", color: "#042C53" }}
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold" style={{ color: "#042C53" }}>Password</label>
                <button className="text-xs font-medium" style={{ color: "#185FA5" }}>Forgot password?</button>
              </div>
              <input
                type="password"
                placeholder="Your password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl text-sm border"
                style={{ borderColor: "#B5D4F4", color: "#042C53" }}
              />
            </div>

            {error && (
              <div className="px-3.5 py-2.5 rounded-xl text-sm" style={{ background: "#fff5f5", color: "#e05a5a", border: "1px solid #f5c2c2" }}>
                {error}
              </div>
            )}

            <button
              onClick={handleLogin}
              className="mt-1 py-3 rounded-xl font-semibold text-sm text-white"
              style={{ background: "#185FA5" }}
            >
              Sign in
            </button>

            <div className="relative flex items-center gap-3">
              <div className="flex-1 h-px" style={{ background: "#B5D4F4" }} />
              <span className="text-xs" style={{ color: "#6B8FA8" }}>or</span>
              <div className="flex-1 h-px" style={{ background: "#B5D4F4" }} />
            </div>

            <button
              className="py-2.5 rounded-xl text-sm font-medium border flex items-center justify-center gap-2"
              style={{ borderColor: "#B5D4F4", color: "#042C53" }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              Continue with Google
            </button>
          </div>
        </div>

        <p className="text-center text-sm mt-5" style={{ color: "#6B8FA8" }}>
          New to SkillSwap?{" "}
          <button onClick={() => navigate("/register")} className="font-semibold" style={{ color: "#185FA5" }}>
            Create an account
          </button>
        </p>
      </div>
    </div>
  );
}
