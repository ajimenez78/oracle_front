import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowUp, LoaderCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Field, FieldError } from '@/components/ui/field'
import { Textarea } from '@/components/ui/textarea'
import { MESSAGE_MAX_LENGTH, messageSchema, type MessageFormValues } from '../schemas/message-schema'

interface ChatComposerProps {
  onSend: (prompt: string) => void
  isSending: boolean
}

export function ChatComposer({ onSend, isSending }: ChatComposerProps) {
  const form = useForm<MessageFormValues>({
    resolver: zodResolver(messageSchema),
    defaultValues: { prompt: '' },
    mode: 'onChange',
  })

  const length = useWatch({ control: form.control, name: 'prompt' }).length
  const error = form.formState.errors.prompt
  const canSend = form.formState.isValid && !isSending

  const submit = form.handleSubmit(({ prompt }) => {
    onSend(prompt)
    form.reset()
  })

  return (
    <form onSubmit={submit} className="mx-auto w-full max-w-3xl px-4 pb-4">
      <Field data-invalid={!!error}>
        <div className="relative rounded-3xl border bg-background shadow-sm transition-shadow focus-within:ring-3 focus-within:ring-ring/30">
          <Textarea
            {...form.register('prompt')}
            rows={1}
            autoFocus
            placeholder="Pregunta lo que quieras"
            aria-label="Mensaje"
            aria-invalid={!!error}
            onKeyDown={(event) => {
              // Enter sends, Shift+Enter adds a new line
              if (event.key !== 'Enter' || event.shiftKey || event.nativeEvent.isComposing) return
              event.preventDefault()
              if (canSend) submit()
            }}
            className="max-h-52 min-h-14 resize-none overflow-y-auto border-0 bg-transparent px-5 py-4 pr-14 shadow-none focus-visible:ring-0 dark:bg-transparent"
          />

          <Button
            type="submit"
            size="icon"
            disabled={!canSend}
            aria-label="Enviar mensaje"
            className="absolute right-3 bottom-3 rounded-full"
          >
            {isSending ? <LoaderCircle className="animate-spin" /> : <ArrowUp />}
          </Button>
        </div>

        <div className="flex min-h-5 items-center justify-between gap-2 px-3 text-xs">
          <FieldError errors={length > 0 ? [error] : undefined} />
          {length > MESSAGE_MAX_LENGTH * 0.8 && (
            <span className={length > MESSAGE_MAX_LENGTH ? 'ml-auto text-destructive' : 'ml-auto text-muted-foreground'}>
              {length}/{MESSAGE_MAX_LENGTH}
            </span>
          )}
        </div>
      </Field>

      <p className="text-center text-xs text-muted-foreground">Respuestas simuladas, sin backend.</p>
    </form>
  )
}
