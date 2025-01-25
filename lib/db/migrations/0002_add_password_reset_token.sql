CREATE TABLE IF NOT EXISTS "PasswordResetToken" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "token" varchar(64) NOT NULL,
  "userId" uuid NOT NULL REFERENCES "User"(id),
  "expiresAt" timestamp NOT NULL,
  "createdAt" timestamp NOT NULL DEFAULT NOW()
); 