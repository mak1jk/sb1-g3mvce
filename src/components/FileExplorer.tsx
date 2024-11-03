import React, { useState } from 'react';
import { ChevronRight, ChevronDown, Folder, File } from 'lucide-react';

interface FileNode {
  name: string;
  type: 'file' | 'directory';
  path: string;
  children?: FileNode[];
  content?: string;
}

interface FileExplorerProps {
  files: FileNode[];
  selectedFile: string | null;
  onFileSelect: (path: string, content?: string) => void;
}

export function FileExplorer({ files, selectedFile, onFileSelect }: FileExplorerProps) {
  const [expandedDirs, setExpandedDirs] = useState<Set<string>>(new Set());

  const toggleDir = (path: string) => {
    const newExpanded = new Set(expandedDirs);
    if (newExpanded.has(path)) {
      newExpanded.delete(path);
    } else {
      newExpanded.add(path);
    }
    setExpandedDirs(newExpanded);
  };

  const renderNode = (node: FileNode, level: number = 0) => {
    const isExpanded = expandedDirs.has(node.path);
    const isSelected = selectedFile === node.path;

    return (
      <div key={node.path}>
        <button
          onClick={() => {
            if (node.type === 'directory') {
              toggleDir(node.path);
            } else {
              onFileSelect(node.path, node.content);
            }
          }}
          className={`flex w-full items-center gap-2 px-4 py-1.5 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 ${
            isSelected ? 'bg-blue-50 dark:bg-blue-900/20' : ''
          }`}
          style={{ paddingLeft: `${level * 1.5 + 1}rem` }}
        >
          {node.type === 'directory' && (
            <div className="text-gray-400">
              {isExpanded ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </div>
          )}
          {node.type === 'directory' ? (
            <Folder className="h-4 w-4 text-yellow-400" />
          ) : (
            <File className="h-4 w-4 text-gray-400" />
          )}
          <span className="truncate dark:text-white">{node.name}</span>
        </button>
        {node.type === 'directory' && isExpanded && node.children && (
          <div>
            {node.children.map((child) => renderNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="overflow-y-auto">
      {files.length === 0 ? (
        <div className="p-4 text-center text-sm text-gray-500 dark:text-gray-400">
          No files uploaded yet
        </div>
      ) : (
        files.map((file) => renderNode(file))
      )}
    </div>
  );
}