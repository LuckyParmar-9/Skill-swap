import React from "react";
import type { Screen } from "../types";
import { currentUser } from "../data";

const navItems: { id: Screen; label: string; icon: React.FC<{ size?: number }> }[] = [
  { id: "dashboard", label: "Dashboard", icon: GridIcon },
  { id: "search", label: "Search", icon: SearchIcon },
  { id: "swap-requests", label: "Swaps", icon: SwapIcon },
  { id: "messages", label: "Messages", icon: MessageIcon },
  { id: "profile", label: "Profile", icon: UserIcon },
];

function GridIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
    </svg>
  );
}
function SearchIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}
function SwapIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="17 1 21 5 17 9" /><path d="M3 11V9a4 4 0 0 1 4-4h14" />
      <polyline points="7 23 3 19 7 15" /><path d="M21 13v2a4 4 0 0 1-4 4H3" />
    </svg>
  );
}
function MessageIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}
function UserIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
    </svg>
  );
}
function AdminIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}
function LogOutIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );
}

import { useNavigate, useLocation } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const screen = location.pathname.replace("/", "") || "home";
  return (
    <div className="flex min-h-screen" style={{ background: "#F0F8FF" }}>
      {/* Sidebar — hidden on mobile, icon-only on tablet (md), full on lg+ */}
      <aside
        className="hidden md:flex flex-col fixed left-0 top-0 h-screen z-20 border-r transition-all w-[64px] lg:w-[200px]"
        style={{
          background: "#E6F1FB",
          borderColor: "#B5D4F4",
        }}
      >
        {/* Logo */}
        <div
          className="flex items-center gap-3 px-4 py-5 border-b shrink-0"
          style={{ borderColor: "#B5D4F4" }}
        >
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: "#185FA5" }}
          >
            <svg width="16" height="16" viewBox="0 0 28 28" fill="none">
              <path d="M8 14 C8 10, 13 7, 14 10 C15 13, 20 10, 20 14 C20 18, 15 21, 14 18 C13 15, 8 18, 8 14Z" fill="white" />
            </svg>
          </div>
          <span className="font-semibold text-sm hidden lg:block whitespace-nowrap" style={{ color: "#042C53" }}>
            SkillSwap
          </span>
        </div>

        {/* Nav */}
        <nav className="flex flex-col gap-1 p-2 flex-1 overflow-y-auto">
          {navItems.map(({ id, label, icon: Icon }) => {
            const active = screen === id;
            return (
              <button
                key={id}
                onClick={() => navigate(`/${id}`)}
                title={label}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors w-full"
                style={{
                  background: active ? "#185FA5" : "transparent",
                  color: active ? "#fff" : "#185FA5",
                  justifyContent: "flex-start",
                }}
              >
                <span className="shrink-0"><Icon size={18} /></span>
                <span className="hidden lg:block">{label}</span>
              </button>
            );
          })}
        </nav>

        {/* Admin */}
        <div className="p-2 border-t" style={{ borderColor: "#B5D4F4" }}>
          <button
            onClick={() => navigate("/admin")}
            title="Admin"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors w-full"
            style={{
              background: screen === "admin" ? "#185FA5" : "transparent",
              color: screen === "admin" ? "#fff" : "#185FA5",
            }}
          >
            <span className="shrink-0"><AdminIcon size={18} /></span>
            <span className="hidden lg:block">Admin</span>
          </button>
        </div>

        {/* Avatar */}
        <div className="p-3 border-t" style={{ borderColor: "#B5D4F4" }}>
          <div className="flex items-center w-full">
            <button
              onClick={() => navigate("/profile")}
              className="flex flex-1 items-center gap-3 px-2 py-2 rounded-xl hover:bg-[#E6F1FB] transition-colors"
            >
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-8 h-8 rounded-full object-cover shrink-0"
              />
              <div className="hidden lg:block text-left min-w-0 flex-1">
                <p className="text-xs font-semibold truncate" style={{ color: "#042C53" }}>{currentUser.name}</p>
                <p className="text-xs" style={{ color: "#6B8FA8" }}>View profile</p>
              </div>
            </button>
            <button
              onClick={() => navigate("/login")}
              title="Logout"
              className="hidden lg:flex p-2 rounded-xl hover:bg-[#E6F1FB] text-[#185FA5] hover:text-[#042C53] transition-colors shrink-0"
            >
              <LogOutIcon size={18} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main — offset by sidebar width on md+, lg+ */}
      <main
        className="flex-1 min-h-screen pb-20 md:pb-4"
        style={{
          marginLeft: 0,
        }}
      >
        {/* Spacer div that matches sidebar on md+ */}
        <style>{`
          @media (min-width: 768px) {
            .sidebar-offset { margin-left: 64px; }
          }
          @media (min-width: 1024px) {
            .sidebar-offset { margin-left: 200px; }
          }
        `}</style>
        <div className="sidebar-offset min-h-screen">
          {children}
        </div>
      </main>

      {/* Mobile bottom tab bar */}
      <nav
        className="fixed bottom-0 left-0 right-0 flex md:hidden border-t z-30"
        style={{ background: "#E6F1FB", borderColor: "#B5D4F4" }}
      >
        {navItems.map(({ id, label, icon: Icon }) => {
          const active = screen === id;
          return (
            <button
              key={id}
              onClick={() => navigate(`/${id}`)}
              className="flex-1 flex flex-col items-center gap-1 py-2.5"
              style={{ color: active ? "#185FA5" : "#85B7EB" }}
            >
              <Icon size={20} />
              <span style={{ fontSize: 10, fontWeight: active ? 600 : 400 }}>{label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
