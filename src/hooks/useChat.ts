import { useState, useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import type { Message, Model } from '../types/chat';

export function useChat() {
  const [messages, setMessages] = useLocalStorage<Message[]>('chat-messages', []);
  const [isProcessing, setIsProcessing] = useState(false);

  const addMessage = useCallback((message: Message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  }, [setMessages]);

  const updateMessage = useCallback((messageId: string, updates: Partial<Message>) => {
    setMessages((prevMessages) =>
      prevMessages.map((msg) =>
        msg.id === messageId ? { ...msg, ...updates } : msg
      )
    );
  }, [setMessages]);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, [setMessages]);

  const sendMessage = useCallback(async (content: string, model: Model) => {
    setIsProcessing(true);
    const messageId = Date.now().toString();

    const userMessage: Message = {
      id: messageId,
      content,
      role: 'user',
      timestamp: new Date(),
      status: 'sending',
    };

    addMessage(userMessage);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'This is a simulated response.',
        role: 'assistant',
        timestamp: new Date(),
        status: 'sent',
        model,
      };

      addMessage(assistantMessage);
      updateMessage(messageId, { status: 'sent' });
    } catch (error) {
      updateMessage(messageId, { status: 'error' });
      console.error('Error sending message:', error);
    } finally {
      setIsProcessing(false);
    }
  }, [addMessage, updateMessage]);

  return {
    messages,
    isProcessing,
    sendMessage,
    clearMessages,
    updateMessage,
  };
}