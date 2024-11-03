import React, { useState, useRef } from 'react';
import { Send, Paperclip, Mic, StopCircle } from 'lucide-react';

interface ChatInputProps {
  onSend: (message: string) => void;
  onUpload?: (file: File) => void;
  isProcessing?: boolean;
}

export function ChatInput({ onSend, onUpload, isProcessing }: ChatInputProps) {
  const [input, setInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSend(input);
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onUpload) {
      onUpload(file);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border-t bg-white p-4 dark:bg-gray-800 dark:border-gray-700">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-end gap-2">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            <Paperclip className="h-5 w-5" />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={handleFileUpload}
            accept=".txt,.md,.pdf,.doc,.docx"
          />
          
          <div className="flex-1 relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              rows={1}
              className="w-full resize-none rounded-lg border border-gray-300 px-4 py-2 pr-12 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              style={{
                minHeight: '44px',
                maxHeight: '200px',
              }}
            />
          </div>

          <button
            type="button"
            onClick={() => setIsRecording(!isRecording)}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            {isRecording ? (
              <StopCircle className="h-5 w-5 text-red-500" />
            ) : (
              <Mic className="h-5 w-5" />
            )}
          </button>

          <button
            type="submit"
            disabled={isProcessing}
            className={`rounded-lg bg-blue-600 p-2 text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </form>
  );
}