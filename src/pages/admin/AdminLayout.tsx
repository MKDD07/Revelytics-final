import React, { useState, useEffect } from 'react';
import './main-dashboard.css';
import { MetaDashboard } from './MetaDashboard';
import { BlogDashboard } from './BlogDashboard';
import { SettingsDashboard } from './SettingsDashboard';
import {
  Sparkles,
  BookOpen,
  Settings,
  LogOut,
  ExternalLink,
  Search,
} from 'lucide-react';

interface AdminLayoutProps {
  initialTab?: 'meta' | 'blogs' | 'settings';
  onNavigate?: (route: string) => void;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ initialTab = 'meta', onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'meta' | 'blogs' | 'settings'>(initialTab);
  const [username, setUsername] = useState('Admin');

  // Authenticate on mount
  useEffect(() => {
    const token = localStorage.getItem('revlytics_admin_token');
    if (!token) {
      if (onNavigate) onNavigate('login');
      else window.location.href = '/login';
      return;
    }

    const user = localStorage.getItem('revlytics_admin_user');
    if (user) setUsername(user);

    async function verifyAuth() {
      try {
        const res = await fetch('/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = (await res.json()) as any;
          if (data.username) setUsername(data.username);
        }
      } catch (e) {
        console.warn('Auth check fallback:', e);
      }
    }
    verifyAuth();
  }, [onNavigate]);

  const handleLogout = () => {
    localStorage.removeItem('revlytics_admin_token');
    localStorage.removeItem('revlytics_admin_user');
    if (onNavigate) onNavigate('login');
    else window.location.href = '/login';
  };

  return (
    <div className="admin-root">
      {/* Top Navigation Bar */}
      <header className="admin-header">
        {/* Brand */}
        <div className="admin-brand">
          <div className="admin-brand__mark">
            R
          </div>
          <span className="admin-brand__name">Revlytics</span>
          <span className="badge badge--purple">Admin D1</span>
        </div>

        {/* Center Tabs */}
        <nav className="tabs" aria-label="Admin Sections">
          <button
            className={`tab-trigger ${activeTab === 'meta' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('meta')}
          >
            <Search size={14} /> Page Meta & Services
          </button>
          <button
            className={`tab-trigger ${activeTab === 'blogs' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('blogs')}
          >
            <BookOpen size={14} /> Blogs & AI Studio
          </button>
          <button
            className={`tab-trigger ${activeTab === 'settings' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            <Settings size={14} /> Settings
          </button>
        </nav>

        {/* Right Actions */}
        <div className="admin-header__actions">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="admin-pill"
          >
            <ExternalLink size={13} /> View Website
          </a>

          <div className="admin-pill">
            <span className="admin-status-dot" />
            <span>{username}</span>
          </div>

          <button
            onClick={handleLogout}
            className="admin-logout"
          >
            <LogOut size={13} /> Logout
          </button>
        </div>
      </header>

      {/* Main Content Workspace */}
      <main className="admin-main">
        {activeTab === 'meta' && <MetaDashboard />}
        {activeTab === 'blogs' && <BlogDashboard />}
        {activeTab === 'settings' && <SettingsDashboard />}
      </main>
    </div>
  );
};

export default AdminLayout;
