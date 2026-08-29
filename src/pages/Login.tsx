import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/ui/card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/input';
import { Lock, User, Key, Sparkles, ArrowRight, ShieldCheck, AlertCircle, CheckCircle2 } from 'lucide-react';

interface LoginProps {
  onLoginSuccess?: () => void;
  onNavigate?: (route: string) => void;
}

export const Login: React.FC<LoginProps> = ({ onLoginSuccess, onNavigate }) => {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [groqKey, setGroqKey] = useState('');
  const [showGroqSetup, setShowGroqSetup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMsg('');

    try {
      if (showGroqSetup && groqKey) {
        const res = await fetch('/api/auth/setup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password, groqApiKey: groqKey }),
        });
        const data = (await res.json()) as any;
        if (!res.ok || !data.success) {
          throw new Error(data.error || 'Failed to setup admin credentials');
        }
        localStorage.setItem('revlytics_admin_token', data.token);
        localStorage.setItem('revlytics_admin_user', data.username);
        setSuccessMsg('Admin credentials & Groq API key saved!');
        setTimeout(() => {
          if (onLoginSuccess) onLoginSuccess();
          else if (onNavigate) onNavigate('admin');
          else window.location.href = '/admin';
        }, 500);
        return;
      }

      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = (await res.json()) as any;

      if (!res.ok || !data.success) {
        if (username === 'admin' && password === 'revlytics2026!') {
          localStorage.setItem('revlytics_admin_token', 'temp_master_token');
          localStorage.setItem('revlytics_admin_user', 'admin');
          if (onLoginSuccess) onLoginSuccess();
          else if (onNavigate) onNavigate('admin');
          else window.location.href = '/admin';
          return;
        }
        throw new Error(data.error || 'Invalid credentials. Default: admin / revlytics2026!');
      }

      localStorage.setItem('revlytics_admin_token', data.token);
      localStorage.setItem('revlytics_admin_user', data.username);
      setSuccessMsg('Authentication successful. Redirecting...');
      setTimeout(() => {
        if (onLoginSuccess) onLoginSuccess();
        else if (onNavigate) onNavigate('admin');
        else window.location.href = '/admin';
      }, 500);
    } catch (err: any) {
      setError(err.message || 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-zinc-950 text-zinc-50">
      <div className="w-full max-w-md space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex size-12 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 shadow-lg text-white">
            <ShieldCheck className="size-6" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Revlytics Admin Portal
          </h1>
          <p className="text-sm text-zinc-400">
            Cloudflare D1 Database & Groq AI Content Studio
          </p>
        </div>

        {/* Shadcn Card */}
        <Card className="border-zinc-800 bg-zinc-900/50 shadow-2xl">
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>
              Manage SEO metadata for all pages and generate AI blogs using Groq API.
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4">
              {error && (
                <div className="flex items-center gap-2 rounded-md bg-red-950/50 p-3 text-sm text-red-400 border border-red-800">
                  <AlertCircle className="size-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {successMsg && (
                <div className="flex items-center gap-2 rounded-md bg-emerald-950/50 p-3 text-sm text-emerald-400 border border-emerald-800">
                  <CheckCircle2 className="size-4 shrink-0" />
                  <span>{successMsg}</span>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-xs font-medium text-zinc-300">
                  Username
                </label>
                <div className="relative">
                  <Input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="admin"
                    required
                    className="pl-9"
                  />
                  <User className="absolute left-3 top-2.5 size-4 text-zinc-500" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-zinc-300">
                  Password
                </label>
                <div className="relative">
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    required
                    className="pl-9"
                  />
                  <Lock className="absolute left-3 top-2.5 size-4 text-zinc-500" />
                </div>
              </div>

              {/* Optional Groq API Key Setup */}
              <div className="pt-2 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => setShowGroqSetup(!showGroqSetup)}
                  className="flex items-center gap-1.5 text-xs font-medium text-indigo-400 hover:text-indigo-300 transition-colors cursor-pointer"
                >
                  <Sparkles className="size-3.5" />
                  {showGroqSetup ? 'Hide Groq API Key Setup' : '+ Setup / Update Groq API Key (Optional)'}
                </button>

                {showGroqSetup && (
                  <div className="mt-3 space-y-1.5">
                    <label className="text-xs text-zinc-400">
                      Groq API Key (`gsk_...`)
                    </label>
                    <div className="relative">
                      <Input
                        type="password"
                        value={groqKey}
                        onChange={(e) => setGroqKey(e.target.value)}
                        placeholder="gsk_xxxxxxxxxxxxxxxxxxxx"
                        className="pl-9 font-mono text-xs"
                      />
                      <Key className="absolute left-3 top-2.5 size-4 text-indigo-400" />
                    </div>
                    <p className="text-[11px] text-zinc-500">
                      Saved to Cloudflare D1 `credentials` table.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>

            <CardFooter className="flex flex-col gap-3">
              <Button
                type="submit"
                variant="gradient"
                loading={loading}
                className="w-full font-semibold"
              >
                Sign In to Dashboard <ArrowRight className="size-4 ml-1" />
              </Button>

              <p className="text-xs text-zinc-500 text-center">
                Default: <code className="text-zinc-400">admin</code> / <code className="text-zinc-400">revlytics2026!</code>
              </p>
            </CardFooter>
          </form>
        </Card>

        {/* Back to website */}
        <div className="text-center">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              if (onNavigate) onNavigate('home');
              else window.location.href = '/';
            }}
            className="text-xs text-zinc-400 hover:text-zinc-200 transition-colors"
          >
            ← Back to Revlytics Website
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
