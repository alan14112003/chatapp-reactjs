import FriendEvent from '@/constants/events/FriendEvent'
import { Friend } from '@/types/friendType'
import { socket } from '@/utils/socket'
import { ReactNode, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

type EventProviderProp = {
  children: ReactNode
}
const EventProvider = ({ children }: EventProviderProp) => {
  const navigate = useNavigate()
  const { chatId } = useParams()

  const handleAddFriend = (friend: Friend) => {
    const redirectUrl = `/friends${
      chatId ? `/${chatId}` : ''
    }?tab=friend-request`

    if (typeof friend.userFromId !== 'string') {
      toast.info(`${friend.userFromId.fullName} đã gửi lời mời kết bạn cho bạn`)
    }
    navigate(redirectUrl)
  }

  const handleAcceptFriend = (friend: Friend) => {
    const redirectUrl = `/chats${chatId ? `/${chatId}` : ''}`

    if (typeof friend.userToId !== 'string') {
      toast.info(
        `${friend.userToId.fullName} đã chấp nhận lời mời kết bạn của bạn`
      )
    }
    navigate(redirectUrl)
  }

  useEffect(() => {
    socket.on(FriendEvent.ADD, handleAddFriend)
    socket.on(FriendEvent.ACCEPT, handleAcceptFriend)

    return () => {
      socket.off(FriendEvent.ADD, handleAddFriend)
      socket.off(FriendEvent.ACCEPT, handleAcceptFriend)
    }
  }, [])

  return <>{children}</>
}

export default EventProvider
