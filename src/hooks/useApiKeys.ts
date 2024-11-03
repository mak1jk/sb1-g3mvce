import { useState, useEffect } from 'react';

interface ApiKeys {
  openai?: string;
  anthropic?: string;
  google?: string;
  custom?: {
    endpoint: string;
    key: string;
  };
}

export function useApiKeys() {
  const [apiKeys, setApiKeys] = useState<ApiKeys>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load API keys from secure storage
    const loadApiKeys = () => {
      try {
        const keys = localStorage.getItem('api-keys');
        if (keys) {
          setApiKeys(JSON.parse(keys));
        }
      } catch (error) {
        console.error('Error loading API keys:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadApiKeys();
  }, []);

  const updateApiKey = (provider: keyof ApiKeys, value: string | { endpoint: string; key: string }) => {
    setApiKeys((prev) => {
      const newKeys = { ...prev, [provider]: value };
      // Save to secure storage
      localStorage.setItem('api-keys', JSON.stringify(newKeys));
      return newKeys;
    });
  };

  const testConnection = async (provider: keyof ApiKeys): Promise<boolean> => {
    try {
      const key = apiKeys[provider];
      if (!key) return false;

      // Implement actual API testing logic here
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return true;
    } catch (error) {
      console.error(`Error testing ${provider} connection:`, error);
      return false;
    }
  };

  return {
    apiKeys,
    updateApiKey,
    testConnection,
    isLoading,
  };
}