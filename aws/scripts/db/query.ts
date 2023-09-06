import { db } from './session'
import { allBlogs, blogPosts, userBlogs, userPosts } from './schema'
import { eq, and, desc, getOperators , sql} from 'drizzle-orm';


export type newBlogEntry = typeof allBlogs.$inferInsert;

export const createAllBlogsEntry = async (newBlogParams: newBlogEntry) => {
    return await db.insert(allBlogs).values(newBlogParams);
}

export const fetchNewPostsForUser = async (userId: number) => {
    const sq = db.select().from(userBlogs).where(eq(userBlogs.user_id, userId)).as('sq');

    return await db.select().from(blogPosts)
    .innerJoin(sq, eq(blogPosts.blog_id, sq.blog_id))
    .orderBy(desc(blogPosts.publishedData))
}

export const fetchNewPosts = async () => {
    return await db.select({blogId: blogPosts.blog_id, postUuid: blogPosts.post_uuid}).from(blogPosts)
}

export const fetchUsersForBlog = async (blogId: number | null) => {
    return await db.select({userId: userBlogs.user_id}).from(userBlogs).where(eq(userBlogs.blog_id, blogId!));
}

export const fetchUsersToNotify = async () => {
    const newPosts = await fetchNewPosts();

    const userIdsToNotify = new Map<number, string[]>();

    // Collect all blog IDs for the new posts
    const blogIds = newPosts.map((post) => post.blogId);

    // Fetch all users for the collected blog IDs in a single query
    const users = await db
        .select({ userId: userBlogs.user_id, blogId: userBlogs.blog_id })
        .from(userBlogs)
        .where(sql`${userBlogs.blog_id} IN ${blogIds}`);

    // Group users by their user IDs
    for (const user of users) {
        if (!userIdsToNotify.has(user.userId!)) {
            userIdsToNotify.set(user.userId!, []);
        }
        userIdsToNotify.get(user.userId!)!.push(
            newPosts.find((post) => post.blogId === user.blogId)?.postUuid || ''
        );
    }

    return userIdsToNotify;
};


// fetchUsersToNotify().then((users) => {
//     console.log(users);
// });

// fetchNewPostsForUser(1).then((posts) => {
//     console.log(posts);
// });
// fetchNewPostsForUser(2).then((posts) => {
//     console.log(posts);
// });


// const link = 'https://blog.cloudflare.com/rss/';
// const companyName = 'Cloudflare';
// const rssVersion = '2.0';
// createAllBlogsEntry({ link, companyName, rssVersion }).then((res) => {
//     console.log(res);
// });