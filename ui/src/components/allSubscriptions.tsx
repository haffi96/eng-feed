import { useState } from "preact/hooks";
import type { Subscription } from "../types";
import SubscribeActionButton from "./unSubscribeButton";

interface SubscribedBlogItemProps {
    userEmail?: string;
    apiUrl: string;
    subs: Subscription[];
}

export default function AllSubscriptionsList({ userEmail, apiUrl, subs }: SubscribedBlogItemProps) {
    const [subscribedBlogs, setSubscribedBlogs] = useState<Subscription[]>(subs);

    const removeSubAction = (blogId: number) => {
        const newSubs = subscribedBlogs.filter((s) => s.blogId !== blogId);
        setSubscribedBlogs(newSubs);
    }


    return (
        <div class="flex flex-col space-y-2 lg:p-2 text-sm md:text-lg">
            {
                subscribedBlogs.map((sub) => {
                    return (
                        <div class="flex flex-row justify-between hover:outline hover:outline-zinc-600/70
                                    rounded-lg p-2 shadow-md transition:ease-in duration-100">
                            <a class="w-full" href={`${sub.blogLink}`}>
                                {sub.companyName}
                            </a>
                            <div class="hidden md:block">
                                <SubscribeActionButton
                                    userEmail={userEmail}
                                    sub={sub}
                                    removeSubAction={removeSubAction}
                                />
                            </div>
                        </div>

                    );
                })
            }
        </div >
    )
}