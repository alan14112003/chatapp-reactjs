import { useQuery } from '@tanstack/react-query'
import { alertErrorAxios } from '@/utils/alert'
import ChatItemSkeleton from '../ChatItemSkeleton'
import { Friend } from '@/types/friendType'
import FriendItem from '../FriendItem'
import FriendServices, { FriendKey } from '@/services/friendServices'

function Friendbar() {
  const {
    data: friendsResponse,
    isSuccess,
    isError,
    error,
    isPending,
    isFetching,
  } = useQuery({
    queryKey: [FriendKey],
    queryFn: FriendServices.all,
    refetchOnMount: true,
  })

  isError && alertErrorAxios(error)

  const friends: Friend[] = friendsResponse?.data
  return (
    <nav className="grid gap-1 px-2">
      {isSuccess &&
        friends.map((friend) => (
          <FriendItem key={friend._id} friend={friend} />
        ))}
      {(isPending || isFetching) &&
        Array(5)
          .fill(0)
          .map((val, index) => <ChatItemSkeleton key={`${val}-${index}`} />)}
    </nav>
  )
}

export default Friendbar
