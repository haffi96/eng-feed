import UserInfo from "@components/UserInfo"
import type { Session } from "lucia"
import { useState } from "preact/hooks"
import type { UserSubscription } from "../types"
import MobileEmailPreferences from "./MobileEmailPreferences.tsx"
import SideBarItems from "./SideBarItems.tsx"

interface Props {
  session: Session
  userId: string
  userEmail: string | undefined
  subs: UserSubscription[]
  blogNameParam?: string
}

const Sidebar = ({
  session,
  userId,
  userEmail,
  subs,
  blogNameParam,
}: Props) => {
  const [showSidebar, setShowSidebar] = useState(false)

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
            class="fixed z-30 flex items-center cursor-pointer right-5 top-5 fill-black dark:fill-white"
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
        // prettier-ignore
        class={`top-0 right-0 w-2/3 lg:1/6 bg-zinc-300 dark:bg-zinc-500 p-1 fixed h-full z-40
                    ease-in-out duration-300 ${showSidebar ? "translate-x-0 " : "translate-x-full"}
                    overflow-y-scroll`}
      >
        <div class="text-center mt-10">
          {session ? (
            <div>
              <UserInfo session={session} />
              <a href="/api/logout">
                <button class="hover:bg-zinc-600 rounded-lg p-2 shadow-md transition:ease-in duration-100">
                  Sign out
                </button>
              </a>
              <div class="flex flex-col">
                <MobileEmailPreferences userId={userId} userEmail={userEmail} />
              </div>
            </div>
          ) : (
            <a
              class="hover:bg-zinc-600 rounded-lg p-2 shadow-md transition:ease-in duration-100"
              href="/login"
            >
              Sign in
            </a>
          )}
        </div>
        <SideBarItems
          userId={userId}
          subs={subs}
          blogNameParam={blogNameParam}
        />
      </div>
    </>
  )
}

export default Sidebar
