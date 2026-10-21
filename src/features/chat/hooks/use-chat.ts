import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { deleteConversation, getConversations, getMessages, sendMessage } from '../services/chat-service'
import type { Message } from '../types'

const chatKeys = {
  conversations: ['chat', 'conversations'],
  messages: (conversationId?: string) => ['chat', 'messages', conversationId],
}

export const useConversations = () =>
  useQuery({ queryKey: chatKeys.conversations, queryFn: getConversations })

export const useMessages = (conversationId?: string) =>
  useQuery({
    queryKey: chatKeys.messages(conversationId),
    queryFn: () => getMessages(conversationId!),
    enabled: !!conversationId,
  })

export function useSendMessage() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: sendMessage,
    onSuccess: ({ conversationId, messages }) => {
      queryClient.setQueryData<Message[]>(chatKeys.messages(conversationId), (old = []) => [...old, ...messages])
      queryClient.invalidateQueries({ queryKey: chatKeys.conversations })
    },
  })
}

export function useDeleteConversation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteConversation,
    onSuccess: (_, conversationId) => {
      queryClient.removeQueries({ queryKey: chatKeys.messages(conversationId) })
      queryClient.invalidateQueries({ queryKey: chatKeys.conversations })
    },
  })
}
