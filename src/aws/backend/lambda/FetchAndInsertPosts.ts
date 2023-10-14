import{ fetchAndInsertBlogPosts } from "../rss"

export const handler = async () => {
    try {
        await fetchAndInsertBlogPosts(5)
        return {
            statusCode: 200,
            body: "success",
        }
    } catch (err) {
        console.log(err)
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: "some error happened",
            }),
        }
    }
}