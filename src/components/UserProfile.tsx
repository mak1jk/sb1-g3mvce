import React from 'react';
import { ArrowLeft, Mail, Calendar, Settings } from 'lucide-react';
import type { User } from '../types/chat';

interface UserProfileProps {
  user: User;
  onBack: () => void;
  onSettingsClick: () => void;
}

export function UserProfile({ user, onBack, onSettingsClick }: UserProfileProps) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <ArrowLeft className="h-5 w-5 dark:text-white" />
            </button>
            <h1 className="text-xl font-semibold dark:text-white">Profile</h1>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="p-8">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-6">
                <img
                  src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}`}
                  alt={user.name}
                  className="h-24 w-24 rounded-full"
                />
                <div>
                  <h2 className="text-2xl font-bold dark:text-white">{user.name}</h2>
                  <div className="mt-2 flex items-center gap-4 text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <Mail className="h-4 w-4" />
                      <span>{user.email}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>Joined March 2024</span>
                    </div>
                  </div>
                </div>
              </div>
              <button
                onClick={onSettingsClick}
                className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                title="Settings"
              >
                <Settings className="h-5 w-5 dark:text-white" />
              </button>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-lg border border-gray-200 p-6 dark:border-gray-700">
                <h3 className="text-lg font-semibold dark:text-white">Chat Statistics</h3>
                <dl className="mt-4 space-y-4">
                  <div>
                    <dt className="text-sm text-gray-500 dark:text-gray-400">Total Chats</dt>
                    <dd className="text-2xl font-semibold dark:text-white">24</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500 dark:text-gray-400">Messages Sent</dt>
                    <dd className="text-2xl font-semibold dark:text-white">142</dd>
                  </div>
                </dl>
              </div>

              <div className="rounded-lg border border-gray-200 p-6 dark:border-gray-700">
                <h3 className="text-lg font-semibold dark:text-white">Preferences</h3>
                <dl className="mt-4 space-y-4">
                  <div>
                    <dt className="text-sm text-gray-500 dark:text-gray-400">Theme</dt>
                    <dd className="text-lg font-medium capitalize dark:text-white">
                      {user.preferences.theme}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500 dark:text-gray-400">Default Model</dt>
                    <dd className="text-lg font-medium dark:text-white">
                      {user.preferences.defaultModel}
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="rounded-lg border border-gray-200 p-6 dark:border-gray-700">
                <h3 className="text-lg font-semibold dark:text-white">Recent Activity</h3>
                <div className="mt-4 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      Started a new chat about Python
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      Updated profile settings
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}