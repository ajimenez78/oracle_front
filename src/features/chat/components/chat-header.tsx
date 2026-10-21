import { SquarePen } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ChatHeaderProps {
  title?: string
  onNewChat: () => void
}

export function ChatHeader({ title, onNewChat }: ChatHeaderProps) {
  return (
    <header className="flex h-14 shrink-0 items-center justify-between gap-2 border-b px-4">
      <h2 className="truncate text-sm font-medium">{title ?? 'Nuevo chat'}</h2>
      <Button variant="ghost" size="icon" className="md:hidden" aria-label="Nuevo chat" onClick={onNewChat}>
        <SquarePen />
      </Button>
    </header>
  )
}
