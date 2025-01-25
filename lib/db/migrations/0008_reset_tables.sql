-- Drop existing tables
DROP TABLE IF EXISTS "PasswordResetToken";
DROP TABLE IF EXISTS "Vote";
DROP TABLE IF EXISTS "Message";
DROP TABLE IF EXISTS "Chat";
DROP TABLE IF EXISTS "Suggestion";
DROP TABLE IF EXISTS "Document";
DROP TABLE IF EXISTS "User";

-- Create User table
CREATE TABLE "User" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    "email" varchar(64) NOT NULL,
    "password" varchar(64) NOT NULL
);

-- Create Chat table
CREATE TABLE "Chat" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    "createdAt" timestamp NOT NULL,
    "title" text NOT NULL,
    "userId" uuid NOT NULL REFERENCES "User"("id"),
    "visibility" varchar NOT NULL DEFAULT 'private'
);

-- Create Message table
CREATE TABLE "Message" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    "chatId" uuid NOT NULL REFERENCES "Chat"("id"),
    "role" varchar NOT NULL,
    "content" json NOT NULL,
    "createdAt" timestamp NOT NULL
);

-- Create Vote table
CREATE TABLE "Vote" (
    "chatId" uuid NOT NULL REFERENCES "Chat"("id"),
    "messageId" uuid NOT NULL REFERENCES "Message"("id"),
    "isUpvoted" boolean NOT NULL,
    PRIMARY KEY ("chatId", "messageId")
);

-- Create Document table
CREATE TABLE "Document" (
    "id" uuid NOT NULL DEFAULT gen_random_uuid(),
    "createdAt" timestamp NOT NULL,
    "title" text NOT NULL,
    "content" text,
    "kind" varchar NOT NULL DEFAULT 'text',
    "userId" uuid NOT NULL REFERENCES "User"("id"),
    PRIMARY KEY ("id", "createdAt")
);

-- Create Suggestion table
CREATE TABLE "Suggestion" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    "documentId" uuid NOT NULL,
    "documentCreatedAt" timestamp NOT NULL,
    "originalText" text NOT NULL,
    "suggestedText" text NOT NULL,
    "description" text,
    "isResolved" boolean NOT NULL DEFAULT false,
    "userId" uuid NOT NULL REFERENCES "User"("id"),
    "createdAt" timestamp NOT NULL,
    FOREIGN KEY ("documentId", "documentCreatedAt") REFERENCES "Document"("id", "createdAt")
);

-- Create PasswordResetToken table
CREATE TABLE "PasswordResetToken" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    "token" varchar(64) NOT NULL,
    "userId" uuid NOT NULL REFERENCES "User"("id"),
    "expiresAt" timestamp NOT NULL,
    "createdAt" timestamp NOT NULL DEFAULT NOW()
); 