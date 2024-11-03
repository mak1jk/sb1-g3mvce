import React from 'react';
import type { Model } from '../types/chat';
import { Cpu } from 'lucide-react';

interface ModelSelectorProps {
  selectedModel: Model;
  onModelChange: (model: Model) => void;
}

export function ModelSelector({ selectedModel, onModelChange }: ModelSelectorProps) {
  const models: Model[] = ['gpt-4', 'gpt-3.5-turbo', 'claude-2', 'palm-2'];

  return (
    <div className="flex items-center gap-2">
      <Cpu className="h-4 w-4 text-gray-500 dark:text-gray-400" />
      <select
        value={selectedModel}
        onChange={(e) => onModelChange(e.target.value as Model)}
        className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      >
        {models.map((model) => (
          <option key={model} value={model}>
            {model}
          </option>
        ))}
      </select>
    </div>
  );
}