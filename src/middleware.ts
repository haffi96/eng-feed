import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import type { APIContext, MiddlewareNextResponse } from 'astro';

const redis = new Redis({
    url: import.meta.env.UPSTASH_REDIS_REST_URL,
    token: import.meta.env.UPSTASH_REDIS_REST_TOKEN,
});

const ratelimit = new Ratelimit({
    redis: redis,
    limiter: Ratelimit.slidingWindow(5, "10 s"),
});

export async function onRequest({ request, clientAddress }: APIContext, next: MiddlewareNextResponse) {

    if (request.url.includes("/api")) {
        const ip = clientAddress ?? "127.0.0.1";
        const { success, pending, limit, reset, remaining } = await ratelimit.limit(
            `ratelimit_middleware_${ip}`,
        );

        if (!success && remaining === 0) {
            console.error("rate limit exceeded");
            const res = new Response("rate limit exceeded", { status: 429 });
            res.headers.set("X-RateLimit-Limit", limit.toString());
            res.headers.set("X-RateLimit-Remaining", remaining.toString());
            res.headers.set("X-RateLimit-Reset", reset.toString());
            return res
        }

        return next();

    }

    // return a Response or the result of calling `next()`
    return next();
};