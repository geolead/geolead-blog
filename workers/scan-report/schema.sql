-- GL-238: rejestr skanów Skanera gotowości AI (Cloudflare D1, baza geolead-scans)
CREATE TABLE IF NOT EXISTS scans (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  url TEXT NOT NULL,
  scanned_at TEXT NOT NULL,
  status TEXT NOT NULL,
  score REAL
);
CREATE INDEX IF NOT EXISTS idx_scans_scanned_at ON scans (scanned_at);
