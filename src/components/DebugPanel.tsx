import React, { useState } from 'react';
import { AlertCircle, Play, Code, XCircle, CheckCircle, Loader, FolderTree, File, ChevronRight, ChevronDown } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { FileExplorer } from './FileExplorer';

interface DebugPanelProps {
  onAnalyze: (code: string) => Promise<void>;
}

interface FileNode {
  name: string;
  type: 'file' | 'directory';
  path: string;
  children?: FileNode[];
  content?: string;
}

export function DebugPanel({ onAnalyze }: DebugPanelProps) {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [fileTree, setFileTree] = useState<FileNode[]>([]);
  const [analysis, setAnalysis] = useState<{
    errors: Array<{
      line: number;
      message: string;
      severity: 'error' | 'warning';
      suggestion?: string;
    }>;
    suggestions: string[];
  } | null>(null);

  const handleFileUpload = async (files: FileList) => {
    const newTree: FileNode[] = [];
    
    for (const file of Array.from(files)) {
      const path = file.webkitRelativePath || file.name;
      const pathParts = path.split('/');
      let currentLevel = newTree;

      for (let i = 0; i < pathParts.length; i++) {
        const part = pathParts[i];
        const isFile = i === pathParts.length - 1;
        const existingNode = currentLevel.find(node => node.name === part);

        if (existingNode) {
          if (!isFile) {
            currentLevel = existingNode.children!;
          }
        } else {
          const newNode: FileNode = {
            name: part,
            type: isFile ? 'file' : 'directory',
            path: pathParts.slice(0, i + 1).join('/'),
            ...(isFile ? {} : { children: [] })
          };

          if (isFile) {
            // Read file content
            const content = await file.text();
            newNode.content = content;
          }

          currentLevel.push(newNode);
          if (!isFile) {
            currentLevel = newNode.children!;
          }
        }
      }
    }

    setFileTree(newTree);
  };

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    try {
      // Simulate AI analysis
      await new Promise(resolve => setTimeout(resolve, 2000));
      setAnalysis({
        errors: [
          {
            line: 3,
            message: "Cannot read property 'value' of undefined",
            severity: 'error',
            suggestion: "Check if the object exists before accessing 'value'",
          },
          {
            line: 7,
            message: 'Unused variable "result"',
            severity: 'warning',
          },
        ],
        suggestions: [
          'Consider adding null checks for object properties',
          'Use optional chaining (?.) for safer property access',
          'Implement error handling with try/catch blocks',
        ],
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-1 min-h-0">
        {/* File Explorer */}
        <div className="w-64 border-r dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
          <div className="flex items-center justify-between border-b p-4 dark:border-gray-700">
            <h2 className="text-sm font-medium dark:text-white">Files</h2>
            <label className="cursor-pointer rounded-lg p-2 hover:bg-gray-200 dark:hover:bg-gray-700">
              <input
                type="file"
                className="hidden"
                webkitdirectory="true"
                directory=""
                multiple
                onChange={(e) => handleFileUpload(e.target.files!)}
              />
              <FolderTree className="h-4 w-4 dark:text-white" />
            </label>
          </div>
          <FileExplorer
            files={fileTree}
            selectedFile={selectedFile}
            onFileSelect={(path, content) => {
              setSelectedFile(path);
              if (content) setCode(content);
            }}
          />
        </div>

        {/* Code Editor */}
        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex items-center justify-between border-b p-4 dark:border-gray-700">
            <div className="flex items-center gap-4">
              <h2 className="text-sm font-medium dark:text-white">Code Editor</h2>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="javascript">JavaScript</option>
                <option value="typescript">TypeScript</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
              </select>
            </div>
            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing || !code.trim()}
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isAnalyzing ? (
                <>
                  <Loader className="h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Play className="h-4 w-4" />
                  Analyze Code
                </>
              )}
            </button>
          </div>

          <div className="flex-1 p-4 min-h-0">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Paste your code here..."
              className="h-full w-full resize-none rounded-lg border border-gray-300 bg-gray-50 p-4 font-mono text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
          </div>
        </div>
      </div>

      {/* Analysis Panel */}
      <div className="h-80 border-t dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="border-b p-4 dark:border-gray-700">
          <h2 className="text-sm font-medium dark:text-white">Analysis</h2>
        </div>

        <div className="p-4 space-y-6 overflow-y-auto h-[calc(100%-3.5rem)]">
          {analysis ? (
            <>
              {/* Errors and Warnings */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium dark:text-white">Issues Found</h3>
                {analysis.errors.map((error, index) => (
                  <div
                    key={index}
                    className={`rounded-lg border p-4 ${
                      error.severity === 'error'
                        ? 'border-red-200 bg-red-50 dark:border-red-900/50 dark:bg-red-900/20'
                        : 'border-yellow-200 bg-yellow-50 dark:border-yellow-900/50 dark:bg-yellow-900/20'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {error.severity === 'error' ? (
                        <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                      )}
                      <div>
                        <p
                          className={`text-sm font-medium ${
                            error.severity === 'error'
                              ? 'text-red-900 dark:text-red-400'
                              : 'text-yellow-900 dark:text-yellow-400'
                          }`}
                        >
                          Line {error.line}: {error.message}
                        </p>
                        {error.suggestion && (
                          <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                            Suggestion: {error.suggestion}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Suggestions */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium dark:text-white">
                  Improvement Suggestions
                </h3>
                <div className="rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-900/50 dark:bg-green-900/20">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                    <ul className="space-y-2">
                      {analysis.suggestions.map((suggestion, index) => (
                        <li
                          key={index}
                          className="text-sm text-gray-600 dark:text-gray-300"
                        >
                          {suggestion}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex h-full items-center justify-center text-center text-gray-500 dark:text-gray-400">
              <div>
                <Code className="mx-auto h-8 w-8 mb-2" />
                <p>Paste your code and click Analyze to get started</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}