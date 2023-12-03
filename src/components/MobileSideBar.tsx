import { useState } from "preact/hooks";
import SideBarItems from "./SideBarItems.tsx";
import type { UserSubscription } from "../types";
import type { Session } from "@auth/core/types";
import { signOut } from "auth-astro/client";
import ProfileImage from "./ProfileImage.tsx";
import EmailPreferences from "./EmailPreferences.tsx";

interface Props {
    session: Session | null;
    userEmail?: string;
    subs: UserSubscription[];
    blogNameParam?: string;
}

const Sidebar = ({ session, userEmail, subs, blogNameParam }: Props) => {

    const [showSidebar, setShowSidebar] = useState(false);

    return (
        <>
            <div class="lg:hidden">
                {showSidebar ? (
                    <div>
                        <div
                            onClick={() => setShowSidebar(!showSidebar)}
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
                <div class="text-center mt-10" >
                    {
                        session ? (
                            <div>
                                <ProfileImage session={session} />
                                <button
                                    onClick={() => signOut()}
                                    class="hover:bg-zinc-600 rounded-lg p-2 shadow-md transition:ease-in duration-100">
                                    Sign out
                                </button>
                                {
                                    userEmail && (
                                        <div class="flex flex-col">
                                            <EmailPreferences
                                                email={userEmail}
                                            />
                                            <p class="text-xs">Emails sent every Fri 9am (GMT)</p>
                                        </div>
                                    )
                                }
                            </div>
                        ) : (
                            <a
                                class="hover:bg-zinc-600 rounded-lg p-2 shadow-md transition:ease-in duration-100"
                                href="/login"
                            >
                                Sign in
                            </a>
                        )
                    }
                </div>
                <SideBarItems
                    userEmail={userEmail}
                    subs={subs}
                    blogNameParam={blogNameParam}
                />
            </div >
        </>
    );
};

export default Sidebar;