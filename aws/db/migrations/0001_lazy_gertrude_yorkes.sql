ALTER TABLE "all_blogs" ALTER COLUMN "blog_uuid" SET DEFAULT uuid_generate_v4();--> statement-breakpoint
ALTER TABLE "all_blogs" ALTER COLUMN "blog_uuid" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "blog_posts" ALTER COLUMN "post_uuid" SET DEFAULT uuid_generate_v4();--> statement-breakpoint
ALTER TABLE "blog_posts" ALTER COLUMN "post_uuid" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "user_uuid" SET DEFAULT uuid_generate_v4();--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "user_uuid" SET NOT NULL;