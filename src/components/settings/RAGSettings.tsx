import React from 'react';
import { Database, FileText, Settings2 } from 'lucide-react';
import type { ChatSettings, CodeRAGSettings } from '../../types/chat';

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

interface RAGSettingsProps {
  settings?: ChatSettings & { codeRAG: CodeRAGSettings };
  onSettingsChange: (settings: ChatSettings & { codeRAG: CodeRAGSettings }) => void;
}

export function RAGSettings({ 
  settings = defaultSettings,
  onSettingsChange 
}: RAGSettingsProps) {
  const handleRAGSettingChange = (
    key: keyof CodeRAGSettings,
    value: string | number
  ) => {
    onSettingsChange({
      ...settings,
      codeRAG: {
        ...settings.codeRAG,
        [key]: value,
      },
    });
  };

  return (
    <div className="max-w-2xl">
      <h2 className="text-lg font-medium dark:text-white mb-6">RAG Configuration</h2>

      <div className="space-y-8">
        <div>
          <h3 className="text-sm font-medium dark:text-white mb-4">
            <div className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              Vector Store Settings
            </div>
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 dark:text-white">
                Embedding Model
              </label>
              <select
                value={settings.codeRAG.embeddingModel}
                onChange={(e) =>
                  handleRAGSettingChange('embeddingModel', e.target.value)
                }
                className="w-full rounded-lg border border-gray-300 px-3 py-2 dark:bg-gray-700 dark:border-gray-600"
              >
                <option value="codebert">CodeBERT</option>
                <option value="graphcodebert">GraphCodeBERT</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 dark:text-white">
                Graph Type
              </label>
              <select
                value={settings.codeRAG.graphType}
                onChange={(e) =>
                  handleRAGSettingChange('graphType', e.target.value)
                }
                className="w-full rounded-lg border border-gray-300 px-3 py-2 dark:bg-gray-700 dark:border-gray-600"
              >
                <option value="dependency">Dependency Graph</option>
                <option value="inheritance">Inheritance Graph</option>
                <option value="full">Full Knowledge Graph</option>
              </select>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium dark:text-white mb-4">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Document Processing
            </div>
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 dark:text-white">
                Chunk Size (tokens)
              </label>
              <input
                type="number"
                value={settings.codeRAG.chunkSize}
                onChange={(e) =>
                  handleRAGSettingChange('chunkSize', parseInt(e.target.value))
                }
                className="w-full rounded-lg border border-gray-300 px-3 py-2 dark:bg-gray-700 dark:border-gray-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 dark:text-white">
                Chunk Overlap (tokens)
              </label>
              <input
                type="number"
                value={settings.codeRAG.overlap}
                onChange={(e) =>
                  handleRAGSettingChange('overlap', parseInt(e.target.value))
                }
                className="w-full rounded-lg border border-gray-300 px-3 py-2 dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium dark:text-white mb-4">
            <div className="flex items-center gap-2">
              <Settings2 className="h-4 w-4" />
              Advanced Settings
            </div>
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 dark:text-white">
                Similarity Threshold
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={settings.codeRAG.similarityThreshold}
                onChange={(e) =>
                  handleRAGSettingChange('similarityThreshold', parseFloat(e.target.value))
                }
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>Broad</span>
                <span>{settings.codeRAG.similarityThreshold}</span>
                <span>Exact</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 dark:text-white">
                Max Context Size (tokens)
              </label>
              <input
                type="number"
                value={settings.codeRAG.maxContextSize}
                onChange={(e) =>
                  handleRAGSettingChange('maxContextSize', parseInt(e.target.value))
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