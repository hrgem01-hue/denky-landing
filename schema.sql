-- Cloudflare D1 스키마 — 랜딩 사전등록 이메일 테이블.
-- 적용:  wrangler d1 execute ibeobwa-waitlist --remote --file=schema.sql
CREATE TABLE IF NOT EXISTS waitlist (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  email      TEXT NOT NULL UNIQUE,   -- 중복 등록 방지
  source     TEXT,                   -- 유입 경로(landing 등)
  created_at TEXT NOT NULL           -- ISO 시각
);
