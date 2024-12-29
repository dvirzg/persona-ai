import { relations } from 'drizzle-orm';
import { 
  json,
  pgTable, 
  text, 
  timestamp,
  integer,
  uuid,
  boolean
} from 'drizzle-orm/pg-core';
import { user } from '../schema';

export const userProfiles = pgTable('user_profiles', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => user.id),
  name: text('name'),
  age: integer('age'),
  location: text('location'),
  language: text('language'),
  occupation: text('occupation'),
  background: text('background'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const userInterests = pgTable('user_interests', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => user.id),
  interest: text('interest').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const userGoals = pgTable('user_goals', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => user.id),
  goal: text('goal').notNull(),
  completed: boolean('completed').default(false),
  createdAt: timestamp('created_at').defaultNow(),
});

export const personalityTraits = pgTable('personality_traits', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => user.id),
  trait: text('trait').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const socialConnections = pgTable('social_connections', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => user.id),
  name: text('name').notNull(),
  relationship: text('relationship').notNull(),
  details: json('details').$type<{
    notes?: string;
    interests?: string[];
    birthday?: string;
  }>(),
  createdAt: timestamp('created_at').defaultNow(),
});

// Relations
export const userProfilesRelations = relations(userProfiles, ({ many }) => ({
  interests: many(userInterests),
  goals: many(userGoals),
  traits: many(personalityTraits),
  connections: many(socialConnections),
})); 