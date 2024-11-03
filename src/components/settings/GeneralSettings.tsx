import React from 'react';
import { Bell, Moon, Sun, Monitor, Save } from 'lucide-react';
import type { Theme, ChatSettings, CodeRAGSettings } from '../../types/chat';
import { useSettings } from '../../hooks/useSettings';

interface GeneralSettingsProps {
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
}

export function GeneralSettings({ theme, onThemeChange }: GeneralSettingsProps) {
  const { settings, updateSettings } = useSettings();
  const [isSaving, setIsSaving] = React.useState(false);
  const [showSavedMessage, setShowSavedMessage] = React.useState(false);

  const handleNotificationChange = (key: keyof ChatSettings['notifications']) => {
    updateSettings({
      notifications: {
        ...settings.notifications,
        [key]: !settings.notifications[key],
      },
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setShowSavedMessage(true);
      setTimeout(() => setShowSavedMessage(false), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-medium dark:text-white">General Settings</h2>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
        >
          <Save className="h-4 w-4" />
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {showSavedMessage && (
        <div className="mb-4 rounded-lg bg-green-50 p-4 text-green-700 dark:bg-green-900/20 dark:text-green-400">
          Settings saved successfully!
        </div>
      )}

      <div className="space-y-8">
        <div>
          <h3 className="text-sm font-medium dark:text-white mb-4">Theme</h3>
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => onThemeChange('light')}
              className={`flex items-center justify-center gap-2 rounded-lg border p-3 text-sm ${
                theme === 'light'
                  ? 'border-blue-600 bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                  : 'border-gray-300 dark:border-gray-600'
              }`}
            >
              <Sun className="h-4 w-4" />
              Light
            </button>
            <button
              onClick={() => onThemeChange('dark')}
              className={`flex items-center justify-center gap-2 rounded-lg border p-3 text-sm ${
                theme === 'dark'
                  ? 'border-blue-600 bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                  : 'border-gray-300 dark:border-gray-600'
              }`}
            >
              <Moon className="h-4 w-4" />
              Dark
            </button>
            <button
              onClick={() => onThemeChange('system')}
              className={`flex items-center justify-center gap-2 rounded-lg border p-3 text-sm ${
                theme === 'system'
                  ? 'border-blue-600 bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                  : 'border-gray-300 dark:border-gray-600'
              }`}
            >
              <Monitor className="h-4 w-4" />
              System
            </button>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium dark:text-white mb-4">
            <div className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Notifications
            </div>
          </h3>
          <div className="space-y-4">
            <label className="flex items-center justify-between">
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Sound notifications
              </span>
              <button
                type="button"
                role="switch"
                aria-checked={settings.notifications.sound}
                onClick={() => handleNotificationChange('sound')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                  settings.notifications.sound
                    ? 'bg-blue-600'
                    : 'bg-gray-200 dark:bg-gray-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                    settings.notifications.sound ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </label>

            <label className="flex items-center justify-between">
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Desktop notifications
              </span>
              <button
                type="button"
                role="switch"
                aria-checked={settings.notifications.desktop}
                onClick={() => handleNotificationChange('desktop')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                  settings.notifications.desktop
                    ? 'bg-blue-600'
                    : 'bg-gray-200 dark:bg-gray-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                    settings.notifications.desktop ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </label>

            <label className="flex items-center justify-between">
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Email notifications
              </span>
              <button
                type="button"
                role="switch"
                aria-checked={settings.notifications.email}
                onClick={() => handleNotificationChange('email')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                  settings.notifications.email
                    ? 'bg-blue-600'
                    : 'bg-gray-200 dark:bg-gray-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                    settings.notifications.email ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}