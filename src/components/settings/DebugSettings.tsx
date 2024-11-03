import React from 'react';
import { Bug, Activity, AlertTriangle } from 'lucide-react';
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

interface DebugSettingsProps {
  settings?: ChatSettings & { codeRAG: CodeRAGSettings };
  onSettingsChange: (settings: ChatSettings & { codeRAG: CodeRAGSettings }) => void;
}

export function DebugSettings({ settings = defaultSettings, onSettingsChange }: DebugSettingsProps) {
  const [loggingLevel, setLoggingLevel] = React.useState('info');
  const [showPerformanceMetrics, setShowPerformanceMetrics] = React.useState(true);
  const [errorReporting, setErrorReporting] = React.useState(true);

  return (
    <div className="max-w-2xl">
      <h2 className="text-lg font-medium dark:text-white mb-6">Debug Settings</h2>

      <div className="space-y-8">
        <div>
          <h3 className="text-sm font-medium dark:text-white mb-4">
            <div className="flex items-center gap-2">
              <Bug className="h-4 w-4" />
              Logging
            </div>
          </h3>
          <div>
            <label className="block text-sm font-medium mb-2 dark:text-white">
              Log Level
            </label>
            <select
              value={loggingLevel}
              onChange={(e) => setLoggingLevel(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 dark:bg-gray-700 dark:border-gray-600"
            >
              <option value="error">Error</option>
              <option value="warn">Warning</option>
              <option value="info">Info</option>
              <option value="debug">Debug</option>
              <option value="trace">Trace</option>
            </select>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium dark:text-white mb-4">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Performance
            </div>
          </h3>
          <div className="space-y-4">
            <label className="flex items-center justify-between">
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Show performance metrics
              </span>
              <button
                type="button"
                role="switch"
                aria-checked={showPerformanceMetrics}
                onClick={() => setShowPerformanceMetrics(!showPerformanceMetrics)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                  showPerformanceMetrics
                    ? 'bg-blue-600'
                    : 'bg-gray-200 dark:bg-gray-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                    showPerformanceMetrics ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </label>

            {showPerformanceMetrics && (
              <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                      Response Time
                    </span>
                    <span className="font-medium dark:text-white">Enabled</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                      Memory Usage
                    </span>
                    <span className="font-medium dark:text-white">Enabled</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                      Token Count
                    </span>
                    <span className="font-medium dark:text-white">Enabled</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium dark:text-white mb-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Error Reporting
            </div>
          </h3>
          <div className="space-y-4">
            <label className="flex items-center justify-between">
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Enable error reporting
              </span>
              <button
                type="button"
                role="switch"
                aria-checked={errorReporting}
                onClick={() => setErrorReporting(!errorReporting)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                  errorReporting
                    ? 'bg-blue-600'
                    : 'bg-gray-200 dark:bg-gray-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                    errorReporting ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </label>

            {errorReporting && (
              <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                      Stack Traces
                    </span>
                    <span className="font-medium dark:text-white">Included</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                      System Info
                    </span>
                    <span className="font-medium dark:text-white">Included</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                      User Actions
                    </span>
                    <span className="font-medium dark:text-white">Included</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}