import { currentUser, users, swapRequests } from "../data";
import { useNavigate } from "react-router-dom";

interface DashboardProps {
  setSelectedUser: (u: typeof users[0]) => void;
}

function StatCard({ label, value, sub, color }: { label: string; value: string | number; sub?: string; color?: string }) {
  return (
    <div className="rounded-2xl p-5 border" style={{ background: "#fff", borderColor: "#B5D4F4" }}>
      <p className="text-xs font-medium mb-1" style={{ color: "#6B8FA8" }}>{label}</p>
      <p className="text-2xl font-bold" style={{ color: color || "#042C53" }}>{value}</p>
      {sub && <p className="text-xs mt-1" style={{ color: "#6B8FA8" }}>{sub}</p>}
    </div>
  );
}

function SkillTag({ label, variant = "offered" }: { label: string; variant?: "offered" | "desired" }) {
  return (
    <span
      className="px-2.5 py-1 rounded-full text-xs font-medium"
      style={{
        background: variant === "offered" ? "#E6F1FB" : "#f0f0ff",
        color: variant === "offered" ? "#185FA5" : "#5b5bd6",
      }}
    >
      {label}
    </span>
  );
}

export default function Dashboard({ setSelectedUser }: DashboardProps) {
  const navigate = useNavigate();
  const pending = swapRequests.filter((r) => r.status === "pending");
  const recommended = users.slice(0, 4);

  return (
    <div className="max-w-5xl mx-auto px-5 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-xs font-medium mb-0.5" style={{ color: "#6B8FA8" }}>Good morning 👋</p>
          <h1 className="text-2xl font-bold" style={{ color: "#042C53" }}>Hi, {currentUser.name.split(" ")[0]}</h1>
        </div>
        <img src={currentUser.avatar} alt={currentUser.name} className="w-10 h-10 rounded-full object-cover border-2" style={{ borderColor: "#B5D4F4" }} />
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-3 gap-3 md:gap-4 mb-8">
        <StatCard label="Completed swaps" value={currentUser.completedSwaps} sub="All time" />
        <StatCard label="Pending requests" value={pending.length} sub="Awaiting reply" color="#185FA5" />
        <StatCard label="Your rating" value={`${currentUser.rating}★`} sub="From 11 reviews" color="#e8a900" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pending requests */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold" style={{ color: "#042C53" }}>Pending requests</h2>
            <button onClick={() => navigate("/swap-requests")} className="text-xs font-medium" style={{ color: "#185FA5" }}>View all</button>
          </div>
          <div className="flex flex-col gap-3">
            {pending.slice(0, 3).map((req) => (
              <div key={req.id} className="rounded-2xl p-4 border" style={{ background: "#fff", borderColor: "#B5D4F4" }}>
                <div className="flex items-start gap-3">
                  <img src={req.user.avatar} alt={req.user.name} className="w-9 h-9 rounded-full object-cover shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold" style={{ color: "#042C53" }}>{req.user.name}</p>
                    <p className="text-xs mt-0.5" style={{ color: "#6B8FA8" }}>
                      Offers <span style={{ color: "#185FA5" }}>{req.offeredSkill}</span> · Wants <span style={{ color: "#185FA5" }}>{req.wantedSkill}</span>
                    </p>
                    <p className="text-xs mt-1.5 line-clamp-2" style={{ color: "#6B8FA8" }}>{req.message}</p>
                  </div>
                </div>
                <div className="flex gap-2 mt-3">
                  <button className="flex-1 py-1.5 rounded-xl text-xs font-semibold text-white" style={{ background: "#185FA5" }}>Accept</button>
                  <button className="flex-1 py-1.5 rounded-xl text-xs font-medium border" style={{ color: "#185FA5", borderColor: "#B5D4F4" }}>Decline</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended matches */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold" style={{ color: "#042C53" }}>Recommended matches</h2>
            <button onClick={() => navigate("/search")} className="text-xs font-medium" style={{ color: "#185FA5" }}>Browse all</button>
          </div>
          <div className="flex flex-col gap-3">
            {recommended.map((u) => (
              <div key={u.id} className="rounded-2xl p-4 border" style={{ background: "#fff", borderColor: "#B5D4F4" }}>
                <div className="flex items-start gap-3">
                  <img src={u.avatar} alt={u.name} className="w-9 h-9 rounded-full object-cover shrink-0" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold" style={{ color: "#042C53" }}>{u.name}</p>
                      <span className="text-xs font-medium" style={{ color: "#e8a900" }}>★ {u.rating}</span>
                    </div>
                    <p className="text-xs mt-0.5" style={{ color: "#6B8FA8" }}>{u.location}</p>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {u.offeredSkills.slice(0, 2).map((s) => (
                        <SkillTag key={s} label={s} variant="offered" />
                      ))}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => { setSelectedUser(u); navigate("/match-details"); }}
                  className="mt-3 w-full py-1.5 rounded-xl text-xs font-semibold border"
                  style={{ color: "#185FA5", borderColor: "#B5D4F4" }}
                >
                  View match
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
