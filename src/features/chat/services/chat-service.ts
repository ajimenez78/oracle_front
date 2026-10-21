import type { Conversation, Message } from '../types'


const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const createMessage = (role: Message['role'], content: string): Message => ({
  id: crypto.randomUUID(),
  role,
  content,
})

const toTitle = (prompt: string) => (prompt.length > 40 ? `${prompt.slice(0, 40).trimEnd()}…` : prompt)

const db: Array<Conversation & { messages: Message[] }> = [
  {
    id: crypto.randomUUID(),
    title: 'Hola, ¿quién eres?',
    messages: [
      createMessage('user', 'Hola, ¿quién eres?'),
      createMessage('assistant', 'Soy un asistente simulado. Pregúntame lo que quieras.'),
    ],
  },
]

export async function getConversations(): Promise<Conversation[]> {
  await delay(600)
  return db.map(({ id, title }) => ({ id, title }))
}

export async function getMessages(conversationId: string) {
  await delay(800)
  return [...(db.find((conversation) => conversation.id === conversationId)?.messages ?? [])]
}

export async function sendMessage({ conversationId, prompt }: { conversationId?: string; prompt: string }) {
  await delay(1200)

  let conversation = db.find((item) => item.id === conversationId)
  if (!conversation) {
    conversation = { id: crypto.randomUUID(), title: toTitle(prompt), messages: [] }
    db.unshift(conversation)
  }

  const messages = [
    createMessage('user', prompt),
    createMessage('assistant', `Respuesta simulada a: "${prompt}"`),
  ]
  conversation.messages.push(...messages)
  return { conversationId: conversation.id, messages }
}

export async function deleteConversation(conversationId: string) {
  await delay(400)
  const index = db.findIndex((conversation) => conversation.id === conversationId)
  if (index !== -1) db.splice(index, 1)
}
