import { Theme } from '../types/chat';

export function getSystemTheme(): Theme {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function setThemeClass(theme: Theme) {
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}

export function initializeTheme() {
  const savedTheme = localStorage.getItem('theme') as Theme | null;
  const theme = savedTheme || getSystemTheme();
  setThemeClass(theme);
  return theme;
}