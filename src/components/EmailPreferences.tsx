import { useState, useEffect } from 'preact/hooks';
import type { ChangeEvent } from 'preact/compat';
import SwitchButton from '@components/switchButton';

const EmailPreferences = ({ email }: { email: string }) => {
    const [isChecked, setChecked] = useState(false);

    useEffect(() => {
        // Check if user has a preference saved in local storage
        const userPref = localStorage.getItem('emailPref');

        if (userPref) {
            setChecked(userPref === 'true');
        } else {
        // If no preference saved, check if user has a preference in the database
        fetch(`/api/getEmailPref?email=${email}`, {
            method: 'GET'
        })
            .then((res) => res.json())
                .then((res) => {
                    localStorage.setItem('emailPref', res.emailPref);
                    setChecked(res.emailPref)
                });
        }
    }, []);

    const handleChange = async (event: ChangeEvent) => {
        const resp = await fetch('/api/setEmailPref', {
            method: 'POST',
            body: JSON.stringify({ userEmail: email, enabled: !isChecked }),
        });

        if (resp.ok) {
            localStorage.setItem('emailPref', String(!isChecked));
            setChecked(!isChecked);
        }
    };

    return (
        <div class="p-2">
            <SwitchButton
                checked={isChecked}
                updatePref={handleChange}
            />
        </div>
    );
};

export default EmailPreferences;
