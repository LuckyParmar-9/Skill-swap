import { useNavigate } from "react-router-dom";
import { useState } from "react";

const features = [
  {
    icon: "🎨",
    title: "Share what you know",
    desc: "Offer your expertise — design, coding, languages, music, cooking — and connect with people who value it.",
  },
  {
    icon: "🤝",
    title: "Learn what you love",
    desc: "Find peers with the exact skill you want. No money changes hands — just knowledge and time.",
  },
  {
    icon: "⭐",
    title: "Build your reputation",
    desc: "Collect verified reviews after every swap. A strong profile opens more opportunities.",
  },
];

const testimonials = [
  {
    name: "Daniel Osei",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=56&h=56&fit=crop&auto=format",
    text: "I traded Python lessons for Figma training. Finished 8 sessions and launched my first app. Unreal value.",
    skill: "Python ↔ Figma",
  },
  {
    name: "Sofia Ramirez",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=56&h=56&fit=crop&auto=format",
    text: "SkillSwap matched me with a photographer who now shoots for my music studio. We still collaborate!",
    skill: "Spanish ↔ Photography",
  },
  {
    name: "Priya Sharma",
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=56&h=56&fit=crop&auto=format",
    text: "Found a yoga teacher who wanted to learn data science. 12 sessions in, we're both way better at our crafts.",
    skill: "Data Science ↔ Yoga",
  },
];

export default function Home() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen" style={{ background: "#F0F8FF", fontFamily: "Inter, sans-serif" }}>
      {/* Nav */}
      <header
        className="sticky top-0 z-20 border-b"
        style={{ background: "rgba(240,248,255,0.92)", backdropFilter: "blur(8px)", borderColor: "#B5D4F4" }}
      >
        <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "#185FA5" }}>
              <svg width="18" height="18" viewBox="0 0 28 28" fill="none">
                <path d="M8 14 C8 10, 13 7, 14 10 C15 13, 20 10, 20 14 C20 18, 15 21, 14 18 C13 15, 8 18, 8 14Z" fill="white" />
              </svg>
            </div>
            <span className="font-semibold text-base" style={{ color: "#042C53" }}>SkillSwap</span>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="#how" className="text-sm font-medium" style={{ color: "#185FA5" }}>How it works</a>
            <a href="#testimonials" className="text-sm font-medium" style={{ color: "#185FA5" }}>Stories</a>
            <button
              onClick={() => navigate("/login")}
              className="text-sm font-medium px-4 py-2 rounded-xl border transition-colors"
              style={{ color: "#185FA5", borderColor: "#B5D4F4" }}
            >
              Log in
            </button>
            <button
              onClick={() => navigate("/register")}
              className="text-sm font-semibold px-4 py-2 rounded-xl text-white transition-colors"
              style={{ background: "#185FA5" }}
            >
              Get started
            </button>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg"
            style={{ color: "#185FA5" }}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {menuOpen ? (
                <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>
              ) : (
                <><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></>
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t px-5 py-4 flex flex-col gap-3" style={{ background: "#E6F1FB", borderColor: "#B5D4F4" }}>
            <a href="#how" className="text-sm font-medium py-1" style={{ color: "#185FA5" }} onClick={() => setMenuOpen(false)}>How it works</a>
            <a href="#testimonials" className="text-sm font-medium py-1" style={{ color: "#185FA5" }} onClick={() => setMenuOpen(false)}>Stories</a>
            <button onClick={() => navigate("/login")} className="text-sm font-medium py-2 rounded-xl border" style={{ color: "#185FA5", borderColor: "#B5D4F4" }}>Log in</button>
            <button onClick={() => navigate("/register")} className="text-sm font-semibold py-2 rounded-xl text-white" style={{ background: "#185FA5" }}>Get started</button>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-5 pt-16 pb-20 text-center">
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6"
          style={{ background: "#E6F1FB", color: "#185FA5", border: "1px solid #B5D4F4" }}
        >
          ✨ 12,400+ skills exchanged and counting
        </div>
        <h1
          className="text-4xl md:text-6xl font-bold leading-tight mb-6 mx-auto max-w-3xl"
          style={{ color: "#042C53" }}
        >
          Trade skills.<br />
          <span style={{ color: "#185FA5" }}>No money needed.</span>
        </h1>
        <p className="text-base md:text-lg max-w-xl mx-auto mb-10" style={{ color: "#6B8FA8" }}>
          SkillSwap connects you with people who have what you want to learn — and want what you already know. 100% peer-to-peer, free forever.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => navigate("/register")}
            className="px-6 py-3 rounded-xl font-semibold text-white text-sm"
            style={{ background: "#185FA5" }}
          >
            Start swapping for free
          </button>
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-3 rounded-xl font-semibold text-sm border"
            style={{ color: "#185FA5", borderColor: "#B5D4F4", background: "#fff" }}
          >
            Sign in to your account
          </button>
        </div>

        {/* Hero image */}
        <div className="mt-14 rounded-2xl overflow-hidden border mx-auto max-w-3xl" style={{ borderColor: "#B5D4F4" }}>
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=900&h=400&fit=crop&auto=format"
            alt="People collaborating and learning together"
            className="w-full h-48 md:h-72 object-cover"
          />
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="max-w-6xl mx-auto px-5 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-2" style={{ color: "#042C53" }}>How it works</h2>
        <p className="text-center text-sm mb-10" style={{ color: "#6B8FA8" }}>Three steps to your first skill swap</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <div
              key={i}
              className="rounded-2xl p-6 border"
              style={{ background: "#fff", borderColor: "#B5D4F4" }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-4"
                style={{ background: "#E6F1FB" }}
              >
                {f.icon}
              </div>
              <h3 className="font-semibold text-base mb-2" style={{ color: "#042C53" }}>{f.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "#6B8FA8" }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="max-w-6xl mx-auto px-5 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-2" style={{ color: "#042C53" }}>Real swaps, real results</h2>
        <p className="text-center text-sm mb-10" style={{ color: "#6B8FA8" }}>From our community</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <div key={i} className="rounded-2xl p-6 border" style={{ background: "#fff", borderColor: "#B5D4F4" }}>
              <div
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium mb-4"
                style={{ background: "#E6F1FB", color: "#185FA5" }}
              >
                {t.skill}
              </div>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "#042C53" }}>"{t.text}"</p>
              <div className="flex items-center gap-3">
                <img src={t.avatar} alt={t.name} className="w-9 h-9 rounded-full object-cover" />
                <span className="text-sm font-medium" style={{ color: "#185FA5" }}>{t.name}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="max-w-6xl mx-auto px-5 py-16">
        <div className="rounded-2xl p-10 text-center" style={{ background: "#185FA5" }}>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Ready to swap your first skill?</h2>
          <p className="text-sm mb-6" style={{ color: "#B5D4F4" }}>Join 8,000+ learners. No fees, no subscriptions.</p>
          <button
            onClick={() => navigate("/register")}
            className="px-8 py-3 rounded-xl font-semibold text-sm"
            style={{ background: "#fff", color: "#185FA5" }}
          >
            Create your free account
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 px-5 text-center text-xs" style={{ borderColor: "#B5D4F4", color: "#6B8FA8" }}>
        © 2026 SkillSwap · Built on trust and mutual learning
      </footer>
    </div>
  );
}
