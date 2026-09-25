import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function formatCount(number) {
  if (number >= 1000000) {
    return `${(number / 1000000).toFixed(1)}M`;
  }

  if (number >= 1000) {
    return `${(number / 1000).toFixed(1)}K`;
  }

  return number;
}

function TrendGauge({ score }) {
  const pct = Math.min(100, Math.max(0, score));

  return (
    <div className="flex items-center gap-3">
      <div className="relative h-20 w-20">
        <svg
          className="h-20 w-20 -rotate-90"
          viewBox="0 0 80 80"
        >
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
          <span className="font-serif text-xl text-burgundy-500">
            {score}
          </span>
        </div>
      </div>

      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-sand-500">
          Trend score
        </p>

        <p className="text-sm text-ink-900 font-medium">
          {pct >= 90
            ? "Peak virality"
            : pct >= 80
            ? "Rising fast"
            : "Steady"}
        </p>
      </div>
    </div>
  );
}

export default function DetailPage() {
  const { id } = useParams();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `https://auratrend.onrender.com/api/trends/${id}`
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.message || "Failed to fetch post");
        }

        setPost(data.data);
      } catch (error) {
        console.error("Detail error:", error);
        setError("Unable to load this fashion trend.");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-sand-600">
          Loading fashion trend...
        </p>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="font-serif text-2xl text-ink-900">
          {error || "Post not found"}
        </p>

        <Link
          to="/results"
          className="text-burgundy-500 text-sm hover:underline"
        >
          ← Back to results
        </Link>
      </div>
    );
  }

  const trendScore = post.engagement_score || 0;

  const hashtags = post.hashtag
    ? [`#${post.hashtag}`]
    : [];

  return (
    <div className="min-h-screen">

      {/* Header */}
      <header className="sticky top-0 z-20 bg-cream-100/85 backdrop-blur-md border-b border-cream-300">
        <div className="px-6 sm:px-10 lg:px-16 h-16 flex items-center justify-between">

          <Link
            to="/results"
            className="flex items-center gap-2 text-sm text-sand-600 hover:text-burgundy-500"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                d="m15 18-6-6 6-6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            Back to results
          </Link>

          <Link
            to="/"
            className="flex items-center gap-2"
          >
            <div className="h-7 w-7 rounded-full bg-burgundy-500 flex items-center justify-center">
              <span className="font-serif text-cream-50 text-sm italic">
                A
              </span>
            </div>
          </Link>

        </div>
      </header>

      {/* Main */}
      <main className="px-6 sm:px-10 lg:px-16 pt-10 max-w-6xl mx-auto pb-24">

        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-8 lg:gap-12">

          {/* Image */}
          <div className="rounded-3xl overflow-hidden bg-cream-200 shadow-card">
            <img
              src={post.image_url}
              alt={post.caption}
              className="w-full h-full object-cover aspect-[4/5]"
            />
          </div>

          {/* Information */}
          <div className="flex flex-col">

            <p className="text-burgundy-500 text-xs tracking-[0.3em] uppercase mb-3">
              #{post.hashtag} · trend #{trendScore}
            </p>

            <h1 className="font-serif text-3xl sm:text-4xl leading-tight text-ink-900">
              {post.caption}
            </h1>

            {/* Creator */}
            <div className="mt-8 flex items-center gap-4 p-4 bg-cream-50 border border-cream-200 rounded-2xl">

              <div className="h-12 w-12 rounded-full bg-burgundy-500 flex items-center justify-center font-serif text-cream-50 text-lg">
                {post.creator_handle?.charAt(0)?.toUpperCase()}
              </div>

              <div className="flex-1">
                <p className="text-sm font-medium text-ink-900">
                  {post.creator_handle}
                </p>

                <p className="text-xs text-sand-600">
                  Instagram creator
                </p>
              </div>

              <a
                href={post.source_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-medium px-4 py-2 rounded-full bg-burgundy-500 text-cream-50 hover:bg-burgundy-600 transition-colors"
              >
                View post
              </a>

            </div>

            {/* Stats */}
            <div className="mt-6 flex items-center gap-6">

              <TrendGauge score={trendScore} />

              <div className="h-12 w-px bg-cream-300" />

              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-sand-500">
                  Engagement
                </p>

                <p className="font-serif text-2xl text-ink-900">
                  {formatCount(post.likes)}
                </p>

                <p className="text-xs text-sand-500">
                  likes
                </p>
              </div>

            </div>

            {/* Comments */}
            <div className="mt-6">
              <p className="text-xs uppercase tracking-[0.2em] text-sand-500">
                Comments
              </p>

              <p className="font-serif text-2xl text-ink-900">
                {formatCount(post.comments)}
              </p>
            </div>

            {/* Hashtag */}
            <div className="mt-8">

              <p className="text-xs uppercase tracking-[0.2em] text-sand-500 mb-3">
                Hashtags
              </p>

              <div className="flex flex-wrap gap-2">

                {hashtags.map((tag) => (
                  <Link
                    key={tag}
                    to={`/results?q=${encodeURIComponent(tag.replace("#", ""))}`}
                    className="px-3 py-1.5 rounded-full bg-cream-200 hover:bg-cream-300 text-ink-700 text-xs border border-cream-300 transition-colors"
                  >
                    {tag}
                  </Link>
                ))}

              </div>

            </div>

          </div>

        </div>

      </main>
    </div>
  );
}