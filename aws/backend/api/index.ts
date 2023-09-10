import { Express, Request, Response } from 'express';
import * as express from 'express';
import { config as dotEnvConfig } from 'dotenv';
import { fetchAllPostsForUser, fetchUserSubscribedBlogs } from '../db/query';
import { json as JsonBodyParser, urlencoded } from 'body-parser';

dotEnvConfig();

const app: Express = express();
const port = 8000;

app.use(urlencoded({ extended: false }));
app.use(JsonBodyParser());


app.get('/posts', async (req: Request, res: Response) => {
    const reqQueryParams = req.query;
    const posts = await fetchAllPostsForUser({
        userId: Number(reqQueryParams.userId),
        offset: Number(reqQueryParams.offset),
        limit: Number(reqQueryParams.limit)
    })

    res.send(posts);

});

app.get('/user/subscriptions', async (req: Request, res: Response) => {
    const reqQueryParams = req.query;
    const subscriptions = await fetchUserSubscribedBlogs(Number(reqQueryParams.userId));

    res.send(subscriptions);
});


app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});