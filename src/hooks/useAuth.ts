import { useState, useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import type { User } from '../types/chat';

export function useAuth() {
  const [user, setUser] = useLocalStorage<User | null>('user', null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // Demo login logic
      if (email === 'admin@example.com' && password === 'admin123') {
        const user: User = {
          id: '1',
          name: 'Admin User',
          email: 'admin@example.com',
          roles: ['admin'],
          preferences: {
            theme: 'light',
            defaultModel: 'gpt-4',
          },
        };
        setUser(user);
        return user;
      }
      throw new Error('Invalid credentials');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Login failed');
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [setUser]);

  const loginWithGithub = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate GitHub OAuth flow
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const user: User = {
        id: '2',
        name: 'GitHub User',
        email: 'github@example.com',
        avatar: 'https://github.com/github.png',
        roles: ['user'],
        preferences: {
          theme: 'light',
          defaultModel: 'gpt-4',
        },
      };
      setUser(user);
      return user;
    } catch (error) {
      setError('GitHub login failed');
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [setUser]);

  const signup = useCallback(async (name: string, email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate signup API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const user: User = {
        id: Date.now().toString(),
        name,
        email,
        roles: ['user'],
        preferences: {
          theme: 'light',
          defaultModel: 'gpt-4',
        },
      };
      setUser(user);
      return user;
    } catch (error) {
      setError('Signup failed');
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [setUser]);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('chat-messages');
  }, [setUser]);

  return {
    user,
    error,
    isLoading,
    login,
    loginWithGithub,
    signup,
    logout,
  };
}