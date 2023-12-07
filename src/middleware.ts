import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import type { APIContext } from 'astro';
import { sequence } from "astro:middleware";
import { auth } from "src/lib/lucia";

const redis = new Redis({
    url: import.meta.env.UPSTASH_REDIS_REST_URL,
    token: import.meta.env.UPSTASH_REDIS_REST_TOKEN,
});

const ratelimit = new Ratelimit({
    redis: redis,
    limiter: Ratelimit.slidingWindow(10, "10 s"),
});

async function rateLimitMiddleWare({ request, clientAddress }: APIContext, next: any) {

    if (request.url.includes("/api")) {
        const ip = clientAddress ?? "127.0.0.1";
        const { success, pending, limit, reset, remaining } = await ratelimit.limit(
            `ratelimit_middleware_${ip}`,
        );

        if (!success && remaining === 0) {
            const res = new Response(JSON.stringify({ "error": "rate limit exceeded" }), { status: 429 });
            res.headers.set("X-RateLimit-Limit", limit.toString());
            res.headers.set("X-RateLimit-Remaining", remaining.toString());
            res.headers.set("X-RateLimit-Reset", reset.toString());
            return res
        }

        return await next();
    }

    // return a Response or the result of calling `next()`
    return await next();
};


async function authMiddleWare(context: APIContext, next: any) {
    context.locals.auth = auth.handleRequest(context);
    const session = context.locals.auth.validate();
    if (!session) {
        return context.redirect("/login", 302);
    }
    return await next();
};


export const onRequest = sequence(authMiddleWare, rateLimitMiddleWare);