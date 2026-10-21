import { Sparkles } from 'lucide-react'

const SUGGESTIONS = [
  'Explícame qué es React Query',
  'Ideas para un proyecto de fin de semana',
  'Cómo estructurar una app por features',
  'Dame un consejo de productividad',
]

interface EmptyStateProps {
  onSelectPrompt: (prompt: string) => void
}

export function EmptyState({ onSelectPrompt }: EmptyStateProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-8 px-4">
      <div className="flex flex-col items-center gap-3 text-center">
        <div className="flex size-12 items-center justify-center rounded-full border">
          <Sparkles className="size-6" />
        </div>
        <h1 className="text-2xl font-semibold">¿En qué puedo ayudarte?</h1>
      </div>

      <div className="grid w-full max-w-2xl gap-2 sm:grid-cols-2">
        {SUGGESTIONS.map((suggestion) => (
          <button
            key={suggestion}
            type="button"
            onClick={() => onSelectPrompt(suggestion)}
            className="rounded-xl border px-4 py-3 text-left text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  )
}
