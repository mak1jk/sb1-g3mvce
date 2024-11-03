import React from 'react';
import { Bell, Mail, MessageSquare, Settings } from 'lucide-react';

export function NotificationSettings() {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-medium dark:text-white">
        Notification Settings
      </h2>

      <div className="space-y-6">
        <div className="rounded-lg border border-gray-200 bg-white p-6 dark:bg-gray-800 dark:border-gray-700">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-blue-100 p-3 dark:bg-blue-900/20">
              <Mail className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="text-lg font-medium dark:text-white">
                Email Notifications
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Manage your email notification preferences
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <label className="flex items-center justify-between">
              <span className="text-sm text-gray-700 dark:text-gray-300">
                New user registrations
              </span>
              <button
                type="button"
                role="switch"
                aria-checked="true"
                className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600"
              >
                <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-6" />
              </button>
            </label>

            <label className="flex items-center justify-between">
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Billing updates
              </span>
              <button
                type="button"
                role="switch"
                aria-checked="true"
                className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600"
              >
                <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-6" />
              </button>
            </label>

            <label className="flex items-center justify-between">
              <span className="text-sm text-gray-700 dark:text-gray-300">
                System alerts
              </span>
              <button
                type="button"
                role="switch"
                aria-checked="true"
                className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600"
              >
                <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-6" />
              </button>
            </label>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6 dark:bg-gray-800 dark:border-gray-700">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-purple-100 p-3 dark:bg-purple-900/20">
              <Bell className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h3 className="text-lg font-medium dark:text-white">
                Push Notifications
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Configure your push notification settings
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <label className="flex items-center justify-between">
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Desktop notifications
              </span>
              <button
                type="button"
                role="switch"
                aria-checked="true"
                className="relative inline-flex h-6 w-11 items-center rounded-full bg-purple-600"
              >
                <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-6" />
              </button>
            </label>

            <label className="flex items-center justify-between">
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Mobile notifications
              </span>
              <button
                type="button"
                role="switch"
                aria-checked="false"
                className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 dark:bg-gray-700"
              >
                <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-1" />
              </button>
            </label>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6 dark:bg-gray-800 dark:border-gray-700">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-green-100 p-3 dark:bg-green-900/20">
              <MessageSquare className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h3 className="text-lg font-medium dark:text-white">
                In-App Notifications
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Manage your in-app notification preferences
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <label className="flex items-center justify-between">
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Chat messages
              </span>
              <button
                type="button"
                role="switch"
                aria-checked="true"
                className="relative inline-flex h-6 w-11 items-center rounded-full bg-green-600"
              >
                <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-6" />
              </button>
            </label>

            <label className="flex items-center justify-between">
              <span className="text-sm text-gray-700 dark:text-gray-300">
                System updates
              </span>
              <button
                type="button"
                role="switch"
                aria-checked="true"
                className="relative inline-flex h-6 w-11 items-center rounded-full bg-green-600"
              >
                <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-6" />
              </button>
            </label>

            <label className="flex items-center justify-between">
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Activity mentions
              </span>
              <button
                type="button"
                role="switch"
                aria-checked="false"
                className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 dark:bg-gray-700"
              >
                <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-1" />
              </button>
            </label>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6 dark:bg-gray-800 dark:border-gray-700">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-orange-100 p-3 dark:bg-orange-900/20">
              <Settings className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <h3 className="text-lg font-medium dark:text-white">
                Notification Schedule
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Set your notification delivery schedule
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 dark:text-white">
                Quiet Hours Start
              </label>
              <input
                type="time"
                defaultValue="22:00"
                className="rounded-lg border border-gray-300 px-3 py-2 dark:bg-gray-700 dark:border-gray-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 dark:text-white">
                Quiet Hours End
              </label>
              <input
                type="time"
                defaultValue="07:00"
                className="rounded-lg border border-gray-300 px-3 py-2 dark:bg-gray-700 dark:border-gray-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 dark:text-white">
                Time Zone
              </label>
              <select className="w-full rounded-lg border border-gray-300 px-3 py-2 dark:bg-gray-700 dark:border-gray-600">
                <option>UTC-8 (Pacific Time)</option>
                <option>UTC-5 (Eastern Time)</option>
                <option>UTC+0 (GMT)</option>
                <option>UTC+1 (Central European Time)</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}