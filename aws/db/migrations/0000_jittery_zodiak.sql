CREATE TABLE IF NOT EXISTS "all_blogs" (
	"id" serial PRIMARY KEY NOT NULL,
	"blog_uuid" uuid,
	"link" varchar(256),
	"company" varchar(256)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "blog_posts" (
	"id" serial PRIMARY KEY NOT NULL,
	"post_uuid" uuid,
	"title" varchar(256),
	"link" varchar(256),
	"author" varchar(256),
	"published_data" timestamp,
	"blog_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_blogs" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"blog_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_posts" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"post_id" integer,
	"emailed" boolean DEFAULT false NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_uuid" uuid,
	"username" varchar(256),
	"email" varchar(256)
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "uuid_idx" ON "all_blogs" ("blog_uuid");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "uuid_idx" ON "blog_posts" ("post_uuid");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "user_blog_idx" ON "user_blogs" ("user_id","blog_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "user_post_idx" ON "user_posts" ("user_id","post_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "username_idx" ON "users" ("username");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "email_idx" ON "users" ("email");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "uuid_idx" ON "users" ("user_uuid");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "blog_posts" ADD CONSTRAINT "blog_posts_blog_id_all_blogs_id_fk" FOREIGN KEY ("blog_id") REFERENCES "all_blogs"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_blogs" ADD CONSTRAINT "user_blogs_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_blogs" ADD CONSTRAINT "user_blogs_blog_id_all_blogs_id_fk" FOREIGN KEY ("blog_id") REFERENCES "all_blogs"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_posts" ADD CONSTRAINT "user_posts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_posts" ADD CONSTRAINT "user_posts_post_id_blog_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "blog_posts"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
