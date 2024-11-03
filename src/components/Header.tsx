import React from 'react';
import { Menu, Settings, Upload, Moon, Sun, Code } from 'lucide-react';
import { ModelSelector } from './ModelSelector';
import { HamburgerButton } from './HamburgerButton';
import type { Model, Theme, User } from '../types/chat';

interface HeaderProps {
  user?: User | null;
  selectedModel: Model;
  onModelChange: (model: Model) => void;
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
  onSettingsClick: () => void;
  onUploadClick: () => void;
  onLogout?: () => void;
  onUserClick?: () => void;
  activeTab?: 'chat' | 'rag' | 'debug';
  onTabChange?: (tab: 'chat' | 'rag' | 'debug') => void;
  isSidebarOpen?: boolean;
  onSidebarToggle?: () => void;
}

export function Header({
  user,
  selectedModel,
  onModelChange,
  theme,
  onThemeChange,
  onSettingsClick,
  onUploadClick,
  onLogout,
  onUserClick,
  activeTab = 'chat',
  onTabChange,
  isSidebarOpen = false,
  onSidebarToggle,
}: HeaderProps) {
  return (
    <header className="border-b bg-white p-4 shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <div className="flex items-center gap-4">
          <HamburgerButton
            isOpen={isSidebarOpen}
            onClick={onSidebarToggle}
            className="lg:hidden"
          />
          
          <nav className="flex items-center gap-1">
            <button
              onClick={() => onTabChange?.('chat')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'chat'
                  ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                  : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700'
              }`}
            >
              AI Chat
            </button>
            <button
              onClick={() => onTabChange?.('rag')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'rag'
                  ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                  : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700'
              }`}
            >
              RAG Mode
            </button>
            <button
              onClick={() => onTabChange?.('debug')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'debug'
                  ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                  : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700'
              }`}
            >
              Debug
            </button>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <ModelSelector
            selectedModel={selectedModel}
            onModelChange={onModelChange}
          />
          
          <button
            onClick={onUploadClick}
            className="p-2 hover:bg-gray-100 rounded-lg dark:hover:bg-gray-700"
            title="Upload documents"
          >
            <Upload className="h-5 w-5 dark:text-white" />
          </button>
          
          <button
            onClick={onSettingsClick}
            className="p-2 hover:bg-gray-100 rounded-lg dark:hover:bg-gray-700"
            title="Settings"
          >
            <Settings className="h-5 w-5 dark:text-white" />
          </button>
          
          <button
            onClick={() => onThemeChange(theme === 'light' ? 'dark' : 'light')}
            className="p-2 hover:bg-gray-100 rounded-lg dark:hover:bg-gray-700"
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5 text-white" />
            )}
          </button>

          {user ? (
            <button
              onClick={onUserClick}
              className="flex items-center gap-2 rounded-lg p-1 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <img
                src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}`}
                alt={user.name}
                className="h-8 w-8 rounded-full"
                title={user.name}
              />
              <span className="hidden sm:block text-sm font-medium dark:text-white">
                {user.name}
              </span>
            </button>
          ) : (
            <button
              onClick={onUserClick}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </header>
  );
}