import React from 'react';
import { X, Settings, Database, Brain, Moon, Globe, Layout, Upload, Key, Sliders, MessageSquare } from 'lucide-react';
import type { Theme } from '../types/chat';

interface UserSettingsSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
}

export function UserSettingsSidebar({
  isOpen,
  onClose,
  theme,
  onThemeChange,
}: UserSettingsSidebarProps) {
  const [activeTab, setActiveTab] = React.useState<'website'|'rag'|'llm'>('website');
  const [language, setLanguage] = React.useState('en');
  const [density, setDensity] = React.useState('comfortable');
  const [chunkSize, setChunkSize] = React.useState(500);
  const [overlap, setOverlap] = React.useState(50);
  const [embeddingModel, setEmbeddingModel] = React.useState('openai');
  const [apiKeys, setApiKeys] = React.useState({
    openai: '',
    anthropic: '',
    google: '',
  });

  const handleApiKeyChange = (provider: keyof typeof apiKeys, value: string) => {
    setApiKeys(prev => ({ ...prev, [provider]: value }));
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'website':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2 dark:text-white">Theme</label>
              <select
                value={theme}
                onChange={(e) => onThemeChange(e.target.value as Theme)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 dark:bg-gray-700 dark:border-gray-600"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="system">System</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 dark:text-white">Language</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 dark:bg-gray-700 dark:border-gray-600"
              >
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 dark:text-white">Display Density</label>
              <select
                value={density}
                onChange={(e) => setDensity(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 dark:bg-gray-700 dark:border-gray-600"
              >
                <option value="comfortable">Comfortable</option>
                <option value="compact">Compact</option>
                <option value="spacious">Spacious</option>
              </select>
            </div>
          </div>
        );

      case 'rag':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2 dark:text-white">Document Upload</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center dark:border-gray-600">
                <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Drag & drop files or click to upload
                </p>
                <input type="file" className="hidden" multiple accept=".pdf,.doc,.docx,.txt" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 dark:text-white">
                Chunk Size (tokens)
              </label>
              <input
                type="number"
                value={chunkSize}
                onChange={(e) => setChunkSize(Number(e.target.value))}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 dark:bg-gray-700 dark:border-gray-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 dark:text-white">
                Overlap (tokens)
              </label>
              <input
                type="number"
                value={overlap}
                onChange={(e) => setOverlap(Number(e.target.value))}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 dark:bg-gray-700 dark:border-gray-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 dark:text-white">
                Embedding Model
              </label>
              <select
                value={embeddingModel}
                onChange={(e) => setEmbeddingModel(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 dark:bg-gray-700 dark:border-gray-600"
              >
                <option value="openai">OpenAI Ada 2</option>
                <option value="cohere">Cohere Embed</option>
                <option value="local">Local Mini LM</option>
              </select>
            </div>
          </div>
        );

      case 'llm':
        return (
          <div className="space-y-6">
            {Object.entries(apiKeys).map(([provider, key]) => (
              <div key={provider}>
                <label className="block text-sm font-medium mb-2 dark:text-white capitalize">
                  {provider} API Key
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={key}
                    onChange={(e) => handleApiKeyChange(provider as keyof typeof apiKeys, e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 pr-10 dark:bg-gray-700 dark:border-gray-600"
                    placeholder={`Enter ${provider} API key`}
                  />
                  <Key className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
                </div>
              </div>
            ))}

            <div className="border-t pt-6 dark:border-gray-700">
              <label className="block text-sm font-medium mb-4 dark:text-white">
                Default Model Selection
              </label>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-2 dark:text-white">OpenAI</h4>
                  <select className="w-full rounded-lg border border-gray-300 px-3 py-2 dark:bg-gray-700 dark:border-gray-600">
                    <option value="gpt-4">GPT-4</option>
                    <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                  </select>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-2 dark:text-white">Anthropic</h4>
                  <select className="w-full rounded-lg border border-gray-300 px-3 py-2 dark:bg-gray-700 dark:border-gray-600">
                    <option value="claude-3-opus">Claude 3 Opus</option>
                    <option value="claude-3-sonnet">Claude 3 Sonnet</option>
                  </select>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-2 dark:text-white">Google AI</h4>
                  <select className="w-full rounded-lg border border-gray-300 px-3 py-2 dark:bg-gray-700 dark:border-gray-600">
                    <option value="gemini-pro">Gemini Pro</option>
                    <option value="gemini-ultra">Gemini Ultra</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="border-t pt-6 dark:border-gray-700">
              <label className="block text-sm font-medium mb-2 dark:text-white">
                System Prompt
              </label>
              <textarea
                rows={4}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 dark:bg-gray-700 dark:border-gray-600"
                placeholder="Enter system prompt..."
              />
            </div>
          </div>
        );
    }
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 transition-opacity duration-300 z-40
          ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      <div
        className={`fixed top-0 right-0 h-full w-96 max-w-full bg-white dark:bg-gray-800 shadow-xl transform transition-transform duration-300 ease-in-out z-50
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b p-4 dark:border-gray-700">
            <h2 className="text-xl font-semibold dark:text-white">Settings</h2>
            <button
              onClick={onClose}
              className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <X className="h-5 w-5 dark:text-white" />
            </button>
          </div>

          <div className="border-b dark:border-gray-700">
            <div className="flex divide-x dark:divide-gray-700">
              <button
                onClick={() => setActiveTab('website')}
                className={`flex-1 p-3 text-sm font-medium ${
                  activeTab === 'website'
                    ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <Settings className="h-4 w-4 mx-auto mb-1" />
                Website
              </button>
              <button
                onClick={() => setActiveTab('rag')}
                className={`flex-1 p-3 text-sm font-medium ${
                  activeTab === 'rag'
                    ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <Database className="h-4 w-4 mx-auto mb-1" />
                RAG
              </button>
              <button
                onClick={() => setActiveTab('llm')}
                className={`flex-1 p-3 text-sm font-medium ${
                  activeTab === 'llm'
                    ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <Brain className="h-4 w-4 mx-auto mb-1" />
                LLM
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {renderContent()}
          </div>
        </div>
      </div>
    </>
  );
}