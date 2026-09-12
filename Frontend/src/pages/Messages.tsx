import { conversations } from "../data";
import type { Conversation } from "../types";
import { useState } from "react";

interface MessagesProps {}

function ConversationList({ convos, active, onSelect }: { convos: typeof conversations; active: string | null; onSelect: (c: Conversation) => void }) {
  return (
    <div className="flex flex-col gap-1">
      {convos.map((c) => (
        <button
          key={c.id}
          onClick={() => onSelect(c)}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors"
          style={{ background: active === c.id ? "#E6F1FB" : "transparent" }}
        >
          <div className="relative shrink-0">
            <img src={c.user.avatar} alt={c.user.name} className="w-10 h-10 rounded-full object-cover" />
            {c.unread > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full text-white flex items-center justify-center text-xs font-bold" style={{ background: "#185FA5", fontSize: 9 }}>
                {c.unread}
              </span>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold truncate" style={{ color: "#042C53" }}>{c.user.name}</p>
              <span className="text-xs shrink-0 ml-2" style={{ color: "#6B8FA8" }}>{c.lastTime}</span>
            </div>
            <p className="text-xs truncate mt-0.5" style={{ color: "#6B8FA8" }}>{c.lastMessage}</p>
          </div>
        </button>
      ))}
    </div>
  );
}

function ChatView({ convo, onBack }: { convo: Conversation; onBack?: () => void }) {
  const [text, setText] = useState("");

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3.5 border-b shrink-0" style={{ borderColor: "#B5D4F4" }}>
        {onBack && (
          <button onClick={onBack} className="mr-1" style={{ color: "#185FA5" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
        )}
        <img src={convo.user.avatar} alt={convo.user.name} className="w-9 h-9 rounded-full object-cover" />
        <div>
          <p className="text-sm font-semibold" style={{ color: "#042C53" }}>{convo.user.name}</p>
          <p className="text-xs" style={{ color: "#6B8FA8" }}>Active skill swap</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
        {convo.messages.map((m: { id: string; text: string; time: string; isMe: boolean }) => (
          <div key={m.id} className={`flex ${m.isMe ? "justify-end" : "justify-start"}`}>
            <div
              className="max-w-xs px-4 py-2.5 rounded-2xl text-sm"
              style={{
                background: m.isMe ? "#185FA5" : "#E6F1FB",
                color: m.isMe ? "#fff" : "#042C53",
                borderBottomRightRadius: m.isMe ? 4 : undefined,
                borderBottomLeftRadius: !m.isMe ? 4 : undefined,
              }}
            >
              {m.text}
              <p className="text-xs mt-1 opacity-60">{m.time}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="border-t px-4 py-3 flex gap-3 shrink-0" style={{ borderColor: "#B5D4F4" }}>
        <input
          type="text"
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter" && text.trim()) setText(""); }}
          className="flex-1 px-4 py-2.5 rounded-xl text-sm border"
          style={{ borderColor: "#B5D4F4", color: "#042C53", background: "#fff" }}
        />
        <button
          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: "#185FA5" }}
          onClick={() => setText("")}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default function Messages() {
  const [activeConvo, setActiveConvo] = useState<Conversation | null>(null);
  const [mobileChat, setMobileChat] = useState(false);

  const handleSelect = (c: Conversation) => {
    setActiveConvo(c);
    setMobileChat(true);
  };

  return (
    <div style={{ height: "calc(100vh - 0px)" }} className="max-w-5xl mx-auto">
      <div className="flex h-full border rounded-2xl overflow-hidden mx-5 my-8" style={{ borderColor: "#B5D4F4", background: "#fff" }}>
        {/* Conversation list — hidden on mobile when chat open */}
        <div
          className={`${mobileChat ? "hidden md:flex" : "flex"} flex-col w-full md:w-72 border-r shrink-0`}
          style={{ borderColor: "#B5D4F4" }}
        >
          <div className="px-4 py-4 border-b" style={{ borderColor: "#B5D4F4" }}>
            <h2 className="font-semibold text-base" style={{ color: "#042C53" }}>Messages</h2>
          </div>
          <div className="flex-1 overflow-y-auto py-2 px-2">
            <ConversationList
              convos={conversations}
              active={activeConvo?.id ?? null}
              onSelect={handleSelect}
            />
          </div>
        </div>

        {/* Chat pane */}
        <div className={`${mobileChat ? "flex" : "hidden md:flex"} flex-1 flex-col min-w-0`}>
          {activeConvo ? (
            <ChatView
              convo={activeConvo}
              onBack={mobileChat ? () => setMobileChat(false) : undefined}
            />
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4" style={{ background: "#E6F1FB" }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#85B7EB" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <p className="font-semibold text-sm" style={{ color: "#042C53" }}>Select a conversation</p>
              <p className="text-xs mt-1" style={{ color: "#6B8FA8" }}>Choose from your active swaps to start chatting</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
