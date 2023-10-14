ALTER TABLE "blog_posts" ADD COLUMN "title_hash" varchar(256) NOT NULL;--> statement-breakpoint
ALTER TABLE "blog_posts" ADD CONSTRAINT "blog_posts_title_hash_unique" UNIQUE("title_hash");