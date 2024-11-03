import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { ChatPage } from './pages/ChatPage';
import { SettingsPage } from './pages/SettingsPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { BlogPage } from './pages/BlogPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { useAuth } from './hooks/useAuth';
import { useTheme } from './hooks/useTheme';

function App() {
  const [theme, setTheme] = useTheme();
  const { user, login, logout } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route 
          path="/login" 
          element={
            user ? (
              <Navigate to="/chat" replace />
            ) : (
              <LoginPage onLogin={login} />
            )
          } 
        />
        <Route 
          path="/signup" 
          element={
            user ? (
              <Navigate to="/chat" replace />
            ) : (
              <SignupPage onSignup={login} />
            )
          } 
        />
        <Route 
          path="/chat/*" 
          element={
            user ? (
              <ChatPage theme={theme} onThemeChange={setTheme} />
            ) : (
              <Navigate to="/login" replace />
            )
          } 
        />
        <Route 
          path="/settings/*" 
          element={
            user ? (
              <SettingsPage
                user={user}
                theme={theme}
                onThemeChange={setTheme}
                onLogout={logout}
              />
            ) : (
              <Navigate to="/login" replace />
            )
          } 
        />
        <Route 
          path="/admin/*" 
          element={
            user?.roles?.includes('admin') ? (
              <AdminDashboard user={user} />
            ) : (
              <Navigate to="/chat" replace />
            )
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;