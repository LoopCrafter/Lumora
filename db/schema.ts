import { integer, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

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
