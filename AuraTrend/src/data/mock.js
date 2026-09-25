const img = (tags, lock, w = 800, h = 1000) =>
  `https://loremflickr.com/${w}/${h}/${tags}?lock=${lock}`;

const avatar = (lock) => img("portrait,face", lock, 200, 200);

export const posts = [
  {
    id: "p1",
    image: img("camel,coat,fashion", 11),
    caption: "Quiet luxury in camel and cream — the fall uniform.",
    creator: { name: "Mara Vance", handle: "@maravance" },
    likes: 18420,
    trendScore: 92,
    hashtags: ["#quietluxury", "#camelcoat", "#fallstyle"],
    postedAt: "2h ago",
  },
  {
    id: "p2",
    image: img("burgundy", 42),
    caption: "Burgundy is the new black. Street style, Paris week.",
    creator: { name: "Idris Okafor", handle: "@idrisok" },
    likes: 24190,
    trendScore: 97,
    hashtags: ["#burgundy", "#streetstyle", "#parisfw"],
    postedAt: "5h ago",
  },
  {
    id: "p3",
    image: img("blazer,tailoring", 13),
    caption: "Archival tailoring, reworked. The blazer is back.",
    creator: { name: "Sora Lindqvist", handle: "@soralin" },
    likes: 12760,
    trendScore: 84,
    hashtags: ["#tailoring", "#archival", "#blazer"],
    postedAt: "8h ago",
  },
  {
    id: "p4",
    image: img("fur,coat,outerwear", 14),
    caption: "Coats, fur, gold. The mob-wife aesthetic peaks.",
    creator: { name: "Carmen DiLucca", handle: "@carmend" },
    likes: 31250,
    trendScore: 99,
    hashtags: ["#mobwife", "#outerwear", "#goldaccents"],
    postedAt: "11h ago",
  },
  {
    id: "p5",
    image: img("cream,fashion", 15),
    caption: "Beige on beige. Less, but better.",
    creator: { name: "Yuki Hamada", handle: "@yukihama" },
    likes: 9870,
    trendScore: 78,
    hashtags: ["#minimalism", "#beige", "#capsule"],
    postedAt: "1d ago",
  },
  {
    id: "p6",
    image: img("leather,trench,coat", 16),
    caption: "Leather trenches are having a moment.",
    creator: { name: "Noor Abadi", handle: "@noorabadi" },
    likes: 15340,
    trendScore: 88,
    hashtags: ["#leather", "#trenchcoat", "#outerwear"],
    postedAt: "1d ago",
  },
  {
    id: "p7",
    image: img("bridal,lace", 17),
    caption: "White wedding dress with hand-embroidered lace. The bridal moment of the season.",
    creator: { name: "Elara Bride", handle: "@elarabride" },
    likes: 42800,
    trendScore: 95,
    hashtags: ["#weddingdress", "#bridal", "#lace", "#white"],
    postedAt: "3h ago",
  },
  {
    id: "p8",
    image: img("wedding,dress,satin", 18),
    caption: "Minimal satin wedding dress — the quiet-luxury bridal uniform.",
    creator: { name: "Vows & Veils", handle: "@vowsveils" },
    likes: 38120,
    trendScore: 93,
    hashtags: ["#weddingdress", "#satin", "#bridal", "#minimal"],
    postedAt: "6h ago",
  },
  {
    id: "p9",
    image: img("vintage,wedding,dress", 19),
    caption: "Vintage-inspired wedding dress, reworked for the modern bride.",
    creator: { name: "Elara Bride", handle: "@elarabride" },
    likes: 27640,
    trendScore: 89,
    hashtags: ["#weddingdress", "#vintage", "#bridal"],
    postedAt: "9h ago",
  },
  {
    id: "p10",
    image: img("wedding,dress,silk", 20),
    caption: "Sheer sleeves, silk gown. The white wedding dress evolves.",
    creator: { name: "Vows & Veils", handle: "@vowsveils" },
    likes: 31900,
    trendScore: 91,
    hashtags: ["#bridal", "#silk", "#weddingdress", "#white"],
    postedAt: "12h ago",
  },
];

