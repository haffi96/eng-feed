import { fetchTodaysUsersToNotify } from "../db/query"

export const handler = async () => {
    try {
        const user_posts = await fetchTodaysUsersToNotify()
        return {
            statusCode: 200,
            body: JSON.stringify(user_posts),
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