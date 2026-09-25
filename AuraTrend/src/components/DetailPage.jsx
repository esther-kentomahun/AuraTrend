import { Link, useParams } from "react-router-dom";
import { formatCount, getPostById, posts } from "../data/mock";

function TrendGauge({ score }) {
  const pct = Math.min(100, Math.max(0, score));
  return (
    <div className="flex items-center gap-3">
      <div className="relative h-20 w-20">
        <svg className="h-20 w-20 -rotate-90" viewBox="0 0 80 80">
          <circle
            cx="40"
            cy="40"
            r="34"
            fill="none"
            stroke="var(--color-cream-300)"
            strokeWidth="6"
          />
          <circle
            cx="40"
            cy="40"
            r="34"
            fill="none"
            stroke="var(--color-burgundy-500)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={`${(pct / 100) * 213.6} 213.6`}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-serif text-xl text-burgundy-500">{score}</span>
        </div>
      </div>
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-sand-500">
          Trend score
        </p>
        <p className="text-sm text-ink-900 font-medium">
          {pct >= 90 ? "Peak virality" : pct >= 80 ? "Rising fast" : "Steady"}
        </p>
      </div>
    </div>
  );
}

export default function DetailPage() {
  const { id } = useParams();
  const post = getPostById(id);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="font-serif text-2xl text-ink-900">Post not found</p>
        <Link to="/results" className="text-burgundy-500 text-sm hover:underline">
          ← Back to results
        </Link>
      </div>
    );
  }

  const related = posts.filter((p) => p.id !== post.id).slice(0, 4);

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-20 bg-cream-100/85 backdrop-blur-md border-b border-cream-300">
        <div className="px-6 sm:px-10 lg:px-16 h-16 flex items-center justify-between">
          <Link to="/results" className="flex items-center gap-2 text-sm text-sand-600 hover:text-burgundy-500">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="m15 18-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back to results
          </Link>
          <Link to="/" className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-full bg-burgundy-500 flex items-center justify-center">
              <span className="font-serif text-cream-50 text-sm italic">A</span>
            </div>
          </Link>
        </div>
      </header>

      <main className="px-6 sm:px-10 lg:px-16 pt-10 max-w-6xl mx-auto pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-8 lg:gap-12">
          <div className="rounded-3xl overflow-hidden bg-cream-200 shadow-card">
            <img
              src={post.image}
              alt={post.caption}
              className="w-full h-full object-cover aspect-[4/5]"
            />
          </div>

          <div className="flex flex-col">
            <p className="text-burgundy-500 text-xs tracking-[0.3em] uppercase mb-3">
              {post.postedAt} · trend #{post.trendScore}
            </p>
            <h1 className="font-serif text-3xl sm:text-4xl leading-tight text-ink-900 text-balance">
              {post.caption}
            </h1>

            <div className="mt-8 flex items-center gap-4 p-4 bg-cream-50 border border-cream-200 rounded-2xl">
              <div className="h-12 w-12 rounded-full bg-burgundy-500 flex items-center justify-center font-serif text-cream-50 text-lg">
                {post.creator.name.charAt(0)}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-ink-900">
                  {post.creator.name}
                </p>
                <p className="text-xs text-sand-600">{post.creator.handle}</p>
              </div>
              <button className="text-xs font-medium px-4 py-2 rounded-full bg-burgundy-500 text-cream-50 hover:bg-burgundy-600 transition-colors">
                Follow
              </button>
            </div>

            <div className="mt-6 flex items-center gap-6">
              <TrendGauge score={post.trendScore} />
              <div className="h-12 w-px bg-cream-300" />
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-sand-500">
                  Engagement
                </p>
                <p className="font-serif text-2xl text-ink-900">
                  {formatCount(post.likes)}
                </p>
                <p className="text-xs text-sand-500">likes</p>
              </div>
            </div>

            <div className="mt-8">
              <p className="text-xs uppercase tracking-[0.2em] text-sand-500 mb-3">
                Hashtags
              </p>
              <div className="flex flex-wrap gap-2">
                {post.hashtags.map((tag) => (
                  <Link
                    key={tag}
                    to={`/results?q=${encodeURIComponent(tag)}`}
                    className="px-3 py-1.5 rounded-full bg-cream-200 hover:bg-cream-300 text-ink-700 text-xs border border-cream-300 transition-colors"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <section className="mt-20">
          <div className="flex items-baseline justify-between mb-6">
            <h2 className="font-serif text-2xl text-ink-900">Related trends</h2>
            <Link to="/results" className="text-sm text-burgundy-500 hover:underline">
              View all
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {related.map((p) => (
              <Link
                key={p.id}
                to={`/detail/${p.id}`}
                className="group block rounded-2xl overflow-hidden bg-cream-50 border border-cream-200 shadow-soft hover:shadow-card transition-shadow"
              >
                <div className="aspect-square overflow-hidden bg-cream-200">
                  <img
                    src={p.image}
                    alt={p.caption}
                    loading="lazy"
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <p className="p-3 text-xs text-ink-900 line-clamp-2">
                  {p.caption}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
