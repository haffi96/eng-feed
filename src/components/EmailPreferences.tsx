import { useState, useEffect } from 'preact/hooks';
import type { ChangeEvent } from 'preact/compat';
import SwitchButton from '@components/switchButton';

const EmailPreferences = ({ email }: { email: string }) => {
    const [isChecked, setChecked] = useState(false);

    useEffect(() => {
        fetch(`/api/getEmailPref?email=${email}`, {
            method: 'GET'
        })
            .then((res) => res.json())
            .then((res) => setChecked(res.emailPref));
    }, []);

    const handleChange = (event: ChangeEvent) => {
        fetch('/api/setEmailPref', {
            method: 'POST',
            body: JSON.stringify({ userEmail: email, enabled: !isChecked }),
        });
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
