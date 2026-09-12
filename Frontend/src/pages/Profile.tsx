import { type Screen } from "../types";
import { currentUser, reviews } from "../data";
import { useState } from "react";

interface ProfileProps {
  setScreen: (s: Screen) => void;
}

function SkillTag({ label, variant }: { label: string; variant: "offered" | "desired" }) {
  return (
    <span
      className="px-3 py-1.5 rounded-full text-xs font-medium"
      style={{
        background: variant === "offered" ? "#E6F1FB" : "#F0F8FF",
        color: variant === "offered" ? "#185FA5" : "#042C53",
        border: `1px solid ${variant === "offered" ? "#B5D4F4" : "#B5D4F4"}`,
      }}
    >
      {label}
    </span>
  );
}

export default function Profile({ setScreen }: ProfileProps) {
  const [editing, setEditing] = useState(false);
  const [bio, setBio] = useState(currentUser.bio);

  return (
    <div className="max-w-3xl mx-auto px-5 py-8">
      {/* Header card */}
      <div className="rounded-2xl border overflow-hidden mb-5" style={{ background: "#fff", borderColor: "#B5D4F4" }}>
        {/* Cover */}
        <div className="h-28 relative" style={{ background: "linear-gradient(135deg, #E6F1FB 0%, #B5D4F4 100%)" }}>
          {!editing && (
            <button
              onClick={() => setEditing(true)}
              className="absolute top-4 right-4 px-3 py-1.5 rounded-xl text-xs font-semibold border"
              style={{ background: "#fff", color: "#185FA5", borderColor: "#B5D4F4" }}
            >
              Edit profile
            </button>
          )}
        </div>

        {/* Avatar + basic info */}
        <div className="px-6 pb-6">
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-end gap-4 -mt-10 mb-4">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-20 h-20 rounded-2xl object-cover border-4"
              style={{ borderColor: "#fff" }}
            />
            <div className="mb-1">
              <h1 className="text-xl font-bold" style={{ color: "#042C53" }}>{currentUser.name}</h1>
              <p className="text-sm" style={{ color: "#6B8FA8" }}>📍 {currentUser.location}</p>
            </div>
            <div className="sm:ml-auto flex gap-4 mb-1">
              <div className="text-center">
                <p className="text-lg font-bold" style={{ color: "#042C53" }}>{currentUser.completedSwaps}</p>
                <p className="text-xs" style={{ color: "#6B8FA8" }}>Swaps</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold" style={{ color: "#e8a900" }}>★ {currentUser.rating}</p>
                <p className="text-xs" style={{ color: "#6B8FA8" }}>Rating</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold" style={{ color: "#042C53" }}>{reviews.length}</p>
                <p className="text-xs" style={{ color: "#6B8FA8" }}>Reviews</p>
              </div>
            </div>
          </div>

          {/* Bio */}
          {editing ? (
            <div className="mb-4">
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={3}
                className="w-full px-3.5 py-2.5 rounded-xl text-sm border resize-none"
                style={{ borderColor: "#B5D4F4", color: "#042C53" }}
              />
              <div className="flex gap-2 mt-2">
                <button onClick={() => setEditing(false)} className="px-4 py-1.5 rounded-xl text-xs font-semibold text-white" style={{ background: "#185FA5" }}>Save</button>
                <button onClick={() => { setBio(currentUser.bio); setEditing(false); }} className="px-4 py-1.5 rounded-xl text-xs font-medium border" style={{ color: "#185FA5", borderColor: "#B5D4F4" }}>Cancel</button>
              </div>
            </div>
          ) : (
            <p className="text-sm leading-relaxed mb-5" style={{ color: "#042C53" }}>{bio}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
        {/* Offered skills */}
        <div className="rounded-2xl p-5 border" style={{ background: "#fff", borderColor: "#B5D4F4" }}>
          <h2 className="text-sm font-semibold mb-3" style={{ color: "#042C53" }}>Skills I offer</h2>
          <div className="flex flex-wrap gap-2">
            {currentUser.offeredSkills.map((s) => (
              <SkillTag key={s} label={s} variant="offered" />
            ))}
          </div>
        </div>

        {/* Desired skills */}
        <div className="rounded-2xl p-5 border" style={{ background: "#fff", borderColor: "#B5D4F4" }}>
          <h2 className="text-sm font-semibold mb-3" style={{ color: "#042C53" }}>Skills I want to learn</h2>
          <div className="flex flex-wrap gap-2">
            {currentUser.desiredSkills.map((s) => (
              <SkillTag key={s} label={s} variant="desired" />
            ))}
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div className="rounded-2xl p-5 border" style={{ background: "#fff", borderColor: "#B5D4F4" }}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold" style={{ color: "#042C53" }}>Reviews</h2>
          <button onClick={() => navigate("/reviews")} className="text-xs font-medium" style={{ color: "#185FA5" }}>Leave a review</button>
        </div>
        <div className="flex flex-col gap-4">
          {reviews.map((r) => (
            <div key={r.id} className="flex gap-3">
              <img src={r.reviewer.avatar} alt={r.reviewer.name} className="w-9 h-9 rounded-full object-cover shrink-0" />
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm font-semibold" style={{ color: "#042C53" }}>{r.reviewer.name}</p>
                  <span className="text-xs" style={{ color: "#e8a900" }}>{"★".repeat(r.rating)}</span>
                  <span className="px-2 py-0.5 rounded-full text-xs" style={{ background: "#E6F1FB", color: "#185FA5" }}>{r.skill}</span>
                </div>
                <p className="text-sm" style={{ color: "#6B8FA8" }}>{r.text}</p>
                <p className="text-xs mt-1" style={{ color: "#B5D4F4" }}>{r.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
