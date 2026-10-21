import { useEffect, useRef } from 'react'
import type { Message } from '../types'
import { MessageBubble } from './message-bubble'

interface ConversationProps {
  messages: Message[]
  pendingPrompt?: string
}

export function Conversation({ messages, pendingPrompt }: ConversationProps) {
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [messages, pendingPrompt])

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-8">
        {messages.map((message) => (
          <MessageBubble key={message.id} role={message.role} content={message.content} />
        ))}

        {/* Optimistic prompt + loader until the API answers */}
        {pendingPrompt && (
          <>
            <MessageBubble role="user" content={pendingPrompt} />
            <MessageBubble role="assistant" />
          </>
        )}
        <div ref={endRef} />
      </div>
    </div>
  )
}
