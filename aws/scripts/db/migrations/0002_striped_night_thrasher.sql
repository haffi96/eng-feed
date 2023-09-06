DROP INDEX IF EXISTS "user_post_idx";--> statement-breakpoint
ALTER TABLE "all_blogs" ADD COLUMN "rss_version" varchar(256);