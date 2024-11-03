import React from 'react';
import { NavLink } from 'react-router-dom';
import { X } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface NavItem {
  icon: LucideIcon;
  label: string;
  path: string;
}

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: NavItem[];
}

export function AdminSidebar({ isOpen, onClose, navItems }: AdminSidebarProps) {
  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 transition-opacity duration-300 lg:hidden ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      <div
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 bg-white shadow-xl transition-transform duration-300 dark:bg-gray-800 lg:static lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b p-4 dark:border-gray-700">
            <h2 className="text-lg font-semibold dark:text-white">Navigation</h2>
            <button
              onClick={onClose}
              className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700 lg:hidden"
            >
              <X className="h-5 w-5 dark:text-white" />
            </button>
          </div>

          <nav className="flex-1 space-y-1 p-4">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700'
                  }`
                }
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}