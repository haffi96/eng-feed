import { useState } from "preact/hooks";
import type { UserSubscription } from "../types";

interface SubscribedBlogItemProps {
    userId?: string;
    sub: UserSubscription;
    removeSubAction: (blogId: number) => void;
}

export default function SubscribeActionButton({ userId, sub, removeSubAction }: SubscribedBlogItemProps) {
    const [unSubTrigger, setUnSubTrigger] = useState<boolean>(false);

    async function unSub(blogId: number) {
        const resp = await fetch(`/api/removeSub`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId,
                blogId
            }),
        });
        console.log(resp.status);
        removeSubAction(blogId)
        setUnSubTrigger(false);
        window.location.reload();
    }

    const unSubRequest = () => {
        setUnSubTrigger(true);
    }

    const redirectToLogin = () => {
        window.location.href = "/login";
    }

    async function addSubscriptionForUser(blogId: number) {
        await fetch(`/api/addSub`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId,
                blogId
            }),
        });
        window.location.reload();
    }

    const iconRef = !sub.subscribed || userId === undefined ? "/add-outline.svg" : "/removeIcon.svg";

    const LoggedOutSubscribeButton = () => {
        return (
            <button
                class="hover:bg-green-400 focus:bg-green-400 rounded-full"
                onClick={redirectToLogin}
            >
                <img src={iconRef} alt="Subscribe" />
            </button>
        )
    }

    const LoggedInRemoveSubscriptionButton = () => {
        return (
            <button
                class="hover:bg-red-400 focus:bg-red-400 rounded-full"
                onClick={unSubRequest}
            >
                <img src={iconRef} alt="Unsubscribe" />
            </button>
        )
    }

    const LoggedInAddSubscriptionButton = () => {
        return (
            <button
                class="hover:bg-green-400 focus:bg-green-400 rounded-full"
                onClick={() => addSubscriptionForUser(sub.blogId)}
            >
                <img src={iconRef} alt="Subscribe" />
            </button>
        )
    }

    const ConfirmUnSubscribeButton = () => {
        return (
            <div class="justify-between">
                <p>Sure?</p>
                <div class="flex flex-row space-x-1">
                    <button
                        class="hover:bg-red-400 outline rounded-xl p-1"
                        onClick={() => unSub(sub.blogId)}
                    >
                        Yes
                    </button>
                    <button
                        class="hover:bg-zinc-600 outline rounded-xl p-1"
                        onClick={() => setUnSubTrigger(!unSubTrigger)}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        )
    }

    if (userId === "") {
        return (<LoggedOutSubscribeButton />)
    } else {
        if (unSubTrigger) {
            return (<ConfirmUnSubscribeButton />)
        } else {
            if (sub.subscribed) {
                return (<LoggedInRemoveSubscriptionButton />)
            } else {
                return (<LoggedInAddSubscriptionButton />)
            }

        }
    }
}

