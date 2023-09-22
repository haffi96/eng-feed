import AllSubscriptionsList from "./allSubscriptions";
import type { Subscription } from "@/types";

interface Props {
    userEmail?: string;
    apiUrl: string;
    subs: Subscription[];
}

const SideBarItems = ({ userEmail, apiUrl, subs }: Props) => {
    return (
        <div class="w-7/8 lg:w-5/6 m-auto space-y-5 mt-20">
            <a
                href="/posts/1"
                class="hover:bg-zinc-600 rounded-lg p-2 shadow-md transition:ease-in duration-100
                        text-center m-auto flex justify-center items-center "
            >
                Home
            </a>
            <ul>
                <details class="cursor-pointer">
                    <summary class="text-zinc-800 text-xs lg:text-lg"
                    >Subscriptions</summary
                    >
                    <AllSubscriptionsList
                        userEmail={userEmail}
                        apiUrl={apiUrl}
                        subs={subs}
                    />
                </details>
            </ul>
        </div >
    )
}

export default SideBarItems;
