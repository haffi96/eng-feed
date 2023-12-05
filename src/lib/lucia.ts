// src/lib/lucia.ts
import { lucia } from "lucia";
import { astro } from "lucia/middleware";
import { pg } from "@lucia-auth/adapter-postgresql";
import { pool } from "@/aws/backend/db/session";
import { github, google } from "@lucia-auth/oauth/providers";

// expect error (see next section)
export const auth = lucia({
    env: import.meta.env.ENV === "dev" ? "DEV" : "PROD",
    adapter: pg(pool, {
        user: "auth_user",
        session: "user_session",
        key: "user_key",
    }),
    middleware: astro(),
    getUserAttributes: (data) => {
        return {
            username: data.username,
            provider: data.provider,
        };
    }
});



export const githubAuth = github(auth, {
    clientId: import.meta.env.GITHUB_CLIENT_ID,
    clientSecret: import.meta.env.GITHUB_CLIENT_SECRET,
    scope: ["user"]
});

export type Auth = typeof auth;