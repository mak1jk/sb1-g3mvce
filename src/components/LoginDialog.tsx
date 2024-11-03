import React, { useState } from 'react';
import { X, Github, Mail, KeyRound } from 'lucide-react';

interface LoginDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (email: string, password: string) => void;
  onGithubLogin: () => void;
}

export function LoginDialog({
  isOpen,
  onClose,
  onLogin,
  onGithubLogin,
}: LoginDialogProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password);
  };

  const setDemoCredentials = () => {
    setEmail('admin@example.com');
    setPassword('admin123');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl dark:bg-gray-800">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold dark:text-white">
            {isRegister ? 'Create Account' : 'Sign In'}
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <X className="h-5 w-5 dark:text-white" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-white">
              Email
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 dark:text-white">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          >
            <Mail className="inline-block h-4 w-4 mr-2" />
            {isRegister ? 'Create Account' : 'Sign In'}
          </button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                Or continue with
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onGithubLogin}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500/20 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:bg-gray-600"
          >
            <Github className="inline-block h-4 w-4 mr-2" />
            GitHub
          </button>

          <div className="text-center text-sm text-gray-500 dark:text-gray-400">
            {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              type="button"
              onClick={() => setIsRegister(!isRegister)}
              className="text-blue-600 hover:underline dark:text-blue-400"
            >
              {isRegister ? 'Sign in' : 'Create one'}
            </button>
          </div>

          <div className="mt-6 rounded-lg border border-yellow-200 bg-yellow-50 p-4 dark:bg-yellow-900/20 dark:border-yellow-900/30">
            <div className="flex items-center gap-2 text-sm font-medium text-yellow-800 dark:text-yellow-500 mb-2">
              <KeyRound className="h-4 w-4" />
              Demo Credentials
            </div>
            <div className="text-sm text-yellow-700 dark:text-yellow-400 space-y-1">
              <p>Email: admin@example.com</p>
              <p>Password: admin123</p>
              <button
                type="button"
                onClick={setDemoCredentials}
                className="mt-2 text-xs font-medium text-yellow-800 hover:text-yellow-900 dark:text-yellow-500 dark:hover:text-yellow-400"
              >
                Click to autofill
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}