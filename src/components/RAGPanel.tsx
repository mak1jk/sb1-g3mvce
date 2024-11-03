import React from 'react';
import { Upload, Settings } from 'lucide-react';

export function RAGPanel() {
  return (
    <div className="mx-auto max-w-4xl p-4">
      <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
        <h2 className="mb-4 text-lg font-semibold dark:text-white">
          RAG Mode (Retrieval-Augmented Generation)
        </h2>
        <div className="space-y-4">
          <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center dark:border-gray-600">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Drop your documents here or click to upload
            </p>
            <button className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
              Upload Documents
            </button>
          </div>
          
          <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700/50">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium dark:text-white">
                Knowledge Base
              </h3>
              <button className="rounded-lg p-2 hover:bg-gray-200 dark:hover:bg-gray-600">
                <Settings className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              </button>
            </div>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              No documents in your knowledge base yet
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}