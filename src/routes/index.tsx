import { createFileRoute } from '@tanstack/react-router'
import { ChatPage } from '@/features/chat'

export const Route = createFileRoute('/')({
  component: ChatPage,
})
