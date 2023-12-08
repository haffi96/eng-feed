import type { Session } from "lucia"
const UserInfo = ({ session }: { session: Session }) => {
  return <div>{session.user?.username}</div>
}

export default UserInfo
