import { type Screen } from "../types";
import { reviews, users } from "../data";
import { useState } from "react";

interface ReviewsProps {
  setScreen: (s: Screen) => void;
}

function StarRating({ value, onChange }: { value: number; onChange?: (n: number) => void }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          onClick={() => onChange?.(n)}
          onMouseEnter={() => onChange && setHovered(n)}
          onMouseLeave={() => onChange && setHovered(0)}
          className="text-2xl leading-none transition-transform"
          style={{
            color: n <= (hovered || value) ? "#e8a900" : "#B5D4F4",
            transform: n <= (hovered || value) ? "scale(1.1)" : "scale(1)",
            cursor: onChange ? "pointer" : "default",
          }}
        >
          ★
        </button>
      ))}
    </div>
  );
}

export default function Reviews({ setScreen }: ReviewsProps) {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [selectedUser, setSelectedUser] = useState(users[0].id);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (rating === 0 || !reviewText.trim()) return;
    setSubmitted(true);
  };

  return (
    <div className="max-w-3xl mx-auto px-5 py-8">
      <h1 className="text-2xl font-bold mb-1" style={{ color: "#042C53" }}>Reviews</h1>
      <p className="text-sm mb-8" style={{ color: "#6B8FA8" }}>Share your experience and help others find great matches</p>

      {/* Leave a review */}
      <div className="rounded-2xl p-6 border mb-8" style={{ background: "#fff", borderColor: "#B5D4F4" }}>
        <h2 className="text-base font-semibold mb-5" style={{ color: "#042C53" }}>Leave a review</h2>

        {submitted ? (
          <div className="text-center py-8">
            <p className="text-4xl mb-3">🎉</p>
            <p className="font-semibold" style={{ color: "#042C53" }}>Review submitted!</p>
            <p className="text-sm mt-1" style={{ color: "#6B8FA8" }}>Thank you for helping the community.</p>
            <button
              onClick={() => { setSubmitted(false); setRating(0); setReviewText(""); }}
              className="mt-4 px-4 py-2 rounded-xl text-sm font-medium border"
              style={{ color: "#185FA5", borderColor: "#B5D4F4" }}
            >
              Write another review
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            {/* Select user */}
            <div>
              <label className="block text-xs font-semibold mb-2" style={{ color: "#042C53" }}>Who are you reviewing?</label>
              <div className="flex flex-wrap gap-2">
                {users.slice(0, 4).map((u) => (
                  <button
                    key={u.id}
                    onClick={() => setSelectedUser(u.id)}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl border text-sm transition-colors"
                    style={{
                      background: selectedUser === u.id ? "#E6F1FB" : "#fff",
                      borderColor: selectedUser === u.id ? "#185FA5" : "#B5D4F4",
                      color: selectedUser === u.id ? "#185FA5" : "#042C53",
                    }}
                  >
                    <img src={u.avatar} alt={u.name} className="w-6 h-6 rounded-full object-cover" />
                    <span className="font-medium">{u.name.split(" ")[0]}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Star rating */}
            <div>
              <label className="block text-xs font-semibold mb-2" style={{ color: "#042C53" }}>Overall rating</label>
              <StarRating value={rating} onChange={setRating} />
              {rating > 0 && (
                <p className="text-xs mt-1.5" style={{ color: "#185FA5" }}>
                  {["", "Poor", "Fair", "Good", "Very good", "Excellent"][rating]}
                </p>
              )}
            </div>

            {/* Skill swapped */}
            <div>
              <label className="block text-xs font-semibold mb-2" style={{ color: "#042C53" }}>Skill exchanged</label>
              <select
                className="w-full px-3.5 py-2.5 rounded-xl text-sm border appearance-none"
                style={{ borderColor: "#B5D4F4", color: "#042C53", background: "#fff" }}
              >
                <option>UI/UX Design</option>
                <option>Figma</option>
                <option>Prototyping</option>
                <option>Design Systems</option>
              </select>
            </div>

            {/* Review text */}
            <div>
              <label className="block text-xs font-semibold mb-2" style={{ color: "#042C53" }}>Your review</label>
              <textarea
                rows={4}
                placeholder="Describe your experience — what did you learn, how was the session structured, would you swap again?"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl text-sm border resize-none"
                style={{ borderColor: "#B5D4F4", color: "#042C53" }}
              />
              <p className="text-xs mt-1 text-right" style={{ color: "#6B8FA8" }}>{reviewText.length} / 500</p>
            </div>

            <button
              onClick={handleSubmit}
              className="py-3 rounded-xl font-semibold text-sm text-white transition-opacity"
              style={{
                background: "#185FA5",
                opacity: rating === 0 || !reviewText.trim() ? 0.5 : 1,
              }}
            >
              Submit review
            </button>
          </div>
        )}
      </div>

      {/* Past reviews received */}
      <div>
        <h2 className="text-base font-semibold mb-4" style={{ color: "#042C53" }}>Reviews you've received</h2>
        <div className="flex flex-col gap-4">
          {reviews.map((r) => (
            <div key={r.id} className="rounded-2xl p-5 border" style={{ background: "#fff", borderColor: "#B5D4F4" }}>
              <div className="flex items-start gap-4">
                <img src={r.reviewer.avatar} alt={r.reviewer.name} className="w-10 h-10 rounded-full object-cover shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 flex-wrap mb-1">
                    <div>
                      <p className="font-semibold text-sm" style={{ color: "#042C53" }}>{r.reviewer.name}</p>
                      <p className="text-xs" style={{ color: "#6B8FA8" }}>{r.date}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <StarRating value={r.rating} />
                      <span
                        className="px-2.5 py-0.5 rounded-full text-xs font-medium"
                        style={{ background: "#E6F1FB", color: "#185FA5" }}
                      >
                        {r.skill}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed mt-2" style={{ color: "#6B8FA8" }}>{r.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
