CREATE TABLE IF NOT EXISTS "all_blogs" (
	"id" serial PRIMARY KEY NOT NULL,
	"blog_uuid" uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
	"link" varchar(256),
	"https_link" varchar(256),
	"company" varchar(256),
	"rss_version" varchar(256)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "blog_posts" (
	"id" serial PRIMARY KEY NOT NULL,
	"post_uuid" uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
	"title" varchar(256),
	"title_hash" varchar(256) NOT NULL,
	"link" varchar(256),
	"author" varchar(256),
	"published_date" timestamp,
	"blog_id" integer,
	CONSTRAINT "blog_posts_title_hash_unique" UNIQUE("title_hash")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_key" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"user_id" varchar(15) NOT NULL,
	"hashed_password" varchar(255)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_session" (
	"id" varchar(128) PRIMARY KEY NOT NULL,
	"user_id" varchar(15) NOT NULL,
	"active_expires" bigint NOT NULL,
	"idle_expires" bigint NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_blogs" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar(15) NOT NULL,
	"blog_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_posts" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar(15) NOT NULL,
	"post_id" integer,
	"emailed" boolean DEFAULT false NOT NULL,
	"notification_date" timestamp DEFAULT TIMEZONE('utc', CURRENT_TIMESTAMP) NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "auth_user" (
	"id" varchar(15) PRIMARY KEY NOT NULL,
	"user_uuid" uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
	"username" varchar(256) NOT NULL,
	"email" varchar(256),
	"email_preference" boolean DEFAULT false NOT NULL,
	"provider" varchar(256)
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "uuid_idx" ON "all_blogs" ("blog_uuid");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "uuid_idx" ON "blog_posts" ("post_uuid");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "user_blog_idx" ON "user_blogs" ("user_id","blog_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "email_idx" ON "auth_user" ("email");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "uuid_idx" ON "auth_user" ("user_uuid");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "blog_posts" ADD CONSTRAINT "blog_posts_blog_id_all_blogs_id_fk" FOREIGN KEY ("blog_id") REFERENCES "all_blogs"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_key" ADD CONSTRAINT "user_key_user_id_auth_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "auth_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_session" ADD CONSTRAINT "user_session_user_id_auth_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "auth_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_blogs" ADD CONSTRAINT "user_blogs_user_id_auth_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "auth_user"("id") ON DELETE no action ON UPDATE no action;
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
 ALTER TABLE "user_posts" ADD CONSTRAINT "user_posts_user_id_auth_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "auth_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_posts" ADD CONSTRAINT "user_posts_post_id_blog_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "blog_posts"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
