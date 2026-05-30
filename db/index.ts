import { drizzle } from "drizzle-orm/neon-http";

export function getDb() {
  return drizzle(process.env.DATABASE_URL!);
}
