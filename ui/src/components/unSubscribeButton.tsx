import { useState } from "preact/hooks";
import type { Subscription } from "../types";

interface SubscribedBlogItemProps {
    userEmail?: string;
    sub: Subscription;
    removeSubAction: (blogId: number) => void;
}

export default function SubscribeActionButton({ userEmail, sub, removeSubAction }: SubscribedBlogItemProps) {
    const [unSubTrigger, setUnSubTrigger] = useState<boolean>(false);

    const unSub = (blogId: number) => {
        console.log("Unsubscribing from blogId: ", blogId);
        removeSubAction(blogId)
        setUnSubTrigger(false);
        window.location.reload();
    }

    const unSubRequest = (blogId: number) => {
        setUnSubTrigger(true);
    }

    const redirectToLogin = () => {
        window.location.href = `/login`;
    }

    const iconRef = !sub.subscribed || userEmail === undefined ? "/add-outline.svg" : "/removeIcon.svg";

    const LoggedOutSubscribeButton = () => {
        return (
            <button
                class="hover:bg-green-400 rounded-xl"
                onClick={() => redirectToLogin()}
            >
                <img src={iconRef} alt="Subscribe" />
            </button>
        )
    }

    const LoggedInRemoveSubscriptionButton = () => {
        return (
            <button
                class="hover:bg-red-400 rounded-xl"
                onClick={() => unSubRequest(sub.blogId)}
            >
                <img src={iconRef} alt="Unsubscribe" />
            </button>
        )
    }

    const LoggedInAddSubscriptionButton = () => {
        return (
            <button
                class="hover:bg-green-400 rounded-xl"
            // onClick={() => unSubRequest(sub.blogId)}
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

    if (userEmail === undefined) {
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

