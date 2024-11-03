import { useLocalStorage } from './useLocalStorage';
import type { Theme } from '../types/chat';

export function useTheme() {
  const [theme, setTheme] = useLocalStorage<Theme>('theme', 'light');

  const updateTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  // Initialize theme on mount
  if (typeof window !== 'undefined') {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }

  return [theme, updateTheme] as const;
}