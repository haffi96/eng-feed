import type { Config } from "drizzle-kit"
import { config as dotEndConfig } from "dotenv"

dotEndConfig()

export default {
    schema: "./src/aws/backend/db/schema.ts",
    out: "./src/aws/backend/db/migrations",
    driver: "pg",
    dbCredentials: {
        connectionString: process.env.DATABASE_URL as string,
    },
    schemaFilter: ["public"],
} satisfies Config
