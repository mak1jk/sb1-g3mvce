import React from 'react';
import { Bot, User, AlertCircle, Clock } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import type { Message } from '../types/chat';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';
  
  const StatusIcon = () => {
    switch (message.status) {
      case 'sending':
        return <Clock className="h-4 w-4 text-gray-400 animate-pulse" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className={`flex gap-4 p-4 ${
      isUser ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-900'
    }`}>
      <div className={`flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full ${
        isUser ? 'bg-blue-600' : 'bg-green-600'
      }`}>
        {isUser ? (
          <User className="h-5 w-5 text-white" />
        ) : (
          <Bot className="h-5 w-5 text-white" />
        )}
      </div>
      <div className="flex-1 space-y-2">
        <div className="prose prose-sm max-w-none dark:prose-invert">
          <ReactMarkdown
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={oneDark}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              }
            }}
          >
            {message.content}
          </ReactMarkdown>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <StatusIcon />
          <span>{new Date(message.timestamp).toLocaleTimeString()}</span>
          {message.metadata && (
            <span className="text-gray-400">
              ({message.metadata.tokens} tokens, {message.metadata.processingTime}ms)
            </span>
          )}
        </div>
      </div>
    </div>
  );
}