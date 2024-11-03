import React from 'react';
import { NavLink } from 'react-router-dom';
import { User, Settings2, Database, Bug, Zap } from 'lucide-react';

const tabs = [
  { id: 'profile', label: 'Profile', icon: User, path: '/settings/profile' },
  { id: 'general', label: 'General', icon: Settings2, path: '/settings/general' },
  { id: 'rag', label: 'RAG', icon: Database, path: '/settings/rag' },
  { id: 'debug', label: 'Debug', icon: Bug, path: '/settings/debug' },
  { id: 'llm', label: 'LLM', icon: Zap, path: '/settings/llm' },
];

export function SettingsTabs() {
  return (
    <nav className="border-b dark:border-gray-700">
      <div className="flex space-x-4 px-6">
        {tabs.map((tab) => (
          <NavLink
            key={tab.id}
            to={tab.path}
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                isActive
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`
            }
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}