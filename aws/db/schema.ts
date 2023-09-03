import { integer, pgTable, serial, uniqueIndex, varchar, uuid, timestamp, boolean } from 'drizzle-orm/pg-core';
import { sql } from "drizzle-orm";
 
export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    user_uuid: uuid('user_uuid').notNull().default(sql`uuid_generate_v4()`),
    username: varchar('username', { length: 256 }),
    email: varchar('email', { length: 256 }),
}, (users) => {
    return {
        usernameIndex: uniqueIndex('username_idx').on(users.username),
        emailIndex: uniqueIndex('email_idx').on(users.email),
        uuidIndex: uniqueIndex('uuid_idx').on(users.user_uuid),
    }
});

export const allBlogs = pgTable('all_blogs', {
    id: serial('id').primaryKey(),
    blog_uuid: uuid('blog_uuid').notNull().default(sql`uuid_generate_v4()`),
    link: varchar('link', { length: 256 }),
    company: varchar('company', { length: 256 }),
}, (allBlogs) => {
    return {
        uuidIndex: uniqueIndex('uuid_idx').on(allBlogs.blog_uuid),
    }
});


export const userBlogs = pgTable('user_blogs', {
    id: serial('id').primaryKey(),
    user_id: integer('user_id').references(() => users.id),
    blog_id: integer('blog_id').references(() => allBlogs.id),
}, (userBlogs) => {
    return {
        userBlogIndex: uniqueIndex('user_blog_idx').on(userBlogs.user_id, userBlogs.blog_id),
    }
});


export const blogPosts = pgTable('blog_posts', {
    id: serial('id').primaryKey(),
    post_uuid: uuid('post_uuid').notNull().default(sql`uuid_generate_v4()`),
    title: varchar('title', { length: 256 }),
    link: varchar('link', { length: 256 }),
    author: varchar('author', { length: 256 }),
    publishedData: timestamp('published_data'),
    blog_id: integer('blog_id').references(() => allBlogs.id),
}, (blogPosts) => {
    return {
        uuidIndex: uniqueIndex('uuid_idx').on(blogPosts.post_uuid),
    }
});


export const userPosts = pgTable('user_posts', {
    id: serial('id').primaryKey(),
    user_id: integer('user_id').references(() => users.id),
    post_id: integer('post_id').references(() => blogPosts.id),
    emailed: boolean('emailed').notNull().default(false),
    updatedAt: timestamp('updated_at'),

});