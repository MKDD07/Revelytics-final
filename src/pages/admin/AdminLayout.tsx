import React, { useState, useEffect } from 'react';
import { MetaDashboard } from './MetaDashboard';
import { BlogDashboard } from './BlogDashboard';
import { SettingsDashboard } from './SettingsDashboard';
import { TabsList, TabsTrigger } from '../../components/ui/tabs';
import { AdminButton as Button } from '../../components/ui/admin-button';
import { Badge } from '../../components/ui/input';
import {
  Layers,
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
    <div className="min-h-screen bg-zinc-950 text-zinc-50 flex flex-col antialiased">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 h-16 border-b border-zinc-800 bg-zinc-950/95 backdrop-blur px-6 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="size-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-white shadow-md">
            R
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-base text-zinc-50 tracking-tight">Revlytics</span>
            <Badge variant="purple" className="text-[10px] py-0 px-2">Admin D1</Badge>
          </div>
        </div>

        {/* Center Tabs */}
        <TabsList className="bg-zinc-900 border border-zinc-800">
          <TabsTrigger
            active={activeTab === 'meta'}
            onClick={() => setActiveTab('meta')}
          >
            <Search className="size-3.5" /> Page Meta & Services
          </TabsTrigger>
          <TabsTrigger
            active={activeTab === 'blogs'}
            onClick={() => setActiveTab('blogs')}
          >
            <BookOpen className="size-3.5" /> Blogs & AI Studio
          </TabsTrigger>
          <TabsTrigger
            active={activeTab === 'settings'}
            onClick={() => setActiveTab('settings')}
          >
            <Settings className="size-3.5" /> Settings
          </TabsTrigger>
        </TabsList>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium text-zinc-300 hover:text-zinc-50 bg-zinc-900 border border-zinc-800 transition-colors"
          >
            <ExternalLink className="size-3" /> View Website
          </a>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-md text-xs text-zinc-300 bg-zinc-900 border border-zinc-800">
            <div className="size-2 rounded-full bg-emerald-400" />
            <span>{username}</span>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="text-red-400 hover:text-red-300 hover:bg-red-950/40 text-xs px-2"
          >
            <LogOut className="size-3.5 mr-1" /> Logout
          </Button>
        </div>
      </header>

      {/* Main Content Workspace */}
      <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto">
        {activeTab === 'meta' && <MetaDashboard />}
        {activeTab === 'blogs' && <BlogDashboard />}
        {activeTab === 'settings' && <SettingsDashboard />}
      </main>
    </div>
  );
};

export default AdminLayout;
