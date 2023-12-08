import { db } from "./session"
import { allBlogs, blogPosts, userBlogs, userPosts, users } from "./schema"
import { eq, desc, sql, gt, and } from "drizzle-orm"
import { settings } from "../../settings"

export type newBlogEntry = typeof allBlogs.$inferInsert
export type blogEntry = typeof allBlogs.$inferSelect
export type newBlogPostEntry = typeof blogPosts.$inferInsert

// Users table
export const upsertUserEntry = async (
  newUserParams: typeof users.$inferInsert
) => {
  // Not doing an atomic transaction with onConflictDoNothing because
  // at the moment, the frontend is calling this alot, so it results
  // in a lot of incrementing users.id without actually inserting a new user
  // To fix, make ui do less calls?
  const result = await db
    .select({ userId: users.id })
    .from(users)
    .where(eq(users.email, newUserParams.email!))

  if (result.length === 0) {
    return await db.insert(users).values(newUserParams)
  } else {
    return result[0].userId
  }
}

export const fetchUserById = async (userId: string) => {
  const result = await db
    .select({
      userUuid: users.user_uuid,
      userEmail: users.email,
      emailPref: users.email_preference,
      userId: users.id,
    })
    .from(users)
    .where(eq(users.id, userId))
  return result[0]
}

export const setUserEmailPref = async (userId: string, newStatus: boolean) => {
  // const result = await db.select({ emailPref: users.email_preference }).from(users).where(eq(users.id, userId))

  // const currentPref = result[0].emailPref

  await db
    .update(users)
    .set({ email_preference: newStatus })
    .where(eq(users.id, userId))
}

export const updateUserEmail = async (userId: string, newEmail: string) => {
  await db.update(users).set({ email: newEmail }).where(eq(users.id, userId))
}

export const getUserEmailPref = async (userId: string) => {
  const result = await db
    .select({ emailPref: users.email_preference })
    .from(users)
    .where(eq(users.id, userId))
  return result[0].emailPref
}

export const fetchUserEmailByUuid = async (userUuid: string) => {
  const result = await db
    .select({ userEmail: users.email })
    .from(users)
    .where(eq(users.user_uuid, userUuid))
  const { userEmail } = result[0]
  return userEmail
}

export const fetchUserSubscribedBlogs = async (userEmail: string) => {
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
      blogLink: allBlogs.link,
      companyName: allBlogs.companyName,
    })
    .from(allBlogs)
    .innerJoin(sq, eq(allBlogs.id, sq.blog_id))
}

export const fetchUserBlogsWithSubscriptionStatus = async (userId: string) => {
  // const userQuery = db
  //     .select({ userId: users.id })
  //     .from(users)
  //     .where(eq(users.id, userEmail))
  //     .as("userQuery")

  const sq = db
    .select({ blog_id: userBlogs.blog_id })
    .from(userBlogs)
    .where(eq(userBlogs.user_id, userId))
    .as("sq")

  return await db
    .select({
      blogId: allBlogs.id,
      blogLink: allBlogs.httpsLink,
      companyName: allBlogs.companyName,
      subscribed: sql`sq.blog_id IS NOT NULL`, // Check if there is a subscription
    })
    .from(allBlogs)
    .leftJoin(sq, eq(allBlogs.id, sq.blog_id)) // Left join to include unsubscribed blogs
}

// AllBlogs table
export const createAllBlogsEntry = async (newBlogParams: newBlogEntry) => {
  return await db.insert(allBlogs).values(newBlogParams)
}

export const getBlogByCompanyName = async (
  blogName: string
): Promise<blogEntry[]> => {
  return await db
    .select()
    .from(allBlogs)
    .where(eq(allBlogs.companyName, blogName))
}

export const fetchAllBlogs = async () => {
  return await db
    .select({
      blogId: allBlogs.id,
      blogLink: allBlogs.httpsLink,
      companyName: allBlogs.companyName,
    })
    .from(allBlogs)
}

