// db.ts
import { drizzle } from "drizzle-orm/node-postgres"
import pg from "pg"
import { config as dotEndConfig } from "dotenv"

dotEndConfig()

const db_url =
  process.env.ENV === "local"
    ? process.env.DEV_DATABASE_URL
    : process.env.DATABASE_URL

export const pool = new pg.Pool({
  connectionString: db_url,
  ssl: process.env.ENV === "local" ? false : { rejectUnauthorized: false },
})

export const db = drizzle(pool)

export default db
