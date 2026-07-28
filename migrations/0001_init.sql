CREATE TABLE reviews (
  id TEXT PRIMARY KEY,
  source TEXT NOT NULL,
  rating INTEGER NOT NULL,
  text TEXT NOT NULL,
  author_name TEXT NOT NULL,
  author_photo TEXT,
  author_profile_uri TEXT,
  relative_time TEXT,
  published_at INTEGER,
  google_maps_uri TEXT NOT NULL,
  updated_at INTEGER NOT NULL
);
CREATE INDEX idx_reviews_published_at ON reviews (published_at DESC);

CREATE TABLE place_stats (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  rating REAL NOT NULL,
  user_rating_count INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);
