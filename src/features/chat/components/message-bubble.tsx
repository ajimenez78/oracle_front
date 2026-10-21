import { Sparkles } from 'lucide-react'
import type { Message } from '../types'
import { TypingIndicator } from './typing-indicator'

interface MessageBubbleProps {
  role: Message['role']
  content?: string
}

export function MessageBubble({ role, content }: MessageBubbleProps) {
  if (role === 'user') {
    return (
      <div className="flex justify-end">
        <div className="max-w-[80%] rounded-3xl bg-muted px-4 py-2.5 whitespace-pre-wrap break-words">
          {content}
        </div>
      </div>
    )
  }

  return (
    <div className="flex gap-3">
      <div className="flex size-8 shrink-0 items-center justify-center rounded-full border bg-background">
        <Sparkles className="size-4" />
      </div>
      <div className="min-w-0 flex-1 pt-1 leading-relaxed whitespace-pre-wrap break-words">
        {content ?? <TypingIndicator />}
      </div>
    </div>
  )
}
