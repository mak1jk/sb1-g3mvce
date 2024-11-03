import React, { useState } from 'react';
import { Upload, FileCode, GitBranch, Network, Settings2 } from 'lucide-react';

interface CodeRAGSettings {
  embeddingModel: 'codebert' | 'graphcodebert';
  chunkSize: number;
  overlap: number;
  graphType: 'dependency' | 'inheritance' | 'full';
  similarityThreshold: number;
  maxContextSize: number;
}

interface SettingsPageProps {
  settings: ChatSettings & {
    codeRAG: CodeRAGSettings;
  };
  onSettingsChange: (settings: ChatSettings & { codeRAG: CodeRAGSettings }) => void;
  onBack: () => void;
}

export function SettingsPage({
  settings,
  onSettingsChange,
  onBack,
}: SettingsPageProps) {
  const [activeTab, setActiveTab] = useState('general');
  const [codeFiles, setCodeFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleCodeUpload = (files: FileList | null) => {
    if (!files) return;
    setCodeFiles(Array.from(files));
  };

  const processCodeFiles = async () => {
    setIsProcessing(true);
    setProgress(0);

    try {
      for (let i = 0; i <= 100; i += 20) {
        setProgress(i);
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    } catch (error) {
      console.error('Error processing code files:', error);
    } finally {
      setIsProcessing(false);
      setProgress(0);
    }
  };

  const renderRAGContent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium dark:text-white mb-4">Code Understanding</h3>
        <div className="border rounded-lg p-4 dark:border-gray-700">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 dark:text-white">
                Embedding Model
              </label>
              <select
                value={settings.codeRAG.embeddingModel}
                onChange={(e) =>
                  onSettingsChange({
                    ...settings,
                    codeRAG: {
                      ...settings.codeRAG,
                      embeddingModel: e.target.value as 'codebert' | 'graphcodebert',
                    },
                  })
                }
                className="w-full rounded-lg border border-gray-300 px-3 py-2 dark:bg-gray-700 dark:border-gray-600"
              >
                <option value="codebert">CodeBERT</option>
                <option value="graphcodebert">GraphCodeBERT</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 dark:text-white">
                Knowledge Graph Type
              </label>
              <select
                value={settings.codeRAG.graphType}
                onChange={(e) =>
                  onSettingsChange({
                    ...settings,
                    codeRAG: {
                      ...settings.codeRAG,
                      graphType: e.target.value as 'dependency' | 'inheritance' | 'full',
                    },
                  })
                }
                className="w-full rounded-lg border border-gray-300 px-3 py-2 dark:bg-gray-700 dark:border-gray-600"
              >
                <option value="dependency">Dependency Graph</option>
                <option value="inheritance">Inheritance Graph</option>
                <option value="full">Full Knowledge Graph</option>
              </select>
            </div>

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
                  onSettingsChange({
                    ...settings,
                    codeRAG: {
                      ...settings.codeRAG,
                      similarityThreshold: parseFloat(e.target.value),
                    },
                  })
                }
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>Broad</span>
                <span>{settings.codeRAG.similarityThreshold}</span>
                <span>Exact</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium dark:text-white mb-4">Code Upload</h3>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center dark:border-gray-600">
          <input
            type="file"
            id="code-upload"
            multiple
            accept=".js,.jsx,.ts,.tsx,.py,.java,.cpp,.cs"
            onChange={(e) => handleCodeUpload(e.target.files)}
            className="hidden"
          />
          <label
            htmlFor="code-upload"
            className="cursor-pointer"
          >
            <FileCode className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
              Upload your code files to generate a knowledge graph
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500">
              Supports JavaScript, TypeScript, Python, Java, C++, and C#
            </p>
          </label>
        </div>

        {codeFiles.length > 0 && (
          <div className="mt-4 space-y-4">
            <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
              <h4 className="text-sm font-medium dark:text-white mb-2">
                Selected Files ({codeFiles.length})
              </h4>
              <div className="space-y-2">
                {codeFiles.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="text-gray-600 dark:text-gray-300">
                      {file.name}
                    </span>
                    <span className="text-gray-400 dark:text-gray-500">
                      {(file.size / 1024).toFixed(1)} KB
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={processCodeFiles}
              disabled={isProcessing}
              className="w-full flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? (
                <>
                  <Network className="h-4 w-4 animate-spin" />
                  Processing... {progress}%
                </>
              ) : (
                <>
                  <GitBranch className="h-4 w-4" />
                  Generate Knowledge Graph
                </>
              )}
            </button>
          </div>
        )}
      </div>

      <div>
        <h3 className="text-lg font-medium dark:text-white mb-4">Advanced Settings</h3>
        <div className="border rounded-lg p-4 dark:border-gray-700 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2 dark:text-white">
              Code Chunk Size (lines)
            </label>
            <input
              type="number"
              value={settings.codeRAG.chunkSize}
              onChange={(e) =>
                onSettingsChange({
                  ...settings,
                  codeRAG: {
                    ...settings.codeRAG,
                    chunkSize: parseInt(e.target.value),
                  },
                })
              }
              className="w-full rounded-lg border border-gray-300 px-3 py-2 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 dark:text-white">
              Chunk Overlap (lines)
            </label>
            <input
              type="number"
              value={settings.codeRAG.overlap}
              onChange={(e) =>
                onSettingsChange({
                  ...settings,
                  codeRAG: {
                    ...settings.codeRAG,
                    overlap: parseInt(e.target.value),
                  },
                })
              }
              className="w-full rounded-lg border border-gray-300 px-3 py-2 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 dark:text-white">
              Max Context Size (tokens)
            </label>
            <input
              type="number"
              value={settings.codeRAG.maxContextSize}
              onChange={(e) =>
                onSettingsChange({
                  ...settings,
                  codeRAG: {
                    ...settings.codeRAG,
                    maxContextSize: parseInt(e.target.value),
                  },
                })
              }
              className="w-full rounded-lg border border-gray-300 px-3 py-2 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="border-b bg-white dark:bg-gray-800 dark:border-gray-700">
        <div className="mx-auto max-w-4xl px-4 py-4">
          <button
            onClick={onBack}
            className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          >
            ← Back
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4">
        <div className="flex border-b dark:border-gray-700">
          <button
            onClick={() => setActiveTab('general')}
            className={`px-4 py-2 border-b-2 ${
              activeTab === 'general'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            General
          </button>
          <button
            onClick={() => setActiveTab('rag')}
            className={`px-4 py-2 border-b-2 ${
              activeTab === 'rag'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            RAG Configuration
          </button>
          <button
            onClick={() => setActiveTab('llm')}
            className={`px-4 py-2 border-b-2 ${
              activeTab === 'llm'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            LLM Integration
          </button>
        </div>

        <div className="p-6">
          {activeTab === 'rag' && renderRAGContent()}
          {activeTab === 'general' && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium dark:text-white">General Settings</h3>
              {/* General settings content */}
            </div>
          )}
          {activeTab === 'llm' && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium dark:text-white">LLM Integration</h3>
              {/* LLM settings content */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}