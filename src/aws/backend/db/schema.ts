import { integer, pgTable, serial, uniqueIndex, varchar, uuid, timestamp, boolean, bigint, text } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

const utcTimestampSql = sql`TIMEZONE('utc', CURRENT_TIMESTAMP)`

const uuidSql = sql`extensions.uuid_generate_v4()`

export const users = pgTable("auth_user", {
    id: varchar("id", {
        length: 15 // change this when using custom user ids
    }).primaryKey(),
    user_uuid: uuid("user_uuid").notNull().default(uuidSql),
    username: varchar("username", {
        length: 256
    }).notNull(),
    email: varchar("email", { length: 256 }),
    email_preference: boolean("email_preference").notNull().default(false),
    provider: varchar("provider", { length: 256 }),
}, (users) => {
    return {
        emailIndex: uniqueIndex("email_idx").on(users.email),
        uuidIndex: uniqueIndex("uuid_idx").on(users.user_uuid),
    }
})

export const allBlogs = pgTable("all_blogs", {
    id: serial("id").primaryKey(),
    blog_uuid: uuid("blog_uuid").notNull().default(uuidSql),
    link: varchar("link", { length: 256 }),
    httpsLink: varchar("https_link", { length: 256 }),
    companyName: varchar("company", { length: 256 }),
    rssVersion: varchar("rss_version", { length: 256 }),
}, (allBlogs) => {
    return {
        uuidIndex: uniqueIndex("uuid_idx").on(allBlogs.blog_uuid),
    }
})


export const userBlogs = pgTable("user_blogs", {
    id: serial("id").primaryKey(),
    user_id: varchar("user_id", {
        length: 15
    })
        .notNull()
        .references(() => users.id),
    blog_id: integer("blog_id").references(() => allBlogs.id),
}, (userBlogs) => {
    return {
        userBlogIndex: uniqueIndex("user_blog_idx").on(userBlogs.user_id, userBlogs.blog_id),
    }
})


export const blogPosts = pgTable("blog_posts", {
    id: serial("id").primaryKey(),
    post_uuid: uuid("post_uuid").notNull().default(uuidSql),
    title: varchar("title", { length: 256 }),
    titleHash: varchar("title_hash", { length: 256 }).notNull().unique(),
    link: varchar("link", { length: 256 }),
    author: varchar("author", { length: 256 }),
    publishedDate: timestamp("published_date", { mode: "date" }),
    blog_id: integer("blog_id").references(() => allBlogs.id),
}, (blogPosts) => {
    return {
        uuidIndex: uniqueIndex("uuid_idx").on(blogPosts.post_uuid),
    }
})


export const userPosts = pgTable("user_posts", {
    id: serial("id").primaryKey(),
    user_id: varchar("user_id", {
        length: 15
    })
        .notNull()
        .references(() => users.id),
    post_id: integer("post_id").references(() => blogPosts.id),
    emailed: boolean("emailed").notNull().default(false),
    notificationDate: timestamp("notification_date", { mode: "date" })
        .notNull()
        .default(utcTimestampSql),
    updatedAt: timestamp("updated_at"),
})

export const session = pgTable("user_session", {
    id: varchar("id", {
        length: 128
    }).primaryKey(),
    userId: varchar("user_id", {
        length: 15
    })
        .notNull()
        .references(() => users.id),
    activeExpires: bigint("active_expires", {
        mode: "number"
    }).notNull(),
    idleExpires: bigint("idle_expires", {
        mode: "number"
    }).notNull()
});

export const key = pgTable("user_key", {
    id: varchar("id", {
        length: 255
    }).primaryKey(),
    userId: varchar("user_id", {
        length: 15
    })
        .notNull()
        .references(() => users.id),
    hashedPassword: varchar("hashed_password", {
        length: 255
    })
});