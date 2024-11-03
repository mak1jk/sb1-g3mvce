import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Users, CreditCard, Settings, Shield, Bell, Menu } from 'lucide-react';
import { AdminSidebar } from '../components/admin/AdminSidebar';
import { UserManagement } from '../components/admin/UserManagement';
import { BillingManagement } from '../components/admin/BillingManagement';
import { SecuritySettings } from '../components/admin/SecuritySettings';
import { NotificationSettings } from '../components/admin/NotificationSettings';
import type { User } from '../types/chat';

interface AdminDashboardProps {
  user: User;
}

export function AdminDashboard({ user }: AdminDashboardProps) {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const navigate = useNavigate();

  // Verify admin status
  if (!user.roles?.includes('admin')) {
    return <Navigate to="/chat" replace />;
  }

  const navItems = [
    { icon: Users, label: 'Users', path: '/admin/users' },
    { icon: CreditCard, label: 'Billing', path: '/admin/billing' },
    { icon: Settings, label: 'Settings', path: '/admin/settings' },
    { icon: Shield, label: 'Security', path: '/admin/security' },
    { icon: Bell, label: 'Notifications', path: '/admin/notifications' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex">
        <AdminSidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          navItems={navItems}
        />

        <div className="flex-1">
          <header className="bg-white shadow dark:bg-gray-800">
            <div className="flex items-center justify-between px-4 py-4">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsSidebarOpen(true)}
                  className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700 lg:hidden"
                >
                  <Menu className="h-6 w-6 dark:text-white" />
                </button>
                <h1 className="text-xl font-semibold dark:text-white">
                  Admin Dashboard
                </h1>
              </div>
              <div className="flex items-center gap-4">
                <img
                  src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}`}
                  alt={user.name}
                  className="h-8 w-8 rounded-full"
                />
                <div className="hidden sm:block">
                  <p className="text-sm font-medium dark:text-white">{user.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Admin</p>
                </div>
              </div>
            </div>
          </header>

          <main className="p-6">
            <Routes>
              <Route path="users" element={<UserManagement />} />
              <Route path="billing" element={<BillingManagement />} />
              <Route path="security" element={<SecuritySettings />} />
              <Route path="notifications" element={<NotificationSettings />} />
              <Route path="*" element={<Navigate to="/admin/users" replace />} />
            </Routes>
          </main>
        </div>
      </div>
    </div>
  );
}