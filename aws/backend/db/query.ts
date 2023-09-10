import { db } from './session'
import { allBlogs, blogPosts, userBlogs, userPosts , users } from './schema'
import { eq, and, desc, getOperators , sql, gt} from 'drizzle-orm';


export type newBlogEntry = typeof allBlogs.$inferInsert;
export type blogEntry = typeof allBlogs.$inferSelect;
export type newBlogPostEntry = typeof blogPosts.$inferInsert;

// Users table
export const fetchUserById = async (userId: number) => {
    return await db.select({ userUuid: users.user_uuid }).from(users).where(eq(users.id, userId));
}

export const fetchUserSubscribedBlogs = async (userId: number) => {
    const sq = db.select({ blogId: userBlogs.blog_id }).from(userBlogs).where(eq(userBlogs.user_id, userId)).as('sq');

    return await db.select({
        blogId: allBlogs.id,
        blogLink: allBlogs.link,
        companyName: allBlogs.companyName
    })
    .from(allBlogs)
    .innerJoin(sq, eq(allBlogs.id, sq.blogId));
}


// AllBlogs table
export const createAllBlogsEntry = async (newBlogParams: newBlogEntry) => {
    return await db.insert(allBlogs).values(newBlogParams);
}

export const getBlogByCompanyName = async (blogName: string): Promise<blogEntry[]> => {
    return await db.select().from(allBlogs).where(eq(allBlogs.companyName, blogName));
}


// BlogPosts table
export const createBlogPostEntry = async (newBlogPostParams: newBlogPostEntry) => {
    return await db.insert(blogPosts).values(newBlogPostParams);
}

export const fetchNewPosts = async () => {
    const dateDelta = new Date();
    dateDelta.setDate(dateDelta.getDate() - 3);
    return await db.select({
        blogId: blogPosts.blog_id,
        postUuid: blogPosts.post_uuid,
        postId: blogPosts.id,
    }
        ).from(blogPosts)
        .where(gt(blogPosts.publishedDate, dateDelta))
}

export const fetchPostById = async (postId: number) => {
    return await db.select().from(blogPosts).where(eq(blogPosts.id, postId));
}

// UserBlogs table
interface QueryAllPostsParams {
    userId: number;
    offset: number;
    limit: number;
}

export const fetchAllPostsForUser = async ({ userId, offset, limit }: QueryAllPostsParams) => {
    const sq = db.select().from(userBlogs).where(eq(userBlogs.user_id, userId)).as('sq');

    return await db.select({
        postId: blogPosts.id,
        postUuid: blogPosts.post_uuid,
        title: blogPosts.title,
        link: blogPosts.link,
        author: blogPosts.author,
        publishedDate: blogPosts.publishedDate,
        blogId: blogPosts.blog_id,
        companyName: allBlogs.companyName,
    })
    .from(blogPosts)
    .innerJoin(sq, eq(blogPosts.blog_id, sq.blog_id))
    .innerJoin(allBlogs, eq(allBlogs.id, blogPosts.blog_id))
    .orderBy(desc(blogPosts.publishedDate))
    .offset(offset)
    .limit(limit);
}

export const fetchUsersForBlog = async (blogId: number | null) => {
    return await db.select({userId: userBlogs.user_id}).from(userBlogs).where(eq(userBlogs.blog_id, blogId!));
}


// UserPosts table
export const createUserPostEntry = async (userId: number, postId: number) => {
    return await db.insert(userPosts).values({user_id: userId, post_id: postId});
}


export const fetchTodaysUsersToNotify = async () => {
    const newPosts = await fetchNewPosts();

    // Map of userUuids to postUuids
    const userIdsToNotify = new Map<string, string[]>();

    // Collect all blog IDs for the new posts
    const blogIds = newPosts.map((post) => post.blogId);

    // Fetch all users for the collected blog IDs in a single query
    const users = await db
        .select({ userId: userBlogs.user_id, blogId: userBlogs.blog_id })
        .from(userBlogs)
        .where(sql`${userBlogs.blog_id} IN ${blogIds}`);

    // Group users by their user IDs
    for (const user of users) {
        const userRecord = await fetchUserById(user.userId!);

        if (!userIdsToNotify.has(userRecord[0].userUuid)) {
            userIdsToNotify.set(userRecord[0].userUuid, []);
        }

        newPosts.find((post) => {
            if (post.blogId === user.blogId) {
                createUserPostEntry(user.userId!, post.postId!)
                .then()
                .catch((err) => {
                    console.log(err);
                });

                userIdsToNotify.get(userRecord[0].userUuid)!.push(post.postUuid);
            }
        })
    }

    return userIdsToNotify;
};


// fetchTodaysUsersToNotify().then((users) => {
//     console.log(users);
// });

fetchAllPostsForUser({ userId: 1, offset: 0, limit: 10 }).then((posts) => {
    console.log(posts);
});

// fetchUserSubscribedBlogs(1).then((res) => {
//     console.log(res);
// });


// getBlogByCompanyName('Cloudflare').then((res) => {
//     console.log(res);
// });

// fetchNewPosts().then((res) => {
//     console.log(res);
// });