// BlogPosts table
export const fetchAllPosts = async ({
  offset,
  limit,
}: {
  offset: number
  limit: number
}) => {
  return await db
    .select({
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

export const fetchAllPostsForBlogName = async ({
  blogName,
  offset,
  limit,
}: {
  blogName: string
  offset: number
  limit: number
}) => {
  return await db
    .select({
      postId: blogPosts.id,
      postUuid: blogPosts.post_uuid,
      title: blogPosts.title,
      link: blogPosts.link,
      author: blogPosts.author,
      publishedDate: blogPosts.publishedDate,
      companyName: allBlogs.companyName,
    })
    .from(blogPosts)
    .innerJoin(
      allBlogs,
      and(
        eq(allBlogs.id, blogPosts.blog_id),
        eq(allBlogs.companyName, blogName)
      )
    )
    .orderBy(desc(blogPosts.publishedDate))
    .offset(offset)
    .limit(limit)
}

export const createBlogPostEntry = async (
  newBlogPostParams: newBlogPostEntry
) => {
  return await db
    .insert(blogPosts)
    .values(newBlogPostParams)
    .onConflictDoNothing({ target: [blogPosts.titleHash] })
}

export const fetchNewPosts = async () => {
  const dateDelta = new Date()
  dateDelta.setDate(dateDelta.getDate() - settings.PUBLISHED_DELTA)
  return await db
    .select({
      blogId: blogPosts.blog_id,
      postUuid: blogPosts.post_uuid,
      postId: blogPosts.id,
    })
    .from(blogPosts)
    .where(gt(blogPosts.publishedDate, dateDelta))
}

export const fetchPostById = async (postId: number) => {
  return await db.select().from(blogPosts).where(eq(blogPosts.id, postId))
}

export const fetchPostsByUuids = async (postUuid: string[]) => {
  return await db
    .select({
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
    .where(sql`${blogPosts.post_uuid} IN ${postUuid}`)
}

// UserBlogs table
interface QueryAllPostsParams {
  userId: string
  offset: number
  limit: number
}

export const fetchAllPostsForUser = async ({
  userId,
  offset,
  limit,
}: QueryAllPostsParams) => {
  const sq = db
    .select({ blog_id: userBlogs.blog_id })
    .from(userBlogs)
    .where(eq(userBlogs.user_id, userId))
    .as("sq")

  return await db
    .select({
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
  return await db
    .select({ userId: userBlogs.user_id })
    .from(userBlogs)
    .where(eq(userBlogs.blog_id, blogId!))
}

export const createUserBlogEntry = async (userId: string, blogId: number) => {
  await db.insert(userBlogs).values({ user_id: userId, blog_id: blogId })
}

export const deleteUserBlogEntry = async (userId: string, blogId: number) => {
  const deleted = await db
    .delete(userBlogs)
    .where(and(eq(userBlogs.user_id, userId), eq(userBlogs.blog_id, blogId)))
  return deleted.rowCount
}

// UserPosts table
export const createUserPostEntry = async (userId: string, postId: number) => {
  return await db.insert(userPosts).values({ user_id: userId, post_id: postId })
}

export const updateUserPostEntry = async (
  userUuid: string,
  postUuids: string[]
) => {
  const userPostsToUpdate = await db
    .select({ userPostIds: userPosts.id })
    .from(userPosts)
    .innerJoin(users, eq(users.id, userPosts.user_id))
    .innerJoin(blogPosts, eq(blogPosts.id, userPosts.post_id))
    .where(
      and(
        eq(users.user_uuid, userUuid),
        sql`${blogPosts.post_uuid} IN ${postUuids}`
      )
    )

  await db
    .update(userPosts)
    .set({ emailed: true })
    .where(
      sql`${userPosts.id} IN ${userPostsToUpdate.map(
        (post) => post.userPostIds
      )}`
    )
}

export const fetchUsersToNotify = async () => {
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

    if (userRecord.emailPref === false) {
      continue
    }

    if (!userIdsToNotify.has(userRecord.userUuid)) {
      userIdsToNotify.set(userRecord.userUuid, [])
    }

    newPosts.find((post) => {
      if (post.blogId === user.blogId) {
        // TODO: Only create a new user post entry if not already exists
        createUserPostEntry(user.userId!, post.postId!)
          .then()
          .catch((err) => {
            console.log(err)
          })

        userIdsToNotify.get(userRecord.userUuid)!.push(post.postUuid)
      }
    })
  }

  return userIdsToNotify
}

// fetchUsersToNotify().then((users) => {
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

// fetchUserBlogsWithSubscriptionStatus("s9kltm0434o6lw2").then((res) => {
//     console.log(res)
// })

// upsertUserEntry({ email: "new@test.com" }).then((res) => {
//     console.log(res)
// })

// createUserBlogEntry("new@test.com", 1).then((res) => {
//     console.log(res)
// })

// const postIds = [
//     "9ede43eb-23ff-4d48-8d8e-2b398591b1ef",
//     "b649a807-136e-4aa1-b4d0-38595b5ac5db",
//     "6ab7a7c4-d2a6-4a23-a4b4-216e35ab5076",
//     "08e312a6-6fab-4c36-9033-f7b23a20ac4c",
//     "b55612d8-58df-47d3-b660-5a7666683a12",
//     "212d630e-31a7-4b31-b6af-f99d31542c42",
//     "52c8d0c7-7939-40d0-87ed-234e5a272ae9"
// ]

// fetchPostsByUuids(postIds).then((res) => {
//     console.log(res)
// })

// deleteUserBlogEntry("haffimazhar96@gmail.com", 24).then((res) => {
//     console.log(res)
// })
