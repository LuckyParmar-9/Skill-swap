import { useNavigate } from "react-router-dom";
import { useState } from "react";

const allSkills = ["UI/UX Design", "Python", "JavaScript", "Spanish", "French", "Piano", "Guitar", "Photography", "Video Editing", "Machine Learning", "Data Science", "Marketing", "Yoga", "Woodworking", "3D Printing", "German", "Japanese", "Drawing", "Illustration", "Copywriting"];

export default function Register() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: "", email: "", password: "", location: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [offered, setOffered] = useState<string[]>([]);
  const [desired, setDesired] = useState<string[]>([]);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.includes("@")) e.email = "Enter a valid email";
    if (form.password.length < 8) e.password = "Password must be at least 8 characters";
    if (!form.location.trim()) e.location = "Location is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const toggleSkill = (skill: string, list: string[], setter: (s: string[]) => void) => {
    setter(list.includes(skill) ? list.filter((s) => s !== skill) : [...list, skill]);
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
          <h1 className="text-2xl font-bold" style={{ color: "#042C53" }}>Create your account</h1>
          <p className="text-sm mt-1" style={{ color: "#6B8FA8" }}>Step {step} of 2 — {step === 1 ? "Your details" : "Your skills"}</p>
        </div>

        {/* Step indicator */}
        <div className="flex gap-2 mb-6">
          {[1, 2].map((s) => (
            <div
              key={s}
              className="h-1.5 flex-1 rounded-full transition-colors"
              style={{ background: s <= step ? "#185FA5" : "#B5D4F4" }}
            />
          ))}
        </div>

        <div className="rounded-2xl p-6 border" style={{ background: "#fff", borderColor: "#B5D4F4" }}>
          {step === 1 ? (
            <div className="flex flex-col gap-4">
              {([
                { key: "name", label: "Full name", type: "text", placeholder: "Mia Chen" },
                { key: "email", label: "Email address", type: "email", placeholder: "mia@example.com" },
                { key: "password", label: "Password", type: "password", placeholder: "Min. 8 characters" },
                { key: "location", label: "Location", type: "text", placeholder: "Austin, TX" },
              ] as const).map(({ key, label, type, placeholder }) => (
                <div key={key}>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: "#042C53" }}>{label}</label>
                  <input
                    type={type}
                    placeholder={placeholder}
                    value={form[key]}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl text-sm border transition-colors"
                    style={{
                      borderColor: errors[key] ? "#e05a5a" : "#B5D4F4",
                      background: errors[key] ? "#fff5f5" : "#fff",
                      color: "#042C53",
                    }}
                  />
                  {errors[key] && (
                    <p className="text-xs mt-1" style={{ color: "#e05a5a" }}>{errors[key]}</p>
                  )}
                </div>
              ))}

              <button
                onClick={() => { if (validate()) setStep(2); }}
                className="mt-2 py-3 rounded-xl font-semibold text-sm text-white"
                style={{ background: "#185FA5" }}
              >
                Continue
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-5">
              <div>
                <p className="text-sm font-semibold mb-3" style={{ color: "#042C53" }}>Skills I can offer</p>
                <div className="flex flex-wrap gap-2">
                  {allSkills.slice(0, 12).map((s) => (
                    <button
                      key={s}
                      onClick={() => toggleSkill(s, offered, setOffered)}
                      className="px-3 py-1.5 rounded-full text-xs font-medium border transition-colors"
                      style={{
                        background: offered.includes(s) ? "#185FA5" : "#E6F1FB",
                        color: offered.includes(s) ? "#fff" : "#185FA5",
                        borderColor: offered.includes(s) ? "#185FA5" : "#B5D4F4",
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold mb-3" style={{ color: "#042C53" }}>Skills I want to learn</p>
                <div className="flex flex-wrap gap-2">
                  {allSkills.slice(0, 14).map((s) => (
                    <button
                      key={s}
                      onClick={() => toggleSkill(s, desired, setDesired)}
                      className="px-3 py-1.5 rounded-full text-xs font-medium border transition-colors"
                      style={{
                        background: desired.includes(s) ? "#042C53" : "#E6F1FB",
                        color: desired.includes(s) ? "#fff" : "#185FA5",
                        borderColor: desired.includes(s) ? "#042C53" : "#B5D4F4",
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 mt-2">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 py-3 rounded-xl font-semibold text-sm border"
                  style={{ color: "#185FA5", borderColor: "#B5D4F4" }}
                >
                  Back
                </button>
                <button
                  onClick={() => navigate("/dashboard")}
                  className="flex-1 py-3 rounded-xl font-semibold text-sm text-white"
                  style={{ background: "#185FA5" }}
                >
                  Create account
                </button>
              </div>
            </div>
          )}
        </div>

        <p className="text-center text-sm mt-5" style={{ color: "#6B8FA8" }}>
          Already have an account?{" "}
          <button onClick={() => navigate("/login")} className="font-semibold" style={{ color: "#185FA5" }}>
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
}
