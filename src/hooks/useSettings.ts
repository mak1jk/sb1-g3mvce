import { useLocalStorage } from './useLocalStorage';
import type { ChatSettings, CodeRAGSettings } from '../types/chat';

const DEFAULT_SETTINGS: ChatSettings & { codeRAG: CodeRAGSettings } = {
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

export function useSettings() {
  const [settings, setSettings] = useLocalStorage(
    'app-settings',
    DEFAULT_SETTINGS
  );

  const updateSettings = (
    newSettings: Partial<ChatSettings & { codeRAG: CodeRAGSettings }>
  ) => {
    setSettings((prev) => ({
      ...prev,
      ...newSettings,
    }));
  };

  return { settings, updateSettings };
}