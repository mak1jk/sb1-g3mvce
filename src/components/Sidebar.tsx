import React, { useEffect, useRef } from 'react';
import { X, MessageSquare, ChevronRight } from 'lucide-react';
import { useSwipeable } from 'react-swipeable';

interface ChatHistoryItem {
  id: string;
  title: string;
  date: Date;
  preview: string;
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  chatHistory: ChatHistoryItem[];
  onChatSelect: (id: string) => void;
  selectedChatId?: string;
}

export function Sidebar({
  isOpen,
  onClose,
  chatHistory,
  onChatSelect,
  selectedChatId,
}: SidebarProps) {
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  const handlers = useSwipeable({
    onSwipedLeft: onClose,
    trackMouse: false,
  });

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 transition-opacity duration-300 ease-in-out z-40
          ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        aria-hidden="true"
      />

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        {...handlers}
        className={`fixed top-0 left-0 h-full w-80 bg-white dark:bg-gray-800 shadow-xl z-50 
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
        role="dialog"
        aria-modal="true"
        aria-label="Chat history sidebar"
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b p-4 dark:border-gray-700">
            <h2 className="text-lg font-semibold dark:text-white">Chat History</h2>
            <button
              onClick={onClose}
              className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label="Close sidebar"
            >
              <X className="h-5 w-5 dark:text-white" />
            </button>
          </div>

          {/* Chat List */}
          <div className="flex-1 overflow-y-auto p-4">
            {chatHistory.length === 0 ? (
              <p className="text-center text-gray-500 dark:text-gray-400">
                No chat history yet
              </p>
            ) : (
              <div className="space-y-2">
                {chatHistory.map((chat) => (
                  <button
                    key={chat.id}
                    onClick={() => onChatSelect(chat.id)}
                    className={`w-full rounded-lg p-3 text-left transition-colors
                      ${
                        selectedChatId === chat.id
                          ? 'bg-blue-50 dark:bg-blue-900/20'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <MessageSquare className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                        <div>
                          <h3 className="font-medium dark:text-white">
                            {chat.title}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {new Date(chat.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </div>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                      {chat.preview}
                    </p>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}