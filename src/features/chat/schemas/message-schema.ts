import { z } from 'zod'

export const MESSAGE_MAX_LENGTH = 2000

export const messageSchema = z.object({
  prompt: z
    .string()
    .trim()
    .min(1, 'Escribe un mensaje')
    .max(MESSAGE_MAX_LENGTH, `Máximo ${MESSAGE_MAX_LENGTH} caracteres`),
})

export type MessageFormValues = z.infer<typeof messageSchema>
