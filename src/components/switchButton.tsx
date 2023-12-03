import type { ChangeEvent } from 'preact/compat';

interface SwitchButtonProps {
    checked: boolean;
    updatePref: (event: ChangeEvent) => void;
}

const SwitchButton = ({ checked, updatePref }: SwitchButtonProps) => {
    return (
        <div class="flex flex-row m-auto justify-center">
            <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" class="sr-only peer" checked={checked} onChange={updatePref} />
                <div class="w-11 h-6 bg-zinc-200 peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-zinc-300
                            dark:peer-focus:ring-zinc-800 rounded-full peer dark:bg-zinc-400
                            peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full
                            peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px]
                            after:start-[2px] after:bg-white after:rounded-full after:h-5
                            after:w-5 after:transition-all peer-checked:bg-zinc-800">
                </div>
                <span class="px-2 text-sm font-medium">Emails?</span>
            </label>
        </div>
    );
};

export default SwitchButton;
