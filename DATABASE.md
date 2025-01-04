# Database Architecture

This document outlines our database architecture choices and the rationale behind them.

## Current Implementation: Raw SQL Queries

We're currently using raw SQL queries with the Neon PostgreSQL database for simplicity and quick development. This setup uses:

- **Neon**: Our PostgreSQL database provider
- **Vercel Postgres**: Client library for database connections
- **Raw SQL**: Direct database queries without an ORM

### Example Usage:
```typescript
import { sql } from '@vercel/postgres';

// Fetching chats
const { rows } = await sql`
  SELECT * FROM chats 
  WHERE user_id = ${userId}
  ORDER BY created_at DESC
`;

// Creating a new chat
await sql`
  INSERT INTO chats (id, title, user_id, created_at)
  VALUES (${id}, ${title}, ${userId}, NOW())
`;
```

### Current Schema
```sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(64) NOT NULL,
  password VARCHAR(64) NOT NULL
);

-- Chats table
CREATE TABLE chats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP NOT NULL,
  title TEXT NOT NULL,
  user_id UUID NOT NULL REFERENCES users(id),
  visibility VARCHAR(10) NOT NULL DEFAULT 'private'
);

-- Messages table
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chat_id UUID NOT NULL REFERENCES chats(id),
  role VARCHAR NOT NULL,
  content JSONB NOT NULL,
  created_at TIMESTAMP NOT NULL
);

-- Votes table
CREATE TABLE votes (
  chat_id UUID NOT NULL REFERENCES chats(id),
  message_id UUID NOT NULL REFERENCES messages(id),
  is_upvoted BOOLEAN NOT NULL,
  PRIMARY KEY (chat_id, message_id)
);
```

## Future Implementation: Drizzle ORM

As our application grows, we'll want to migrate to Drizzle ORM for better type safety and maintainability. Here's how that would look:

### Schema Definition
```typescript
// lib/db/schema.ts
import { pgTable, uuid, varchar, timestamp, text, jsonb, boolean } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email', { length: 64 }).notNull(),
  password: varchar('password', { length: 64 }).notNull(),
});

export const chats = pgTable('chats', {
  id: uuid('id').primaryKey().defaultRandom(),
  createdAt: timestamp('created_at').notNull(),
  title: text('title').notNull(),
  userId: uuid('user_id').notNull().references(() => users.id),
  visibility: varchar('visibility', { enum: ['public', 'private'] })
    .notNull()
    .default('private'),
});

export const messages = pgTable('messages', {
  id: uuid('id').primaryKey().defaultRandom(),
  chatId: uuid('chat_id').notNull().references(() => chats.id),
  role: varchar('role').notNull(),
  content: jsonb('content').notNull(),
  createdAt: timestamp('created_at').notNull(),
});

export const votes = pgTable('votes', {
  chatId: uuid('chat_id').notNull().references(() => chats.id),
  messageId: uuid('message_id').notNull().references(() => messages.id),
  isUpvoted: boolean('is_upvoted').notNull(),
}, (table) => ({
  pk: primaryKey({ columns: [table.chatId, table.messageId] }),
}));
```

### Database Client
```typescript
// lib/db/index.ts
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

const queryClient = postgres(process.env.POSTGRES_URL!, {
  ssl: 'require',
  max: 1,
});

export const db = drizzle(queryClient, { schema });
```

### Example Usage with Drizzle
```typescript
// Fetching chats
const chats = await db
  .select()
  .from(schema.chats)
  .where(eq(schema.chats.userId, userId))
  .orderBy(desc(schema.chats.createdAt));

// Creating a new chat
await db.insert(schema.chats).values({
  id: generateUUID(),
  title,
  userId,
  createdAt: new Date(),
});
```

## Migration Plan

When ready to migrate to Drizzle:

1. Install required dependencies:
   ```bash
   npm install drizzle-orm postgres
   npm install -D drizzle-kit
   ```

2. Set up Drizzle configuration:
   ```typescript
   // drizzle.config.ts
   export default defineConfig({
     schema: './lib/db/schema.ts',
     out: './lib/db/migrations',
     driver: 'pg',
     dbCredentials: {
       connectionString: process.env.POSTGRES_URL!,
     },
   });
   ```

3. Generate and run migrations:
   ```bash
   npm run db:generate
   npm run db:push
   ```

4. Update database queries throughout the application to use Drizzle's query builder instead of raw SQL.

## Why We'll Want to Switch

1. **Type Safety**: Catch errors at compile time rather than runtime
2. **Schema Management**: Automated migrations and schema versioning
3. **Maintainability**: Easier to refactor and maintain as the codebase grows
4. **Developer Experience**: Better IDE support with autocomplete
5. **Query Building**: Type-safe query builder for complex queries
6. **Security**: Built-in protection against SQL injection

The current raw SQL implementation serves our immediate needs, but as the application grows, Drizzle will help us maintain code quality and reduce potential bugs through its type system and schema management. 