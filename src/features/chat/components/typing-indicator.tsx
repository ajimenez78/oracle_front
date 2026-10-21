export function TypingIndicator() {
  return (
    <div role="status" aria-label="Generando respuesta" className="flex h-6 items-center gap-1">
      <span className="size-2 animate-bounce rounded-full bg-muted-foreground/60 [animation-delay:-0.3s]" />
      <span className="size-2 animate-bounce rounded-full bg-muted-foreground/60 [animation-delay:-0.15s]" />
      <span className="size-2 animate-bounce rounded-full bg-muted-foreground/60" />
    </div>
  )
}
