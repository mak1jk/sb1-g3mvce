import React from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { SettingsTabs } from '../components/SettingsTabs';
import { ProfileSettings } from '../components/settings/ProfileSettings';
import { GeneralSettings } from '../components/settings/GeneralSettings';
import { RAGSettings } from '../components/settings/RAGSettings';
import { DebugSettings } from '../components/settings/DebugSettings';
import { LLMSettings } from '../components/settings/LLMSettings';
import type { User, Theme, ChatSettings, CodeRAGSettings } from '../types/chat';

interface SettingsPageProps {
  user: User;
  settings: ChatSettings & { codeRAG: CodeRAGSettings };
  onSettingsChange: (settings: ChatSettings & { codeRAG: CodeRAGSettings }) => void;
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
  onLogout: () => void;
}

export function SettingsPage({
  user,
  settings,
  onSettingsChange,
  theme,
  onThemeChange,
  onLogout,
}: SettingsPageProps) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/chat')}
              className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <ArrowLeft className="h-5 w-5 dark:text-white" />
            </button>
            <h1 className="text-xl font-semibold dark:text-white">Settings</h1>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
          <SettingsTabs />
          
          <div className="p-6">
            <Routes>
              <Route 
                path="profile" 
                element={
                  <ProfileSettings 
                    user={user}
                    onLogout={onLogout}
                  />
                } 
              />
              <Route 
                path="general" 
                element={
                  <GeneralSettings
                    theme={theme}
                    onThemeChange={onThemeChange}
                  />
                } 
              />
              <Route 
                path="rag" 
                element={
                  <RAGSettings
                    settings={settings}
                    onSettingsChange={onSettingsChange}
                  />
                } 
              />
              <Route 
                path="debug" 
                element={
                  <DebugSettings
                    settings={settings}
                    onSettingsChange={onSettingsChange}
                  />
                } 
              />
              <Route 
                path="llm" 
                element={
                  <LLMSettings
                    settings={settings}
                  />
                } 
              />
              <Route 
                path="*" 
                element={<Navigate to="/settings/profile" replace />} 
              />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}