export const popularStyles = [
  { id: "s1", name: "Quiet Luxury", growth: 34, image: img("luxury,fashion", 21, 600, 600) },
  { id: "s2", name: "Mob Wife Aesthetic", growth: 58, image: img("fur,coat,style", 22, 600, 600) },
  { id: "s3", name: "Archival Tailoring", growth: 21, image: img("tailoring,blazer", 23, 600, 600) },
  { id: "s4", name: "Coastal Grandma", growth: 12, image: img("coastal,style,lifestyle", 24, 600, 600) },
  { id: "s5", name: "Burgundy Revival", growth: 47, image: img("burgundy", 25, 600, 600) },
  { id: "s6", name: "Structured Minimalism", growth: 18, image: img("minimal,fashion", 26, 600, 600) },
  { id: "s7", name: "Bridal Minimalism", growth: 41, image: img("bridal,minimal", 27, 600, 600) },
  { id: "s8", name: "Vintage Wedding", growth: 27, image: img("vintage,wedding,dress", 28, 600, 600) },
];

export const creators = [
  { id: "c1", name: "Mara Vance", handle: "@maravance", avatar: avatar(31), followers: 248000, posts: 412, trendScore: 91 },
  { id: "c2", name: "Idris Okafor", handle: "@idrisok", avatar: avatar(32), followers: 412000, posts: 738, trendScore: 96 },
  { id: "c3", name: "Carmen DiLucca", handle: "@carmend", avatar: avatar(33), followers: 588000, posts: 1024, trendScore: 99 },
  { id: "c4", name: "Sora Lindqvist", handle: "@soralin", avatar: avatar(34), followers: 134000, posts: 286, trendScore: 83 },
  { id: "c5", name: "Yuki Hamada", handle: "@yukihama", avatar: avatar(35), followers: 96000, posts: 198, trendScore: 76 },
  { id: "c6", name: "Noor Abadi", handle: "@noorabadi", avatar: avatar(36), followers: 221000, posts: 511, trendScore: 88 },
  { id: "c7", name: "Elara Bride", handle: "@elarabride", avatar: avatar(37), followers: 342000, posts: 689, trendScore: 94 },
  { id: "c8", name: "Vows & Veils", handle: "@vowsveils", avatar: avatar(38), followers: 218000, posts: 412, trendScore: 90 },
];

export const hashtags = [
  { id: "h1", tag: "#burgundy", posts: 482000, delta: 47 },
  { id: "h2", tag: "#quietluxury", posts: 1240000, delta: 34 },
  { id: "h3", tag: "#mobwife", posts: 318000, delta: 58 },
  { id: "h4", tag: "#tailoring", posts: 214000, delta: 21 },
  { id: "h5", tag: "#camelcoat", posts: 96000, delta: 15 },
  { id: "h6", tag: "#leather", posts: 742000, delta: 28 },
  { id: "h7", tag: "#archival", posts: 58000, delta: 19 },
  { id: "h8", tag: "#capsule", posts: 411000, delta: 11 },
  { id: "h9", tag: "#weddingdress", posts: 820000, delta: 52 },
  { id: "h10", tag: "#bridal", posts: 1240000, delta: 38 },
  { id: "h11", tag: "#lace", posts: 412000, delta: 14 },
  { id: "h12", tag: "#satin", posts: 318000, delta: 22 },
];

export const formatCount = (n) => {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return `${n}`;
};

export const getPostById = (id) => posts.find((p) => p.id === id);

export const tokenize = (q) =>
  q
    .toLowerCase()
    .split(/\s+/)
    .map((t) => t.replace(/^#/, "").trim())
    .filter(Boolean);

export const matchesQuery = (haystack, q) => {
  if (!q) return true;
  const tokens = tokenize(q);
  if (tokens.length === 0) return true;
  const hay = haystack.toLowerCase();
  return tokens.some((t) => hay.includes(t));
};
