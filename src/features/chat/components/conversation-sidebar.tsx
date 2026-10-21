import { MessageSquare, SquarePen, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useConversations } from '../hooks/use-chat'

interface ConversationSidebarProps {
  activeId?: string
  onSelect: (conversationId?: string) => void
  onDelete: (conversationId: string) => void
}

export function ConversationSidebar({ activeId, onSelect, onDelete }: ConversationSidebarProps) {
  const { data: conversations = [], isLoading } = useConversations()

  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r bg-muted/30 md:flex">
      <div className="p-3">
        <Button variant="ghost" className="w-full justify-start" onClick={() => onSelect(undefined)}>
          <SquarePen data-icon="inline-start" />
          Nuevo chat
        </Button>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 pb-3">
        {isLoading ? (
          <div className="flex flex-col gap-2 px-2">
            {[1, 2, 3].map((item) => (
              <div key={item} className="h-6 animate-pulse rounded bg-muted" />
            ))}
          </div>
        ) : conversations.length === 0 ? (
          <p className="px-2 py-4 text-sm text-muted-foreground">Aún no hay conversaciones</p>
        ) : (
          <ul className="flex flex-col gap-0.5">
            {conversations.map((conversation) => (
              <li key={conversation.id} className="group relative">
                <button
                  type="button"
                  onClick={() => onSelect(conversation.id)}
                  aria-current={conversation.id === activeId ? 'page' : undefined}
                  className={cn(
                    'flex w-full items-center gap-2 rounded-lg px-2 py-2 pr-9 text-left text-sm transition-colors hover:bg-muted',
                    conversation.id === activeId && 'bg-muted font-medium',
                  )}
                >
                  <MessageSquare className="size-4 shrink-0 text-muted-foreground" />
                  <span className="truncate">{conversation.title}</span>
                </button>

                <Button
                  variant="ghost"
                  size="icon-xs"
                  aria-label={`Eliminar "${conversation.title}"`}
                  onClick={() => onDelete(conversation.id)}
                  className="absolute top-1/2 right-1.5 -translate-y-1/2 opacity-0 group-hover:opacity-100 focus-visible:opacity-100"
                >
                  <Trash2 />
                </Button>
              </li>
            ))}
          </ul>
        )}
      </nav>
    </aside>
  )
}
