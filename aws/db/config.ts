import type { Config } from "drizzle-kit";
import dotenv from "dotenv";

dotenv.config();
 
export default {
  schema: "./schema.ts",
  out: "./migrations",
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL as string,
  }
} satisfies Config;
