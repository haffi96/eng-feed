import { useState } from "preact/hooks";
import SideBarItems from "./SideBarItems.tsx";
import type { Subscription } from "../types";
import ThemeToggle from "./ThemeToggle.tsx";

interface Props {
    userEmail?: string;
    apiUrl: string;
    subs: Subscription[];
}

const Sidebar = ({ userEmail, apiUrl, subs }: Props) => {
    const [showSidebar, setShowSidebar] = useState(false);

    return (
        <>
            <div class="lg:hidden">
                {showSidebar ? (
                    <div>
                        <div
                            className="w-full h-full bg-zinc-500 dark:bg-zinc-700 fixed z-20 opacity-50"
                        />
                        <button
                            className="flex text-5xl items-center cursor-pointer fixed right-6 top-2 z-50"
                            onClick={() => setShowSidebar(!showSidebar)}
                        >
                            x
                        </button>
                    </div>
                ) : (
                    <svg
                        onClick={() => setShowSidebar(!showSidebar)}
                        className="fixed z-30 flex items-center cursor-pointer right-5 top-5 fill-black dark:fill-white"
                        viewBox="0 0 100 80"
                        width="40"
                        height="40"
                    >
                        <rect width="100" height="10"></rect>
                        <rect y="30" width="100" height="10"></rect>
                        <rect y="60" width="100" height="10"></rect>
                    </svg>
                )}
            </div>

            <div
                className={`top-0 right-0 w-2/3 lg:1/6 bg-zinc-300 dark:bg-zinc-500 p-1 fixed h-full z-40
                            ease-in-out duration-300 ${showSidebar ? "translate-x-0 " : "translate-x-full"}
                            overflow-y-scroll`}
            >
                <SideBarItems
                    userEmail={userEmail}
                    apiUrl={apiUrl}
                    subs={subs}
                />
            </div>
        </>
    );
};

export default Sidebar;