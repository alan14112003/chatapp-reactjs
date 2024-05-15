import { SquarePen } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'

import { Link } from 'react-router-dom'
import { cn } from '@/utils/utils'
import { useQuery } from '@tanstack/react-query'
import ChatServices, { ChatKey } from '@/services/chatServices'
import { Chat } from '@/types/chatType'
import { alertErrorAxios } from '@/utils/alert'
import ChatItem from '../ChatItem'
import ChatItemSkeleton from '../ChatItemSkeleton'

function Chatbar() {
  const {
    data: chatsResponse,
    isSuccess,
    isError,
    error,
    isPending,
    isFetching,
  } = useQuery({
    queryKey: [ChatKey],
    queryFn: ChatServices.all,
    refetchOnMount: true,
  })

  isError && alertErrorAxios(error)

  const chats: Chat[] = chatsResponse?.data
  return (
    <>
      <div className="flex justify-between p-2 items-center">
        <div className="flex gap-2 items-center text-2xl">
          <p className="font-medium">Chats</p>
          <span className="text-zinc-300">({isSuccess && chats.length})</span>
        </div>

        <div>
          <Link
            to={''}
            className={cn(
              buttonVariants({ variant: 'secondary', size: 'icon' }),
              'h-9 w-9'
            )}
          >
            <SquarePen size={20} />
          </Link>
        </div>
      </div>

      <nav className="grid gap-1 px-2">
        {isSuccess &&
          chats.map((chat) => <ChatItem key={chat._id} chat={chat} />)}
        {(isPending || isFetching) &&
          Array(5)
            .fill(0)
            .map((val, index) => <ChatItemSkeleton key={`${val}-${index}`} />)}
      </nav>
    </>
  )
}

export default Chatbar
