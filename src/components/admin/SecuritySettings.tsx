import React from 'react';
import { Shield, Key, Lock, Smartphone } from 'lucide-react';

export function SecuritySettings() {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-medium dark:text-white">Security Settings</h2>

      <div className="space-y-6">
        <div className="rounded-lg border border-gray-200 bg-white p-6 dark:bg-gray-800 dark:border-gray-700">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-blue-100 p-3 dark:bg-blue-900/20">
              <Key className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="text-lg font-medium dark:text-white">
                Password Settings
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Manage your account password and security preferences
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 dark:text-white">
                Current Password
              </label>
              <input
                type="password"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 dark:text-white">
                New Password
              </label>
              <input
                type="password"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 dark:text-white">
                Confirm New Password
              </label>
              <input
                type="password"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
            <button className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
              Update Password
            </button>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6 dark:bg-gray-800 dark:border-gray-700">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-purple-100 p-3 dark:bg-purple-900/20">
              <Smartphone className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h3 className="text-lg font-medium dark:text-white">
                Two-Factor Authentication
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Add an extra layer of security to your account
              </p>
            </div>
          </div>

          <div className="mt-6">
            <button className="rounded-lg bg-purple-600 px-4 py-2 text-white hover:bg-purple-700">
              Enable 2FA
            </button>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6 dark:bg-gray-800 dark:border-gray-700">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-red-100 p-3 dark:bg-red-900/20">
              <Lock className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <h3 className="text-lg font-medium dark:text-white">
                Active Sessions
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Manage your active sessions and devices
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-lg border border-gray-200 p-4 dark:border-gray-700"
              >
                <div className="flex items-center gap-4">
                  <Shield className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium dark:text-white">
                      Chrome on Windows
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Last active: 2 hours ago
                    </p>
                  </div>
                </div>
                <button className="text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300">
                  Revoke
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}