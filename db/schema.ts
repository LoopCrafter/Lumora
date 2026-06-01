import {
  integer,
  pgTable,
  timestamp,
  varchar,
  boolean,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  imageUrl: varchar().notNull(),
  credit: integer().default(3),
  createdAt: timestamp({ mode: "date" }).defaultNow().notNull(),
  lastVisitTime: timestamp({ mode: "date" }).defaultNow().notNull(),
  userId: varchar({ length: 255 }).notNull(),
});

export const avatars = pgTable("avatars", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  type: varchar({ length: 100 }).notNull(),
  src: varchar().notNull(),
  isCustom: boolean().default(true).notNull(),
  userId: varchar({ length: 255 }).notNull(),
  createdAt: timestamp({ mode: "date" }).defaultNow().notNull(),
});

export type Avatar = typeof avatars.$inferSelect;
export type NewAvatar = typeof avatars.$inferInsert;
