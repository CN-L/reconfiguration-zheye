import Message from '@/components/Message.vue'
import { createApp } from 'vue'
export type MessageType = 'success' | 'error' | 'default'
const createdMessage = (message: string, type: MessageType, timeOut = 2000) => {
  const messageInstance = createApp(Message, {
    message,
    type
  })
  const rNode = document.createElement('div')
  document.body.appendChild(rNode)
  messageInstance.mount(rNode)
  setTimeout(() => {
    messageInstance.unmount()
    document.body.removeChild(rNode)
  }, timeOut)
}
export default createdMessage
