import SwitchButton from "@components/switchButton"
import type { ChangeEvent } from "preact/compat"
import { useEffect, useState } from "preact/hooks"

const EmailPreferences = ({
  userId,
  userEmail,
}: {
  userId: string
  userEmail: string | undefined
}) => {
  const [isChecked, setChecked] = useState(false)
  const [email, setEmail] = useState(undefined)
  const [editEmail, setEditEmail] = useState(false)
  const [emailMessage, setEmailMessage] = useState(false)

  useEffect(() => {
    fetch(`/api/getEmailPref?userId=${userId}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        setChecked(res.emailPref)
      })
  }, [])

  // eslint-disable-next-line
  const handleChange = async (e: ChangeEvent) => {
    if (!userEmail) {
      setEmailMessage(true)
      return
    }

    const newStatus = !isChecked

    const resp = await fetch("/api/setEmailPref", {
      method: "POST",
      body: JSON.stringify({
        userId: userId,
        newStatus: newStatus,
      }),
    })

    if (resp.ok) {
      setChecked(newStatus)
    }
  }

  const updateUserEmail = async () => {
    const resp = await fetch("/api/updateUserEmail", {
      method: "POST",
      body: JSON.stringify({ userId: userId, newEmail: email }),
    })

    if (!resp.ok) {
      console.log("Error updating user email")
    }
  }

  return (
    <div class="flex flex-col p-2 space-y-1 w-full">
      <SwitchButton checked={isChecked} updatePref={handleChange} />
      <div>
        {emailMessage && <p class="text-center text-xs">Enter email</p>}
        {!userEmail || editEmail ? (
          <form class="p-1 w-full">
            <input
              type="email"
              class="border-2 border-zinc-600 rounded-lg p-2 shadow-md w-full text-xs"
              placeholder="Email"
              value={email}
              onChange={(e: any) => setEmail(e.target.value)} // eslint-disable-line
            />
            <div>
              <button
                type="submit"
                class="hover:bg-zinc-600 shadow-zinc-600 rounded-lg p-1 text-sm shadow-md
                                transition:ease-in duration-100"
                onClick={() => updateUserEmail()}
              >
                Save
              </button>
              {editEmail && (
                <button
                  type="button"
                  class="hover:bg-zinc-600 shadow-zinc-600 rounded-lg p-1 text-sm shadow-md
                                transition:ease-in duration-100"
                  onClick={() => setEditEmail(false)}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        ) : (
          <div class="flex flex-row justify-center items-center space-x-2">
            <p class="text-center text-xs">{userEmail}</p>
            <button
              type="button"
              onClick={() => setEditEmail(true)}
              class="text-xs underline text-blue-900"
            >
              Edit
            </button>
          </div>
        )}
      </div>
      <div class="p-1 m-auto">
        <button
          type="button"
          class="py-0.5 px-1 text-xs inline-flex justify-center items-center gap-2 rounded-full
                                            bg-zinc-300 border border-zinc-500 text-black hover:bg-zinc-500
                                            dark:bg-zinc-800 dark:text-white
                                            dark:hover:border-white/[.1] dark:hover:text-white"
        >
          i
          <span
            class="hover:opacity-100 hover:visible opacity-0 transition-opacity
                                                absolute z-10 px-2 bg-zinc-900 text-xs font-medium text-white
                                                rounded shadow-sm dark:bg-zinc-700 duration-300 delay-100"
            role="tooltip"
          >
            Emails sent every Fri 9am (GMT)
          </span>
        </button>
      </div>
    </div>
  )
}

export default EmailPreferences
