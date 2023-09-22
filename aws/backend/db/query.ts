import { db } from "./session"
import { allBlogs, blogPosts, userBlogs, userPosts, users } from "./schema"
import { eq, desc, sql, gt } from "drizzle-orm"


export type newBlogEntry = typeof allBlogs.$inferInsert;
export type blogEntry = typeof allBlogs.$inferSelect;
export type newBlogPostEntry = typeof blogPosts.$inferInsert;

// Users table
export const upsertUserEntry = async (newUserParams: typeof users.$inferInsert) => {
    return await db.insert(users).values(newUserParams).onConflictDoNothing({ target: [users.email] })
}

export const fetchUserById = async (userId: number) => {
    return await db.select({ userUuid: users.user_uuid }).from(users).where(eq(users.id, userId))
}

export const fetchUserSubscribedBlogs = async (userEmail: string) => {
    const userQuery = db.select({ userId: users.id }).from(users).where(eq(users.email, userEmail)).as("userQuery")

    const sq = db.select({ blog_id: userBlogs.blog_id }).from(userBlogs).innerJoin(userQuery, eq(userBlogs.user_id, userQuery.userId)).as("sq")

    return await db.select({
        blogId: allBlogs.id,
        blogLink: allBlogs.link,
        companyName: allBlogs.companyName
    })
        .from(allBlogs)
        .innerJoin(sq, eq(allBlogs.id, sq.blog_id))
}

export const fetchUserBlogsWithSubscriptionStatus = async (userEmail: string) => {
    const userQuery = db
        .select({ userId: users.id })
        .from(users)
        .where(eq(users.email, userEmail))
        .as("userQuery")

    const sq = db
        .select({ blog_id: userBlogs.blog_id })
        .from(userBlogs)
        .innerJoin(userQuery, eq(userBlogs.user_id, userQuery.userId))
        .as("sq")

    return await db
        .select({
            blogId: allBlogs.id,
            blogLink: allBlogs.httpsLink,
            companyName: allBlogs.companyName,
            subscribed: sql`sq.blog_id IS NOT NULL` // Check if there is a subscription
        })
        .from(allBlogs)
        .leftJoin(sq, eq(allBlogs.id, sq.blog_id)) // Left join to include unsubscribed blogs
}


// AllBlogs table
export const createAllBlogsEntry = async (newBlogParams: newBlogEntry) => {
    return await db.insert(allBlogs).values(newBlogParams)
}

export const getBlogByCompanyName = async (blogName: string): Promise<blogEntry[]> => {
    return await db.select().from(allBlogs).where(eq(allBlogs.companyName, blogName))
}

export const fetchAllBlogs = async () => {
    return await db.select({
        blogId: allBlogs.id,
        blogLink: allBlogs.httpsLink,
        companyName: allBlogs.companyName
    }).from(allBlogs)
}


// BlogPosts table
export const fetchAllPosts = async ({ offset, limit }: { offset: number, limit: number }) => {

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
        .innerJoin(allBlogs, eq(allBlogs.id, blogPosts.blog_id))
        .orderBy(desc(blogPosts.publishedDate))
        .offset(offset)
        .limit(limit)
}

export const createBlogPostEntry = async (newBlogPostParams: newBlogPostEntry) => {
    return await db
        .insert(blogPosts)
        .values(newBlogPostParams)
        .onConflictDoNothing({ target: [blogPosts.titleHash] })
}

export const fetchNewPosts = async () => {
    const dateDelta = new Date()
    dateDelta.setDate(dateDelta.getDate() - 3)
    return await db.select({
        blogId: blogPosts.blog_id,
        postUuid: blogPosts.post_uuid,
        postId: blogPosts.id,
    }
    ).from(blogPosts)
        .where(gt(blogPosts.publishedDate, dateDelta))
}

export const fetchPostById = async (postId: number) => {
    return await db.select().from(blogPosts).where(eq(blogPosts.id, postId))
}

// UserBlogs table
interface QueryAllPostsParams {
    userEmail: string;
    offset: number;
    limit: number;
}

export const fetchAllPostsForUser = async ({ userEmail, offset, limit }: QueryAllPostsParams) => {
    const userQuery = db.select({ userId: users.id }).from(users).where(eq(users.email, userEmail)).as("userQuery")

    const sq = db.select({ blog_id: userBlogs.blog_id }).from(userBlogs).innerJoin(userQuery, eq(userBlogs.user_id, userQuery.userId)).as("sq")

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
        .limit(limit)
}

export const fetchUsersForBlog = async (blogId: number | null) => {
    return await db.select({ userId: userBlogs.user_id }).from(userBlogs).where(eq(userBlogs.blog_id, blogId!))
}

export const createUserBlogEntry = async (userEmail: string, blogId: number) => {
    const userQuery = db.select({ userId: users.id }).from(users).where(eq(users.email, userEmail)).as("userQuery")

    const result = await db.select({ userId: userQuery.userId }).from(userQuery)

    const { userId } = result[0]

    await db.insert(userBlogs).values({ user_id: userId, blog_id: blogId })
}

// UserPosts table
export const createUserPostEntry = async (userId: number, postId: number) => {
    return await db.insert(userPosts).values({ user_id: userId, post_id: postId })
}


export const fetchTodaysUsersToNotify = async () => {
    const newPosts = await fetchNewPosts()

    // Map of userUuids to postUuids
    const userIdsToNotify = new Map<string, string[]>()

    // Collect all blog IDs for the new posts
    if (newPosts.length === 0) {
        return userIdsToNotify
    }

    const blogIds = newPosts.map((post) => post.blogId)

    // Fetch all users for the collected blog IDs in a single query
    const users = await db
        .select({ userId: userBlogs.user_id, blogId: userBlogs.blog_id })
        .from(userBlogs)
        .where(sql`${userBlogs.blog_id} IN ${blogIds}`)

    // Group users by their user IDs
    for (const user of users) {
        const userRecord = await fetchUserById(user.userId!)

        if (!userIdsToNotify.has(userRecord[0].userUuid)) {
            userIdsToNotify.set(userRecord[0].userUuid, [])
        }

        newPosts.find((post) => {
            if (post.blogId === user.blogId) {
                createUserPostEntry(user.userId!, post.postId!)
                    .then()
                    .catch((err) => {
                        console.log(err)
                    })

                userIdsToNotify.get(userRecord[0].userUuid)!.push(post.postUuid)
            }
        })
    }

    return userIdsToNotify
}


// fetchTodaysUsersToNotify().then((users) => {
//     console.log(users)
// })

// fetchAllPostsForUser({ userEmail: "haffimazhar96@gmail.com", offset: 0, limit: 10 }).then((posts) => {
//     console.log(posts)
// })

// fetchUserSubscribedBlogs("haffimazhar96@gmail.com").then((res) => {
//     console.log(res)
// })

// fetchAllPosts({ offset: 20, limit: 10 }).then((res) => {
//     console.log(res)
// })


// fetchAllBlogs().then((res) => {
//     console.log(res)
// })

// getBlogByCompanyName('Cloudflare').then((res) => {
//     console.log(res);
// });

// fetchNewPosts().then((res) => {
//     console.log(res);
// });

// fetchUserBlogsWithSubscriptionStatus("haffimazhar96@gmail.com").then((res) => {
//     console.log(res)
// })

// upsertUserEntry({ email: "new@test.com" }).then((res) => {
//     console.log(res)
// })

// createUserBlogEntry("new@test.com", 1).then((res) => {
//     console.log(res)
// })