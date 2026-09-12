import { adminReports, adminUsers } from "../data";
import { useState } from "react";

type AdminTab = "reports" | "users";

const statusColors: Record<string, { bg: string; text: string }> = {
  open: { bg: "#FFF8E1", text: "#e8a900" },
  investigating: { bg: "#E6F1FB", text: "#185FA5" },
  resolved: { bg: "#f0fff4", text: "#2d8a4e" },
  active: { bg: "#f0fff4", text: "#2d8a4e" },
  suspended: { bg: "#FFF8E1", text: "#e8a900" },
  banned: { bg: "#fff5f5", text: "#e05a5a" },
};

export default function Admin() {
  const [tab, setTab] = useState<AdminTab>("reports");
  const [search, setSearch] = useState("");

  const filteredUsers = adminUsers.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto px-5 py-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "#E6F1FB" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#185FA5" strokeWidth="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
        </div>
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "#042C53" }}>Admin panel</h1>
          <p className="text-xs" style={{ color: "#6B8FA8" }}>Manage users and reported content</p>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {[
          { label: "Total users", value: "8,241" },
          { label: "Active today", value: "1,392" },
          { label: "Open reports", value: adminReports.filter((r) => r.status === "open").length },
          { label: "Swaps this month", value: "4,120" },
        ].map(({ label, value }) => (
          <div key={label} className="rounded-2xl p-4 border" style={{ background: "#fff", borderColor: "#B5D4F4" }}>
            <p className="text-xs" style={{ color: "#6B8FA8" }}>{label}</p>
            <p className="text-xl font-bold mt-1" style={{ color: "#042C53" }}>{value}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-xl mb-6 w-fit" style={{ background: "#E6F1FB" }}>
        {(["reports", "users"] as AdminTab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className="px-5 py-2 rounded-lg text-sm font-medium transition-colors capitalize"
            style={{
              background: tab === t ? "#fff" : "transparent",
              color: tab === t ? "#042C53" : "#6B8FA8",
              boxShadow: tab === t ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "reports" && (
        <div>
          {/* Desktop table */}
          <div className="hidden md:block rounded-2xl border overflow-hidden" style={{ borderColor: "#B5D4F4" }}>
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: "#E6F1FB" }}>
                  {["Reporter", "Reported user", "Reason", "Date", "Status", "Actions"].map((h) => (
                    <th key={h} className="text-left px-5 py-3 text-xs font-semibold" style={{ color: "#6B8FA8" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {adminReports.map((r, i) => {
                  const colors = statusColors[r.status] || statusColors.open;
                  return (
                    <tr key={r.id} style={{ background: i % 2 === 0 ? "#fff" : "#FAFCFF", borderTop: "1px solid #F0F8FF" }}>
                      <td className="px-5 py-3.5 font-medium" style={{ color: "#042C53" }}>{r.reporter}</td>
                      <td className="px-5 py-3.5" style={{ color: "#6B8FA8" }}>{r.reportee}</td>
                      <td className="px-5 py-3.5" style={{ color: "#6B8FA8" }}>{r.reason}</td>
                      <td className="px-5 py-3.5 text-xs" style={{ color: "#6B8FA8" }}>{r.date}</td>
                      <td className="px-5 py-3.5">
                        <span className="px-2.5 py-1 rounded-full text-xs font-semibold capitalize" style={{ background: colors.bg, color: colors.text }}>
                          {r.status}
                        </span>
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="flex gap-2">
                          <button className="text-xs font-medium px-2.5 py-1 rounded-lg" style={{ background: "#E6F1FB", color: "#185FA5" }}>Review</button>
                          <button className="text-xs font-medium px-2.5 py-1 rounded-lg" style={{ background: "#fff5f5", color: "#e05a5a" }}>Dismiss</button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile card list */}
          <div className="md:hidden flex flex-col gap-3">
            {adminReports.map((r) => {
              const colors = statusColors[r.status] || statusColors.open;
              return (
                <div key={r.id} className="rounded-2xl p-4 border" style={{ background: "#fff", borderColor: "#B5D4F4" }}>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="text-sm font-semibold" style={{ color: "#042C53" }}>{r.reporter} → {r.reportee}</p>
                      <p className="text-xs mt-0.5" style={{ color: "#6B8FA8" }}>{r.date}</p>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold capitalize" style={{ background: colors.bg, color: colors.text }}>
                      {r.status}
                    </span>
                  </div>
                  <p className="text-xs mb-3" style={{ color: "#6B8FA8" }}>{r.reason}</p>
                  <div className="flex gap-2">
                    <button className="flex-1 py-1.5 rounded-xl text-xs font-medium" style={{ background: "#E6F1FB", color: "#185FA5" }}>Review</button>
                    <button className="flex-1 py-1.5 rounded-xl text-xs font-medium" style={{ background: "#fff5f5", color: "#e05a5a" }}>Dismiss</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {tab === "users" && (
        <div>
          {/* Search */}
          <div className="relative mb-4">
            <svg className="absolute left-3.5 top-1/2 -translate-y-1/2" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#85B7EB" strokeWidth="2">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm border"
              style={{ borderColor: "#B5D4F4", color: "#042C53", background: "#fff" }}
            />
          </div>

          {/* Desktop table */}
          <div className="hidden md:block rounded-2xl border overflow-hidden" style={{ borderColor: "#B5D4F4" }}>
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: "#E6F1FB" }}>
                  {["User", "Email", "Joined", "Swaps", "Status", "Actions"].map((h) => (
                    <th key={h} className="text-left px-5 py-3 text-xs font-semibold" style={{ color: "#6B8FA8" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((u, i) => {
                  const colors = statusColors[u.status] || statusColors.active;
                  return (
                    <tr key={u.id} style={{ background: i % 2 === 0 ? "#fff" : "#FAFCFF", borderTop: "1px solid #F0F8FF" }}>
                      <td className="px-5 py-3.5 font-medium" style={{ color: "#042C53" }}>{u.name}</td>
                      <td className="px-5 py-3.5 text-xs" style={{ color: "#6B8FA8" }}>{u.email}</td>
                      <td className="px-5 py-3.5 text-xs" style={{ color: "#6B8FA8" }}>{u.joined}</td>
                      <td className="px-5 py-3.5 font-semibold" style={{ color: "#042C53" }}>{u.swaps}</td>
                      <td className="px-5 py-3.5">
                        <span className="px-2.5 py-1 rounded-full text-xs font-semibold capitalize" style={{ background: colors.bg, color: colors.text }}>
                          {u.status}
                        </span>
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="flex gap-2">
                          <button className="text-xs font-medium px-2.5 py-1 rounded-lg" style={{ background: "#E6F1FB", color: "#185FA5" }}>View</button>
                          {u.status === "active" && (
                            <button className="text-xs font-medium px-2.5 py-1 rounded-lg" style={{ background: "#FFF8E1", color: "#e8a900" }}>Suspend</button>
                          )}
                          {u.status === "suspended" && (
                            <button className="text-xs font-medium px-2.5 py-1 rounded-lg" style={{ background: "#fff5f5", color: "#e05a5a" }}>Ban</button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile card list */}
          <div className="md:hidden flex flex-col gap-3">
            {filteredUsers.map((u) => {
              const colors = statusColors[u.status] || statusColors.active;
              return (
                <div key={u.id} className="rounded-2xl p-4 border" style={{ background: "#fff", borderColor: "#B5D4F4" }}>
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-semibold" style={{ color: "#042C53" }}>{u.name}</p>
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold capitalize" style={{ background: colors.bg, color: colors.text }}>
                      {u.status}
                    </span>
                  </div>
                  <p className="text-xs mb-1" style={{ color: "#6B8FA8" }}>{u.email}</p>
                  <p className="text-xs mb-3" style={{ color: "#6B8FA8" }}>Joined {u.joined} · {u.swaps} swaps</p>
                  <div className="flex gap-2">
                    <button className="flex-1 py-1.5 rounded-xl text-xs font-medium" style={{ background: "#E6F1FB", color: "#185FA5" }}>View profile</button>
                    {u.status === "active" && (
                      <button className="flex-1 py-1.5 rounded-xl text-xs font-medium" style={{ background: "#FFF8E1", color: "#e8a900" }}>Suspend</button>
                    )}
                    {u.status === "suspended" && (
                      <button className="flex-1 py-1.5 rounded-xl text-xs font-medium" style={{ background: "#fff5f5", color: "#e05a5a" }}>Ban</button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
