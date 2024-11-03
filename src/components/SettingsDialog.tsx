import React from 'react';
import { X, Volume2, Zap, Shield, Globe } from 'lucide-react';
import type { ChatSettings } from '../types/chat';

interface SettingsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  settings: ChatSettings;
  onSettingsChange: (settings: ChatSettings) => void;
}

export function SettingsDialog({
  isOpen,
  onClose,
  settings,
  onSettingsChange,
}: SettingsDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl dark:bg-gray-800">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold dark:text-white">Settings</h2>
          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <X className="h-5 w-5 dark:text-white" />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <label className="flex items-center gap-2 text-sm font-medium dark:text-white">
              <Volume2 className="h-4 w-4" />
              Temperature
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={settings.temperature}
              onChange={(e) =>
                onSettingsChange({
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
            <label className="flex items-center gap-2 text-sm font-medium dark:text-white">
              <Zap className="h-4 w-4" />
              Max Tokens
            </label>
            <input
              type="number"
              value={settings.maxTokens}
              onChange={(e) =>
                onSettingsChange({
                  ...settings,
                  maxTokens: parseInt(e.target.value),
                })
              }
              className="w-full rounded-lg border border-gray-300 px-3 py-2 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium dark:text-white">
              <Globe className="h-4 w-4" />
              Context Window
            </label>
            <input
              type="number"
              value={settings.contextWindow}
              onChange={(e) =>
                onSettingsChange({
                  ...settings,
                  contextWindow: parseInt(e.target.value),
                })
              }
              className="w-full rounded-lg border border-gray-300 px-3 py-2 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm font-medium dark:text-white">
              <Shield className="h-4 w-4" />
              Stream Response
            </label>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.streamResponse}
                onChange={(e) =>
                  onSettingsChange({
                    ...settings,
                    streamResponse: e.target.checked,
                  })
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}