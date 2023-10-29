import { useState } from "preact/hooks";
import type { UserSubscription } from "../types";
import SubscribeActionButton from "@components/SubscribeActionButton";

interface SubscribedBlogItemProps {
    userEmail?: string;
    subs: UserSubscription[];
    blogNameParam?: string;
}

export default function AllSubscriptionsList({ userEmail, subs, blogNameParam }: SubscribedBlogItemProps) {
    const [subscribedBlogs, setSubscribedBlogs] = useState<UserSubscription[]>(subs);

    const removeSubAction = (blogId: number) => {
        const newSubs = subscribedBlogs.filter((s) => s.blogId !== blogId);
        setSubscribedBlogs(newSubs);
    }


    return (
        <div class="flex flex-col space-y-2 lg:p-2 text-sm">
            {
                subscribedBlogs.map((sub) => {
                    return (
                        <div class={`flex flex-row justify-between hover:outline hover:outline-zinc-600/70
                                    rounded-lg p-2 shadow-md transition:ease-in duration-100 space-x-1
                                    ${blogNameParam === sub.companyName ? "bg-zinc-600" : ""}`}
                        >
                            <button
                                onClick={() => { window.location.href = `/posts?blog=${sub.companyName}&page=1` }}
                                class="w-full h-full"
                            >
                                <p class="rounded-lg hover:shadow-sm hover:shadow-black
                                        transition-shadow transition:ease-in duration-200">
                                {sub.companyName}
                                </p>
                            </button>
                            <div class="flex flex-row space-x-1">
                                <button
                                    class="hover:bg-zinc-400 focus:bg-zinc-400 rounded-full"
                                >
                                    <a href={`${sub.blogLink}`}>
                                        <img src={"/external-link.svg"} alt="link" />
                                    </a>
                                </button>
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