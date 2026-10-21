import { useState } from 'react'
import { useConversations, useDeleteConversation, useMessages, useSendMessage } from '../hooks/use-chat'
import { ChatComposer } from './chat-composer'
import { ChatHeader } from './chat-header'
import { Conversation } from './conversation'
import { ConversationSidebar } from './conversation-sidebar'
import { EmptyState } from './empty-state'
import { TypingIndicator } from './typing-indicator'

export function ChatPage() {
  const [activeId, setActiveId] = useState<string>()
  const { data: conversations = [] } = useConversations()
  const { data: messages = [], isLoading } = useMessages(activeId)
  const sendMessage = useSendMessage()
  const deleteConversation = useDeleteConversation()

  const title = conversations.find((conversation) => conversation.id === activeId)?.title
  const pendingPrompt =
    sendMessage.isPending && sendMessage.variables.conversationId === activeId
      ? sendMessage.variables.prompt
      : undefined

  const send = (prompt: string) =>
    sendMessage.mutate(
      { conversationId: activeId, prompt },
      { onSuccess: ({ conversationId }) => setActiveId(conversationId) },
    )

  const remove = (conversationId: string) => {
    deleteConversation.mutate(conversationId)
    if (conversationId === activeId) setActiveId(undefined)
  }

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-1 items-center justify-center">
          <TypingIndicator />
        </div>
      )
    }
    if (!activeId && !pendingPrompt) return <EmptyState onSelectPrompt={send} />
    return <Conversation messages={messages} pendingPrompt={pendingPrompt} />
  }

  return (
    <div className="flex h-dvh bg-background text-foreground">
      <ConversationSidebar activeId={activeId} onSelect={setActiveId} onDelete={remove} />

      <main className="flex min-w-0 flex-1 flex-col">
        <ChatHeader title={title} onNewChat={() => setActiveId(undefined)} />
        {renderContent()}
        <ChatComposer onSend={send} isSending={sendMessage.isPending} />
      </main>
    </div>
  )
}
