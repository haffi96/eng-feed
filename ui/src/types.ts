export interface Post {
    postId: number;
    postUuid: string;
    title: string;
    link: string;
    author: string;
    publishedDate: Date;
    blog_id: number;
    companyName: string;
}

export interface Subscription {
    blogId: number;
    blogLink: string;
    companyName: string;
    subscribed: boolean;
}