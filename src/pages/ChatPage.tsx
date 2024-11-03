import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { ChatMessage } from '../components/ChatMessage';
import { ChatInput } from '../components/ChatInput';
import { Sidebar } from '../components/Sidebar';
import { RAGPanel } from '../components/RAGPanel';
import { DebugPanel } from '../components/DebugPanel';
import { UserSettingsSidebar } from '../components/UserSettingsSidebar';
import { useChat } from '../hooks/useChat';
import { useAuth } from '../hooks/useAuth';
import type { Theme, User } from '../types/chat';

interface ChatPageProps {
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
}

export function ChatPage({ theme, onThemeChange }: ChatPageProps) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { messages, isProcessing, sendMessage } = useChat();
  const [selectedModel, setSelectedModel] = useState('gpt-4');
  const [showSidebar, setShowSidebar] = useState(false);
  const [showUserSettings, setShowUserSettings] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'rag' | 'debug'>('chat');

  const handleSendMessage = async (content: string) => {
    await sendMessage(content, selectedModel);
  };

  const handleSettingsClick = () => {
    navigate('/settings');
  };

  const handleUploadClick = () => {
    // Handle document upload
  };

  const handleUserClick = () => {
    setShowUserSettings(true);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const chatHistory = messages.reduce<Array<{
    id: string;
    title: string;
    date: Date;
    preview: string;
  }>>((acc, msg) => {
    if (msg.role === 'user') {
      acc.push({
        id: msg.id,
        title: msg.content.slice(0, 30) + (msg.content.length > 30 ? '...' : ''),
        date: msg.timestamp,
        preview: msg.content,
      });
    }
    return acc;
  }, []);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex h-screen flex-col bg-gray-50 dark:bg-gray-900">
      <Header
        user={user}
        selectedModel={selectedModel}
        onModelChange={setSelectedModel}
        theme={theme}
        onThemeChange={onThemeChange}
        onSettingsClick={handleSettingsClick}
        onUploadClick={handleUploadClick}
        onUserClick={handleUserClick}
        onLogout={handleLogout}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        isSidebarOpen={showSidebar}
        onSidebarToggle={() => setShowSidebar(!showSidebar)}
      />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          isOpen={showSidebar}
          onClose={() => setShowSidebar(false)}
          chatHistory={chatHistory}
          onChatSelect={() => {}}
        />

        <main className="flex-1 overflow-hidden">
          <div className="flex h-full flex-col">
            {activeTab === 'chat' && (
              <>
                <div className="flex-1 overflow-y-auto p-4">
                  {messages.map((message) => (
                    <ChatMessage key={message.id} message={message} />
                  ))}
                </div>

                <div className="border-t p-4 dark:border-gray-700">
                  <ChatInput
                    onSend={handleSendMessage}
                    isProcessing={isProcessing}
                  />
                </div>
              </>
            )}

            {activeTab === 'rag' && <RAGPanel />}
            
            {activeTab === 'debug' && (
              <DebugPanel onAnalyze={async () => {}} />
            )}
          </div>
        </main>

        <UserSettingsSidebar
          isOpen={showUserSettings}
          onClose={() => setShowUserSettings(false)}
          theme={theme}
          onThemeChange={onThemeChange}
        />
      </div>
    </div>
  );
}