import { swapRequests } from "../data";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface SwapRequestsProps {}

type Tab = "pending" | "accepted" | "rejected" | "completed";

const tabs: { id: Tab; label: string }[] = [
  { id: "pending", label: "Pending" },
  { id: "accepted", label: "Accepted" },
  { id: "rejected", label: "Rejected" },
  { id: "completed", label: "Completed" },
];

const statusColors: Record<Tab, { bg: string; text: string; dot: string }> = {
  pending: { bg: "#FFF8E1", text: "#e8a900", dot: "#e8a900" },
  accepted: { bg: "#E6F1FB", text: "#185FA5", dot: "#185FA5" },
  rejected: { bg: "#fff5f5", text: "#e05a5a", dot: "#e05a5a" },
  completed: { bg: "#f0fff4", text: "#2d8a4e", dot: "#2d8a4e" },
};

export default function SwapRequests() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>("pending");

  const filtered = swapRequests.filter((r) => r.status === activeTab);

  return (
    <div className="max-w-3xl mx-auto px-5 py-8">
      <h1 className="text-2xl font-bold mb-6" style={{ color: "#042C53" }}>Swap requests</h1>

      {/* Tabs — horizontal scroll on mobile */}
      <div
        className="flex gap-1 p-1 rounded-xl mb-6 overflow-x-auto"
        style={{ background: "#E6F1FB" }}
      >
        {tabs.map(({ id, label }) => {
          const count = swapRequests.filter((r) => r.status === id).length;
          return (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors flex-1"
              style={{
                background: activeTab === id ? "#fff" : "transparent",
                color: activeTab === id ? "#042C53" : "#6B8FA8",
                boxShadow: activeTab === id ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
              }}
            >
              {label}
              {count > 0 && (
                <span
                  className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-semibold"
                  style={{
                    background: activeTab === id ? "#185FA5" : "#B5D4F4",
                    color: activeTab === id ? "#fff" : "#fff",
                  }}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Request cards */}
      <div className="flex flex-col gap-4">
        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-4xl mb-3">📭</p>
            <p className="font-medium" style={{ color: "#042C53" }}>No {activeTab} requests</p>
            <p className="text-sm mt-1" style={{ color: "#6B8FA8" }}>Check back later or browse matches</p>
            <button
              onClick={() => navigate("/search")}
              className="mt-4 px-4 py-2 rounded-xl text-sm font-semibold text-white"
              style={{ background: "#185FA5" }}
            >
              Find matches
            </button>
          </div>
        )}
        {filtered.map((req) => {
          const colors = statusColors[req.status];
          return (
            <div key={req.id} className="rounded-2xl p-5 border" style={{ background: "#fff", borderColor: "#B5D4F4" }}>
              <div className="flex items-start gap-4">
                <img src={req.user.avatar} alt={req.user.name} className="w-11 h-11 rounded-xl object-cover shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <p className="font-semibold text-sm" style={{ color: "#042C53" }}>{req.user.name}</p>
                    <span
                      className="px-2.5 py-0.5 rounded-full text-xs font-semibold shrink-0"
                      style={{ background: colors.bg, color: colors.text }}
                    >
                      ● {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                    </span>
                  </div>
                  <p className="text-xs mb-2" style={{ color: "#6B8FA8" }}>
                    Offers <span className="font-medium" style={{ color: "#185FA5" }}>{req.offeredSkill}</span>
                    {" "}· Wants <span className="font-medium" style={{ color: "#185FA5" }}>{req.wantedSkill}</span>
                    {" "}· {req.date}
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: "#6B8FA8" }}>{req.message}</p>
                </div>
              </div>

              {req.status === "pending" && (
                <div className="flex gap-2 mt-4">
                  <button className="flex-1 py-2 rounded-xl text-sm font-semibold text-white" style={{ background: "#185FA5" }}>Accept</button>
                  <button className="flex-1 py-2 rounded-xl text-sm font-medium border" style={{ color: "#185FA5", borderColor: "#B5D4F4" }}>Decline</button>
                  <button className="px-3 py-2 rounded-xl text-sm font-medium border" style={{ color: "#6B8FA8", borderColor: "#B5D4F4" }}>Message</button>
                </div>
              )}
              {req.status === "accepted" && (
                <div className="flex gap-2 mt-4">
                  <button onClick={() => navigate("/messages")} className="flex-1 py-2 rounded-xl text-sm font-semibold" style={{ background: "#E6F1FB", color: "#185FA5" }}>Open chat</button>
                  <button className="flex-1 py-2 rounded-xl text-sm font-medium border" style={{ color: "#6B8FA8", borderColor: "#B5D4F4" }}>Cancel swap</button>
                </div>
              )}
              {req.status === "completed" && (
                <button onClick={() => navigate("/reviews")} className="mt-4 w-full py-2 rounded-xl text-sm font-semibold" style={{ background: "#E6F1FB", color: "#185FA5" }}>
                  Leave a review
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
