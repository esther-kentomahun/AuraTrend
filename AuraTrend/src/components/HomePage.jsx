import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { hashtags } from "../data/mock";

function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="h-8 w-8 rounded-full bg-burgundy-500 flex items-center justify-center">
        <span className="font-serif text-cream-50 text-lg italic">A</span>
      </div>
      <span className="font-serif text-xl tracking-tight text-ink-900">
        AuraTrend
      </span>
    </div>
  );
}

export default function HomePage() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    navigate(`/results${query ? `?q=${encodeURIComponent(query)}` : ""}`);
  };

  return (
    <div className="min-h-screen grain">
      <header className="px-6 sm:px-10 lg:px-16 pt-8">
        <Logo />
      </header>

      <main className="px-6 sm:px-10 lg:px-16 pt-20 sm:pt-28 max-w-5xl mx-auto">
        <p className="text-burgundy-500 text-xs tracking-[0.3em] uppercase mb-6">
          Fashion trend intelligence
        </p>
        <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl leading-[0.95] text-ink-900 text-balance">
          What the world is
          <span className="block italic text-burgundy-500">wearing next.</span>
        </h1>
        <p className="mt-8 text-base sm:text-lg text-sand-600 max-w-xl leading-relaxed">
          Track emerging aesthetics, creators, and hashtags shaping fashion
          right now — before they hit the mainstream.
        </p>

        <form onSubmit={submit} className="mt-12 max-w-2xl">
          <div className="group flex items-center gap-3 bg-cream-50 border border-cream-300 rounded-full pl-6 pr-2 py-2 shadow-soft focus-within:border-burgundy-400 transition-colors">
            <svg
              className="h-5 w-5 text-sand-500 shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m21 21-4.3-4.3" strokeLinecap="round" />
            </svg>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search a style, creator, or hashtag…"
              className="flex-1 bg-transparent outline-none text-ink-900 placeholder:text-sand-500 text-sm sm:text-base py-2"
            />
            <button
              type="submit"
              className="bg-burgundy-500 hover:bg-burgundy-600 text-cream-50 text-sm font-medium px-5 sm:px-6 py-2.5 rounded-full transition-colors"
            >
              Search
            </button>
          </div>
        </form>

        <div className="mt-10">
          <p className="text-xs uppercase tracking-[0.2em] text-sand-500 mb-4">
            Trending now
          </p>
          <div className="flex flex-wrap gap-2">
            {hashtags.slice(0, 6).map((h) => (
              <button
                key={h.id}
                onClick={() => navigate(`/results?q=${encodeURIComponent(h.tag)}`)}
                className="px-4 py-2 rounded-full bg-cream-200 hover:bg-cream-300 text-ink-700 text-sm border border-cream-300 transition-colors"
              >
                {h.tag}
                <span className="ml-2 text-burgundy-500 font-medium">
                  +{h.delta}%
                </span>
              </button>
            ))}
          </div>
        </div>
      </main>

      <footer className="px-6 sm:px-10 lg:px-16 mt-32 pb-10">
        <div className="border-t border-cream-300 pt-6 flex flex-wrap justify-between gap-4 text-xs text-sand-500">
          <span>AuraTrend · FW25 cycle</span>
          <span>Mock build — for design review</span>
        </div>
      </footer>
    </div>
  );
}
