import { migrate } from "drizzle-orm/node-postgres/migrator"
import { db } from "./session"

// this will automatically run needed migrations on the database
migrate(db, { migrationsFolder: "./src/aws/backend/db/migrations" })
    .then(() => {
        console.log("Migrations complete!")
        process.exit(0)
    })
    .catch((err) => {
        console.error("Migrations failed!", err)
        process.exit(1)
    })