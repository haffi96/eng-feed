import { useState } from "preact/hooks";
import type { Subscription } from "../types";
import UnSubscribeButton from "./unSubscribeButton";

interface SubscribedBlogItemProps {
    apiUrl: string;
    subs: Subscription[];
}

export default function AllSubscriptionsList({ apiUrl, subs }: SubscribedBlogItemProps) {
    const [subscribedBlogs, setSubscribedBlogs] = useState<Subscription[]>(subs);


    const removeSubAction = (blogId: number) => {
        const newSubs = subscribedBlogs.filter((s) => s.blogId !== blogId);
        setSubscribedBlogs(newSubs);
    }


    return (
        <div class="flex flex-col space-y-2 p-2">
            {
                subscribedBlogs.map((sub) => {
                    return (
                        <div class="flex flex-row justify-between hover:outline hover:outline-zinc-600/70
                                    rounded-lg p-2 shadow-md transition:ease-in duration-100">
                            <a class="w-full" href={`${sub.blogLink}`}>
                                {sub.companyName}
                            </a>
                            <UnSubscribeButton
                                sub={sub}
                                removeSubAction={removeSubAction}
                            />
                        </div>

                    );
                })
            }
        </div >
    )
}