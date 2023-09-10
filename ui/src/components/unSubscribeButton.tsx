import { useState } from "preact/hooks";
import type { Subscription } from "../types";

interface SubscribedBlogItemProps {
    sub: Subscription;
    removeSubAction: (blogId: number) => void;
}

export default function UnSubscribeButton({ sub, removeSubAction }: SubscribedBlogItemProps) {
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


    if (unSubTrigger) {
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
    } else {
        return (
            <button
                class="hover:bg-red-400 rounded-xl"
                onClick={() => unSubRequest(sub.blogId)}
            >
                <img src="/removeIcon.svg" alt="Unsubscribe" />
            </button>
        )
    }

}

