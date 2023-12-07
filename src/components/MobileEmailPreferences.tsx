import { useState, useEffect } from 'preact/hooks';
import type { ChangeEvent, TargetedEvent } from 'preact/compat';
import SwitchButton from '@components/switchButton';

const MobileEmailPreferences = ({ userId, userEmail }: { userId: string, userEmail: string | undefined }) => {
    const [isChecked, setChecked] = useState(false);
    const [email, setEmail] = useState(userEmail);
    const [editEmail, setEditEmail] = useState(false);
    const [emailMessage, setEmailMessage] = useState(false);

    useEffect(() => {
        fetch(`/api/getEmailPref?userId=${userId}`, {
            method: 'GET'
        })
            .then((res) => res.json())
            .then((res) => {
                setChecked(res.emailPref)
            });
    }, []);

    const updateUserEmail = async () => {
        const resp = await fetch('/api/updateUserEmail', {
            method: 'POST',
            body: JSON.stringify({ userId: userId, newEmail: email }),
        });

        if (!resp.ok) {
            console.log("Error updating user email");
        }
    }

    const handleChange = async (event: ChangeEvent) => {
        if (!userEmail) {
            setEmailMessage(true);
            return;
        }

        const resp = await fetch('/api/setEmailPref', {
            method: 'POST',
            body: JSON.stringify({ userId: userId }),
        });

        if (resp.ok) {
            setChecked(!isChecked);
        }
    };

    return (
        <div class="flex flex-col p-2 space-y-1">
            <SwitchButton
                checked={isChecked}
                updatePref={handleChange}
            />
            <div>
                {emailMessage && <p class="text-center text-xs">Enter email</p>}
                {
                    !userEmail || editEmail ? (
                        <form class="p-1 w-full">
                            <input
                                type="email"
                                class="border-2 border-zinc-600 rounded-lg p-2 shadow-md w-full text-xs"
                                placeholder="Email"
                                value={email}
                                onChange={(e: any) => setEmail(e.target.value)}
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
                                {editEmail && <button
                                    type="button"
                                    class="hover:bg-zinc-600 shadow-zinc-600 rounded-lg p-1 text-sm shadow-md
                                transition:ease-in duration-100"
                                    onClick={() => setEditEmail(false)}
                                >
                                    Cancel
                                </button>}
                            </div>
                        </form>
                    ) : (
                        <div class="flex flex-row justify-center items-center space-x-2">
                            <p class="text-center text-xs">{userEmail}</p>
                            <button
                                type="button"
                                onClick={() => setEditEmail(true)}
                                class="text-xs underline text-blue-900"
                            >Edit</button>
                        </div>
                    )
                }
            </div>
            <p class="text-xs">Emails sent every Fri 9am (GMT)</p>
        </div>
    );
};

export default MobileEmailPreferences;
