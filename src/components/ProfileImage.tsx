// import type { Session } from "@auth/core/types";

const ProfileImage = ({ session }: { session: any }) => {
    return (
        <div>
            {session.user?.image ? (
                <img
                    class="rounded-full w-20 h-20 mx-auto p-2"
                    src={session.user.image}
                    alt="User profile picture"
                />
            ) : null}
        </div >
    )
}

export default ProfileImage;