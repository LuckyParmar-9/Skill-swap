import type { User } from "../types";
import { currentUser } from "../data";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface MatchDetailsProps {
  user: User | null;
}

export default function MatchDetails({ user }: MatchDetailsProps) {
  const navigate = useNavigate();
  const [sent, setSent] = useState(false);
  const [message, setMessage] = useState("");

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto px-5 py-16 text-center">
        <p style={{ color: "#6B8FA8" }}>No match selected.</p>
        <button onClick={() => navigate("/search")} className="mt-4 text-sm font-medium" style={{ color: "#185FA5" }}>← Back to search</button>
      </div>
    );
  }

  const overlapping = user.offeredSkills.filter((s) => currentUser.desiredSkills.includes(s));
  const theyWant = user.desiredSkills.filter((s) => currentUser.offeredSkills.includes(s));

  return (
    <div className="max-w-2xl mx-auto px-5 py-8">
      <button onClick={() => navigate("/search")} className="flex items-center gap-2 text-sm font-medium mb-6" style={{ color: "#185FA5" }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="15 18 9 12 15 6" />
        </svg>
        Back to search
      </button>

      {/* Profile summary */}
      <div className="rounded-2xl border overflow-hidden mb-5" style={{ background: "#fff", borderColor: "#B5D4F4" }}>
        <div className="h-20" style={{ background: "linear-gradient(135deg, #E6F1FB 0%, #B5D4F4 100%)" }} />
        <div className="px-6 pb-6">
          <div className="flex items-end gap-4 -mt-8 mb-4">
            <img src={user.avatar} alt={user.name} className="w-16 h-16 rounded-xl object-cover border-4" style={{ borderColor: "#fff" }} />
            <div className="mb-1">
              <h1 className="text-lg font-bold" style={{ color: "#042C53" }}>{user.name}</h1>
              <p className="text-xs" style={{ color: "#6B8FA8" }}>📍 {user.location} · ★ {user.rating} · {user.completedSwaps} swaps</p>
            </div>
          </div>
          <p className="text-sm leading-relaxed" style={{ color: "#6B8FA8" }}>{user.bio}</p>
        </div>
      </div>

      {/* Skill match */}
      <div className="rounded-2xl p-5 border mb-5" style={{ background: "#fff", borderColor: "#B5D4F4" }}>
        <h2 className="text-sm font-semibold mb-4" style={{ color: "#042C53" }}>Skill compatibility</h2>

        {overlapping.length > 0 ? (
          <div className="p-4 rounded-xl mb-4" style={{ background: "#E6F1FB" }}>
            <p className="text-xs font-semibold mb-2" style={{ color: "#042C53" }}>
              🎯 {user.name.split(" ")[0]} can teach you
            </p>
            <div className="flex flex-wrap gap-2">
              {overlapping.map((s) => (
                <span key={s} className="px-2.5 py-1 rounded-full text-xs font-medium" style={{ background: "#185FA5", color: "#fff" }}>{s}</span>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-xs mb-3" style={{ color: "#6B8FA8" }}>No direct skill overlap, but you can still connect.</p>
        )}

        {theyWant.length > 0 && (
          <div className="p-4 rounded-xl" style={{ background: "#F0F8FF", border: "1px solid #B5D4F4" }}>
            <p className="text-xs font-semibold mb-2" style={{ color: "#042C53" }}>
              ✅ You can teach {user.name.split(" ")[0]}
            </p>
            <div className="flex flex-wrap gap-2">
              {theyWant.map((s) => (
                <span key={s} className="px-2.5 py-1 rounded-full text-xs font-medium" style={{ background: "#042C53", color: "#fff" }}>{s}</span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* All skills */}
      <div className="grid grid-cols-2 gap-4 mb-5">
        <div className="rounded-2xl p-4 border" style={{ background: "#fff", borderColor: "#B5D4F4" }}>
          <p className="text-xs font-semibold mb-3" style={{ color: "#042C53" }}>They offer</p>
          <div className="flex flex-wrap gap-1.5">
            {user.offeredSkills.map((s) => (
              <span key={s} className="px-2 py-1 rounded-full text-xs" style={{ background: "#E6F1FB", color: "#185FA5" }}>{s}</span>
            ))}
          </div>
        </div>
        <div className="rounded-2xl p-4 border" style={{ background: "#fff", borderColor: "#B5D4F4" }}>
          <p className="text-xs font-semibold mb-3" style={{ color: "#042C53" }}>They want</p>
          <div className="flex flex-wrap gap-1.5">
            {user.desiredSkills.map((s) => (
              <span key={s} className="px-2 py-1 rounded-full text-xs" style={{ background: "#F0F8FF", color: "#6B8FA8", border: "1px solid #B5D4F4" }}>{s}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Send request */}
      {sent ? (
        <div className="rounded-2xl p-6 border text-center" style={{ background: "#E6F1FB", borderColor: "#B5D4F4" }}>
          <p className="text-3xl mb-2">✅</p>
          <p className="font-semibold text-sm" style={{ color: "#042C53" }}>Request sent!</p>
          <p className="text-xs mt-1" style={{ color: "#6B8FA8" }}>We'll notify you when {user.name.split(" ")[0]} responds.</p>
        </div>
      ) : (
        <div className="rounded-2xl p-5 border" style={{ background: "#fff", borderColor: "#B5D4F4" }}>
          <h2 className="text-sm font-semibold mb-3" style={{ color: "#042C53" }}>Send a swap request</h2>
          <textarea
            rows={3}
            placeholder={`Hi ${user.name.split(" ")[0]}! I'd love to swap — I can teach you ${currentUser.offeredSkills[0]} in exchange for ${overlapping[0] || user.offeredSkills[0]}.`}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl text-sm border resize-none mb-3"
            style={{ borderColor: "#B5D4F4", color: "#042C53" }}
          />
          <button
            onClick={() => setSent(true)}
            className="w-full py-3 rounded-xl font-semibold text-sm text-white"
            style={{ background: "#185FA5" }}
          >
            Send request to {user.name.split(" ")[0]}
          </button>
        </div>
      )}
    </div>
  );
}
