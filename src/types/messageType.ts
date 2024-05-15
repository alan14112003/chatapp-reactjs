import MessageTypeEnum from '@/constants/messages/MessageTypeEnum'
import { Auth } from './authType'
import { FileUploadResponse } from './fileUploadType'

export interface Message {
  file?: FileUploadResponse
  image?: FileUploadResponse
  text?: string
  _id: string
  chat: string
  sender: Auth
  type: MessageTypeEnum
}
