import { users } from "../data";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface SearchProps {
  setSelectedUser: (u: typeof users[0]) => void; // parent navigates to match-details after calling this
}

const categories = ["All", "Design", "Technology", "Languages", "Music", "Photography", "Health & Wellness", "Crafts"];
const skillFilters = ["UI/UX Design", "Python", "Spanish", "Piano", "Photography", "Machine Learning", "Data Science", "Yoga"];

export default function Search({ setSelectedUser }: SearchProps) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const toggleSkill = (s: string) => {
    setSelectedSkills((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);
  };

  const filtered = users.filter((u) => {
    const q = query.toLowerCase();
    const matchQuery = !q || u.name.toLowerCase().includes(q) || u.offeredSkills.some((s) => s.toLowerCase().includes(q)) || u.desiredSkills.some((s) => s.toLowerCase().includes(q));
    const matchSkills = selectedSkills.length === 0 || u.offeredSkills.some((s) => selectedSkills.includes(s));
    return matchQuery && matchSkills;
  });

  const FiltersPanel = () => (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-xs font-semibold mb-2" style={{ color: "#042C53" }}>Category</p>
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActiveCategory(c)}
              className="px-3 py-1.5 rounded-full text-xs font-medium border transition-colors"
              style={{
                background: activeCategory === c ? "#185FA5" : "#E6F1FB",
                color: activeCategory === c ? "#fff" : "#185FA5",
                borderColor: activeCategory === c ? "#185FA5" : "#B5D4F4",
              }}
            >
              {c}
            </button>
          ))}
        </div>
      </div>
      <div>
        <p className="text-xs font-semibold mb-2" style={{ color: "#042C53" }}>Skills offered</p>
        <div className="flex flex-wrap gap-2">
          {skillFilters.map((s) => (
            <button
              key={s}
              onClick={() => toggleSkill(s)}
              className="px-3 py-1.5 rounded-full text-xs font-medium border transition-colors"
              style={{
                background: selectedSkills.includes(s) ? "#042C53" : "#E6F1FB",
                color: selectedSkills.includes(s) ? "#fff" : "#185FA5",
                borderColor: selectedSkills.includes(s) ? "#042C53" : "#B5D4F4",
              }}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto px-5 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1" style={{ color: "#042C53" }}>Find your match</h1>
        <p className="text-sm" style={{ color: "#6B8FA8" }}>Search by skill, name, or topic</p>
      </div>

      {/* Search bar */}
      <div className="flex gap-3 mb-6">
        <div className="flex-1 relative">
          <svg className="absolute left-3.5 top-1/2 -translate-y-1/2" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#85B7EB" strokeWidth="2">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Search skills, people..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm border"
            style={{ borderColor: "#B5D4F4", color: "#042C53", background: "#fff" }}
          />
        </div>
        {/* Mobile filter toggle */}
        <button
          onClick={() => setFiltersOpen(!filtersOpen)}
          className="md:hidden px-4 py-2.5 rounded-xl text-sm font-medium border flex items-center gap-2"
          style={{ borderColor: "#B5D4F4", color: "#185FA5", background: "#fff" }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="4" y1="6" x2="20" y2="6" /><line x1="8" y1="12" x2="16" y2="12" /><line x1="12" y1="18" x2="12" y2="18" strokeLinecap="round" />
          </svg>
          Filters {selectedSkills.length > 0 && `(${selectedSkills.length})`}
        </button>
      </div>

      {/* Mobile bottom sheet filters */}
      {filtersOpen && (
        <div className="md:hidden fixed inset-0 z-40" onClick={() => setFiltersOpen(false)}>
          <div className="absolute inset-0" style={{ background: "rgba(4,44,83,0.3)" }} />
          <div
            className="absolute bottom-0 left-0 right-0 rounded-t-2xl p-5"
            style={{ background: "#fff" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-10 h-1 rounded-full mx-auto mb-5" style={{ background: "#B5D4F4" }} />
            <FiltersPanel />
            <button
              onClick={() => setFiltersOpen(false)}
              className="mt-5 w-full py-3 rounded-xl font-semibold text-sm text-white"
              style={{ background: "#185FA5" }}
            >
              Apply filters
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Desktop filters sidebar */}
        <aside className="hidden md:block">
          <div className="rounded-2xl p-5 border sticky top-6" style={{ background: "#fff", borderColor: "#B5D4F4" }}>
            <h2 className="text-sm font-semibold mb-4" style={{ color: "#042C53" }}>Filters</h2>
            <FiltersPanel />
          </div>
        </aside>

        {/* Results */}
        <div className="md:col-span-3">
          <p className="text-xs mb-4" style={{ color: "#6B8FA8" }}>{filtered.length} people found</p>
          <div className="flex flex-col gap-3">
            {filtered.map((u) => (
              <div key={u.id} className="rounded-2xl p-4 border flex flex-col sm:flex-row sm:items-start gap-4" style={{ background: "#fff", borderColor: "#B5D4F4" }}>
                <img src={u.avatar} alt={u.name} className="w-12 h-12 rounded-xl object-cover shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-sm" style={{ color: "#042C53" }}>{u.name}</p>
                      <p className="text-xs" style={{ color: "#6B8FA8" }}>📍 {u.location} · ★ {u.rating} · {u.completedSwaps} swaps</p>
                    </div>
                    <button
                      onClick={() => { setSelectedUser(u); navigate("/match-details"); }}
                      className="shrink-0 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-white"
                      style={{ background: "#185FA5" }}
                    >
                      View
                    </button>
                  </div>
                  <p className="text-xs mt-2 line-clamp-2" style={{ color: "#6B8FA8" }}>{u.bio}</p>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {u.offeredSkills.map((s) => (
                      <span key={s} className="px-2.5 py-1 rounded-full text-xs font-medium" style={{ background: "#E6F1FB", color: "#185FA5" }}>{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
            {filtered.length === 0 && (
              <div className="text-center py-16">
                <p className="text-4xl mb-3">🔍</p>
                <p className="font-medium" style={{ color: "#042C53" }}>No results found</p>
                <p className="text-sm mt-1" style={{ color: "#6B8FA8" }}>Try different keywords or filters</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
