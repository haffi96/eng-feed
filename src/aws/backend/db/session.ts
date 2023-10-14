// db.ts
import { drizzle } from "drizzle-orm/node-postgres"
import pg from "pg"
import { config as dotEndConfig } from "dotenv"

dotEndConfig()

const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.ENV === "local" ? false : { rejectUnauthorized: false },
})

export const db = drizzle(pool)

export default db