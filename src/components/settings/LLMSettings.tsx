import React, { useState } from 'react';
import { Key, Zap, Sliders, Play, Save, AlertCircle, CheckCircle } from 'lucide-react';
import type { ChatSettings, CodeRAGSettings, Model } from '../../types/chat';
import { useApiKeys } from '../../hooks/useApiKeys';
import { useSettings } from '../../hooks/useSettings';

const defaultSettings: ChatSettings & { codeRAG: CodeRAGSettings } = {
  temperature: 0.7,
  maxTokens: 2048,
  contextWindow: 4096,
  streamResponse: true,
  notifications: {
    sound: true,
    desktop: true,
    email: false,
  },
  codeRAG: {
    embeddingModel: 'codebert',
    chunkSize: 500,
    overlap: 50,
    graphType: 'dependency',
    similarityThreshold: 0.7,
    maxContextSize: 4096,
  },
};

interface LLMSettingsProps {
  settings?: ChatSettings & { codeRAG: CodeRAGSettings };
}

export function LLMSettings({ settings = defaultSettings }: LLMSettingsProps) {
  const { apiKeys, updateApiKey, testConnection, isLoading } = useApiKeys();
  const { updateSettings } = useSettings();
  const [customEndpoint, setCustomEndpoint] = useState('');
  const [selectedModel, setSelectedModel] = useState<Model>('gpt-4');
  const [testStatus, setTestStatus] = useState<Record<string, boolean>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [showSavedMessage, setShowSavedMessage] = useState(false);

  const handleTestConnection = async (provider: string) => {
    const success = await testConnection(provider as keyof typeof apiKeys);
    setTestStatus((prev) => ({ ...prev, [provider]: success }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      updateSettings({
        ...settings,
        temperature: settings.temperature,
        maxTokens: settings.maxTokens,
        contextWindow: settings.contextWindow,
      });
      
      setShowSavedMessage(true);
      setTimeout(() => setShowSavedMessage(false), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Zap className="h-6 w-6 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-medium dark:text-white">LLM Integration</h2>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
        >
          <Save className="h-4 w-4" />
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {showSavedMessage && (
        <div className="mb-4 rounded-lg bg-green-50 p-4 text-green-700 dark:bg-green-900/20 dark:text-green-400">
          Settings saved successfully!
        </div>
      )}

      <div className="space-y-8">
        <div>
          <h3 className="text-sm font-medium dark:text-white mb-4">
            <div className="flex items-center gap-2">
              <Key className="h-4 w-4" />
              API Keys
            </div>
          </h3>
          <div className="space-y-4">
            {['openai', 'anthropic', 'google'].map((provider) => (
              <div key={provider} className="space-y-2">
                <label className="block text-sm font-medium dark:text-white capitalize">
                  {provider} API Key
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="password"
                      value={apiKeys[provider as keyof typeof apiKeys] || ''}
                      onChange={(e) =>
                        updateApiKey(provider as keyof typeof apiKeys, e.target.value)
                      }
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 pr-10 dark:bg-gray-700 dark:border-gray-600"
                      placeholder={`Enter ${provider} API key`}
                    />
                    <Key className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
                  </div>
                  <button
                    onClick={() => handleTestConnection(provider)}
                    className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700"
                  >
                    {testStatus[provider] === undefined ? (
                      <Play className="h-4 w-4" />
                    ) : testStatus[provider] ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-red-500" />
                    )}
                    Test
                  </button>
                </div>
              </div>
            ))}

            <div>
              <label className="block text-sm font-medium mb-2 dark:text-white">
                Custom OpenAI-compatible Endpoint
              </label>
              <input
                type="url"
                value={customEndpoint}
                onChange={(e) => setCustomEndpoint(e.target.value)}
                placeholder="https://api.example.com/v1"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium dark:text-white mb-4">
            <div className="flex items-center gap-2">
              <Sliders className="h-4 w-4" />
              Model Settings
            </div>
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 dark:text-white">
                Default Model
              </label>
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value as Model)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 dark:bg-gray-700 dark:border-gray-600"
              >
                <option value="gpt-4">GPT-4</option>
                <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                <option value="claude-2">Claude 2</option>
                <option value="palm-2">PaLM 2</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 dark:text-white">
                Temperature
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={settings.temperature}
                onChange={(e) =>
                  updateSettings({
                    ...settings,
                    temperature: parseFloat(e.target.value),
                  })
                }
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>Precise</span>
                <span>{settings.temperature}</span>
                <span>Creative</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 dark:text-white">
                Max Tokens
              </label>
              <input
                type="number"
                value={settings.maxTokens}
                onChange={(e) =>
                  updateSettings({
                    ...settings,
                    maxTokens: parseInt(e.target.value),
                  })
                }
                className="w-full rounded-lg border border-gray-300 px-3 py-2 dark:bg-gray-700 dark:border-gray-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 dark:text-white">
                Context Window
              </label>
              <input
                type="number"
                value={settings.contextWindow}
                onChange={(e) =>
                  updateSettings({
                    ...settings,
                    contextWindow: parseInt(e.target.value),
                  })
                }
                className="w-full rounded-lg border border-gray-300 px-3 py-2 dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}