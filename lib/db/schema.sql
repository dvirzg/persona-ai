-- Users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(64) NOT NULL,
  password VARCHAR(64) NOT NULL
);

-- Chats table
CREATE TABLE IF NOT EXISTS chats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "createdAt" TIMESTAMP NOT NULL,
  title TEXT NOT NULL,
  "userId" UUID NOT NULL REFERENCES users(id),
  visibility VARCHAR(10) NOT NULL DEFAULT 'private'
);

-- Messages table
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "chatId" UUID NOT NULL REFERENCES chats(id),
  role VARCHAR NOT NULL,
  content JSONB NOT NULL,
  "createdAt" TIMESTAMP NOT NULL
);

-- Votes table
CREATE TABLE IF NOT EXISTS votes (
  "chatId" UUID NOT NULL REFERENCES chats(id),
  "messageId" UUID NOT NULL REFERENCES messages(id),
  "isUpvoted" BOOLEAN NOT NULL,
  PRIMARY KEY ("chatId", "messageId")
); 