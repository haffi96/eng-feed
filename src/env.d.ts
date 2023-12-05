/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
/// <reference types="lucia" />

interface ImportMetaEnv {
    readonly ENV: string;
    readonly DATABASE_URL: string;
    readonly GOOGLE_CLIENT_ID: string;
    readonly GOOGLE_CLIENT_SECRET: string;
    readonly GITHUB_CLIENT_ID: string;
    readonly GITHUB_CLIENT_SECRET: string;
    readonly UPSTASH_REDIS_REST_URL: string;
    readonly UPSTASH_REDIS_REST_TOKEN: string;
}

declare namespace App {
    interface Locals {
        userExists: boolean;
        auth: import("lucia").AuthRequest;
    }
}

declare namespace Lucia {
    type Auth = import("./lib/lucia").Auth;
    type DatabaseUserAttributes = {
        username: string;
        provider: string;
        email?: string;
    };
    type DatabaseSessionAttributes = {};
}
