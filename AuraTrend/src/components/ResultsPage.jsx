import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  creators,
  formatCount,
  hashtags,
  matchesQuery,
  posts,
  popularStyles,
} from "../data/mock";

const TABS = [
  { id: "posts", label: "Posts" },
  { id: "styles", label: "Popular Styles" },
  { id: "creators", label: "Creators" },
  { id: "hashtags", label: "Hashtags" },
];

function TopBar({ query }) {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState(query);

  useEffect(() => {
    setSearchValue(query);
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();

    const trimmedQuery = searchValue.trim();

    if (!trimmedQuery) {
      navigate("/results");
      return;
    }

    navigate(`/results?q=${encodeURIComponent(trimmedQuery)}`);
  };

  const clearSearch = () => {
    setSearchValue("");
    navigate("/results");
  };

  return (
    <header className="sticky top-0 z-20 bg-cream-100/85 backdrop-blur-md border-b border-cream-300">
      <div className="px-6 sm:px-10 lg:px-16 h-16 flex items-center gap-6">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="h-7 w-7 rounded-full bg-burgundy-500 flex items-center justify-center">
            <span className="font-serif text-cream-50 text-sm italic">
              A
            </span>
          </div>

          <span className="font-serif text-lg text-ink-900 hidden sm:block">
            AuraTrend
          </span>
        </Link>

        <form
          onSubmit={handleSearch}
          className="flex-1 max-w-2xl"
        >
          <div className="flex items-center gap-2 bg-cream-50 border border-cream-300 rounded-full px-4 py-2 focus-within:border-burgundy-400 transition-colors">
            <svg
              className="h-4 w-4 text-sand-500 shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="7" />
              <path
                d="m21 21-4.3-4.3"
                strokeLinecap="round"
              />
            </svg>

            <input
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search styles, creators, hashtags…"
              className="flex-1 bg-transparent outline-none text-sm text-ink-900 placeholder:text-sand-500"
            />

            {searchValue && (
              <button
                type="button"
                onClick={clearSearch}
                className="text-sand-500 hover:text-ink-900 text-xs"
              >
                Clear
              </button>
            )}
          </div>
        </form>

        <button
          onClick={() => navigate("/")}
          className="text-sm text-sand-600 hover:text-burgundy-500 hidden sm:block"
        >
          Home
        </button>
      </div>
    </header>
  );
}

function PostCard({ post }) {
  return (
    <Link
      to={`/detail/${post.id}`}
      className="group block bg-cream-50 rounded-2xl overflow-hidden border border-cream-200 shadow-soft hover:shadow-card transition-shadow"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-cream-200">
        <img
          src={post.image}
          alt={post.caption}
          loading="lazy"
          className="h-full w-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 bg-cream-50/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-medium text-burgundy-600">
          {post.trendScore} trend
        </div>
      </div>
      <div className="p-4">
        <p className="text-sm text-ink-900 leading-snug line-clamp-2">
          {post.caption}
        </p>
        <div className="mt-3 flex items-center justify-between text-xs text-sand-600">
          <span>{post.creator.name}</span>
          <span>{formatCount(post.likes)} likes</span>
        </div>
      </div>
    </Link>
  );
}

function PostsSection({ results, loading, error }) {
  if (loading) {
    return <Empty label="Finding fashion trends..." />;
  }

  if (error) {
    return <Empty label={error} />;
  }

  if (results.length === 0) {
    return <Empty label="No fashion trends found." />;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
      {results.map((post) => (
     <PostCard
  key={post.id}
  post={{
    ...post,
  image: post.imageUrl || post.image_url,
trendScore: post.engagementScore || post.engagement_score,
creator: {
  name: post.creatorHandle || post.creator_handle,
  handle: post.creatorHandle || post.creator_handle,

    },
  }}
/>
      ))}
    </div>
  );
}

function StylesSection({ query }) {
  const filtered = useMemo(() => {
    if (!query) return popularStyles;
    return popularStyles.filter((s) => matchesQuery(s.name, query));
  }, [query]);

  if (filtered.length === 0) return <Empty label="No styles match." />;
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
      {filtered.map((s) => (
        <div
          key={s.id}
          className="group relative rounded-2xl overflow-hidden aspect-square bg-cream-200 shadow-soft"
        >
          <img
            src={s.image}
            alt={s.name}
            loading="lazy"
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-900/80 via-ink-900/10 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-3">
            <p className="text-cream-50 text-sm font-medium leading-tight">
              {s.name}
            </p>
            <p className="text-gold-400 text-xs font-medium">+{s.growth}%</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function CreatorsSection({ query }) {
  const filtered = useMemo(() => {
    if (!query) return creators;
    return creators.filter((c) => matchesQuery(`${c.name} ${c.handle}`, query));
  }, [query]);

  if (filtered.length === 0) return <Empty label="No creators match." />;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {filtered.map((c) => (
        <div
          key={c.id}
          className="flex items-center gap-4 bg-cream-50 border border-cream-200 rounded-2xl p-4 shadow-soft"
        >
          <img
            src={c.avatar}
            alt={c.name}
            loading="lazy"
            className="h-14 w-14 rounded-full object-cover border-2 border-cream-300"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-ink-900 truncate">
              {c.name}
            </p>
            <p className="text-xs text-sand-600 truncate">{c.handle}</p>
            <p className="text-xs text-sand-500 mt-1">
              {formatCount(c.followers)} followers · {formatCount(c.posts)}{" "}
              posts
            </p>
          </div>
          <div className="text-right shrink-0">
            <p className="text-xs uppercase tracking-wider text-sand-500">
              Trend
            </p>
            <p className="font-serif text-2xl text-burgundy-500">
              {c.trendScore}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

function HashtagsSection({ query }) {
  const filtered = useMemo(() => {
    if (!query) return hashtags;
    return hashtags.filter((h) => matchesQuery(h.tag, query));
  }, [query]);

  if (filtered.length === 0) return <Empty label="No hashtags match." />;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {filtered.map((h) => (
        <div
          key={h.id}
          className="flex items-center justify-between bg-cream-50 border border-cream-200 rounded-2xl px-5 py-4 shadow-soft hover:border-burgundy-300 transition-colors"
        >
          <div>
            <p className="font-serif text-lg text-ink-900">{h.tag}</p>
            <p className="text-xs text-sand-500 mt-0.5">
              {formatCount(h.posts)} posts
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-burgundy-500">
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path
                d="m6 15 6-6 6 6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-sm font-medium">+{h.delta}%</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function Empty({ label }) {
  return <div className="py-20 text-center text-sand-500 text-sm">{label}</div>;
}


 export default function ResultsPage() {
  const [params] = useSearchParams();
  const [tab, setTab] = useState("posts");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const query = params.get("q") || "";

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const fetchResults = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `https://auratrend.onrender.com/api/search?q=${encodeURIComponent(
            query.trim()
          )}`
        );

        const data = await response.json();

        console.log("API response:", data);

        if (!response.ok || !data.success) {
          throw new Error(data.message || "Failed to fetch results");
        }

        setResults(data.data || []);
      } catch (error) {
        console.error("Search error:", error);
        setResults([]);
        setError("Unable to fetch fashion trends.");
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <div className="min-h-screen">
      <TopBar query={query} />

      <div className="px-6 sm:px-10 lg:px-16 pt-8 max-w-7xl mx-auto">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-6">
          <div>
            <p className="text-burgundy-500 text-xs tracking-[0.3em] uppercase mb-2">
              Results
            </p>

            <h1 className="font-serif text-3xl sm:text-4xl text-ink-900">
              {query ? (
                <>
                  Trends for{" "}
                  <span className="italic text-burgundy-500">
                    “{query}”
                  </span>
                </>
              ) : (
                "What's rising this cycle"
              )}
            </h1>
          </div>
        </div>

        <nav className="sticky top-16 z-10 bg-cream-100/85 backdrop-blur-md -mx-2 px-2 flex gap-1 border-b border-cream-200 mb-8 overflow-x-auto">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`relative px-4 py-3 text-sm whitespace-nowrap transition-colors ${
                tab === t.id
                  ? "text-burgundy-600 font-medium"
                  : "text-sand-600 hover:text-ink-900"
              }`}
            >
              {t.label}

              {tab === t.id && (
                <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-burgundy-500 rounded-full" />
              )}
            </button>
          ))}
        </nav>

        <section className="pb-24">
          {tab === "posts" && (
            <PostsSection
              results={results}
              loading={loading}
              error={error}
            />
          )}

          {tab === "styles" && <StylesSection query={query} />}

          {tab === "creators" && <CreatorsSection query={query} />}

          {tab === "hashtags" && <HashtagsSection query={query} />}
        </section>
      </div>
    </div>
  );
}


