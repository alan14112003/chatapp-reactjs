import http from '@/utils/http'

const PREV_URL = '/chats'
export const ChatKey = 'chats'

const ChatServices = {
  all: () => {
    return http.get(PREV_URL)
  },
}

export default ChatServices
